import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const tabs = [
  { name: 'Sound Mode', scope: 'GLOBAL', image: 'card-sound', text: '音の響きのプリセットを切り替えます。調整した音を 3 つまで保存できます。' },
  { name: 'Speaker EQ', scope: 'GLOBAL', image: 'card-speakers', text: 'スピーカーごとに EQ、Reverb、音量を調整します。' },
  { name: 'Live', scope: 'GLOBAL', image: 'card-lights', text: 'ムービングライトの色、動き、速さ、キューを操作します。', note: '照明システムが必要' },
  { name: 'Effects', scope: 'LOCAL', image: 'card-effects', text: '音に連動する視界エフェクトを、自分の画面で切り替えます。', note: 'AudioLink が必要' },
];

const guide = [
  ['購入前に必要な物と動作環境を確認する', '/docs/getting-started/requirements', '必要な物と動作環境'],
  ['プロジェクトへ導入する', '/docs/getting-started/install', 'インストール'],
  ['最初の音を鳴らすまでの流れを知る', '/docs/getting-started/quick-start', 'クイックスタート'],
  ['Audiorium でできることを知る', '/docs/getting-started/overview', 'できること'],
  ['Studio の各タブの項目を調べる', '/docs/studio/overview', 'Studio の画面と「反映」'],
  ['来訪者がコンソールでできることを知る', '/docs/console/operation', '来訪者の操作'],
  ['コンソールを操作できる人を決める', '/docs/console/permissions', '操作権限'],
  ['AudioLink・LTCGI と組み合わせる', '/docs/integrations/audiolink', 'AudioLink'],
  ['Studio が表示する問題を解決する', '/docs/help/troubleshooting', 'トラブルシューティング'],
  ['ワールドから取り外す', '/docs/help/uninstall', '取り外し'],
  ['版ごとの変更を確認する', '/docs/changelog', '更新履歴'],
];

function SectionTitle({ title, caption }) {
  return (
    <div className={styles.sectionTitle}>
      <h2>{title}</h2>
      <span className={styles.caption}>{caption}</span>
    </div>
  );
}

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const { links } = siteConfig.customFields;
  return (
    <header className={styles.hero}>
      <img className={styles.heroLogo} src={useBaseUrl('/img/logo-ink.svg')} alt="Audiorium" width="954" height="212" />
      <h1 className={styles.heroTitle}>
        <span>VRChat のワールドに設置する</span>
        <span>音響・演出コンソール</span>
      </h1>
      <p className={styles.heroDivider}>- DOCUMENTATION -</p>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/docs/getting-started/overview">はじめる</Link>
        <Link className={styles.secondary} to="/docs/getting-started/quick-start">クイックスタート</Link>
      </div>
      <figure className={styles.heroFigure}>
        <img src={useBaseUrl('/img/home/hero.webp')} alt="ワールドに設置した Audiorium のコンソール" width="1850" height="760" />
      </figure>
      {links.booth && (
        <p className={styles.heroLinks}><a href={links.booth}>BOOTH の商品ページ</a></p>
      )}
    </header>
  );
}

function ConsoleTabs() {
  return (
    <section className={`${styles.band} ${styles.bandWarm}`}>
      <SectionTitle title="コンソール" caption="CONSOLE" />
      <p className={styles.scopeLine}>
        <span className={styles.scopeLabel}>GLOBAL</span>ワールド全体に反映
        <span className={styles.scopeBar} aria-hidden="true" />
        <span className={styles.scopeLabel}>LOCAL</span>自分の画面に反映
      </p>
      <div className={styles.cards}>
        {tabs.map((tab) => (
          <article key={tab.name} className={styles.card}>
            <div className={styles.cardFrame}>
              <img src={useBaseUrl(`/img/home/${tab.image}.webp`)} alt={`コンソールの ${tab.name} タブ`} width="800" height="600" loading="lazy" />
            </div>
            <div className={styles.nameTag}>
              <span className={styles.nameMark} aria-hidden="true"><img src={useBaseUrl('/img/mark.svg')} alt="" width="220" height="216" /></span>
              <span className={styles.namePlate}>
                <strong>{tab.name}</strong>
                <small>{tab.scope}</small>
              </span>
            </div>
            <p className={styles.cardText}>{tab.text}</p>
            {tab.note && <p className={styles.cardNote}>{tab.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className={styles.band}>
      <SectionTitle title="Audiorium Studio" caption="EDITOR" />
      <div className={styles.studio}>
        <div className={styles.cardFrame}>
          <img src={useBaseUrl('/img/studio/speakers.png')} alt="Audiorium Studio の Speakers タブ" width="1650" height="930" loading="lazy" />
        </div>
        <div className={styles.studioText}>
          <p>セットアップに使うエディター拡張です。動画プレイヤーを選択すると、スピーカーとコンソールを配置します。</p>
          <p>レイアウトの選択、音量のバランスの確認、コンソールの設定、ビルドの前の確認を 1 つの画面で行えます。</p>
          <p className={styles.studioLangs}>日本語 · English · 简体中文 · 한국어</p>
          <Link className={styles.secondary} to="/docs/studio/overview">Studio の画面を見る</Link>
        </div>
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className={`${styles.band} ${styles.bandWarm}`}>
      <SectionTitle title="目的から探す" caption="GUIDE" />
      <table className={styles.guide}>
        <tbody>
          {guide.map(([purpose, to, page]) => (
            <tr key={to}>
              <td>{purpose}</td>
              <td><Link to={to}>{page}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Audiorium ドキュメント" description="VRChat のワールドに設置する音響・演出コンソール Audiorium の導入と使い方">
      <div className={styles.frame}>
        <Hero />
        <main>
          <ConsoleTabs />
          <Studio />
          <Guide />
        </main>
      </div>
    </Layout>
  );
}
