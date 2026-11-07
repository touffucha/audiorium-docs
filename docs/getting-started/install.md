---
title: インストール
sidebar_position: 3
description: Audiorium をワールドのプロジェクトにインポートする手順
---

# インストール

対象のバージョン：1.0.0

VRChat Creator Companion（VCC）で作成したワールドのプロジェクトに導入します。[必要な物と動作環境](./requirements.md) を先に確認してください。

## 1. 動画プレイヤーを導入する

YamaPlayer または VizVid をプロジェクトに導入します。導入の方法は、各動画プレイヤーの配布ページの手順に従ってください。

動画プレイヤーを Scene に配置するのは、Audiorium Studio からも行えます（[クイックスタート](./quick-start.md) の手順 2）。

## 2. AudioLink と LTCGI を導入する（使用する場合）

AudioLink と LTCGI を使用する場合は、プロジェクトに導入し、Scene に配置します。どちらも後から追加できます。

## 3. 本体をインポートする

1. `Audiorium_1.0.0.unitypackage` を Unity のウィンドウへドラッグするか、ダブルクリックします。
2. 「Import Unity Package」のウィンドウで、すべての項目にチェックが入った状態のまま「Import」を押します。
3. 「TMP Importer」のウィンドウが表示された場合は、閉じます。

:::info TMP Essentials について

コンソールの文字には、TextMesh Pro の Essentials（TMP Essentials）が必要です。Studio は、コンソールを配置するときに TMP Essentials が無ければ自動で導入します。TMP Importer の「Import TMP Essentials」から先に導入した場合、コンソールの文字が四角のまま表示されることがあります。そのときは Unity を開き直します。

:::

## 4. 照明システムをインポートする（拡張パッケージを購入した場合）

本体の後に `AudioriumLightingSystem_1.0.0.unitypackage` を同じ手順でインポートします。照明システム単体では動作しません。

インポートすると、Audiorium Studio に Lights タブが使用できる状態で表示されます。

## 5. Audiorium Studio を開く

メニューの **Tools › Audiorium › Studio** を開きます。Hierarchy の右クリックのメニューの **Audiorium Studio** からも開けます。

Studio が開き、接続する動画プレイヤーを選択する画面が表示されれば、インストールは完了です。

![Audiorium Studio の最初の画面。Scene に動画プレイヤーが無い状態](/img/install/studio-start.png)

以降の手順は [クイックスタート](./quick-start.md) で説明します。

## 動画プレイヤーが複数あるワールド

Audiorium に接続できる動画プレイヤーは 1 台です。Scene に複数の動画プレイヤーがある場合は、Studio で接続する 1 台を選択します。接続していない動画プレイヤーの音は、そのまま鳴ります。
