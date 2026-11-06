/**
* Sends a punch record directly to Google Apps Script Web App
*/
export async function sendPunchToGoogleSheets(gasConfig, payload) {
	if (!gasConfig.webAppUrl || !gasConfig.webAppUrl.trim()) {
		return {
			success: false,
			message: "Google Apps ScriptのURLが設定されていません（ローカル保存のみ完了）"
		};
	}
	const url = gasConfig.webAppUrl.trim();
	try {
		// We send payload as JSON. Google Apps Script doPost(e) parses e.postData.contents.
		// In browser client-side, Google redirects to script.googleusercontent.com.
		// Mode 'no-cors' allows sending data to Google Apps Script reliably from any browser without CORS preflight blocks.
		await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "text/plain;charset=utf-8" },
			body: JSON.stringify(payload),
			mode: "no-cors"
		});
		return {
			success: true,
			message: "Googleスプレッドシートへ自動送信しました"
		};
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : String(error);
		console.error("GAS Sync Error:", error);
		return {
			success: false,
			message: `スプレッドシート送信エラー: ${errMessage}`
		};
	}
}
/**
* Generates the complete copy-pasteable Google Apps Script code for Google Sheets.
*/
export function getSampleGasScript() {
	return `/**
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
`;
}
/**
* Exports attendance records to a downloadable CSV with Excel Japanese BOM.
*/
export function exportAttendanceToCSV(attendances, filename = "attendance_records.csv") {
	// BOM for Japanese Excel compatibility
	const BOM = "﻿";
	const headers = [
		"日付",
		"社員番号",
		"氏名",
		"出勤時刻",
		"退勤時刻",
		"休憩時間(分)",
		"実働時間(分)",
		"実働時間(時間)",
		"残業時間(分)",
		"ステータス",
		"直行",
		"直帰",
		"管理者修正",
		"備考"
	];
	const rows = attendances.map((rec) => {
		const hours = (rec.totalWorkMinutes / 60).toFixed(2);
		const statusLabel = rec.status === "completed" ? "退勤済" : rec.status === "working" ? "勤務中" : rec.status === "on_break" ? "休憩中" : "未出勤";
		return [
			rec.date,
			`"${rec.employeeCode}"`,
			`"${rec.employeeName.replace(/"/g, "\"\"")}"`,
			rec.clockIn || "",
			rec.clockOut || "",
			rec.breakMinutes,
			rec.totalWorkMinutes,
			hours,
			rec.overtimeMinutes,
			statusLabel,
			rec.isDirectIn ? "有" : "無",
			rec.isDirectOut ? "有" : "無",
			rec.isManualEdit ? "修正済" : "通常",
			`"${(rec.note || "").replace(/"/g, "\"\"")}"`
		].join(",");
	});
	const csvContent = BOM + [headers.join(","), ...rows].join("\r\n");
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
/**
* Exports raw punch logs to CSV
*/
export function exportPunchesToCSV(punches, filename = "punch_logs.csv") {
	const BOM = "﻿";
	const headers = [
		"打刻日時",
		"日付",
		"時刻",
		"社員番号",
		"氏名",
		"打刻種別",
		"修正フラグ",
		"修正者",
		"備考"
	];
	const rows = punches.map((p) => [
		p.timestamp,
		p.date,
		p.time,
		`"${p.employeeCode}"`,
		`"${p.employeeName.replace(/"/g, "\"\"")}"`,
		p.type,
		p.isManualEdit ? "手動修正" : "自動打刻",
		`"${(p.editedBy || "").replace(/"/g, "\"\"")}"`,
		`"${(p.note || "").replace(/"/g, "\"\"")}"`
	].join(","));
	const csvContent = BOM + [headers.join(","), ...rows].join("\r\n");
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

//# sourceMappingURL=data:application/json;base64,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RUFBRTtFQUN2QyxFQUFFO0VBQ0YsRUFBRSxlQUFlLFNBQVM7RUFDMUIsS0FBSyxFQUFFLFlBQVksR0FBRSxDQUFFLFFBQVEsTUFBTSxNQUFJLEVBQUU7RUFDM0MsS0FBSyxFQUFFLFFBQVEsR0FBRSxDQUFFLFFBQVEsTUFBTSxNQUFJLEVBQUU7Q0FDekMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0NBRVgsTUFBTSxhQUFhLE1BQU0sQ0FBQyxRQUFRLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxNQUFNO0NBQ2pFLE1BQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0NBQ3ZFLE1BQU0sTUFBTSxJQUFJLGdCQUFnQixJQUFJO0NBQ3BDLE1BQU0sSUFBSSxTQUFTLGNBQWMsR0FBRztDQUNwQyxFQUFFLE9BQU87Q0FDVCxFQUFFLFdBQVc7Q0FDYixTQUFTLEtBQUssWUFBWSxDQUFDO0NBQzNCLEVBQUUsTUFBTTtDQUNSLFNBQVMsS0FBSyxZQUFZLENBQUM7Q0FDM0IsSUFBSSxnQkFBZ0IsR0FBRztBQUN6QiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJnYXNTeW5jLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhaWx5QXR0ZW5kYW5jZSwgR2FzQ29uZmlnLCBQdW5jaFJlY29yZCB9IGZyb20gJy4uL3R5cGVzL2F0dGVuZGFuY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdhc1N5bmNQYXlsb2FkIHtcbiAgYWN0aW9uOiAncHVuY2gnIHwgJ3Rlc3QnIHwgJ2JhdGNoX3N5bmMnO1xuICBkYXRlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZW1wbG95ZWVDb2RlOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdGltZTogc3RyaW5nO1xuICBjbG9ja0luPzogc3RyaW5nO1xuICBjbG9ja091dD86IHN0cmluZztcbiAgYnJlYWtNaW51dGVzPzogbnVtYmVyO1xuICB3b3JrSG91cnM/OiBzdHJpbmc7XG4gIG5vdGU/OiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFNlbmRzIGEgcHVuY2ggcmVjb3JkIGRpcmVjdGx5IHRvIEdvb2dsZSBBcHBzIFNjcmlwdCBXZWIgQXBwXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kUHVuY2hUb0dvb2dsZVNoZWV0cyhcbiAgZ2FzQ29uZmlnOiBHYXNDb25maWcsXG4gIHBheWxvYWQ6IEdhc1N5bmNQYXlsb2FkXG4pOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgaWYgKCFnYXNDb25maWcud2ViQXBwVXJsIHx8ICFnYXNDb25maWcud2ViQXBwVXJsLnRyaW0oKSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2U6ICdHb29nbGUgQXBwcyBTY3JpcHTjga5VUkzjgYzoqK3lrprjgZXjgozjgabjgYTjgb7jgZvjgpPvvIjjg63jg7zjgqvjg6vkv53lrZjjga7jgb/lrozkuobvvIknLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB1cmwgPSBnYXNDb25maWcud2ViQXBwVXJsLnRyaW0oKTtcblxuICB0cnkge1xuICAgIC8vIFdlIHNlbmQgcGF5bG9hZCBhcyBKU09OLiBHb29nbGUgQXBwcyBTY3JpcHQgZG9Qb3N0KGUpIHBhcnNlcyBlLnBvc3REYXRhLmNvbnRlbnRzLlxuICAgIC8vIEluIGJyb3dzZXIgY2xpZW50LXNpZGUsIEdvb2dsZSByZWRpcmVjdHMgdG8gc2NyaXB0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS5cbiAgICAvLyBNb2RlICduby1jb3JzJyBhbGxvd3Mgc2VuZGluZyBkYXRhIHRvIEdvb2dsZSBBcHBzIFNjcmlwdCByZWxpYWJseSBmcm9tIGFueSBicm93c2VyIHdpdGhvdXQgQ09SUyBwcmVmbGlnaHQgYmxvY2tzLlxuICAgIGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgIG1vZGU6ICduby1jb3JzJywgLy8gRXNzZW50aWFsIGZvciBHb29nbGUgQXBwcyBTY3JpcHQgV2ViIEFwcCByZWRpcmVjdHNcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgbWVzc2FnZTogJ0dvb2dsZeOCueODl+ODrOODg+ODieOCt+ODvOODiOOBuOiHquWLlemAgeS/oeOBl+OBvuOBl+OBnycsXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICBjb25zdCBlcnJNZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ0dBUyBTeW5jIEVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlOiBg44K544OX44Os44OD44OJ44K344O844OI6YCB5L+h44Ko44Op44O8OiAke2Vyck1lc3NhZ2V9YCxcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBjb21wbGV0ZSBjb3B5LXBhc3RlYWJsZSBHb29nbGUgQXBwcyBTY3JpcHQgY29kZSBmb3IgR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZUdhc1NjcmlwdCgpOiBzdHJpbmcge1xuICByZXR1cm4gYC8qKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFBvY2hpa2luIOWLpOaAoOeuoeeQhuOCt+OCueODhuODoCAtIEdvb2dsZeOCueODl+ODrOODg+ODieOCt+ODvOODiOiHquWLlemAo+aQuuOCueOCr+ODquODl+ODiFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIOOAkOioreWumuaJi+mghuOAkVxuICogMS4gR29vZ2xl44K544OX44Os44OD44OJ44K344O844OI44KS5L2c5oiQ77yI44G+44Gf44Gv6ZaL44GP77yJXG4gKiAyLiDjg6Hjg4vjg6Xjg7zjgIzmi6HlvLXmqZ/og73jgI0gPiDjgIxBcHBzIFNjcmlwdOOAjeOCkuOCr+ODquODg+OCr1xuICogMy4g44Ko44OH44Kj44K/44Gr44GT44Gu44Kz44O844OJ44KS44GZ44G544Gm6LK844KK5LuY44GR44Gm44CM5L+d5a2Y44CN44KS44Kv44Oq44OD44KvXG4gKiA0LiDlj7PkuIrjga7jgIzjg4fjg5fjg63jgqTjgI0gPiDjgIzmlrDjgZfjgYTjg4fjg5fjg63jgqTjgI3jgpLjgq/jg6rjg4Pjgq9cbiAqIDUuIOeorumhnuOBrumBuOaKnuOBp+OAjOOCpuOCp+ODluOCouODl+ODquOAjeOCkumBuOaKnlxuICogNi4g5qyh44Gu44KI44GG44Gr6Kit5a6a77yaXG4gKiAgICAtIOasoeOBruODpuODvOOCtuODvOOBqOOBl+OBpuWun+ihjDog6Ieq5YiGIChtZSlcbiAqICAgIC0g44Ki44Kv44K744K544Gn44GN44KL44Om44O844K244O8OiDlhajlk6EgKEFueW9uZSkg4piF6YeN6KaB77yBXG4gKiA3LiDjgIzjg4fjg5fjg63jgqTjgI3jg5zjgr/jg7PjgpLmirzjgZfjgIHooajnpLrjgZXjgozjgZ/jgIzjgqbjgqfjg5bjgqLjg5fjg6pVUkzjgI3jgpLjgrPjg5Tjg7xcbiAqIDguIFBvY2hpa2lu566h55CG55S76Z2i44Gu44CM44OH44O844K/5Ye65Yqb44CN44G+44Gf44Gv44CM6Kit5a6a44CN44GrVVJM44KS6LK844KK5LuY44GR44G+44GZ44CCXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmZ1bmN0aW9uIGRvUG9zdChlKSB7XG4gIHZhciBsb2NrID0gTG9ja1NlcnZpY2UuZ2V0U2NyaXB0TG9jaygpO1xuICBsb2NrLnRyeUxvY2soMTAwMDApOyAvLyDlkIzmmYLmiZPliLvmmYLjga7nq7blkIjpmLLmraLjg63jg4Pjgq9cbiAgXG4gIHRyeSB7XG4gICAgdmFyIHNzID0gU3ByZWFkc2hlZXRBcHAuZ2V0QWN0aXZlU3ByZWFkc2hlZXQoKTtcbiAgICB2YXIgc2hlZXROYW1lID0gXCLli6TmgKDlrp/nuL7jg63jgrBcIjtcbiAgICB2YXIgc2hlZXQgPSBzcy5nZXRTaGVldEJ5TmFtZShzaGVldE5hbWUpO1xuICAgIFxuICAgIC8vIOOCt+ODvOODiOOBjOWtmOWcqOOBl+OBquOBhOWgtOWQiOOBr+ODmOODg+ODgOODvOS7mOOBjeOBp+aWsOimj+S9nOaIkFxuICAgIGlmICghc2hlZXQpIHtcbiAgICAgIHNoZWV0ID0gc3MuaW5zZXJ0U2hlZXQoc2hlZXROYW1lKTtcbiAgICAgIHNoZWV0LmFwcGVuZFJvdyhbXG4gICAgICAgIFwi5omT5Yi75pel5pmCXCIsIFxuICAgICAgICBcIuaXpeS7mFwiLCBcbiAgICAgICAgXCLnpL7lk6Hnlarlj7dcIiwgXG4gICAgICAgIFwi5rCP5ZCNXCIsIFxuICAgICAgICBcIuaJk+WIu+eoruWIpVwiLCBcbiAgICAgICAgXCLlh7rli6TmmYLliLtcIiwgXG4gICAgICAgIFwi6YCA5Yuk5pmC5Yi7XCIsIFxuICAgICAgICBcIuS8keaGqeaZgumWkyjliIYpXCIsIFxuICAgICAgICBcIuWun+WDjeaZgumWkyhoKVwiLCBcbiAgICAgICAgXCLlgpnogINcIlxuICAgICAgXSk7XG4gICAgICBzaGVldC5nZXRSYW5nZSgxLCAxLCAxLCAxMCkuc2V0QmFja2dyb3VuZChcIiMzMTgyOGZcIikuc2V0Rm9udENvbG9yKFwiI2ZmZmZmZlwiKS5zZXRGb250V2VpZ2h0KFwiYm9sZFwiKTtcbiAgICAgIHNoZWV0LnNldEZyb3plblJvd3MoMSk7XG4gICAgfVxuICAgIFxuICAgIC8vIOWPl+S/oeODh+ODvOOCv+OBruino+aekFxuICAgIHZhciBkYXRhO1xuICAgIGlmIChlLnBvc3REYXRhICYmIGUucG9zdERhdGEuY29udGVudHMpIHtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGUucG9zdERhdGEuY29udGVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gZS5wYXJhbWV0ZXIgfHwge307XG4gICAgfVxuICAgIFxuICAgIC8vIOODhuOCueODiOaOpee2muOBruWgtOWQiFxuICAgIGlmIChkYXRhLmFjdGlvbiA9PT0gXCJ0ZXN0XCIpIHtcbiAgICAgIHNoZWV0LmFwcGVuZFJvdyhbXG4gICAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJqYS1KUFwiLCB7IHRpbWVab25lOiBcIkFzaWEvVG9reW9cIiB9KSxcbiAgICAgICAgZGF0YS5kYXRlIHx8IFwiXCIsXG4gICAgICAgIFwiVEVTVFwiLFxuICAgICAgICBkYXRhLm5hbWUgfHwgXCLjg4bjgrnjg4jpgIHkv6FcIixcbiAgICAgICAgXCLmjqXntprjg4bjgrnjg4hcIixcbiAgICAgICAgXCItXCIsXG4gICAgICAgIFwiLVwiLFxuICAgICAgICAwLFxuICAgICAgICBcIjAuMFwiLFxuICAgICAgICBcIkdvb2dsZSBBcHBzIFNjcmlwdCDpgKPmkLrjg4bjgrnjg4jmiJDlip9cIlxuICAgICAgXSk7XG4gICAgICByZXR1cm4gQ29udGVudFNlcnZpY2UuY3JlYXRlVGV4dE91dHB1dChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwi44OG44K544OI6KGM44Gu5pu444GN6L6844G/44Gr5oiQ5Yqf44GX44G+44GX44GfXCJcbiAgICAgIH0pKS5zZXRNaW1lVHlwZShDb250ZW50U2VydmljZS5NaW1lVHlwZS5KU09OKTtcbiAgICB9XG4gICAgXG4gICAgLy8g6YCa5bi444Gu5omT5Yi744OH44O844K/6KiY6YyyXG4gICAgdmFyIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJqYS1KUFwiLCB7IHRpbWVab25lOiBcIkFzaWEvVG9reW9cIiB9KTtcbiAgICB2YXIgZGF0ZSA9IGRhdGEuZGF0ZSB8fCBcIlwiO1xuICAgIHZhciBlbXBsb3llZUNvZGUgPSBkYXRhLmVtcGxveWVlQ29kZSB8fCBcIlwiO1xuICAgIHZhciBuYW1lID0gZGF0YS5uYW1lIHx8IFwiXCI7XG4gICAgdmFyIHB1bmNoVHlwZSA9IGRhdGEudHlwZSB8fCBcIlwiO1xuICAgIHZhciBjbG9ja0luID0gZGF0YS5jbG9ja0luIHx8IFwiXCI7XG4gICAgdmFyIGNsb2NrT3V0ID0gZGF0YS5jbG9ja091dCB8fCBcIlwiO1xuICAgIHZhciBicmVha01pbnV0ZXMgPSBkYXRhLmJyZWFrTWludXRlcyAhPT0gdW5kZWZpbmVkID8gZGF0YS5icmVha01pbnV0ZXMgOiBcIlwiO1xuICAgIHZhciB3b3JrSG91cnMgPSBkYXRhLndvcmtIb3VycyB8fCBcIlwiO1xuICAgIHZhciBub3RlID0gZGF0YS5ub3RlIHx8IFwiXCI7XG4gICAgXG4gICAgLy8g44K544OX44Os44OD44OJ44K344O844OI44Gr6KGM44KS6L+95YqgXG4gICAgc2hlZXQuYXBwZW5kUm93KFtcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIGRhdGUsXG4gICAgICBlbXBsb3llZUNvZGUsXG4gICAgICBuYW1lLFxuICAgICAgcHVuY2hUeXBlLFxuICAgICAgY2xvY2tJbixcbiAgICAgIGNsb2NrT3V0LFxuICAgICAgYnJlYWtNaW51dGVzLFxuICAgICAgd29ya0hvdXJzLFxuICAgICAgbm90ZVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiBDb250ZW50U2VydmljZS5jcmVhdGVUZXh0T3V0cHV0KEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICBtZXNzYWdlOiBcIuaJk+WIu+OCkuOCueODl+ODrOODg+ODieOCt+ODvOODiOOBq+iomOmMsuOBl+OBvuOBl+OBn1wiXG4gICAgfSkpLnNldE1pbWVUeXBlKENvbnRlbnRTZXJ2aWNlLk1pbWVUeXBlLkpTT04pO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBDb250ZW50U2VydmljZS5jcmVhdGVUZXh0T3V0cHV0KEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgbWVzc2FnZTogZXJyb3IudG9TdHJpbmcoKVxuICAgIH0pKS5zZXRNaW1lVHlwZShDb250ZW50U2VydmljZS5NaW1lVHlwZS5KU09OKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2NrLnJlbGVhc2VMb2NrKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZG9HZXQoZSkge1xuICByZXR1cm4gQ29udGVudFNlcnZpY2UuY3JlYXRlVGV4dE91dHB1dChcIlBvY2hpa2lu5Yuk5oCg566h55CGIEdvb2dsZSBBcHBzIFNjcmlwdCDmraPluLjnqLzlg43kuK1cIik7XG59XG5gO1xufVxuXG4vKipcbiAqIEV4cG9ydHMgYXR0ZW5kYW5jZSByZWNvcmRzIHRvIGEgZG93bmxvYWRhYmxlIENTViB3aXRoIEV4Y2VsIEphcGFuZXNlIEJPTS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEF0dGVuZGFuY2VUb0NTVihcbiAgYXR0ZW5kYW5jZXM6IERhaWx5QXR0ZW5kYW5jZVtdLFxuICBmaWxlbmFtZSA9ICdhdHRlbmRhbmNlX3JlY29yZHMuY3N2J1xuKTogdm9pZCB7XG4gIC8vIEJPTSBmb3IgSmFwYW5lc2UgRXhjZWwgY29tcGF0aWJpbGl0eVxuICBjb25zdCBCT00gPSAnXFx1RkVGRic7XG4gIGNvbnN0IGhlYWRlcnMgPSBbXG4gICAgJ+aXpeS7mCcsXG4gICAgJ+ekvuWToeeVquWPtycsXG4gICAgJ+awj+WQjScsXG4gICAgJ+WHuuWLpOaZguWIuycsXG4gICAgJ+mAgOWLpOaZguWIuycsXG4gICAgJ+S8keaGqeaZgumWkyjliIYpJyxcbiAgICAn5a6f5YON5pmC6ZaTKOWIhiknLFxuICAgICflrp/lg43mmYLplpMo5pmC6ZaTKScsXG4gICAgJ+aui+alreaZgumWkyjliIYpJyxcbiAgICAn44K544OG44O844K/44K5JyxcbiAgICAn55u06KGMJyxcbiAgICAn55u05biwJyxcbiAgICAn566h55CG6ICF5L+u5q2jJyxcbiAgICAn5YKZ6ICDJyxcbiAgXTtcblxuICBjb25zdCByb3dzID0gYXR0ZW5kYW5jZXMubWFwKChyZWMpID0+IHtcbiAgICBjb25zdCBob3VycyA9IChyZWMudG90YWxXb3JrTWludXRlcyAvIDYwKS50b0ZpeGVkKDIpO1xuICAgIGNvbnN0IHN0YXR1c0xhYmVsID1cbiAgICAgIHJlYy5zdGF0dXMgPT09ICdjb21wbGV0ZWQnXG4gICAgICAgID8gJ+mAgOWLpOa4iCdcbiAgICAgICAgOiByZWMuc3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgPyAn5Yuk5YuZ5LitJ1xuICAgICAgICA6IHJlYy5zdGF0dXMgPT09ICdvbl9icmVhaydcbiAgICAgICAgPyAn5LyR5oap5LitJ1xuICAgICAgICA6ICfmnKrlh7rli6QnO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHJlYy5kYXRlLFxuICAgICAgYFwiJHtyZWMuZW1wbG95ZWVDb2RlfVwiYCxcbiAgICAgIGBcIiR7cmVjLmVtcGxveWVlTmFtZS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpfVwiYCxcbiAgICAgIHJlYy5jbG9ja0luIHx8ICcnLFxuICAgICAgcmVjLmNsb2NrT3V0IHx8ICcnLFxuICAgICAgcmVjLmJyZWFrTWludXRlcyxcbiAgICAgIHJlYy50b3RhbFdvcmtNaW51dGVzLFxuICAgICAgaG91cnMsXG4gICAgICByZWMub3ZlcnRpbWVNaW51dGVzLFxuICAgICAgc3RhdHVzTGFiZWwsXG4gICAgICByZWMuaXNEaXJlY3RJbiA/ICfmnIknIDogJ+eEoScsXG4gICAgICByZWMuaXNEaXJlY3RPdXQgPyAn5pyJJyA6ICfnhKEnLFxuICAgICAgcmVjLmlzTWFudWFsRWRpdCA/ICfkv67mraPmuIgnIDogJ+mAmuW4uCcsXG4gICAgICBgXCIkeyhyZWMubm90ZSB8fCAnJykucmVwbGFjZSgvXCIvZywgJ1wiXCInKX1cImAsXG4gICAgXS5qb2luKCcsJyk7XG4gIH0pO1xuXG4gIGNvbnN0IGNzdkNvbnRlbnQgPSBCT00gKyBbaGVhZGVycy5qb2luKCcsJyksIC4uLnJvd3NdLmpvaW4oJ1xcclxcbicpO1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkNvbnRlbnRdLCB7IHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycgfSk7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICBhLmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn1cblxuLyoqXG4gKiBFeHBvcnRzIHJhdyBwdW5jaCBsb2dzIHRvIENTVlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UHVuY2hlc1RvQ1NWKFxuICBwdW5jaGVzOiBQdW5jaFJlY29yZFtdLFxuICBmaWxlbmFtZSA9ICdwdW5jaF9sb2dzLmNzdidcbik6IHZvaWQge1xuICBjb25zdCBCT00gPSAnXFx1RkVGRic7XG4gIGNvbnN0IGhlYWRlcnMgPSBbJ+aJk+WIu+aXpeaZgicsICfml6Xku5gnLCAn5pmC5Yi7JywgJ+ekvuWToeeVquWPtycsICfmsI/lkI0nLCAn5omT5Yi756iu5YilJywgJ+S/ruato+ODleODqeOCsCcsICfkv67mraPogIUnLCAn5YKZ6ICDJ107XG5cbiAgY29uc3Qgcm93cyA9IHB1bmNoZXMubWFwKChwKSA9PiBbXG4gICAgcC50aW1lc3RhbXAsXG4gICAgcC5kYXRlLFxuICAgIHAudGltZSxcbiAgICBgXCIke3AuZW1wbG95ZWVDb2RlfVwiYCxcbiAgICBgXCIke3AuZW1wbG95ZWVOYW1lLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgLFxuICAgIHAudHlwZSxcbiAgICBwLmlzTWFudWFsRWRpdCA/ICfmiYvli5Xkv67mraMnIDogJ+iHquWLleaJk+WIuycsXG4gICAgYFwiJHsocC5lZGl0ZWRCeSB8fCAnJykucmVwbGFjZSgvXCIvZywgJ1wiXCInKX1cImAsXG4gICAgYFwiJHsocC5ub3RlIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpfVwiYCxcbiAgXS5qb2luKCcsJykpO1xuXG4gIGNvbnN0IGNzdkNvbnRlbnQgPSBCT00gKyBbaGVhZGVycy5qb2luKCcsJyksIC4uLnJvd3NdLmpvaW4oJ1xcclxcbicpO1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkNvbnRlbnRdLCB7IHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycgfSk7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICBhLmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn1cbiJdfQ==