const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useMemo = __vite__cjsImport0_react["useMemo"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { X, Calendar, Clock, Download, User as UserIcon } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { exportAttendanceToCSV } from "/src/utils/gasSync.ts";
var _jsxFileName = "/app/applet/src/components/HistoryModal.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const HistoryModal = ({ isOpen, onClose, selectedUserId, users }) => {
	const [filterUserId, setFilterUserId] = useState(selectedUserId || "all");
	const [selectedMonth, setSelectedMonth] = useState("2026/11");
	// Synchronize initial user if selectedUserId changed
	React.useEffect(() => {
		if (selectedUserId) {
			setFilterUserId(selectedUserId);
		}
	}, [selectedUserId]);
	const allAttendance = storage.getAllAttendance();
	// Extract distinct available months from attendance
	const availableMonths = useMemo(() => {
		const set = new Set();
		allAttendance.forEach((a) => {
			const ym = a.date.substring(0, 7);
			set.add(ym);
		});
		const arr = Array.from(set).sort().reverse();
		return arr.length > 0 ? arr : ["2026/11", "2026/10"];
	}, [allAttendance]);
	// Filter records
	const filteredRecords = useMemo(() => {
		return allAttendance.filter((rec) => {
			const matchUser = filterUserId === "all" || rec.userId === filterUserId;
			const matchMonth = selectedMonth === "all" || rec.date.startsWith(selectedMonth);
			return matchUser && matchMonth;
		});
	}, [
		allAttendance,
		filterUserId,
		selectedMonth
	]);
	// Aggregate stats
	const stats = useMemo(() => {
		const totalDays = filteredRecords.length;
		const totalWorkMinutes = filteredRecords.reduce((sum, r) => sum + (r.totalWorkMinutes || 0), 0);
		const totalOvertimeMinutes = filteredRecords.reduce((sum, r) => sum + (r.overtimeMinutes || 0), 0);
		const totalBreakMinutes = filteredRecords.reduce((sum, r) => sum + (r.breakMinutes || 0), 0);
		const workHours = (totalWorkMinutes / 60).toFixed(1);
		const overtimeHours = (totalOvertimeMinutes / 60).toFixed(1);
		return {
			totalDays,
			workHours,
			overtimeHours,
			totalBreakMinutes
		};
	}, [filteredRecords]);
	if (!isOpen) return null;
	const handleExportCSV = () => {
		const userName = users.find((u) => u.id === filterUserId)?.name || "全体";
		exportAttendanceToCSV(filteredRecords, `勤怠履歴_${userName}_${selectedMonth.replace("/", "-")}.csv`);
	};
	const getDayOfWeek = (dateStr) => {
		const parts = dateStr.split("/");
		if (parts.length === 3) {
			const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
			const days = [
				"日",
				"月",
				"火",
				"水",
				"木",
				"金",
				"土"
			];
			const day = d.getDay();
			return {
				text: days[day],
				isWeekend: day === 0 || day === 6,
				isSunday: day === 0
			};
		}
		return {
			text: "",
			isWeekend: false,
			isSunday: false
		};
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ _jsxDEV(Calendar, { className: "w-5 h-5 text-[#45a4be]" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-bold tracking-tight",
							children: "過去の勤怠ログ閲覧"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: "すべての打刻実績・実働時間の記録を確認できます"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV("button", {
							onClick: handleExportCSV,
							className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition",
							title: "CSV形式でダウンロード",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 15
							}, this), "CSV出力"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: onClose,
							className: "p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition",
							"aria-label": "閉じる",
							children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ _jsxDEV(UserIcon, { className: "w-4 h-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-medium text-slate-600",
									children: "表示対象:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("select", {
									value: filterUserId,
									onChange: (e) => setFilterUserId(e.target.value),
									className: "text-xs font-medium bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "all",
										children: "全スタッフ一覧"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 17
									}, this), users.map((u) => /* @__PURE__ */ _jsxDEV("option", {
										value: u.id,
										children: [
											u.name,
											" (",
											u.employeeCode,
											")"
										]
									}, u.id, true, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 19
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ _jsxDEV(Calendar, { className: "w-4 h-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-medium text-slate-600",
									children: "対象年月:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("select", {
									value: selectedMonth,
									onChange: (e) => setSelectedMonth(e.target.value),
									className: "text-xs font-medium bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "all",
										children: "全期間 (すべて)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 17
									}, this), availableMonths.map((m) => /* @__PURE__ */ _jsxDEV("option", {
										value: m,
										children: [m.replace("/", "年"), "月"]
									}, m, true, {
										fileName: _jsxFileName,
										lineNumber: 153,
										columnNumber: 19
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "text-xs text-slate-500 font-mono-num",
						children: [
							"該当データ: ",
							/* @__PURE__ */ _jsxDEV("span", {
								className: "font-bold text-slate-800",
								children: filteredRecords.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 20
							}, this),
							" 件"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-3 bg-white border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-medium text-slate-500",
								children: "出勤日数"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-0.5 text-lg font-bold text-slate-900 font-mono-num",
								children: [
									stats.totalDays,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-slate-600",
										children: "日"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 33
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-2.5 rounded-xl bg-teal-50/60 border border-teal-200/60",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-medium text-teal-800",
								children: "総実働時間"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-0.5 text-lg font-bold text-teal-900 font-mono-num",
								children: [
									stats.workHours,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-teal-700",
										children: "時間"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 33
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-medium text-amber-800",
								children: "時間外残業"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-0.5 text-lg font-bold text-amber-900 font-mono-num",
								children: [
									stats.overtimeHours,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-amber-700",
										children: "時間"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 37
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200/60",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-medium text-indigo-800",
								children: "合計休憩"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-0.5 text-lg font-bold text-indigo-900 font-mono-num",
								children: [
									stats.totalBreakMinutes,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-indigo-700",
										children: "分"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 190,
										columnNumber: 41
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex-1 overflow-auto p-4 sm:p-6",
					children: filteredRecords.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
						className: "h-48 flex flex-col items-center justify-center text-slate-400 text-sm",
						children: [/* @__PURE__ */ _jsxDEV(Clock, { className: "w-10 h-10 mb-2 stroke-1 text-slate-300" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 15
						}, this), "対象期間の勤怠ログは見つかりませんでした。"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 13
					}, this) : /* @__PURE__ */ _jsxDEV("div", {
						className: "border border-slate-200 rounded-xl overflow-hidden shadow-2xs",
						children: /* @__PURE__ */ _jsxDEV("table", {
							className: "w-full text-left text-xs border-collapse",
							children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
								className: "bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 select-none",
								children: [
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "日付"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 21
									}, this),
									filterUserId === "all" && /* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "氏名"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "出勤時刻"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "退勤時刻"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "休憩"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 213,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "実働時間"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "残業"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "状態"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 whitespace-nowrap",
										children: "備考 / 修正"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("tbody", {
								className: "divide-y divide-slate-100 font-mono-num",
								children: filteredRecords.map((r) => {
									const dayInfo = getDayOfWeek(r.date);
									const workHours = (r.totalWorkMinutes / 60).toFixed(1);
									const overtimeHours = (r.overtimeMinutes / 60).toFixed(1);
									return /* @__PURE__ */ _jsxDEV("tr", {
										className: `hover:bg-slate-50/80 transition-colors ${dayInfo.isSunday ? "bg-rose-50/30" : dayInfo.isWeekend ? "bg-blue-50/30" : ""}`,
										children: [
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap font-medium text-slate-900",
												children: [
													r.date,
													" ",
													/* @__PURE__ */ _jsxDEV("span", {
														className: `font-sans font-bold text-[11px] ${dayInfo.isSunday ? "text-rose-600" : dayInfo.isWeekend ? "text-blue-600" : "text-slate-500"}`,
														children: [
															"(",
															dayInfo.text,
															")"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 235,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 233,
												columnNumber: 25
											}, this),
											filterUserId === "all" && /* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap font-sans font-medium text-slate-800",
												children: r.employeeName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 248,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap text-slate-700 font-semibold",
												children: [r.clockIn || "--:--", r.isDirectIn && /* @__PURE__ */ _jsxDEV("span", {
													className: "ml-1 text-[10px] text-teal-600 font-sans",
													children: "直行"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 254,
													columnNumber: 44
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 252,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap text-slate-700 font-semibold",
												children: [r.clockOut || "--:--", r.isDirectOut && /* @__PURE__ */ _jsxDEV("span", {
													className: "ml-1 text-[10px] text-teal-600 font-sans",
													children: "直帰"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 258,
													columnNumber: 45
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 256,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap text-slate-600",
												children: r.breakMinutes > 0 ? `${r.breakMinutes}分` : "-"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 260,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap font-bold text-slate-900",
												children: r.totalWorkMinutes > 0 ? `${workHours}h` : "-"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 263,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap text-amber-700 font-medium",
												children: r.overtimeMinutes > 0 ? `+${overtimeHours}h` : "-"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 266,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap font-sans",
												children: r.status === "completed" ? /* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-600",
													children: "退勤済"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 271,
													columnNumber: 29
												}, this) : r.status === "working" ? /* @__PURE__ */ _jsxDEV("span", {
													className: "text-emerald-600 font-bold",
													children: "勤務中"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 273,
													columnNumber: 29
												}, this) : r.status === "on_break" ? /* @__PURE__ */ _jsxDEV("span", {
													className: "text-amber-600 font-bold",
													children: "休憩中"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 275,
													columnNumber: 29
												}, this) : /* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-400",
													children: "未出勤"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 277,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 269,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("td", {
												className: "py-2.5 px-3 whitespace-nowrap font-sans text-slate-600",
												children: /* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center gap-1.5",
													children: [r.isManualEdit && /* @__PURE__ */ _jsxDEV("span", {
														className: "text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium",
														children: "修正済"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 283,
														columnNumber: 31
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "truncate max-w-[150px] text-slate-500",
														children: r.note || "-"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 287,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 281,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 280,
												columnNumber: 25
											}, this)
										]
									}, r.id, true, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 23
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0",
					children: [/* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-slate-500",
						children: "打刻時間の修正申請やご不明な点は、管理者までお問い合わせください。"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onClose,
						className: "px-5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-2xs",
						children: "閉じる"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 302,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Y2VzIjpbIkhpc3RvcnlNb2RhbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgWCwgQ2FsZW5kYXIsIENsb2NrLCBEb3dubG9hZCwgQ2hldnJvblJpZ2h0LCBVc2VyIGFzIFVzZXJJY29uIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IERhaWx5QXR0ZW5kYW5jZSwgVXNlciB9IGZyb20gJy4uL3R5cGVzL2F0dGVuZGFuY2UnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgZXhwb3J0QXR0ZW5kYW5jZVRvQ1NWIH0gZnJvbSAnLi4vdXRpbHMvZ2FzU3luYyc7XG5cbmludGVyZmFjZSBIaXN0b3J5TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgc2VsZWN0ZWRVc2VySWQ/OiBzdHJpbmc7XG4gIHVzZXJzOiBVc2VyW107XG59XG5cbmV4cG9ydCBjb25zdCBIaXN0b3J5TW9kYWw6IFJlYWN0LkZDPEhpc3RvcnlNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbiAgc2VsZWN0ZWRVc2VySWQsXG4gIHVzZXJzLFxufSkgPT4ge1xuICBjb25zdCBbZmlsdGVyVXNlcklkLCBzZXRGaWx0ZXJVc2VySWRdID0gdXNlU3RhdGU8c3RyaW5nPihzZWxlY3RlZFVzZXJJZCB8fCAnYWxsJyk7XG4gIGNvbnN0IFtzZWxlY3RlZE1vbnRoLCBzZXRTZWxlY3RlZE1vbnRoXSA9IHVzZVN0YXRlPHN0cmluZz4oJzIwMjYvMTEnKTtcblxuICAvLyBTeW5jaHJvbml6ZSBpbml0aWFsIHVzZXIgaWYgc2VsZWN0ZWRVc2VySWQgY2hhbmdlZFxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZFVzZXJJZCkge1xuICAgICAgc2V0RmlsdGVyVXNlcklkKHNlbGVjdGVkVXNlcklkKTtcbiAgICB9XG4gIH0sIFtzZWxlY3RlZFVzZXJJZF0pO1xuXG4gIGNvbnN0IGFsbEF0dGVuZGFuY2UgPSBzdG9yYWdlLmdldEFsbEF0dGVuZGFuY2UoKTtcblxuICAvLyBFeHRyYWN0IGRpc3RpbmN0IGF2YWlsYWJsZSBtb250aHMgZnJvbSBhdHRlbmRhbmNlXG4gIGNvbnN0IGF2YWlsYWJsZU1vbnRocyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGFsbEF0dGVuZGFuY2UuZm9yRWFjaCgoYSkgPT4ge1xuICAgICAgY29uc3QgeW0gPSBhLmRhdGUuc3Vic3RyaW5nKDAsIDcpOyAvLyBcIllZWVkvTU1cIlxuICAgICAgc2V0LmFkZCh5bSk7XG4gICAgfSk7XG4gICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShzZXQpLnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyIDogWycyMDI2LzExJywgJzIwMjYvMTAnXTtcbiAgfSwgW2FsbEF0dGVuZGFuY2VdKTtcblxuICAvLyBGaWx0ZXIgcmVjb3Jkc1xuICBjb25zdCBmaWx0ZXJlZFJlY29yZHMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gYWxsQXR0ZW5kYW5jZS5maWx0ZXIoKHJlYykgPT4ge1xuICAgICAgY29uc3QgbWF0Y2hVc2VyID0gZmlsdGVyVXNlcklkID09PSAnYWxsJyB8fCByZWMudXNlcklkID09PSBmaWx0ZXJVc2VySWQ7XG4gICAgICBjb25zdCBtYXRjaE1vbnRoID0gc2VsZWN0ZWRNb250aCA9PT0gJ2FsbCcgfHwgcmVjLmRhdGUuc3RhcnRzV2l0aChzZWxlY3RlZE1vbnRoKTtcbiAgICAgIHJldHVybiBtYXRjaFVzZXIgJiYgbWF0Y2hNb250aDtcbiAgICB9KTtcbiAgfSwgW2FsbEF0dGVuZGFuY2UsIGZpbHRlclVzZXJJZCwgc2VsZWN0ZWRNb250aF0pO1xuXG4gIC8vIEFnZ3JlZ2F0ZSBzdGF0c1xuICBjb25zdCBzdGF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsRGF5cyA9IGZpbHRlcmVkUmVjb3Jkcy5sZW5ndGg7XG4gICAgY29uc3QgdG90YWxXb3JrTWludXRlcyA9IGZpbHRlcmVkUmVjb3Jkcy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgKHIudG90YWxXb3JrTWludXRlcyB8fCAwKSwgMCk7XG4gICAgY29uc3QgdG90YWxPdmVydGltZU1pbnV0ZXMgPSBmaWx0ZXJlZFJlY29yZHMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIChyLm92ZXJ0aW1lTWludXRlcyB8fCAwKSwgMCk7XG4gICAgY29uc3QgdG90YWxCcmVha01pbnV0ZXMgPSBmaWx0ZXJlZFJlY29yZHMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIChyLmJyZWFrTWludXRlcyB8fCAwKSwgMCk7XG5cbiAgICBjb25zdCB3b3JrSG91cnMgPSAodG90YWxXb3JrTWludXRlcyAvIDYwKS50b0ZpeGVkKDEpO1xuICAgIGNvbnN0IG92ZXJ0aW1lSG91cnMgPSAodG90YWxPdmVydGltZU1pbnV0ZXMgLyA2MCkudG9GaXhlZCgxKTtcblxuICAgIHJldHVybiB7IHRvdGFsRGF5cywgd29ya0hvdXJzLCBvdmVydGltZUhvdXJzLCB0b3RhbEJyZWFrTWludXRlcyB9O1xuICB9LCBbZmlsdGVyZWRSZWNvcmRzXSk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydENTViA9ICgpID0+IHtcbiAgICBjb25zdCB1c2VyTmFtZSA9IHVzZXJzLmZpbmQoKHUpID0+IHUuaWQgPT09IGZpbHRlclVzZXJJZCk/Lm5hbWUgfHwgJ+WFqOS9kyc7XG4gICAgZXhwb3J0QXR0ZW5kYW5jZVRvQ1NWKFxuICAgICAgZmlsdGVyZWRSZWNvcmRzLFxuICAgICAgYOWLpOaAoOWxpeattF8ke3VzZXJOYW1lfV8ke3NlbGVjdGVkTW9udGgucmVwbGFjZSgnLycsICctJyl9LmNzdmBcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGdldERheU9mV2VlayA9IChkYXRlU3RyOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGRhdGVTdHIuc3BsaXQoJy8nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBjb25zdCBkID0gbmV3IERhdGUoTnVtYmVyKHBhcnRzWzBdKSwgTnVtYmVyKHBhcnRzWzFdKSAtIDEsIE51bWJlcihwYXJ0c1syXSkpO1xuICAgICAgY29uc3QgZGF5cyA9IFsn5pelJywgJ+aciCcsICfngasnLCAn5rC0JywgJ+acqCcsICfph5EnLCAn5ZyfJ107XG4gICAgICBjb25zdCBkYXkgPSBkLmdldERheSgpO1xuICAgICAgcmV0dXJuIHsgdGV4dDogZGF5c1tkYXldLCBpc1dlZWtlbmQ6IGRheSA9PT0gMCB8fCBkYXkgPT09IDYsIGlzU3VuZGF5OiBkYXkgPT09IDAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdGV4dDogJycsIGlzV2Vla2VuZDogZmFsc2UsIGlzU3VuZGF5OiBmYWxzZSB9O1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0zIHNtOnAtNiBiZy1ibGFjay82NSBiYWNrZHJvcC1ibHVyLXhzIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgIDxkaXYgXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy00eGwgbWF4LWgtWzkwdmhdIGJnLXdoaXRlIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgICAgPlxuICAgICAgICB7LyogVG9wIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIHNocmluay0wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LVsjNDVhNGJlXVwiIC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0cmFja2luZy10aWdodFwiPumBjuWOu+OBruWLpOaAoOODreOCsOmWsuimpzwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj7jgZnjgbnjgabjga7miZPliLvlrp/nuL7jg7vlrp/lg43mmYLplpPjga7oqJjpjLLjgpLnorroqo3jgafjgY3jgb7jgZk8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydENTVn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTIwMCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiQ1NW5b2i5byP44Gn44OA44Km44Oz44Ot44O844OJXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgQ1NW5Ye65YqbXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIumWieOBmOOCi1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGaWx0ZXIgVG9vbGJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHNocmluay0wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIHsvKiBVc2VyIHNlbGVjdG9yICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxVc2VySWNvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNTAwXCIgLz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDBcIj7ooajnpLrlr77osaE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJVc2VySWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGaWx0ZXJVc2VySWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBweC0yLjUgcHktMS41IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPuWFqOOCueOCv+ODg+ODleS4gOimpzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHt1c2Vycy5tYXAoKHUpID0+IChcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXt1LmlkfSB2YWx1ZT17dS5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHt1Lm5hbWV9ICh7dS5lbXBsb3llZUNvZGV9KVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNb250aCBzZWxlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTUwMFwiIC8+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwXCI+5a++6LGh5bm05pyIOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRNb250aH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkTW9udGgoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBweC0yLjUgcHktMS41IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPuWFqOacn+mWkyAo44GZ44G544GmKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHthdmFpbGFibGVNb250aHMubWFwKChtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17bX0gdmFsdWU9e219PlxuICAgICAgICAgICAgICAgICAgICB7bS5yZXBsYWNlKCcvJywgJ+W5tCcpfeaciFxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgY291bnRzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8tbnVtXCI+XG4gICAgICAgICAgICDoqbLlvZPjg4fjg7zjgr86IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPntmaWx0ZXJlZFJlY29yZHMubGVuZ3RofTwvc3Bhbj4g5Lu2XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb250aGx5IFN1bW1hcnkgQ2FyZHMgU3RyaXAgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNiBweS0zIGJnLXdoaXRlIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAgZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyBzaHJpbmstMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTUwMFwiPuWHuuWLpOaXpeaVsDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0wLjUgdGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZm9udC1tb25vLW51bVwiPlxuICAgICAgICAgICAgICB7c3RhdHMudG90YWxEYXlzfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtNjAwXCI+5pelPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXRlYWwtNTAvNjAgYm9yZGVyIGJvcmRlci10ZWFsLTIwMC82MFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LXRlYWwtODAwXCI+57eP5a6f5YON5pmC6ZaTPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTAuNSB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXRlYWwtOTAwIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgICAge3N0YXRzLndvcmtIb3Vyc30gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW5vcm1hbCB0ZXh0LXRlYWwtNzAwXCI+5pmC6ZaTPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLWFtYmVyLTUwLzYwIGJvcmRlciBib3JkZXItYW1iZXItMjAwLzYwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbWVkaXVtIHRleHQtYW1iZXItODAwXCI+5pmC6ZaT5aSW5q6L5qWtPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTAuNSB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTkwMCBmb250LW1vbm8tbnVtXCI+XG4gICAgICAgICAgICAgIHtzdGF0cy5vdmVydGltZUhvdXJzfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtYW1iZXItNzAwXCI+5pmC6ZaTPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLWluZGlnby01MC82MCBib3JkZXIgYm9yZGVyLWluZGlnby0yMDAvNjBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tZWRpdW0gdGV4dC1pbmRpZ28tODAwXCI+5ZCI6KiI5LyR5oapPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTAuNSB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWluZGlnby05MDAgZm9udC1tb25vLW51bVwiPlxuICAgICAgICAgICAgICB7c3RhdHMudG90YWxCcmVha01pbnV0ZXN9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ub3JtYWwgdGV4dC1pbmRpZ28tNzAwXCI+5YiGPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWJsZSBDb250ZW50ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1hdXRvIHAtNCBzbTpwLTZcIj5cbiAgICAgICAgICB7ZmlsdGVyZWRSZWNvcmRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC00OCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgbWItMiBzdHJva2UtMSB0ZXh0LXNsYXRlLTMwMFwiIC8+XG4gICAgICAgICAgICAgIOWvvuixoeacn+mWk+OBruWLpOaAoOODreOCsOOBr+imi+OBpOOBi+OCiuOBvuOBm+OCk+OBp+OBl+OBn+OAglxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4c1wiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzIGJvcmRlci1jb2xsYXBzZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS03MDAgZm9udC1zZW1pYm9sZCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB3aGl0ZXNwYWNlLW5vd3JhcFwiPuaXpeS7mDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJVc2VySWQgPT09ICdhbGwnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7msI/lkI08L3RoPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7lh7rli6TmmYLliLs8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7pgIDli6TmmYLliLs8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7kvJHmhqk8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7lrp/lg43mmYLplpM8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7mrovmpa08L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7nirbmhYs8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXBcIj7lgpnogIMgLyDkv67mraM8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFJlY29yZHMubWFwKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheUluZm8gPSBnZXREYXlPZldlZWsoci5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29ya0hvdXJzID0gKHIudG90YWxXb3JrTWludXRlcyAvIDYwKS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdmVydGltZUhvdXJzID0gKHIub3ZlcnRpbWVNaW51dGVzIC8gNjApLnRvRml4ZWQoMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8dHIgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3IuaWR9IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaG92ZXI6Ymctc2xhdGUtNTAvODAgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5SW5mby5pc1N1bmRheSA/ICdiZy1yb3NlLTUwLzMwJyA6IGRheUluZm8uaXNXZWVrZW5kID8gJ2JnLWJsdWUtNTAvMzAnIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ci5kYXRlfXsnICd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1zYW5zIGZvbnQtYm9sZCB0ZXh0LVsxMXB4XSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5SW5mby5pc1N1bmRheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXJvc2UtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRheUluZm8uaXNXZWVrZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtYmx1ZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHtkYXlJbmZvLnRleHR9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpbHRlclVzZXJJZCA9PT0gJ2FsbCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXAgZm9udC1zYW5zIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3IuZW1wbG95ZWVOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNsYXRlLTcwMCBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtyLmNsb2NrSW4gfHwgJy0tOi0tJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3IuaXNEaXJlY3RJbiAmJiA8c3BhbiBjbGFzc05hbWU9XCJtbC0xIHRleHQtWzEwcHhdIHRleHQtdGVhbC02MDAgZm9udC1zYW5zXCI+55u06KGMPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbGF0ZS03MDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ci5jbG9ja091dCB8fCAnLS06LS0nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ci5pc0RpcmVjdE91dCAmJiA8c3BhbiBjbGFzc05hbWU9XCJtbC0xIHRleHQtWzEwcHhdIHRleHQtdGVhbC02MDAgZm9udC1zYW5zXCI+55u05biwPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3IuYnJlYWtNaW51dGVzID4gMCA/IGAke3IuYnJlYWtNaW51dGVzfeWIhmAgOiAnLSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zIHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ci50b3RhbFdvcmtNaW51dGVzID4gMCA/IGAke3dvcmtIb3Vyc31oYCA6ICctJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTMgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1hbWJlci03MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Iub3ZlcnRpbWVNaW51dGVzID4gMCA/IGArJHtvdmVydGltZUhvdXJzfWhgIDogJy0nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Iuc3RhdHVzID09PSAnY29tcGxldGVkJyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMFwiPumAgOWLpOa4iDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IHIuc3RhdHVzID09PSAnd29ya2luZycgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTYwMCBmb250LWJvbGRcIj7li6Tli5nkuK08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiByLnN0YXR1cyA9PT0gJ29uX2JyZWFrJyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTYwMCBmb250LWJvbGRcIj7kvJHmhqnkuK08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj7mnKrlh7rli6Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zIHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtc2FucyB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ci5pc01hbnVhbEVkaXQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDkv67mraPmuIhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlIG1heC13LVsxNTBweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyLm5vdGUgfHwgJy0nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc2hyaW5rLTBcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICDmiZPliLvmmYLplpPjga7kv67mraPnlLPoq4vjgoTjgZTkuI3mmI7jgarngrnjga/jgIHnrqHnkIbogIXjgb7jgafjgYrllY/jgYTlkIjjgo/jgZvjgY/jgaDjgZXjgYTjgIJcbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgaG92ZXI6Ymctc2xhdGUtMTAwIHRyYW5zaXRpb24gc2hhZG93LTJ4c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg6ZaJ44GY44KLXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19