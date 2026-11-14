---
title: インストール
sidebar_position: 3
description: Audiorium をワールドのプロジェクトにインポートする順番と、インポートの後の確認
---

# インストール

VRChat Creator Companion（VCC）で作成したワールドのプロジェクトに導入します。先に [必要な物と動作環境](./requirements.md) を確認してください。

## インポートの順番

| 順番 | パッケージ | 必要な場合 |
| --- | --- | --- |
| 1 | AudioLink・VRC Light Volumes・LTCGI | AudioLink は必須。VRC Light Volumes・LTCGI は、照明システムを導入する場合、サンプルシーンを開く場合は必須です。 |
| 2 | 動画プレイヤー（YamaPlayer か VizVid） | 必須 |
| 3 | Audiorium の unitypackage（本体） | 必須 |
| 4 | AudioriumLightingSystem の unitypackage（照明システム） | 購入した場合 |

:::tip 既存のプロジェクトへインポートする場合

「Audiorium」および「外部依存パッケージ」を、以前からご利用のプロジェクト等にインポートする場合、プロジェクト内の既存アセットとの相性により、エラーが生じる場合があります。どのパッケージがエラーの原因となったかを特定しやすくするため、1 つずつインポートすることをおすすめいたします。

:::

:::warning インポートの順番の注意

- **VizVid と VRC Light Volumes を両方入れる場合**は、VRC Light Volumes を先に導入します。VizVid を先に入れるとコンパイルエラーが出ることがあります（[トラブルシューティング](../help/troubleshooting.md#vizvid-と-vrc-light-volumes-を同時に導入するとコンパイルエラーが出る)）。
- **照明システムは本体の後に**インポートします。先にインポートすると、Unity の Console に UdonSharp のコンパイルエラーが出ることがあります。

:::

- 動画プレイヤーは、[YamaPlayer の導入手順](https://github.com/koorimizuw/YamaPlayer/wiki/YamaPlayer-%E5%B0%8E%E5%85%A5%E6%89%8B%E9%A0%86) か [VizVid の導入方法](https://xtlcdn.github.io/VizVid/docs/simple_ja.html) に従って導入します。
- AudioLink・VRC Light Volumes・LTCGI は VCC で追加します。
- サンプルシーンを開く場合は、AudioLink・VRC Light Volumes・LTCGI の 3 つとも追加します。追加しない場合、シーン上の一部 Prefab が Missing になるなど、不具合が生じます。
- 照明システム単体では動作しません。必ず、Audiorium 本体と併せて導入してください。

:::info TMP Importer が表示された場合

本体のインポートの後に TMP Importer のウィンドウが表示された場合は、「Import TMP Essentials」を押します。TextMesh Pro を初めて使うプロジェクトで 1 回だけ表示されます。

![TMP Importer のウィンドウ](/img/install/tmp-importer.png)

導入後、Scene ビューの Audiorium コンソールが文字化けしている場合は、[トラブルシューティング](../help/troubleshooting.md#コンソールの文字が表示されない) を参照してください。

:::

## インストールを確認する

メニューの **Tools › Audiorium** に **Add Audiorium** が表示されれば完了です。照明システムをインポートした場合は、**Add Lights** も表示されます。

表示されない場合は [トラブルシューティング](../help/troubleshooting.md#tools--audiorium-のメニューが表示されない) を参照してください。
