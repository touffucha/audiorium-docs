---
title: インストール
sidebar_position: 3
description: Audiorium をワールドのプロジェクトにインポートする順番と、インポートの後の確認
---

# インストール

対象のバージョン：1.0.0

VRChat Creator Companion（VCC）で作成したワールドのプロジェクトに導入します。先に [必要な物と動作環境](./requirements.md) を確認してください。

## インポートの順番

| 順番 | パッケージ | 必要な場合 |
| --- | --- | --- |
| 1 | 動画プレイヤー（YamaPlayer か VizVid） | 必ず |
| 2 | AudioLink、LTCGI、VRC Light Volumes | 使用する場合。サンプルシーンを開く場合は必ず |
| 3 | `Audiorium_1.0.0.unitypackage`（本体） | 必ず |
| 4 | `AudioriumLightingSystem_1.0.0.unitypackage`（照明システム） | 購入した場合 |
| 5 | `AudioriumShowroom_1.0.0.unitypackage`（サンプルシーン・照明なし） | サンプルシーンを使用する場合（照明ありも含む） |
| 6 | `AudioriumShowroomLighting_1.0.0.unitypackage`（サンプルシーン・照明あり） | 照明システムを購入し、照明ありのサンプルシーンを使用する場合 |

:::warning 本体より先にインポートしない

- 照明システムとサンプルシーンは、必ず本体の後にインポートします。照明システムを本体より先にインポートすると、Unity の Console に U# のコンパイルエラーが表示されます。
- `AudioriumShowroomLighting_1.0.0.unitypackage` は、照明システムとサンプルシーン（照明なし）の後にインポートします。

:::

{/* 未確認：上の表の 5 行目の「照明ありも含む」は、設計の事実（照明ありのシーンは、サンプルシーン（照明なし）のファイルのモデルと焼いた光を使う）で、書き出した配布物での実測はまだ。実測が届いたら、この印を消す。印が残っている間は公開しない */}

{/* 未確認：AudioriumShowroomLighting を照明システムやサンプルシーン（照明なし）より先にインポートしたときに起きる事。確かめた事実が届いたら、上の段落に 1 文足す */}

- 動画プレイヤーは、各配布ページの手順で導入します。
- AudioLink・LTCGI・VRC Light Volumes は VCC で追加します。どれも後から追加できます。
- 照明システムは、単体では動作しません。

:::info TMP Importer が表示された場合

本体のインポートの後に「TMP Importer」のウィンドウが表示された場合は、何も押さずに閉じます。TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

コンソールの文字に必要な TextMesh Pro の Essentials（TMP Essentials）は、コンソールを置くときに Audiorium が自動で導入します。「Import TMP Essentials」から先に導入した場合、コンソールの文字が四角のまま表示されることがあります。そのときは Unity を開き直します。

:::

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

表示されない場合は [トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。
