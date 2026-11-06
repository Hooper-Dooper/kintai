const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { Users, Clock, CalendarCheck, FileSpreadsheet, ArrowRight, ShieldCheck } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminTop.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminTop = ({ onNavigate }) => {
	const users = storage.getActiveEmployees();
	const allAttendance = storage.getAllAttendance();
	const allPunches = storage.getAllPunches();
	const settings = storage.getSettings();
	const gasConfig = storage.getGasConfig();
	const todayStr = new Date().toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).replace(/-/g, "/");
	const todayRecords = allAttendance.filter((a) => a.date === todayStr);
	const workingCount = todayRecords.filter((a) => a.status === "working").length;
	const breakCount = todayRecords.filter((a) => a.status === "on_break").length;
	const completedCount = todayRecords.filter((a) => a.status === "completed").length;
	const notClockedCount = Math.max(0, users.length - todayRecords.length);
	// Recent 8 punches
	const recentPunches = allPunches.slice(0, 8);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider",
						children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-600" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pochikin 管理ダッシュボード" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xl sm:text-2xl font-bold text-slate-900 mt-1",
						children: settings.facilityName
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-slate-500 mt-1",
						children: [
							"本日: ",
							/* @__PURE__ */ _jsxDEV("span", {
								className: "font-semibold text-slate-800",
								children: todayStr
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 17
							}, this),
							" · 登録スタッフ: ",
							users.length,
							"名"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs",
					children: [
						/* @__PURE__ */ _jsxDEV(FileSpreadsheet, { className: "w-5 h-5 text-emerald-600 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "font-bold text-slate-800",
							children: "Googleスプレッドシート連携"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-[11px] text-slate-500",
							children: gasConfig.webAppUrl ? /* @__PURE__ */ _jsxDEV("span", {
								className: "text-emerald-700 font-semibold",
								children: [
									"● 連携中 (",
									gasConfig.lastSyncStatus,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 17
							}, this) : /* @__PURE__ */ _jsxDEV("span", {
								className: "text-amber-700 font-medium",
								children: "未設定 (「データ出力」から設定)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => onNavigate("export"),
							className: "ml-2 text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-0.5 text-xs",
							children: ["設定 ", /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "w-3 h-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 16
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl p-4 border border-slate-200 shadow-2xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-medium text-slate-500",
									children: "勤務中"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 76,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 77,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 text-3xl font-extrabold text-slate-900 font-mono-num",
								children: [workingCount, /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-normal text-slate-500 ml-1",
									children: "名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-emerald-700 mt-1",
								children: "現在実働中"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl p-4 border border-slate-200 shadow-2xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-medium text-slate-500",
									children: "休憩中"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 text-3xl font-extrabold text-slate-900 font-mono-num",
								children: [breakCount, /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-normal text-slate-500 ml-1",
									children: "名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-amber-700 mt-1",
								children: "休憩時間中"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl p-4 border border-slate-200 shadow-2xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-medium text-slate-500",
									children: "退勤済"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Clock, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 101,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 text-3xl font-extrabold text-slate-900 font-mono-num",
								children: [completedCount, /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-normal text-slate-500 ml-1",
									children: "名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-slate-500 mt-1",
								children: "本日の業務完了"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl p-4 border border-slate-200 shadow-2xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-medium text-slate-500",
									children: "未出勤"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Users, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 113,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 text-3xl font-extrabold text-slate-900 font-mono-num",
								children: [notClockedCount, /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-normal text-slate-500 ml-1",
									children: "名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-slate-400 mt-1",
								children: "休みまたは出勤前"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "px-5 py-4 border-b border-slate-200 flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(CalendarCheck, { className: "w-5 h-5 text-[#31828f]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "本日のスタッフ出退勤状況"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => onNavigate("correction"),
							className: "text-xs font-semibold text-[#31828f] hover:underline inline-flex items-center gap-1",
							children: ["打刻データ修正へ ", /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 24
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "divide-y divide-slate-100",
						children: users.map((u) => {
							const rec = todayRecords.find((r) => r.userId === u.id);
							const status = rec?.status || "not_started";
							return /* @__PURE__ */ _jsxDEV("div", {
								className: "p-4 flex items-center justify-between hover:bg-slate-50/60 transition",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs",
										children: u.name.substring(0, 1)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "font-bold text-slate-900 text-sm flex items-center gap-2",
										children: [u.name, /* @__PURE__ */ _jsxDEV("span", {
											className: "text-[11px] font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded",
											children: u.department
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs text-slate-500 font-mono-num mt-0.5",
										children: ["社員番号: ", u.employeeCode]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-4 text-xs font-mono-num",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-right",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "text-slate-700 font-semibold",
											children: rec?.clockIn ? `出勤 ${rec.clockIn}` : "出勤前"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 166,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-slate-500 text-[11px]",
											children: rec?.clockOut ? `退勤 ${rec.clockOut}` : rec?.clockIn ? "勤務中" : "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 169,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 165,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `px-2.5 py-1 rounded text-xs font-bold font-sans ${status === "working" ? "bg-emerald-100 text-emerald-800" : status === "on_break" ? "bg-amber-100 text-amber-800" : status === "completed" ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-400"}`,
										children: status === "working" ? "勤務中" : status === "on_break" ? "休憩中" : status === "completed" ? "退勤済" : "未出勤"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this)]
							}, u.id, true, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "px-5 py-4 border-b border-slate-200 flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Clock, { className: "w-5 h-5 text-slate-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "最新の打刻ログ"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => onNavigate("correction"),
							className: "text-xs text-slate-500 hover:text-slate-800 font-medium",
							children: "全件"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "p-4 space-y-3 flex-1 overflow-auto max-h-[420px]",
						children: recentPunches.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
							className: "text-center text-slate-400 text-xs py-8",
							children: "打刻データがありません"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 15
						}, this) : recentPunches.map((p) => {
							const isClockIn = p.type === "clock_in" || p.type === "direct_in";
							const isClockOut = p.type === "clock_out" || p.type === "direct_out";
							return /* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "font-bold text-slate-800",
									children: p.employeeName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 23
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "text-[11px] text-slate-500 font-mono-num",
									children: [
										p.date,
										" ",
										p.time
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: `px-2 py-0.5 rounded font-bold ${isClockIn ? "bg-teal-100 text-teal-800" : isClockOut ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`,
									children: p.type === "clock_in" ? "出勤" : p.type === "clock_out" ? "退勤" : p.type === "break" ? "休憩" : p.type === "direct_in" ? "直行" : "直帰"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 21
								}, this)]
							}, p.id, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 19
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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VUFBRSxFQUFFO1NBQ1Q7Ozs7O2dCQUNGOzs7O2tCQUVMLHdCQUFDLFFBQUQ7U0FDRSxXQUFXLGlDQUNULFlBQ0ksOEJBQ0EsYUFDQSw4QkFDQTttQkFHTCxFQUFFLFNBQVMsYUFDUixPQUNBLEVBQUUsU0FBUyxjQUNYLE9BQ0EsRUFBRSxTQUFTLFVBQ1gsT0FDQSxFQUFFLFNBQVMsY0FDWCxPQUNBO1FBQ0E7Ozs7Z0JBQ0g7VUEzQkssRUFBRTs7OztjQTJCUDtNQUVULENBQUM7S0FFQTs7OzthQUNGOzs7OztZQUNGOzs7Ozs7RUFDRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQWRtaW5Ub3AudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVc2VycywgQ2xvY2ssIEFsZXJ0VHJpYW5nbGUsIENhbGVuZGFyQ2hlY2ssIEZpbGVTcHJlYWRzaGVldCwgQXJyb3dSaWdodCwgU2hpZWxkQ2hlY2sgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQWRtaW5NZW51S2V5IH0gZnJvbSAnLi4vLi4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5cbmludGVyZmFjZSBBZG1pblRvcFByb3BzIHtcbiAgb25OYXZpZ2F0ZTogKHRhYjogQWRtaW5NZW51S2V5KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQWRtaW5Ub3A6IFJlYWN0LkZDPEFkbWluVG9wUHJvcHM+ID0gKHsgb25OYXZpZ2F0ZSB9KSA9PiB7XG4gIGNvbnN0IHVzZXJzID0gc3RvcmFnZS5nZXRBY3RpdmVFbXBsb3llZXMoKTtcbiAgY29uc3QgYWxsQXR0ZW5kYW5jZSA9IHN0b3JhZ2UuZ2V0QWxsQXR0ZW5kYW5jZSgpO1xuICBjb25zdCBhbGxQdW5jaGVzID0gc3RvcmFnZS5nZXRBbGxQdW5jaGVzKCk7XG4gIGNvbnN0IHNldHRpbmdzID0gc3RvcmFnZS5nZXRTZXR0aW5ncygpO1xuICBjb25zdCBnYXNDb25maWcgPSBzdG9yYWdlLmdldEdhc0NvbmZpZygpO1xuXG4gIGNvbnN0IHRvZGF5U3RyID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2phLUpQJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJzItZGlnaXQnLFxuICAgIGRheTogJzItZGlnaXQnLFxuICB9KS5yZXBsYWNlKC8tL2csICcvJyk7XG5cbiAgY29uc3QgdG9kYXlSZWNvcmRzID0gYWxsQXR0ZW5kYW5jZS5maWx0ZXIoKGEpID0+IGEuZGF0ZSA9PT0gdG9kYXlTdHIpO1xuXG4gIGNvbnN0IHdvcmtpbmdDb3VudCA9IHRvZGF5UmVjb3Jkcy5maWx0ZXIoKGEpID0+IGEuc3RhdHVzID09PSAnd29ya2luZycpLmxlbmd0aDtcbiAgY29uc3QgYnJlYWtDb3VudCA9IHRvZGF5UmVjb3Jkcy5maWx0ZXIoKGEpID0+IGEuc3RhdHVzID09PSAnb25fYnJlYWsnKS5sZW5ndGg7XG4gIGNvbnN0IGNvbXBsZXRlZENvdW50ID0gdG9kYXlSZWNvcmRzLmZpbHRlcigoYSkgPT4gYS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnKS5sZW5ndGg7XG4gIGNvbnN0IG5vdENsb2NrZWRDb3VudCA9IE1hdGgubWF4KDAsIHVzZXJzLmxlbmd0aCAtIHRvZGF5UmVjb3Jkcy5sZW5ndGgpO1xuXG4gIC8vIFJlY2VudCA4IHB1bmNoZXNcbiAgY29uc3QgcmVjZW50UHVuY2hlcyA9IGFsbFB1bmNoZXMuc2xpY2UoMCwgOCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIFdlbGNvbWUgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHAtNiBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MCBzaGFkb3ctMnhzIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC02MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UG9jaGlraW4g566h55CG44OA44OD44K344Ol44Oc44O844OJPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBtdC0xXCI+XG4gICAgICAgICAgICB7c2V0dGluZ3MuZmFjaWxpdHlOYW1lfVxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICDmnKzml6U6IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj57dG9kYXlTdHJ9PC9zcGFuPiDCtyDnmbvpjLLjgrnjgr/jg4Pjg5U6IHt1c2Vycy5sZW5ndGh95ZCNXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR0FTIFN5bmMgc3RhdHVzIHF1aWNrIGNhcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcC0zIGJnLXNsYXRlLTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC14c1wiPlxuICAgICAgICAgIDxGaWxlU3ByZWFkc2hlZXQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNjAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5Hb29nbGXjgrnjg5fjg6zjg4Pjg4njgrfjg7zjg4jpgKPmkLo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAge2dhc0NvbmZpZy53ZWJBcHBVcmwgPyAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTcwMCBmb250LXNlbWlib2xkXCI+4pePIOmAo+aQuuS4rSAoe2dhc0NvbmZpZy5sYXN0U3luY1N0YXR1c30pPC9zcGFuPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNzAwIGZvbnQtbWVkaXVtXCI+5pyq6Kit5a6aICjjgIzjg4fjg7zjgr/lh7rlipvjgI3jgYvjgonoqK3lrpopPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgnZXhwb3J0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtbC0yIHRleHQtaW5kaWdvLTYwMCBob3Zlcjp0ZXh0LWluZGlnby04MDAgZm9udC1zZW1pYm9sZCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTAuNSB0ZXh0LXhzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDoqK3lrpogPEFycm93UmlnaHQgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBLUEkgQ2FyZHMgU3RyaXAgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS01MDBcIj7li6Tli5nkuK08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LTN4bCBmb250LWV4dHJhYm9sZCB0ZXh0LXNsYXRlLTkwMCBmb250LW1vbm8tbnVtXCI+XG4gICAgICAgICAgICB7d29ya2luZ0NvdW50fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTUwMCBtbC0xXCI+5ZCNPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1lbWVyYWxkLTcwMCBtdC0xXCI+54++5Zyo5a6f5YON5LitPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNTAwXCI+5LyR5oap5LitPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQtM3hsIGZvbnQtZXh0cmFib2xkIHRleHQtc2xhdGUtOTAwIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgIHticmVha0NvdW50fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTUwMCBtbC0xXCI+5ZCNPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1hbWJlci03MDAgbXQtMVwiPuS8keaGqeaZgumWk+S4rTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTUwMFwiPumAgOWLpOa4iDwvc3Bhbj5cbiAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgdGV4dC0zeGwgZm9udC1leHRyYWJvbGQgdGV4dC1zbGF0ZS05MDAgZm9udC1tb25vLW51bVwiPlxuICAgICAgICAgICAge2NvbXBsZXRlZENvdW50fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTUwMCBtbC0xXCI+5ZCNPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgbXQtMVwiPuacrOaXpeOBrualreWLmeWujOS6hjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTUwMFwiPuacquWHuuWLpDwvc3Bhbj5cbiAgICAgICAgICAgIDxVc2VycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgdGV4dC0zeGwgZm9udC1leHRyYWJvbGQgdGV4dC1zbGF0ZS05MDAgZm9udC1tb25vLW51bVwiPlxuICAgICAgICAgICAge25vdENsb2NrZWRDb3VudH1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ub3JtYWwgdGV4dC1zbGF0ZS01MDAgbWwtMVwiPuWQjTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj7kvJHjgb/jgb7jgZ/jga/lh7rli6TliY08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gMi1Db2x1bW4gU3BsaXQ6IFRvZGF5J3MgU3RhdHVzICYgUmVjZW50IFB1bmNoIFN0cmVhbSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICB7LyogVG9kYXkncyBTdGFmZiBTdGF0dXMgTGlzdCAoMiBDb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0yIGJnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4cyBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTUgcHktNCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXJDaGVjayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtWyMzMTgyOGZdXCIgLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtXCI+5pys5pel44Gu44K544K/44OD44OV5Ye66YCA5Yuk54q25rOBPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdjb3JyZWN0aW9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LVsjMzE4MjhmXSBob3Zlcjp1bmRlcmxpbmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg5omT5Yi744OH44O844K/5L+u5q2j44G4IDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICB7dXNlcnMubWFwKCh1KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlYyA9IHRvZGF5UmVjb3Jkcy5maW5kKChyKSA9PiByLnVzZXJJZCA9PT0gdS5pZCk7XG4gICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHJlYz8uc3RhdHVzIHx8ICdub3Rfc3RhcnRlZCc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dS5pZH0gY2xhc3NOYW1lPVwicC00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBob3ZlcjpiZy1zbGF0ZS01MC82MCB0cmFuc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtMTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTcwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3UubmFtZS5zdWJzdHJpbmcoMCwgMSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt1Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTUwMCBiZy1zbGF0ZS0xMDAgcHgtMiBweS0wLjUgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dS5kZXBhcnRtZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8tbnVtIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg56S+5ZOh55Wq5Y+3OiB7dS5lbXBsb3llZUNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgdGV4dC14cyBmb250LW1vbm8tbnVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JlYz8uY2xvY2tJbiA/IGDlh7rli6QgJHtyZWMuY2xvY2tJbn1gIDogJ+WHuuWLpOWJjSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JlYz8uY2xvY2tPdXQgPyBg6YCA5YukICR7cmVjLmNsb2NrT3V0fWAgOiByZWM/LmNsb2NrSW4gPyAn5Yuk5YuZ5LitJyA6ICctJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkIHRleHQteHMgZm9udC1ib2xkIGZvbnQtc2FucyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0dXMgPT09ICdvbl9icmVhaydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0YXR1cyA9PT0gJ2NvbXBsZXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ+WLpOWLmeS4rSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc3RhdHVzID09PSAnb25fYnJlYWsnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICfkvJHmhqnkuK0nXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHN0YXR1cyA9PT0gJ2NvbXBsZXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ+mAgOWLpOa4iCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ+acquWHuuWLpCd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZWFsLXRpbWUgUHVuY2ggQWN0aXZpdHkgRmVlZCAoMSBDb2wpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4cyBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNSBweS00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtc2xhdGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtXCI+5pyA5paw44Gu5omT5Yi744Ot44KwPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdjb3JyZWN0aW9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS04MDAgZm9udC1tZWRpdW1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDlhajku7ZcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc3BhY2UteS0zIGZsZXgtMSBvdmVyZmxvdy1hdXRvIG1heC1oLVs0MjBweF1cIj5cbiAgICAgICAgICAgIHtyZWNlbnRQdW5jaGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzIHB5LThcIj5cbiAgICAgICAgICAgICAgICDmiZPliLvjg4fjg7zjgr/jgYzjgYLjgorjgb7jgZvjgpNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICByZWNlbnRQdW5jaGVzLm1hcCgocCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ2xvY2tJbiA9IHAudHlwZSA9PT0gJ2Nsb2NrX2luJyB8fCBwLnR5cGUgPT09ICdkaXJlY3RfaW4nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ2xvY2tPdXQgPSBwLnR5cGUgPT09ICdjbG9ja19vdXQnIHx8IHAudHlwZSA9PT0gJ2RpcmVjdF9vdXQnO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwLmlkfSBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtNTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtODAwXCI+e3AuZW1wbG95ZWVOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vLW51bVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3AuZGF0ZX0ge3AudGltZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNDbG9ja0luXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXRlYWwtMTAwIHRleHQtdGVhbC04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNDbG9ja091dFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTEwMCB0ZXh0LXJvc2UtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7cC50eXBlID09PSAnY2xvY2tfaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICflh7rli6QnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHAudHlwZSA9PT0gJ2Nsb2NrX291dCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ+mAgOWLpCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcC50eXBlID09PSAnYnJlYWsnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICfkvJHmhqknXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHAudHlwZSA9PT0gJ2RpcmVjdF9pbidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ+ebtOihjCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ+ebtOW4sCd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==