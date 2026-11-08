---
sidebar_label: AudioLink と連携する
title: AudioLink
sidebar_position: 2
description: AudioLink を導入したときに使える機能と、Studio のシーン連携でオン・オフする手順
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

## 連携する

1. AudioLink をプロジェクトに導入します。
2. Studio の [Effects](../studio/effects.md) タブを開き、「シーン連携」の「AudioLink」をオンにします。

AudioLink が Scene に無い場合は配置され、接続した動画プレイヤーの音が AudioLink に送られます。動画プレイヤーの Inspector の AudioLink の設定と同じ設定です。

![シーン連携](/img/studio/effects-links.png)

AudioLink をプロジェクトに導入していない場合は、チェックの代わりに「入手先を開く」が表示されます。

## 連携を解除する

「AudioLink」をオフにすると、動画プレイヤーと AudioLink の連携が解除されます。AudioLink は Scene に残ります。不要な場合は、Hierarchy から削除します。

動画プレイヤーの Inspector で AudioLink の設定を変更した場合も、Studio の表示に反映されます。
