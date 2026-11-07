---
sidebar_label: ワールドから削除する
title: 取り外し
sidebar_position: 2
description: Audiorium をワールドから取り外す手順と、一時的に使わない状態にする方法
---

# 取り外し

## Scene から取り外す

Hierarchy で `AudioriumSetup` の GameObject を削除します。コンソール、スピーカー、照明のセット、入場時の警告の看板など、Audiorium が配置した物も一緒に削除されます。Undo で元に戻せます。

![Hierarchy の AudioriumSetup](/img/help/hierarchy.png)

- Setup の外にご自身で配置した物は残ります。
- Setup の子に配置した物は、Setup と一緒に削除されます。

Audiorium は、保存した Scene の動画プレイヤーの音源の設定を書き換えません。削除した後は、元の設定のまま鳴ります。

## プロジェクトから削除する

Scene から取り外した後、Project ウィンドウで `Assets/Audiorium/` フォルダーを削除します。

## 削除せずに使わない状態にする

`AudioriumSetup` の GameObject を無効にするか、EditorOnly のタグを付けます。ビルドしたワールドに Audiorium は含まれません。
