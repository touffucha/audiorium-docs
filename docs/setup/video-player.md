---
title: 動画プレイヤー
sidebar_position: 2
description: AudioriumSetup の Inspector の「動画プレイヤー」の節。動画プレイヤーの配置、接続する動画プレイヤーとスクリーン、差し替え
---

# 動画プレイヤー

接続している動画プレイヤーと、スピーカーの配置の基準にするスクリーンを設定します。対応する動画プレイヤーは YamaPlayer と VizVid です（動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md)）。

![動画プレイヤーの節](/img/setup/player.png)

| 項目 | 内容 |
| --- | --- |
| 動画プレイヤー | 接続している動画プレイヤー |
| スクリーン | スピーカーの配置の基準にする画面。接続したときに動画プレイヤーから自動で選択されます |

## 動画プレイヤーを配置する

動画プレイヤーは、**Audiorium を配置する前に**配置し、位置と向きを決めておきます。スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に配置されます。

各動画プレイヤーを VCC でプロジェクトに追加してから、Hierarchy の右クリックメニュー（またはメニューの **GameObject**）で配置します。

| 動画プレイヤー | メニュー |
| --- | --- |
| YamaPlayer | **YamaPlayer › Main (With screen and UI)** |
| VizVid | **VizVid › Video Player (On-Screen Controls)** |

続けて [Audiorium を配置します](../getting-started/quick-start.md#audiorium-を配置する)。

## 別の動画プレイヤーに差し替える

Hierarchy から別の動画プレイヤーを「動画プレイヤー」の欄へドラッグします。YamaPlayer と VizVid の間でも差し替えられます。Scene に保存されたスピーカー・コンソール・視聴位置の配置は引き継がれます。音の入力とスクリーンは、接続先の動画プレイヤーに切り替わります。AudioLink や LTCGI を使う場合は、差し替え後に [外部設定](./external.md) を確認します。

次の動画プレイヤーには差し替えられません。

- 別の Scene にある動画プレイヤー
- 音源を持たない、または対応していない動画プレイヤー
- ほかの `AudioriumSetup` が接続している動画プレイヤー

## スクリーンを変更する

動画プレイヤーにスクリーンが複数ある場合などは、Hierarchy からスクリーンの GameObject（Mesh Renderer）を「スクリーン」の欄へドラッグします。

## 動画プレイヤーを移動した場合

スピーカー・コンソール・視聴位置もまとめて移動するには、`AudioriumSetup` を同じだけ移動します。Stereo Mix・Subwoofer・Echo のビルド時と Play モードでの自動調整は、[スピーカー](./speakers.md#動画プレイヤーを移動した場合) を参照してください。

## 動画プレイヤーの音源の設定

Audiorium は、保存した Scene の動画プレイヤーの AudioSource の設定を書き換えません。Audiorium を削除すると、動画プレイヤーは元の設定のまま再生されます（[ワールドから削除する](../help/uninstall.md)）。

## 動画プレイヤーが複数あるワールド

- 1 つの `AudioriumSetup` が接続できる動画プレイヤーは 1 台です。接続していない動画プレイヤーの音は、そのまま再生されます。
- ほかの `AudioriumSetup` が接続している動画プレイヤーには接続できません（「ほかの Audiorium がこの動画プレイヤーに接続しています。」と表示されます）。
- すべての動画プレイヤーが接続済みのときに **Add Audiorium** を選択すると、新しい `AudioriumSetup` は追加されず、接続済みの `AudioriumSetup` が選択されます。
