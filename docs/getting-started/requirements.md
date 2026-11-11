---
title: 必要な物と動作環境
sidebar_position: 2
description: Audiorium の動作確認済みのバージョン、別途入手するパッケージ、配布ファイル
---

# 必要な物と動作環境

対象のバージョン：1.0.0

## 動作確認済みのバージョン

| 項目 | バージョン |
| --- | --- |
| Unity | 2022.3.22f1 |
| VRChat SDK - Worlds | 3.10.5 |
| プラットフォーム | PC（Windows）。Quest（Android）には対応していません |

## 別途入手するパッケージ

次のパッケージは Audiorium に含まれていません。各作者様の配布先から入手し、それぞれの規約に従ってご利用ください。Audiorium についてのお問い合わせは、各作者様ではなく当ショップへお願いいたします。

| パッケージ | 扱い | 用途 | 入手先 |
| --- | --- | --- | --- |
| YamaPlayer 1.5.19 | VizVid とどちらかが必須 | 動画プレイヤー | [BOOTH](https://booth.pm/ja/items/4768863) |
| VizVid 1.8.2 | YamaPlayer とどちらかが必須 | 動画プレイヤー | [BOOTH](https://booth.pm/ja/items/5056077) |
| AudioLink 3.1.2 | 推奨 | 視界エフェクト、音に反応する照明と EQ のグラフ | [audiolink.dev](https://audiolink.dev/) |
| LTCGI 1.7.4 | 任意 | コンソールからの LTCGI の点灯と強さの操作 | [ltcgi.dev](https://ltcgi.dev/) |
| VRC Light Volumes 3.0.1 | LTCGI を使う場合は必須 | LTCGI のコンパイルに必要 | [GitHub](https://github.com/REDSIM/VRCLightVolumes) |

:::info AudioLink を導入しない場合

視界エフェクトはご利用いただけず、照明と EQ のグラフは音に反応しません。音響の機能は AudioLink なしでもご利用いただけます。

:::

## 配布ファイル

購入したバリエーションによって、届くファイルが異なります。

| ファイル | 中身 | 届くバリエーション |
| --- | --- | --- |
| `Audiorium_1.0.0.unitypackage` | 本体（コンソール、スピーカー、Inspector）と、[サンプルシーン](./sample-scene.md)（照明なし） | 本体、フルセット |
| `AudioriumLightingSystem_1.0.0.unitypackage` | 照明システム（拡張パッケージ）と、サンプルシーン（照明あり）。単体では動作しません | 照明システム、フルセット |

インポートの順番は [インストール](./install.md) で説明します。

{/* 未確認：2 つのパッケージの大きさ（設計の推定では本体が約 380 MB）。書き出した配布物で測ってから、載せるかを決める。決めたら、この印を消す。印が残っている間は公開しない */}
