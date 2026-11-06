const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { Save, Bell, Clock, Building, KeyRound, RotateCcw, Check } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminSettings.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminSettings = ({ onSettingsChanged }) => {
	const [settings, setSettings] = useState(storage.getSettings());
	const [isSaved, setIsSaved] = useState(false);
	// Admin password change
	const [adminUser, setAdminUser] = useState(() => {
		return storage.getUsers().find((u) => u.role === "admin");
	});
	const [newAdminPassword, setNewAdminPassword] = useState("");
	const [passwordChangedMessage, setPasswordChangedMessage] = useState("");
	const handleSaveSettings = (e) => {
		e.preventDefault();
		storage.updateSettings(settings);
		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 2500);
		onSettingsChanged();
	};
	const handleChangeAdminPassword = (e) => {
		e.preventDefault();
		if (!adminUser || !newAdminPassword.trim()) return;
		storage.updateUser(adminUser.id, { password: newAdminPassword.trim() });
		setPasswordChangedMessage("管理者パスワードを更新しました。");
		setNewAdminPassword("");
		setTimeout(() => setPasswordChangedMessage(""), 3e3);
	};
	const handleResetData = () => {
		if (window.confirm("【注意】すべての勤怠データ・従業員設定を初期デモデータに戻しますか？（この操作は元に戻せません）")) {
			storage.resetAllData();
			setSettings(storage.getSettings());
			onSettingsChanged();
			alert("初期デモデータにリセットしました。");
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between",
				children: /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-xl font-bold text-slate-900 tracking-tight",
					children: "システム基本設定"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-xs text-slate-500 mt-1",
					children: "事業所名、お知らせ掲示板、打刻丸め単位、管理者認証の設定が行えます。"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("form", {
				onSubmit: handleSaveSettings,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 border-b border-slate-100 pb-3",
							children: [/* @__PURE__ */ _jsxDEV(Building, { className: "w-5 h-5 text-[#31828f]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "事業所・企業情報"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: ["事業所名 / 会社名 ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 26
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: settings.facilityName,
								onChange: (e) => setSettings({
									...settings,
									facilityName: e.target.value
								}),
								placeholder: "例: 就労継続支援B型事業所sabot",
								className: "w-full max-w-lg text-sm px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "text-[11px] text-slate-500 mt-1",
								children: "利用者打刻画面の左上に大きく表示される名称です。"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2 border-b border-slate-100 pb-3",
								children: [/* @__PURE__ */ _jsxDEV(Bell, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("h3", {
									className: "font-bold text-slate-900 text-sm",
									children: "「重要なお知らせ」掲示板の編集"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "お知らせ見出し"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: settings.announcementTitle,
								onChange: (e) => setSettings({
									...settings,
									announcementTitle: e.target.value
								}),
								className: "w-full max-w-md text-sm px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "お知らせ本文"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("textarea", {
									rows: 3,
									value: settings.announcementContent,
									onChange: (e) => setSettings({
										...settings,
										announcementContent: e.target.value
									}),
									className: "w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-[11px] text-slate-500 mt-1",
									children: "打刻画面右上のオレンジ色ボタン「重要なお知らせ」を押した際にポップアップ表示されます。"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 13
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 border-b border-slate-100 pb-3",
							children: [/* @__PURE__ */ _jsxDEV(Clock, { className: "w-5 h-5 text-indigo-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "勤務時間・打刻仕様"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "所定労働時間 (日)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV("input", {
										type: "number",
										min: 1,
										max: 24,
										value: settings.standardWorkHours,
										onChange: (e) => setSettings({
											...settings,
											standardWorkHours: Number(e.target.value)
										}),
										className: "w-24 text-sm font-mono px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-center"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs text-slate-600",
										children: "時間 (超過分を残業計算)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "打刻丸め単位"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: settings.roundMinutes,
									onChange: (e) => setSettings({
										...settings,
										roundMinutes: Number(e.target.value)
									}),
									className: "w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: 1,
											children: "1分単位 (実測そのまま)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 161,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 5,
											children: "5分単位"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 15,
											children: "15分単位"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 163,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 30,
											children: "30分単位"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 164,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "打刻後の自動リセット時間"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: settings.kioskAutoResetSeconds,
									onChange: (e) => setSettings({
										...settings,
										kioskAutoResetSeconds: Number(e.target.value)
									}),
									className: "w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: 0,
											children: "自動リセットなし"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 5,
											children: "5秒後に名前選択を解除"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 178,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 8,
											children: "8秒後に名前選択を解除"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 179,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: 15,
											children: "15秒後に名前選択を解除"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 180,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-end gap-3 pt-2",
						children: [isSaved && /* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs text-emerald-600 font-bold inline-flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 15
							}, this), "設定を保存しました"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "submit",
							className: "px-6 py-2.5 text-xs font-bold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg transition inline-flex items-center gap-1.5 shadow-xs",
							children: [/* @__PURE__ */ _jsxDEV(Save, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 13
							}, this), "設定を保存"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2 border-b border-slate-100 pb-3",
					children: [/* @__PURE__ */ _jsxDEV(KeyRound, { className: "w-5 h-5 text-slate-700" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("h3", {
						className: "font-bold text-slate-900 text-sm",
						children: "管理者パスワードの変更"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("form", {
					onSubmit: handleChangeAdminPassword,
					className: "flex flex-wrap items-end gap-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1",
							children: "新しい管理者パスワード"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "password",
							value: newAdminPassword,
							onChange: (e) => setNewAdminPassword(e.target.value),
							placeholder: "新しいパスワードを入力",
							className: "w-64 text-xs px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "submit",
							className: "px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition",
							children: "パスワード更新"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 11
						}, this),
						passwordChangedMessage && /* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs text-emerald-600 font-bold ml-2",
							children: passwordChangedMessage
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-rose-50/50 rounded-xl border border-rose-200 p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
					className: "font-bold text-rose-900 text-sm",
					children: "初期デモデータへのリセット"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-xs text-rose-700 mt-0.5",
					children: "すべての登録データと打刻履歴を初期サンプル（過去30日分の打刻実績）に復元します。"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 243,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: handleResetData,
					className: "px-4 py-2 text-xs font-bold text-rose-700 hover:text-white hover:bg-rose-600 bg-white border border-rose-300 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
					children: [/* @__PURE__ */ _jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 11
					}, this), "データを初期化する"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 247,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 240,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 53,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUMsT0FFdEI7Ozs7O2NBQ0w7Ozs7OztJQUNEOzs7Ozs7R0FHTix3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLHlCQUEwQjs7OztlQUM5Qyx3QkFBQyxNQUFEO01BQUksV0FBVTtnQkFBbUM7S0FBZTs7OzthQUM3RDs7Ozs7Y0FFTCx3QkFBQyxRQUFEO0tBQU0sVUFBVTtLQUEyQixXQUFVO2VBQXJEO01BQ0Usd0JBQUMsT0FBRCxhQUNFLHdCQUFDLFNBQUQ7T0FBTyxXQUFVO2lCQUFrRDtNQUU1RDs7OztnQkFDUCx3QkFBQyxTQUFEO09BQ0UsTUFBSztPQUNMLE9BQU87T0FDUCxXQUFXLE1BQU0sb0JBQW9CLEVBQUUsT0FBTyxLQUFLO09BQ25ELGFBQVk7T0FDWixXQUFVO09BQ1Y7TUFDRDs7OztjQUNFOzs7OztNQUNMLHdCQUFDLFVBQUQ7T0FDRSxNQUFLO09BQ0wsV0FBVTtpQkFDWDtNQUVPOzs7OztNQUNQLDBCQUNDLHdCQUFDLFFBQUQ7T0FBTSxXQUFVO2lCQUNiO01BQ0c7Ozs7O0tBRUo7Ozs7O1lBQ0g7Ozs7OztHQUdMLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxPQUFELGFBQ0Usd0JBQUMsTUFBRDtLQUFJLFdBQVU7ZUFBa0M7SUFBaUI7Ozs7Y0FDakUsd0JBQUMsS0FBRDtLQUFHLFdBQVU7ZUFBK0I7SUFFekM7Ozs7WUFDQTs7OztjQUNMLHdCQUFDLFVBQUQ7S0FDRSxNQUFLO0tBQ0wsU0FBUztLQUNULFdBQVU7ZUFIWixDQUtFLHdCQUFDLFdBQUQsRUFBVyxXQUFVLGNBQWU7Ozs7ZUFBQyxXQUUvQjs7Ozs7WUFDTDs7Ozs7O0VBQ0Y7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFkbWluU2V0dGluZ3MudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNldHRpbmdzLCBTYXZlLCBCZWxsLCBDbG9jaywgQnVpbGRpbmcsIEtleVJvdW5kLCBSb3RhdGVDY3csIENoZWNrIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFN5c3RlbVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZSc7XG5cbmludGVyZmFjZSBBZG1pblNldHRpbmdzUHJvcHMge1xuICBvblNldHRpbmdzQ2hhbmdlZDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEFkbWluU2V0dGluZ3M6IFJlYWN0LkZDPEFkbWluU2V0dGluZ3NQcm9wcz4gPSAoeyBvblNldHRpbmdzQ2hhbmdlZCB9KSA9PiB7XG4gIGNvbnN0IFtzZXR0aW5ncywgc2V0U2V0dGluZ3NdID0gdXNlU3RhdGU8U3lzdGVtU2V0dGluZ3M+KHN0b3JhZ2UuZ2V0U2V0dGluZ3MoKSk7XG4gIGNvbnN0IFtpc1NhdmVkLCBzZXRJc1NhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBBZG1pbiBwYXNzd29yZCBjaGFuZ2VcbiAgY29uc3QgW2FkbWluVXNlciwgc2V0QWRtaW5Vc2VyXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICByZXR1cm4gc3RvcmFnZS5nZXRVc2VycygpLmZpbmQoKHUpID0+IHUucm9sZSA9PT0gJ2FkbWluJyk7XG4gIH0pO1xuICBjb25zdCBbbmV3QWRtaW5QYXNzd29yZCwgc2V0TmV3QWRtaW5QYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXNzd29yZENoYW5nZWRNZXNzYWdlLCBzZXRQYXNzd29yZENoYW5nZWRNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBoYW5kbGVTYXZlU2V0dGluZ3MgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHN0b3JhZ2UudXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgIHNldElzU2F2ZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc1NhdmVkKGZhbHNlKSwgMjUwMCk7XG4gICAgb25TZXR0aW5nc0NoYW5nZWQoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2VBZG1pblBhc3N3b3JkID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIWFkbWluVXNlciB8fCAhbmV3QWRtaW5QYXNzd29yZC50cmltKCkpIHJldHVybjtcblxuICAgIHN0b3JhZ2UudXBkYXRlVXNlcihhZG1pblVzZXIuaWQsIHsgcGFzc3dvcmQ6IG5ld0FkbWluUGFzc3dvcmQudHJpbSgpIH0pO1xuICAgIHNldFBhc3N3b3JkQ2hhbmdlZE1lc3NhZ2UoJ+euoeeQhuiAheODkeOCueODr+ODvOODieOCkuabtOaWsOOBl+OBvuOBl+OBn+OAgicpO1xuICAgIHNldE5ld0FkbWluUGFzc3dvcmQoJycpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0UGFzc3dvcmRDaGFuZ2VkTWVzc2FnZSgnJyksIDMwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0RGF0YSA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICB3aW5kb3cuY29uZmlybShcbiAgICAgICAgJ+OAkOazqOaEj+OAkeOBmeOBueOBpuOBruWLpOaAoOODh+ODvOOCv+ODu+W+k+alreWToeioreWumuOCkuWIneacn+ODh+ODouODh+ODvOOCv+OBq+aIu+OBl+OBvuOBmeOBi++8n++8iOOBk+OBruaTjeS9nOOBr+WFg+OBq+aIu+OBm+OBvuOBm+OCk++8iSdcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHN0b3JhZ2UucmVzZXRBbGxEYXRhKCk7XG4gICAgICBzZXRTZXR0aW5ncyhzdG9yYWdlLmdldFNldHRpbmdzKCkpO1xuICAgICAgb25TZXR0aW5nc0NoYW5nZWQoKTtcbiAgICAgIGFsZXJ0KCfliJ3mnJ/jg4fjg6Ljg4fjg7zjgr/jgavjg6rjgrvjg4Pjg4jjgZfjgb7jgZfjgZ/jgIInKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIFRvcCBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHAtNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRyYWNraW5nLXRpZ2h0XCI+44K344K544OG44Og5Z+65pys6Kit5a6aPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG10LTFcIj5cbiAgICAgICAgICAgIOS6i+alreaJgOWQjeOAgeOBiuefpeOCieOBm+aOsuekuuadv+OAgeaJk+WIu+S4uOOCgeWNmOS9jeOAgeeuoeeQhuiAheiqjeiovOOBruioreWumuOBjOihjOOBiOOBvuOBmeOAglxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVNhdmVTZXR0aW5nc30gY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgIHsvKiBGYWNpbGl0eSBJbmZvIENhcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzIHAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAgcGItM1wiPlxuICAgICAgICAgICAgPEJ1aWxkaW5nIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1bIzMxODI4Zl1cIiAvPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtXCI+5LqL5qWt5omA44O75LyB5qWt5oOF5aCxPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTEuNVwiPlxuICAgICAgICAgICAgICDkuovmpa3miYDlkI0gLyDkvJrnpL7lkI0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yb3NlLTUwMFwiPio8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3NldHRpbmdzLmZhY2lsaXR5TmFtZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCBmYWNpbGl0eU5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuS+izog5bCx5Yq057aZ57aa5pSv5o+0QuWei+S6i+alreaJgHNhYm90XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LWxnIHRleHQtc20gcHgtMy41IHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIOWIqeeUqOiAheaJk+WIu+eUu+mdouOBruW3puS4iuOBq+Wkp+OBjeOBj+ihqOekuuOBleOCjOOCi+WQjeensOOBp+OBmeOAglxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQW5ub3VuY2VtZW50IC8gQnVsbGV0aW4gQm9hcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzIHAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAgcGItM1wiPlxuICAgICAgICAgICAgPEJlbGwgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRleHQtc21cIj5cbiAgICAgICAgICAgICAg44CM6YeN6KaB44Gq44GK55+l44KJ44Gb44CN5o6y56S65p2/44Gu57eo6ZuGXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMS41XCI+XG4gICAgICAgICAgICAgIOOBiuefpeOCieOBm+imi+WHuuOBl1xuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtzZXR0aW5ncy5hbm5vdW5jZW1lbnRUaXRsZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCBhbm5vdW5jZW1lbnRUaXRsZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1tZCB0ZXh0LXNtIHB4LTMuNSBweS0yIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMS41XCI+XG4gICAgICAgICAgICAgIOOBiuefpeOCieOBm+acrOaWh1xuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICB2YWx1ZT17c2V0dGluZ3MuYW5ub3VuY2VtZW50Q29udGVudH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCBhbm5vdW5jZW1lbnRDb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQteHMgcHgtMy41IHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIOaJk+WIu+eUu+mdouWPs+S4iuOBruOCquODrOODs+OCuOiJsuODnOOCv+ODs+OAjOmHjeimgeOBquOBiuefpeOCieOBm+OAjeOCkuaKvOOBl+OBn+mam+OBq+ODneODg+ODl+OCouODg+ODl+ihqOekuuOBleOCjOOBvuOBmeOAglxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogV29ya2luZyBIb3VycyAmIFJvdW5kaW5nICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4cyBwLTYgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHBiLTNcIj5cbiAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTUwMFwiIC8+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRleHQtc21cIj7li6Tli5nmmYLplpPjg7vmiZPliLvku5Xmp5g8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICDmiYDlrprlirTlg43mmYLplpMgKOaXpSlcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBtaW49ezF9XG4gICAgICAgICAgICAgICAgICBtYXg9ezI0fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NldHRpbmdzLnN0YW5kYXJkV29ya0hvdXJzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCBzdGFuZGFyZFdvcmtIb3VyczogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjQgdGV4dC1zbSBmb250LW1vbm8gcHgtMyBweS0xLjUgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+5pmC6ZaTICjotoXpgY7liIbjgpLmrovmpa3oqIjnrpcpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICDmiZPliLvkuLjjgoHljZjkvY1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZXR0aW5ncy5yb3VuZE1pbnV0ZXN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCByb3VuZE1pbnV0ZXM6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgYXMgYW55IH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXhzIHB4LTMgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezF9PjHliIbljZjkvY0gKOWun+a4rOOBneOBruOBvuOBvik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXs1fT415YiG5Y2Y5L2NPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MTV9PjE15YiG5Y2Y5L2NPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MzB9PjMw5YiG5Y2Y5L2NPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIOaJk+WIu+W+jOOBruiHquWLleODquOCu+ODg+ODiOaZgumWk1xuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgdmFsdWU9e3NldHRpbmdzLmtpb3NrQXV0b1Jlc2V0U2Vjb25kc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNldHRpbmdzKHsgLi4uc2V0dGluZ3MsIGtpb3NrQXV0b1Jlc2V0U2Vjb25kczogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC14cyBweC0zIHB5LTIgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXswfT7oh6rli5Xjg6rjgrvjg4Pjg4jjgarjgZc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXs1fT4156eS5b6M44Gr5ZCN5YmN6YG45oqe44KS6Kej6ZmkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17OH0+OOenkuW+jOOBq+WQjeWJjemBuOaKnuOCkuino+mZpDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezE1fT4xNeenkuW+jOOBq+WQjeWJjemBuOaKnuOCkuino+mZpDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3VibWl0IGJ1dHRvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMyBwdC0yXCI+XG4gICAgICAgICAge2lzU2F2ZWQgJiYgKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWVtZXJhbGQtNjAwIGZvbnQtYm9sZCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICDoqK3lrprjgpLkv53lrZjjgZfjgb7jgZfjgZ9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNiBweS0yLjUgdGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSBiZy1bIzMxODI4Zl0gaG92ZXI6YmctWyMyODZmN2JdIHJvdW5kZWQtbGcgdHJhbnNpdGlvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3cteHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTYXZlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAg6Kit5a6a44KS5L+d5a2YXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuXG4gICAgICB7LyogQWRtaW4gUGFzc3dvcmQgQ2hhbmdlIEJveCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzIHAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHBiLTNcIj5cbiAgICAgICAgICA8S2V5Um91bmQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXNsYXRlLTcwMFwiIC8+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtXCI+566h55CG6ICF44OR44K544Ov44O844OJ44Gu5aSJ5pu0PC9oMz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZUNoYW5nZUFkbWluUGFzc3dvcmR9IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWVuZCBnYXAtM1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAg5paw44GX44GE566h55CG6ICF44OR44K544Ov44O844OJXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdBZG1pblBhc3N3b3JkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld0FkbWluUGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuaWsOOBl+OBhOODkeOCueODr+ODvOODieOCkuWFpeWKm1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNjQgdGV4dC14cyBweC0zLjUgcHktMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDAgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIHRyYW5zaXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOODkeOCueODr+ODvOODieabtOaWsFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtwYXNzd29yZENoYW5nZWRNZXNzYWdlICYmIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1lbWVyYWxkLTYwMCBmb250LWJvbGQgbWwtMlwiPlxuICAgICAgICAgICAgICB7cGFzc3dvcmRDaGFuZ2VkTWVzc2FnZX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEZhY3RvcnkgUmVzZXQgQm94ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yb3NlLTUwLzUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBwLTYgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1yb3NlLTkwMCB0ZXh0LXNtXCI+5Yid5pyf44OH44Oi44OH44O844K/44G444Gu44Oq44K744OD44OIPC9oND5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtcm9zZS03MDAgbXQtMC41XCI+XG4gICAgICAgICAgICDjgZnjgbnjgabjga7nmbvpjLLjg4fjg7zjgr/jgajmiZPliLvlsaXmrbTjgpLliJ3mnJ/jgrXjg7Pjg5fjg6vvvIjpgY7ljrszMOaXpeWIhuOBruaJk+WIu+Wun+e4vu+8ieOBq+W+qeWFg+OBl+OBvuOBmeOAglxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZXNldERhdGF9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgZm9udC1ib2xkIHRleHQtcm9zZS03MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1yb3NlLTYwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXJvc2UtMzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctMnhzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxSb3RhdGVDY3cgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIOODh+ODvOOCv+OCkuWIneacn+WMluOBmeOCi1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==