---
title: Studio の画面と「反映」
sidebar_position: 1
description: Audiorium Studio のタブの構成と、変更を Scene に適用する「反映」の仕組み
---

# Studio の画面と「反映」

Audiorium Studio は、Audiorium のセットアップに使うエディター拡張です。メニューの **Tools › Audiorium › Studio** から開きます。Hierarchy で `AudioriumSetup` を選択し、Inspector の「Studio を開く」を押しても開けます。

## タブの構成

左から順に、配置する物ごとのタブが並んでいます。

| タブ | 内容 |
| --- | --- |
| [Speakers](./speakers.md) | 動画プレイヤー、スピーカーのレイアウト、Room と Sub、スピーカー一覧 |
| [Console](./console.md) | コンソールの設置モデルと仕上げ、テーマ、最初に開くタブ、操作権限、UI 操作音 |
| [Sound Mode](./sound-mode.md) | コンソールの Sound Mode タブに表示する音のプリセット |
| [Effects](./effects.md) | コンソールの Effects タブの表示と、AudioLink・LTCGI のシーン連携 |
| [Lights](./lights.md) | 照明のセットの配置と、入場時の光過敏の警告（照明システムが必要です） |
| [Check](./check.md) | ビルドの前に解決が必要な項目 |

Lights タブは、照明システム（拡張パッケージ）をインポートすると使用できます。インポートしていない場合は「別売」と表示されます。

## 「反映」

Studio で変更した内容は、すぐには Scene に適用されません。右上に「未反映の変更」の件数が表示され、「反映」を押すと Scene に適用されます。変更のあるタブには、タブの上に件数が表示されます。

![レイアウトを変更した状態。右上に「未反映の変更」の件数と「反映」が表示される](/img/quick-start/layout-drafted.png)

- Sound Mode の値、設置モデルと仕上げ、シーン連携は、変更するとすぐに Scene に適用されます。
- Play、ビルド、Scene の保存のときにも反映されます。
- スピーカーを削除する変更は、「反映」を押したときにのみ反映されます。
- Play 中は変更できません。

変更を取り消すときは、Unity の Undo（Ctrl + Z）を使います。

## 表示の言語

右上の言語のメニューで、English、日本語、简体中文、한국어 を切り替えます。

## チュートリアル

右上の「チュートリアル」を押すと、レイアウトの選択から Check タブまでの操作を順に案内します。初めて動画プレイヤーに接続したときは、自動で始まります。
