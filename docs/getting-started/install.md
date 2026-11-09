---
title: インストール
sidebar_position: 3
description: Audiorium をワールドのプロジェクトにインポートする手順と、インポートの順番
---

# インストール

対象のバージョン：1.0.0

VRChat Creator Companion（VCC）で作成したワールドのプロジェクトに導入します。[必要な物と動作環境](./requirements.md) を先に確認してください。

## インポートの順番

| 順番 | パッケージ | 必要な場合 |
| --- | --- | --- |
| 1 | 動画プレイヤー（YamaPlayer か VizVid） | 必ず |
| 2 | AudioLink、LTCGI、VRC Light Volumes | 使用する場合。サンプルシーンを開く場合は必ず |
| 3 | `Audiorium_1.0.0.unitypackage`（本体） | 必ず |
| 4 | `AudioriumLightingSystem_1.0.0.unitypackage`（照明システム） | 購入した場合 |
| 5 | `AudioriumShowroom_1.0.0.unitypackage`（サンプルシーン） | 使用する場合 |

照明システムとサンプルシーンは、必ず本体の後にインポートします。照明システムを本体より先にインポートすると、Unity の Console に U# のコンパイルエラーが表示されます。

## 1. 動画プレイヤーを導入する

YamaPlayer または VizVid をプロジェクトに導入します。導入の方法は、各動画プレイヤーの配布ページの手順に従ってください。

## 2. AudioLink・LTCGI・VRC Light Volumes を導入する（使用する場合）

VCC でプロジェクトに追加します。どれも後から追加できます。LTCGI を使用する場合は、VRC Light Volumes も必要です。

## 3. 本体をインポートする

1. `Audiorium_1.0.0.unitypackage` を Unity のウィンドウへドラッグするか、ダブルクリックします。
2. 「Import Unity Package」のウィンドウで、すべての項目にチェックが入った状態のまま「Import」を押します。
3. 「TMP Importer」のウィンドウが表示された場合は、何も押さずに閉じます。このウィンドウは、TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

:::info TMP Essentials について

コンソールの文字には、TextMesh Pro の Essentials（TMP Essentials）が必要です。Audiorium は、コンソールを置くときに TMP Essentials が無ければ自動で導入します。TMP Importer の「Import TMP Essentials」から先に導入した場合、コンソールの文字が四角のまま表示されることがあります。そのときは Unity を開き直します。

:::

## 4. 照明システムをインポートする（購入した場合）

本体の後に、`AudioriumLightingSystem_1.0.0.unitypackage` を手順 3 と同じ方法でインポートします。照明システム単体では動作しません。

## 5. サンプルシーンをインポートする（使用する場合）

`AudioriumShowroom_1.0.0.unitypackage` を手順 3 と同じ方法でインポートします。開き方は [サンプルシーン](./sample-scene.md) で説明します。

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば、インストールは完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

![Tools › Audiorium のメニュー。Add Audiorium と Add Lights](/img/quick-start/menu-add.png)

メニューが表示されない場合は、[トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。

次は [クイックスタート](./quick-start.md) で、Scene に Audiorium を置きます。
