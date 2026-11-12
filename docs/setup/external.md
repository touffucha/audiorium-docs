---
title: 外部設定
sidebar_position: 3
description: AudioriumSetup の Inspector の「外部設定」の節。AudioLink・LTCGI・照明システムのオンとオフと、AudioLink・LTCGI で使える機能
---

# 外部設定

AudioLink・LTCGI・照明システムを使うかを切り替えます。

![外部設定の節。AudioLink がオン、LTCGI がオフ、照明システムがオン](/img/setup/external.png)

| 項目 | オンにすると | オフにすると |
| --- | --- | --- |
| AudioLink | Scene に AudioLink が無ければ置き、接続した動画プレイヤーの音を AudioLink に送ります | 動画プレイヤーと AudioLink の接続を外します。AudioLink は Scene に残ります |
| LTCGI | Scene に LTCGI が無ければ置き、動画プレイヤーの画面とつなぎます | 動画プレイヤーと LTCGI の接続を外します。LTCGI は Scene に残ります |
| 照明システム | ムービング（吊り）1 台、ライトショー、入場時の光過敏の警告を置きます。設定は、表示される「照明システムを選択」から開きます（[照明システム](./lights.md)） | 照明を削除します |

AudioLink と LTCGI は、動画プレイヤーの Inspector の設定と同じ物です。動画プレイヤー側で先に設定している場合は、オンで表示されます。

## AudioLink

AudioLink は、音を解析してワールドの演出に渡す仕組みです。VCC でプロジェクトに追加してから、「AudioLink」をオンにします。

| 機能 | AudioLink がある場合 | AudioLink が無い場合 |
| --- | --- | --- |
| 視界エフェクト（コンソールの Effects タブ） | 使用できます | 使用できません |
| 照明システム | 音に反応します | 音に反応しません |
| コンソールの EQ のグラフ | 音に反応します | 音に反応しません |
| 音響（スピーカー、Sound Mode、Speaker EQ） | 使用できます | 使用できます |

## LTCGI

LTCGI は、動画プレイヤーの画面の光をワールドの物体に映す仕組みです。オンにすると、コンソールの Effects タブで LTCGI のオン・オフと強さを操作できます。操作は、操作したユーザーの画面にのみ反映されます。

- **VRC Light Volumes も必要です**：無いと LTCGI がコンパイルエラーになります（[トラブルシューティング](../help/troubleshooting.md#ltcgi-を導入するとコンパイルエラーが出る)）。
- **YamaPlayer の場合**：YamaPlayer の Inspector の「LTCGI を使用」と同じ設定が入ります。
- **VizVid の場合**：Audiorium から LTCGI との連携を設定できません。「LTCGI」のチェックは、Scene に LTCGI があるかを表します。設定は [VizVid のマニュアルの LTCGI の手順](https://xtlcdn.github.io/VizVid/docs/index_ja.html#ltcgi) に従って行います。

LTCGI の配置と設定の詳細は、[LTCGI のコントローラーの置き方と設定](https://ltcgi.dev/Getting%20Started/Setup/Controller)（英語）をご確認ください。

ワールドの壁や床に LTCGI の光が映らない場合は、[トラブルシューティング](../help/troubleshooting.md#ltcgi-や-vrc-light-volumes-の光がワールドの壁や床に映らない) を参照してください。

## 導入していない場合

- AudioLink か LTCGI をプロジェクトに導入していない場合は、チェックの代わりに説明と「入手先を開く」（配布ページを開くボタン）が表示されます。
- 照明システムの行は、照明システムをインポートした場合にだけ表示されます。
