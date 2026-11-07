---
sidebar_label: AudioLink と連携する
title: AudioLink
sidebar_position: 2
description: AudioLink を導入したときに使える機能と、Scene への追加と接続の手順
---

# AudioLink

AudioLink は、音を解析してワールドの演出に渡す仕組みです。Audiorium での扱いは「推奨」です。

| 項目 | 内容 |
| --- | --- |
| 動作確認済みの版 | 3.1.2 |
| 入手先 | [audiolink.dev](https://audiolink.dev/) |

## AudioLink で使える機能

| 機能 | AudioLink がある場合 | AudioLink が無い場合 |
| --- | --- | --- |
| 視界エフェクト（コンソールの Effects タブ） | 使用できます | 使用できません |
| 照明（照明システム） | 音に反応します | 音に反応しません |
| コンソールの EQ のグラフ | 音に反応します | 音に反応しません |
| 音響（スピーカー、Sound Mode、Speaker EQ） | 使用できます | 使用できます |

## Scene に追加する

1. AudioLink をプロジェクトに導入します。
2. Studio の [Effects](../studio/effects.md) タブを開き、「AudioLink を Scene に追加」を押します。

AudioLink をプロジェクトに導入していない場合、このボタンは押せません。「入手先を開く」から配布ページを開けます。ご自身で AudioLink の Prefab を Scene に配置しても使用できます。

## 動画の音を AudioLink に送る

AudioLink を Scene に配置すると、Effects タブに「AudioLink の接続」が表示されます。「動画の音声を AudioLink に送信する」をオンにすると、接続した動画プレイヤーの音が AudioLink に送られます。

この設定は、動画プレイヤー側の AudioLink の設定を変更します。動画プレイヤーの設定で AudioLink を指定している場合は、オンのままで構いません。
