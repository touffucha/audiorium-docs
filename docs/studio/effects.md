---
title: Effects
sidebar_position: 5
description: Studio の Effects タブ。コンソールの Effects タブの表示、画面酔いの注意、AudioLink・LTCGI との連携
---

# Effects

コンソールの Effects タブと、AudioLink・LTCGI との連携を設定するタブです。

Effects タブを使うには、AudioLink か LTCGI を Scene に配置します。どちらも無い場合は、連携の一覧と「AudioLink を Scene に追加」だけが表示されます。

![Effects タブ。左にコンソールの Effects タブのプレビュー](/img/studio/effects-top.png)

## Audiorium コンソールの Effects タブ

![コンソールの Effects タブのプレビュー](/img/studio/effects-preview.png)

左側に、コンソールの Effects タブのプレビューが表示されます。Scene にある連携に合わせて、表示される項目が変わります。

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

「Effects タブに 1 行で表示」をオンにすると、コンソールの Effects タブに注意書きを表示します。日本語と English の文を変更できます。コンソールのフォントに含まれない文字があると、その文字が表示されます。

## この Scene との連携

![この Scene との連携と AudioLink の接続](/img/studio/effects-audiolink.png)

AudioLink と LTCGI が Scene にあるかを表示します。

| 表示 | 内容 |
| --- | --- |
| ✓ | Scene に配置されています |
| 未配置 | Scene にありません。「入手先を開く」で配布ページを開けます |
| AudioLink を Scene に追加 | AudioLink をプロジェクトに導入している場合に押せます。AudioLink を Scene に配置します |

## AudioLink の接続

AudioLink が Scene にあるときに表示されます。「動画の音声を AudioLink に送信する」をオンにすると、接続した動画プレイヤーの音が AudioLink に送られます。

詳しくは [AudioLink](../integrations/audiolink.md)、[LTCGI](../integrations/ltcgi.md) を参照してください。
