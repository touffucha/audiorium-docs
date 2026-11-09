---
title: Audiorium を更新する
sidebar_label: 更新する
sidebar_position: 6
description: 古いバージョンの Assets/Audiorium を削除してから、新しいバージョンの Audiorium をインポートする手順
---

# Audiorium を更新する

古いバージョンの `Assets/Audiorium` を削除してから、新しいバージョンをインポートします。変更点は [更新履歴](../changelog.md) で確認できます。

上書きしてインポートすると、新しいバージョンで名前が変わったファイルや削除したファイルが、古いまま残ります。残ったファイルは、コンパイルのエラーや意図しない動作の原因になります。

Inspector で行った設定は Scene に保存されています。`Assets/Audiorium` を削除しても、設定は消えません。

:::warning サンプルシーンを改変して使っている場合

サンプルシーンのファイルは `Assets/Audiorium` の中にあります。手順 3 の前に、改変したシーンのファイルを `Assets/Audiorium` の外へ移動してください。移動しないと、シーンも削除されます。

:::

## 更新する

1. プロジェクトのバックアップを取ります。
2. 作業中の Scene を保存し、メニューの **File › New Scene** で空の Scene を開きます。
3. Project ウィンドウで `Assets/Audiorium` を右クリックし、「Delete」を押します。照明システムとサンプルシーンも `Assets/Audiorium` の中にあるため、同時に削除されます。
4. 新しいバージョンの `Audiorium_x.y.z.unitypackage` を Unity のウィンドウへドラッグします。「Import Unity Package」のウィンドウで「Import」を押します。
5. 照明システムとサンプルシーンを使用している場合は、それぞれの新しいバージョンも同じ方法でインポートします。本体の後にインポートします。
6. ワールドの Scene を開き、Hierarchy で `AudioriumSetup` を選択します。Inspector の一番上に警告が表示されないことを確認します。

`Assets/TextMesh Pro` など、`Assets/Audiorium` の外にあるフォルダーは削除しません。

手順 6 で警告が表示された場合は、[トラブルシューティング](../help/troubleshooting.md) を参照してください。
