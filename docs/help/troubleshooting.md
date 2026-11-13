---
title: トラブルシューティング
sidebar_position: 1
description: Inspector に表示される警告と、よくある問題の原因と直し方
---

# トラブルシューティング

## まず Inspector の上部（Language の下）を確認する

`AudioriumSetup` を選択すると、確認が必要な項目が Inspector の上部（Language の下）に黄色の警告で表示されます。

![動画プレイヤーが原点から遠いときの警告](/img/setup/issue-far-origin.png)

| 警告 | 原因 | 直し方 |
| --- | --- | --- |
| ビルド先が PC（Windows）ではありません | ビルドのプラットフォームが Android など | **File › Build Settings** で PC（Windows）に切り替えます。Audiorium は PC 専用です |
| TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません | TMP Essentials を導入していない | 「TMP Essentials を導入」を押します |
| 動画プレイヤーが原点から約 ○ km 離れています | 動画プレイヤーが原点（0, 0, 0）から 5 km より遠い | 動画プレイヤーと `AudioriumSetup` を原点の近くへ移動します（[原点から遠い](#コンソールの文字や絵が欠けて見える)） |
| 動画プレイヤーが指定されていません | 動画プレイヤーが未接続。サンプルシーンを開いた直後にも表示されます | Scene に動画プレイヤーを配置し、Inspector の「動画プレイヤー」の欄に指定します |
| コンソールがありません | コンソールが削除された | Ctrl+Z で元に戻すか、`AudioriumSetup` を削除してもう一度 Add Audiorium を実行します（Inspector の設定はデフォルトに戻ります） |
| スピーカーがありません | スピーカーがすべて削除された | Ctrl+Z で元に戻すか、[スピーカー](../setup/speakers.md) の一覧で追加します（Surround・Top Middle・Stereo Mix・Subwoofer はチェックを入れ、任意のスピーカーを足すときは「+」を押します） |

## コンソールの文字や絵が欠けて見える

**原因**：ワールドが原点（0, 0, 0）から遠く、位置の精度が落ちています。

**直し方**：動画プレイヤーと `AudioriumSetup` を両方選択し、一緒に原点付近へ移動します。ワールド全体が原点から遠い場合は、ワールド全体を原点付近へ移動します。

## Tools › Audiorium のメニューが表示されない

**原因**：Unity と VRChat SDK のバージョンが合っていないか、コンパイルエラーが出ています。

**直し方**：

- バージョンを [必要な物と動作環境](../getting-started/requirements.md) と照らし合わせます。
- Unity の Console にコンパイルエラーがある間は、メニューは表示されません。最初のエラーの全文を添えて [お問い合わせ](#お問い合わせ)ください。

## Add Audiorium で「準備が終わっていません」と表示される

**原因**：Unity がスクリプトをコンパイルしています。

**直し方**：右下の進行表示が消えてから、もう一度 **Tools › Audiorium › Add Audiorium** を選択します。

## 動画プレイヤーに接続できない

対応する動画プレイヤーは YamaPlayer と VizVid です。

| 表示 | 原因 | 直し方 |
| --- | --- | --- |
| この Scene にある、音源を持つ対応動画プレイヤーを 1 台選択してください。 | 対応する動画プレイヤーではない、または別の Scene にある | YamaPlayer か VizVid の、ルートの GameObject を選択します |
| ほかの Audiorium がこの動画プレイヤーに接続しています。 | 別の `AudioriumSetup` が接続している | 別の動画プレイヤーを選択するか、接続している `AudioriumSetup` を削除します |

## 照明システムを本体より先にインポートした

Unity の Console に UdonSharp のコンパイルエラーが出ることがあります。

**直し方**：本体をインポートしてから **Tools › Audiorium › Add Audiorium** を選択すると、Audiorium が U# を再コンパイルします。順番は [インストール](../getting-started/install.md#インポートの順番) を参照してください。

## 照明システムの Inspector に「別のライトショーに接続しています」と表示される

**原因**：Scene がすでに別のライトショーに接続しているため、Audiorium の照明を配置できません。

**直し方**：照明システムの Inspector の「ライトショー」の欄を空にしてから、照明を配置します。

## VizVid と VRC Light Volumes を同時に導入するとコンパイルエラーが出る

**原因**：VizVid と VRC Light Volumes の組み合わせで起きるエラーで、Audiorium は関係しません。VRC Light Volumes は LTCGI に必要です。

両方を導入するとき、VizVid を先にインポートすると、次のようなエラーが出てコンパイルが止まることがあります。`EnsureLightVolumeCookie` や `TryEstimatePlacement` についても同様のエラーが出る場合があります。

```text
Packages\idv.jlchntoz.vvmw\Editor\VVMW\Designer\ScreenConfiguratorEditor.cs(114,32): error CS1061: 'ScreenConfigurator' does not contain a definition for 'CreateLightVolume'
```

**直し方**：VRC Light Volumes を先にインポートし、コンパイルが終わってから VizVid をインポートします。

## LTCGI を導入するとコンパイルエラーが出る

**原因**：LTCGI 1.7.4 は、VRC Light Volumes が無いと U# のコンパイルエラーになります。その間は Audiorium の U# もコンパイルされず、Audiorium が動作しません。

**直し方**：VRC Light Volumes も導入します。動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md) にあります。

## LTCGI や VRC Light Volumes の光が、ワールドの壁や床に映らない

どちらの光も、対応したシェーダーを使ったマテリアルにだけ映ります。Unity 標準の Standard シェーダーは対応していません。

動画の光を映す場合は、動画プレイヤーと LTCGI が [外部設定](../setup/external.md#ltcgi) の手順で接続されていることを確認します。光を映したいマテリアルを、対応したシェーダー（Filamented、Mochie Standard など）に切り替え、マテリアルの設定で LTCGI と Light Volumes が有効になっていることを確認します。どちらのシェーダーにも、Standard のマテリアルをまとめて置き換える機能があります。サンプルシーンの壁や床は、Filamented で両方を有効にしています。

手順は、各シェーダーの説明を参照してください。

- [LTCGI の光を受けられるシェーダーの一覧](https://ltcgi.dev/Getting%20Started/Installation/Compatible_Shaders)（英語）
- [Filamented：Standard のマテリアルをまとめて置き換える手順](https://gitlab.com/s-ilent/filamented/-/wikis/ja/1.-%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB#マテリアルの一括置換)
- [Filamented：マテリアルで VRC Light Volumes と LTCGI を有効にする設定](https://gitlab.com/s-ilent/filamented/-/wikis/ja/4.-%E5%A4%96%E9%83%A8%E3%83%84%E3%83%BC%E3%83%AB%E9%80%A3%E6%90%BA#vrc-light-volumes-vrclv)
- [Mochie Standard：Standard のマテリアルをまとめて置き換える手順（Tools › Mochie › Global Standard Settings）](https://github.com/MochiesCode/Mochies-Unity-Shaders/wiki/Utilities#swap-shaders)（英語）
- [Mochie Standard：マテリアルの LTCGI と Light Volumes の設定](https://github.com/MochiesCode/Mochies-Unity-Shaders/wiki/Standard-Shader#ltcgi)（英語）

## Play モードで音が鳴らない

**原因**：動画の外部 URL は、Play モードでは再生できません。

**直し方**：ビルドして VRChat で確認します（[クイックスタート](../getting-started/quick-start.md#ビルドして-vrchat-で確認する)）。

## コンソールの Effects タブが表示されない

「視界エフェクト」の「Effects を有効化」がオンで、Scene に AudioLink か LTCGI が配置されているとタブが表示されます。外部設定で接続をオフにしても、Scene に配置が残っている場合は表示されます。

外部設定の各項目に「入手先を開く」が表示される場合は、対応するパッケージをプロジェクトに導入します。LTCGI だけを配置した場合は、Effects タブに LTCGI の操作が表示されます。詳しくは [視界エフェクト](../setup/visual-effects.md#effects-タブが表示される条件) を参照してください。

## 外部設定に「照明システム」が表示されない

**原因**：照明システム（拡張パッケージ）がインポートされていません。

**直し方**：本体の後に、照明システムをインポートします。

## コンソールの文字が表示されない

**原因**：TextMesh Pro の Essentials（TMP Essentials）がプロジェクトにありません。

**直し方**：

- **Inspector に警告が表示されている**：警告の「TMP Essentials を導入」を押します。
- **TMP Importer から導入した後、文字が四角のまま**：Unity を開き直します。TextMesh Pro の不具合で、開き直すと表示されます。

## プリセットの名前を変更できない

**原因**：次の場合、Sound Mode のプリセット名と説明は変更前に戻ります。どれに該当するかは、表示されるダイアログで確認できます（[Sound Mode](../setup/sound-mode.md#名前と説明)）。

- 名前が空、またはほかのプリセットと同じ名前
- コンソールのフォントに無い文字（一部の漢字など）を含む
- 名前や説明がコンソールのカードに収まらない

## お問い合わせ

解決しない場合は、BOOTH ショップのメッセージよりお問い合わせください。次の情報があると、スムーズにご案内できます。

- Audiorium のバージョン
- Unity と VRChat SDK のバージョン
- 動画プレイヤーの名称とバージョン
- Unity の Console に出た最初のエラーの全文
