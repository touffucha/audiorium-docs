---
title: Audiorium を置く
sidebar_position: 1
description: Scene に Audiorium を置く方法、置かれる物、AudioriumSetup の Inspector の構成と上部の警告
---

# Audiorium を置く

Audiorium は、Scene の動画プレイヤー 1 台に接続して置きます。置いた後の設定は、すべて `AudioriumSetup` の Inspector で行います。

## 置く

1. Hierarchy で動画プレイヤーを選択します。
2. **Tools › Audiorium › Add Audiorium** を押します。Hierarchy の右クリックのメニューの **Audiorium** でも同じです。

動画プレイヤーを選択せずに押した場合は、次のようになります。

- **対応する動画プレイヤーが 1 台だけ**：その動画プレイヤーに接続します。
- **すべて接続済み**：新しい `AudioriumSetup` は追加されず、接続済みの `AudioriumSetup` が選択されます。
- **複数ある**：動画プレイヤーに接続していない `AudioriumSetup` が置かれます。Hierarchy から動画プレイヤーを「動画プレイヤー」の欄へドラッグすると接続し、スピーカーとコンソールが置かれます。

![動画プレイヤーの欄が空の状態](/img/setup/player-empty.png)

## 置かれる物

Audiorium が置いた物は、すべて `AudioriumSetup` の中に入ります。

![Add Audiorium の直後の Hierarchy](/img/setup/hierarchy.png)

| 置かれる物 | 説明 |
| --- | --- |
| `ListeningPosition` | 視聴位置。スピーカーの音量のバランスの基準になります |
| `Front`・`Surround`・`Top Middle`・`Stereo Mix`・`Subwoofer` | スピーカー。動画プレイヤーのスクリーンを基準に置かれます |
| `ConsoleMount_`（台の名前） | コンソールと、それを載せる台。名前の後半は、選択したモデルで変わります |
| `AudioControls` など、そのほかの物 | Audiorium の動作に使う物。移動・削除しません |

Audiorium は、動画プレイヤーの音源の設定を書き換えません。音は `AudioriumSetup` の中のスピーカーから鳴ります。

## Inspector の構成

![すべての節を閉じた Inspector](/img/setup/inspector-map.png)

| 節 | 設定する内容 |
| --- | --- |
| Language | Inspector の表示言語（English・日本語・简体中文・한국어）。この PC の Unity 全体で保存されます |
| [動画プレイヤー](./video-player.md) | 接続する動画プレイヤーと、基準にするスクリーン |
| [外部設定](./external.md) | AudioLink・LTCGI・照明を使うか |
| [スピーカー](./speakers.md) | 置くスピーカーの選択と追加 |
| [Sound Mode](./sound-mode.md) | 音の響きのプリセット |
| [Audiorium コンソール](./console.md) | コンソールの配色、台、マテリアル |
| [視界エフェクト](./visual-effects.md) | コンソールの Effects タブと、画面酔いの注意 |
| [詳細](./advanced.md) | 最初に表示するタブ、操作権限、UI 操作音、音声バッファ |

- **説明**：すべての項目にツールチップがあります。
- **元に戻す**：変更はすぐに Scene に反映されます。1 回の変更は 1 回の Ctrl+Z で戻ります。

## 上部（Language の下）の警告

ビルドの前に直す項目があると、黄色の警告が表示されます。ボタンが付いた警告は、ボタンを押すと直ります。

![動画プレイヤーが原点から遠いときの警告と「原点付近へ移す」](/img/setup/issue-far-origin.png)

| 警告 | ボタン |
| --- | --- |
| ビルド先が PC（Windows）ではありません | 「Windows に切り替え」 |
| TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません | 「TMP Essentials を導入」 |
| 動画プレイヤーが原点から約 ○ km 離れています | 「原点付近へ移す」：動画プレイヤーと Audiorium を原点付近へ移します |
| コンソールがありません | 「修復」：コンソールを置き直します。設定はそのまま残ります |

原因は [トラブルシューティング](../help/troubleshooting.md) にあります。

## 動画プレイヤーが複数あるワールド

- 1 つの `AudioriumSetup` が接続できる動画プレイヤーは 1 台です。接続していない動画プレイヤーの音は、そのまま鳴ります。
- ほかの `AudioriumSetup` が接続している動画プレイヤーには接続できません（「ほかの Audiorium がこの動画プレイヤーに接続しています。」と表示されます）。
