---
title: Effects
sidebar_position: 5
description: Studio の Effects タブ。コンソールの Effects タブの表示、画面酔いの注意、AudioLink・LTCGI のシーン連携
---

# Effects

コンソールの Effects タブと、AudioLink・LTCGI との連携を設定するタブです。

Effects タブを使うには、「シーン連携」で AudioLink か LTCGI をオンにします。どちらもオフの場合は、「シーン連携」だけが表示されます。

![Effects タブ。左にコンソールの Effects タブのプレビュー](/img/studio/effects-top.png)

## シーン連携

![シーン連携](/img/studio/effects-links.png)

AudioLink と LTCGI を、動画プレイヤーの Inspector と同じようにチェックで切り替えます。

| 操作 | 内容 |
| --- | --- |
| オンにする | Scene に無い場合は配置し、接続した動画プレイヤーと連携します |
| オフにする | 動画プレイヤーとの連携を解除します。配置した AudioLink・LTCGI は Scene に残ります |
| 入手先を開く | プロジェクトに導入していない場合に、チェックの代わりに表示されます。押すと配布ページを開きます |

動画プレイヤーの Inspector で先に連携を設定している場合は、オンの状態で表示されます。

詳しくは [AudioLink と連携する](../integrations/audiolink.md)、[LTCGI と連携する](../integrations/ltcgi.md) を参照してください。

## Audiorium コンソールの Effects タブ

![コンソールの Effects タブのプレビュー](/img/studio/effects-preview.png)

左側に、コンソールの Effects タブのプレビューが表示されます。シーン連携に合わせて、表示される項目が変わります。

| 区分 | 項目 | 必要な物 |
| --- | --- | --- |
| BEAT | Tremor、Radial、Chroma、Glitch | AudioLink |
| LOOK | NTSC、VHS、Bleach、Dither、Cel、Sketch、Neon | AudioLink |
| WORLD | Echo、Invert | AudioLink |
| WORLD | LTCGI | LTCGI |

## Effects タブ

![Effects タブの表示と画面酔いの注意](/img/studio/effects-settings.png)

コンソールに Effects タブを表示するかを、「表示」「非表示」から選択します。

## 画面酔いの注意

「Effects タブに表示」をオンにすると、コンソールの Effects タブに注意書きを表示します。日本語と English の文を変更できます。コンソールのフォントに含まれない文字を入力すると、欄の下にその文字が表示されます。
