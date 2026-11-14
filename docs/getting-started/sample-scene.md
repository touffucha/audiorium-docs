---
title: サンプルシーン
sidebar_position: 5
description: 付属のサンプルシーン（照明システムなし・照明システムあり）の中身と開き方、含まれていない物
---

# サンプルシーン

公開ワールドの展示室を縮小したシーンです。スピーカーの配置と、Inspector の設定の参考として使えます。

| サンプルシーン | シーンのファイル | 入っているファイル |
| --- | --- | --- |
| 照明システムなし | `AudioriumNoLighting.unity` | Audiorium の unitypackage（本体） |
| 照明システムあり | `Audiorium.unity` | AudioriumLightingSystem の unitypackage（照明システム） |

どちらも `Assets/Audiorium/Showroom/Scenes/` にあります。

サンプルシーンでは、Effects タブを一度も操作したことのないユーザーは、視界エフェクトがオンの状態で始まります（[視界エフェクトのデフォルト](../setup/visual-effects.md)）。

## 開く

サンプルシーンを開くには、[外部依存パッケージ](./requirements.md#外部依存パッケージ) のうち AudioLink・LTCGI・VRC Light Volumes の 3 つが必要です。無い場合、シーン上の一部 Prefab が Missing になるなど、不具合が生じます。動画プレイヤーは、開いた後に配置します。

{/* 画像を戻す場所：![Project ウィンドウのサンプルシーン](/img/sample/scenes.png)。配布物ができてから撮る */}

## 動画プレイヤーを配置する

サンプルシーンには動画プレイヤーが含まれていません。動画プレイヤーを配置して Audiorium に接続すると、初めて動作します。

1. 動画プレイヤーの Prefab を Hierarchy へドラッグし、Transform を次の値にします。Rotation はすべて 0 です。

   | 動画プレイヤー | Prefab | Position | Scale |
   | --- | --- | --- | --- |
   | YamaPlayer | `YamaPlayer.prefab` | X 0、Y 3.135、Z 7.28 | 2.88 |
   | VizVid | `VVMW (On-Screen Controls).prefab` | X 0、Y -0.105、Z 7.28 | 2.16 |

2. Hierarchy で `AudioriumSetup` を選択し、Inspector の「動画プレイヤー」の欄へ、Hierarchy から動画プレイヤーをドラッグします。指定すると、Inspector に「外部設定」や「スピーカー」などの節が表示されます。スピーカーとコンソールの配置は変更されません。

動画の音で視界エフェクトや照明を動かすには、`AudioriumSetup` の「外部設定」で「AudioLink」をオンにします。動画の光を壁や床に映す場合は、動画プレイヤーを [LTCGI に接続](../setup/external.md#ltcgi) します。

## 含まれていない物

公開ワールドにある次の物は、サンプルシーンには含まれていません。

- 入口の通路からアトリウムまでの空間
- QvPen
- 入退室ボード
- エリア切り替えの表示
- 各種効果音（コンソールの効果音を除く）
- 設計図の字幕と、部屋の残響を再現するギミック
