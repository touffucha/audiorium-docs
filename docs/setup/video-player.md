---
title: 動画プレイヤー
sidebar_position: 2
description: AudioriumSetup の Inspector の「動画プレイヤー」の節。動画プレイヤーの置き方、接続する動画プレイヤーとスクリーン、差し替え
---

# 動画プレイヤー

接続している動画プレイヤーと、スピーカーの配置の基準にするスクリーンを設定します。対応する動画プレイヤーは YamaPlayer と VizVid です（動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md)）。

![動画プレイヤーの節](/img/setup/player.png)

| 項目 | 内容 |
| --- | --- |
| 動画プレイヤー | 接続している動画プレイヤー |
| スクリーン | スピーカーの配置の基準にする画面。接続したときに動画プレイヤーから自動で選ばれます |

## 動画プレイヤーを置く

動画プレイヤーは、**Audiorium を置く前に**置き、位置と向きを決めておきます。スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に置かれます。

各動画プレイヤーを VCC でプロジェクトに追加してから、Hierarchy の右クリックのメニュー（またはメニューの **GameObject**）で置きます。

| 動画プレイヤー | メニュー |
| --- | --- |
| YamaPlayer | **YamaPlayer › Main (With screen and UI)** |
| VizVid | **VizVid › Video Player (On-Screen Controls)** |

続けて [Audiorium を置きます](../getting-started/quick-start.md#audiorium-を置く)。

## 別の動画プレイヤーに差し替える

Hierarchy から別の動画プレイヤーを「動画プレイヤー」の欄へドラッグします。YamaPlayer と VizVid の間でも差し替えられます。スピーカー・コンソール・視聴位置の配置はそのまま残り、音の入力だけが切り替わります。

次の動画プレイヤーには差し替えられません。

- 別の Scene にある動画プレイヤー
- 音源を持たない、または対応していない動画プレイヤー
- ほかの `AudioriumSetup` が接続している動画プレイヤー

## スクリーンを変更する

動画プレイヤーにスクリーンが複数ある場合などは、Hierarchy からスクリーンの GameObject（Mesh Renderer）を「スクリーン」の欄へドラッグします。

## 動画プレイヤーを移動した場合

スピーカーなどは付いて動かないので、`AudioriumSetup` も同じだけ移動します（[スピーカー](./speakers.md#動画プレイヤーを移動した場合)）。

## 動画プレイヤーの音源の設定

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。Audiorium を削除すると、動画プレイヤーは元の設定のまま鳴ります（[ワールドから削除する](../help/uninstall.md)）。

## 動画プレイヤーが複数あるワールド

- 1 つの `AudioriumSetup` が接続できる動画プレイヤーは 1 台です。接続していない動画プレイヤーの音は、そのまま鳴ります。
- ほかの `AudioriumSetup` が接続している動画プレイヤーには接続できません（「ほかの Audiorium がこの動画プレイヤーに接続しています。」と表示されます）。
- すべての動画プレイヤーが接続済みのときに **Add Audiorium** を押すと、新しい `AudioriumSetup` は追加されず、接続済みの `AudioriumSetup` が選択されます。
