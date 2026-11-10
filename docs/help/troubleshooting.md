---
title: トラブルシューティング
sidebar_position: 1
description: AudioriumSetup の Inspector に表示される警告の直し方と、よくある問題の解決方法
---

# トラブルシューティング

## まず Inspector の上部（Language の下）を確認する

Hierarchy で `AudioriumSetup` を選択します。ビルドの前に直す項目があると、Inspector の上部（Language の下）に黄色の警告が表示されます。ボタンが付いた警告は、ボタンを押すと直ります。

![動画プレイヤーが原点から遠いときの警告](/img/setup/issue-far-origin.png)

| 警告 | 原因 | 直し方 |
| --- | --- | --- |
| ビルド先が PC（Windows）ではありません | ビルドのプラットフォームが Android などになっている | 「Windows に切り替え」を押します。Audiorium は PC 専用です |
| TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません | TextMesh Pro の Essentials を自動で導入できなかった | 「TMP Essentials を導入」を押します |
| 動画プレイヤーが原点から約 ○ km 離れています | 動画プレイヤーが原点（0, 0, 0）から 5 km より遠い | 「原点付近へ移す」を押します（[原点から遠い](#コンソールの文字や絵が欠けて見える)） |
| コンソールがありません | コンソールが削除された | 「修復」を押すと、コンソールを置き直します。設定はそのまま残ります |
| スピーカーがありません | スピーカーがすべて削除された | Ctrl+Z で削除を取り消すか、[スピーカー](../setup/speakers.md) の一覧でチェックを入れて置き直します |

## コンソールの文字や絵が欠けて見える

ワールドが原点（0, 0, 0）から遠いと、位置の精度が落ち、コンソールの文字や絵が欠けて見えます。動画プレイヤーが原点から 5 km より遠い場合は、Inspector の上部（Language の下）に警告が表示されます。

「原点付近へ移す」を押すと、動画プレイヤーと Audiorium が、位置の関係を保ったまま原点付近へ移動します。ワールド全体が原点から遠い場合は、ワールド全体を原点付近へ移してください。

## Tools › Audiorium のメニューが表示されない

Unity と VRChat SDK のバージョンが、[必要な物と動作環境](../getting-started/requirements.md) と合っているかを確認します。

Unity の Console にコンパイルエラーが出ている場合、メニューは表示されません。最初のエラーの全文を控えて、[お問い合わせ](#お問い合わせ)ください。

## Add Audiorium で「準備が終わっていません」と表示される

Unity がスクリプトをコンパイルしている間は、Audiorium を置けません。Unity の右下の進行表示が消えてから、もう一度 **Tools › Audiorium › Add Audiorium** を押します。

## 動画プレイヤーに接続できない

| 表示 | 原因 | 直し方 |
| --- | --- | --- |
| この Scene にある、音源を持つ対応動画プレイヤーを 1 台選択してください。 | 選択した物が対応する動画プレイヤーではない、または別の Scene にある | YamaPlayer か VizVid の、いちばん上の GameObject を選択します |
| ほかの Audiorium がこの動画プレイヤーに接続しています。 | 別の `AudioriumSetup` がその動画プレイヤーに接続している | 別の動画プレイヤーを選ぶか、接続している `AudioriumSetup` を削除します |

対応する動画プレイヤーは YamaPlayer と VizVid です。

## 照明システムを本体より先にインポートした

Unity の Console に U# のコンパイルエラーが表示されます。本体をインポートした後、**Tools › Audiorium › Add Audiorium** を押すと、Audiorium が U# のコンパイルをやり直します。

照明システムは、本体の後にインポートしてください（[インストール](../getting-started/install.md#インポートの順番)）。

## 照明の Inspector に「別のライトショーに接続しています」と表示される

Scene がすでに別のライトショーに接続しているため、Audiorium の照明を置けません。接続を解除してから照明を置いてください。

## VizVid と VRC Light Volumes を同時に導入するとコンパイルエラーが出る

新規のプロジェクトに VizVid と VRC Light Volumes を同時に導入すると、Unity の Console に次のエラーが 3 件表示され、コンパイルが止まることがあります。

```text
Packages\idv.jlchntoz.vvmw\Editor\VVMW\Designer\ScreenConfiguratorEditor.cs(114,32): error CS1061: 'ScreenConfigurator' does not contain a definition for 'CreateLightVolume'
```

続く 2 件は `EnsureLightVolumeCookie` と `TryEstimatePlacement` についての同じ形のエラーです。

VizVid と VRC Light Volumes の組み合わせで起きるエラーで、Audiorium は関係しません。Audiorium 自体は VRC Light Volumes を使用しません。LTCGI を使う場合は、VRC Light Volumes が必要です（[LTCGI を導入するとコンパイルエラーが出る](#ltcgi-を導入するとコンパイルエラーが出る)）。

次のどちらかで解決する場合があります（当ショップでは動作を確認していません）。

- **Edit › Project Settings… › Player › Other Settings › Script Compilation** の Scripting Define Symbols に `VRC_LIGHT_VOLUMES` を追加し、「Apply」を押します。
- VRC Light Volumes を先に導入してコンパイルが終わるのを待ち、その後に VizVid を導入します。

解決しない場合は、VizVid の配布ページの案内をご確認ください。

## LTCGI を導入するとコンパイルエラーが出る

LTCGI 1.7.4 は、VRC Light Volumes が無いプロジェクトでは、LTCGI に含まれる U# がコンパイルエラーになります。このエラーが出ている間は、Audiorium の U# もコンパイルされず、Audiorium が動作しません。

LTCGI を使う場合は、VRC Light Volumes もプロジェクトに導入します。動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md) にあります。

## Play モードで音が鳴らない

動画の外部 URL は、Unity の Play モードでは再生できません。音はビルドして VRChat で確認してください（[クイックスタート](../getting-started/quick-start.md#ビルドして-vrchat-で確認する)）。

## コンソールの Effects タブが表示されない

Effects タブは、次の両方を満たすと表示されます（[視界エフェクト](../setup/visual-effects.md)）。

- 「視界エフェクト」の「Effects を有効化」がオン
- 「外部設定」で AudioLink か LTCGI がオン

外部設定にチェックの代わりに「入手先を開く」が表示される場合は、AudioLink と LTCGI がプロジェクトに導入されていません。

## 外部設定に「照明」が表示されない

照明システム（拡張パッケージ）をインポートすると表示されます。照明システムは本体の後にインポートします。

## コンソールの文字が表示されない

コンソールの文字には、TextMesh Pro の Essentials（TMP Essentials）が必要です。Audiorium は、コンソールを置くときに TMP Essentials が無ければ自動で導入します。

- 自動で導入できなかった場合は、Inspector の上部（Language の下）に「TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません。」が表示されます。「TMP Essentials を導入」を押します。
- TMP Importer のウィンドウから先に TMP Essentials を導入した後、コンソールの文字が四角のまま表示される場合は、Unity を開き直します。TextMesh Pro の不具合で、開き直すと文字が表示されます。

## プリセットの名前を変えられない

Sound Mode のプリセット名と説明は、次の場合に変更できず、変更前に戻ります。表示されたダイアログの文で原因が分かります（[Sound Mode](../setup/sound-mode.md#名前と説明)）。

- 名前が空、またはほかのプリセットと同じ名前
- コンソールのフォントに無い文字（一部の漢字など）を含む
- 名前や説明がコンソールのカードに収まらない

## サンプルシーンに Missing と表示される

YamaPlayer をプロジェクトに追加する前にサンプルシーンを開くと表示されます。YamaPlayer を追加すると消えます（[サンプルシーン](../getting-started/sample-scene.md)）。

## お問い合わせ

解決しない場合は、BOOTH ショップのメッセージよりお問い合わせください。次の情報を添えていただけますと、スムーズにご案内できます。

- Audiorium のバージョン
- Unity と VRChat SDK のバージョン
- 動画プレイヤーの名称とバージョン
- Unity の Console に出た最初のエラーの全文
