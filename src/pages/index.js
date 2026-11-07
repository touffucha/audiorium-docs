import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const presets = [
  { name: 'Cinema', lowHz: 60, lowQ: 2.5, highHz: 20000, highQ: 1.5 },
  { name: 'Concert', lowHz: 50, lowQ: 1, highHz: 15000, highQ: 1 },
  { name: 'Lounge', lowHz: 90, lowQ: 2, highHz: 11000, highQ: 1 },
  { name: 'Submerged', lowHz: 80, lowQ: 2, highHz: 350, highQ: 2 },
  { name: 'Radio', lowHz: 300, lowQ: 2, highHz: 3500, highQ: 1.5 },
];

const tabs = [
  { id: 'sound', name: 'Sound Mode', scope: 'GLOBAL', icon: 'soundmode', image: 'sound', text: '音の響きのプリセットを切り替えます。調整した音は保存して呼び出せます。' },
  { id: 'speakers', name: 'Speaker EQ', scope: 'GLOBAL', icon: 'speakereq', image: 'speaker-eq', text: 'スピーカーごとに EQ、Reverb、音量を調整します。' },
  { id: 'live', name: 'Live', scope: 'GLOBAL', icon: 'live', image: 'live', text: 'ムービングライトの色、動き、速さ、キューを操作します。', note: '照明システム（拡張パッケージ）が必要' },
  { id: 'effects', name: 'Effects', scope: 'LOCAL', icon: 'effects', image: 'effects', text: '音に連動する視界エフェクトを切り替えます。操作した人の画面にのみ反映されます。', note: 'AudioLink が必要' },
];

const layouts = [
  { name: 'Stereo', speakers: ['FL', 'FR'] },
  { name: 'Surround', speakers: ['FL', 'FR', 'SL', 'SR'] },
  { name: 'Surround + Top', speakers: ['FL', 'FR', 'SL', 'SR', 'TML', 'TMR'] },
];

const speakerPositions = {
  FL: [120, 70], FR: [280, 70], SL: [80, 210], SR: [320, 210], TML: [150, 160], TMR: [250, 160],
};

const compat = [['PLAYER', 'YamaPlayer ／ VizVid'], ['UNITY', '2022.3.22f1'], ['SDK', '3.10.5'], ['PLATFORM', 'PC']];

const steps = [
  ['動画プレイヤーを選択', 'Studio がスピーカーとコンソールを配置します。'],
  ['レイアウトを選択して反映', 'Stereo、Surround、Surround + Top から選択します。各スピーカーの音量は、視聴位置で基準レベルになるよう自動で調整されます。'],
  ['VRChat で確認', 'ビルドして、コンソールでプリセットを切り替えます。'],
];

const guide = [
  ['導入する', [
    ['動作環境を確認する', '/docs/getting-started/requirements', '動作環境'],
    ['プロジェクトにインポートする', '/docs/getting-started/install', 'インストール'],
    ['最初の音を鳴らす', '/docs/getting-started/quick-start', 'クイックスタート'],
    ['新しい版に更新する', '/docs/getting-started/update', '更新する'],
  ]],
  ['調整する', [
    ['スピーカーと視聴位置を調整する', '/docs/guides/speaker-position', 'スピーカーの位置'],
    ['Sound Mode のプリセットを編集する', '/docs/guides/edit-presets', 'プリセット'],
    ['コンソールの外観と位置を変更する', '/docs/guides/console-appearance', 'コンソール'],
    ['操作権限を設定する', '/docs/console/permissions', '操作権限'],
    ['照明を配置する', '/docs/guides/lights', '照明'],
  ]],
  ['困ったとき', [
    ['Check タブの問題を解決する', '/docs/help/troubleshooting', 'トラブルシューティング'],
    ['ワールドから削除する', '/docs/help/uninstall', '取り外し'],
    ['変更点を確認する', '/docs/changelog', '更新履歴'],
  ]],
];

const FrequencyMin = 20;
const Decades = 3;
const Plot = { left: 80, right: 1520, top: 96, floor: 250, dbScale: 5, minDb: -30, axis: 262 };

function response(f, { lowHz, lowQ, highHz, highQ }) {
  const high = (r, q) => 20 * Math.log10((r * r) / Math.sqrt((1 - r * r) ** 2 + (r / q) ** 2));
  const low = (r, q) => 20 * Math.log10(1 / Math.sqrt((1 - r * r) ** 2 + (r / q) ** 2));
  return high(f / lowHz, lowQ) + low(f / highHz, highQ);
}

