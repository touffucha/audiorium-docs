# Audiorium インストール手順

対象のバージョン：1.0.0

## 導入の前に

Audiorium は、ご自身のワールドのプロジェクトに導入します。サンプルシーンは含まれていません。導入後の動作は、商品ページの公開ワールドでお試しいただけます。

動作確認済みのバージョンは次のとおりです。

| 項目 | バージョン |
| --- | --- |
| Unity | 2022.3.22f1 |
| VRChat SDK - Worlds | 3.10.5 |

次のパッケージは Audiorium に含まれていません。各作者様の配布先から入手し、それぞれの規約に従ってご利用ください。

| パッケージ | 扱い | 用途 | 入手先 |
| --- | --- | --- | --- |
| YamaPlayer 1.5.19 | VizVid とどちらかが必須 | 動画プレイヤー | https://booth.pm/ja/items/4768863 |
| VizVid 1.8.2 | YamaPlayer とどちらかが必須 | 動画プレイヤー | https://booth.pm/ja/items/5056077 |
| AudioLink 3.1.2 | 推奨 | 視界エフェクト、音に反応する照明と EQ のグラフ。導入しない場合、視界エフェクトはご利用いただけず、照明と EQ のグラフは音に反応しません。音響の機能は AudioLink なしでもご利用いただけます | https://audiolink.dev/ |
| LTCGI 1.7.4 | 任意 | コンソールからの LTCGI の点灯と強さの操作。使用するワールドには LTCGI の規約に基づきクレジットの表示が必要です | https://ltcgi.dev/ |

## 導入の手順

1. 動画プレイヤー（YamaPlayer または VizVid）をプロジェクトに導入し、Scene に 1 台配置します。
2. AudioLink と LTCGI を使用する場合は、プロジェクトに導入し、Scene に配置します。
3. 本体の `Audiorium_1.0.0.unitypackage` をインポートします。Unity に「TMP Importer」のダイアログが表示されたら、「Import TMP Essentials」を押します。「Import TMP Examples & Extras」は不要です。ダイアログが表示されなかった場合は、メニューの `Window > TextMeshPro > Import TMP Essential Resources` から導入します。
4. 照明システムを使用する場合は、本体の後に `AudioriumLightingSystem_1.0.0.unitypackage` をインポートします。照明システム単体では動作しません。
5. メニューの `Tools > Audiorium > Studio` を開きます。以降の手順は Studio の画面とチュートリアルが案内します。

## 動画プレイヤーが複数あるワールド

Audiorium に接続できる動画プレイヤーは 1 台です。Scene に複数の動画プレイヤーがある場合は、Studio で接続する 1 台を選びます。接続していない動画プレイヤーの音は、そのまま鳴ります。

## 取り外し

1. Hierarchy で Audiorium の Setup の GameObject を削除します。Audiorium が作成したオブジェクトも一緒に削除されます。Setup の子に配置した物は、Setup と一緒に削除されます。Undo で元に戻せます。
2. 照明のセットと入場時の警告の看板は残ります。不要な場合は Hierarchy から削除します。
3. `Assets/Audiorium/` フォルダーを削除します。

Audiorium は、保存したシーンの動画プレイヤーの音源の設定を書き換えません。削除した後は、元の設定のまま鳴ります。

削除せずに使わない状態にする場合は、Setup の GameObject を無効にするか、EditorOnly のタグを付けます。

## 困ったとき

- Studio が開く場合は、Check タブを開きます。ビルドの前に直す項目と直し方が表示されます。
- Studio が開かない場合は、Unity と VRChat SDK のバージョンをご確認ください。

解決しない場合は、BOOTH ショップのメッセージよりお問い合わせください。次の情報を添えていただけますと、スムーズにご案内できます。

- Audiorium のバージョン
- Unity と VRChat SDK のバージョン
- 動画プレイヤーの名称とバージョン
- Unity の Console に出た最初のエラーの全文

更新履歴は [changelog.md](changelog.md) にあります。
