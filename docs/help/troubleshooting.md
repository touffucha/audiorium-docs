---
title: トラブルシューティング
sidebar_position: 1
description: Audiorium Studio の Check タブの使い方と、よくある問題の解決方法
---

# トラブルシューティング

## まず Check タブを開く

Studio が開く場合は、「Check」タブを開きます。ビルドの前に解決が必要な項目と、直し方が表示されます。ほかのタブを開いているときも、解決が必要な項目があると、タブの下に件数と「Check を開く」が表示されます。

ボタンが付いた項目は、ボタンを押すと解決します。

| 表示 | 原因 | 直し方 |
| --- | --- | --- |
| ビルド先が PC（Windows）ではありません | ビルドのプラットフォームが Android などになっている | 「Windows に切り替え」を押します。Audiorium は PC 専用です |
| コンソールがありません | コンソールが削除された | 「修復」を押すと、コンソールを再配置します |
| TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません | TextMesh Pro の Essentials を自動で導入できなかった | 「TMP Essentials を導入」を押します |
| 「修復」のボタンが表示される | Audiorium が配置した物の一部が削除された | 「修復」を押すと、不足している物を再生成します。設定はそのまま保持されます |

## 接続していた動画プレイヤーが見つからない

接続していた動画プレイヤーを削除すると、Studio に「接続していた動画プレイヤーが見つかりません」と表示されます。動画プレイヤーを接続し直すか、[取り外し](./uninstall.md) の手順で Audiorium を削除します。

## Studio が開かない

Unity と VRChat SDK のバージョンをご確認ください。動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md) にあります。

Unity の Console にコンパイルエラーが出ている場合、Studio は開きません。最初のエラーの全文を控えて、お問い合わせください。

## VizVid と VRC Light Volumes を同時に導入するとコンパイルエラーが出る

新規のプロジェクトに VizVid と VRC Light Volumes を同時に導入すると、Unity の Console に次のエラーが 3 件表示され、コンパイルが止まることがあります。

```text
Packages\idv.jlchntoz.vvmw\Editor\VVMW\Designer\ScreenConfiguratorEditor.cs(114,32): error CS1061: 'ScreenConfigurator' does not contain a definition for 'CreateLightVolume'
```

続く 2 件は `EnsureLightVolumeCookie` と `TryEstimatePlacement` についての同じ形のエラーです。

VizVid と VRC Light Volumes の組み合わせで起きるエラーで、Audiorium は関係しません。Audiorium 自体は VRC Light Volumes を使用しません。LTCGI を使う場合は、VRC Light Volumes が必要です（[LTCGI を導入するとコンパイルエラーが出る](#ltcgi-を導入するとコンパイルエラーが出る)）。

次のどちらかで解決する場合があります（当ショップでは動作を確認していません）。

- **Edit › Project Settings… › Player › Other Settings › Script Compilation** の Scripting Define Symbols に `VRC_LIGHT_VOLUMES` を追加し、「Apply」を押します。
- VRC Light Volumes を先に導入してコンパイルが終わるのを待ち、その後に VizVid を導入します。

解決しない場合は、VizVid の配布ページの案内をご確認ください。

## LTCGI を導入するとコンパイルエラーが出る

LTCGI 1.7.4 は、VRC Light Volumes が無いプロジェクトでは、LTCGI に含まれる U# がコンパイルエラーになります。このエラーが出ている間は、Audiorium の U# もコンパイルされず、Audiorium が動作しません。

LTCGI を使う場合は、VRC Light Volumes もプロジェクトに導入します。動作確認済みのバージョンは [必要な物と動作環境](../getting-started/requirements.md) にあります。

## Play モードで音が鳴らない

動画の外部 URL は、Unity の Play モードでは再生できません。音はビルドして VRChat で確認してください（[クイックスタート](../getting-started/quick-start.md#ビルドして-vrchat-で確認する)）。

## 動画プレイヤーが選択の画面に表示されない

- 動画プレイヤーが、開いている Scene に配置されているかを確認します。
- 対応している動画プレイヤーは YamaPlayer と VizVid です。それ以外の動画プレイヤーのカードには「未対応」と表示されます。
- 別の Audiorium がその動画プレイヤーに接続している場合、カードに「使用中」と表示されます。

## コンソールの Effects タブが使えない

Effects タブの視界エフェクトには AudioLink が必要です。Studio の [Effects](../studio/effects.md) タブの「シーン連携」で、「AudioLink」をオンにします。チェックの代わりに「入手先を開く」が表示される場合は、AudioLink がプロジェクトに導入されていません。

## Studio の Lights タブが選択できない

Lights タブは、照明システム（拡張パッケージ）をインポートすると使用できます。照明システムは本体の後にインポートします。

## コンソールの文字が表示されない

コンソールの文字には、TextMesh Pro の Essentials（TMP Essentials）が必要です。Studio は、コンソールを配置するときに TMP Essentials が無ければ自動で導入します。

- 自動で導入できなかった場合は、Check タブに「TMP Essentials がプロジェクトにないため、コンソールの文字が表示されません。」が表示されます。「TMP Essentials を導入」を押します。
- TMP Importer のウィンドウから先に TMP Essentials を導入した後、コンソールの文字が四角のまま表示される場合は、Unity を開き直します。TextMesh Pro の不具合で、開き直すと文字が表示されます。

## お問い合わせ

解決しない場合は、BOOTH ショップのメッセージよりお問い合わせください。次の情報を添えていただけますと、スムーズにご案内できます。

- Audiorium のバージョン
- Unity と VRChat SDK のバージョン
- 動画プレイヤーの名称とバージョン
- Unity の Console に出た最初のエラーの全文
