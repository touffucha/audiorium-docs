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
| 1 | AudioLink、VRC Light Volumes、LTCGI | 使用する場合 |
| 2 | 動画プレイヤー（YamaPlayer か VizVid） | 必ず |
| 3 | Audiorium の unitypackage（本体） | 必ず |
| 4 | AudioriumLightingSystem の unitypackage（照明システム） | 購入した場合 |

:::warning 順番を守る所

- **VizVid は VRC Light Volumes の後に**：VizVid を先にインポートすると、VizVid がコンパイルエラーを出します（[トラブルシューティング](../help/troubleshooting.md#vizvid-と-vrc-light-volumes-を同時に導入するとコンパイルエラーが出る)）。
- **照明システムは本体の後に**：先にインポートすると、Unity の Console に U# のコンパイルエラーが表示されます。

:::

{/* 未確認：サンプルシーンを開くのに要るパッケージの一覧（表の 1 行目に「サンプルシーンを開く場合は必ず」を足すか）。showroom-compact の確かめの後に書き、この印を消す。印が残っている間は公開しない */}

- 動画プレイヤーは、各配布ページの手順で導入します。
- AudioLink・VRC Light Volumes・LTCGI は VCC で追加します。AudioLink は後から追加できます。
- 照明システムは、単体では動作しません。

:::info TMP Importer が表示された場合

本体のインポートの後に「TMP Importer」のウィンドウが表示された場合は、「Import TMP Essentials」を押します。TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

![TMP Importer のウィンドウ](/img/install/tmp-importer.png)

導入した後にコンソールの文字が四角のまま表示される場合は、Unity を開き直します。

:::

## サンプルシーンを入れない場合

本体と照明システムには、[サンプルシーン](./sample-scene.md) が入っています。使わない場合は、インポートの画面で `Showroom` のチェックを外します。

![Import Unity Package の画面で Showroom のチェックを外した状態](/img/install/import-without-showroom.png)

{/* 未確認：Showroom を外したときの動き。素のプロジェクトで、本体の Showroom を外して照明システムを入れてもコンパイルエラーは 0 だった。U# のコンパイル、書き出した unitypackage からの取り込み、照明システムの Showroom を外した場合はまだ。照明システムありのサンプルシーンは本体の Showroom のモデルと焼いた光を使う（設計の事実）ので、使うときは本体の Showroom も外さない、の 1 文を足すかも、実測の後に決める。確かめたら、この印を消す。印が残っている間は公開しない */}

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

表示されない場合は [トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。
