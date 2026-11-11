import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const Ink = '#1b1a18';
const BarInk = '#0b0a09';
const Cream = '#e8e6dc';
const RedPart = '#e80000';
const CyanPart = '#00e6dc';
const Peak = 2.6;
const LeaveAt = 4.1;
const End = 5;
const MaxPixels = 760000;
const MaxStep = 0.05;
const StallSeconds = 3;
const FilmRatio = 2.39;
const PushIn = 0.05;
const ParticleLimit = 3200;
const DustCount = 150;
const AlphaSteps = 5;
const NoiseFrames = 3;
const Tier = { Fine: 0, Mid: 1, Bokeh: 2 };
const GlitchAt = Peak - 0.02;
const GlitchSeconds = 0.07;
const SkipKeys = new Set(['Escape', 'Enter', ' ']);

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, start, duration) => clamp((t - start) / duration);
const settle = (p) => (p < 0.5 ? 8 * p ** 4 : 1 - Math.pow(-2 * p + 2, 4) / 2);

function random(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let x = Math.imul(state ^ (state >>> 15), 1 | state);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function surface(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function tintedLogo(logo, layout, blur) {
  const canvas = surface(layout.w + layout.pad * 2, layout.h + layout.pad * 2);
  const context = canvas.getContext('2d');
  if (blur) context.filter = `blur(${blur}px)`;
  const mask = surface(layout.w, layout.h);
  const maskContext = mask.getContext('2d');
  maskContext.drawImage(logo, 0, 0, layout.w, layout.h);
  maskContext.globalCompositeOperation = 'source-in';
  maskContext.fillStyle = Cream;
  maskContext.fillRect(0, 0, layout.w, layout.h);
  context.drawImage(mask, layout.pad, layout.pad);
  return canvas;
}

function softDot() {
  const canvas = surface(32, 32);
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(232, 230, 220, 1)');
  gradient.addColorStop(0.35, 'rgba(232, 230, 220, 0.45)');
  gradient.addColorStop(1, 'rgba(232, 230, 220, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  return canvas;
}

function radialLayer(W, H, radius, inner, outer) {
  const canvas = surface(W, H);
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, radius);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, W, H);
  return canvas;
}

function flareLayer(W, height) {
  const canvas = surface(W, height);
  const context = canvas.getContext('2d');
  const across = context.createLinearGradient(0, 0, W, 0);
  across.addColorStop(0, 'rgba(170, 205, 255, 0)');
  across.addColorStop(0.5, 'rgba(205, 225, 255, 1)');
  across.addColorStop(1, 'rgba(170, 205, 255, 0)');
  context.fillStyle = across;
  context.fillRect(0, 0, W, height);
  const down = context.createLinearGradient(0, 0, 0, height);
  down.addColorStop(0, 'rgba(0, 0, 0, 0)');
  down.addColorStop(0.42, 'rgba(0, 0, 0, 0.22)');
  down.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  down.addColorStop(0.58, 'rgba(0, 0, 0, 0.22)');
  down.addColorStop(1, 'rgba(0, 0, 0, 0)');
  context.globalCompositeOperation = 'destination-in';
  context.fillStyle = down;
  context.fillRect(0, 0, W, height);
  return canvas;
}

function scanlines(W, H) {
  const canvas = surface(W, H + 2);
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(0, 0, 0, 0.16)';
  for (let y = 0; y < H + 2; y += 2) context.fillRect(0, y, W, 1);
  return canvas;
}

function noiseLayer(W, H, next) {
  const tile = surface(128, 128);
  const tileContext = tile.getContext('2d');
  const image = tileContext.createImageData(128, 128);
  for (let i = 0; i < image.data.length; i += 4) {
    const value = 120 + Math.floor(next() * 135);
    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = Math.floor(next() * 9);
  }
  tileContext.putImageData(image, 0, 0);
  const canvas = surface(W, H);
  const context = canvas.getContext('2d');
  const dx = Math.floor(next() * 128);
  const dy = Math.floor(next() * 128);
  for (let y = -dy; y < H; y += 128) for (let x = -dx; x < W; x += 128) context.drawImage(tile, x, y);
  return canvas;
}

function buildScene(canvas, logo) {
  const scale = Math.min(1, Math.sqrt(MaxPixels / (window.innerWidth * window.innerHeight)));
  const W = Math.round(window.innerWidth * scale);
  const H = Math.round(window.innerHeight * scale);
  canvas.width = W;
  canvas.height = H;
  const context = canvas.getContext('2d');
  const light = surface(W, H);
  const part = surface(W, H);
  const bar = Math.max(0, Math.round((H - W / FilmRatio) / 2));

  const w = Math.round(Math.min(W * 0.5, 860 * scale));
  const h = Math.round((w * logo.height) / logo.width);
  const layout = { w, h, x: (W - w) / 2, y: (H - h) / 2, pad: Math.round(80 * scale) };
  layout.sharp = tintedLogo(logo, layout, 0);
  layout.glow = tintedLogo(logo, layout, w * 0.02);
  layout.halo = tintedLogo(logo, layout, w * 0.06);

  const sample = surface(w, h);
  const sampleContext = sample.getContext('2d');
  sampleContext.drawImage(logo, 0, 0, w, h);
  const pixels = sampleContext.getImageData(0, 0, w, h).data;
  const points = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) if (pixels[(y * w + x) * 4 + 3] > 110) points.push(x, y);
  }
  if (points.length === 0) throw new Error('ロゴの画像から形を読み取れませんでした。static/img/logo-ink.svg を確かめてください。');

  const next = random(7);
  const pick = () => Math.floor((next() * points.length) / 2) * 2;
  const count = Math.min(ParticleLimit, Math.round((points.length / 2) * 0.4));
  const reach = Math.hypot(W, H) / 2;
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const k = pick();
    const order = 0.72 * next() + 0.28 * (points[k] / w);
    const angle = next() * Math.PI * 2;
    const radius = reach * (0.55 + 0.75 * next());
    const roll = next();
    const tier = roll < 0.05 ? Tier.Bokeh : roll < 0.35 ? Tier.Mid : Tier.Fine;
    particles.push({
      tx: layout.x + points[k],
      ty: layout.y + points[k + 1],
      arrive: Peak - 0.05 - 1.5 * Math.pow(1 - order, 2.2),
      duration: 0.95 + 0.75 * next(),
      ox: Math.cos(angle) * radius,
      oy: Math.sin(angle) * radius,
      swirl: (next() < 0.5 ? -1 : 1) * (0.7 + 1.1 * next()),
      size: [0.9, 1.3, 4.2][tier] * (0.85 + 0.3 * next()),
      tier,
      bright: 0.45 + 0.55 * next(),
    });
  }

  const dust = [];
  for (let i = 0; i < DustCount; i += 1) {
    const k = pick();
    const angle = next() * Math.PI * 2;
    const speed = (5 + 22 * next()) * scale;
    dust.push({
      x: layout.x + points[k],
      y: layout.y + points[k + 1],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.6 - 9 * scale,
      delay: 0.5 * next(),
      life: 1.1 + 1.2 * next(),
      size: 1 + 0.8 * next(),
      bright: 0.35 + 0.55 * next(),
    });
  }

  return {
    context,
    light,
    lightContext: light.getContext('2d'),
    part,
    partContext: part.getContext('2d'),
    W,
    H,
    scale,
    bar,
    layout,
    particles,
    dust,
    logo,
    dot: softDot(),
    bloom: radialLayer(W, H, Math.max(W, H) * 0.6, 'rgba(232, 230, 220, 0.2)', 'rgba(232, 230, 220, 0)'),
    vignette: radialLayer(W, H, Math.hypot(W, H) * 0.56, 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.62)'),
    flare: flareLayer(W, Math.max(24, 70 * scale)),
    lines: scanlines(W, H),
    noise: Array.from({ length: NoiseFrames }, () => noiseLayer(W, H, next)),
  };
}

