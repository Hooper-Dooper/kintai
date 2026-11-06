const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useMemo = __vite__cjsImport0_react["useMemo"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { Edit3, Plus, Trash2, Search, Calendar, X, Download } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { exportAttendanceToCSV } from "/src/utils/gasSync.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminCorrection.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminCorrection = ({ users, onDataChanged }) => {
	const [attendances, setAttendances] = useState(storage.getAllAttendance());
	// Filters
	const [selectedMonth, setSelectedMonth] = useState("2026/11");
	const [selectedUserId, setSelectedUserId] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [filterOnlyEdited, setFilterOnlyEdited] = useState(false);
	// Edit Modal State
	const [editingRecord, setEditingRecord] = useState(null);
	const [editClockIn, setEditClockIn] = useState("");
	const [editClockOut, setEditClockOut] = useState("");
	const [editBreakMinutes, setEditBreakMinutes] = useState(60);
	const [editNote, setEditNote] = useState("");
	const [editStatus, setEditStatus] = useState("completed");
	// New Record Modal State
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newUserId, setNewUserId] = useState("");
	const [newDate, setNewDate] = useState(new Date().toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).replace(/-/g, "/"));
	const [newClockIn, setNewClockIn] = useState("09:00");
	const [newClockOut, setNewClockOut] = useState("18:00");
	const [newBreakMinutes, setNewBreakMinutes] = useState(60);
	const [newNote, setNewNote] = useState("");
	// Available months
	const availableMonths = useMemo(() => {
		const set = new Set();
		attendances.forEach((a) => {
			const ym = a.date.substring(0, 7);
			set.add(ym);
		});
		return Array.from(set).sort().reverse();
	}, [attendances]);
	// Filtered records
	const filteredRecords = useMemo(() => {
		return attendances.filter((rec) => {
			const matchMonth = selectedMonth === "all" || rec.date.startsWith(selectedMonth);
			const matchUser = selectedUserId === "all" || rec.userId === selectedUserId;
			const matchQuery = !searchQuery.trim() || rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || rec.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) || (rec.note || "").toLowerCase().includes(searchQuery.toLowerCase());
			const matchEdited = !filterOnlyEdited || rec.isManualEdit;
			return matchMonth && matchUser && matchQuery && matchEdited;
		});
	}, [
		attendances,
		selectedMonth,
		selectedUserId,
		searchQuery,
		filterOnlyEdited
	]);
	const openEditModal = (rec) => {
		setEditingRecord(rec);
		setEditClockIn(rec.clockIn || "09:00");
		setEditClockOut(rec.clockOut || "18:00");
		setEditBreakMinutes(rec.breakMinutes !== undefined ? rec.breakMinutes : 60);
		setEditNote(rec.note || "");
		setEditStatus(rec.status);
	};
	const handleSaveEdit = (e) => {
		e.preventDefault();
		if (!editingRecord) return;
		storage.updateAttendanceRecord(editingRecord.id, {
			clockIn: editClockIn,
			clockOut: editClockOut,
			breakMinutes: Number(editBreakMinutes),
			note: editNote,
			status: editStatus,
			adminName: "管理者"
		});
		setAttendances(storage.getAllAttendance());
		setEditingRecord(null);
		onDataChanged();
	};
	const handleSaveNew = (e) => {
		e.preventDefault();
		if (!newUserId) {
			alert("従業員を選択してください");
			return;
		}
		storage.addManualAttendanceRecord({
			userId: newUserId,
			date: newDate,
			clockIn: newClockIn,
			clockOut: newClockOut,
			breakMinutes: Number(newBreakMinutes),
			note: newNote || "手動登録（管理者修正）",
			adminName: "管理者"
		});
		setAttendances(storage.getAllAttendance());
		setIsAddModalOpen(false);
		onDataChanged();
	};
	const handleDelete = (id, name, date) => {
		if (window.confirm(`${name} さんの ${date} の勤怠データを削除してもよろしいですか？`)) {
			storage.deleteAttendanceRecord(id);
			setAttendances(storage.getAllAttendance());
			onDataChanged();
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-xl font-bold text-slate-900 tracking-tight",
					children: "打刻データ修正・勤怠管理"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-xs text-slate-500 mt-1",
					children: "出勤・退勤時刻の修正、休憩時間の調整、手動打刻の追加が行えます。"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => exportAttendanceToCSV(filteredRecords, `勤怠修正一覧_${selectedMonth.replace("/", "-")}.csv`),
						className: "px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
						children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4 text-slate-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 13
						}, this), "CSVダウンロード"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => setIsAddModalOpen(true),
						className: "px-4 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg transition inline-flex items-center gap-1.5 shadow-xs",
						children: [/* @__PURE__ */ _jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 13
						}, this), "打刻データを手動登録"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ _jsxDEV(Calendar, { className: "w-4 h-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 157,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-medium text-slate-700",
									children: "対象月:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("select", {
									value: selectedMonth,
									onChange: (e) => setSelectedMonth(e.target.value),
									className: "text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "all",
										children: "全期間"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 15
									}, this), availableMonths.map((m) => /* @__PURE__ */ _jsxDEV("option", {
										value: m,
										children: [m.replace("/", "年"), "月"]
									}, m, true, {
										fileName: _jsxFileName,
										lineNumber: 166,
										columnNumber: 17
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-medium text-slate-700",
								children: "スタッフ:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: selectedUserId,
								onChange: (e) => setSelectedUserId(e.target.value),
								className: "text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								children: [/* @__PURE__ */ _jsxDEV("option", {
									value: "all",
									children: "全員表示"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 181,
									columnNumber: 15
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
									lineNumber: 183,
									columnNumber: 17
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 min-w-[200px] relative",
							children: [/* @__PURE__ */ _jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "氏名、社員番号、備考で検索...",
								className: "w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("label", {
							className: "flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "checkbox",
								checked: filterOnlyEdited,
								onChange: (e) => setFilterOnlyEdited(e.target.checked),
								className: "rounded text-[#31828f] focus:ring-[#31828f]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 13
							}, this), "管理者修正済みのみ"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ _jsxDEV("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
							className: "bg-slate-100 text-slate-700 font-semibold border-b border-slate-200",
							children: [
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "日付"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "社員番号"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "氏名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "出勤時刻"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "退勤時刻"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "休憩"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "実働時間"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "残業"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "状態"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "修正状況"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "備考"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap text-right",
									children: "操作"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("tbody", {
							className: "divide-y divide-slate-100 font-mono-num",
							children: filteredRecords.length === 0 ? /* @__PURE__ */ _jsxDEV("tr", { children: /* @__PURE__ */ _jsxDEV("td", {
								colSpan: 12,
								className: "py-12 text-center text-slate-400 font-sans",
								children: "該当する勤怠データがありません"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 17
							}, this) : filteredRecords.map((rec) => {
								const workHours = (rec.totalWorkMinutes / 60).toFixed(1);
								const overtimeHours = (rec.overtimeMinutes / 60).toFixed(1);
								return /* @__PURE__ */ _jsxDEV("tr", {
									className: "hover:bg-slate-50 transition-colors",
									children: [
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-medium text-slate-900",
											children: rec.date
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 249,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-500",
											children: rec.employeeCode
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 252,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans font-bold text-slate-800",
											children: rec.employeeName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 255,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-bold text-teal-700",
											children: rec.clockIn || "--:--"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-bold text-slate-800",
											children: rec.clockOut || "--:--"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 261,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-600",
											children: [rec.breakMinutes, "分"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-bold text-slate-900",
											children: rec.totalWorkMinutes > 0 ? `${workHours}h` : "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-amber-700 font-medium",
											children: rec.overtimeMinutes > 0 ? `+${overtimeHours}h` : "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 270,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans",
											children: /* @__PURE__ */ _jsxDEV("span", {
												className: `px-2 py-0.5 rounded text-[11px] font-medium ${rec.status === "completed" ? "bg-slate-100 text-slate-700" : rec.status === "working" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`,
												children: rec.status === "completed" ? "退勤済" : rec.status === "working" ? "勤務中" : "休憩中"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 274,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 273,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans",
											children: rec.isManualEdit ? /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded",
												children: "管理者修正済"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 292,
												columnNumber: 27
											}, this) : /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] text-slate-400",
												children: "通常打刻"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 296,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 290,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans text-slate-600 max-w-[160px] truncate",
											children: rec.note || "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 299,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-right",
											children: /* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-end gap-1 font-sans",
												children: [/* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => openEditModal(rec),
													className: "px-2.5 py-1 text-xs font-medium text-[#31828f] bg-teal-50 hover:bg-teal-100 rounded transition inline-flex items-center gap-1",
													children: [/* @__PURE__ */ _jsxDEV(Edit3, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 309,
														columnNumber: 29
													}, this), "修正"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 304,
													columnNumber: 27
												}, this), /* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => handleDelete(rec.id, rec.employeeName, rec.date),
													className: "p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition",
													title: "データを削除",
													children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 318,
														columnNumber: 29
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 312,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 303,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 302,
											columnNumber: 23
										}, this)
									]
								}, rec.id, true, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 216,
				columnNumber: 7
			}, this),
			editingRecord && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Edit3, { className: "w-5 h-5 text-teal-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-base",
								children: "打刻データの修正"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 336,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setEditingRecord(null),
							className: "text-slate-400 hover:text-white p-1 rounded",
							children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("form", {
						onSubmit: handleSaveEdit,
						className: "p-6 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex justify-between",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-500",
										children: "対象者:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 19
									}, this),
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-bold text-slate-800",
										children: editingRecord.employeeName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 19
									}, this),
									" (",
									editingRecord.employeeCode,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-500",
										children: "対象日:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 19
									}, this),
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-bold text-slate-800",
										children: editingRecord.date
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "出勤時刻 (HH:MM)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "time",
									value: editClockIn,
									onChange: (e) => setEditClockIn(e.target.value),
									className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "退勤時刻 (HH:MM)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "time",
									value: editClockOut,
									onChange: (e) => setEditClockOut(e.target.value),
									className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 378,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 360,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "休憩時間 (分)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 389,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "number",
									min: 0,
									step: 5,
									value: editBreakMinutes,
									onChange: (e) => setEditBreakMinutes(Number(e.target.value)),
									className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "勤務ステータス"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: editStatus,
									onChange: (e) => setEditStatus(e.target.value),
									className: "w-full text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: "completed",
											children: "退勤済"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 412,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "working",
											children: "勤務中"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 413,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "on_break",
											children: "休憩中"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 414,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "not_started",
											children: "未出勤"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 415,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 403,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: ["修正理由 / 備考 ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 422,
									columnNumber: 29
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 421,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: editNote,
								onChange: (e) => setEditNote(e.target.value),
								placeholder: "例: 打刻忘れのため本人申告に基づき修正",
								className: "w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 424,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 420,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 flex justify-end gap-2 border-t border-slate-200",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setEditingRecord(null),
									className: "px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg",
									children: "キャンセル"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 435,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "submit",
									className: "px-5 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg shadow-xs",
									children: "修正内容を保存"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 442,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 348,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 334,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 333,
				columnNumber: 9
			}, this),
			isAddModalOpen && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Plus, { className: "w-5 h-5 text-teal-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 460,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-base",
								children: "打刻データの手動登録"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 459,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setIsAddModalOpen(false),
							className: "text-slate-400 hover:text-white p-1 rounded",
							children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 467,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 463,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 458,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("form", {
						onSubmit: handleSaveNew,
						className: "p-6 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: ["対象スタッフ ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 474,
									columnNumber: 26
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 473,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: newUserId,
								onChange: (e) => setNewUserId(e.target.value),
								className: "w-full text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								required: true,
								children: [/* @__PURE__ */ _jsxDEV("option", {
									value: "",
									children: "スタッフを選択してください"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 19
								}, this), users.map((u) => /* @__PURE__ */ _jsxDEV("option", {
									value: u.id,
									children: [
										u.name,
										" (",
										u.employeeCode,
										" - ",
										u.department,
										")"
									]
								}, u.id, true, {
									fileName: _jsxFileName,
									lineNumber: 484,
									columnNumber: 21
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 476,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: ["対象日付 (YYYY/MM/DD) ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 493,
									columnNumber: 37
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: newDate,
								onChange: (e) => setNewDate(e.target.value),
								placeholder: "2026/11/06",
								className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 495,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 491,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: ["出勤時刻 ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-rose-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 508,
										columnNumber: 26
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 507,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "time",
									value: newClockIn,
									onChange: (e) => setNewClockIn(e.target.value),
									className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 510,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 506,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: ["退勤時刻 ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-rose-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 521,
										columnNumber: 26
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "time",
									value: newClockOut,
									onChange: (e) => setNewClockOut(e.target.value),
									className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 523,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 519,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 505,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "休憩時間 (分)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 534,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "number",
								min: 0,
								step: 5,
								value: newBreakMinutes,
								onChange: (e) => setNewBreakMinutes(Number(e.target.value)),
								className: "w-full text-sm font-mono px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 537,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 533,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "登録理由・備考"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 549,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: newNote,
								onChange: (e) => setNewNote(e.target.value),
								placeholder: "例: 有休取得、出張手動登録など",
								className: "w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 552,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 548,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 flex justify-end gap-2 border-t border-slate-200",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setIsAddModalOpen(false),
									className: "px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg",
									children: "キャンセル"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 562,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "submit",
									className: "px-5 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg shadow-xs",
									children: "登録する"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 569,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 561,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 471,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 457,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 456,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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NUQ7Ozs7aUJBQ1Asd0JBQUMsU0FBRDtRQUNFLE1BQUs7UUFDTCxPQUFPO1FBQ1AsV0FBVyxNQUFNLFdBQVcsRUFBRSxPQUFPLEtBQUs7UUFDMUMsYUFBWTtRQUNaLFdBQVU7T0FDWDs7OztlQUNFOzs7OztPQUVMLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFmLENBQ0Usd0JBQUMsVUFBRDtTQUNFLE1BQUs7U0FDTCxlQUFlLGtCQUFrQixLQUFLO1NBQ3RDLFdBQVU7bUJBQ1g7UUFFTzs7OztrQkFDUix3QkFBQyxVQUFEO1NBQ0UsTUFBSztTQUNMLFdBQVU7bUJBQ1g7UUFFTzs7OztnQkFDTDs7Ozs7O01BQ0Q7Ozs7O2FBQ0g7Ozs7OztHQUNGOzs7OztFQUVKOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBZG1pbkNvcnJlY3Rpb24udHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEVkaXQzLCBQbHVzLCBUcmFzaDIsIFNlYXJjaCwgRmlsdGVyLCBDYWxlbmRhciwgQ2hlY2tDaXJjbGUyLCBDbG9jaywgQWxlcnRDaXJjbGUsIFgsIERvd25sb2FkIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IERhaWx5QXR0ZW5kYW5jZSwgVXNlciwgV29ya1N0YXR1cyB9IGZyb20gJy4uLy4uL3R5cGVzL2F0dGVuZGFuY2UnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgZXhwb3J0QXR0ZW5kYW5jZVRvQ1NWIH0gZnJvbSAnLi4vLi4vdXRpbHMvZ2FzU3luYyc7XG5cbmludGVyZmFjZSBBZG1pbkNvcnJlY3Rpb25Qcm9wcyB7XG4gIHVzZXJzOiBVc2VyW107XG4gIG9uRGF0YUNoYW5nZWQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBBZG1pbkNvcnJlY3Rpb246IFJlYWN0LkZDPEFkbWluQ29ycmVjdGlvblByb3BzPiA9ICh7IHVzZXJzLCBvbkRhdGFDaGFuZ2VkIH0pID0+IHtcbiAgY29uc3QgW2F0dGVuZGFuY2VzLCBzZXRBdHRlbmRhbmNlc10gPSB1c2VTdGF0ZTxEYWlseUF0dGVuZGFuY2VbXT4oc3RvcmFnZS5nZXRBbGxBdHRlbmRhbmNlKCkpO1xuICBcbiAgLy8gRmlsdGVyc1xuICBjb25zdCBbc2VsZWN0ZWRNb250aCwgc2V0U2VsZWN0ZWRNb250aF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcyMDI2LzExJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFVzZXJJZCwgc2V0U2VsZWN0ZWRVc2VySWRdID0gdXNlU3RhdGU8c3RyaW5nPignYWxsJyk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtmaWx0ZXJPbmx5RWRpdGVkLCBzZXRGaWx0ZXJPbmx5RWRpdGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBFZGl0IE1vZGFsIFN0YXRlXG4gIGNvbnN0IFtlZGl0aW5nUmVjb3JkLCBzZXRFZGl0aW5nUmVjb3JkXSA9IHVzZVN0YXRlPERhaWx5QXR0ZW5kYW5jZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZWRpdENsb2NrSW4sIHNldEVkaXRDbG9ja0luXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2VkaXRDbG9ja091dCwgc2V0RWRpdENsb2NrT3V0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2VkaXRCcmVha01pbnV0ZXMsIHNldEVkaXRCcmVha01pbnV0ZXNdID0gdXNlU3RhdGUoNjApO1xuICBjb25zdCBbZWRpdE5vdGUsIHNldEVkaXROb3RlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2VkaXRTdGF0dXMsIHNldEVkaXRTdGF0dXNdID0gdXNlU3RhdGU8V29ya1N0YXR1cz4oJ2NvbXBsZXRlZCcpO1xuXG4gIC8vIE5ldyBSZWNvcmQgTW9kYWwgU3RhdGVcbiAgY29uc3QgW2lzQWRkTW9kYWxPcGVuLCBzZXRJc0FkZE1vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtuZXdVc2VySWQsIHNldE5ld1VzZXJJZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdEYXRlLCBzZXROZXdEYXRlXSA9IHVzZVN0YXRlKFxuICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdqYS1KUCcsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJzItZGlnaXQnLCBkYXk6ICcyLWRpZ2l0JyB9KS5yZXBsYWNlKC8tL2csICcvJylcbiAgKTtcbiAgY29uc3QgW25ld0Nsb2NrSW4sIHNldE5ld0Nsb2NrSW5dID0gdXNlU3RhdGUoJzA5OjAwJyk7XG4gIGNvbnN0IFtuZXdDbG9ja091dCwgc2V0TmV3Q2xvY2tPdXRdID0gdXNlU3RhdGUoJzE4OjAwJyk7XG4gIGNvbnN0IFtuZXdCcmVha01pbnV0ZXMsIHNldE5ld0JyZWFrTWludXRlc10gPSB1c2VTdGF0ZSg2MCk7XG4gIGNvbnN0IFtuZXdOb3RlLCBzZXROZXdOb3RlXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBBdmFpbGFibGUgbW9udGhzXG4gIGNvbnN0IGF2YWlsYWJsZU1vbnRocyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGF0dGVuZGFuY2VzLmZvckVhY2goKGEpID0+IHtcbiAgICAgIGNvbnN0IHltID0gYS5kYXRlLnN1YnN0cmluZygwLCA3KTtcbiAgICAgIHNldC5hZGQoeW0pO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCkuc29ydCgpLnJldmVyc2UoKTtcbiAgfSwgW2F0dGVuZGFuY2VzXSk7XG5cbiAgLy8gRmlsdGVyZWQgcmVjb3Jkc1xuICBjb25zdCBmaWx0ZXJlZFJlY29yZHMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gYXR0ZW5kYW5jZXMuZmlsdGVyKChyZWMpID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoTW9udGggPSBzZWxlY3RlZE1vbnRoID09PSAnYWxsJyB8fCByZWMuZGF0ZS5zdGFydHNXaXRoKHNlbGVjdGVkTW9udGgpO1xuICAgICAgY29uc3QgbWF0Y2hVc2VyID0gc2VsZWN0ZWRVc2VySWQgPT09ICdhbGwnIHx8IHJlYy51c2VySWQgPT09IHNlbGVjdGVkVXNlcklkO1xuICAgICAgY29uc3QgbWF0Y2hRdWVyeSA9XG4gICAgICAgICFzZWFyY2hRdWVyeS50cmltKCkgfHxcbiAgICAgICAgcmVjLmVtcGxveWVlTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIHJlYy5lbXBsb3llZUNvZGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICAocmVjLm5vdGUgfHwgJycpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gICAgICBjb25zdCBtYXRjaEVkaXRlZCA9ICFmaWx0ZXJPbmx5RWRpdGVkIHx8IHJlYy5pc01hbnVhbEVkaXQ7XG5cbiAgICAgIHJldHVybiBtYXRjaE1vbnRoICYmIG1hdGNoVXNlciAmJiBtYXRjaFF1ZXJ5ICYmIG1hdGNoRWRpdGVkO1xuICAgIH0pO1xuICB9LCBbYXR0ZW5kYW5jZXMsIHNlbGVjdGVkTW9udGgsIHNlbGVjdGVkVXNlcklkLCBzZWFyY2hRdWVyeSwgZmlsdGVyT25seUVkaXRlZF0pO1xuXG4gIGNvbnN0IG9wZW5FZGl0TW9kYWwgPSAocmVjOiBEYWlseUF0dGVuZGFuY2UpID0+IHtcbiAgICBzZXRFZGl0aW5nUmVjb3JkKHJlYyk7XG4gICAgc2V0RWRpdENsb2NrSW4ocmVjLmNsb2NrSW4gfHwgJzA5OjAwJyk7XG4gICAgc2V0RWRpdENsb2NrT3V0KHJlYy5jbG9ja091dCB8fCAnMTg6MDAnKTtcbiAgICBzZXRFZGl0QnJlYWtNaW51dGVzKHJlYy5icmVha01pbnV0ZXMgIT09IHVuZGVmaW5lZCA/IHJlYy5icmVha01pbnV0ZXMgOiA2MCk7XG4gICAgc2V0RWRpdE5vdGUocmVjLm5vdGUgfHwgJycpO1xuICAgIHNldEVkaXRTdGF0dXMocmVjLnN0YXR1cyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUVkaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghZWRpdGluZ1JlY29yZCkgcmV0dXJuO1xuXG4gICAgc3RvcmFnZS51cGRhdGVBdHRlbmRhbmNlUmVjb3JkKGVkaXRpbmdSZWNvcmQuaWQsIHtcbiAgICAgIGNsb2NrSW46IGVkaXRDbG9ja0luLFxuICAgICAgY2xvY2tPdXQ6IGVkaXRDbG9ja091dCxcbiAgICAgIGJyZWFrTWludXRlczogTnVtYmVyKGVkaXRCcmVha01pbnV0ZXMpLFxuICAgICAgbm90ZTogZWRpdE5vdGUsXG4gICAgICBzdGF0dXM6IGVkaXRTdGF0dXMsXG4gICAgICBhZG1pbk5hbWU6ICfnrqHnkIbogIUnLFxuICAgIH0pO1xuXG4gICAgc2V0QXR0ZW5kYW5jZXMoc3RvcmFnZS5nZXRBbGxBdHRlbmRhbmNlKCkpO1xuICAgIHNldEVkaXRpbmdSZWNvcmQobnVsbCk7XG4gICAgb25EYXRhQ2hhbmdlZCgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVOZXcgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghbmV3VXNlcklkKSB7XG4gICAgICBhbGVydCgn5b6T5qWt5ZOh44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RvcmFnZS5hZGRNYW51YWxBdHRlbmRhbmNlUmVjb3JkKHtcbiAgICAgIHVzZXJJZDogbmV3VXNlcklkLFxuICAgICAgZGF0ZTogbmV3RGF0ZSxcbiAgICAgIGNsb2NrSW46IG5ld0Nsb2NrSW4sXG4gICAgICBjbG9ja091dDogbmV3Q2xvY2tPdXQsXG4gICAgICBicmVha01pbnV0ZXM6IE51bWJlcihuZXdCcmVha01pbnV0ZXMpLFxuICAgICAgbm90ZTogbmV3Tm90ZSB8fCAn5omL5YuV55m76Yyy77yI566h55CG6ICF5L+u5q2j77yJJyxcbiAgICAgIGFkbWluTmFtZTogJ+euoeeQhuiAhScsXG4gICAgfSk7XG5cbiAgICBzZXRBdHRlbmRhbmNlcyhzdG9yYWdlLmdldEFsbEF0dGVuZGFuY2UoKSk7XG4gICAgc2V0SXNBZGRNb2RhbE9wZW4oZmFsc2UpO1xuICAgIG9uRGF0YUNoYW5nZWQoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSAoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAod2luZG93LmNvbmZpcm0oYCR7bmFtZX0g44GV44KT44GuICR7ZGF0ZX0g44Gu5Yuk5oCg44OH44O844K/44KS5YmK6Zmk44GX44Gm44KC44KI44KN44GX44GE44Gn44GZ44GL77yfYCkpIHtcbiAgICAgIHN0b3JhZ2UuZGVsZXRlQXR0ZW5kYW5jZVJlY29yZChpZCk7XG4gICAgICBzZXRBdHRlbmRhbmNlcyhzdG9yYWdlLmdldEFsbEF0dGVuZGFuY2UoKSk7XG4gICAgICBvbkRhdGFDaGFuZ2VkKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTVcIj5cbiAgICAgIHsvKiBQYWdlIFRpdGxlICYgQWN0aW9uIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBiZy13aGl0ZSBwLTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRyYWNraW5nLXRpZ2h0XCI+5omT5Yi744OH44O844K/5L+u5q2j44O75Yuk5oCg566h55CGPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG10LTFcIj5cbiAgICAgICAgICAgIOWHuuWLpOODu+mAgOWLpOaZguWIu+OBruS/ruato+OAgeS8keaGqeaZgumWk+OBruiqv+aVtOOAgeaJi+WLleaJk+WIu+OBrui/veWKoOOBjOihjOOBiOOBvuOBmeOAglxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGV4cG9ydEF0dGVuZGFuY2VUb0NTVihmaWx0ZXJlZFJlY29yZHMsIGDli6TmgKDkv67mraPkuIDopqdfJHtzZWxlY3RlZE1vbnRoLnJlcGxhY2UoJy8nLCAnLScpfS5jc3ZgKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS01MCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS01MDBcIiAvPlxuICAgICAgICAgICAgQ1NW44OA44Km44Oz44Ot44O844OJXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNBZGRNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctWyMzMTgyOGZdIGhvdmVyOmJnLVsjMjg2ZjdiXSByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LXhzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIOaJk+WIu+ODh+ODvOOCv+OCkuaJi+WLleeZu+mMslxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRmlsdGVyIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4cyBzcGFjZS15LTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICB7LyogTW9udGggc2VsZWN0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTUwMFwiIC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTcwMFwiPuWvvuixoeaciDo8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRNb250aH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZE1vbnRoKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIHB4LTIuNSBweS0xLjUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxcIj7lhajmnJ/plpM8L29wdGlvbj5cbiAgICAgICAgICAgICAge2F2YWlsYWJsZU1vbnRocy5tYXAoKG0pID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17bX0gdmFsdWU9e219PlxuICAgICAgICAgICAgICAgICAge20ucmVwbGFjZSgnLycsICflubQnKX3mnIhcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBVc2VyIHNlbGVjdG9yICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS03MDBcIj7jgrnjgr/jg4Pjg5U6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkVXNlcklkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkVXNlcklkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIHB4LTIuNSBweS0xLjUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxcIj7lhajlk6HooajnpLo8L29wdGlvbj5cbiAgICAgICAgICAgICAge3VzZXJzLm1hcCgodSkgPT4gKFxuICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXt1LmlkfSB2YWx1ZT17dS5pZH0+XG4gICAgICAgICAgICAgICAgICB7dS5uYW1lfSAoe3UuZW1wbG95ZWVDb2RlfSlcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTZWFyY2ggYm94ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LVsyMDBweF0gcmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTQwMCBhYnNvbHV0ZSBsZWZ0LTMgdG9wLTIuNVwiIC8+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuawj+WQjeOAgeekvuWToeeVquWPt+OAgeWCmeiAg+OBp+aknOe0oi4uLlwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXhzIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgcGwtOSBwci0zIHB5LTEuNSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogT25seSBlZGl0ZWQgdG9nZ2xlICovfVxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgdGV4dC1zbGF0ZS03MDAgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtmaWx0ZXJPbmx5RWRpdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbHRlck9ubHlFZGl0ZWQoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgdGV4dC1bIzMxODI4Zl0gZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIOeuoeeQhuiAheS/ruato+a4iOOBv+OBruOBv1xuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFRhYmxlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHMgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC14cyBib3JkZXItY29sbGFwc2VcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLXNsYXRlLTEwMCB0ZXh0LXNsYXRlLTcwMCBmb250LXNlbWlib2xkIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7ml6Xku5g8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuekvuWToeeVquWPtzwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+5rCP5ZCNPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7lh7rli6TmmYLliLs8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPumAgOWLpOaZguWIuzwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+5LyR5oapPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7lrp/lg43mmYLplpM8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuaui+alrTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+54q25oWLPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7kv67mraPnirbms4E8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuWCmeiAgzwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtcmlnaHRcIj7mk43kvZw8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgICAge2ZpbHRlcmVkUmVjb3Jkcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezEyfSBjbGFzc05hbWU9XCJweS0xMiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTQwMCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAg6Kmy5b2T44GZ44KL5Yuk5oCg44OH44O844K/44GM44GC44KK44G+44Gb44KTXG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRSZWNvcmRzLm1hcCgocmVjKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB3b3JrSG91cnMgPSAocmVjLnRvdGFsV29ya01pbnV0ZXMgLyA2MCkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG92ZXJ0aW1lSG91cnMgPSAocmVjLm92ZXJ0aW1lTWludXRlcyAvIDYwKS50b0ZpeGVkKDEpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWMuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTUwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVjLmRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZWMuZW1wbG95ZWVDb2RlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtc2FucyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZWMuZW1wbG95ZWVOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtYm9sZCB0ZXh0LXRlYWwtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVjLmNsb2NrSW4gfHwgJy0tOi0tJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZWMuY2xvY2tPdXQgfHwgJy0tOi0tJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JlYy5icmVha01pbnV0ZXN95YiGXG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVjLnRvdGFsV29ya01pbnV0ZXMgPiAwID8gYCR7d29ya0hvdXJzfWhgIDogJy0nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtYW1iZXItNzAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVjLm92ZXJ0aW1lTWludXRlcyA+IDAgPyBgKyR7b3ZlcnRpbWVIb3Vyc31oYCA6ICctJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWMuc3RhdHVzID09PSAnY29tcGxldGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZWMuc3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtMTAwIHRleHQtZW1lcmFsZC04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICfpgIDli6TmuIgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZWMuc3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICfli6Tli5nkuK0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAn5LyR5oap5LitJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZWMuaXNNYW51YWxFZGl0ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwIHB4LTEuNSBweS0wLjUgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOeuoeeQhuiAheS/ruato+a4iFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPumAmuW4uOaJk+WIuzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgZm9udC1zYW5zIHRleHQtc2xhdGUtNjAwIG1heC13LVsxNjBweF0gdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZWMubm90ZSB8fCAnLSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMSBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5FZGl0TW9kYWwocmVjKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtWyMzMTgyOGZdIGJnLXRlYWwtNTAgaG92ZXI6YmctdGVhbC0xMDAgcm91bmRlZCB0cmFuc2l0aW9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdDMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOS/ruato1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZShyZWMuaWQsIHJlYy5lbXBsb3llZU5hbWUsIHJlYy5kYXRlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC1yb3NlLTUwMCBob3Zlcjp0ZXh0LXJvc2UtNzAwIGhvdmVyOmJnLXJvc2UtNTAgcm91bmRlZCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIuODh+ODvOOCv+OCkuWJiumZpFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRWRpdCBSZWNvcmQgTW9kYWwgKi99XG4gICAgICB7ZWRpdGluZ1JlY29yZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay82MCBiYWNrZHJvcC1ibHVyLXhzIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1sZyBiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC02IHB5LTQgYmctc2xhdGUtOTAwIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxFZGl0MyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtdGVhbC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1iYXNlXCI+5omT5Yi744OH44O844K/44Gu5L+u5q2jPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nUmVjb3JkKG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgcC0xIHJvdW5kZWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTYXZlRWRpdH0gY2xhc3NOYW1lPVwicC02IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQteHMgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj7lr77osaHogIU6PC9zcGFuPnsnICd9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj57ZWRpdGluZ1JlY29yZC5lbXBsb3llZU5hbWV9PC9zcGFuPiAoe2VkaXRpbmdSZWNvcmQuZW1wbG95ZWVDb2RlfSlcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj7lr77osaHml6U6PC9zcGFuPnsnICd9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj57ZWRpdGluZ1JlY29yZC5kYXRlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICDlh7rli6TmmYLliLsgKEhIOk1NKVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0Q2xvY2tJbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0Q2xvY2tJbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXNtIGZvbnQtbW9ubyBweC0zIHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOmAgOWLpOaZguWIuyAoSEg6TU0pXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0aW1lXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRDbG9ja091dH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0Q2xvY2tPdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBmb250LW1vbm8gcHgtMyBweS0yIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOS8keaGqeaZgumWkyAo5YiGKVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXs1fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdEJyZWFrTWludXRlc31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0QnJlYWtNaW51dGVzKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBmb250LW1vbm8gcHgtMyBweS0yIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICDli6Tli5njgrnjg4bjg7zjgr/jgrlcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0U3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRTdGF0dXMoZS50YXJnZXQudmFsdWUgYXMgV29ya1N0YXR1cyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXNtIHB4LTMgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY29tcGxldGVkXCI+6YCA5Yuk5riIPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3b3JraW5nXCI+5Yuk5YuZ5LitPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvbl9icmVha1wiPuS8keaGqeS4rTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm90X3N0YXJ0ZWRcIj7mnKrlh7rli6Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg5L+u5q2j55CG55SxIC8g5YKZ6ICDIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdE5vdGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXROb3RlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5L6LOiDmiZPliLvlv5jjgozjga7jgZ/jgoHmnKzkurrnlLPlkYrjgavln7rjgaXjgY3kv67mraNcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQteHMgcHgtMyBweS0yIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBmbGV4IGp1c3RpZnktZW5kIGdhcC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmdSZWNvcmQobnVsbCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMCBiZy1zbGF0ZS0xMDAgaG92ZXI6Ymctc2xhdGUtMjAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOOCreODo+ODs+OCu+ODq1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLVsjMzE4MjhmXSBob3ZlcjpiZy1bIzI4NmY3Yl0gcm91bmRlZC1sZyBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOS/ruato+WGheWuueOCkuS/neWtmFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogQWRkIE5ldyBSZWNvcmQgTW9kYWwgKi99XG4gICAgICB7aXNBZGRNb2RhbE9wZW4gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctYmxhY2svNjAgYmFja2Ryb3AtYmx1ci14cyBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMTUwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctbGcgYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtdGVhbC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1iYXNlXCI+5omT5Yi744OH44O844K/44Gu5omL5YuV55m76YyyPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBwLTEgcm91bmRlZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVNhdmVOZXd9IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIOWvvuixoeOCueOCv+ODg+ODlSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdVc2VySWR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1VzZXJJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBweC0zIHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPuOCueOCv+ODg+ODleOCkumBuOaKnuOBl+OBpuOBj+OBoOOBleOBhDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAge3VzZXJzLm1hcCgodSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dS5pZH0gdmFsdWU9e3UuaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHt1Lm5hbWV9ICh7dS5lbXBsb3llZUNvZGV9IC0ge3UuZGVwYXJ0bWVudH0pXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICDlr77osaHml6Xku5ggKFlZWVkvTU0vREQpIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3RGF0ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3RGF0ZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjIwMjYvMTEvMDZcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOWHuuWLpOaZguWIuyA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3Q2xvY2tJbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdDbG9ja0luKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAg6YCA5Yuk5pmC5Yi7IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGltZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdDbG9ja091dH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdDbG9ja091dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXNtIGZvbnQtbW9ubyBweC0zIHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICDkvJHmhqnmmYLplpMgKOWIhilcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICBzdGVwPXs1fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0JyZWFrTWludXRlc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QnJlYWtNaW51dGVzKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg55m76Yyy55CG55Sx44O75YKZ6ICDXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdOb3RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdOb3RlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5L6LOiDmnInkvJHlj5blvpfjgIHlh7rlvLXmiYvli5XnmbvpjLLjgarjgalcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQteHMgcHgtMyBweS0yIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGZsZXgganVzdGlmeS1lbmQgZ2FwLTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNBZGRNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDAgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDjgq3jg6Pjg7Pjgrvjg6tcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBiZy1bIzMxODI4Zl0gaG92ZXI6YmctWyMyODZmN2JdIHJvdW5kZWQtbGcgc2hhZG93LXhzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDnmbvpjLLjgZnjgotcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=