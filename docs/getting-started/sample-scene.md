---
title: サンプルシーン
sidebar_position: 5
description: 付属のサンプルシーン（照明なし・照明あり）の開き方と、開く前に必要なパッケージ
---

# サンプルシーン

公開ワールドと同じ展示ホールのシーンです。スピーカー・コンソール・照明の置き方の完成例として使えます。

| サンプルシーン | 入っているファイル | シーンのファイル | 内容 |
| --- | --- | --- | --- |
| 照明なし | `AudioriumShowroom_1.0.0.unitypackage` | `AudioriumNoLighting.unity` | 本体だけで動く構成 |
| 照明あり | `AudioriumShowroomLighting_1.0.0.unitypackage` | `Audiorium.unity` | 照明システムを使う構成 |

必要な配布ファイルとインポートの順番は、[必要な物と動作環境](./requirements.md#配布ファイル) と [インストール](./install.md#インポートの順番) を参照してください。

## 開く前に必要なパッケージ

YamaPlayer・AudioLink・LTCGI・VRC Light Volumes を、VCC でプロジェクトに追加します。どれも Audiorium には含まれていません。

## 開く

[インストール](./install.md#インポートの順番) の順番でパッケージをインポートし、Project ウィンドウでシーンのファイルを開きます。

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

## 改変して使う場合

改変したシーンは、**File › Save As** で `Assets/Audiorium` の外へ別の名前で保存します。新しいバージョンの Audiorium をインポートすると、サンプルシーンは上書きされます。

## 利用の条件

サンプルシーンの利用の条件は、同梱の利用規約（`License/LICENSE.md`）の第 6 条をご確認ください。
