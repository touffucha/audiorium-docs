import React, { useMemo, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const MaxResults = 12;
const ExcerptBefore = 14;
const ExcerptAfter = 44;

const normalize = (text) => text.normalize('NFKC').toLowerCase();

function excerpt(text, position, length) {
  const start = Math.max(0, position - ExcerptBefore);
  return {
    before: (start > 0 ? '…' : '') + text.slice(start, position),
    match: text.slice(position, position + length),
    after: text.slice(position + length, position + length + ExcerptAfter),
  };
}

function search(index, query) {
  const needle = normalize(query.trim());
  if (!needle) return [];
  const inHeading = [];
  const inText = [];
  for (const entry of index) {
    if (normalize(entry.heading || entry.page).includes(needle)) {
      inHeading.push({ entry, hit: null });
      continue;
    }
    const position = normalize(entry.text).indexOf(needle);
    if (position >= 0) inText.push({ entry, hit: excerpt(entry.text, position, needle.length) });
  }
  return [...inHeading, ...inText].slice(0, MaxResults);
}

export default function SidebarHeader() {
  const logo = useBaseUrl('/img/logo-ink.svg');
  const home = useBaseUrl('/docs/getting-started/overview');
  const indexUrl = useBaseUrl('/search-index.json');
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const requested = useRef(false);

  const loadIndex = () => {
    if (requested.current) return;
    requested.current = true;
    fetch(indexUrl)
      .then((response) => response.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  };

  const results = useMemo(() => (index ? search(index, query) : []), [index, query]);
  const searching = query.trim() !== '';

  return (
    <div className="sidebar-header">
      <Link to={home} className="sidebar-header__logo">
        <img src={logo} alt="Audiorium" />
      </Link>
      <div className="sidebar-search">
        <svg className="sidebar-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
        </svg>
        <input
          type="search"
          className="sidebar-search__input"
          placeholder="検索"
          aria-label="マニュアルを検索"
          value={query}
          onFocus={loadIndex}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
        />
      </div>
      {searching && index && (
        <ul className="sidebar-search__results">
          {results.length === 0 && <li className="sidebar-search__empty">見つかりません</li>}
          {results.map(({ entry, hit }) => (
            <li key={entry.url}>
              <Link to={entry.url} className="sidebar-search__result" onClick={() => setQuery('')}>
                <span className="sidebar-search__title">
                  {entry.heading ? `${entry.page} › ${entry.heading}` : entry.page}
                </span>
                {hit && (
                  <span className="sidebar-search__excerpt">
                    {hit.before}
                    <mark>{hit.match}</mark>
                    {hit.after}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
