import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const MaxLength = 220;
const Gap = 8;
const Margin = 16;
const HideDelay = 250;

function createCard() {
  const card = document.createElement('div');
  card.className = 'link-preview';
  card.hidden = true;
  const title = document.createElement('div');
  title.className = 'link-preview__title';
  const text = document.createElement('div');
  card.append(title, text);
  document.body.append(card);
  return { card, title, text };
}

function entryKey(link) {
  const url = new URL(link.href);
  if (url.origin !== window.location.origin) return null;
  if (!url.pathname.startsWith(`${siteConfig.baseUrl}docs/`)) return null;
  return url.pathname.replace(/\/$/, '') + decodeURIComponent(url.hash);
}

function findEntry(index, key) {
  const position = index.findIndex((entry) => entry.url === key);
  if (position < 0) return null;
  const entry = index[position];
  if (entry.text || entry.heading) return entry;
  const next = index[position + 1];
  return next && next.page === entry.page ? { ...next, heading: '' } : entry;
}

function place(card, link) {
  const rect = link.getBoundingClientRect();
  const width = card.offsetWidth;
  const left = Math.min(rect.left, window.innerWidth - width - Margin);
  const below = rect.bottom + Gap;
  const fitsBelow = below + card.offsetHeight < window.innerHeight - Margin;
  card.style.left = `${Math.max(Margin, left)}px`;
  card.style.top = `${fitsBelow ? below : rect.top - Gap - card.offsetHeight}px`;
}

if (ExecutionEnvironment.canUseDOM && window.matchMedia('(hover: hover)').matches) {
  let index = null;
  let requested = false;
  let hovered = null;
  let parts = null;

  let hideTimer = 0;

  const hide = () => {
    window.clearTimeout(hideTimer);
    hovered = null;
    if (parts) parts.card.hidden = true;
  };

  const keep = () => window.clearTimeout(hideTimer);

  const hideSoon = () => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, HideDelay);
  };

  const createHoverableCard = () => {
    const created = createCard();
    created.card.addEventListener('mouseenter', keep);
    created.card.addEventListener('mouseleave', hideSoon);
    return created;
  };

  const show = (link) => {
    if (!index || hovered !== link) return;
    const key = entryKey(link);
    const entry = key && findEntry(index, key);
    if (!entry || !entry.text) return;
    parts ??= createHoverableCard();
    parts.title.textContent = entry.heading ? `${entry.page} › ${entry.heading}` : entry.page;
    parts.text.textContent = entry.text.length > MaxLength ? `${entry.text.slice(0, MaxLength)}…` : entry.text;
    parts.card.hidden = false;
    place(parts.card, link);
  };

  document.addEventListener('mouseover', (event) => {
    const link = event.target.closest?.('.markdown a[href]:not(.hash-link):not(.zoomable-image)');
    if (!link) return;
    keep();
    if (link === hovered) return;
    hovered = link;
    if (!requested) {
      requested = true;
      fetch(`${siteConfig.baseUrl}search-index.json`)
        .then((response) => response.json())
        .then((entries) => {
          index = entries;
          if (hovered) show(hovered);
        })
        .catch(() => {
          index = [];
        });
    }
    show(link);
  });

  document.addEventListener('mouseout', (event) => {
    if (hovered && hovered.contains(event.target) && !hovered.contains(event.relatedTarget)) hideSoon();
  });
  document.addEventListener('scroll', hide, { passive: true });
  document.addEventListener('click', (event) => {
    if (!parts?.card.contains(event.target)) hide();
  });
}
