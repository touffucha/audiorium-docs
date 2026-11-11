---
title: 概要
sidebar_position: 1
description: Audiorium の概要と、主な機能の一覧。詳細は各ページで説明します
---

# 概要

Audiorium は、VRChat のワールドに置く音響・演出コンソールです。
動画プレイヤーの音を、ワールドのスピーカーから鳴らします。
ユーザーは、ワールド内のコンソールで音の響き・照明・視界エフェクトを操作します。

購入前に、[公開ワールド](https://vrchat.com/home/launch?worldId=wrld_3b124d05-d1c4-4ae3-a216-0b58c5f82ab9)で操作を試せます。

## 2 つの画面

![コンソール](/img/console/sound.webp "full")

ユーザーがワールド内で操作するコンソールです。[コンソールの操作](../console/operation.md)で説明します。

![AudioriumSetup の Inspector。スピーカーの節を開いた状態](/img/setup/speakers.png "full")

ワールド制作者が Unity で使う、`AudioriumSetup` の Inspector です。[セットアップ](../setup/add-audiorium.md)の各ページで説明します。

## 主な機能

| 機能 | 詳細 |
| --- | --- |
| 動画の音を、前方・横と後方・上方のスピーカーから鳴らす | [スピーカー](../setup/speakers.md) |
| 音の響きをプリセットで切り替える | [Sound Mode](../setup/sound-mode.md) |
| スピーカーごとに EQ、Reverb、音量を調整する | [コンソールの操作](../console/operation.md#speaker-eq) |
| コンソールの配色と台を選ぶ | [Audiorium コンソール](../setup/console.md) |
| ムービングライトの色と動きを操作する（照明システムが必要） | [照明](../setup/lights.md) |
| 音に連動する視界エフェクトを切り替える（AudioLink が必要） | [視界エフェクト](../setup/visual-effects.md) |
| コンソールを操作できる人を限定する | [詳細](../setup/advanced.md#操作権限) |
