const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport5_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { FileSpreadsheet, Download, Copy, Check, Send, Github, CheckCircle2, AlertCircle, HelpCircle } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { exportAttendanceToCSV, exportPunchesToCSV, getSampleGasScript, sendPunchToGoogleSheets } from "/src/utils/gasSync.ts";
import { downloadProjectZip } from "/src/utils/zipExport.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminExport.tsx";
import __vite__cjsImport5_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminExport = () => {
	const [gasConfig, setGasConfig] = useState(storage.getGasConfig());
	const [urlInput, setUrlInput] = useState(gasConfig.webAppUrl);
	const [autoSync, setAutoSync] = useState(gasConfig.autoSyncEnabled);
	const [isCopied, setIsCopied] = useState(false);
	const [isDownloadingZip, setIsDownloadingZip] = useState(false);
	const [testStatus, setTestStatus] = useState({ loading: false });
	const handleDownloadZip = async () => {
		setIsDownloadingZip(true);
		try {
			await downloadProjectZip("pochikin-attendance-code.zip");
		} catch (e) {
			alert("ZIPファイルの生成に失敗しました: " + String(e));
		} finally {
			setIsDownloadingZip(false);
		}
	};
	const sampleScript = getSampleGasScript();
	const handleSaveGasConfig = (e) => {
		e.preventDefault();
		const updated = storage.updateGasConfig({
			webAppUrl: urlInput.trim(),
			autoSyncEnabled: autoSync
		});
		setGasConfig(updated);
		alert("Google Apps Script設定を保存しました。");
	};
	const handleCopyScript = () => {
		navigator.clipboard.writeText(sampleScript);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2500);
	};
	const handleRunTest = async () => {
		if (!urlInput.trim()) {
			alert("先にGoogle Apps ScriptのウェブアプリURLを入力してください。");
			return;
		}
		setTestStatus({ loading: true });
		const now = new Date();
		const testPayload = {
			action: "test",
			date: now.toLocaleDateString("ja-JP").replace(/-/g, "/"),
			name: "管理者テスト",
			employeeCode: "TEST01",
			type: "出退勤テスト",
			time: now.toLocaleTimeString("ja-JP"),
			clockIn: "09:00",
			clockOut: "18:00",
			breakMinutes: 60,
			workHours: "8.0",
			note: "Pochikin 管理画面からの接続テスト",
			timestamp: now.toISOString()
		};
		const res = await sendPunchToGoogleSheets({
			...gasConfig,
			webAppUrl: urlInput.trim()
		}, testPayload);
		if (res.success) {
			storage.updateGasConfig({
				lastSyncTime: new Date().toLocaleTimeString("ja-JP"),
				lastSyncStatus: "success",
				lastSyncMessage: "テスト送信成功"
			});
			setGasConfig(storage.getGasConfig());
			setTestStatus({
				loading: false,
				success: true,
				message: "Googleスプレッドシートへテストデータを正常に送信しました！スプレッドシートをご確認ください。"
			});
		} else {
			setTestStatus({
				loading: false,
				success: false,
				message: res.message
			});
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-xl font-bold text-slate-900 tracking-tight",
					children: "データ出力 & Googleスプレッドシート自動連携"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-xs text-slate-500 mt-1",
					children: "出勤・退勤ボタンを押した瞬間にGoogleスプレッドシートへ自動入力する設定と、CSV出力が行えます。"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: handleDownloadZip,
							disabled: isDownloadingZip,
							className: "px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm disabled:opacity-50",
							title: "GitHubアップロード用コード一式をZIPでダウンロード",
							children: [/* @__PURE__ */ _jsxDEV(Github, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 13
							}, this), isDownloadingZip ? "ZIP生成中..." : "GitHub用一式ダウンロード (ZIP)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => exportAttendanceToCSV(storage.getAllAttendance(), "pochikin_勤怠実績一覧.csv"),
							className: "px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-emerald-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 13
							}, this), "勤怠実績CSV"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => exportPunchesToCSV(storage.getAllPunches(), "pochikin_全打刻ログ.csv"),
							className: "px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-teal-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 13
							}, this), "全打刻ログCSV"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between border-b border-slate-100 pb-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600",
								children: /* @__PURE__ */ _jsxDEV(FileSpreadsheet, { className: "w-5 h-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 161,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-slate-900 text-base",
								children: "Googleスプレッドシート自動連携 (GAS Webhook)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-500",
								children: "出勤・退勤打刻時に「日付」「氏名」「出勤時刻」「退勤時刻」「実働時間」を即座にスプレッドシートへ追記します。"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: `px-3 py-1 rounded-full text-xs font-bold ${gasConfig.webAppUrl ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`,
							children: gasConfig.webAppUrl ? "● 連携有効" : "未設定"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("form", {
						onSubmit: handleSaveGasConfig,
						className: "space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-xs font-bold text-slate-700 mb-1.5",
							children: "Google Apps Script ウェブアプリURL (exec URL)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "url",
								value: urlInput,
								onChange: (e) => setUrlInput(e.target.value),
								placeholder: "https://script.google.com/macros/s/AKfycb.../exec",
								className: "flex-1 text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								className: "px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-2xs whitespace-nowrap",
								children: "URLを保存"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center justify-between gap-4 pt-1",
							children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none",
								children: [/* @__PURE__ */ _jsxDEV("input", {
									type: "checkbox",
									checked: autoSync,
									onChange: (e) => setAutoSync(e.target.checked),
									className: "rounded text-emerald-600 focus:ring-emerald-500"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 15
								}, this), "出勤・退勤ボタンを押した時に自動でスプレッドシートへ送信する"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: handleRunTest,
								disabled: testStatus.loading,
								className: "px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition inline-flex items-center gap-1.5 disabled:opacity-50",
								children: [/* @__PURE__ */ _jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 15
								}, this), testStatus.loading ? "送信中..." : "スプレッドシート送信テストを実行"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 9
					}, this),
					testStatus.message && /* @__PURE__ */ _jsxDEV("div", {
						className: `p-4 rounded-lg border text-xs flex items-start gap-3 ${testStatus.success ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"}`,
						children: [testStatus.success ? /* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 15
						}, this) : /* @__PURE__ */ _jsxDEV(AlertCircle, { className: "w-5 h-5 text-rose-600 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 leading-relaxed",
							children: testStatus.message
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2 font-bold text-slate-800 text-xs",
								children: [/* @__PURE__ */ _jsxDEV(HelpCircle, { className: "w-4 h-4 text-emerald-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 13
								}, this), "Googleスプレッドシート連携の3分かんたん手順"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-3 text-xs",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "p-3 bg-white rounded-lg border border-slate-200",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-bold text-emerald-700 mb-1",
											children: "1. シートを開く"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 257,
											columnNumber: 15
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-slate-600 leading-relaxed text-[11px]",
											children: "Googleドライブで新しいスプレッドシートを作成し、メニュー「拡張機能」>「Apps Script」を開きます。"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "p-3 bg-white rounded-lg border border-slate-200",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-bold text-emerald-700 mb-1",
											children: "2. コードを貼る"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 15
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-slate-600 leading-relaxed text-[11px]",
											children: "下記に用意したスクリプトを「コピー」し、Apps Scriptエディタに全選択して貼り付けて保存します。"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 265,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 263,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "p-3 bg-white rounded-lg border border-slate-200",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-bold text-emerald-700 mb-1",
											children: "3. ウェブアプリ公開"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 271,
											columnNumber: 15
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-slate-600 leading-relaxed text-[11px]",
											children: "右上の「デプロイ」>「新しいデプロイ」で「ウェブアプリ」を選択し、アクセス権を「全員」にして公開します。"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 270,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "p-3 bg-white rounded-lg border border-slate-200",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-bold text-emerald-700 mb-1",
											children: "4. URLを登録"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 15
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-slate-600 leading-relaxed text-[11px]",
											children: "発行された「ウェブアプリURL」を上の入力欄に貼り付けて保存すれば完了！自動書き込みが開始されます。"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 279,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-bold text-slate-700",
										children: "貼り付け用スクリプト (Code.gs)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: handleCopyScript,
										className: "px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition shadow-2xs",
										children: [isCopied ? /* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 296,
											columnNumber: 29
										}, this) : /* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 296,
											columnNumber: 82
										}, this), isCopied ? "コピー完了！" : "コードをクリップボードにコピー"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 291,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "max-h-56 overflow-auto bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-[11px] leading-relaxed border border-slate-800",
									children: /* @__PURE__ */ _jsxDEV("pre", { children: sampleScript }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 302,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 249,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800",
							children: /* @__PURE__ */ _jsxDEV(Github, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "font-bold text-slate-900 text-base",
							children: "GitHub & GitHub Pages での公開・運用について"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-500",
							children: "この勤怠管理システムはフロントエンド完結 + GoogleスプレッドシートAPI連携で設計されているため、GitHub PagesやVercel、Cloud Runなどで無料・サーバー管理不要で運用できます。"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-lg",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "font-bold text-sm",
							children: "GitHubにそのままアップロードできるZIPファイル"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 326,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-xs text-slate-300 mt-0.5",
							children: "設定ファイル・画面・自動デプロイ設定をすべて1つのZIPにまとめてダウンロードします。"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: handleDownloadZip,
							disabled: isDownloadingZip,
							className: "px-5 py-2.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition inline-flex items-center gap-2 shadow-sm disabled:opacity-50",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 13
							}, this), isDownloadingZip ? "生成中..." : "プロジェクト全ファイル一括ダウンロード (ZIP)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 331,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 324,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 text-slate-700 leading-relaxed",
						children: [
							/* @__PURE__ */ _jsxDEV("p", { children: [
								"・",
								/* @__PURE__ */ _jsxDEV("strong", { children: "GitHubリポジトリへのプッシュ:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 14
								}, this),
								" プロジェクト一式をGitHubリポジトリに保存すれば、バージョン管理やコードの共有が可能です。"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", { children: [
								"・",
								/* @__PURE__ */ _jsxDEV("strong", { children: "GitHub Pagesでの公開:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 14
								}, this),
								" ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono",
									children: "npm run build"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 49
								}, this),
								" で生成される ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono",
									children: "dist"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 160
								}, this),
								" フォルダをGitHub Pagesにデプロイすることで、タブレットやPCのブラウザからどこでも打刻できます。"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", { children: [
								"・",
								/* @__PURE__ */ _jsxDEV("strong", { children: "スプレッドシート連携:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 14
								}, this),
								" データベースサーバーを契約しなくても、Google Apps Scriptがクラウドデータベースの役割を果たし、全員の打刻を安全に自動集約します。"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 309,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Q29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBGaWxlU3ByZWFkc2hlZXQsXG4gIERvd25sb2FkLFxuICBDb3B5LFxuICBDaGVjayxcbiAgU2VuZCxcbiAgRXh0ZXJuYWxMaW5rLFxuICBHaXRodWIsXG4gIENoZWNrQ2lyY2xlMixcbiAgQWxlcnRDaXJjbGUsXG4gIEhlbHBDaXJjbGUsXG4gIFNwYXJrbGVzLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgR2FzQ29uZmlnIH0gZnJvbSAnLi4vLi4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZSc7XG5pbXBvcnQge1xuICBleHBvcnRBdHRlbmRhbmNlVG9DU1YsXG4gIGV4cG9ydFB1bmNoZXNUb0NTVixcbiAgZ2V0U2FtcGxlR2FzU2NyaXB0LFxuICBzZW5kUHVuY2hUb0dvb2dsZVNoZWV0cyxcbn0gZnJvbSAnLi4vLi4vdXRpbHMvZ2FzU3luYyc7XG5pbXBvcnQgeyBkb3dubG9hZFByb2plY3RaaXAgfSBmcm9tICcuLi8uLi91dGlscy96aXBFeHBvcnQnO1xuXG5leHBvcnQgY29uc3QgQWRtaW5FeHBvcnQ6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbZ2FzQ29uZmlnLCBzZXRHYXNDb25maWddID0gdXNlU3RhdGU8R2FzQ29uZmlnPihzdG9yYWdlLmdldEdhc0NvbmZpZygpKTtcbiAgY29uc3QgW3VybElucHV0LCBzZXRVcmxJbnB1dF0gPSB1c2VTdGF0ZTxzdHJpbmc+KGdhc0NvbmZpZy53ZWJBcHBVcmwpO1xuICBjb25zdCBbYXV0b1N5bmMsIHNldEF1dG9TeW5jXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGdhc0NvbmZpZy5hdXRvU3luY0VuYWJsZWQpO1xuICBjb25zdCBbaXNDb3BpZWQsIHNldElzQ29waWVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2lzRG93bmxvYWRpbmdaaXAsIHNldElzRG93bmxvYWRpbmdaaXBdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbdGVzdFN0YXR1cywgc2V0VGVzdFN0YXR1c10gPSB1c2VTdGF0ZTx7XG4gICAgbG9hZGluZzogYm9vbGVhbjtcbiAgICBzdWNjZXNzPzogYm9vbGVhbjtcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICB9Pih7IGxvYWRpbmc6IGZhbHNlIH0pO1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkWmlwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzRG93bmxvYWRpbmdaaXAodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRvd25sb2FkUHJvamVjdFppcCgncG9jaGlraW4tYXR0ZW5kYW5jZS1jb2RlLnppcCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFsZXJ0KCdaSVDjg5XjgqHjgqTjg6vjga7nlJ/miJDjgavlpLHmlZfjgZfjgb7jgZfjgZ86ICcgKyBTdHJpbmcoZSkpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0Rvd25sb2FkaW5nWmlwKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2FtcGxlU2NyaXB0ID0gZ2V0U2FtcGxlR2FzU2NyaXB0KCk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUdhc0NvbmZpZyA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXBkYXRlZCA9IHN0b3JhZ2UudXBkYXRlR2FzQ29uZmlnKHtcbiAgICAgIHdlYkFwcFVybDogdXJsSW5wdXQudHJpbSgpLFxuICAgICAgYXV0b1N5bmNFbmFibGVkOiBhdXRvU3luYyxcbiAgICB9KTtcbiAgICBzZXRHYXNDb25maWcodXBkYXRlZCk7XG4gICAgYWxlcnQoJ0dvb2dsZSBBcHBzIFNjcmlwdOioreWumuOCkuS/neWtmOOBl+OBvuOBl+OBn+OAgicpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlTY3JpcHQgPSAoKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoc2FtcGxlU2NyaXB0KTtcbiAgICBzZXRJc0NvcGllZCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldElzQ29waWVkKGZhbHNlKSwgMjUwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUnVuVGVzdCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXVybElucHV0LnRyaW0oKSkge1xuICAgICAgYWxlcnQoJ+WFiOOBq0dvb2dsZSBBcHBzIFNjcmlwdOOBruOCpuOCp+ODluOCouODl+ODqlVSTOOCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhOOAgicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFRlc3RTdGF0dXMoeyBsb2FkaW5nOiB0cnVlIH0pO1xuXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB0ZXN0UGF5bG9hZCA9IHtcbiAgICAgIGFjdGlvbjogJ3Rlc3QnIGFzIGNvbnN0LFxuICAgICAgZGF0ZTogbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnamEtSlAnKS5yZXBsYWNlKC8tL2csICcvJyksXG4gICAgICBuYW1lOiAn566h55CG6ICF44OG44K544OIJyxcbiAgICAgIGVtcGxveWVlQ29kZTogJ1RFU1QwMScsXG4gICAgICB0eXBlOiAn5Ye66YCA5Yuk44OG44K544OIJyxcbiAgICAgIHRpbWU6IG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoJ2phLUpQJyksXG4gICAgICBjbG9ja0luOiAnMDk6MDAnLFxuICAgICAgY2xvY2tPdXQ6ICcxODowMCcsXG4gICAgICBicmVha01pbnV0ZXM6IDYwLFxuICAgICAgd29ya0hvdXJzOiAnOC4wJyxcbiAgICAgIG5vdGU6ICdQb2NoaWtpbiDnrqHnkIbnlLvpnaLjgYvjgonjga7mjqXntprjg4bjgrnjg4gnLFxuICAgICAgdGltZXN0YW1wOiBub3cudG9JU09TdHJpbmcoKSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgc2VuZFB1bmNoVG9Hb29nbGVTaGVldHMoXG4gICAgICB7IC4uLmdhc0NvbmZpZywgd2ViQXBwVXJsOiB1cmxJbnB1dC50cmltKCkgfSxcbiAgICAgIHRlc3RQYXlsb2FkXG4gICAgKTtcblxuICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgc3RvcmFnZS51cGRhdGVHYXNDb25maWcoe1xuICAgICAgICBsYXN0U3luY1RpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCdqYS1KUCcpLFxuICAgICAgICBsYXN0U3luY1N0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICBsYXN0U3luY01lc3NhZ2U6ICfjg4bjgrnjg4jpgIHkv6HmiJDlip8nLFxuICAgICAgfSk7XG4gICAgICBzZXRHYXNDb25maWcoc3RvcmFnZS5nZXRHYXNDb25maWcoKSk7XG4gICAgICBzZXRUZXN0U3RhdHVzKHtcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdHb29nbGXjgrnjg5fjg6zjg4Pjg4njgrfjg7zjg4jjgbjjg4bjgrnjg4jjg4fjg7zjgr/jgpLmraPluLjjgavpgIHkv6HjgZfjgb7jgZfjgZ/vvIHjgrnjg5fjg6zjg4Pjg4njgrfjg7zjg4jjgpLjgZTnorroqo3jgY/jgaDjgZXjgYTjgIInLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRlc3RTdGF0dXMoe1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgIOODh+ODvOOCv+WHuuWKmyAmIEdvb2dsZeOCueODl+ODrOODg+ODieOCt+ODvOODiOiHquWLlemAo+aQulxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICDlh7rli6Tjg7vpgIDli6Tjg5zjgr/jg7PjgpLmirzjgZfjgZ/nnqzplpPjgatHb29nbGXjgrnjg5fjg6zjg4Pjg4njgrfjg7zjg4jjgbjoh6rli5XlhaXlipvjgZnjgovoqK3lrprjgajjgIFDU1blh7rlipvjgYzooYzjgYjjgb7jgZnjgIJcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRaaXB9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNEb3dubG9hZGluZ1ppcH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1zbSBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgIHRpdGxlPVwiR2l0SHVi44Ki44OD44OX44Ot44O844OJ55So44Kz44O844OJ5LiA5byP44KSWklQ44Gn44OA44Km44Oz44Ot44O844OJXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R2l0aHViIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICB7aXNEb3dubG9hZGluZ1ppcCA/ICdaSVDnlJ/miJDkuK0uLi4nIDogJ0dpdEh1YueUqOS4gOW8j+ODgOOCpuODs+ODreODvOODiSAoWklQKSd9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZXhwb3J0QXR0ZW5kYW5jZVRvQ1NWKHN0b3JhZ2UuZ2V0QWxsQXR0ZW5kYW5jZSgpLCAncG9jaGlraW5f5Yuk5oCg5a6f57i+5LiA6KanLmNzdicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS01MCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC02MDBcIiAvPlxuICAgICAgICAgICAg5Yuk5oCg5a6f57i+Q1NWXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZXhwb3J0UHVuY2hlc1RvQ1NWKHN0b3JhZ2UuZ2V0QWxsUHVuY2hlcygpLCAncG9jaGlraW5f5YWo5omT5Yi744Ot44KwLmNzdicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS01MCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtdGVhbC02MDBcIiAvPlxuICAgICAgICAgICAg5YWo5omT5Yi744Ot44KwQ1NWXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBHb29nbGUgU2hlZXRzIExpdmUgSW50ZWdyYXRpb24gQm94ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHMgcC02IHNwYWNlLXktNlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHBiLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWVtZXJhbGQtNjAwXCI+XG4gICAgICAgICAgICAgIDxGaWxlU3ByZWFkc2hlZXQgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgdGV4dC1iYXNlXCI+XG4gICAgICAgICAgICAgICAgR29vZ2xl44K544OX44Os44OD44OJ44K344O844OI6Ieq5YuV6YCj5pC6IChHQVMgV2ViaG9vaylcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgIOWHuuWLpOODu+mAgOWLpOaJk+WIu+aZguOBq+OAjOaXpeS7mOOAjeOAjOawj+WQjeOAjeOAjOWHuuWLpOaZguWIu+OAjeOAjOmAgOWLpOaZguWIu+OAjeOAjOWun+WDjeaZgumWk+OAjeOCkuWNs+W6p+OBq+OCueODl+ODrOODg+ODieOCt+ODvOODiOOBuOi/veiomOOBl+OBvuOBmeOAglxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgIGdhc0NvbmZpZy53ZWJBcHBVcmxcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtODAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTEwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtnYXNDb25maWcud2ViQXBwVXJsID8gJ+KXjyDpgKPmkLrmnInlirknIDogJ+acquioreWumid9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVVJMIEZvcm0gKi99XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTYXZlR2FzQ29uZmlnfSBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwIG1iLTEuNVwiPlxuICAgICAgICAgICAgICBHb29nbGUgQXBwcyBTY3JpcHQg44Km44Kn44OW44Ki44OX44OqVVJMIChleGVjIFVSTClcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInVybFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3VybElucHV0fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXJsSW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2IuLi4vZXhlY1wiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHRleHQteHMgZm9udC1tb25vIHB4LTMuNSBweS0yLjUgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctZW1lcmFsZC01MDAgZm9jdXM6Ymctd2hpdGVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yLjUgdGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTcwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24gc2hhZG93LTJ4cyB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBVUkzjgpLkv53lrZhcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIGN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgY2hlY2tlZD17YXV0b1N5bmN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRBdXRvU3luYyhlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkIHRleHQtZW1lcmFsZC02MDAgZm9jdXM6cmluZy1lbWVyYWxkLTUwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIOWHuuWLpOODu+mAgOWLpOODnOOCv+ODs+OCkuaKvOOBl+OBn+aZguOBq+iHquWLleOBp+OCueODl+ODrOODg+ODieOCt+ODvOODiOOBuOmAgeS/oeOBmeOCi1xuICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUnVuVGVzdH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Rlc3RTdGF0dXMubG9hZGluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC03MDAgYmctZW1lcmFsZC01MCBob3ZlcjpiZy1lbWVyYWxkLTEwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICB7dGVzdFN0YXR1cy5sb2FkaW5nID8gJ+mAgeS/oeS4rS4uLicgOiAn44K544OX44Os44OD44OJ44K344O844OI6YCB5L+h44OG44K544OI44KS5a6f6KGMJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgey8qIFRlc3QgUmVzdWx0IEFsZXJ0ICovfVxuICAgICAgICB7dGVzdFN0YXR1cy5tZXNzYWdlICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC1sZyBib3JkZXIgdGV4dC14cyBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zICR7XG4gICAgICAgICAgICAgIHRlc3RTdGF0dXMuc3VjY2Vzc1xuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNTAgYm9yZGVyLWVtZXJhbGQtMjAwIHRleHQtZW1lcmFsZC05MDAnXG4gICAgICAgICAgICAgICAgOiAnYmctcm9zZS01MCBib3JkZXItcm9zZS0yMDAgdGV4dC1yb3NlLTkwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0ZXN0U3RhdHVzLnN1Y2Nlc3MgPyAoXG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNjAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8QWxlcnRDaXJjbGUgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXJvc2UtNjAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbGVhZGluZy1yZWxheGVkXCI+e3Rlc3RTdGF0dXMubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogNC1TdGVwIEluc3RydWN0aW9ucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBwLTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICA8SGVscENpcmNsZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC02MDBcIiAvPlxuICAgICAgICAgICAgR29vZ2xl44K544OX44Os44OD44OJ44K344O844OI6YCj5pC644GuM+WIhuOBi+OCk+OBn+OCk+aJi+mghlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1lbWVyYWxkLTcwMCBtYi0xXCI+MS4g44K344O844OI44KS6ZaL44GPPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGxlYWRpbmctcmVsYXhlZCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgIEdvb2dsZeODieODqeOCpOODluOBp+aWsOOBl+OBhOOCueODl+ODrOODg+ODieOCt+ODvOODiOOCkuS9nOaIkOOBl+OAgeODoeODi+ODpeODvOOAjOaLoeW8teapn+iDveOAjSZndDvjgIxBcHBzIFNjcmlwdOOAjeOCkumWi+OBjeOBvuOBmeOAglxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNzAwIG1iLTFcIj4yLiDjgrPjg7zjg4njgpLosrzjgos8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgbGVhZGluZy1yZWxheGVkIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAg5LiL6KiY44Gr55So5oSP44GX44Gf44K544Kv44Oq44OX44OI44KS44CM44Kz44OU44O844CN44GX44CBQXBwcyBTY3JpcHTjgqjjg4fjgqPjgr/jgavlhajpgbjmip7jgZfjgabosrzjgorku5jjgZHjgabkv53lrZjjgZfjgb7jgZnjgIJcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1lbWVyYWxkLTcwMCBtYi0xXCI+My4g44Km44Kn44OW44Ki44OX44Oq5YWs6ZaLPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGxlYWRpbmctcmVsYXhlZCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgIOWPs+S4iuOBruOAjOODh+ODl+ODreOCpOOAjSZndDvjgIzmlrDjgZfjgYTjg4fjg5fjg63jgqTjgI3jgafjgIzjgqbjgqfjg5bjgqLjg5fjg6rjgI3jgpLpgbjmip7jgZfjgIHjgqLjgq/jgrvjgrnmqKnjgpLjgIzlhajlk6HjgI3jgavjgZfjgablhazplovjgZfjgb7jgZnjgIJcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1lbWVyYWxkLTcwMCBtYi0xXCI+NC4gVVJM44KS55m76YyyPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGxlYWRpbmctcmVsYXhlZCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgIOeZuuihjOOBleOCjOOBn+OAjOOCpuOCp+ODluOCouODl+ODqlVSTOOAjeOCkuS4iuOBruWFpeWKm+ashOOBq+iyvOOCiuS7mOOBkeOBpuS/neWtmOOBmeOCjOOBsOWujOS6hu+8geiHquWLleabuOOBjei+vOOBv+OBjOmWi+Wni+OBleOCjOOBvuOBmeOAglxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDb3B5IFNjcmlwdCBCb3ggKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAg6LK844KK5LuY44GR55So44K544Kv44Oq44OX44OIIChDb2RlLmdzKVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5U2NyaXB0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwIGJnLXdoaXRlIGhvdmVyOmJnLXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24gc2hhZG93LTJ4c1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNDb3BpZWQgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTYwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICB7aXNDb3BpZWQgPyAn44Kz44OU44O85a6M5LqG77yBJyA6ICfjgrPjg7zjg4njgpLjgq/jg6rjg4Pjg5fjg5zjg7zjg4njgavjgrPjg5Tjg7wnfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTU2IG92ZXJmbG93LWF1dG8gYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtMTAwIHAtNCByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSBsZWFkaW5nLXJlbGF4ZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPHByZT57c2FtcGxlU2NyaXB0fTwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBHaXRIdWIgJiBIb3N0aW5nIEluZm9ybWF0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHMgcC02IHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1sZyBiZy1zbGF0ZS0xMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxHaXRodWIgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgdGV4dC1iYXNlXCI+XG4gICAgICAgICAgICAgIEdpdEh1YiAmIEdpdEh1YiBQYWdlcyDjgafjga7lhazplovjg7vpgYvnlKjjgavjgaTjgYTjgaZcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIOOBk+OBruWLpOaAoOeuoeeQhuOCt+OCueODhuODoOOBr+ODleODreODs+ODiOOCqOODs+ODieWujOe1kCArIEdvb2dsZeOCueODl+ODrOODg+ODieOCt+ODvOODiEFQSemAo+aQuuOBp+ioreioiOOBleOCjOOBpuOBhOOCi+OBn+OCgeOAgUdpdEh1YiBQYWdlc+OChFZlcmNlbOOAgUNsb3VkIFJ1buOBquOBqeOBp+eEoeaWmeODu+OCteODvOODkOODvOeuoeeQhuS4jeimgeOBp+mBi+eUqOOBp+OBjeOBvuOBmeOAglxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcC00IGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbVwiPkdpdEh1YuOBq+OBneOBruOBvuOBvuOCouODg+ODl+ODreODvOODieOBp+OBjeOCi1pJUOODleOCoeOCpOODqzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICDoqK3lrprjg5XjgqHjgqTjg6vjg7vnlLvpnaLjg7voh6rli5Xjg4fjg5fjg63jgqToqK3lrprjgpLjgZnjgbnjgaYx44Gk44GuWklQ44Gr44G+44Go44KB44Gm44OA44Km44Oz44Ot44O844OJ44GX44G+44GZ44CCXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkWmlwfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRG93bmxvYWRpbmdaaXB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBiZy1lbWVyYWxkLTQwMCBob3ZlcjpiZy1lbWVyYWxkLTMwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy1zbSBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICB7aXNEb3dubG9hZGluZ1ppcCA/ICfnlJ/miJDkuK0uLi4nIDogJ+ODl+ODreOCuOOCp+OCr+ODiOWFqOODleOCoeOCpOODq+S4gOaLrOODgOOCpuODs+ODreODvOODiSAoWklQKSd9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC14cyBzcGFjZS15LTIgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICDjg7s8c3Ryb25nPkdpdEh1YuODquODneOCuOODiOODquOBuOOBruODl+ODg+OCt+ODpTo8L3N0cm9uZz4g44OX44Ot44K444Kn44Kv44OI5LiA5byP44KSR2l0SHVi44Oq44Od44K444OI44Oq44Gr5L+d5a2Y44GZ44KM44Gw44CB44OQ44O844K444On44Oz566h55CG44KE44Kz44O844OJ44Gu5YWx5pyJ44GM5Y+v6IO944Gn44GZ44CCXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAg44O7PHN0cm9uZz5HaXRIdWIgUGFnZXPjgafjga7lhazplos6PC9zdHJvbmc+IDxjb2RlIGNsYXNzTmFtZT1cImJnLXdoaXRlIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBmb250LW1vbm9cIj5ucG0gcnVuIGJ1aWxkPC9jb2RlPiDjgafnlJ/miJDjgZXjgozjgosgPGNvZGUgY2xhc3NOYW1lPVwiYmctd2hpdGUgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGZvbnQtbW9ub1wiPmRpc3Q8L2NvZGU+IOODleOCqeODq+ODgOOCkkdpdEh1YiBQYWdlc+OBq+ODh+ODl+ODreOCpOOBmeOCi+OBk+OBqOOBp+OAgeOCv+ODluODrOODg+ODiOOChFBD44Gu44OW44Op44Km44K244GL44KJ44Gp44GT44Gn44KC5omT5Yi744Gn44GN44G+44GZ44CCXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAg44O7PHN0cm9uZz7jgrnjg5fjg6zjg4Pjg4njgrfjg7zjg4jpgKPmkLo6PC9zdHJvbmc+IOODh+ODvOOCv+ODmeODvOOCueOCteODvOODkOODvOOCkuWlkee0hOOBl+OBquOBj+OBpuOCguOAgUdvb2dsZSBBcHBzIFNjcmlwdOOBjOOCr+ODqeOCpuODieODh+ODvOOCv+ODmeODvOOCueOBruW9ueWJsuOCkuaenOOBn+OBl+OAgeWFqOWToeOBruaJk+WIu+OCkuWuieWFqOOBq+iHquWLlembhue0hOOBl+OBvuOBmeOAglxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=