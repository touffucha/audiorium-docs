---
sidebar_label: AudioLink
title: AudioLink
sidebar_position: 1
description: AudioLink を導入したときに使える機能と、外部設定でオン・オフする手順
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

1. VCC で AudioLink をプロジェクトに追加します。
2. `AudioriumSetup` の Inspector の [外部設定](../setup/external.md) で、「AudioLink」をオンにします。

AudioLink が Scene に無い場合は置かれ、接続した動画プレイヤーの音が AudioLink に送られます。動画プレイヤーの Inspector の AudioLink の設定と同じ設定です。

## 連携を解除する

「AudioLink」をオフにすると、動画プレイヤーと AudioLink の連携が解除されます。AudioLink は Scene に残ります。不要な場合は、Hierarchy から削除します。
