# Pochikin Cloud 勤怠管理システム

Pochikin（ポチキン）ライクな直感的タイムカード打刻・管理者ポータル・Googleスプレッドシート（Google Apps Script）自動連携対応の勤怠管理Webシステムです。

## GitHub Pagesへの公開手順（完全無料）
1. GitHubで新しいリポジトリを作成します。
2. このZIPを展開した中身のファイル群をすべてアップロードします。
3. リポジトリの **Settings > Pages** で「Source」を **「GitHub Actions」** に設定します。
4. 数十秒で自動公開URL（例: `https://<ユーザー名>.github.io/<リポジトリ名>/`）が発行されます！

## Googleスプレッドシート自動連携
同梱の `GoogleAppsScript_Code.gs` をスプレッドシートの「拡張機能 > Apps Script」に貼り付け、ウェブアプリとしてデプロイして発行されたURLを管理画面に設定すれば、出退勤が自動記入されます。
