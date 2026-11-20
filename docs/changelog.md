---
title: 更新履歴
sidebar_position: 99
description: Audiorium の版ごとの変更
hide_table_of_contents: true
---

# 更新履歴

<div className="changelog">

<details className="changelog-version">
<summary><span className="changelog-version__name">v1.0.0（発売準備中）</span><span className="changelog-version__lead">最初の版です。</span></summary>

</details>

<details className="changelog-version" open>
<summary><span className="changelog-version__name">v0.14（β）</span><span className="changelog-version__lead">コンソールの Tips モードと、外部のスイッチからの操作が追加されます。また、コンソールの枠と台のマテリアルに木目が追加されます。</span></summary>

### 更新関連

#### 以前のバージョンで配置したシーンが自動で作り直されます

v0.14 の 2 つの unitypackage を上書きインポートすると、以前のバージョンで配置したコンソール・台・視界エフェクトが自動で作り直されます。

<p className="changelog-note">※スピーカーと照明の配置、Inspector の設定はそのまま残ります。<br />※v0.10 で使っていたファイルの一部はプロジェクトに残りますが、動作には影響しません。</p>

### コンソール関連

#### Tips モードが追加されます

コンソール上の各項目にカーソルを当てると、ミニキャラが吹き出しで説明します。

<p className="changelog-note">※ユーザーは、コンソールで Tips モードのオン・オフを切り替えられます。<br />※入場時に Tips モードをオンにしておくかは、AudioriumSetup の Inspector の「詳細」にある「Tips を有効にする」で変更できます（初期設定はオン）。</p>

#### マテリアルに「木目」が追加されます

コンソールの枠と台のマテリアルに「木目」が追加されます。「枠のみ」でもマテリアルを選択できるようになります。

#### VR で文字のギザギザが目立ちにくくなります

コンソールの UI の表示が変更されます。

### セットアップ関連

#### Add Audiorium 実行時の動作が変更されます

- 動画プレイヤーを選択している場合：その動画プレイヤーに接続されます。
- 動画プレイヤーを選択していない場合：未接続の AudioriumSetup が配置され、選択された状態になります。

<p className="changelog-note">※AudioriumSetup は、1 つのシーンに 1 つだけ配置できます。2 つ目を配置しようとすると、確認ダイアログが表示され、配置されません。</p>

#### Inspector の言語の初期設定が、Unity の表示言語に合わせて決まります

#### Play モード中は、Audiorium の Inspector を操作できなくなります

### 連携関連

#### スイッチから操作できるようになります

LuraSwitch2、UI の Button、自作の Udon などから、FX Bypass・Reverb・プリセットを操作できます。

<p className="changelog-note">※スイッチの送り先として、AudioriumSetup の中に SwitchEvents オブジェクトが配置されます。Add Audiorium の実行時と、以前のバージョンのシーンが作り直されたときに配置されます。<br />※使い方は「<a href="./setup/switches">スイッチから操作する</a>」をご覧ください。</p>

### 不具合修正

以下の不具合が修正されます。

#### Add Audiorium

- 高い場所（湖の上のテラスなど）に動画プレイヤーを配置すると、視聴位置とスピーカーが、ずっと下の地面（湖面など）に配置される場合がある。

#### スピーカーと音

- スピーカーの一覧でチェックを外して入れ直したスピーカーのみ、ほかのスピーカーより約 6 dB 大きく鳴る。
- VizVid でミュートを解除した後、音量が正しくならない場合がある。
- スピーカーから AudioriumSpeaker コンポーネントを削除すると、セットアップが停止する。

#### コンソール

- 操作の権限が無いユーザーのコンソールで、ほかのユーザーがコンソールの全体（Kill）ボタンを押しても、ボタンが点灯しない。
- VR で、コンソールの UI の一部が片目にしか表示されない場合がある。

#### 照明システム

- 照明を追加・削除すると、縦にしたトラスが横向きに戻る。
- トラスの長さを変えると、トラスに吊った物が削除される場合がある。
- 照明をすべて削除すると、入場時の警告も削除される。

#### 連携

- 外部設定の「LTCGI」をオフにすると、YamaPlayer に自分で追加した LTCGI_Screen コンポーネントも削除される。
- LTCGI を後から導入すると、コンソールの LTCGI のスイッチが機能しない。
- コンソールの LTCGI Light のスライダーで明るさを変えても、2 回目以降の変更が反映されない。

#### Inspector

- Inspector を開いただけで、シーンが変更済みの状態になる。
- Unity のエディターのテーマを Light にしている場合、EQ のグラフと 0 dB の目盛りがほとんど見えない。
- Inspector のスライダーを動かした直後に、別のプリセットやオブジェクトを選択したり Ctrl+Z を押したりすると、変更した値が消える場合がある。
- プリセットの名前と説明、入場時の警告、視界エフェクトの注意の文に、コンソールの TextMesh Pro のフォントに無い文字を入力すると、エラーが発生する。

<p className="changelog-note">※フォントに無い文字は、VRChat 標準のフォントで表示されます。</p>

</details>

</div>
