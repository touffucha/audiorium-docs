import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const SeenKey = 'audiorium-intro-seen';
const Ink = '#1b1a18';
const Cream = '#e8e6dc';
const Peak = 2.1;
const WelcomeAt = 2.2;
const LeaveAt = 4.35;
const End = 5;
const Text = 'Welcome to Audiorium';
const TypeCharsPerSecond = 26;
const ParticleLimit = 9000;

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, start, duration) => clamp((t - start) / duration);
const glide = (p) => 1 - Math.pow(1 - p, 4);
const sine = (p) => 0.5 - 0.5 * Math.cos(Math.PI * p);
const settle = (p) => (p < 0.5 ? 8 * p ** 4 : 1 - Math.pow(-2 * p + 2, 4) / 2);

function overshoot(p, peakAt, peak, back, returnSeconds) {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  return p < peakAt ? peak * glide(p / peakAt) : peak - back * sine((p - peakAt) / returnSeconds);
}

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

function buildScene(canvas, logo) {
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W * ratio;
  canvas.height = H * ratio;
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const w = Math.round(Math.min(W * 0.46, 720));
  const h = Math.round((w * logo.height) / logo.width);
  const layout = { w, h, x: (W - w) / 2, y: (H - h) / 2, pad: 60 };
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
  const cx = layout.x + w / 2;
  const cy = layout.y + h / 2;
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const k = Math.floor((next() * points.length) / 2) * 2;
    const tx = layout.x + points[k];
    const ty = layout.y + points[k + 1];
    const order = 0.72 * next() + 0.28 * (points[k] / w);
    const angle = Math.atan2(ty - cy, (tx - cx) * 0.45) + (next() - 0.5) * 2.2;
    const radius = (0.06 + 0.26 * Math.pow(next(), 1.5)) * Math.max(W, H);
    particles.push({
      tx,
      ty,
      arrive: Peak - 0.05 - 1.3 * Math.pow(1 - order, 2.4),
      duration: 0.5 + 0.6 * next(),
      ox: Math.cos(angle) * radius,
      oy: Math.sin(angle) * radius * 0.8,
      swirl: (next() < 0.5 ? -1 : 1) * (0.15 + 0.4 * next()),
      size: (next() < 0.35 ? 1.3 : 0.8) * (0.85 + 0.3 * next()),
      bright: 0.45 + 0.55 * next(),
      twinkle: next() * 6.28,
      twinkleSpeed: 6 + 10 * next(),
    });
  }
  return { context, W, H, layout, particles, logo };
}

function particleAt(particle, t) {
  const q = seg(t, particle.arrive - particle.duration, particle.duration);
  const k = Math.pow(1 - q, 2.6);
  const angle = particle.swirl * k * k;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [particle.tx + (particle.ox * cos - particle.oy * sin) * k, particle.ty + (particle.ox * sin + particle.oy * cos) * k, q];
}

function drawLogo(scene, t, keep) {
  const { context, layout, particles } = scene;
  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.lineCap = 'round';
  const grain = (t < Peak ? 1 : clamp(1 - (t - Peak) / 0.7)) * keep;
  const rise = seg(t, 0.3, 1.75);
  let arrived = 0;
  for (const particle of particles) {
    if (t < particle.arrive - particle.duration) continue;
    if (t >= particle.arrive) {
      arrived += 1;
      if (grain <= 0) continue;
      const pop = Math.exp(-(t - particle.arrive) / 0.12);
      const twinkle = 0.55 + 0.25 * Math.sin(particle.twinkle + t * particle.twinkleSpeed);
      const size = particle.size * (1 + 0.8 * pop);
      context.globalAlpha = Math.min(1, twinkle * particle.bright + 1.2 * pop) * grain * 0.85;
      context.fillRect(particle.tx - size / 2, particle.ty - size / 2, size, size);
      continue;
    }
    const [x, y, q] = particleAt(particle, t);
    const [px, py] = particleAt(particle, t - 0.022);
    context.globalAlpha = Math.pow(q, 1.6) * (0.25 + 0.55 * rise) * particle.bright * keep;
    context.lineWidth = particle.size * (0.5 + 0.4 * q);
    context.beginPath();
    context.moveTo(px, py);
    context.lineTo(x, y);
    context.stroke();
  }
  const gathered = arrived / particles.length;
  const solid = seg(t, Peak - 0.04, 0.07);
  const flash = t < Peak - 0.03 ? 0 : t < Peak + 0.02 ? seg(t, Peak - 0.03, 0.05) : Math.exp(-(t - Peak - 0.02) / 0.2);
  const afterglow = t < Peak ? 0 : Math.exp(-(t - Peak) / 2.2);
  const x = layout.x - layout.pad;
  const y = layout.y - layout.pad;
  context.globalAlpha = (0.22 * gathered * gathered * (1 - solid) + (0.14 + 0.1 * afterglow) * solid + 0.55 * flash) * keep;
  context.drawImage(layout.glow, x, y);
  context.globalAlpha = (0.5 * flash + 0.1 * afterglow * solid) * keep;
  context.drawImage(layout.halo, x, y);
  context.globalAlpha = 0.9 * solid * keep;
  context.drawImage(layout.sharp, x, y);
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
}

