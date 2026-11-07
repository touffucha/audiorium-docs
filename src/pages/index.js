import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const tabs = [
  {
    name: 'Sound Mode',
    scope: 'ワールド全体',
    image: 'console-sound',
    text: '音の響きのプリセットを切り替えます。デフォルトで 5 種類を用意し、内容はワールド制作者が Studio で変更できます。来訪者は調整した音を 3 つまで保存できます。',
  },
  {
    name: 'Speaker EQ',
    scope: 'ワールド全体',
    image: 'console-speakers',
    text: 'スピーカーごとに EQ、Reverb、音量を調整します。グラフで周波数の特性を確認しながら操作できます。',
  },
  {
    name: 'Live',
    scope: 'ワールド全体',
    image: 'console-lights',
    text: 'ムービングライトの色、動き、速さを操作します。Blinder や Strobe などのキューも使えます。',
    note: '照明システム（拡張パッケージ）が必要です。',
  },
  {
    name: 'Effects',
    scope: '自分の画面のみ',
    image: 'console-effects',
    text: '音に連動する視界エフェクトを切り替えます。操作した人の画面にのみ反映されます。',
    note: '視界エフェクトには AudioLink が必要です。LTCGI がワールドにある場合は、LTCGI の点灯と強さも操作できます。',
  },
];

const guide = [
  ['購入前に確認する必要な物と動作環境', '/docs/getting-started/requirements', '必要な物と動作環境'],
  ['プロジェクトへ導入する', '/docs/getting-started/install', 'インストール'],
  ['最初の音を鳴らすまでの流れを知る', '/docs/getting-started/quick-start', 'クイックスタート'],
  ['Audiorium でできることを知る', '/docs/getting-started/overview', 'できること'],
  ['Studio が表示する問題を解決する', '/docs/help/troubleshooting', 'トラブルシューティング'],
  ['ワールドから取り外す', '/docs/help/uninstall', '取り外し'],
  ['版ごとの変更を確認する', '/docs/changelog', '更新履歴'],
];

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const { links } = siteConfig.customFields;
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}><span>VRChat のワールドに設置する</span><span>音響・演出コンソール</span></h1>
        <p className={styles.heroLead}>
          動画プレイヤーの音をワールドに配置したスピーカーから鳴らし、音の響き、照明、視界エフェクトをワールド内のコンソールで操作します。
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/docs/getting-started/overview">はじめる</Link>
          <Link className={styles.secondary} to="/docs/getting-started/quick-start">クイックスタート</Link>
        </div>
        {links.booth && (
          <ul className={styles.heroLinks}>
            <li><a href={links.booth}>BOOTH の商品ページ</a></li>
          </ul>
        )}
      </div>
    </header>
  );
}

function ConsoleTabs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>コンソール</h2>
        <p className={styles.sectionLead}>
          来訪者は、ワールド内のコンソールの 4 つのタブで操作します。
        </p>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <article key={tab.name} className={styles.tab}>
              <img className={styles.tabImage} src={useBaseUrl(`/img/home/${tab.image}.webp`)} alt={`コンソールの ${tab.name} タブ`} width="1600" height="850" loading="lazy" />
              <div className={styles.tabText}>
                <h3 className={styles.tabName}>{tab.name}</h3>
                <p className={styles.tabScope}>反映：{tab.scope}</p>
                <p>{tab.text}</p>
                {tab.note && <p className={styles.tabNote}>{tab.note}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.studio}`}>
        <div className={styles.studioText}>
          <h2 className={styles.sectionTitle}>Audiorium Studio</h2>
          <p>
            セットアップに使うエディター拡張です。動画プレイヤーを選択すると、スピーカーとコンソールを配置します。レイアウトの選択、音量のバランスの確認、コンソールの設定、ビルドの前の確認を 1 つの画面で行えます。
          </p>
          <p>日本語、英語、中国語、韓国語で表示できます。</p>
          <Link className={styles.secondary} to="/docs/getting-started/quick-start">クイックスタートを読む</Link>
        </div>
        <img className={styles.studioImage} src={useBaseUrl('/img/studio/speakers.png')} alt="Audiorium Studio の Speakers タブ" width="1650" height="930" loading="lazy" />
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>目的から探す</h2>
        <table className={styles.guide}>
          <thead>
            <tr><th>したいこと</th><th>ページ</th></tr>
          </thead>
          <tbody>
            {guide.map(([purpose, to, page]) => (
              <tr key={to}><td>{purpose}</td><td><Link to={to}>{page}</Link></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Audiorium ドキュメント" description="VRChat のワールドに設置する音響・演出コンソール Audiorium の導入と使い方">
      <Hero />
      <main>
        <ConsoleTabs />
        <Studio />
        <Guide />
      </main>
    </Layout>
  );
}
