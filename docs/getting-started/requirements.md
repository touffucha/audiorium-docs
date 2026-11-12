---
title: 必要な物と動作環境
sidebar_position: 2
description: Audiorium の動作環境と、外部依存パッケージの動作確認済みバージョン
---

# 必要な物と動作環境

## 動作環境

| 項目 | 動作確認済みバージョン |
| --- | --- |
| Unity | 2022.3.22f1 |
| VRChat SDK - Worlds | 3.10.6 |
| プラットフォーム | PC（Windows）。Quest（Android）には対応していません |

## 外部依存パッケージ

次のパッケージは Audiorium に含まれていません。各作者の配布先から入手し、それぞれの規約に従ってご利用ください。Audiorium についてのお問い合わせは、各作者ではなく当ショップへお願いいたします。

| パッケージ | 動作確認済みバージョン | 必要な場合 | 入手先 |
| --- | --- | --- | --- |
| YamaPlayer | 1.5.19 | 動画プレイヤー。VizVid とどちらかが必須 | [BOOTH](https://booth.pm/ja/items/4768863) |
| VizVid | 1.8.3 | 動画プレイヤー。YamaPlayer とどちらかが必須 | [BOOTH](https://booth.pm/ja/items/5056077) |
| AudioLink | 3.1.2 | 推奨。視界エフェクト、音に反応する照明と EQ のグラフに使います | [GitHub](https://github.com/llealloo/audiolink) |
| LTCGI | 1.7.4 | 任意。コンソールから LTCGI の点灯と強さを操作します | [GitHub](https://github.com/PiMaker/ltcgi#download) |
| VRC Light Volumes | 3.0.1 | LTCGI を使う場合は必須 | [GitHub](https://github.com/REDSIM/VRCLightVolumes) |

:::info AudioLink を導入しない場合

視界エフェクトは使用できず、照明と EQ のグラフは音に反応しません。音響の機能は AudioLink なしでも使用できます。

:::

インポートの順番は [インストール](./install.md) で説明します。