function drawWelcome(scene, s, keep) {
  if (s < 0) return;
  const { context, W, H, layout } = scene;
  const fontSize = Math.max(16, Math.min(22, W * 0.016));
  context.font = `300 ${fontSize}px Jost, sans-serif`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  const edges = [0];
  for (let i = 1; i <= Text.length; i += 1) edges.push(context.measureText(Text.slice(0, i)).width);
  const radius = fontSize * 0.62;
  const gap = fontSize * 0.7;
  const total = radius * 2 + gap + edges[Text.length] + 8;
  const beside = layout.x - total - 48 >= 24;
  const left = beside ? layout.x - total - 48 : layout.x;
  const mid = beside ? H / 2 : layout.y + layout.h + 56;
  const cx = left + radius;
  const textX = cx + radius + gap;
  const top = mid - fontSize * 0.78;
  const bottom = mid + fontSize * 0.78;
  const lineY = mid + radius + 4;
  const lineEnd = textX + edges[Text.length] + 6;
  const typeEnd = 0.64 + Text.length / TypeCharsPerSecond;
  const thin = typeEnd + 0.03;
  const typed = s < 0.64 ? 0 : Math.min(Text.length, Math.floor((s - 0.64) * TypeCharsPerSecond) + 1);

  context.globalAlpha = keep;
  context.strokeStyle = Cream;
  context.fillStyle = Cream;
  context.lineWidth = 1.4;
  context.lineCap = 'butt';

  const spin = ((110 * Math.max(0, s - 0.4) + 220 * clamp(s - 0.64, 0, typeEnd - 0.64)) * Math.PI) / 180;
  const ring = sine(seg(s, 0.04, 0.36));
  const groove = sine(seg(s, 0.14, 0.3));
  const dot = overshoot(seg(s, 0, 0.2), 0.6, 1.18, 0.18, 0.4);
  context.save();
  context.translate(cx, mid);
  context.rotate(spin);
  if (ring > 0) {
    context.beginPath();
    context.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring);
    context.stroke();
  }
  if (groove > 0) {
    context.beginPath();
    context.arc(0, 0, radius * 0.58, 0.3, 0.3 + Math.PI * 1.25 * groove);
    context.stroke();
  }
  context.beginPath();
  context.arc(0, 0, 1.7 * dot, 0, Math.PI * 2);
  context.fill();
  context.restore();

  const arc = glide(seg(s, 0.12, 0.14));
  if (arc > 0) {
    context.beginPath();
    context.arc(cx, mid, radius + 4, Math.PI / 2, Math.PI / 2 + ((115 * Math.PI) / 180) * arc);
    context.stroke();
  }
  if (arc >= 0.999) {
    const end = cx + (lineEnd - cx) * sine(seg(s, 0.24, 0.44));
    context.fillRect(cx, lineY - 0.7, Math.max(0, end - cx), 1.4);
  }

  context.fillText(Text.slice(0, typed), textX, mid);

  let block = null;
  let inverted = -1;
  if (s >= 0.56 && s < 0.64) {
    const p = overshoot(seg(s, 0.56, 0.08), 0.7, 1.04, 0.04, 0.3);
    block = [textX - 3, lineY + (top - lineY) * p, edges[1] + 6, (bottom - top) * p];
  } else if (s >= 0.64 && s < thin) {
    inverted = Math.max(0, typed - 1);
    block = [textX + edges[inverted] - 3, top, edges[inverted + 1] - edges[inverted] + 6, bottom - top];
  } else if (s >= thin) {
    const since = s - thin;
    const visible = since < 0.6 || Math.floor((since - 0.6) / 0.53) % 2 === 1;
    const p = glide(seg(s, thin, 0.07));
    const from = textX + edges[Text.length - 1] - 3;
    const to = textX + edges[Text.length] + 2;
    if (visible) block = [from + (to - from) * p, top, to + 3 - (from + (to - from) * p), bottom - top];
  }
  if (block) {
    context.fillRect(block[0], block[1], block[2], block[3]);
    if (inverted >= 0) {
      context.fillStyle = Ink;
      context.fillText(Text[inverted], textX + edges[inverted], mid);
    }
  }
  context.globalAlpha = 1;
}

function draw(scene, t) {
  const { context, W, H } = scene;
  const leave = settle(seg(t, LeaveAt, End - LeaveAt));
  context.clearRect(0, 0, W, H);
  context.globalAlpha = 1 - leave;
  context.fillStyle = Ink;
  context.fillRect(0, 0, W, H);
  context.globalAlpha = 1;
  drawLogo(scene, t, 1 - leave);
  drawWelcome(scene, t - WelcomeAt, 1 - leave);
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
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timeout);
    canvas.remove();
    delete document.documentElement.dataset.intro;
    window.removeEventListener('keydown', finish);
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
    const begin = () => {
      scene = buildScene(canvas, logo);
      started = window.performance.now();
      draw(scene, 0);
      frame = window.requestAnimationFrame(tick);
    };
    (document.fonts?.load('300 20px Jost') ?? Promise.resolve()).then(begin, begin);
  };
  logo.onerror = finish;
  logo.src = `${siteConfig.baseUrl}img/logo-ink.svg`;
}

if (ExecutionEnvironment.canUseDOM && 'intro' in document.documentElement.dataset) play();
