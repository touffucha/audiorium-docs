---
title: 視界エフェクト
sidebar_position: 7
description: AudioriumSetup の Inspector の「視界エフェクト」の節。コンソールの Effects タブと、画面酔いの注意
---

# 視界エフェクト

コンソールの Effects タブと、AudioLink を使う視界エフェクトの画面酔いの注意を設定します。

![視界エフェクトの節](/img/setup/visual-effects.png)

| 項目 | 内容 |
| --- | --- |
| Effects を有効化 | 下記の表示条件を満たすと、コンソールに Effects タブが表示されます。デフォルトはオンです |
| デフォルト › Effects を有効にする | オンにすると、ワールドに入ったユーザーの Effects タブが、下の BEAT・LOOK・WORLD で選択した効果がオンの状態で始まります。オフのときは、入った時点では BEAT・LOOK・Echo・Invert がオフで、各ユーザーが Effects タブでオンにできます。デフォルトはオフです |
| デフォルト › BEAT・LOOK・WORLD | 入った時点でオンにする BEAT・Echo・Invert と、選択しておく LOOK です。「Effects を有効にする」がオンのときだけ選択できます |
| デフォルト › LTCGI を有効にする | 入った時点で LTCGI の画面の光をオンにします。「Effects を有効にする」とは別に設定できます。デフォルトはオンです |
| 画面酔いの注意 › 表示 | Scene に AudioLink がある場合に、Effects タブに画面酔いの注意文を表示します。デフォルトはオンです |
| 画面酔いの注意 › 注意文 | Inspector の表示言語が日本語のときは日本語の文を、それ以外のときは英語の文を編集します |

デフォルトの行は、Effects タブを操作したことのないユーザーにだけ適用されます。一度操作したユーザーには、そのユーザーが保存した設定が使われます。「Effects を有効にする」から WORLD までの行は AudioLink が、LTCGI の行は LTCGI がワールドにある場合に表示されます。

欄の下に「次の文字はコンソールのフォントに含まれていません」と表示された文字は、コンソールで表示されません。

## Effects タブが表示される条件

次の両方を満たすと表示されます。

- 「Effects を有効化」がオン
- Scene に AudioLink か LTCGI が配置されている

[外部設定](./external.md) のチェックは、動画プレイヤーとの接続状態などを示します。接続を解除しても AudioLink や LTCGI が Scene に残っていれば、タブの表示条件は満たされます。AudioLink があると BEAT・LOOK・Echo・Invert が、LTCGI があると LTCGI の点灯と強さの操作が表示されます。

視界エフェクトは、操作したユーザーの画面にのみ反映されます。種類と操作は [コンソールの操作](../console/operation.md#effects) を参照してください。
