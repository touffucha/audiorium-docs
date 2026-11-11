---
title: Audiorium を更新する
sidebar_label: 更新する
sidebar_position: 6
description: 新しいバージョンの unitypackage をインポートして Audiorium を更新する手順
---

# Audiorium を更新する

新しいバージョンの unitypackage を、そのままインポートします。スピーカーの配置と Inspector の設定は Scene に保存されているため、更新しても残ります。

{/* 未確認：上書きのインポートだけで更新できることは、次のバージョンの配布物でまだ確かめていない。製品側の決まり（更新でファイルを削除・改名しない）を決定記録に残し、実測が届いたら、この印を消す。印が残っている間は公開しない */}

1. プロジェクトのバックアップを取ります。
2. 新しいバージョンの `Audiorium_x.y.z.unitypackage` を Unity のウィンドウへドラッグし、「Import」を押します。
3. 照明システムを使用している場合は、続けて新しいバージョンをインポートします。
4. Hierarchy で `AudioriumSetup` を選択し、Inspector に警告が表示されないことを確認します。

警告が表示された場合は、[トラブルシューティング](../help/troubleshooting.md) を参照してください。変更点は [更新履歴](../changelog.md) で確認できます。

:::warning サンプルシーンを改変して使っている場合

インポートすると、サンプルシーンは新しいバージョンで上書きされます。改変したシーンは、更新の前に **File › Save As** で `Assets/Audiorium` の外へ別の名前で保存してください。

:::
