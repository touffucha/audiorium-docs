---
sidebar_label: 動画プレイヤーを接続する
title: 動画プレイヤー
sidebar_position: 1
description: Audiorium が対応する動画プレイヤー（YamaPlayer・VizVid）と接続の仕組み
---

# 動画プレイヤー

Audiorium は、動画プレイヤーの音を受け取り、ワールドに配置したスピーカーから鳴らします。動画プレイヤーは Audiorium に含まれていません。

## 対応する動画プレイヤー

YamaPlayer か VizVid のどちらか 1 つが必要です。動作確認済みのバージョンと入手先は [必要な物と動作環境](../getting-started/requirements.md) にあります。それ以外の動画プレイヤーは、Studio の選択の画面に「未対応」と表示されます。

## 接続できるのは 1 台

Audiorium に接続できる動画プレイヤーは 1 台です。Scene に複数の動画プレイヤーがある場合は、Studio で接続する 1 台を選択します。接続していない動画プレイヤーの音は、そのまま鳴ります。

別の Audiorium が接続している動画プレイヤーには、「使用中」と表示されます。

## 接続する動画プレイヤーを変更する

Hierarchy から別の動画プレイヤーを、Studio の [Speakers](../studio/speakers.md) タブの「動画プレイヤー」の欄へドラッグします。

![Speakers タブの「動画プレイヤー」](/img/studio/speakers-player.png)

スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に配置されます。接続した後に動画プレイヤーを移動した場合は、[スピーカーと視聴位置を調整する](../guides/speaker-position.md#動画プレイヤーを移動した場合) を参照してください。

## 動画プレイヤーの音源の設定

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。Audiorium を取り外すと、動画プレイヤーは元の設定のまま鳴ります（[取り外し](../help/uninstall.md)）。

## AudioLink と LTCGI の連携

AudioLink を使用する場合は、Studio の [Effects](../studio/effects.md) タブの「シーン連携」で「AudioLink」をオンにします。動画プレイヤーの Inspector で AudioLink を設定済みの場合は、オンの状態で表示されます。詳しくは [AudioLink と連携する](./audiolink.md) を参照してください。LTCGI も同じ欄でオンにします（[LTCGI と連携する](./ltcgi.md)）。
