---
title: クイックスタート
sidebar_position: 4
description: Audiorium Studio を開いてから、VRChat で最初の音を鳴らすまでの手順
hide_table_of_contents: true
---

# クイックスタート

Audiorium Studio を開いてから、VRChat で最初の音を鳴らすまでの手順です。[インストール](./install.md) を済ませたプロジェクトで、ワールドの Scene を開いた状態から始めます。

:::warning TMP Importer が表示された場合

新しく作ったプロジェクトでは、Audiorium や動画プレイヤーをインポートした後に「TMP Importer」のウィンドウが表示されます。このウィンドウは、TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

何も押さずに閉じます。コンソールの文字に必要な TMP Essentials は、手順 3 でコンソールを配置するときに Studio が自動で導入します。「Import TMP Essentials」を押した後にコンソールの文字が四角のまま表示される場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## Studio を開く

メニューの **Tools › Audiorium › Studio** を開きます。

Scene に動画プレイヤーが無い場合は、次の画面が表示されます。導入済みの動画プレイヤーのカードには「Scene に配置」、未導入の動画プレイヤーのカードには「入手先を開く」が表示されます。

![動画プレイヤーが Scene に無い状態の Studio。導入済みの YamaPlayer のカードに「Scene に配置」と表示される](/img/quick-start/start-empty.png)

## 動画プレイヤーを配置する

Scene に動画プレイヤーがある場合は、手順 3 に進みます。

手順 1 の画面で、導入済みの動画プレイヤーのカード（赤枠）を押すと、動画プレイヤーが Scene に配置されます。

配置した動画プレイヤーは、Scene ビューで位置と向きを調整します。スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に配置されます。先に動画プレイヤーの位置を決めておくと、後の調整が少なく済みます。

## 動画プレイヤーに接続する

「接続する動画プレイヤーを選択」に、Scene にある動画プレイヤーが表示されます。接続する動画プレイヤーのカードを押します。

![接続する動画プレイヤーの選択。YamaPlayer のカードを押す](/img/quick-start/start-player.png)

Studio が動画プレイヤーに接続し、スピーカーとコンソールを配置します。Hierarchy には `AudioriumSetup` の GameObject が追加され、配置した物はすべてこの中に入ります。TMP Essentials が無いプロジェクトでは、このときに Studio が TMP Essentials を自動で導入します。

![接続した直後の Speakers タブ。レイアウトは Stereo](/img/quick-start/connected.png)

:::info チュートリアル

初めて接続したときは、Studio のチュートリアルが始まります。レイアウトの選択と反映、Check タブの確認を順に案内します。チュートリアルを使わない場合は「スキップ」を押します。チュートリアルは、Studio の右上の「チュートリアル」からいつでも開けます。

![チュートリアルの最初の案内。レイアウトの選択を指している](/img/quick-start/tutorial.png)

:::

## レイアウトを選択して反映する

「レイアウト」から、スピーカーの構成を選択します。

| レイアウト | 出力数 | 構成 |
| --- | --- | --- |
| Stereo | 4 | 前方の左右（FL・FR）、Room、Sub |
| Surround | 6 | Stereo に、後方の左右（SL・SR）を追加 |
| Surround + Top | 8 | Surround に、上方の左右（TML・TMR）を追加 |

Room は残響を、Sub は低音を鳴らす出力で、動画プレイヤーの位置に配置されます。

レイアウトを選択すると、右上に「未反映の変更」の件数が表示されます。「反映」を押すと、スピーカーが Scene に配置され、視聴位置で各スピーカーの音量が揃えられます。

![Surround を選択した状態。右上の「反映」を押す](/img/quick-start/layout-drafted.png)

:::info 「反映」について

Studio で変更した内容は、「反映」を押すまで Scene に適用されません。Play、ビルド、Scene の保存のときにも反映されます。スピーカーを削除する変更は、「反映」を押したときにのみ反映されます。

:::

## スピーカーの位置を調整する

![レイアウトを反映した状態。スピーカー一覧に Front・Surround・Room・Sub が表示される](/img/quick-start/layout-applied.png)

スピーカーは Scene ビューで移動します。「スピーカー一覧」のスピーカーを押すと Hierarchy でそのスピーカーが選択され、ダブルクリックすると Scene ビューにそのスピーカーが表示されます。

視聴位置は、ユーザーが動画を視聴する位置です。Hierarchy の `AudioriumSetup` の中にある `ListeningPosition` の GameObject を、Scene ビューで客席の中央に移動します。

![Hierarchy の ListeningPosition](/img/quick-start/listening-position.png)

## Check タブで確認する

「Check」タブを開きます。ビルドの前に解決が必要な項目がある場合は、ここに項目と直し方が表示されます。項目が無い場合は「問題はありません。」が表示されます。

![Check タブ。解決が必要な項目が無い状態](/img/quick-start/check.png)

解決が必要な項目がある場合は、[トラブルシューティング](../help/troubleshooting.md) を参照してください。

## ビルドして VRChat で確認する

動画の外部 URL は Unity の Play モードでは再生できないため、音はビルドして VRChat で確認します。

1. メニューの **VRChat SDK › Show Control Panel** を開きます。
2. VRChat のアカウントでログインします。
3. 「Builder」タブで Build & Test Your World を選択し、Build & Test を押します。

ワールドがビルドされて VRChat が開きます。動画プレイヤーで動画を再生し、スピーカーから音が鳴ることを確認します。

## コンソールを操作する

ワールド内のコンソールで、Sound Mode のプリセットを切り替えると、音の響きが変わります。

![コンソールの Sound Mode タブ](/img/home/console-sound.webp)

これで最初の音が鳴りました。コンソールの各タブの操作は [ユーザーの操作](../console/operation.md) を参照してください。コンソールの設置モデル、テーマ、操作権限は、Studio の [Console](../studio/console.md) タブで変更できます。

![Studio の Console タブ。設置モデル、テーマ、最初に開くタブ、操作権限を設定する](/img/quick-start/console.png)
