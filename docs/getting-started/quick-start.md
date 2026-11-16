---
title: クイックスタート
sidebar_position: 4
description: Scene に Audiorium を配置してから、VRChat で動作を確認するまでの手順
hide_table_of_contents: true
---

# クイックスタート

[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

## 動画プレイヤーを配置する

YamaPlayer か VizVid を Scene に配置し、位置と向きを決めます。置き方は [動画プレイヤーを配置する](../setup/video-player.md#動画プレイヤーを配置する) を参照してください。Audiorium が配置する AudioSource（以降、スピーカー）とコンソールは、動画プレイヤーのスクリーンを基準に配置されます。

![Scene に YamaPlayer を配置して選択した状態。Hierarchy に YamaPlayer、Scene ビューに動画プレイヤーの画面が表示されている。Audiorium を配置する前](/img/quick-start/player-placed.png "full")

## Audiorium を配置する

<div className="paren-list">

1. メニューの **Tools › Audiorium › Add Audiorium** を実行します。Hierarchy の右クリックメニューの **Audiorium › Add Audiorium** からも実行できます。

   - **何も選択していない、または動画プレイヤー以外を選択している場合**：`AudioriumSetup` が Hierarchy に追加され、選択された状態になります。この時点では、スピーカーとコンソールはまだ配置されません。手順 2 へ進みます。
   - **動画プレイヤー（その中のオブジェクトを含む）を選択している場合**（Hierarchy で動画プレイヤーを右クリックした場合も）：その動画プレイヤーに接続され、スピーカーとコンソールが配置されます。手順 2 は要りません。

2. Hierarchy から、接続する動画プレイヤー（複数ある場合は、Audiorium で鳴らす 1 台）を、`AudioriumSetup` の Inspector の「動画プレイヤー」の欄へ、押したままドラッグします。クリックして離すと、Inspector の表示が動画プレイヤーに切り替わります。その場合は、Hierarchy で `AudioriumSetup` を選択し直します。

   ![Add Audiorium の直後の画面。Hierarchy で AudioriumSetup が選択され、Inspector の「動画プレイヤー」の欄は空。Hierarchy の YamaPlayer から Inspector の欄へ、ドラッグする向きを矢印で示している](/img/quick-start/player-drag.png)

</div>

:::warning TMP Importer の窓が表示された場合

TMP Essentials が無いと、コンソールの文字が表示されません。

「Import TMP Essentials」を押します。導入後、Scene ビューの Audiorium コンソールが文字化けしている場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

動画プレイヤーに接続されると、Scene ビューのスクリーンの手前にコンソールが表示されます。スピーカーとコンソールは、Hierarchy の `AudioriumSetup` の中に入ります（2 枚目の画像）。

![動画プレイヤーに接続した直後。Scene にスピーカーとコンソールが配置され、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

![動画プレイヤーに接続した直後の Hierarchy。AudioriumSetup を開いた状態](/img/setup/hierarchy.png)

| 配置されるオブジェクト | 説明 |
| --- | --- |
| `ListeningPosition` | 視聴位置。スピーカーの音が届く範囲を決める基準の位置です |
| `Front`・`Surround`・`Top Middle`・`Stereo Mix`・`Subwoofer` | スピーカー。動画プレイヤーのスクリーンを基準に配置されます |
| `AudioriumConsole` | コンソール。Inspector の「Audiorium コンソール」の節で台のあるモデルを選ぶと、`ConsoleMount_`（台の名前）の中へ移ります |
| `AudioControls` など、そのほかのオブジェクト | Audiorium の動作に使うオブジェクト。移動・削除しないでください。灰色（非アクティブ）の物も、そのままにします |

スピーカーの出力は合わせて 8 つまでで、接続した直後は 8 つすべてを使います（Front・Surround・Top Middle は左右で 2 つずつ）。スピーカーを足す場合は、先に使わないスピーカーを [こちらの手順](../setup/speakers.md#追加と削除) で外します。

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
