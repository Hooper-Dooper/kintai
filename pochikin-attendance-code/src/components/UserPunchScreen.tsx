const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { Volume2, VolumeX, Lock, CheckCircle2, AlertCircle } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { sendPunchToGoogleSheets } from "/src/utils/gasSync.ts";
import { sound } from "/src/utils/sound.ts";
import { NoticeModal } from "/src/components/NoticeModal.tsx";
import { HistoryModal } from "/src/components/HistoryModal.tsx";
var _jsxFileName = "/app/applet/src/components/UserPunchScreen.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const UserPunchScreen = ({ onOpenAdminLogin, isAdminLoggedIn, onGoToAdmin }) => {
	const [settings, setSettings] = useState(storage.getSettings());
	const [users, setUsers] = useState(storage.getActiveEmployees());
	const [selectedUserId, setSelectedUserId] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());
	const [soundEnabled, setSoundEnabled] = useState(true);
	// Modals
	const [isNoticeOpen, setIsNoticeOpen] = useState(false);
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	// Status feedback toast
	const [toastMessage, setToastMessage] = useState(null);
	// Today's attendance for the selected user
	const [todayAttendance, setTodayAttendance] = useState(undefined);
	// Live Clock Ticker
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	// Refresh users and settings on mount and custom events
	const refreshData = () => {
		setSettings(storage.getSettings());
		setUsers(storage.getActiveEmployees());
		if (selectedUserId) {
			setTodayAttendance(storage.getTodayAttendanceForUser(selectedUserId));
		}
	};
	useEffect(() => {
		refreshData();
	}, [selectedUserId]);
	// Selected user info
	const selectedUser = users.find((u) => u.id === selectedUserId);
	// Punch Action Handler
	const handlePunch = async (punchType) => {
		if (!selectedUserId) {
			setToastMessage({
				type: "error",
				title: "名前を選択してください",
				detail: "打刻を行うスタッフのお名前を一覧から選んでください。"
			});
			setTimeout(() => setToastMessage(null), 4e3);
			return;
		}
		try {
			// 1. Play auditory feedback chime
			if (soundEnabled) {
				if (punchType === "clock_in" || punchType === "direct_in") {
					sound.playClockIn();
				} else if (punchType === "clock_out" || punchType === "direct_out") {
					sound.playClockOut();
				} else {
					sound.playBreak();
				}
			}
			// 2. Record locally in storage
			const result = storage.punch(selectedUserId, punchType);
			setTodayAttendance(result.attendance);
			// 3. Google Sheets automatic sync (GAS Webhook)
			const gasConfig = storage.getGasConfig();
			let syncNote = "";
			if (gasConfig.autoSyncEnabled && gasConfig.webAppUrl) {
				const payload = {
					action: "punch",
					date: result.attendance.date,
					name: result.attendance.employeeName,
					employeeCode: result.attendance.employeeCode,
					type: punchType === "clock_in" ? "出勤" : punchType === "clock_out" ? "退勤" : punchType === "break" ? "休憩" : punchType === "direct_in" ? "直行" : "直帰",
					time: result.punch.time,
					clockIn: result.attendance.clockIn,
					clockOut: result.attendance.clockOut,
					breakMinutes: result.attendance.breakMinutes,
					workHours: (result.attendance.totalWorkMinutes / 60).toFixed(1),
					note: result.attendance.note || "",
					timestamp: result.punch.timestamp
				};
				const syncRes = await sendPunchToGoogleSheets(gasConfig, payload);
				if (syncRes.success) {
					syncNote = " (スプレッドシートへ自動入力完了)";
					storage.updateGasConfig({
						lastSyncTime: new Date().toLocaleTimeString("ja-JP"),
						lastSyncStatus: "success",
						lastSyncMessage: `${result.attendance.employeeName}さんの打刻を正常記録`,
						syncCount: gasConfig.syncCount + 1
					});
				} else {
					syncNote = " (スプレッドシート送信待機中)";
					storage.updateGasConfig({
						lastSyncStatus: "error",
						lastSyncMessage: syncRes.message
					});
				}
			}
			const punchLabel = punchType === "clock_in" ? "出勤" : punchType === "clock_out" ? "退勤" : punchType === "break" ? "休憩" : punchType === "direct_in" ? "直行" : "直帰";
			setToastMessage({
				type: "success",
				title: `【${punchLabel}】打刻が完了しました`,
				detail: `${result.attendance.employeeName} さん (${result.punch.time})${syncNote}`
			});
			// Auto clear toast
			setTimeout(() => {
				setToastMessage(null);
			}, 5e3);
			// Optional auto-reset of selected user for shared kiosk
			if (settings.kioskAutoResetSeconds > 0) {
				setTimeout(() => {
					setSelectedUserId("");
					setTodayAttendance(undefined);
				}, settings.kioskAutoResetSeconds * 1e3);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			setToastMessage({
				type: "error",
				title: "打刻エラー",
				detail: msg
			});
		}
	};
	// Format digital clock string matching screenshot: "2026/11/06 14:20" (with ticking seconds)
	const formatClock = (d) => {
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		const hours = String(d.getHours()).padStart(2, "0");
		const minutes = String(d.getMinutes()).padStart(2, "0");
		const seconds = String(d.getSeconds()).padStart(2, "0");
		return {
			datePart: `${year}/${month}/${day}`,
			timePart: `${hours}:${minutes}`,
			secondsPart: seconds
		};
	};
	const clock = formatClock(currentTime);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-[#2d7d8e] flex flex-col items-center justify-center p-3 sm:p-6 select-none font-sans",
		children: [
			toastMessage && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed top-5 z-50 max-w-md w-[92%] animate-in fade-in slide-in-from-top-4 duration-200",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: `p-4 rounded-xl shadow-xl border flex items-start gap-3 ${toastMessage.type === "success" ? "bg-emerald-900/95 text-white border-emerald-500" : toastMessage.type === "error" ? "bg-rose-900/95 text-white border-rose-500" : "bg-slate-900/95 text-white border-slate-700"}`,
					children: [toastMessage.type === "success" ? /* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-6 h-6 text-emerald-400 shrink-0 mt-0.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 15
					}, this) : /* @__PURE__ */ _jsxDEV(AlertCircle, { className: "w-6 h-6 text-rose-400 shrink-0 mt-0.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "font-bold text-sm tracking-wide",
							children: toastMessage.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-xs text-white/90 mt-0.5",
							children: toastMessage.detail
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 200,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "w-full max-w-[540px] bg-[#2e7c8d] rounded-2xl p-4 sm:p-7 space-y-4 sm:space-y-5",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ _jsxDEV("h1", {
							className: "text-white text-lg sm:text-2xl font-bold tracking-tight leading-snug break-words",
							children: settings.facilityName || "就労継続支援B型事業所sabot"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setIsNoticeOpen(true),
									className: "px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#f39c12] hover:bg-[#e67e22] active:scale-95 rounded-md transition shadow-2xs whitespace-nowrap cursor-pointer",
									children: "重要なお知らせ"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setSoundEnabled(!soundEnabled),
									className: "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#a6b8be] hover:bg-[#95a8ae] active:scale-95 text-slate-800 rounded-md transition cursor-pointer",
									title: soundEnabled ? "音声を消音する" : "音声を有効にする",
									"aria-label": "打刻音切り替え",
									children: soundEnabled ? /* @__PURE__ */ _jsxDEV(Volume2, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-800" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 17
									}, this) : /* @__PURE__ */ _jsxDEV(VolumeX, { className: "w-4 h-4 sm:w-5 sm:h-5 text-rose-700" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: isAdminLoggedIn ? onGoToAdmin : onOpenAdminLogin,
									className: "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#48bb78] hover:bg-[#38a169] active:scale-95 text-white rounded-md transition cursor-pointer shadow-2xs",
									title: isAdminLoggedIn ? "管理者画面へ移動" : "管理者ログイン",
									"aria-label": "管理者メニュー",
									children: /* @__PURE__ */ _jsxDEV(Lock, { className: "w-4 h-4 sm:w-5 sm:h-5 text-white" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "w-full bg-[#112025] rounded-lg py-5 px-4 sm:py-7 sm:px-6 text-center shadow-inner",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "text-white text-3xl sm:text-5xl font-bold font-mono tracking-wider font-mono-num",
							children: [
								clock.datePart,
								" ",
								clock.timePart,
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xl sm:text-2xl text-slate-400 font-normal ml-1",
									children: [":", clock.secondsPart]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("select", {
						value: selectedUserId,
						onChange: (e) => setSelectedUserId(e.target.value),
						className: "w-full bg-white text-slate-800 text-base sm:text-lg font-medium px-4 py-3 rounded-md border-0 shadow-xs focus:outline-none focus:ring-4 focus:ring-[#45a4be]/50 transition cursor-pointer",
						children: [/* @__PURE__ */ _jsxDEV("option", {
							value: "",
							disabled: true,
							children: "名前を選択してください"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 289,
							columnNumber: 13
						}, this), users.map((u) => /* @__PURE__ */ _jsxDEV("option", {
							value: u.id,
							children: [
								u.name,
								" (",
								u.department,
								")"
							]
						}, u.id, true, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 15
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 284,
						columnNumber: 11
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 283,
						columnNumber: 9
					}, this),
					selectedUser && /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#215d6a]/80 text-white rounded-lg px-4 py-2 text-xs sm:text-sm flex items-center justify-between animate-in fade-in duration-150",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [
							/* @__PURE__ */ _jsxDEV("span", {
								className: "text-teal-200",
								children: "選択中:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 15
							}, this),
							" ",
							/* @__PURE__ */ _jsxDEV("span", {
								className: "font-bold",
								children: selectedUser.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-teal-200",
								children: "本日の状態:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: `font-bold px-2 py-0.5 rounded text-xs ${todayAttendance?.status === "working" ? "bg-emerald-500 text-white" : todayAttendance?.status === "on_break" ? "bg-amber-400 text-amber-950" : todayAttendance?.status === "completed" ? "bg-slate-200 text-slate-800" : "bg-white/20 text-white"}`,
								children: todayAttendance?.status === "working" ? `勤務中 (${todayAttendance.clockIn}〜)` : todayAttendance?.status === "on_break" ? "休憩中" : todayAttendance?.status === "completed" ? `退勤済 (${todayAttendance.clockIn} - ${todayAttendance.clockOut})` : "未出勤"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 307,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4",
						children: [/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => handlePunch("clock_in"),
							className: "bg-[#42a1b9] hover:bg-[#3993ab] active:scale-[0.98] text-white text-xl sm:text-3xl font-bold py-5 sm:py-8 rounded-md transition shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer",
							children: "出勤"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => handlePunch("clock_out"),
							className: "bg-[#42a1b9] hover:bg-[#3993ab] active:scale-[0.98] text-white text-xl sm:text-3xl font-bold py-5 sm:py-8 rounded-md transition shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer",
							children: "退勤"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 333,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-4 gap-2 sm:gap-3",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => handlePunch("break"),
								className: "bg-[#4fb0ca] hover:bg-[#439fb7] active:scale-[0.98] text-white text-sm sm:text-xl font-bold py-3.5 sm:py-5 rounded-md transition shadow-sm flex items-center justify-center cursor-pointer",
								children: "休憩"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 356,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => handlePunch("direct_in"),
								className: "bg-[#4fb0ca] hover:bg-[#439fb7] active:scale-[0.98] text-white text-sm sm:text-xl font-bold py-3.5 sm:py-5 rounded-md transition shadow-sm flex items-center justify-center cursor-pointer",
								children: "直行"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 365,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => handlePunch("direct_out"),
								className: "bg-[#4fb0ca] hover:bg-[#439fb7] active:scale-[0.98] text-white text-sm sm:text-xl font-bold py-3.5 sm:py-5 rounded-md transition shadow-sm flex items-center justify-center cursor-pointer",
								children: "直帰"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setIsHistoryOpen(true),
								className: "bg-[#4fb0ca] hover:bg-[#439fb7] active:scale-[0.98] text-white text-sm sm:text-xl font-bold py-3.5 sm:py-5 rounded-md transition shadow-sm flex items-center justify-center cursor-pointer",
								children: "履歴"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 354,
						columnNumber: 9
					}, this),
					isAdminLoggedIn && /* @__PURE__ */ _jsxDEV("div", {
						className: "pt-2 text-center",
						children: /* @__PURE__ */ _jsxDEV("button", {
							onClick: onGoToAdmin,
							className: "text-xs text-white/80 hover:text-white underline underline-offset-4 font-medium transition cursor-pointer",
							children: "管理者モードへ戻る (Pochikin管理画面)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 395,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(NoticeModal, {
				isOpen: isNoticeOpen,
				onClose: () => setIsNoticeOpen(false),
				settings
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 406,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(HistoryModal, {
				isOpen: isHistoryOpen,
				onClose: () => setIsHistoryOpen(false),
				selectedUserId,
				users
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 413,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 197,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUQ7TUFBSyxXQUFVO2dCQUNiLHdCQUFDLFVBQUQ7T0FDRSxTQUFTO09BQ1QsV0FBVTtpQkFDWDtNQUVPOzs7OztLQUNMOzs7OztJQUVKOzs7Ozs7R0FHTCx3QkFBQyxhQUFEO0lBQ0UsUUFBUTtJQUNSLGVBQWUsZ0JBQWdCLEtBQUs7SUFDMUI7R0FDWDs7Ozs7R0FHRCx3QkFBQyxjQUFEO0lBQ0UsUUFBUTtJQUNSLGVBQWUsaUJBQWlCLEtBQUs7SUFDckI7SUFDVDtHQUNSOzs7OztFQUNFOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJVc2VyUHVuY2hTY3JlZW4udHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVm9sdW1lMiwgVm9sdW1lWCwgTG9jaywgQ2hlY2tDaXJjbGUyLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBTeXN0ZW1TZXR0aW5ncywgVXNlciwgUHVuY2hUeXBlLCBEYWlseUF0dGVuZGFuY2UgfSBmcm9tICcuLi90eXBlcy9hdHRlbmRhbmNlJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi91dGlscy9zdG9yYWdlJztcbmltcG9ydCB7IHNlbmRQdW5jaFRvR29vZ2xlU2hlZXRzIH0gZnJvbSAnLi4vdXRpbHMvZ2FzU3luYyc7XG5pbXBvcnQgeyBzb3VuZCB9IGZyb20gJy4uL3V0aWxzL3NvdW5kJztcbmltcG9ydCB7IE5vdGljZU1vZGFsIH0gZnJvbSAnLi9Ob3RpY2VNb2RhbCc7XG5pbXBvcnQgeyBIaXN0b3J5TW9kYWwgfSBmcm9tICcuL0hpc3RvcnlNb2RhbCc7XG5cbmludGVyZmFjZSBVc2VyUHVuY2hTY3JlZW5Qcm9wcyB7XG4gIG9uT3BlbkFkbWluTG9naW46ICgpID0+IHZvaWQ7XG4gIGlzQWRtaW5Mb2dnZWRJbjogYm9vbGVhbjtcbiAgb25Hb1RvQWRtaW46ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBVc2VyUHVuY2hTY3JlZW46IFJlYWN0LkZDPFVzZXJQdW5jaFNjcmVlblByb3BzPiA9ICh7XG4gIG9uT3BlbkFkbWluTG9naW4sXG4gIGlzQWRtaW5Mb2dnZWRJbixcbiAgb25Hb1RvQWRtaW4sXG59KSA9PiB7XG4gIGNvbnN0IFtzZXR0aW5ncywgc2V0U2V0dGluZ3NdID0gdXNlU3RhdGU8U3lzdGVtU2V0dGluZ3M+KHN0b3JhZ2UuZ2V0U2V0dGluZ3MoKSk7XG4gIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGU8VXNlcltdPihzdG9yYWdlLmdldEFjdGl2ZUVtcGxveWVlcygpKTtcbiAgY29uc3QgW3NlbGVjdGVkVXNlcklkLCBzZXRTZWxlY3RlZFVzZXJJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2N1cnJlbnRUaW1lLCBzZXRDdXJyZW50VGltZV0gPSB1c2VTdGF0ZTxEYXRlPihuZXcgRGF0ZSgpKTtcbiAgY29uc3QgW3NvdW5kRW5hYmxlZCwgc2V0U291bmRFbmFibGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBcbiAgLy8gTW9kYWxzXG4gIGNvbnN0IFtpc05vdGljZU9wZW4sIHNldElzTm90aWNlT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtpc0hpc3RvcnlPcGVuLCBzZXRJc0hpc3RvcnlPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBTdGF0dXMgZmVlZGJhY2sgdG9hc3RcbiAgY29uc3QgW3RvYXN0TWVzc2FnZSwgc2V0VG9hc3RNZXNzYWdlXSA9IHVzZVN0YXRlPHtcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnaW5mbycgfCAnZXJyb3InO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgZGV0YWlsOiBzdHJpbmc7XG4gIH0gfCBudWxsPihudWxsKTtcblxuICAvLyBUb2RheSdzIGF0dGVuZGFuY2UgZm9yIHRoZSBzZWxlY3RlZCB1c2VyXG4gIGNvbnN0IFt0b2RheUF0dGVuZGFuY2UsIHNldFRvZGF5QXR0ZW5kYW5jZV0gPSB1c2VTdGF0ZTxEYWlseUF0dGVuZGFuY2UgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgLy8gTGl2ZSBDbG9jayBUaWNrZXJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHNldEN1cnJlbnRUaW1lKG5ldyBEYXRlKCkpO1xuICAgIH0sIDEwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgfSwgW10pO1xuXG4gIC8vIFJlZnJlc2ggdXNlcnMgYW5kIHNldHRpbmdzIG9uIG1vdW50IGFuZCBjdXN0b20gZXZlbnRzXG4gIGNvbnN0IHJlZnJlc2hEYXRhID0gKCkgPT4ge1xuICAgIHNldFNldHRpbmdzKHN0b3JhZ2UuZ2V0U2V0dGluZ3MoKSk7XG4gICAgc2V0VXNlcnMoc3RvcmFnZS5nZXRBY3RpdmVFbXBsb3llZXMoKSk7XG4gICAgaWYgKHNlbGVjdGVkVXNlcklkKSB7XG4gICAgICBzZXRUb2RheUF0dGVuZGFuY2Uoc3RvcmFnZS5nZXRUb2RheUF0dGVuZGFuY2VGb3JVc2VyKHNlbGVjdGVkVXNlcklkKSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVmcmVzaERhdGEoKTtcbiAgfSwgW3NlbGVjdGVkVXNlcklkXSk7XG5cbiAgLy8gU2VsZWN0ZWQgdXNlciBpbmZvXG4gIGNvbnN0IHNlbGVjdGVkVXNlciA9IHVzZXJzLmZpbmQoKHUpID0+IHUuaWQgPT09IHNlbGVjdGVkVXNlcklkKTtcblxuICAvLyBQdW5jaCBBY3Rpb24gSGFuZGxlclxuICBjb25zdCBoYW5kbGVQdW5jaCA9IGFzeW5jIChwdW5jaFR5cGU6IFB1bmNoVHlwZSkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRVc2VySWQpIHtcbiAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRpdGxlOiAn5ZCN5YmN44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEJyxcbiAgICAgICAgZGV0YWlsOiAn5omT5Yi744KS6KGM44GG44K544K/44OD44OV44Gu44GK5ZCN5YmN44KS5LiA6Kan44GL44KJ6YG444KT44Gn44GP44Gg44GV44GE44CCJyxcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRUb2FzdE1lc3NhZ2UobnVsbCksIDQwMDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyAxLiBQbGF5IGF1ZGl0b3J5IGZlZWRiYWNrIGNoaW1lXG4gICAgICBpZiAoc291bmRFbmFibGVkKSB7XG4gICAgICAgIGlmIChwdW5jaFR5cGUgPT09ICdjbG9ja19pbicgfHwgcHVuY2hUeXBlID09PSAnZGlyZWN0X2luJykge1xuICAgICAgICAgIHNvdW5kLnBsYXlDbG9ja0luKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHVuY2hUeXBlID09PSAnY2xvY2tfb3V0JyB8fCBwdW5jaFR5cGUgPT09ICdkaXJlY3Rfb3V0Jykge1xuICAgICAgICAgIHNvdW5kLnBsYXlDbG9ja091dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvdW5kLnBsYXlCcmVhaygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIFJlY29yZCBsb2NhbGx5IGluIHN0b3JhZ2VcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHN0b3JhZ2UucHVuY2goc2VsZWN0ZWRVc2VySWQsIHB1bmNoVHlwZSk7XG4gICAgICBzZXRUb2RheUF0dGVuZGFuY2UocmVzdWx0LmF0dGVuZGFuY2UpO1xuXG4gICAgICAvLyAzLiBHb29nbGUgU2hlZXRzIGF1dG9tYXRpYyBzeW5jIChHQVMgV2ViaG9vaylcbiAgICAgIGNvbnN0IGdhc0NvbmZpZyA9IHN0b3JhZ2UuZ2V0R2FzQ29uZmlnKCk7XG4gICAgICBsZXQgc3luY05vdGUgPSAnJztcblxuICAgICAgaWYgKGdhc0NvbmZpZy5hdXRvU3luY0VuYWJsZWQgJiYgZ2FzQ29uZmlnLndlYkFwcFVybCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGFjdGlvbjogJ3B1bmNoJyBhcyBjb25zdCxcbiAgICAgICAgICBkYXRlOiByZXN1bHQuYXR0ZW5kYW5jZS5kYXRlLFxuICAgICAgICAgIG5hbWU6IHJlc3VsdC5hdHRlbmRhbmNlLmVtcGxveWVlTmFtZSxcbiAgICAgICAgICBlbXBsb3llZUNvZGU6IHJlc3VsdC5hdHRlbmRhbmNlLmVtcGxveWVlQ29kZSxcbiAgICAgICAgICB0eXBlOlxuICAgICAgICAgICAgcHVuY2hUeXBlID09PSAnY2xvY2tfaW4nXG4gICAgICAgICAgICAgID8gJ+WHuuWLpCdcbiAgICAgICAgICAgICAgOiBwdW5jaFR5cGUgPT09ICdjbG9ja19vdXQnXG4gICAgICAgICAgICAgID8gJ+mAgOWLpCdcbiAgICAgICAgICAgICAgOiBwdW5jaFR5cGUgPT09ICdicmVhaydcbiAgICAgICAgICAgICAgPyAn5LyR5oapJ1xuICAgICAgICAgICAgICA6IHB1bmNoVHlwZSA9PT0gJ2RpcmVjdF9pbidcbiAgICAgICAgICAgICAgPyAn55u06KGMJ1xuICAgICAgICAgICAgICA6ICfnm7TluLAnLFxuICAgICAgICAgIHRpbWU6IHJlc3VsdC5wdW5jaC50aW1lLFxuICAgICAgICAgIGNsb2NrSW46IHJlc3VsdC5hdHRlbmRhbmNlLmNsb2NrSW4sXG4gICAgICAgICAgY2xvY2tPdXQ6IHJlc3VsdC5hdHRlbmRhbmNlLmNsb2NrT3V0LFxuICAgICAgICAgIGJyZWFrTWludXRlczogcmVzdWx0LmF0dGVuZGFuY2UuYnJlYWtNaW51dGVzLFxuICAgICAgICAgIHdvcmtIb3VyczogKHJlc3VsdC5hdHRlbmRhbmNlLnRvdGFsV29ya01pbnV0ZXMgLyA2MCkudG9GaXhlZCgxKSxcbiAgICAgICAgICBub3RlOiByZXN1bHQuYXR0ZW5kYW5jZS5ub3RlIHx8ICcnLFxuICAgICAgICAgIHRpbWVzdGFtcDogcmVzdWx0LnB1bmNoLnRpbWVzdGFtcCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzeW5jUmVzID0gYXdhaXQgc2VuZFB1bmNoVG9Hb29nbGVTaGVldHMoZ2FzQ29uZmlnLCBwYXlsb2FkKTtcbiAgICAgICAgaWYgKHN5bmNSZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHN5bmNOb3RlID0gJyAo44K544OX44Os44OD44OJ44K344O844OI44G46Ieq5YuV5YWl5Yqb5a6M5LqGKSc7XG4gICAgICAgICAgc3RvcmFnZS51cGRhdGVHYXNDb25maWcoe1xuICAgICAgICAgICAgbGFzdFN5bmNUaW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygnamEtSlAnKSxcbiAgICAgICAgICAgIGxhc3RTeW5jU3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBsYXN0U3luY01lc3NhZ2U6IGAke3Jlc3VsdC5hdHRlbmRhbmNlLmVtcGxveWVlTmFtZX3jgZXjgpPjga7miZPliLvjgpLmraPluLjoqJjpjLJgLFxuICAgICAgICAgICAgc3luY0NvdW50OiBnYXNDb25maWcuc3luY0NvdW50ICsgMSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzeW5jTm90ZSA9ICcgKOOCueODl+ODrOODg+ODieOCt+ODvOODiOmAgeS/oeW+heapn+S4rSknO1xuICAgICAgICAgIHN0b3JhZ2UudXBkYXRlR2FzQ29uZmlnKHtcbiAgICAgICAgICAgIGxhc3RTeW5jU3RhdHVzOiAnZXJyb3InLFxuICAgICAgICAgICAgbGFzdFN5bmNNZXNzYWdlOiBzeW5jUmVzLm1lc3NhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcHVuY2hMYWJlbCA9XG4gICAgICAgIHB1bmNoVHlwZSA9PT0gJ2Nsb2NrX2luJ1xuICAgICAgICAgID8gJ+WHuuWLpCdcbiAgICAgICAgICA6IHB1bmNoVHlwZSA9PT0gJ2Nsb2NrX291dCdcbiAgICAgICAgICA/ICfpgIDli6QnXG4gICAgICAgICAgOiBwdW5jaFR5cGUgPT09ICdicmVhaydcbiAgICAgICAgICA/ICfkvJHmhqknXG4gICAgICAgICAgOiBwdW5jaFR5cGUgPT09ICdkaXJlY3RfaW4nXG4gICAgICAgICAgPyAn55u06KGMJ1xuICAgICAgICAgIDogJ+ebtOW4sCc7XG5cbiAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6IGDjgJAke3B1bmNoTGFiZWx944CR5omT5Yi744GM5a6M5LqG44GX44G+44GX44GfYCxcbiAgICAgICAgZGV0YWlsOiBgJHtyZXN1bHQuYXR0ZW5kYW5jZS5lbXBsb3llZU5hbWV9IOOBleOCkyAoJHtyZXN1bHQucHVuY2gudGltZX0pJHtzeW5jTm90ZX1gLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEF1dG8gY2xlYXIgdG9hc3RcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRUb2FzdE1lc3NhZ2UobnVsbCk7XG4gICAgICB9LCA1MDAwKTtcblxuICAgICAgLy8gT3B0aW9uYWwgYXV0by1yZXNldCBvZiBzZWxlY3RlZCB1c2VyIGZvciBzaGFyZWQga2lvc2tcbiAgICAgIGlmIChzZXR0aW5ncy5raW9za0F1dG9SZXNldFNlY29uZHMgPiAwKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNldFNlbGVjdGVkVXNlcklkKCcnKTtcbiAgICAgICAgICBzZXRUb2RheUF0dGVuZGFuY2UodW5kZWZpbmVkKTtcbiAgICAgICAgfSwgc2V0dGluZ3Mua2lvc2tBdXRvUmVzZXRTZWNvbmRzICogMTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBtc2cgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycik7XG4gICAgICBzZXRUb2FzdE1lc3NhZ2Uoe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogJ+aJk+WIu+OCqOODqeODvCcsXG4gICAgICAgIGRldGFpbDogbXNnLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEZvcm1hdCBkaWdpdGFsIGNsb2NrIHN0cmluZyBtYXRjaGluZyBzY3JlZW5zaG90OiBcIjIwMjYvMTEvMDYgMTQ6MjBcIiAod2l0aCB0aWNraW5nIHNlY29uZHMpXG4gIGNvbnN0IGZvcm1hdENsb2NrID0gKGQ6IERhdGUpID0+IHtcbiAgICBjb25zdCB5ZWFyID0gZC5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3QgZGF5ID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IGhvdXJzID0gU3RyaW5nKGQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGQuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IHNlY29uZHMgPSBTdHJpbmcoZC5nZXRTZWNvbmRzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGVQYXJ0OiBgJHt5ZWFyfS8ke21vbnRofS8ke2RheX1gLFxuICAgICAgdGltZVBhcnQ6IGAke2hvdXJzfToke21pbnV0ZXN9YCxcbiAgICAgIHNlY29uZHNQYXJ0OiBzZWNvbmRzLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY2xvY2sgPSBmb3JtYXRDbG9jayhjdXJyZW50VGltZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1bIzJkN2Q4ZV0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0zIHNtOnAtNiBzZWxlY3Qtbm9uZSBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb2FzdCBOb3RpZmljYXRpb24gKi99XG4gICAgICB7dG9hc3RNZXNzYWdlICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCB0b3AtNSB6LTUwIG1heC13LW1kIHctWzkyJV0gYW5pbWF0ZS1pbiBmYWRlLWluIHNsaWRlLWluLWZyb20tdG9wLTQgZHVyYXRpb24tMjAwXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgc2hhZG93LXhsIGJvcmRlciBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zICR7XG4gICAgICAgICAgICAgIHRvYXN0TWVzc2FnZS50eXBlID09PSAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTkwMC85NSB0ZXh0LXdoaXRlIGJvcmRlci1lbWVyYWxkLTUwMCdcbiAgICAgICAgICAgICAgICA6IHRvYXN0TWVzc2FnZS50eXBlID09PSAnZXJyb3InXG4gICAgICAgICAgICAgICAgPyAnYmctcm9zZS05MDAvOTUgdGV4dC13aGl0ZSBib3JkZXItcm9zZS01MDAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzk1IHRleHQtd2hpdGUgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0b2FzdE1lc3NhZ2UudHlwZSA9PT0gJ3N1Y2Nlc3MnID8gKFxuICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEFsZXJ0Q2lyY2xlIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1yb3NlLTQwMCBzaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc20gdHJhY2tpbmctd2lkZVwiPnt0b2FzdE1lc3NhZ2UudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXdoaXRlLzkwIG10LTAuNVwiPnt0b2FzdE1lc3NhZ2UuZGV0YWlsfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIE1haW4gS2lvc2sgQ2FyZCAtIE1hdGNoZXMgU2NyZWVuc2hvdCAyIHBlcmZlY3RseSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LVs1NDBweF0gYmctWyMyZTdjOGRdIHJvdW5kZWQtMnhsIHAtNCBzbTpwLTcgc3BhY2UteS00IHNtOnNwYWNlLXktNVwiPlxuICAgICAgICBcbiAgICAgICAgey8qIFRvcCBIZWFkZXIgUm93ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgIHsvKiBGYWNpbGl0eSAvIE9yZ2FuaXphdGlvbiBOYW1lICovfVxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtbGcgc206dGV4dC0yeGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctc251ZyBicmVhay13b3Jkc1wiPlxuICAgICAgICAgICAge3NldHRpbmdzLmZhY2lsaXR5TmFtZSB8fCAn5bCx5Yq057aZ57aa5pSv5o+0QuWei+S6i+alreaJgHNhYm90J31cbiAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgey8qIFF1aWNrIGFjdGlvbiBidXR0b25zIHJvdyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNocmluay0wXCI+XG4gICAgICAgICAgICB7Lyog6YeN6KaB44Gq44GK55+l44KJ44GbIEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTm90aWNlT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHNtOnB4LTMgcHktMS41IHNtOnB5LTIgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGJnLVsjZjM5YzEyXSBob3ZlcjpiZy1bI2U2N2UyMl0gYWN0aXZlOnNjYWxlLTk1IHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBzaGFkb3ctMnhzIHdoaXRlc3BhY2Utbm93cmFwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg6YeN6KaB44Gq44GK55+l44KJ44GbXG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFNvdW5kIFRvZ2dsZSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNvdW5kRW5hYmxlZCghc291bmRFbmFibGVkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCBzbTp3LTkgc206aC05IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLVsjYTZiOGJlXSBob3ZlcjpiZy1bIzk1YThhZV0gYWN0aXZlOnNjYWxlLTk1IHRleHQtc2xhdGUtODAwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPXtzb3VuZEVuYWJsZWQgPyAn6Z+z5aOw44KS5raI6Z+z44GZ44KLJyA6ICfpn7Plo7DjgpLmnInlirnjgavjgZnjgosnfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwi5omT5Yi76Z+z5YiH44KK5pu/44GIXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3NvdW5kRW5hYmxlZCA/IChcbiAgICAgICAgICAgICAgICA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTQgaC00IHNtOnctNSBzbTpoLTUgdGV4dC1zbGF0ZS04MDBcIiAvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTQgc206dy01IHNtOmgtNSB0ZXh0LXJvc2UtNzAwXCIgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogQWRtaW4gTG9jayAvIFVubG9jayBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtpc0FkbWluTG9nZ2VkSW4gPyBvbkdvVG9BZG1pbiA6IG9uT3BlbkFkbWluTG9naW59XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggc206dy05IHNtOmgtOSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1bIzQ4YmI3OF0gaG92ZXI6YmctWyMzOGExNjldIGFjdGl2ZTpzY2FsZS05NSB0ZXh0LXdoaXRlIHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBjdXJzb3ItcG9pbnRlciBzaGFkb3ctMnhzXCJcbiAgICAgICAgICAgICAgdGl0bGU9e2lzQWRtaW5Mb2dnZWRJbiA/ICfnrqHnkIbogIXnlLvpnaLjgbjnp7vli5UnIDogJ+euoeeQhuiAheODreOCsOOCpOODsyd9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCLnrqHnkIbogIXjg6Hjg4vjg6Xjg7xcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHNtOnctNSBzbTpoLTUgdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENlbnRyYWwgQmxhY2sgRGlnaXRhbCBDbG9jayBEaXNwbGF5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMjAyNV0gcm91bmRlZC1sZyBweS01IHB4LTQgc206cHktNyBzbTpweC02IHRleHQtY2VudGVyIHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSB0ZXh0LTN4bCBzbTp0ZXh0LTV4bCBmb250LWJvbGQgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgIHtjbG9jay5kYXRlUGFydH0ge2Nsb2NrLnRpbWVQYXJ0fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCB0ZXh0LXNsYXRlLTQwMCBmb250LW5vcm1hbCBtbC0xXCI+XG4gICAgICAgICAgICAgIDp7Y2xvY2suc2Vjb25kc1BhcnR9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBFbXBsb3llZSBOYW1lIFNlbGVjdG9yIERyb3Bkb3duICovfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZFVzZXJJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRVc2VySWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIHRleHQtc2xhdGUtODAwIHRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtbWVkaXVtIHB4LTQgcHktMyByb3VuZGVkLW1kIGJvcmRlci0wIHNoYWRvdy14cyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctWyM0NWE0YmVdLzUwIHRyYW5zaXRpb24gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD5cbiAgICAgICAgICAgICAg5ZCN5YmN44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEXG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgIHt1c2Vycy5tYXAoKHUpID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3UuaWR9IHZhbHVlPXt1LmlkfT5cbiAgICAgICAgICAgICAgICB7dS5uYW1lfSAoe3UuZGVwYXJ0bWVudH0pXG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTdGF0dXMgSW5kaWNhdG9yIEJhciAoV2hlbiB1c2VyIGlzIHNlbGVjdGVkKSAqL31cbiAgICAgICAge3NlbGVjdGVkVXNlciAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzIxNWQ2YV0vODAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHB4LTQgcHktMiB0ZXh0LXhzIHNtOnRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdGVhbC0yMDBcIj7pgbjmip7kuK06PC9zcGFuPnsnICd9XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPntzZWxlY3RlZFVzZXIubmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10ZWFsLTIwMFwiPuacrOaXpeOBrueKtuaFizo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1ib2xkIHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC14cyAke1xuICAgICAgICAgICAgICAgICAgdG9kYXlBdHRlbmRhbmNlPy5zdGF0dXMgPT09ICd3b3JraW5nJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICA6IHRvZGF5QXR0ZW5kYW5jZT8uc3RhdHVzID09PSAnb25fYnJlYWsnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTQwMCB0ZXh0LWFtYmVyLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgOiB0b2RheUF0dGVuZGFuY2U/LnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtMjAwIHRleHQtc2xhdGUtODAwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZS8yMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RvZGF5QXR0ZW5kYW5jZT8uc3RhdHVzID09PSAnd29ya2luZydcbiAgICAgICAgICAgICAgICAgID8gYOWLpOWLmeS4rSAoJHt0b2RheUF0dGVuZGFuY2UuY2xvY2tJbn3jgJwpYFxuICAgICAgICAgICAgICAgICAgOiB0b2RheUF0dGVuZGFuY2U/LnN0YXR1cyA9PT0gJ29uX2JyZWFrJ1xuICAgICAgICAgICAgICAgICAgPyAn5LyR5oap5LitJ1xuICAgICAgICAgICAgICAgICAgOiB0b2RheUF0dGVuZGFuY2U/LnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCdcbiAgICAgICAgICAgICAgICAgID8gYOmAgOWLpOa4iCAoJHt0b2RheUF0dGVuZGFuY2UuY2xvY2tJbn0gLSAke3RvZGF5QXR0ZW5kYW5jZS5jbG9ja091dH0pYFxuICAgICAgICAgICAgICAgICAgOiAn5pyq5Ye65YukJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFByaW1hcnkgQmlnIFB1bmNoIEJ1dHRvbnMgKFJvdyAxOiAyIENvbHVtbnMgLSDlh7rli6QgLyDpgIDli6QpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgc206Z2FwLTRcIj5cbiAgICAgICAgICB7Lyog5Ye65YukIChDbG9jayBJbikgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQdW5jaCgnY2xvY2tfaW4nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjNDJhMWI5XSBob3ZlcjpiZy1bIzM5OTNhYl0gYWN0aXZlOnNjYWxlLVswLjk4XSB0ZXh0LXdoaXRlIHRleHQteGwgc206dGV4dC0zeGwgZm9udC1ib2xkIHB5LTUgc206cHktOCByb3VuZGVkLW1kIHRyYW5zaXRpb24gc2hhZG93LW1kIGhvdmVyOnNoYWRvdy1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg5Ye65YukXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7Lyog6YCA5YukIChDbG9jayBPdXQpICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUHVuY2goJ2Nsb2NrX291dCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctWyM0MmExYjldIGhvdmVyOmJnLVsjMzk5M2FiXSBhY3RpdmU6c2NhbGUtWzAuOThdIHRleHQtd2hpdGUgdGV4dC14bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgcHktNSBzbTpweS04IHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDpgIDli6RcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNlY29uZGFyeSBQdW5jaCBCdXR0b25zIChSb3cgMjogNCBDb2x1bW5zIC0g5LyR5oapIC8g55u06KGMIC8g55u05biwIC8g5bGl5q20KSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy00IGdhcC0yIHNtOmdhcC0zXCI+XG4gICAgICAgICAgey8qIOS8keaGqSAoQnJlYWspICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUHVuY2goJ2JyZWFrJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1bIzRmYjBjYV0gaG92ZXI6YmctWyM0MzlmYjddIGFjdGl2ZTpzY2FsZS1bMC45OF0gdGV4dC13aGl0ZSB0ZXh0LXNtIHNtOnRleHQteGwgZm9udC1ib2xkIHB5LTMuNSBzbTpweS01IHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBzaGFkb3ctc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOS8keaGqVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIOebtOihjCAoRGlyZWN0IEluKSAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVB1bmNoKCdkaXJlY3RfaW4nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjNGZiMGNhXSBob3ZlcjpiZy1bIzQzOWZiN10gYWN0aXZlOnNjYWxlLVswLjk4XSB0ZXh0LXdoaXRlIHRleHQtc20gc206dGV4dC14bCBmb250LWJvbGQgcHktMy41IHNtOnB5LTUgcm91bmRlZC1tZCB0cmFuc2l0aW9uIHNoYWRvdy1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg55u06KGMXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7Lyog55u05biwIChEaXJlY3QgT3V0KSAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVB1bmNoKCdkaXJlY3Rfb3V0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1bIzRmYjBjYV0gaG92ZXI6YmctWyM0MzlmYjddIGFjdGl2ZTpzY2FsZS1bMC45OF0gdGV4dC13aGl0ZSB0ZXh0LXNtIHNtOnRleHQteGwgZm9udC1ib2xkIHB5LTMuNSBzbTpweS01IHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBzaGFkb3ctc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOebtOW4sFxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIOWxpeattCAoSGlzdG9yeSAtIOmBjuWOu+OBruODreOCsOWFqOS7tumWsuimpykgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0hpc3RvcnlPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctWyM0ZmIwY2FdIGhvdmVyOmJnLVsjNDM5ZmI3XSBhY3RpdmU6c2NhbGUtWzAuOThdIHRleHQtd2hpdGUgdGV4dC1zbSBzbTp0ZXh0LXhsIGZvbnQtYm9sZCBweS0zLjUgc206cHktNSByb3VuZGVkLW1kIHRyYW5zaXRpb24gc2hhZG93LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDlsaXmrbRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEFkbWluIFF1aWNrIFN3aXRjaCBsaW5rIGlmIGFkbWluIGlzIGxvZ2dlZCBpbiAqL31cbiAgICAgICAge2lzQWRtaW5Mb2dnZWRJbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uR29Ub0FkbWlufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtd2hpdGUvODAgaG92ZXI6dGV4dC13aGl0ZSB1bmRlcmxpbmUgdW5kZXJsaW5lLW9mZnNldC00IGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDnrqHnkIbogIXjg6Ljg7zjg4njgbjmiLvjgosgKFBvY2hpa2lu566h55CG55S76Z2iKVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE5vdGljZSBNb2RhbCAqL31cbiAgICAgIDxOb3RpY2VNb2RhbFxuICAgICAgICBpc09wZW49e2lzTm90aWNlT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNOb3RpY2VPcGVuKGZhbHNlKX1cbiAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgLz5cblxuICAgICAgey8qIEhpc3RvcnkgTW9kYWwgKOmBjuWOu+OBruODreOCsOOBmeOBueOBpueiuuiqjSkgKi99XG4gICAgICA8SGlzdG9yeU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNIaXN0b3J5T3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNIaXN0b3J5T3BlbihmYWxzZSl9XG4gICAgICAgIHNlbGVjdGVkVXNlcklkPXtzZWxlY3RlZFVzZXJJZH1cbiAgICAgICAgdXNlcnM9e3VzZXJzfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=