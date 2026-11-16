---
title: 動画プレイヤー
sidebar_position: 2
description: AudioriumSetup の Inspector の「動画プレイヤー」の節。動画プレイヤーの配置、接続する動画プレイヤーとスクリーン、差し替え
---

# 動画プレイヤー

`AudioriumSetup` の Inspector の「動画プレイヤー」の節で、接続する動画プレイヤーと、スピーカーの配置の基準にするスクリーンを設定します。対応する動画プレイヤーと動作確認済みのバージョンは [動作環境](../getting-started/requirements.md#外部依存パッケージ) を参照してください。

![動画プレイヤーの節](/img/setup/player.png)

| 項目 | 内容 |
| --- | --- |
| 動画プレイヤー | 接続する動画プレイヤー。Hierarchy から動画プレイヤーを、この欄へドラッグして接続します。接続するまで「スクリーン」の欄は表示されません |
| スクリーン | スピーカーの配置の基準にする画面。接続したときに動画プレイヤーから自動で選択されます |

## 動画プレイヤーを配置する

:::warning 動画プレイヤーの配置順の注意

動画プレイヤーが無いと、Audiorium は動作しません。

動画プレイヤーは、**Audiorium に接続する前に**配置し、位置と向きを決めておきます。スピーカーとコンソールは、接続したときの動画プレイヤーのスクリーンを基準に配置されます。

:::

各動画プレイヤーを VCC でプロジェクトに追加してから、Hierarchy の右クリックメニュー（またはメニューの **GameObject**）で配置します。

| 動画プレイヤー | メニュー |
| --- | --- |
| YamaPlayer | **YamaPlayer › Main (With screen and UI)** |
| VizVid | **VizVid › Video Player (On-Screen Controls)** |

続けて [Audiorium を配置し、動画プレイヤーに接続します](../getting-started/quick-start.md#audiorium-を配置する)。

## 別の動画プレイヤーに差し替える

Hierarchy から別の動画プレイヤーを、`AudioriumSetup` の Inspector の「動画プレイヤー」の欄へドラッグします。YamaPlayer と VizVid の間でも差し替えられます。スピーカー・コンソール・視聴位置は今の位置のままです。離れた場所の動画プレイヤーに差し替えた場合は、`AudioriumSetup` を移動します。差し替え後に [外部設定](./external.md) を確認します。

次の動画プレイヤーには差し替えられません。

- 別の Scene にある動画プレイヤー
- 音源を持たない、または対応していない動画プレイヤー

## スクリーンを変更する

動画プレイヤーにスクリーンが複数ある場合などは、Hierarchy からスクリーンの GameObject（Mesh Renderer）を、`AudioriumSetup` の Inspector の「スクリーン」の欄へドラッグします。

## 動画プレイヤーを移動した場合

スピーカー・コンソール・視聴位置もまとめて移動するには、`AudioriumSetup` を同じだけ移動します。Stereo Mix・Subwoofer・Echo のビルド時と Play モードでの自動調整は、[スピーカー](./speakers.md#動画プレイヤーを移動した場合) を参照してください。

## 動画プレイヤーが複数あるワールド

- Audiorium は Scene に 1 つまで配置できます。接続できる動画プレイヤーは 1 台で、接続していない動画プレイヤーの音は、そのまま再生されます。
- `AudioriumSetup` がある Scene で **Add Audiorium** を実行すると、「既に AudioriumSetup がシーン上に存在します。」と表示され、何も追加されません。接続する動画プレイヤーを変えるときは、[別の動画プレイヤーに差し替えます](#別の動画プレイヤーに差し替える)。
