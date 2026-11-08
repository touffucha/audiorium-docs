---
title: スピーカーを追加する
sidebar_position: 2
description: レイアウトのスピーカーに加えて、L / R ペアや単体のスピーカーを追加する手順
---

# スピーカーを追加する

レイアウトのスピーカーに加えて、スピーカーを追加します。出力は Room と Sub を含めて 8 つまで使用できます。

## スピーカーを追加して配置する

1. Hierarchy で `AudioriumSetup` を選択します。
2. Inspector の「L / R ペアを追加」か「単体スピーカーを追加」を押します。スピーカーは動画プレイヤーの位置に追加されます。
3. Scene ビューで、追加したスピーカーを移動します。

![AudioriumSetup の Inspector](/img/studio/speakers-inspector-setup.png)

## スピーカーの設定を変更する

1. Hierarchy で追加したスピーカーを選択します。
2. Inspector で「入力」と「種類」を設定します。「入力」は、動画プレイヤーの音源が 1 つの場合は変更できません。
3. コンソールの Speaker EQ タブに表示する名前を変更する場合は、Hierarchy で GameObject の名前を変更します。

![スピーカーの Inspector。Room を選択した状態](/img/studio/speakers-inspector-speaker.png)

役割は、視聴位置から見たスピーカーの位置で自動的に決まります。各項目の詳細は [Speakers](../studio/speakers.md#スピーカーごとの設定) を参照してください。
