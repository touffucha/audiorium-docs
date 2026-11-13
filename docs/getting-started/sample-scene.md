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

サンプルシーンでは、保存済みの設定がないユーザー向けに視界エフェクトがオンに設定されています（[視界エフェクトのデフォルト](../setup/visual-effects.md)）。

## 開く

サンプルシーンを開くには、[外部依存パッケージ](./requirements.md#外部依存パッケージ) のうち AudioLink・LTCGI・VRC Light Volumes の 3 つが必要です。無い場合は、シーンに Missing が表示されます。動画プレイヤーは、開いた後に配置します。

先に 3 つをプロジェクトに追加し、[インストール](./install.md) の順番で Audiorium をインポートしてから、Project ウィンドウでシーンのファイルを開きます。TMP Importer のウィンドウが表示された場合は、「Import TMP Essentials」を押します。

{/* 画像を戻す場所：![Project ウィンドウのサンプルシーン](/img/sample/scenes.png)。配布物ができてから撮る */}

## 動画プレイヤーを配置する

サンプルシーンには動画プレイヤーが入っていません。展示室の正面の額に合わせて配置し、Audiorium に接続します。

1. 動画プレイヤーの Prefab を Hierarchy へドラッグし、Transform を次の値にします。Rotation はすべて 0 です。

   | 動画プレイヤー | Prefab | Position | Scale |
   | --- | --- | --- | --- |
   | YamaPlayer | `YamaPlayer.prefab` | X 0、Y 3.135、Z 7.28 | 2.88 |
   | VizVid | `VVMW (On-Screen Controls).prefab` | X 0、Y -0.105、Z 7.28 | 2.16 |

2. Hierarchy で `AudioriumSetup` を選択し、Inspector の「動画プレイヤー」の欄へ、Hierarchy から動画プレイヤーをドラッグします。Scene に保存されているスピーカーとコンソールの配置はそのまま使われます。接続すると、Inspector の「動画プレイヤーが指定されていません」という警告が消えます。

動画の音で視界エフェクトや照明を動かすには、`AudioriumSetup` の「外部設定」で「AudioLink」をオンにします。動画の光を壁や床に映す場合は、動画プレイヤーを [LTCGI に接続](../setup/external.md#ltcgi) します。

## 含まれていない物

公開ワールドにある次の物は、サンプルシーンには含まれていません。

- 入口の通路からアトリウムまでの空間
- QvPen
- 入退室ボード
- エリア切り替えの表示
- 各種効果音（コンソールの効果音を除く）
- 設計図の字幕と、部屋の残響を再現するギミック

## 改変して使う場合

改変したシーンは、**File › Save As** で `Assets/Audiorium` の外へ別の名前で保存します。新しいバージョンの Audiorium をインポートすると、サンプルシーンは上書きされます。

## 利用の条件

サンプルシーンの利用の条件は、同梱の利用規約（`License/LICENSE.txt`）の第 6 条をご確認ください。
