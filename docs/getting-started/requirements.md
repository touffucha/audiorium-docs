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

| パッケージ | 動作確認済みバージョン | 実現する機能 | 必要な場合 | 無い場合 | 入手先 |
| --- | --- | --- | --- | --- | --- |
| YamaPlayer | 1.5.19 | 動画の音の入力と、スピーカー・コンソールの配置の基準 | VizVid とどちらかが必須 | VizVid があれば不要<br/>どちらも無い場合は、動画の音を入力できない | [BOOTH](https://booth.pm/ja/items/4768863) |
| VizVid | 1.8.3 | 動画の音の入力と、スピーカー・コンソールの配置の基準 | YamaPlayer とどちらかが必須 | YamaPlayer があれば不要<br/>どちらも無い場合は、動画の音を入力できない | [BOOTH](https://booth.pm/ja/items/5056077) |
| AudioLink | 3.1.2 | 音を解析し、視界エフェクト、照明の音への反応、Speaker EQ の音のスペクトル表示に使う | 必須 | Effects タブの BEAT・LOOK・Echo・Invert・FX Bypass と画面酔いの注意文が表示されない<br/>照明は音に反応せず、コンソールの操作だけで動く<br/>Speaker EQ のグラフに音のスペクトルが表示されない<br/>スピーカー・Sound Mode・Speaker EQ は動作する | [GitHub](https://github.com/llealloo/audiolink) |
| LTCGI | 1.7.4 | 動画プレイヤーの画面の光を壁や床などに反映し、Effects タブの LTCGI Light で明るさを調整 | 照明システムを導入する場合、サンプルシーンを開く場合は必須<br/>それ以外は任意 | 動画の画面の光が周囲に反映されない<br/>Effects タブに LTCGI の項目が表示されない | [GitHub](https://github.com/PiMaker/ltcgi#download) |
| VRC Light Volumes | 3.0.1 | 照明ありのサンプルシーンで、照明の光を床・壁・アバターに反映<br/>LTCGI の動作に必要 | 照明システムを導入する場合、サンプルシーンを開く場合、LTCGI を使う場合は必須 | 照明の光が周囲に反映されない<br/>LTCGI 1.7.4 でコンパイルエラーが発生<br/>サンプルシーンの一部の部品で参照切れが発生 | [GitHub](https://github.com/REDSIM/VRCLightVolumes) |

LTCGI と VRC Light Volumes の光を壁や床などに映すには、対応するシェーダーが必要です。設定は [トラブルシューティング](../help/troubleshooting.md#ltcgi-や-vrc-light-volumes-の光がワールドの壁や床に映らない) を参照してください。

インポートの順番は [インストール](./install.md) で説明します。
