---
title: Speakers
sidebar_position: 2
description: Studio の Speakers タブ。動画プレイヤー、レイアウト、Room と Sub、スピーカー一覧。Inspector で変更するスピーカーの追加と音声バッファ
---

# Speakers

動画プレイヤーの接続と、スピーカーのレイアウトを選択するタブです。スピーカーの位置は Scene ビューで、スピーカーの追加とスピーカーごとの設定は Inspector で変更します。

![Speakers タブ](/img/studio/speakers.png)

## 動画プレイヤー

![動画プレイヤー](/img/studio/speakers-player.png)

接続している動画プレイヤーが表示されます。押すと、Hierarchy でその動画プレイヤーを選択します。別の動画プレイヤーに接続し直すときは、Hierarchy から別の動画プレイヤーをこの欄へドラッグします。

スピーカーとコンソールは、動画プレイヤーのスクリーンを基準に配置されます。

## レイアウト

![レイアウトのカードと、Room・Sub の使用](/img/studio/speakers-layout.png)

スピーカーの構成を選択します。カードの小さな図は、スピーカーと視聴位置を上から見た配置です。選択した後に「反映」を押すと、スピーカーが配置され、視聴位置で各スピーカーの音量が揃えられます。

| レイアウト | 出力数 | 構成 |
| --- | --- | --- |
| Stereo | 4 | 前方の左右（FL・FR）、Room、Sub |
| Surround | 6 | Stereo に、後方の左右（SL・SR）を追加 |
| Surround + Top | 8 | Surround に、上方の左右（TML・TMR）を追加 |

スピーカーや視聴位置を Scene ビューで移動した後にレイアウトを選択し直すと、「配置が初期値に戻ります。」と確認のダイアログが表示されます。「変更」を押すと、スピーカーと視聴位置が初期の配置に戻ります。

| 項目 | 内容 |
| --- | --- |
| Room を使用 | 残響を鳴らす出力です。オフにすると、Reverb がほとんど効かなくなります |
| Sub を使用 | 動画の音声の低音域を鳴らす出力です |

## スピーカー一覧

![スピーカー一覧](/img/studio/speakers-units.png)

配置しているスピーカーの一覧です。スピーカーを押すと、Hierarchy でそのスピーカーを選択します。Shift を押しながら押すと選択に追加、ダブルクリックで Scene ビューに表示します。

「Scene ビューに可聴範囲を表示」をオンにすると、Scene ビューに各スピーカーの音が聞こえる範囲を表示します。

## Inspector で変更する項目

スピーカーの追加、スピーカーごとの設定、音声バッファは、Inspector で変更します。

### スピーカーを追加する

![AudioriumSetup の Inspector。「L / R ペアを追加」と「単体スピーカーを追加」](/img/studio/speakers-inspector-setup.png)

Hierarchy で `AudioriumSetup` を選択し、Inspector の「L / R ペアを追加」か「単体スピーカーを追加」を押します。スピーカーは動画プレイヤーの位置に追加されます。位置は Scene ビューで調整します。出力は、Room と Sub を含めて 8 つまで使用できます。

スピーカーの名前は、Hierarchy で GameObject の名前を変更すると変わります。

### スピーカーごとの設定

![スピーカーの Inspector。Room を選択した状態](/img/studio/speakers-inspector-speaker.png)

Hierarchy でスピーカー（`Front` など）を選択すると、Inspector に設定が表示されます。「Audiorium Setup に戻る」を押すと、`AudioriumSetup` を選択します。

| 項目 | 内容 |
| --- | --- |
| 入力 | 動画プレイヤーのどの音源をつなぐか。動画プレイヤーの音源が 1 つの場合は変更できません |
| 種類 | L / R ペア、単体 · Stereo、単体 · L、単体 · R |
| 役割 | Front・Surround・Ceiling など。視聴位置から見たスピーカーの位置で自動的に決まります |
| 出力ごとの補正 | ワールドの音響に合わせて、出力ごとの音量を補正します。コンソールやプリセットの操作では変更されません |
| 音が届く範囲を設定 | 「2D で聴こえる範囲」と「音が消える距離」を指定し、「この範囲を適用」を押します。内側は 2D、外側へ進むと 3D へ移行しながら音量が下がり、指定した距離で無音になります |

### 音声バッファ

![AudioriumSetup の Inspector の音声バッファ](/img/studio/inspector-buffer.png)

動画の音声をスピーカーへ送る前に保持する量です。`AudioriumSetup` の Inspector で選択します。

| 選択肢 | 内容 |
| --- | --- |
| 低遅延 | 映像と音のずれが小さくなります |
| 標準（既定） | 通常はこのまま使います |
| 安定 | 処理の重い PC でも音が途切れにくくなります |
