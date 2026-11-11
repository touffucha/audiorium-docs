import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const RevealSelector = '.markdown h2, .markdown .zoomable-image';

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
