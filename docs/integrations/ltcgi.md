---
sidebar_label: LTCGI
title: LTCGI
sidebar_position: 2
description: LTCGI を導入したときにコンソールでできることと、外部設定でオン・オフする手順
---

# LTCGI

LTCGI は、スクリーンの映像の光をワールドの物体に映す仕組みです。Audiorium での扱いは「任意」です。

| 項目 | 内容 |
| --- | --- |
| 動作確認済みの版 | 1.7.4 |
| 入手先 | [ltcgi.dev](https://ltcgi.dev/) |

## LTCGI で使える機能

コンソールの Effects タブで、LTCGI のオン・オフと強さを操作できます。操作は、操作した人の画面にのみ反映されます。

## 連携する

1. VCC で LTCGI と **VRC Light Volumes** をプロジェクトに追加します。LTCGI 1.7.4 は、VRC Light Volumes が無いとコンパイルエラーになります（[トラブルシューティング](../help/troubleshooting.md#ltcgi-を導入するとコンパイルエラーが出る)）。
2. `AudioriumSetup` の Inspector の [外部設定](../setup/external.md) で、「LTCGI」をオンにします。

LTCGI が Scene に無い場合は置かれます。YamaPlayer では、YamaPlayer の Inspector の「LTCGI を使用」と同じ設定が入ります。

:::note VizVid の場合

Audiorium から LTCGI との連携を設定できません。「LTCGI」のチェックは、Scene に LTCGI があるかを表します。設定は VizVid の手順に従って行います。

:::

## 連携を解除する

「LTCGI」をオフにします。LTCGI は Scene に残るので、不要なら Hierarchy から削除します。配置と設定の詳細は、LTCGI の配布ページをご確認ください。
