---
title: 動画プレイヤー
sidebar_position: 1
description: Audiorium が対応する動画プレイヤー（YamaPlayer・VizVid）と接続の仕組み
---

# 動画プレイヤー

Audiorium は、動画プレイヤーの音を受け取り、ワールドに配置したスピーカーから鳴らします。動画プレイヤーは Audiorium に含まれていません。

## 対応する動画プレイヤー

| 動画プレイヤー | 動作確認済みの版 | 入手先 |
| --- | --- | --- |
| YamaPlayer | 1.5.19 | [BOOTH](https://booth.pm/ja/items/4768863) |
| VizVid | 1.8.2 | [BOOTH](https://booth.pm/ja/items/5056077) |

どちらか 1 つが必要です。それ以外の動画プレイヤーは、Studio の選択の画面に「未対応」と表示されます。

## 接続できるのは 1 台

Audiorium に接続できる動画プレイヤーは 1 台です。Scene に複数の動画プレイヤーがある場合は、Studio で接続する 1 台を選択します。接続していない動画プレイヤーの音は、そのまま鳴ります。

別の Audiorium が接続している動画プレイヤーには、「使用中」と表示されます。

## 接続する動画プレイヤーを変更する

Studio の [Speakers](../studio/speakers.md) タブの「動画プレイヤーとスクリーン」で、「動画プレイヤー」の欄に別の動画プレイヤーを指定します。

![Speakers タブの「動画プレイヤーとスクリーン」](/img/quick-start/connected.png)

## スクリーン

スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に配置されます。接続したときにスクリーンが見つからない場合は、「スクリーン」の欄で、動画を映すスクリーンの MeshRenderer を選択します。

## 動画プレイヤーの音源の設定

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。Audiorium を取り外すと、動画プレイヤーは元の設定のまま鳴ります（[取り外し](../help/uninstall.md)）。

## 動画を AudioLink に送る設定

AudioLink を使用する場合は、Studio の [Effects](../studio/effects.md) タブの「AudioLink の接続」で、「動画の音声を AudioLink に送信する」をオンにします。詳しくは [AudioLink](./audiolink.md) を参照してください。
