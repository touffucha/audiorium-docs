import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const Ink = '#1b1a18';
const Cream = '#e8e6dc';
const RedPart = '#e80000';
const CyanPart = '#00e6dc';
const Peak = 2.6;
const LeaveAt = 3.9;
const End = 4.6;
const ParticleLimit = 4200;
const SparkCount = 420;
const AlphaSteps = 5;
const Tier = { Fine: 0, Mid: 1, Bokeh: 2 };
const GlitchTimes = [0.85, 1.7, Peak, Peak + 0.42];
const GlitchSeconds = 0.09;

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
  canvas.width = width;
  canvas.height = height;
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

function scanlines(W, H) {
  const canvas = surface(W, H);
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(0, 0, 0, 0.26)';
  for (let y = 0; y < H; y += 3) context.fillRect(0, y, W, 1);
  return canvas;
}

function noiseTile(next) {
  const canvas = surface(160, 160);
  const context = canvas.getContext('2d');
  const image = context.createImageData(160, 160);
  for (let i = 0; i < image.data.length; i += 4) {
    const value = 120 + Math.floor(next() * 135);
    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = Math.floor(next() * 46);
  }
  context.putImageData(image, 0, 0);
  return canvas;
}

function buildScene(canvas, logo) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  const context = canvas.getContext('2d');
  const light = surface(W, H);
  const part = surface(W, H);

  const w = Math.round(Math.min(W * 0.52, 860));
  const h = Math.round((w * logo.height) / logo.width);
  const layout = { w, h, x: (W - w) / 2, y: (H - h) / 2, pad: 80 };
  layout.sharp = tintedLogo(logo, layout, 0);
  layout.glow = tintedLogo(logo, layout, w * 0.02);
  layout.halo = tintedLogo(logo, layout, w * 0.05);

  const sample = surface(w, h);
  const sampleContext = sample.getContext('2d');
  sampleContext.drawImage(logo, 0, 0, w, h);
  const pixels = sampleContext.getImageData(0, 0, w, h).data;
  const points = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) if (pixels[(y * w + x) * 4 + 3] > 110) points.push(x, y);
  }

  const next = random(7);
  const pick = () => Math.floor((next() * points.length) / 2) * 2;
  const count = Math.min(ParticleLimit, Math.round((points.length / 2) * 0.3));
  const reach = Math.hypot(W, H) / 2;
  const cx = W / 2;
  const cy = H / 2;
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const k = pick();
    const order = 0.72 * next() + 0.28 * (points[k] / w);
    const angle = next() * Math.PI * 2;
    const radius = reach * (0.55 + 0.75 * next());
    const roll = next();
    const tier = roll < 0.03 ? Tier.Bokeh : roll < 0.35 ? Tier.Mid : Tier.Fine;
    particles.push({
      tx: layout.x + points[k],
      ty: layout.y + points[k + 1],
      arrive: Peak - 0.05 - 1.5 * Math.pow(1 - order, 2.2),
      duration: 0.95 + 0.75 * next(),
      ox: Math.cos(angle) * radius,
      oy: Math.sin(angle) * radius,
      swirl: (next() < 0.5 ? -1 : 1) * (0.7 + 1.1 * next()),
      size: [0.9, 1.4, 3.4][tier] * (0.85 + 0.3 * next()),
      tier,
      bright: 0.45 + 0.55 * next(),
    });
  }

  const sparks = [];
  for (let i = 0; i < SparkCount; i += 1) {
    const k = pick();
    const x = layout.x + points[k];
    const y = layout.y + points[k + 1];
    const angle = Math.atan2(y - cy, (x - cx) * 0.5) + (next() - 0.5) * 1.2;
    const speed = 60 + 380 * Math.pow(next(), 1.6);
    sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.35 + 0.75 * next(), bright: 0.4 + 0.6 * next() });
  }

  return { context, light, lightContext: light.getContext('2d'), part, partContext: part.getContext('2d'), W, H, layout, particles, sparks, logo, dot: softDot(), lines: scanlines(W, H), noise: noiseTile(next) };
}

function particleAt(particle, t) {
  const q = seg(t, particle.arrive - particle.duration, particle.duration);
  const k = Math.pow(1 - q, 2.4);
  const angle = particle.swirl * k;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [particle.tx + (particle.ox * cos - particle.oy * sin) * k, particle.ty + (particle.ox * sin + particle.oy * cos) * k, q];
}

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

