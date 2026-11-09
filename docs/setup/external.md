---
title: 外部設定
sidebar_position: 3
description: AudioriumSetup の Inspector の「外部設定」の節。AudioLink・LTCGI・照明のオンとオフ
---

# 外部設定

AudioLink・LTCGI・照明を使うかを、チェックで切り替えます。

![外部設定の節。AudioLink がオン、LTCGI がオフ、照明がオン](/img/setup/external.png)

| 項目 | オンにすると | オフにすると | 詳細 |
| --- | --- | --- | --- |
| AudioLink | Scene に AudioLink が無ければ置き、接続した動画プレイヤーの音を AudioLink に送ります。コンソールで、音に連動する視界エフェクトを設定できます | 動画プレイヤーと AudioLink の接続を外します。AudioLink は Scene に残ります | [AudioLink](../integrations/audiolink.md) |
| LTCGI | Scene に LTCGI が無ければ置き、動画プレイヤーの画面とつなぎます。コンソールで LTCGI のオン・オフと強さを設定できます | 動画プレイヤーと LTCGI の接続を外します。LTCGI は Scene に残ります | [LTCGI](../integrations/ltcgi.md) |
| 照明 | 照明を置きます。ムービングライト（吊り）1 台、ライトショー、入場時の光過敏の警告が置かれます | 照明を削除します | [照明](./lights.md) |

AudioLink と LTCGI は、動画プレイヤーの Inspector の設定と同じ物です。動画プレイヤーの Inspector で先に設定している場合は、オンの状態で表示されます。

照明がオンのときは「照明を選択」が表示されます。押すと Hierarchy で照明が選択され、Inspector に照明の設定が表示されます。

## 導入していない場合

AudioLink か LTCGI をプロジェクトに導入していない場合は、チェックの代わりに説明と「入手先を開く」が表示されます。押すと配布ページが開きます。

照明の行は、照明システムをインポートした場合にだけ表示されます。