function frequencyX(f) {
  return Plot.left + (Plot.right - Plot.left) * Math.log10(f / FrequencyMin) / Decades;
}

function blend(a, b, t) {
  return {
    lowHz: a.lowHz ** (1 - t) * b.lowHz ** t,
    highHz: a.highHz ** (1 - t) * b.highHz ** t,
    lowQ: a.lowQ * (1 - t) + b.lowQ * t,
    highQ: a.highQ * (1 - t) + b.highQ * t,
  };
}

function curvePath(preset, offset) {
  const points = [];
  for (let i = 0; i <= 240; i++) {
    const f = FrequencyMin * 10 ** (Decades * i / 240);
    const db = Math.max(response(f, preset), Plot.minDb);
    const y = Math.min(Plot.top - db * Plot.dbScale + offset, Plot.floor);
    points.push(`${frequencyX(f).toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${points.join(' L')}`;
}

const LinesPerPreset = 5;
const curves = presets.flatMap((preset, k) => {
  const next = presets[(k + 1) % presets.length];
  return Array.from({ length: LinesPerPreset }, (_, j) => ({
    key: `${preset.name}-${j}`,
    d: curvePath(blend(preset, next, 0.5 * j / LinesPerPreset), j * 4.8 + k * 3.5),
    opacity: j === 0 ? 0.7 : 0.08 + 0.12 * Math.sin(Math.PI * j / LinesPerPreset),
    width: j === 0 ? 1.4 : 0.8,
    delay: k * 90 + j * 25,
  }));
});

const ticks = [[20, '20'], [50, '50'], [100, '100'], [200, '200'], [500, '500'], [1000, '1k'], [2000, '2k'], [5000, '5k'], [10000, '10k'], [20000, '20 kHz']];

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);
  return [ref, inView];
}

function Brackets({ children, className }) {
  return (
    <span className={clsx('brackets', className)}>
      <span className="bracket" aria-hidden="true" />
      {children}
      <span className="bracket" aria-hidden="true" />
    </span>
  );
}

function SectionTitle({ title, caption }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      <span>{caption}</span>
    </div>
  );
}