function drawStreaks(scene, context, t) {
  const buckets = Array.from({ length: AlphaSteps }, () => []);
  for (const particle of scene.particles) {
    if (t < particle.arrive - particle.duration || t >= particle.arrive) continue;
    const [x, y, q] = particleAt(particle, t);
    const alpha = (0.07 + 0.55 * Math.pow(q, 2)) * particle.bright;
    if (particle.tier === Tier.Bokeh) {
      const size = particle.size * 4 * (1.8 - 0.8 * q);
      context.globalAlpha = alpha * 0.4;
      context.drawImage(scene.dot, x - size / 2, y - size / 2, size, size);
      continue;
    }
    const [px, py] = particleAt(particle, t - 0.04);
    buckets[Math.min(AlphaSteps - 1, Math.floor(alpha * AlphaSteps))].push(px, py, x, y);
  }
  strokeBuckets(context, buckets, 1);
}

function drawSparks(scene, context, t) {
  const since = t - Peak;
  if (since < 0) return;
  const buckets = Array.from({ length: AlphaSteps }, () => []);
  for (const spark of scene.sparks) {
    if (since > spark.life) continue;
    const p = since / spark.life;
    const travel = 1 - Math.pow(1 - p, 3);
    const x = spark.x + spark.vx * spark.life * travel;
    const y = spark.y + spark.vy * spark.life * travel;
    const tail = 0.05 * (1 - p);
    buckets[Math.min(AlphaSteps - 1, Math.floor((1 - p) * spark.bright * AlphaSteps))].push(x - spark.vx * tail, y - spark.vy * tail, x, y);
  }
  strokeBuckets(context, buckets, 1.2);
}

function drawLoader(scene, context, t, progress) {
  const { W, H } = scene;
  const x = W - 56;
  const y = H - 56;
  const radius = 22;
  context.globalAlpha = 0.9;
  context.lineWidth = 1.5;
  context.save();
  context.translate(x, y);
  context.rotate(t * 5);
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.62, -0.4, 1.9);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, 2.2, 0, Math.PI * 2);
  context.fill();
  context.restore();
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.font = '300 13px Jost, sans-serif';
  context.fillText('L O A D I N G', x - radius - 18, y - 9);
  context.font = '400 22px Jost, sans-serif';
  context.fillText(`${String(Math.round(progress * 100)).padStart(3, '0')} %`, x - radius - 18, y + 11);
  context.fillRect(0, H - 3, W * progress, 3);
  context.globalAlpha = 0.45;
  context.fillRect(0, H - 2, W, 1);
}

function drawLight(scene, t) {
  const { lightContext: context, W, H, layout, particles } = scene;
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  context.clearRect(0, 0, W, H);
  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.lineCap = 'round';
  drawStreaks(scene, context, t);

  const grain = t < Peak ? 1 : clamp(1 - (t - Peak) / 0.7);
  let arrived = 0;
  for (const particle of particles) {
    if (t < particle.arrive) continue;
    arrived += 1;
    if (grain <= 0 || particle.tier === Tier.Bokeh) continue;
    const pop = Math.exp(-(t - particle.arrive) / 0.12);
    const size = particle.size * (1 + 0.8 * pop);
    context.globalAlpha = Math.min(1, 0.45 * particle.bright + 1.1 * pop) * grain * 0.8;
    context.fillRect(particle.tx - size / 2, particle.ty - size / 2, size, size);
  }

  const gathered = arrived / particles.length;
  const solid = seg(t, Peak - 0.04, 0.07);
  const flash = t < Peak - 0.03 ? 0 : t < Peak + 0.02 ? seg(t, Peak - 0.03, 0.05) : Math.exp(-(t - Peak - 0.02) / 0.26);
  const afterglow = t < Peak ? 0 : Math.exp(-(t - Peak) / 2.2);
  const x = layout.x - layout.pad;
  const y = layout.y - layout.pad;
  if (flash > 0.01) {
    const burst = context.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.65);
    burst.addColorStop(0, 'rgba(232, 230, 220, 0.34)');
    burst.addColorStop(1, 'rgba(232, 230, 220, 0)');
    context.globalAlpha = flash;
    context.fillStyle = burst;
    context.fillRect(0, 0, W, H);
    context.fillStyle = Cream;
  }
  drawSparks(scene, context, t);
  context.globalAlpha = 0.2 * gathered * gathered * (1 - solid) + (0.16 + 0.12 * afterglow) * solid + 0.7 * flash;
  context.drawImage(layout.glow, x, y);
  context.globalAlpha = 0.7 * flash + 0.12 * afterglow * solid;
  context.drawImage(layout.halo, x, y);
  context.globalAlpha = 0.92 * solid;
  context.drawImage(layout.sharp, x, y);
  context.globalCompositeOperation = 'source-over';
  drawLoader(scene, context, t, gathered);
  context.globalAlpha = 1;
  return flash;
}

