---
title: スイッチから操作する
sidebar_label: スイッチから操作する
description: ワールドに置いたスイッチやボタンから、コンソールを使わずに FX Bypass・Reverb・プリセットを切り替える
---

# スイッチから操作する

ワールドに置いたスイッチやボタンから、コンソールを使わずに FX Bypass・Reverb・プリセットを切り替えられます。たとえばイベントの入口にスイッチを置くと、ユーザーは押すだけで自分の視界エフェクトを止められます。

## 切り替えられる操作

スイッチには、次のイベント名を 1 つ指定します。

| イベント名 | 押すと | 反映される範囲 | 操作権限 |
| --- | --- | --- | --- |
| `_FxBypassOn` | FX Bypass をオンにし、LTCGI を除く視界エフェクトを止めます | 押したユーザーの画面のみ | 不要 |
| `_FxBypassOff` | FX Bypass をオフにし、止めていた視界エフェクトを戻します | 押したユーザーの画面のみ | 不要 |
| `_FxBypassToggle` | FX Bypass のオンとオフを切り替えます | 押したユーザーの画面のみ | 不要 |
| `_ReverbRoom`・`_ReverbHall`・`_ReverbCathedral`・`_ReverbOff` | Reverb の種類を Room・Hall・Cathedral・Off にします | ワールド全体 | 必要 |
| `_Preset1`〜`_Preset5` | コンソールの Sound Mode で、左から 1〜5 番目のプリセットに切り替えます | ワールド全体 | 必要 |

- 操作権限は、`AudioriumSetup` の Inspector の [詳細](advanced.md#操作権限) で設定します。デフォルトの「全員」では、誰が押しても切り替わります。権限の無いユーザーが Reverb やプリセットのスイッチを押しても、何も変わりません。
- FX Bypass は、コンソールに Effects のタブがあるワールドで動作します。押した状態は、次に入室したときも残ります。
- スイッチで切り替えた状態は、コンソールの表示にも反映されます。

## 送り先の SwitchEvents

スイッチの送り先の `SwitchEvents` は、Hierarchy の `AudioriumSetup` の中にあります。Audiorium を動画プレイヤーに接続すると作られます（[クイックスタート](../getting-started/quick-start.md)）。`SwitchEvents` に設定する項目はありません。

![Hierarchy で AudioriumSetup を開き、中の SwitchEvents を赤枠で示している](/img/setup/switches-hierarchy.png)

## LuraSwitch2 のスイッチで使う

[LuraSwitch2](https://booth.pm/ja/items/1969082) を導入したプロジェクトで行います。

<div className="paren-list">

1. Project の `Assets/QuickBrown/LuraSwitch2/01_PREFAB/01_Switch` から、スイッチのプレハブ（例：`Switch_PostEffect`）をシーンに置きます。
2. Hierarchy で置いたスイッチを選び、Inspector の「■ SwitchMode」にある Mode（日本語の表示では「モード」）を External にします。

   ![スイッチの Inspector の「■ SwitchMode」。Mode の行を赤枠で示している](/img/setup/switches-lura-mode.png)

3. Hierarchy の `AudioriumSetup` の中の `SwitchEvents` を、Inspector の「■ External」にある External Script の欄へドラッグします。
4. External Event Name に、表のイベント名を入力します（例：`_FxBypassToggle`）。大文字と小文字、先頭の `_` も表のとおりに入力します。

   ![スイッチの Inspector の「■ External」。SwitchEvents が入った External Script と、_FxBypassToggle が入った External Event Name を赤枠で示している](/img/setup/switches-lura-external.png)

</div>

Sync Mode は変えなくてかまいません。Reverb とプリセットは、Audiorium がワールド全体に反映します。

:::tip 持ち運べるスイッチの板にする

LuraSwitch2 の `LuraSwitchBoard_2D` の Mode を Pickup にし、Switch Visual Mode を 2D_UI にしたスイッチを `■■■■SwitchHere■■■■` の中に入れると、手に持って運べる板になります（くわしくは LuraSwitch2 のマニュアルの [SwitchBoard](https://lurathunder.github.io/lura-switch-docs/docs/utilities/switch-board)）。コンソールのすべての操作を持ち運ぶ場合は、コンソールのモデルを [手持ち](console.md#モデル) にします。

:::

## UI の Button で使う

ワールドの UI の Button からもイベント名を送れます。Button を VRChat で押せるようにする Canvas の準備は、VRChat の説明（[VRC Ui Shape](https://creators.vrchat.com/worlds/components/vrc_uishape/)）を見てください。

<div className="paren-list">

1. Hierarchy で Button を選び、Inspector の On Click ()（日本語の表示では「クリック時 ()」）に行を追加します。追加した行の左下の欄へ、Hierarchy の `AudioriumSetup` の中の `SwitchEvents` をドラッグします。
2. 右上の一覧で、UdonBehaviour › SendCustomEvent (string) を選びます。
3. 右下の欄に、イベント名を入力します。

   ![Button の Inspector の On Click ()。左下の SwitchEvents、右上の UdonBehaviour.SendCustomEvent (string)、右下の _FxBypassToggle の欄を赤枠で示している](/img/setup/switches-button.png)

</div>

:::warning 選ぶ関数の注意

一覧には、AudioriumSwitchEvents の下にも SendCustomEvent (string) や `_FxBypassToggle ()` などが並びますが、これらは VRChat では動きません。必ず UdonBehaviour の下の SendCustomEvent (string) を選んでください。

:::

## 自作の UdonSharp から送る

`SwitchEvents` の UdonBehaviour に、`SendCustomEvent` でイベント名を送ります。

```csharp
using UdonSharp;
using VRC.Udon;

public class FxBypassSwitch : UdonSharpBehaviour
{
    public UdonBehaviour switchEvents;

    public override void Interact()
    {
        switchEvents.SendCustomEvent("_FxBypassToggle");
    }
}
```

Inspector の Switch Events の欄には、Hierarchy の `SwitchEvents` をドラッグします。`SendCustomNetworkEvent` ではなく `SendCustomEvent` で送ってください。ワールド全体への反映は Audiorium が行います。