function particleAt(particle, t) {
  const q = seg(t, particle.arrive - particle.duration, particle.duration);
  const k = Math.pow(1 - q, 2.4);
  const angle = particle.swirl * k;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [particle.tx + (particle.ox * cos - particle.oy * sin) * k, particle.ty + (particle.ox * sin + particle.oy * cos) * k, q];
}

const emptyBuckets = () => Array.from({ length: AlphaSteps }, () => []);
const bucketOf = (alpha) => Math.min(AlphaSteps - 1, Math.max(0, Math.floor(alpha * AlphaSteps)));

function strokeBuckets(context, buckets, width) {
  context.lineWidth = width;
  buckets.forEach((lines, step) => {
    if (lines.length === 0) return;
    context.globalAlpha = (step + 0.5) / AlphaSteps;
    context.beginPath();
    for (let i = 0; i < lines.length; i += 4) {
      context.moveTo(lines[i], lines[i + 1]);
      context.lineTo(lines[i + 2], lines[i + 3]);
    }
    context.stroke();
  });
}

function fillBuckets(context, buckets) {
  buckets.forEach((squares, step) => {
    if (squares.length === 0) return;
    context.globalAlpha = (step + 0.5) / AlphaSteps;
    context.beginPath();
    for (let i = 0; i < squares.length; i += 3) context.rect(squares[i], squares[i + 1], squares[i + 2], squares[i + 2]);
    context.fill();
  });
}

