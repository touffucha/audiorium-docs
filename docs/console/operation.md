---
title: コンソールの操作
sidebar_label: コンソールの操作
sidebar_position: 1
description: コンソールの各タブの表示条件と操作、反映される範囲、操作権限
---

# コンソールの操作

ワールド内のコンソールに表示されるタブは、ワールドの設定によって変わります。

| タブ | 反映される範囲 | 操作権限 | 表示条件 |
| --- | --- | --- | --- |
| Sound Mode | ワールド全体（GLOBAL） | 必要 | 常に表示 |
| Speaker EQ | ワールド全体（GLOBAL） | 必要 | 常に表示 |
| Live | ワールド全体（GLOBAL） | 必要 | 照明システムのライトショーが接続されている |
| Effects | 操作したユーザーの画面のみ（LOCAL） | 不要 | 「Effects を有効化」がオンで、Scene に AudioLink か LTCGI がある |

操作できるユーザーは、`AudioriumSetup` の Inspector の [詳細](../setup/advanced.md#操作権限) で設定します。

## Sound Mode

音の響きのプリセットを切り替えます。

![コンソールの Sound Mode タブ](/img/console/sound.webp)

| 項目 | 内容 |
| --- | --- |
| PRESETS | ワールド制作者が用意したプリセット |
| Slot A・B・C | ユーザーが調整した音の保存枠。「保存」または「上書き」を押し、確認画面で確定します。保存済みの枠を押すと、その音をワールド全体に反映します。保存した内容は保存したユーザーだけが呼び出せ、次に入室したときも残ります |
| CURRENT STATE | 今のプリセットと Reverb の種類 |
| REVERB | Reverb の種類（Room・Hall・Cathedral・Off）と、Wet、Reverb Level、Decay、HF Decay、Pre-Delay |

## Speaker EQ

スピーカーごとに EQ・Reverb・音量を調整します。

![コンソールの Speaker EQ タブ](/img/console/speaker-eq.webp)

| 項目 | 内容 |
| --- | --- |
| SPEAKERS | 調整するスピーカーの選択 |
| グラフ | 選択したスピーカーの周波数特性 |
| LOW CUT・HIGH CUT・LOW Q・HIGH Q | カットする周波数と傾きの鋭さ |
| VOLUME・REVERB | 音量と、Reverb へ送る量 |
| MASTER | FILTER（全体のローカット・ハイカット）と、EQ Bypass（EQ を一時的に無効にする） |

## Live

照明の色、パターン、速さ、キューを操作します。ワールド制作者は、別売またはフルセットに含まれる [照明システム](../setup/lights.md) を配置し、ライトショーを接続します。

![コンソールの Live タブ](/img/console/live.webp)

| 項目 | 内容 |
| --- | --- |
| SOUND | 全体の音のフィルターと、押している間だけ低音（Low）・全体（Kill）・高音（High）を切る操作 |
| LIGHTS | 照明の色。カラーホイールと、Auto・White・Ice・Blue・Amber・Magenta・Red |
| PATTERN | ムービングライトの動き（Auto・Fan・Cross・Tent・Wave・Circle・Sweep・Pillar）と、SPEED、MODE |
| CUE | Blinder・Wash・Blackout・Strobe。押している間だけ有効です（カードの Hold の表示） |

照明の点滅に配慮が必要な場合は、[入場時の光過敏の警告](../setup/entry-notice.md) を表示できます。

## Effects

視界エフェクトと LTCGI の光を調整します。操作は自分の画面にのみ反映されます。表示される項目は、Scene にある AudioLink と LTCGI によって変わります。

![コンソールの Effects タブ](/img/console/effects.webp)

| 区分 | 項目 | 内容 |
| --- | --- | --- |
| BEAT | Tremor・Radial・Chroma・Glitch | AudioLink がある場合に表示します。チェックで有効にし、スライダーで音の拍に合わせて動く効果の強さを調整します |
| LOOK | NTSC・VHS・Bleach・Dither・Cel・Sketch・Neon | AudioLink がある場合に表示します。画面全体の質感を切り替えます |
| WORLD | Echo・Invert | AudioLink がある場合に表示します。Echo は動画の映像の範囲に重なります |
| WORLD | LTCGI | LTCGI がある場合に表示します。動画の光の点灯と強さを調整します |
| FX Bypass | — | BEAT・LOOK・Echo・Invert を一時的に無効にします。LTCGI の点灯は個別に切り替えます |

視界エフェクトは画面酔いを起こすことがあります。注意文の表示は [視界エフェクト](../setup/visual-effects.md) で設定します。
