---
title: Audiorium を更新する
sidebar_label: 更新する
sidebar_position: 4
description: 古いバージョンの Assets/Audiorium を削除してから、新しいバージョンの Audiorium をインポートする手順
---

# Audiorium を更新する

古いバージョンの `Assets/Audiorium` を削除してから、新しいバージョンをインポートします。変更点は [更新履歴](../changelog.md) で確認できます。

上書きしてインポートすると、新しいバージョンで名前が変わったファイルや削除したファイルが、古いまま残ります。残ったファイルは、コンパイルのエラーや意図しない動作の原因になります。

Studio で行った設定は Scene に保存されています。`Assets/Audiorium` を削除しても、設定は消えません。

## 更新する

1. プロジェクトのバックアップを取ります。
2. 作業中の Scene を保存し、メニューの **File › New Scene** で空の Scene を開きます。
3. Project ウィンドウで `Assets/Audiorium` を右クリックし、「Delete」を押します。照明システム（拡張パッケージ）も `Assets/Audiorium` の中にあるため、同時に削除されます。
4. 新しいバージョンの `Audiorium_x.y.z.unitypackage` を Unity のウィンドウへドラッグします。「Import Unity Package」のウィンドウで「Import」を押します。
5. 照明システムを使用している場合は、照明システムの新しいバージョンも同じ手順でインポートします。
6. ワールドの Scene を開き、メニューの **Tools › Audiorium › Studio** を開きます。「Check」タブに「問題はありません。」と表示されることを確認します。

`Assets/TextMesh Pro` など、`Assets/Audiorium` の外にあるフォルダーは削除しません。

手順 6 で「Check」タブに解決が必要な項目が表示された場合は、[トラブルシューティング](../help/troubleshooting.md) を参照してください。
