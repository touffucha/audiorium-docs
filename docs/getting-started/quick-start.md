---
title: クイックスタート
sidebar_position: 4
description: Scene に Audiorium を置いてから、VRChat で動作を確認するまでの手順
hide_table_of_contents: true
---

# クイックスタート

[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

## 動画プレイヤーを置く

YamaPlayer か VizVid を Scene に置き、位置と向きを決めます。スピーカーとコンソールは、この画面を基準に配置されます。

![Scene に YamaPlayer を置いて選択した状態。Hierarchy に YamaPlayer、Scene ビューに動画プレイヤーの画面が表示されている。Audiorium を置く前](/img/quick-start/player-placed.png "full")

## Audiorium を置く

<div className="paren-list">

1. Hierarchy で動画プレイヤーを選択します。

   ![Hierarchy で YamaPlayer を選択した状態](/img/quick-start/hierarchy-player.png)

2. メニューの **Tools › Audiorium › Add Audiorium** を押します。Hierarchy の右クリックのメニューの **Audiorium** でも同じです。

</div>

`AudioriumSetup` が Hierarchy に追加され、スピーカーとコンソールが配置されます。

![Add Audiorium の直後。Scene にスピーカーとコンソールが置かれ、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

![Add Audiorium の直後の Hierarchy](/img/setup/hierarchy.png)

| 配置されるオブジェクト | 説明 |
| --- | --- |
| `ListeningPosition` | 視聴位置。スピーカーの音が届く範囲を決める基準の位置です |
| `Front`・`Surround`・`Top Middle`・`Stereo Mix`・`Subwoofer` | スピーカー。動画プレイヤーのスクリーンを基準に配置されます |
| `AudioriumConsole` | コンソール。台のあるモデルを選ぶと、台の名前の `ConsoleMount_` の中に入ります |
| `AudioControls` など、そのほかのオブジェクト | Audiorium の動作に使うオブジェクト。移動・削除しないでください |

最初は、Front・Surround・Top Middle・Stereo Mix・Subwoofer の 5 種類、8 つの出力が配置されます。使わないスピーカーは [こちらの手順](../setup/speakers.md#追加と削除) で外します。

:::info 動画プレイヤーを選択せずに押した場合

- **動画プレイヤーが 1 台だけ**：その動画プレイヤーに接続します。
- **複数ある**：動画プレイヤーに接続していない `AudioriumSetup` が置かれます。Hierarchy から動画プレイヤーを Inspector の「動画プレイヤー」の欄へドラッグすると接続し、スピーカーとコンソールが配置されます。

![動画プレイヤーの欄が空の状態](/img/setup/player-empty.png)

:::

:::info TMP Importer が表示された場合

「Import TMP Essentials」を押します。導入した後にコンソールの文字が四角のまま表示される場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## Inspector の警告を確認する

`AudioriumSetup` の Inspector の上部（Language の下）に、確認が必要な項目が黄色の警告で表示されます。警告の文に直し方が書かれています。詳しくは [トラブルシューティング](../help/troubleshooting.md) を参照してください。

## スピーカーとコンソールの位置を調整する

Scene ビューで移動と回転を行います。

- **スピーカー**：Inspector の「スピーカー」の一覧の行をダブルクリックすると選択されます。
- **コンソール**：Inspector の「コンソールを選択」を押すと、コンソールが選択されます。台のあるモデルでは、台ごと選択されます。

![Scene ビューのスピーカーと視聴位置。音が届く範囲が表示されている](/img/scene/speakers.png)

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できません。動作確認は、**VRChat SDK › Show Control Panel** の「Builder」タブの「Build & Test」、もしくは「Build & Publish」で行います。
