---
title: 動画プレイヤー
sidebar_position: 2
description: AudioriumSetup の Inspector の「動画プレイヤー」の節。接続する動画プレイヤーとスクリーン、別の動画プレイヤーへの差し替え
---

# 動画プレイヤー

接続している動画プレイヤーと、スピーカーの配置の基準にするスクリーンを設定します。

![動画プレイヤーの節](/img/setup/player.png)

| 項目 | 内容 |
| --- | --- |
| 動画プレイヤー | 接続している動画プレイヤー。欄を押すと、Hierarchy でその動画プレイヤーが選択されます |
| スクリーン | スピーカーの配置の基準にする画面。接続したときに動画プレイヤーから自動で選ばれます |

対応する動画プレイヤーは YamaPlayer と VizVid です。動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md) にあります。

## 動画プレイヤーを置く

動画プレイヤーは、Audiorium を置く前に Scene に置きます。各動画プレイヤーを VCC でプロジェクトに追加してから、Hierarchy の右クリックのメニュー（またはメニューの **GameObject**）で置きます。

| 動画プレイヤー | メニュー |
| --- | --- |
| YamaPlayer | **YamaPlayer › Main (With screen and UI)** |
| VizVid | **VizVid › Video Player (On-Screen Controls)** |

置いた後、Scene ビューで位置と向きを決めます。スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に置かれます。続けて [Audiorium を置く](./add-audiorium.md) の手順で Audiorium を置きます。

## 別の動画プレイヤーに差し替える

Hierarchy から別の動画プレイヤーを「動画プレイヤー」の欄へドラッグします。YamaPlayer から VizVid へ、VizVid から YamaPlayer へも差し替えられます。スピーカー・コンソール・視聴位置の配置はそのまま残り、音の入力だけが新しい動画プレイヤーに切り替わります。

次の動画プレイヤーには差し替えられません。

- 別の Scene にある動画プレイヤー
- 音源を持たない、または対応していない動画プレイヤー
- ほかの `AudioriumSetup` が接続している動画プレイヤー

## スクリーンを変更する

動画プレイヤーに画面が複数ある場合など、基準にする画面を変えるときは、Hierarchy から画面の GameObject（Mesh Renderer）を「スクリーン」の欄へドラッグします。

## 動画プレイヤーを移動した場合

Audiorium を置いた後に動画プレイヤーを移動すると、Scene ビューの `AudioriumSetup` の位置に「画面に合わせる」のボタンが表示されます。押すと、スピーカー・コンソール・視聴位置が、動画プレイヤーに合わせて移動します（[スピーカー](./speakers.md#動画プレイヤーを移動した場合)）。

## 動画プレイヤーの音源の設定

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。Audiorium を削除すると、動画プレイヤーは元の設定のまま鳴ります（[ワールドから削除する](../help/uninstall.md)）。
