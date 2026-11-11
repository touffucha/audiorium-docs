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

`AudioriumSetup` が Hierarchy に追加され、スピーカーとコンソールが配置されます。TMP Essentials が無いプロジェクトでは、このときに自動で導入されます。

![Add Audiorium の直後。Scene にスピーカーとコンソールが置かれ、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

![Add Audiorium の直後の Hierarchy](/img/setup/hierarchy.png)

| 置かれる物 | 説明 |
| --- | --- |
| `ListeningPosition` | 視聴位置。スピーカーの音量のバランスの基準になります |
| `Front`・`Surround`・`Top Middle`・`Stereo Mix`・`Subwoofer` | スピーカー。動画プレイヤーのスクリーンを基準に配置されます |
| `ConsoleMount_`（台の名前） | コンソールと、それを載せる台。名前の後半は、選択したモデルで変わります |
| `AudioControls` など、そのほかの物 | Audiorium の動作に使う物。移動・削除しません |

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

`AudioriumSetup` の Inspector の上部（Language の下）に、ビルドの前に直す項目が黄色の警告で表示されます。警告が無ければ、そのままビルドできます。

警告に付いているボタン（「Windows に切り替え」「TMP Essentials を導入」「原点付近へ移す」「修復」）を押すと直ります。その他の警告は [トラブルシューティング](../help/troubleshooting.md) を参照してください。

## スピーカーとコンソールの位置を調整する

Scene ビューで移動と回転を行います。

- **スピーカー**：Inspector の「スピーカー」の一覧の行をダブルクリックすると選択されます。
- **コンソール**：Inspector の「コンソールを選択」を押すと、コンソールと台が選択されます。

![Scene ビューのスピーカーと視聴位置。音が届く範囲が表示されている](/img/scene/speakers.png)

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できません。動作確認は、**VRChat SDK › Show Control Panel** の「Builder」タブの Build & Test、もしくは Build & Publish で行います。