function drawParticles(scene, context, t) {
  const streaks = emptyBuckets();
  const grains = emptyBuckets();
  const grain = t < Peak ? 1 : clamp(1 - (t - Peak) / 0.9);
  let arrived = 0;
  for (const particle of scene.particles) {
    if (t < particle.arrive - particle.duration) continue;
    if (t >= particle.arrive) {
      arrived += 1;
      if (grain <= 0 || particle.tier === Tier.Bokeh) continue;
      const pop = Math.exp(-(t - particle.arrive) / 0.12);
      const size = particle.size * (1 + 0.6 * pop);
      grains[bucketOf(Math.min(1, 0.45 * particle.bright + 0.9 * pop) * grain * 0.8)].push(particle.tx - size / 2, particle.ty - size / 2, size);
      continue;
    }
    const [x, y, q] = particleAt(particle, t);
    const alpha = (0.06 + 0.5 * q * q) * particle.bright;
    if (particle.tier === Tier.Bokeh) {
      const size = particle.size * 4 * (2 - q);
      context.globalAlpha = alpha * 0.32;
      context.drawImage(scene.dot, x - size / 2, y - size / 2, size, size);
      continue;
    }
    const [px, py] = particleAt(particle, t - 0.04);
    streaks[bucketOf(alpha)].push(px, py, x, y);
  }
  strokeBuckets(context, streaks, 1);
  fillBuckets(context, grains);
  return arrived / scene.particles.length;
}

function drawDust(scene, context, t) {
  const buckets = emptyBuckets();
  for (const mote of scene.dust) {
    const age = t - Peak - mote.delay;
    if (age < 0 || age > mote.life) continue;
    const p = age / mote.life;
    const drift = 1 - Math.pow(1 - p, 2);
    const alpha = Math.sin(Math.PI * p) * mote.bright * 0.7;
    buckets[bucketOf(alpha)].push(mote.x + mote.vx * mote.life * drift - mote.size / 2, mote.y + mote.vy * mote.life * drift - mote.size / 2, mote.size);
  }
  fillBuckets(context, buckets);
}

