import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const Cream = '#e8e6dc';
const MaxStep = 0.05;
const StallSeconds = 3;
const SkipKeys = new Set(['Escape', 'Enter', ' ']);
const LogoWidth = 'clamp(240px, 42vw, 600px)';
const Part = { Ring: 0, Line: 1, Arcs: 2, Dot: 3, Name: 4 };
const LogoOut = 1.85;
const LogoFade = 0.3;
const Leave = 0.5;
const End = LogoOut + LogoFade + Leave;

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, start, duration) => clamp((t - start) / duration);
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const easeOutQuart = (p) => 1 - Math.pow(1 - p, 4);
const easeInOut = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - Math.pow(-2 * p + 2, 3) / 2);

function draw(path, p) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length * (1 - p)}`;
  path.style.opacity = p > 0 ? 1 : 0;
}

function drawLogo(parts, t) {
  draw(parts[Part.Ring], easeOutQuart(seg(t, 0.15, 0.8)));
  draw(parts[Part.Line], easeOutQuart(seg(t, 0.55, 0.8)));
  draw(parts[Part.Arcs], easeOut(seg(t, 1.15, 0.4)));
  parts[Part.Dot].style.opacity = easeOut(seg(t, 1.35, 0.25));
  const name = easeOut(seg(t, 0.95, 0.4));
  parts[Part.Name].style.opacity = name;
  parts[Part.Name].style.filter = `blur(${(1 - name) * 3}px)`;
}

function logoElement(source) {
  const holder = document.createElement('div');
  holder.innerHTML = source;
  const svg = holder.querySelector('svg');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  Object.assign(svg.style, { width: LogoWidth, height: 'auto', overflow: 'visible' });
  for (const path of svg.querySelectorAll('path')) {
    if (path.getAttribute('fill') !== 'none') path.setAttribute('fill', Cream);
    if (path.getAttribute('stroke')) path.setAttribute('stroke', Cream);
    path.style.opacity = 0;
  }
  return svg;
}

function play(source) {
  const root = document.documentElement;
  const overlay = document.createElement('div');
  overlay.className = 'intro';
  Object.assign(overlay.style, { background: 'var(--color-curtain)', display: 'grid', placeItems: 'center' });
  const svg = logoElement(source);
  const parts = [...svg.querySelectorAll('path')];
  const logo = document.createElement('div');
  logo.append(svg);
  overlay.append(logo);
  document.body.append(overlay);
  let frame = 0;
  let elapsed = 0;
  let previous = 0;
  let lastFrameAt = window.performance.now();

  const skip = (event) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (SkipKeys.has(event.key)) finish();
  };
  const watchdog = window.setInterval(() => {
    const stalled = window.performance.now() - lastFrameAt > StallSeconds * 1000;
    if (stalled && document.visibilityState === 'visible') finish();
  }, 1000);
  function finish() {
    window.removeEventListener('keydown', skip);
    window.cancelAnimationFrame(frame);
    window.clearInterval(watchdog);
    overlay.remove();
    delete root.dataset.intro;
  }
  const render = (t) => {
    drawLogo(parts, t);
    logo.style.opacity = String(1 - easeInOut(seg(t, LogoOut, LogoFade)));
    overlay.style.opacity = String(1 - easeOutQuart(seg(t, LogoOut + LogoFade, Leave)));
  };
  const tick = (now) => {
    if (previous) elapsed += Math.min(MaxStep, (now - previous) / 1000);
    previous = now;
    lastFrameAt = window.performance.now();
    if (elapsed >= End) {
      finish();
      return;
    }
    render(elapsed);
    frame = window.requestAnimationFrame(tick);
  };

  overlay.addEventListener('click', finish);
  window.addEventListener('keydown', skip);
  try {
    render(0);
  } catch (error) {
    finish();
    throw error;
  }
  root.dataset.intro = 'playing';
  frame = window.requestAnimationFrame(tick);
}

function start() {
  window
    .fetch(`${siteConfig.baseUrl}img/logo-ink.svg`)
    .then((response) => (response.ok ? response.text() : Promise.reject(new Error(`Audiorium intro: the logo returned ${response.status}.`))))
    .then(play)
    .catch((error) => {
      delete document.documentElement.dataset.intro;
      throw error;
    });
}

if (ExecutionEnvironment.canUseDOM && 'intro' in document.documentElement.dataset) start();
