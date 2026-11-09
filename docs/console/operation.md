---
title: コンソールの操作
sidebar_label: コンソールの操作
sidebar_position: 1
description: ワールド内のコンソールの 4 つのタブで、ユーザーができる操作
---

# コンソールの操作

ユーザーは、ワールド内のコンソールの 4 つのタブで操作します。左上の GLOBAL の 3 タブの操作はワールド全体に、右の LOCAL の Effects は操作した人の画面にのみ反映されます。

| タブ | 反映される範囲 | 操作権限 | 必要な物 |
| --- | --- | --- | --- |
| Sound Mode | ワールド全体 | 必要 | — |
| Speaker EQ | ワールド全体 | 必要 | — |
| Live | ワールド全体 | 必要 | 照明システム |
| Effects | 操作した人の画面のみ | 不要 | AudioLink か LTCGI |

操作できる人は、`AudioriumSetup` の Inspector の [詳細](../setup/advanced.md#操作権限) で設定します。

## Sound Mode

音の響きのプリセットを切り替えます。

![コンソールの Sound Mode タブ](/img/console/sound.webp)

| 項目 | 内容 |
| --- | --- |
| PRESETS | ワールド制作者が用意したプリセット。押すと切り替わります |
| Slot A・B・C | 自分で調整した音を保存する枠。「保存」で今の音を保存し、枠を押すと部屋全体に反映します。保存した内容は保存した人のみが使え、次に入室したときも残ります |
| CURRENT STATE | 今のプリセットと Reverb の種類 |
| REVERB | Reverb の種類（Room・Hall・Cathedral・Off）と、Wet、Reverb Level、Decay、HF Decay、Pre-Delay。グラフで残響の長さを確認できます |

## Speaker EQ

スピーカーごとに EQ、Reverb、音量を調整します。

![コンソールの Speaker EQ タブ](/img/console/speaker-eq.webp)

| 項目 | 内容 |
| --- | --- |
| SPEAKERS | スピーカーの配置の図と、調整するスピーカーの選択 |
| グラフ | 選択したスピーカーの周波数特性 |
| LOW CUT・HIGH CUT・LOW Q・HIGH Q | カットする周波数と傾きの鋭さ |
| VOLUME・REVERB | 音量と、Reverb へ送る量 |
| MASTER | FILTER（全体のローカット・ハイカット）と、EQ Bypass（EQ を一時的に無効にする） |

## Live

照明の色、パターン、速さ、キューを操作します。照明システム（拡張パッケージ）が必要です。

![コンソールの Live タブ](/img/console/live.webp)

| 項目 | 内容 |
| --- | --- |
| SOUND | 全体の音のフィルターと、押している間だけ低音（Low）・全体（Kill）・高音（High）を切る操作 |
| LIGHTS | 照明の色。カラーホイールと、Auto・White・Ice・Blue・Amber・Magenta・Red |
| PATTERN | ムービングライトの動き（Auto・Fan・Cross・Tent・Wave・Circle・Sweep・Pillar）と、SPEED、MODE |
| CUE | Blinder・Wash・Blackout・Strobe。押している間だけ効きます（カードの Hold の表示） |

照明の点滅に配慮が必要な場合は、[入場時の光過敏の警告](../setup/entry-notice.md) を表示できます。

## Effects

音に連動する視界エフェクトを切り替えます。操作した人の画面にのみ反映されます。

![コンソールの Effects タブ](/img/console/effects.webp)

| 区分 | 項目 | 内容 |
| --- | --- | --- |
| BEAT | Tremor・Radial・Chroma・Glitch | 音の拍に合わせて動く効果。チェックでオン、スライダーで強さを調整します |
| LOOK | NTSC・VHS・Bleach・Dither・Cel・Sketch・Neon | 画面全体の質感 |
| WORLD | Echo・Invert・LTCGI | 空間に効く効果。LTCGI は、LTCGI がワールドにある場合に表示されます |
| FX Bypass | — | 視界エフェクトを一時的にすべて無効にします |

視界エフェクトは画面酔いを起こすことがあります。注意文の表示は、`AudioriumSetup` の Inspector の [視界エフェクト](../setup/visual-effects.md) で設定します。
