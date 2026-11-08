---
sidebar_label: LTCGI と連携する
title: LTCGI
sidebar_position: 3
description: LTCGI を導入したときにコンソールでできることと、Studio のシーン連携でオン・オフする手順、クレジットの表示
---

# LTCGI

LTCGI は、スクリーンの映像の光をワールドの物体に映す仕組みです。Audiorium での扱いは「任意」です。

| 項目 | 内容 |
| --- | --- |
| 動作確認済みの版 | 1.7.4 |
| 入手先 | [ltcgi.dev](https://ltcgi.dev/) |

## LTCGI で使える機能

LTCGI と連携すると、コンソールの Effects タブで LTCGI のオン・オフと強さを操作できます。操作は、操作した人の画面にのみ反映されます。

## 連携する

1. LTCGI と VRC Light Volumes をプロジェクトに導入します。LTCGI 1.7.4 は、VRC Light Volumes が無いとコンパイルエラーになります（[トラブルシューティング](../help/troubleshooting.md#ltcgi-を導入するとコンパイルエラーが出る)）。
2. Studio の [Effects](../studio/effects.md) タブを開き、「シーン連携」の「LTCGI」をオンにします。

LTCGI が Scene に無い場合は配置されます。YamaPlayer では、YamaPlayer の Inspector の「LTCGI を使用」と同じ設定が入ります。

![シーン連携](/img/studio/effects-links.png)

LTCGI をプロジェクトに導入していない場合は、チェックの代わりに「入手先を開く」が表示されます。

:::note VizVid の場合

VizVid では、Studio から LTCGI との連携を設定できません。「LTCGI」のチェックは、Scene に LTCGI があるかを表します。VizVid の LTCGI の設定は、VizVid の手順に従って行います。

:::

## 連携を解除する

「LTCGI」をオフにすると、動画プレイヤーと LTCGI の連携が解除されます。LTCGI は Scene に残ります。不要な場合は、Hierarchy から削除します。

LTCGI の配置と設定の詳細は、LTCGI の配布ページをご確認ください。

:::warning クレジットの表示

LTCGI を使用するワールドには、LTCGI の規約に基づきクレジットの表示が必要です。

:::