function EqBundle() {
  return (
    <figure className={styles.bundle}>
      <figcaption>SOUND MODE ／ プリセットの周波数特性</figcaption>
      <svg viewBox="0 0 1600 300" role="img" aria-label="Sound Mode のプリセットの周波数特性">
        <g fill="none" stroke="currentColor" className={styles.curves}>
          {curves.map((c) => (
            <path key={c.key} d={c.d} pathLength="1" strokeWidth={c.width} strokeOpacity={c.opacity} style={{ '--delay': `${c.delay}ms` }} />
          ))}
        </g>
        <g className={styles.axis}>
          <line x1={Plot.left} x2={Plot.right} y1={Plot.axis} y2={Plot.axis} />
          {ticks.map(([f, label]) => (
            <g key={label}>
              <line x1={frequencyX(f)} x2={frequencyX(f)} y1={['100', '1k', '10k'].includes(label) ? 256 : 260} y2="268" />
              <text x={frequencyX(f)} y="288">{label}</text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );
}

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const { links } = siteConfig.customFields;
  const [ref, inView] = useInView(0.1);
  return (
    <header ref={ref} className={clsx(styles.hero, inView && styles.play)}>
      <p className={clsx(styles.label, styles.rise)} style={{ '--at': '0ms' }}>- DOCUMENTATION -</p>
      <img className={clsx(styles.logo, styles.rise)} style={{ '--at': '80ms' }} src={useBaseUrl('/img/logo-ink.svg')} alt="Audiorium" width="954" height="212" />
      <h1 className={clsx(styles.lead, styles.rise)} style={{ '--at': '760ms' }}>来訪者が操作できる、ワールドの音響・演出コンソール</h1>
      <dl className={clsx(styles.compat, styles.rise)} style={{ '--at': '840ms' }}>
        {compat.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <div className={clsx(styles.actions, styles.rise)} style={{ '--at': '960ms' }}>
        <Brackets>
          <Link className={clsx(styles.button, styles.primary, 'plate')} to="/docs/getting-started/quick-start">
            クイックスタート<span className={styles.rule} /><span className={styles.go} />
          </Link>
        </Brackets>
        <a className={clsx(styles.button, 'plate')} href={links.world}>公開ワールドで試す</a>
      </div>
      <div className={styles.stage}>
        <span className={styles.wipe} aria-hidden="true" />
        <img src={useBaseUrl('/img/console/sound.webp')} alt="コンソールの Sound Mode タブ" width="2000" height="1063" />
      </div>
      <EqBundle />
    </header>
  );
}

function Flow() {
  const [ref, inView] = useInView();
  const [layout, setLayout] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setLayout((i) => (i + 1) % layouts.length), 2400);
    return () => clearInterval(timer);
  }, [inView]);
  const shown = new Set(layouts[layout].speakers);
  return (
    <section ref={ref} className={clsx(styles.band, styles.flow, inView && styles.play)}>
      <SectionTitle title="導入の流れ" caption="SETUP" />
      <div className={styles.flowBody}>
        <ol className={styles.steps}>
          {steps.map(([name, text], i) => (
            <li key={name} className={styles.rise} style={{ '--at': `${200 + i * 120}ms` }}>
              <strong>{name}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <figure className={clsx(styles.plan, styles.rise)} style={{ '--at': '120ms' }}>
          <svg viewBox="0 0 400 290" role="img" aria-label={`スピーカーの配置の図：${layouts[layout].name}`}>
            <line className={styles.screenLine} x1="110" x2="290" y1="30" y2="30" />
            <text className={styles.planLabel} x="200" y="20">スクリーン</text>
            {Object.entries(speakerPositions).map(([code, [x, y]]) => (
              <g key={code} className={clsx(styles.speaker, shown.has(code) && styles.speakerOn)}>
                <line className={styles.ray} x1="200" y1="230" x2={x} y2={y} />
                <rect x={x - 16} y={y - 12} width="32" height="24" />
                <text x={x} y={y + 4}>{code}</text>
              </g>
            ))}
            <circle className={styles.listener} cx="200" cy="230" r="7" />
            <text className={styles.planLabel} x="200" y="258">視聴位置</text>
          </svg>
          <figcaption>
            {layouts.map((l, i) => (
              <span key={l.name} className={clsx(i === layout && styles.current)}>{l.name}</span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Console() {
  const [ref, inView] = useInView(0.2);
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const select = (index) => {
    if (index === current || leaving) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCurrent(index); return; }
    setLeaving(true);
    setTimeout(() => { setCurrent(index); setLeaving(false); }, 260);
  };
  const tab = tabs[current];
  const img = useBaseUrl('/img/');
  return (
    <section ref={ref} className={clsx(styles.band, styles.console, tab.scope === 'LOCAL' && styles.local, inView && styles.play)}>
      <SectionTitle title="コンソール" caption="CONSOLE" />
      <p className={clsx(styles.scope, styles.rise)} style={{ '--at': '120ms' }}>
        <span>GLOBAL</span>ワールド全体に反映
        <span>LOCAL</span>操作した人の画面に反映
      </p>
      <div className={styles.consoleBody}>
        <div className={styles.tabList} role="tablist" aria-label="コンソールのタブ">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={clsx(styles.tab, 'plate', i === current && styles.tabOn, styles.rise)}
              style={{ '--at': `${240 + i * 80}ms` }}
              onClick={() => select(i)}>
              <span className={styles.tabMark}><img src={`${img}icons/${t.icon}.png`} alt="" /></span>
              <span className={styles.tabName}>
                <strong>{t.name}</strong>
                <small>{t.scope}</small>
              </span>
            </button>
          ))}
        </div>
        <div className={clsx(styles.screen, styles.rise, leaving && styles.leaving)} style={{ '--at': '160ms' }} role="tabpanel">
          <div className={styles.frame}>
            <img key={tab.id} className={styles.shot} src={`${img}console/${tab.image}.webp`} alt={`コンソールの ${tab.name} タブ`} width="2000" height="1063" />
          </div>
          <div key={tab.id} className={styles.caption}>
            <p>{tab.text}</p>
            {tab.note && <p className={styles.note}>{tab.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Guide() {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} className={clsx(styles.band, inView && styles.play)}>
      <SectionTitle title="目的から探す" caption="GUIDE" />
      <div className={styles.guide}>
        {guide.map(([group, rows], g) => (
          <div key={group} className={styles.rise} style={{ '--at': `${120 + g * 100}ms` }}>
            <h3>{group}</h3>
            <ul>
              {rows.map(([purpose, to, page]) => (
                <li key={to}>
                  <Link to={to}>{purpose}<span>{page}</span></Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Audiorium ドキュメント" description="VRChat のワールドに配置する、来訪者が操作できる音響・演出コンソール Audiorium の導入と使い方">
      <Hero />
      <main>
        <Flow />
        <Console />
        <Guide />
      </main>
    </Layout>
  );
}