const flashAt = (t) => (t < Peak - 0.03 ? 0 : t < Peak + 0.03 ? seg(t, Peak - 0.03, 0.06) : Math.exp(-(t - Peak - 0.03) / 0.5));
const flareAt = (t) => (t < Peak - 0.03 ? 0 : t < Peak + 0.05 ? seg(t, Peak - 0.03, 0.08) : Math.exp(-(t - Peak - 0.05) / 0.75));

function drawLight(scene, t) {
  const { lightContext: context, W, H, layout } = scene;
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  context.clearRect(0, 0, W, H);
  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.lineCap = 'butt';
  const gathered = drawParticles(scene, context, t);
  drawDust(scene, context, t);

  const solid = seg(t, Peak - 0.04, 0.09);
  const flash = flashAt(t);
  const afterglow = t < Peak ? 0 : Math.exp(-(t - Peak) / 2.4);
  const x = layout.x - layout.pad;
  const y = layout.y - layout.pad;
  if (flash > 0.01) {
    context.globalAlpha = flash;
    context.drawImage(scene.bloom, 0, 0);
  }
  const glow = 0.2 * gathered * gathered * (1 - solid) + (0.18 + 0.14 * afterglow) * solid + 0.5 * flash;
  if (glow > 0.01) {
    context.globalAlpha = Math.min(1, glow);
    context.drawImage(layout.glow, x, y);
  }
  const halo = 0.45 * flash + 0.16 * afterglow * solid;
  if (halo > 0.01) {
    context.globalAlpha = Math.min(1, halo);
    context.drawImage(layout.halo, x, y);
  }
  if (solid > 0) {
    context.globalAlpha = 0.92 * solid;
    context.drawImage(layout.sharp, x, y);
  }
  context.globalAlpha = 1;
  return gathered;
}

function drawPart(scene, color, offset, zoom, keep) {
  const { context, light, part, partContext, W, H } = scene;
  partContext.globalCompositeOperation = 'copy';
  partContext.drawImage(light, 0, 0);
  partContext.globalCompositeOperation = 'source-in';
  partContext.fillStyle = color;
  partContext.fillRect(0, 0, W, H);
  context.globalAlpha = keep;
  context.drawImage(part, offset - (W * (zoom - 1)) / 2, -(H * (zoom - 1)) / 2, W * zoom, H * zoom);
}

function tearBands(scene, t, amount) {
  const { context, W, H, scale } = scene;
  const next = random(Math.floor(t * 60));
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  for (let i = 0; i < 2; i += 1) {
    const y = Math.floor(H * (0.3 + 0.4 * next()));
    const height = Math.floor((6 + 26 * next()) * scale);
    const offset = Math.round((next() - 0.5) * 2 * (6 + 12 * amount) * scale);
    context.drawImage(context.canvas, 0, y, W, height, offset, y, W, height);
  }
}

function drawFrame(scene, t, progress, keep) {
  const { context, W, H, scale, bar } = scene;
  const open = settle(seg(t, LeaveAt, End - LeaveAt));
  const height = bar * (1 - open);
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  context.fillStyle = BarInk;
  if (height > 0) {
    context.fillRect(0, 0, W, height);
    context.fillRect(0, H - height, W, height);
  }

  const edge = H - Math.max(bar, 64 * scale);
  const y = H - Math.max(bar / 2, 32 * scale);
  context.globalAlpha = 0.85 * keep;
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.fillRect(0, edge, W * progress, 1);
  context.textBaseline = 'middle';
  context.font = `300 ${Math.max(9, 11 * scale)}px Jost, sans-serif`;
  context.textAlign = 'left';
  context.fillText('A U D I O R I U M   M A N U A L', 48 * scale, y);
  context.textAlign = 'right';
  context.fillText(`L O A D I N G   ${String(Math.round(progress * 100)).padStart(3, '0')}`, W - 86 * scale, y);
  const radius = 11 * scale;
  context.lineWidth = Math.max(1, scale);
  context.save();
  context.translate(W - 60 * scale, y);
  context.rotate(t * 2.4);
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.58, -0.4, 1.9);
  context.stroke();
  context.restore();
  context.globalAlpha = 1;
}

