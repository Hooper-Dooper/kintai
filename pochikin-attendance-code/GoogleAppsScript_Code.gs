/**
 * ========================================================
 * Pochikin 勤怠管理システム - Googleスプレッドシート自動連携スクリプト
 * ========================================================
 * 【設定手順】
 * 1. Googleスプレッドシートを作成（または開く）
 * 2. メニュー「拡張機能」 > 「Apps Script」をクリック
 * 3. エディタにこのコードをすべて貼り付けて「保存」をクリック
 * 4. 右上の「デプロイ」 > 「新しいデプロイ」をクリック
 * 5. 種類の選択で「ウェブアプリ」を選択
 * 6. 次のように設定：
 *    - 次のユーザーとして実行: 自分 (me)
 *    - アクセスできるユーザー: 全員 (Anyone) ★重要！
 * 7. 「デプロイ」ボタンを押し、表示された「ウェブアプリURL」をコピー
 * 8. Pochikin管理画面の「データ出力」または「設定」にURLを貼り付けます。
 * ========================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 同時打刻時の競合防止ロック
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "勤怠実績ログ";
    var sheet = ss.getSheetByName(sheetName);
    
    // シートが存在しない場合はヘッダー付きで新規作成
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        "打刻日時", 
        "日付", 
        "社員番号", 
        "氏名", 
        "打刻種別", 
        "出勤時刻", 
        "退勤時刻", 
        "休憩時間(分)", 
        "実働時間(h)", 
        "備考"
      ]);
      sheet.getRange(1, 1, 1, 10).setBackground("#31828f").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // 受信データの解析
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }
    
    // テスト接続の場合
    if (data.action === "test") {
      sheet.appendRow([
        new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
        data.date || "",
        "TEST",
        data.name || "テスト送信",
        "接続テスト",
        "-",
        "-",
        0,
        "0.0",
        "Google Apps Script 連携テスト成功"
      ]);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "テスト行の書き込みに成功しました"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 通常の打刻データ記録
    var timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    var date = data.date || "";
    var employeeCode = data.employeeCode || "";
    var name = data.name || "";
    var punchType = data.type || "";
    var clockIn = data.clockIn || "";
    var clockOut = data.clockOut || "";
    var breakMinutes = data.breakMinutes !== undefined ? data.breakMinutes : "";
    var workHours = data.workHours || "";
    var note = data.note || "";
    
    // スプレッドシートに行を追加
    sheet.appendRow([
      timestamp,
      date,
      employeeCode,
      name,
      punchType,
      clockIn,
      clockOut,
      breakMinutes,
      workHours,
      note
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "打刻をスプレッドシートに記録しました"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Pochikin勤怠管理 Google Apps Script 正常稼働中");
}
