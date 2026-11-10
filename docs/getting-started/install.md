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
| 5 | `AudioriumShowroom_1.0.0.unitypackage`（サンプルシーン・照明なし） | サンプルシーンを使用する場合（照明ありも含む） |
| 6 | `AudioriumShowroomLighting_1.0.0.unitypackage`（サンプルシーン・照明あり） | 照明システムを購入し、照明ありのサンプルシーンを使用する場合 |

照明システムとサンプルシーンは、必ず本体の後にインポートします。照明システムを本体より先にインポートすると、Unity の Console に U# のコンパイルエラーが表示されます。`AudioriumShowroomLighting_1.0.0.unitypackage` は、照明システムとサンプルシーン（照明なし）の後にインポートします。

{/* 未確認：上の表の 5 行目の「照明ありも含む」は、設計の事実（照明ありのシーンは、サンプルシーン（照明なし）のファイルのモデルと焼いた光を使う）で、書き出した配布物での実測はまだ。実測が届いたら、この印を消す。印が残っている間は公開しない */}

{/* 未確認：AudioriumShowroomLighting を照明システムやサンプルシーン（照明なし）より先にインポートしたときに起きる事。確かめた事実が届いたら、上の段落に 1 文足す */}

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

`AudioriumShowroom_1.0.0.unitypackage` を手順 3 と同じ方法でインポートします。照明なしのサンプルシーンが入ります。照明ありのサンプルシーンを使用する場合も、このファイルをインポートします。開き方は [サンプルシーン](./sample-scene.md) で説明します。

{/* 未確認：直前の段落の 2 文目（照明ありのサンプルシーンを使用する場合も…）は、設計の事実（照明ありのシーンは、サンプルシーン（照明なし）のファイルのモデルと焼いた光を使う）で、書き出した配布物での実測はまだ。実測が届いたら、この印を消す。印が残っている間は公開しない */}

## 6. 照明ありのサンプルシーンをインポートする（照明システムを購入し、使用する場合）

手順 4 と手順 5 の後に、`AudioriumShowroomLighting_1.0.0.unitypackage` を手順 3 と同じ方法でインポートします。

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば、インストールは完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

メニューが表示されない場合は、[トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。

次は [クイックスタート](./quick-start.md) で、Scene に Audiorium を置きます。
