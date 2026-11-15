---
title: スイッチから操作する
sidebar_label: スイッチから操作する
description: ワールドに配置したスイッチやボタンから、コンソールを使わずに FX Bypass・Reverb・プリセットを切り替える
---

# スイッチから操作する

視界エフェクトの停止（FX Bypass）、Reverb、プリセットの切り替えを、ワールドの好きな場所に配置したスイッチやボタンに割り当てられます。たとえばイベントの入口にスイッチを配置すると、ユーザーは押すだけで自分の視界エフェクトを止められます。

スイッチには、送り先として Hierarchy の `AudioriumSetup` の中の `SwitchEvents` を、送る内容として [切り替えられる操作](#切り替えられる操作) のイベント名を指定します。方法は [LuraSwitch2 のスイッチ](#luraswitch2-のスイッチで使う)、[UI の Button](#ui-の-button-で使う)、[自作の UdonSharp](#自作の-udonsharp-から送る) の 3 つです。

## 切り替えられる操作

スイッチ 1 つに、次のイベント名を 1 つ指定します。

| イベント名 | 押すと | 反映される範囲 | 操作権限 |
| --- | --- | --- | --- |
| `_FxBypassOn` | FX Bypass をオンにし、視界エフェクトを止めます | 押したユーザーの画面のみ | 不要 |
| `_FxBypassOff` | FX Bypass をオフにし、止めていた視界エフェクトを戻します | 押したユーザーの画面のみ | 不要 |
| `_FxBypassToggle` | FX Bypass のオンとオフを切り替えます | 押したユーザーの画面のみ | 不要 |
| `_ReverbRoom` | Reverb の種類を Room にします | ワールド全体 | 必要 |
| `_ReverbHall` | Reverb の種類を Hall にします | ワールド全体 | 必要 |
| `_ReverbCathedral` | Reverb の種類を Cathedral にします | ワールド全体 | 必要 |
| `_ReverbOff` | Reverb を Off にします | ワールド全体 | 必要 |
| `_Preset1`・`_Preset2`・`_Preset3`・`_Preset4`・`_Preset5` | コンソールの Sound Mode で、左から 1〜5 番目のプリセットに切り替えます。名前を変えていなければ、1 番目から Cinema・Concert・Lounge・Submerged・Radio です | ワールド全体 | 必要 |

- 視界エフェクトを止めるだけのスイッチ（入口のスイッチなど）には `_FxBypassOn` を使います。1 つのスイッチでオンとオフを切り替えるときは `_FxBypassToggle` を使います。
- FX Bypass で止まるのは、コンソールの Effects タブのエフェクト（LTCGI を除く）です。照明システムの照明は、Live タブの Strobe も含めて止まりません。
- FX Bypass は、コンソールに Effects タブがあるワールドで動作します（[Effects タブが表示される条件](visual-effects.md#effects-タブが表示される条件)）。FX Bypass のオンとオフは、次に入室したときも残ります。
- 操作権限は `AudioriumSetup` の Inspector の [詳細](advanced.md#操作権限) で設定します。デフォルトの「全員」では、誰が押しても切り替わります。権限の無いユーザーが Reverb やプリセットのスイッチを押しても何も変わりません。

## 送り先の SwitchEvents

スイッチの送り先の `SwitchEvents` は、Hierarchy の `AudioriumSetup` の中にあります。

![Hierarchy で AudioriumSetup を開き、中の SwitchEvents を赤枠で示している](/img/setup/switches-hierarchy.png)

`SwitchEvents` が無いときは、`AudioriumSetup` の Inspector にある「動画プレイヤー」の欄を確認します。空になっていれば、Hierarchy の動画プレイヤーをその欄へドラッグして接続します（[動画プレイヤー](video-player.md)）。

## LuraSwitch2 のスイッチで使う

[LuraSwitch2](https://booth.pm/ja/items/1969082) を導入したプロジェクトで行います。

<div className="paren-list">

1. Project の `Assets/QuickBrown/LuraSwitch2/01_PREFAB/01_Switch` から、好みのスイッチのプレハブ（例：`Switch_PostEffect`）を Scene に配置します。
2. Hierarchy で配置したスイッチを選択し、Inspector の「■ SwitchMode」にある Mode（日本語の表示では「モード」）を External にします。

   ![スイッチの Inspector の「■ SwitchMode」。Mode の行を赤枠で示している](/img/setup/switches-lura-mode.png)

3. スイッチを選択したまま、同じ Inspector の「■ LocalSave」の下にある「■ External」の External Script の欄へ、Hierarchy の `AudioriumSetup` の中の `SwitchEvents` をドラッグします。

   ![左は Hierarchy で、Switch_PostEffect が選択され、AudioriumSetup の中の SwitchEvents を赤枠で示している。右はスイッチの Inspector の「■ External」で、External Script の欄を赤枠で示し、SwitchEvents から矢印でつないでいる](/img/setup/switches-lura-drag.png)

4. 同じ「■ External」の External Event Name に、[切り替えられる操作](#切り替えられる操作) の表のイベント名を入力します（例：`_FxBypassToggle`）。大文字と小文字、先頭の `_` も表のとおりに入力します。

   ![スイッチの Inspector の「■ External」。SwitchEvents が入った External Script と、_FxBypassToggle が入った External Event Name を赤枠で示している](/img/setup/switches-lura-external.png)

</div>

External にしたスイッチには、オンとオフの表示が出ません。Sync Mode は変更する必要はありません。反映される範囲は、Sync Mode の値にかかわらず [切り替えられる操作](#切り替えられる操作) の表のとおりです。スイッチの文字や見た目の変え方は、[LuraSwitch2 のマニュアル](https://lurathunder.github.io/lura-switch-docs/) を参照してください。

### 持ち運べるスイッチの板にする

LuraSwitch2 の SwitchBoard に、上の手順で作ったスイッチを配置すると、手に持って運べる板になります。

<div className="paren-list">

1. Project の `Assets/QuickBrown/LuraSwitch2/01_PREFAB/10_Utility/03_SwitchBoard` から、`LuraSwitchBoard_2D` を Scene に配置します。
2. Hierarchy で `LuraSwitchBoard_2D` を選択し、Inspector の「■ 基本設定／Basic Settings」にある Mode（日本語の表示では「モード」）を Pickup にします。

   ![板の Inspector の「■ 基本設定／Basic Settings」。Mode を Pickup にした行を赤枠で示している](/img/setup/switches-board-mode.png)

3. Hierarchy で板に配置するスイッチを選択し、Inspector の「■ SwitchMode」にある Switch Visual Mode を 2D_UI にします。スイッチの立体の見た目が消えます。
4. Hierarchy でそのスイッチを、`LuraSwitchBoard_2D` の中の `■■■■SwitchHere■■■■`（Board_Canvas › BoardVisual › BoardMask の中）へドラッグします。この時点では、スイッチは元の場所に残ります。

   ![Hierarchy で、選択した Switch_PostEffect と、LuraSwitchBoard_2D の中の ■■■■SwitchHere■■■■ を赤枠で示し、矢印でつないでいる](/img/setup/switches-board-drag.png)

5. スイッチを選択したまま、Inspector の Transform の Position（日本語の表示では「位置」）を X 0・Y -0.19・Z 0 に、Rotation（「回転」）を X 0・Y 0・Z 0 にします。スイッチが板の正面の中央に載ります。2 つ配置するときは、Position の X を 0.06 と -0.06 にします。

   ![スイッチの Inspector の Transform。位置が X 0・Y -0.19・Z 0、回転が X 0・Y 0・Z 0 の行を赤枠で示している](/img/setup/switches-board-transform.png)

   ![板の正面。中央に Post Effect のスイッチが載っている](/img/setup/switches-board-result.png)

</div>

板の見た目やほかの設定は、LuraSwitch2 のマニュアルの [SwitchBoard](https://lurathunder.github.io/lura-switch-docs/docs/utilities/switch-board) を参照してください。コンソールのすべての操作を持ち運ぶ場合は、コンソールのモデルを [「手持ち」か「置き台」](console.md#モデル) にします。

## UI の Button で使う

ワールドの UI の Button からもイベント名を送れます。Button を VRChat で押せるようにする Canvas の準備は、VRChat の説明（[VRC Ui Shape](https://creators.vrchat.com/worlds/components/vrc_uishape/)）を参照してください。

<div className="paren-list">

1. Hierarchy で Button を選択し、Inspector の On Click ()（日本語の表示では「クリック時 ()」）の右下にある ＋ を押します。
2. 増えた行の左下の欄へ、Hierarchy の `AudioriumSetup` の中の `SwitchEvents` をドラッグします。

   ![左は Hierarchy で、Canvas の中の Button が選択され、AudioriumSetup の中の SwitchEvents を赤枠で示している。右は Button の Inspector の On Click () で、増えた行の左下の欄を赤枠で示し、SwitchEvents から矢印でつないでいる](/img/setup/switches-button-drag.png)

3. 増えた行の右上の一覧（No Function と表示されている所）で、UdonBehaviour › SendCustomEvent (string) を選択します。

   :::warning 選択する関数の注意

   この一覧には、AudioriumSwitchEvents の下にも SendCustomEvent (string) や `_FxBypassToggle ()` などが並びます。これらは VRChat では動きません。必ず UdonBehaviour の下の SendCustomEvent (string) を選択してください。

   :::

4. 同じ行の右下の欄に、[切り替えられる操作](#切り替えられる操作) の表のイベント名を入力します（例：`_FxBypassToggle`）。大文字と小文字、先頭の `_` も表のとおりに入力します。

   ![Button の Inspector の On Click ()。左下の SwitchEvents、右上の UdonBehaviour.SendCustomEvent (string)、右下の _FxBypassToggle の欄を赤枠で示している](/img/setup/switches-button.png)

</div>

## 自作の UdonSharp から送る

`SwitchEvents` の UdonBehaviour に、`SendCustomEvent` でイベント名を送ります（`SendCustomNetworkEvent` では送れません）。

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

このスクリプトを追加した GameObject の Inspector で、Switch Events の欄へ、Hierarchy の `AudioriumSetup` の中の `SwitchEvents` をドラッグします。

## 動作を確認する

Build & Test で VRChat に入り、スイッチを押してコンソールの表示が変わることを確認します。

| 押したスイッチ | コンソールで変わる所 |
| --- | --- |
| `_FxBypassOn`・`_FxBypassOff`・`_FxBypassToggle` | Effects タブの FX Bypass |
| `_ReverbRoom`・`_ReverbHall`・`_ReverbCathedral`・`_ReverbOff` | Sound Mode タブの CURRENT STATE と REVERB |
| `_Preset1`・`_Preset2`・`_Preset3`・`_Preset4`・`_Preset5` | Sound Mode タブの CURRENT STATE と PRESETS |

変わらないときは、次を確認します。

- イベント名：表と同じか（大文字と小文字、先頭の `_` も）
- LuraSwitch2 のスイッチ：Mode が External で、External Script に `SwitchEvents` が入っているか
- Button：左下の欄に `SwitchEvents` が入り、UdonBehaviour の下の SendCustomEvent (string) を選択しているか
- FX Bypass：コンソールに Effects タブがあるか
- Reverb とプリセット：押したユーザーに操作権限があるか
