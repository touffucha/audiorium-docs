---
title: 必要な物と動作環境
sidebar_position: 2
description: Audiorium の動作確認済みのバージョンと、別途入手するパッケージ
---

# 必要な物と動作環境

対象のバージョン：1.0.0

Audiorium は、ご自身のワールドのプロジェクトに導入します。サンプルシーンは含まれていません。

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

:::warning LTCGI のクレジット

LTCGI を使用するワールドには、LTCGI の規約に基づきクレジットの表示が必要です。

:::

## 配布ファイル

| ファイル | 内容 |
| --- | --- |
| `Audiorium_1.0.0.unitypackage` | 本体。コンソール、スピーカー、Audiorium Studio |
| `AudioriumLightingSystem_1.0.0.unitypackage` | 照明システム（拡張パッケージ）。本体の後にインポートします。単体では動作しません |

次は [インストール](./install.md) に進みます。