function draw(scene, t) {
  const { context, W, H, layout } = scene;
  const keep = 1 - settle(seg(t, LeaveAt, End - LeaveAt));
  const progress = drawLight(scene, t);
  const flash = flashAt(t);
  const flare = flareAt(t);
  const glitch = t >= GlitchAt && t < GlitchAt + GlitchSeconds ? 1 - (t - GlitchAt) / GlitchSeconds : 0;
  const shift = 0.9 + Math.sin(t * 31) * 0.25 + 1.6 * flash + 3 * glitch;
  const zoom = 1 + (PushIn * t) / End;

  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  context.clearRect(0, 0, W, H);
  context.globalAlpha = keep;
  context.fillStyle = Ink;
  context.fillRect(0, 0, W, H);
  context.globalCompositeOperation = 'lighter';
  drawPart(scene, RedPart, -shift, zoom, keep);
  drawPart(scene, CyanPart, shift, zoom, keep);
  if (flare > 0.01) {
    const length = W * (0.35 + 0.95 * flare);
    const thickness = scene.flare.height * (0.6 + 0.6 * flare);
    context.globalAlpha = Math.min(1, flare * 0.85) * keep;
    context.drawImage(scene.flare, W / 2 - length / 2, layout.y + layout.h * 0.56 - thickness / 2, length, thickness);
  }
  context.globalAlpha = keep;
  context.drawImage(scene.noise[Math.floor(t * 24) % NoiseFrames], 0, 0);
  if (glitch > 0) tearBands(scene, t, glitch);

  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = keep;
  context.drawImage(scene.vignette, 0, 0);
  context.drawImage(scene.lines, 0, -(Math.floor(t * 24) % 2));
  drawFrame(scene, t, progress, keep);
}

function play() {
  const root = document.documentElement;
  const canvas = document.createElement('canvas');
  canvas.className = 'intro';
  document.body.append(canvas);
  let frame = 0;
  let scene = null;
  let elapsed = 0;
  let previous = 0;
  let lastFrameAt = window.performance.now();

  const rebuild = () => {
    if (scene) scene = buildScene(canvas, scene.logo);
  };
  const skip = (event) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (SkipKeys.has(event.key)) finish();
  };
  const watchdog = window.setInterval(() => {
    const stalled = window.performance.now() - lastFrameAt > StallSeconds * 1000;
    if (stalled && document.visibilityState === 'visible') finish();
  }, 1000);
  function finish() {
    window.removeEventListener('resize', rebuild);
    window.removeEventListener('keydown', skip);
    window.cancelAnimationFrame(frame);
    window.clearInterval(watchdog);
    canvas.remove();
    delete root.dataset.intro;
  }
  const tick = (now) => {
    if (previous) elapsed += Math.min(MaxStep, (now - previous) / 1000);
    previous = now;
    lastFrameAt = window.performance.now();
    if (elapsed >= End) {
      finish();
      return;
    }
    draw(scene, elapsed);
    frame = window.requestAnimationFrame(tick);
  };

  canvas.addEventListener('click', finish);
  window.addEventListener('keydown', skip);
  window.addEventListener('resize', rebuild);

  const logo = new window.Image();
  logo.onload = () => {
    try {
      scene = buildScene(canvas, logo);
      draw(scene, 0);
    } catch (error) {
      finish();
      throw error;
    }
    root.dataset.intro = 'playing';
    lastFrameAt = window.performance.now();
    frame = window.requestAnimationFrame(tick);
  };
  logo.onerror = finish;
  logo.src = `${siteConfig.baseUrl}img/logo-ink.svg`;
}

if (ExecutionEnvironment.canUseDOM && 'intro' in document.documentElement.dataset) play();
