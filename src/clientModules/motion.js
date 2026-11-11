import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const RevealSelector = '.markdown h2, .markdown h3, .markdown .zoomable-image, .markdown table, .markdown .theme-admonition, .pagination-nav';
const StripCount = 6;
const WipeDuration = 700;

let observer = null;

function observeContent() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.inview = '';
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const element of document.querySelectorAll(RevealSelector)) {
    if (!('inview' in element.dataset)) observer.observe(element);
  }
}

function wipe() {
  const overlay = document.createElement('div');
  overlay.className = 'page-wipe';
  for (let i = 0; i < StripCount; i += 1) overlay.append(document.createElement('span'));
  document.body.append(overlay);
  window.setTimeout(() => overlay.remove(), WipeDuration);
}

export function onRouteDidUpdate({ location, previousLocation }) {
  if (previousLocation && previousLocation.pathname !== location.pathname) wipe();
}

if (ExecutionEnvironment.canUseDOM) {
  let scheduled = false;
  const scan = () => {
    scheduled = false;
    observeContent();
  };
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    window.setTimeout(scan, 0);
  }).observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(scan, 0);
}
