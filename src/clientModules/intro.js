import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const SeenKey = 'audiorium-intro-seen';
const Ink = '#1b1a18';
const Cream = '#e8e6dc';
const Peak = 2.6;
const LeaveAt = 3.9;
const End = 4.6;
const ParticleLimit = 9000;
const AlphaSteps = 5;
const Tier = { Fine: 0, Mid: 1, Bokeh: 2 };

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

function tintedLogo(logo, layout, blur) {
  const canvas = document.createElement('canvas');
  canvas.width = layout.w + layout.pad * 2;
  canvas.height = layout.h + layout.pad * 2;
  const context = canvas.getContext('2d');
  if (blur) context.filter = `blur(${blur}px)`;
  const mask = document.createElement('canvas');
  mask.width = layout.w;
  mask.height = layout.h;
  const maskContext = mask.getContext('2d');
  maskContext.drawImage(logo, 0, 0, layout.w, layout.h);
  maskContext.globalCompositeOperation = 'source-in';
  maskContext.fillStyle = Cream;
  maskContext.fillRect(0, 0, layout.w, layout.h);
  context.drawImage(mask, layout.pad, layout.pad);
  return canvas;
}

function softDot() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(232, 230, 220, 1)');
  gradient.addColorStop(0.35, 'rgba(232, 230, 220, 0.45)');
  gradient.addColorStop(1, 'rgba(232, 230, 220, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  return canvas;
}

function buildScene(canvas, logo) {
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W * ratio;
  canvas.height = H * ratio;
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const w = Math.round(Math.min(W * 0.52, 860));
  const h = Math.round((w * logo.height) / logo.width);
  const layout = { w, h, x: (W - w) / 2, y: (H - h) / 2, pad: 80 };
  layout.sharp = tintedLogo(logo, layout, 0);
  layout.glow = tintedLogo(logo, layout, w * 0.02);
  layout.halo = tintedLogo(logo, layout, w * 0.05);

  const sample = document.createElement('canvas');
  sample.width = w;
  sample.height = h;
  const sampleContext = sample.getContext('2d');
  sampleContext.drawImage(logo, 0, 0, w, h);
  const pixels = sampleContext.getImageData(0, 0, w, h).data;
  const points = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) if (pixels[(y * w + x) * 4 + 3] > 110) points.push(x, y);
  }

  const next = random(7);
  const count = Math.min(ParticleLimit, Math.round((points.length / 2) * 0.55));
  const reach = Math.hypot(W, H) / 2;
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const k = Math.floor((next() * points.length) / 2) * 2;
    const tx = layout.x + points[k];
    const ty = layout.y + points[k + 1];
    const order = 0.72 * next() + 0.28 * (points[k] / w);
    const angle = next() * Math.PI * 2;
    const radius = reach * (0.55 + 0.75 * next());
    const pick = next();
    const tier = pick < 0.06 ? Tier.Bokeh : pick < 0.4 ? Tier.Mid : Tier.Fine;
    particles.push({
      tx,
      ty,
      arrive: Peak - 0.05 - 1.5 * Math.pow(1 - order, 2.2),
      duration: 0.95 + 0.75 * next(),
      ox: Math.cos(angle) * radius,
      oy: Math.sin(angle) * radius,
      swirl: (next() < 0.5 ? -1 : 1) * (0.7 + 1.1 * next()),
      size: [0.9, 1.4, 3.4][tier] * (0.85 + 0.3 * next()),
      tier,
      bright: 0.45 + 0.55 * next(),
      twinkle: next() * 6.28,
      twinkleSpeed: 6 + 10 * next(),
    });
  }
  return { context, W, H, layout, particles, logo, dot: softDot() };
}

function particleAt(particle, t) {
  const q = seg(t, particle.arrive - particle.duration, particle.duration);
  const k = Math.pow(1 - q, 2.4);
  const angle = particle.swirl * k;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [particle.tx + (particle.ox * cos - particle.oy * sin) * k, particle.ty + (particle.ox * sin + particle.oy * cos) * k, q];
}

