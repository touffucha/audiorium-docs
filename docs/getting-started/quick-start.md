---
title: クイックスタート
sidebar_position: 4
description: Scene に Audiorium を置いてから、VRChat で最初の音を鳴らすまでの手順
hide_table_of_contents: true
---

# クイックスタート

[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

## 動画プレイヤーを置く

YamaPlayer か VizVid を Scene に置き、位置と向きを決めます（[動画プレイヤー](../setup/video-player.md#動画プレイヤーを置く)）。スピーカーとコンソールは、この画面を基準に置かれます。

![Scene に YamaPlayer を置いて選択した状態。Hierarchy に YamaPlayer、Scene ビューに動画プレイヤーの画面が表示されている。Audiorium を置く前](/img/quick-start/player-placed.png "full")

## Audiorium を置く

<div className="paren-list">

1. Hierarchy で動画プレイヤーを選択します。

   ![Hierarchy で YamaPlayer を選択した状態](/img/quick-start/hierarchy-player.png)

2. メニューの **Tools › Audiorium › Add Audiorium** を押します。Hierarchy の右クリックのメニューの **Audiorium** でも同じです。

</div>

`AudioriumSetup` が Hierarchy に追加され、スピーカーとコンソールが置かれます。TMP Essentials が無いプロジェクトでは、このときに自動で導入されます。

![Add Audiorium の直後。Scene にスピーカーとコンソールが置かれ、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

![Add Audiorium の直後の Hierarchy](/img/setup/hierarchy.png)

最初は、Front・Surround・Top Middle・Stereo Mix・Subwoofer の 5 種類、8 つの出力が置かれます。使わないスピーカーは [スピーカー](../setup/speakers.md) で外します。

:::info TMP Importer が表示された場合

何も押さずに閉じます。「Import TMP Essentials」を押した後にコンソールの文字が四角のまま表示される場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## Inspector の警告を確認する

`AudioriumSetup` の Inspector の上部（Language の下）に、ビルドの前に直す項目が黄色の警告で表示されます。警告が無ければ、そのままビルドできます。

警告にボタンがある場合は、ボタンを押すと直ります。ほかの警告は [トラブルシューティング](../help/troubleshooting.md) を参照してください。

## スピーカーとコンソールの位置を調整する

Scene ビューで移動します。選択の方法は [スピーカー](../setup/speakers.md) と [Audiorium コンソール](../setup/console.md) で説明します。

![Scene ビューのスピーカーと視聴位置。音が届く範囲が表示されている](/img/scene/speakers.png)

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できません。音は、**VRChat SDK › Show Control Panel** の「Builder」タブの Build & Test で確認します。

VRChat で動画を再生し、スピーカーから音が鳴ることを確認します。

## コンソールを操作する

ワールド内のコンソールで Sound Mode のプリセットを切り替えると、音の響きが変わります。

![コンソールの Sound Mode タブ](/img/console/sound.webp)

各タブの操作は [コンソールの操作](../console/operation.md) を参照してください。
