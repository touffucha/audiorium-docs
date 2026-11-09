---
title: クイックスタート
sidebar_position: 4
description: Scene に Audiorium を置いてから、VRChat で最初の音を鳴らすまでの手順
hide_table_of_contents: true
---

# クイックスタート

Scene に Audiorium を置いてから、VRChat で最初の音を鳴らすまでの手順です。[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

## 動画プレイヤーを置く

動画プレイヤー（YamaPlayer か VizVid）を Scene に置き、Scene ビューで位置と向きを決めます。置き方は [動画プレイヤー](../setup/video-player.md#動画プレイヤーを置く) で説明します。スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に置かれます。先に動画プレイヤーの位置を決めておくと、後の調整が少なく済みます。

## Audiorium を置く

1. Hierarchy で動画プレイヤーを選択します。

   ![Hierarchy で YamaPlayer を選択した状態](/img/quick-start/hierarchy-player.png)

2. メニューの **Tools › Audiorium › Add Audiorium** を押します。Hierarchy の右クリックのメニューの **Audiorium** でも同じです。

`AudioriumSetup` が Hierarchy に追加され、スピーカーとコンソールが置かれます。Inspector には、その設定が表示されます。TMP Essentials が無いプロジェクトでは、このときに自動で導入されます。

![Add Audiorium の直後。Scene にスピーカーとコンソールが置かれ、Inspector に AudioriumSetup の設定が表示される](/img/quick-start/editor-after-add.png)

最初は、Front・Surround・Top Middle・Stereo Mix・Subwoofer の 5 種類、8 つの出力が置かれます。使わないスピーカーは [スピーカー](../setup/speakers.md) で外します。

:::info TMP Importer が表示された場合

新しく作ったプロジェクトでは、インポートの後に「TMP Importer」のウィンドウが表示されます。何も押さずに閉じます。「Import TMP Essentials」を押した後にコンソールの文字が四角のまま表示される場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## Inspector の警告を確認する

`AudioriumSetup` の Inspector の一番上に、ビルドの前に直す項目が黄色の警告で表示されます。警告が無ければ、そのままビルドできます。

警告にボタンがある場合は、ボタンを押すと直ります。詳しくは [トラブルシューティング](../help/troubleshooting.md) を参照してください。

## スピーカーとコンソールの位置を調整する

スピーカーとコンソールは、Scene ビューで移動します。

- スピーカーは、Inspector の「スピーカー」の一覧の欄を押すと Hierarchy で選択されます（[スピーカー](../setup/speakers.md)）。
- コンソールは、「Audiorium コンソール」の「コンソールを選択」を押すと、台ごと選択されます（[Audiorium コンソール](../setup/console.md)）。

Inspector での変更は、すぐに Scene に反映されます。元に戻すときは Ctrl+Z を押します。

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できないため、音はビルドして VRChat で確認します。

1. メニューの **VRChat SDK › Show Control Panel** を開きます。
2. VRChat のアカウントでログインします。
3. 「Builder」タブで Build & Test Your World を選択し、Build & Test を押します。

ワールドがビルドされて VRChat が開きます。動画プレイヤーで動画を再生し、スピーカーから音が鳴ることを確認します。

## コンソールを操作する

ワールド内のコンソールで Sound Mode のプリセットを切り替えると、音の響きが変わります。

![コンソールの Sound Mode タブ](/img/console/sound.webp)

これで最初の音が鳴りました。コンソールの各タブの操作は [コンソールの操作](../console/operation.md) を、Inspector の各項目は [セットアップ](../setup/add-audiorium.md) の各ページを参照してください。
