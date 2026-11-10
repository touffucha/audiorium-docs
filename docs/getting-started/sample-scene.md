---
title: サンプルシーン
sidebar_position: 5
description: 付属のサンプルシーン（照明なし・照明あり）の開き方と、開く前に必要なパッケージ
---

# サンプルシーン

公開ワールドと同じ展示ホールのシーンが、サンプルシーンとして付属します。Audiorium を置いたワールドの完成例として、スピーカー・コンソール・照明の置き方を確かめられます。

| サンプルシーン | 入っているファイル | 内容 |
| --- | --- | --- |
| 照明なし | `AudioriumShowroom_1.0.0.unitypackage` | 本体だけで動く構成 |
| 照明あり | `AudioriumShowroomLighting_1.0.0.unitypackage` | 照明システムを使う構成 |

シーンのファイルは、照明なしが `AudioriumNoLighting.unity`、照明ありが `Audiorium.unity` です。

{/* 未確認：照明ありのサンプルシーンを開くのに、サンプルシーン（照明なし）のファイルが要るか。要ると確かめたら、ここに「照明ありのサンプルシーンを開くには、本体・照明システム・AudioriumShowroom_1.0.0.unitypackage・AudioriumShowroomLighting_1.0.0.unitypackage の 4 つをインポートします。」を足す */}

## 開く前に必要なパッケージ

サンプルシーンを開く前に、次のパッケージを VCC でプロジェクトに追加します。どれも Audiorium には含まれていません（[必要な物と動作環境](./requirements.md)）。

- YamaPlayer
- AudioLink
- LTCGI
- VRC Light Volumes

## 開く

1. [インストール](./install.md) の順番で、使用するサンプルシーンのパッケージをインポートします。
2. Project ウィンドウで、サンプルシーンのファイル（`AudioriumNoLighting.unity` または `Audiorium.unity`）をダブルクリックして開きます。

{/* 画像を戻す場所：![Project ウィンドウのサンプルシーン](/img/sample/scenes.png)。配布物ができてから撮る */}

:::info YamaPlayer を入れる前に開いた場合

Hierarchy と Inspector に「Missing」と表示されます。YamaPlayer をプロジェクトに追加すると、すべての参照がつながり、表示が消えます。サンプルシーンの不具合ではありません。

{/* 画像を戻す場所：![YamaPlayer を入れる前に開いたサンプルシーン。Missing と表示される](/img/sample/missing.png)。配布物ができてから撮る */}

:::

## 含まれていない物

公開ワールドにある次の物は、サンプルシーンには含まれていません。

- ペン
- 足音と効果音
- 鳩
- 入退室を記録するボード
- 設計図の字幕
- 環境音（滝・鳥・風）

## 利用の条件

サンプルシーンの利用の条件は、同梱の利用規約（`License/LICENSE.md`）の第 6 条をご確認ください。

ご自身のシーンに Audiorium を置く手順は、[クイックスタート](./quick-start.md) で説明します。
