---
title: インストール
sidebar_position: 3
description: Audiorium をワールドのプロジェクトにインポートする順番と、インポートの後の確認
---

# インストール

VRChat Creator Companion（VCC）で作成したワールドのプロジェクトに導入します。先に [必要な物と動作環境](./requirements.md) を確認してください。

## インポートの順番

| 順番 | パッケージ | 必要な場合 |
| --- | --- | --- |
| 1 | AudioLink・VRC Light Volumes・LTCGI | 使用する場合と、サンプルシーンを開く場合 |
| 2 | 動画プレイヤー（YamaPlayer か VizVid） | 必須 |
| 3 | Audiorium の unitypackage（本体） | 必須 |
| 4 | AudioriumLightingSystem の unitypackage（照明システム） | 購入した場合 |

:::warning インポートの順番の注意

- **VizVid は VRC Light Volumes の後に**：VizVid を先にインポートすると、VizVid でコンパイルエラーが出ます（[トラブルシューティング](../help/troubleshooting.md#vizvid-と-vrc-light-volumes-を同時に導入するとコンパイルエラーが出る)）。
- **照明システムは本体の後に**：先にインポートすると、Unity の Console に U# のコンパイルエラーが表示されます。

:::

- 動画プレイヤーは、[YamaPlayer の導入手順](https://github.com/koorimizuw/YamaPlayer/wiki/YamaPlayer-%E5%B0%8E%E5%85%A5%E6%89%8B%E9%A0%86) か [VizVid の導入方法](https://xtlcdn.github.io/VizVid/docs/simple_ja.html) に従って導入します。
- AudioLink・VRC Light Volumes・LTCGI は VCC で追加します。AudioLink は後から追加できます。
- サンプルシーンを開く場合は、AudioLink・VRC Light Volumes・LTCGI の 3 つとも追加します。追加しないと、シーンに Missing が表示されます。
- 照明システムは、単体では動作しません。

:::info TMP Importer が表示された場合

本体のインポートの後に TMP Importer のウィンドウが表示された場合は、「Import TMP Essentials」を押します。TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

![TMP Importer のウィンドウ](/img/install/tmp-importer.png)

導入した後にコンソールの文字が四角のまま表示される場合は、Unity を開き直します。

:::

## サンプルシーンを入れない場合

本体と照明システムには、[サンプルシーン](./sample-scene.md) が入っています。使わない場合は、インポートの画面で `Showroom` のチェックを外します。照明システムありのサンプルシーンは本体の `Showroom` のモデルと光を使うので、このシーンを使う場合は本体の `Showroom` のチェックを外さないでください。

![Import Unity Package の画面で Showroom のチェックを外した状態](/img/install/import-without-showroom.png)

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

表示されない場合は [トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。
