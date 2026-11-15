---
title: クイックスタート
sidebar_position: 4
description: Scene に Audiorium を配置してから、VRChat で動作を確認するまでの手順
hide_table_of_contents: true
---

# クイックスタート

[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

## 動画プレイヤーを配置する

YamaPlayer か VizVid を Scene に配置し、位置と向きを決めます。Audiorium によって生成される AudioSource（以降、スピーカー）とコンソールは、動画プレイヤーの位置を基準に配置されます。

![Scene に YamaPlayer を配置して選択した状態。Hierarchy に YamaPlayer、Scene ビューに動画プレイヤーの画面が表示されている。Audiorium を配置する前](/img/quick-start/player-placed.png "full")

## Audiorium を配置する

<div className="paren-list">

1. メニューの **Tools › Audiorium › Add Audiorium** を選択します。Hierarchy の右クリックメニューの **Audiorium › Add Audiorium** でも同じです。

   `AudioriumSetup` が Hierarchy に追加され、選択された状態になります。この時点では、スピーカーとコンソールはまだ配置されません。

2. Hierarchy の動画プレイヤーを、Inspector の「動画プレイヤー」の欄へドラッグします。

   ![Add Audiorium の直後の画面。Hierarchy で AudioriumSetup が選択され、Inspector の「動画プレイヤー」の欄は空。Hierarchy の YamaPlayer から Inspector の欄へ、ドラッグする向きを矢印で示している](/img/quick-start/player-drag.png)

</div>

動画プレイヤーに接続され、スピーカーとコンソールが配置されます。

![動画プレイヤーに接続した直後。Scene にスピーカーとコンソールが配置され、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

![動画プレイヤーに接続した直後の Hierarchy](/img/setup/hierarchy.png)

| 配置されるオブジェクト | 説明 |
| --- | --- |
| `ListeningPosition` | 視聴位置。スピーカーの音が届く範囲を決める基準の位置です |
| `Front`・`Surround`・`Top Middle`・`Stereo Mix`・`Subwoofer` | スピーカー。動画プレイヤーのスクリーンを基準に配置されます |
| `AudioriumConsole` | コンソール。台のあるモデルを選択すると、台の名前の `ConsoleMount_` の中に入ります |
| `AudioControls` など、そのほかのオブジェクト | Audiorium の動作に使うオブジェクト。移動・削除しないでください |

接続した直後は、Front・Surround・Top Middle・Stereo Mix・Subwoofer の 5 種類、8 つの出力が配置されます。使わないスピーカーは [こちらの手順](../setup/speakers.md#追加と削除) で外します。

:::tip 動画プレイヤーを選択してから Add Audiorium を選択した場合

選択していた動画プレイヤーに接続した状態で配置されます。手順 2 は要りません。

:::

:::warning TMP Importer が表示された場合

TMP Essentials が無いと、コンソールの文字が表示されません。

「Import TMP Essentials」を押します。導入後、Scene ビューの Audiorium コンソールが文字化けしている場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## Inspector の警告を確認する

`AudioriumSetup` の Inspector の上部（Language の下）に、確認が必要な項目が黄色の警告で表示されます。警告の文に対処方法が書かれています。詳しくは [トラブルシューティング](../help/troubleshooting.md) を参照してください。

## スピーカーとコンソールの位置を調整する

スピーカーとコンソールは、`AudioriumSetup` の Inspector から Hierarchy で選択し、Scene ビューで移動と回転を行います。

### スピーカー

<div className="paren-list">

1. `AudioriumSetup` の Inspector の「スピーカー」の一覧で、動かすスピーカーの右側の欄（スピーカーの名前が入った欄）をダブルクリックします。

   ![AudioriumSetup の Inspector の「スピーカー」の一覧。Front の右側の欄を赤枠で示している](/img/quick-start/speaker-list.png)

2. Hierarchy で、そのスピーカーが選択されます。

   ![ダブルクリックの後の Hierarchy。AudioriumSetup の中の Front が選択されている](/img/quick-start/speaker-selected.png)

</div>

左のチェックボックスは、スピーカーを使うかどうかの切り替えです。位置の調整には使いません（[追加と削除](../setup/speakers.md#追加と削除)）。

### コンソール

`AudioriumSetup` の Inspector の「Audiorium コンソール」の節で、「コンソールを選択」を押します。Hierarchy でコンソールが選択されます。台のあるモデルでは、台ごと選択されます。

![Scene ビューのスピーカーと視聴位置。音が届く範囲が表示されている](/img/scene/speakers.png)

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できません。（SDK 3.10.6 時点）動作確認は、**VRChat SDK › Show Control Panel** の「Builder」タブの「Build & Test」、もしくは「Build & Publish」で行います。
