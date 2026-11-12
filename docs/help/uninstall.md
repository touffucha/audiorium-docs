---
sidebar_label: ワールドから削除する
title: ワールドから削除する
sidebar_position: 2
description: Audiorium をワールドから取り外す手順と、一時的に使わない状態にする方法
---

# ワールドから削除する

## Scene から取り外す

Hierarchy で `AudioriumSetup` を削除します。Ctrl+Z で元に戻せます。

![Hierarchy の AudioriumSetup](/img/setup/hierarchy.png)

- **一緒に削除されるオブジェクト**：スピーカー、コンソール、照明、入場時の警告など、`AudioriumSetup` の中にあるオブジェクト（ご自身で中に配置したオブジェクトも含みます）
- **残るオブジェクト**：`AudioriumSetup` の外にご自身で配置したオブジェクト

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。削除した後は、動画プレイヤーは元の設定のまま鳴ります。

## プロジェクトから削除する

Scene から取り外した後、Project ウィンドウで `Assets/Audiorium` フォルダーを削除します。

## 削除せずに使わない状態にする

| 方法 | ビルドしたワールド |
| --- | --- |
| `AudioriumSetup` の GameObject を無効にする | 無効のまま含まれます。Audiorium は動きません |
| `AudioriumSetup` のタグを `EditorOnly` にする | 含まれません |

どちらの方法でも、動画プレイヤーは元の設定のまま鳴ります。
