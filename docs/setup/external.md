---
title: 外部設定
sidebar_position: 3
description: AudioriumSetup の Inspector の「外部設定」の節。AudioLink・LTCGI・照明システムのオンとオフ
---

# 外部設定

AudioLink・LTCGI・照明システムを使うかを切り替えます。

![外部設定の節。AudioLink がオン、LTCGI がオフ、照明システムがオン](/img/setup/external.png)

| 項目 | オンにすると | オフにすると |
| --- | --- | --- |
| AudioLink | Scene に AudioLink が無ければ配置し、接続した動画プレイヤーの音を AudioLink に送ります | 動画プレイヤーと AudioLink の接続を解除します。AudioLink は Scene に残ります |
| LTCGI | Scene に LTCGI が無ければ配置し、動画プレイヤーの画面と接続します | 動画プレイヤーと LTCGI の接続を解除します。LTCGI は Scene に残ります |
| 照明システム | ムービング（吊り）1 台、ライトショー、入場時の光過敏の警告を配置します。設定は、表示される「照明システムを選択」から開きます（[照明システム](./lights.md)） | 照明システムを無効にし、ビルドから外します。配置と設定は残り、オンに戻すと元どおりになります |

AudioLink と LTCGI は、動画プレイヤー側で先に接続している場合もオンで表示されます。

## AudioLink

AudioLink は、音を解析してワールドの演出に渡す仕組みです。VCC でプロジェクトに追加してから、「AudioLink」をオンにします。

## LTCGI

LTCGI は、動画プレイヤーの画面の光をワールドの物体に映す仕組みです。Scene に LTCGI があり、「Effects を有効化」がオンの場合は、コンソールの Effects タブで LTCGI のオン・オフと強さを操作できます。操作は、操作したユーザーの画面にのみ反映されます。

- **VRC Light Volumes も必要です**。LTCGI 1.7.4 は、VRC Light Volumes が無い場合にコンパイルエラーが出ます（[トラブルシューティング](../help/troubleshooting.md#ltcgi-を導入するとコンパイルエラーが出る)）。
- **YamaPlayer** の画面を接続するには、「LTCGI」をオンにします。YamaPlayer の Inspector の「LTCGI を使用」と同じ設定が入ります。
- **VizVid** の画面を接続するには、「LTCGI」をオンにします。LTCGI_Controller の Inspector の Auto-Configure と同じ設定が入ります。先に Auto-Configure で接続していた場合は、チェックを外しても解除されません。LTCGI_Controller の Inspector の Un-Configure で解除します。

LTCGI の配置と設定の詳細は、[LTCGI のコントローラーの配置と設定](https://ltcgi.dev/Getting%20Started/Setup/Controller)（英語）を参照してください。

ワールドの壁や床に LTCGI の光が映らない場合は、[トラブルシューティング](../help/troubleshooting.md#ltcgi-や-vrc-light-volumes-の光がワールドの壁や床に映らない) を参照してください。

## 導入していない場合

- AudioLink・LTCGI の各項目では、対応するパッケージがプロジェクトに入っていないと、チェックの代わりに説明と「入手先を開く」が表示されます。
- 照明システムの行は、照明システムをインポートした場合にだけ表示されます。