function drawStreaks(scene, t, keep) {
  const { context, particles, dot } = scene;
  const buckets = Array.from({ length: AlphaSteps }, () => []);
  for (const particle of particles) {
    if (t < particle.arrive - particle.duration || t >= particle.arrive) continue;
    const [x, y, q] = particleAt(particle, t);
    const alpha = (0.22 + 0.78 * Math.pow(q, 1.3)) * particle.bright;
    if (particle.tier === Tier.Bokeh) {
      const size = particle.size * 4 * (1.8 - 0.8 * q);
      context.globalAlpha = alpha * 0.4 * keep;
      context.drawImage(dot, x - size / 2, y - size / 2, size, size);
      continue;
    }
    const [px, py] = particleAt(particle, t - 0.045);
    buckets[Math.min(AlphaSteps - 1, Math.floor(alpha * AlphaSteps))].push(px, py, x, y);
  }
  context.lineWidth = 1.1;
  buckets.forEach((lines, step) => {
    if (lines.length === 0) return;
    context.globalAlpha = ((step + 0.5) / AlphaSteps) * keep;
    context.beginPath();
    for (let i = 0; i < lines.length; i += 4) {
      context.moveTo(lines[i], lines[i + 1]);
      context.lineTo(lines[i + 2], lines[i + 3]);
    }
    context.stroke();
  });
}

function drawLoader(scene, t, progress, keep) {
  const { context, W, H } = scene;
  const x = W - 56;
  const y = H - 56;
  const radius = 22;
  context.globalAlpha = keep;
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
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
  context.globalAlpha = 0.5 * keep;
  context.fillRect(0, H - 2, W, 1);
  context.globalAlpha = 1;
}

function draw(scene, t) {
  const { context, W, H, layout, particles } = scene;
  const leave = settle(seg(t, LeaveAt, End - LeaveAt));
  const keep = 1 - leave;
  context.globalCompositeOperation = 'source-over';
  context.clearRect(0, 0, W, H);
  context.globalAlpha = keep;
  context.fillStyle = Ink;
  context.fillRect(0, 0, W, H);

  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.lineCap = 'round';
  drawStreaks(scene, t, keep);

  const grain = (t < Peak ? 1 : clamp(1 - (t - Peak) / 0.7)) * keep;
  let arrived = 0;
  for (const particle of particles) {
    if (t < particle.arrive) continue;
    arrived += 1;
    if (grain <= 0 || particle.tier === Tier.Bokeh) continue;
    const pop = Math.exp(-(t - particle.arrive) / 0.12);
    const twinkle = 0.55 + 0.25 * Math.sin(particle.twinkle + t * particle.twinkleSpeed);
    const size = particle.size * (1 + 0.8 * pop);
    context.globalAlpha = Math.min(1, twinkle * particle.bright + 1.2 * pop) * grain * 0.85;
    context.fillRect(particle.tx - size / 2, particle.ty - size / 2, size, size);
  }

  const gathered = arrived / particles.length;
  const solid = seg(t, Peak - 0.04, 0.07);
  const flash = t < Peak - 0.03 ? 0 : t < Peak + 0.02 ? seg(t, Peak - 0.03, 0.05) : Math.exp(-(t - Peak - 0.02) / 0.22);
  const afterglow = t < Peak ? 0 : Math.exp(-(t - Peak) / 2.2);
  const x = layout.x - layout.pad;
  const y = layout.y - layout.pad;
  if (flash > 0.01) {
    const burst = context.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.6);
    burst.addColorStop(0, 'rgba(232, 230, 220, 0.22)');
    burst.addColorStop(1, 'rgba(232, 230, 220, 0)');
    context.globalAlpha = flash * keep;
    context.fillStyle = burst;
    context.fillRect(0, 0, W, H);
    context.fillStyle = Cream;
  }
  context.globalAlpha = (0.22 * gathered * gathered * (1 - solid) + (0.14 + 0.1 * afterglow) * solid + 0.55 * flash) * keep;
  context.drawImage(layout.glow, x, y);
  context.globalAlpha = (0.5 * flash + 0.1 * afterglow * solid) * keep;
  context.drawImage(layout.halo, x, y);
  context.globalAlpha = 0.9 * solid * keep;
  context.drawImage(layout.sharp, x, y);
  context.globalCompositeOperation = 'source-over';
  drawLoader(scene, t, gathered, keep);
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
    try {
      window.localStorage.setItem(SeenKey, '1');
    } catch {
      return;
    }
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
