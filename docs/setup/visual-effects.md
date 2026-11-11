---
title: 視界エフェクト
sidebar_position: 7
description: AudioriumSetup の Inspector の「視界エフェクト」の節。コンソールの Effects タブと、画面酔いの注意
---

# 視界エフェクト

コンソールの Effects タブと、そこに表示する画面酔いの注意を設定します。

![視界エフェクトの節](/img/setup/visual-effects.png)

| 項目 | 内容 |
| --- | --- |
| Effects を有効化 | コンソールに Effects タブを置きます。最初はオンです |
| 画面酔いの注意 › 表示 | Effects タブに画面酔いの注意文を表示します。最初はオンです |
| 画面酔いの注意 › 注意文 | Inspector の表示言語が日本語のときは日本語の文を、それ以外のときは英語の文を編集します |

欄の下に「次の文字はコンソールのフォントに含まれていません」と出た文字は、コンソールで表示されません。

## Effects タブが表示される条件

次の両方を満たすと表示されます。

- 「Effects を有効化」がオン
- [外部設定](./external.md) で AudioLink か LTCGI がオン

視界エフェクトは、操作した人の画面にのみ反映されます。種類と操作は [コンソールの操作](../console/operation.md#effects) を参照してください。
