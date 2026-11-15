---
title: スイッチから操作する
sidebar_label: スイッチから操作する
sidebar_position: 2
description: LuraSwitch2 などのスイッチから、コンソールを使わずに FX Bypass・Reverb・プリセットを切り替える
---

# スイッチから操作する

ワールドに置いたスイッチから、コンソールを使わずに一部の操作を行えます。たとえばイベントで、入口のスイッチを押すだけで、来場者が自分の視界エフェクトを止められるようにできます。

スイッチの送信先は、Hierarchy の `AudioriumSetup` の下にある `SwitchEvents` です。スイッチには、次のイベント名を指定します。

| イベント名 | 操作 | 反映される範囲 | 操作権限 |
| --- | --- | --- | --- |
| `_FxBypassOn` | FX Bypass をオンにする（視界エフェクトを止める） | 押したユーザーの画面のみ | 不要 |
| `_FxBypassOff` | FX Bypass をオフにする（選んでいた視界エフェクトに戻す） | 押したユーザーの画面のみ | 不要 |
| `_FxBypassToggle` | FX Bypass のオンとオフを切り替える | 押したユーザーの画面のみ | 不要 |
| `_ReverbRoom`・`_ReverbHall`・`_ReverbCathedral`・`_ReverbOff` | Reverb の種類を切り替える | ワールド全体 | 必要 |
| `_Preset1`〜`_Preset5` | Sound Mode のプリセットを、コンソールの左から 1〜5 番目に切り替える | ワールド全体 | 必要 |

- 操作権限の無いユーザーが、ワールド全体に反映される操作のスイッチを押しても、何も変わりません。操作権限は [詳細](../setup/advanced.md#操作権限) で設定します。
- スイッチで切り替えた状態は、コンソールの表示にも反映されます。FX Bypass は、次に入室したときも残ります。

## LuraSwitch2 で使う

[LuraSwitch2](https://booth.pm/ja/items/1969082) のスイッチは、次のように設定します。

1. スイッチの **Mode** を **External** にします。
2. **External Script** に、`SwitchEvents` をドラッグします。
3. **External Event Name** に、表のイベント名を入力します。

External のスイッチは、押したユーザーの画面でイベントを送ります。ワールド全体に反映される操作は、Audiorium がほかのユーザーへ同期します。

:::tip 持ち運べるスイッチの板にする

LuraSwitch2 の `LuraSwitchBoard_2D` を Pickup モードにし、`■■■■SwitchHere■■■■` の下にスイッチを並べると、手に持って運べる板になります。スタッフが持ち歩いて Reverb やプリセットを切り替える、簡易のリモコンとして使えます。コンソールのすべての操作を持ち運ぶ場合は、コンソールのモデルを [手持ち](../setup/console.md#モデル) にします。

:::

## ほかのスイッチから使う

UI の Button では、OnClick に `SwitchEvents` の UdonBehaviour を入れ、`UdonBehaviour.SendCustomEvent (string)` を選んでイベント名を入力します。自作の UdonSharp からは、`SwitchEvents` の UdonBehaviour に `SendCustomEvent` でイベント名を送ります。