function drawPart(scene, color, offset, keep) {
  const { context, light, part, partContext, W, H } = scene;
  partContext.globalCompositeOperation = 'source-over';
  partContext.clearRect(0, 0, W, H);
  partContext.drawImage(light, 0, 0);
  partContext.globalCompositeOperation = 'source-in';
  partContext.fillStyle = color;
  partContext.fillRect(0, 0, W, H);
  context.globalAlpha = keep;
  context.drawImage(part, offset, 0);
}

function glitchAmount(t) {
  for (const at of GlitchTimes) if (t >= at && t < at + GlitchSeconds) return 1 - (t - at) / GlitchSeconds;
  return 0;
}

function tearBands(scene, t, amount) {
  const { context, W, H } = scene;
  const next = random(Math.floor(t * 60));
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = Math.floor(next() * H);
    const height = Math.floor(8 + next() * H * 0.12);
    const offset = Math.round((next() - 0.5) * 2 * (24 + 70 * amount));
    context.drawImage(context.canvas, 0, y, W, height, offset, y, W, height);
  }
}

function draw(scene, t) {
  const { context, W, H } = scene;
  const keep = 1 - settle(seg(t, LeaveAt, End - LeaveAt));
  const flash = drawLight(scene, t);
  const wobble = Math.sin(t * 37) * 0.4 + Math.sin(t * 91) * 0.3;
  const glitch = glitchAmount(t);
  const shift = 1.4 + wobble + 5 * flash + 12 * glitch;

  context.globalCompositeOperation = 'source-over';
  context.clearRect(0, 0, W, H);
  context.globalAlpha = keep;
  context.fillStyle = Ink;
  context.fillRect(0, 0, W, H);
  context.globalCompositeOperation = 'lighter';
  drawPart(scene, RedPart, -shift, keep);
  drawPart(scene, CyanPart, shift, keep);

  context.globalAlpha = 0.16 * keep;
  const frame = Math.floor(t * 30);
  const dx = (frame * 53) % 160;
  const dy = (frame * 97) % 160;
  for (let y = -dy; y < H; y += 160) for (let x = -dx; x < W; x += 160) context.drawImage(scene.noise, x, y);

  if (glitch > 0 && keep > 0.99) tearBands(scene, t, glitch);
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = keep;
  context.drawImage(scene.lines, 0, Math.floor(t * 24) % 3);
  context.globalAlpha = 1;
}

function play() {
  const canvas = document.createElement('canvas');
  canvas.className = 'intro';
  document.body.append(canvas);
  let frame = 0;
  let scene = null;
  let started = 0;

  const rebuild = () => {
    if (scene) scene = buildScene(canvas, scene.logo);
  };
  const finish = () => {
    window.removeEventListener('resize', rebuild);
    window.removeEventListener('keydown', finish);
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timeout);
    canvas.remove();
    delete document.documentElement.dataset.intro;
  };
  const timeout = window.setTimeout(finish, (End + 1.5) * 1000);
  const tick = (now) => {
    const t = (now - started) / 1000;
    if (t >= End) return finish();
    draw(scene, t);
    frame = window.requestAnimationFrame(tick);
    return undefined;
  };

  canvas.addEventListener('click', finish);
  window.addEventListener('keydown', finish);
  window.addEventListener('resize', rebuild);

  const logo = new window.Image();
  logo.onload = () => {
    scene = buildScene(canvas, logo);
    started = window.performance.now();
    draw(scene, 0);
    frame = window.requestAnimationFrame(tick);
  };
  logo.onerror = finish;
  logo.src = `${siteConfig.baseUrl}img/logo-ink.svg`;
}

if (ExecutionEnvironment.canUseDOM && 'intro' in document.documentElement.dataset) play();
