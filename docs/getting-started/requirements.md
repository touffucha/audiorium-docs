---
title: 必要な物と動作環境
sidebar_position: 2
description: Audiorium の動作環境と、外部依存パッケージの役割・必要条件・未導入時の制限
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

| パッケージ | 動作確認済みバージョン | 実現する機能 | 必要な場合 | 入手先 |
| --- | --- | --- | --- | --- |
| YamaPlayer | 1.5.19 | 動画の音の入力、スピーカー・コンソールの配置基準 | VizVid とどちらかが必須 | [BOOTH](https://booth.pm/ja/items/4768863) |
| VizVid | 1.8.3 | 動画の音の入力、スピーカー・コンソールの配置基準 | YamaPlayer とどちらかが必須 | [BOOTH](https://booth.pm/ja/items/5056077) |
| AudioLink | 3.1.2 | 音の解析、視界エフェクト・照明の音への反応、Speaker EQ のスペクトル表示 | 必須 | [GitHub](https://github.com/llealloo/audiolink) |
| LTCGI | 1.7.4 | 画面の光を壁・床に反映、LTCGI Light で明るさを調整 | 照明システムを導入する場合、サンプルシーンを開く場合は必須<br/>それ以外は任意 | [GitHub](https://github.com/PiMaker/ltcgi#download) |
| VRC Light Volumes | 3.0.1 | 照明ありのサンプルシーンで床・壁・アバターに照明の光を反映、LTCGI の動作に必要 | 照明システムを導入する場合、サンプルシーンを開く場合、LTCGI を使う場合は必須 | [GitHub](https://github.com/REDSIM/VRCLightVolumes) |

### 無い場合

:::warning 未導入時に動作が停止するパッケージ

- **YamaPlayer・VizVid**：どちらも無いと、動画の音を入力できず、Audiorium は動作しません。
- **VRC Light Volumes**：LTCGI 1.7.4 がコンパイルエラーになり、その間は Audiorium も動作しません。サンプルシーンの一部の部品で参照切れが発生します。

:::

- **AudioLink**：Effects タブの BEAT・LOOK・Echo・Invert・FX Bypass と画面酔いの注意文が表示されません。Speaker EQ のグラフに音のスペクトルが表示されず、照明は音に反応しません。スピーカー・Sound Mode・Speaker EQ は動作します。
- **LTCGI**：動画の画面の光が周囲に反映されず、Effects タブに LTCGI の項目が表示されません。
- **VRC Light Volumes**：照明の光が周囲に反映されません。

LTCGI と VRC Light Volumes の光を壁や床などに映すには、対応するシェーダーが必要です。設定は [トラブルシューティング](../help/troubleshooting.md#ltcgi-や-vrc-light-volumes-の光がワールドの壁や床に映らない) を参照してください。

インポートの順番は [インストール](./install.md) で説明します。
