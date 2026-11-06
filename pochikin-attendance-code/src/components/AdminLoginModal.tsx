const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { X, Lock, ShieldCheck, KeyRound, UserCheck } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
var _jsxFileName = "/app/applet/src/components/AdminLoginModal.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
	const [username, setUsername] = useState("admin");
	const [password, setPassword] = useState("password123");
	const [error, setError] = useState("");
	const [isRegisterMode, setIsRegisterMode] = useState(false);
	// New account form state
	const [regName, setRegName] = useState("");
	const [regUsername, setRegUsername] = useState("");
	const [regPassword, setRegPassword] = useState("");
	const [regCode, setRegCode] = useState("");
	const [regDepartment, setRegDepartment] = useState("一般");
	const [regPin, setRegPin] = useState("1234");
	if (!isOpen) return null;
	const handleLogin = (e) => {
		e.preventDefault();
		setError("");
		const users = storage.getUsers();
		const matchedUser = users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password);
		if (matchedUser) {
			storage.setCurrentUser(matchedUser);
			onLoginSuccess(matchedUser);
			onClose();
		} else {
			setError("IDまたはパスワードが正しくありません。(デフォルト: admin / password123)");
		}
	};
	const handleRegister = (e) => {
		e.preventDefault();
		setError("");
		if (!regName.trim() || !regUsername.trim() || !regPassword.trim()) {
			setError("氏名、ログインID、パスワードを入力してください。");
			return;
		}
		const users = storage.getUsers();
		if (users.some((u) => u.username.toLowerCase() === regUsername.trim().toLowerCase())) {
			setError("このログインIDは既に使用されています。");
			return;
		}
		const newUser = storage.addEmployee({
			username: regUsername.trim(),
			password: regPassword,
			name: regName.trim(),
			employeeCode: regCode.trim() || `EMP00${users.length + 1}`,
			department: regDepartment.trim() || "支援スタッフ",
			pin: regPin.trim() || "1234",
			hourlyWage: 1200,
			active: true
		});
		storage.setCurrentUser(newUser);
		onLoginSuccess(newUser);
		onClose();
	};
	const fillAdminCredentials = () => {
		setUsername("admin");
		setPassword("password123");
		setError("");
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Lock, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-bold tracking-tight",
							children: isRegisterMode ? "新規アカウント作成" : "管理者 / ユーザー認証"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-1 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white",
						"aria-label": "閉じる",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 9
				}, this),
				error && /* @__PURE__ */ _jsxDEV("div", {
					className: "mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 11
				}, this),
				!isRegisterMode ? /* @__PURE__ */ _jsxDEV("form", {
					onSubmit: handleLogin,
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1.5",
							children: "ログインID"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							placeholder: "例: admin",
							className: "w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1.5",
							children: "パスワード"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "••••••••",
							className: "w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-2",
							children: /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								className: "w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 17
								}, this), "ログイン"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: fillAdminCredentials,
								className: "text-emerald-700 hover:underline font-medium inline-flex items-center gap-1",
								children: [/* @__PURE__ */ _jsxDEV(KeyRound, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this), "管理者ID・パスワードを自動入力"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => {
									setIsRegisterMode(true);
									setError("");
								},
								className: "text-slate-600 hover:underline",
								children: "ID新規作成"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 11
				}, this) : /* @__PURE__ */ _jsxDEV("form", {
					onSubmit: handleRegister,
					className: "p-6 space-y-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1",
							children: ["氏名 ", /* @__PURE__ */ _jsxDEV("span", {
								className: "text-rose-500",
								children: "*"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 20
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "text",
							value: regName,
							onChange: (e) => setRegName(e.target.value),
							placeholder: "例: 山田 太郎",
							className: "w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: ["希望ログインID ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 28
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: regUsername,
								onChange: (e) => setRegUsername(e.target.value),
								placeholder: "yamada",
								className: "w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: ["パスワード ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-rose-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "password",
								value: regPassword,
								onChange: (e) => setRegPassword(e.target.value),
								placeholder: "••••••",
								className: "w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "社員番号"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: regCode,
									onChange: (e) => setRegCode(e.target.value),
									placeholder: "EMP006",
									className: "w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "部署"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: regDepartment,
									onChange: (e) => setRegDepartment(e.target.value),
									placeholder: "作業班",
									className: "w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "簡易PIN (4桁)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									maxLength: 4,
									value: regPin,
									onChange: (e) => setRegPin(e.target.value),
									placeholder: "1234",
									className: "w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-center font-mono"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-3 flex gap-2",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setIsRegisterMode(false),
								className: "flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg",
								children: "ログインに戻る"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 267,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								className: "flex-1 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-1 shadow-xs",
								children: [/* @__PURE__ */ _jsxDEV(UserCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 17
								}, this), "アカウント作成して利用"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 182,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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RDs7OztrQkFDUCx3QkFBQyxTQUFEO1NBQ0UsTUFBSztTQUNMLE9BQU87U0FDUCxXQUFXLE1BQU0saUJBQWlCLEVBQUUsT0FBTyxLQUFLO1NBQ2hELGFBQVk7U0FDWixXQUFVO1FBQ1g7Ozs7Z0JBQ0U7Ozs7O1FBQ0wsd0JBQUMsT0FBRCxhQUNFLHdCQUFDLFNBQUQ7U0FBTyxXQUFVO21CQUFrRDtRQUU1RDs7OztrQkFDUCx3QkFBQyxTQUFEO1NBQ0UsTUFBSztTQUNMLFdBQVc7U0FDWCxPQUFPO1NBQ1AsV0FBVyxNQUFNLFVBQVUsRUFBRSxPQUFPLEtBQUs7U0FDekMsYUFBWTtTQUNaLFdBQVU7UUFDWDs7OztnQkFDRTs7Ozs7T0FDRjs7Ozs7O01BRUwsd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWYsQ0FDRSx3QkFBQyxVQUFEO1FBQ0UsTUFBSztRQUNMLGVBQWUsa0JBQWtCLEtBQUs7UUFDdEMsV0FBVTtrQkFDWDtPQUVPOzs7O2lCQUNSLHdCQUFDLFVBQUQ7UUFDRSxNQUFLO1FBQ0wsV0FBVTtrQkFGWixDQUlFLHdCQUFDLFdBQUQsRUFBVyxXQUFVLGNBQWU7Ozs7a0JBQUMsYUFFL0I7Ozs7O2VBQ0w7Ozs7OztLQUNEOzs7Ozs7R0FFTDs7Ozs7O0NBQ0Y7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQWRtaW5Mb2dpbk1vZGFsLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBYLCBMb2NrLCBTaGllbGRDaGVjaywgS2V5Um91bmQsIFVzZXJDaGVjayB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSc7XG5cbmludGVyZmFjZSBBZG1pbkxvZ2luTW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25Mb2dpblN1Y2Nlc3M6ICh1c2VyOiBVc2VyKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQWRtaW5Mb2dpbk1vZGFsOiBSZWFjdC5GQzxBZG1pbkxvZ2luTW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIG9uTG9naW5TdWNjZXNzLFxufSkgPT4ge1xuICBjb25zdCBbdXNlcm5hbWUsIHNldFVzZXJuYW1lXSA9IHVzZVN0YXRlKCdhZG1pbicpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCdwYXNzd29yZDEyMycpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2lzUmVnaXN0ZXJNb2RlLCBzZXRJc1JlZ2lzdGVyTW9kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gTmV3IGFjY291bnQgZm9ybSBzdGF0ZVxuICBjb25zdCBbcmVnTmFtZSwgc2V0UmVnTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtyZWdVc2VybmFtZSwgc2V0UmVnVXNlcm5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVnUGFzc3dvcmQsIHNldFJlZ1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3JlZ0NvZGUsIHNldFJlZ0NvZGVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVnRGVwYXJ0bWVudCwgc2V0UmVnRGVwYXJ0bWVudF0gPSB1c2VTdGF0ZSgn5LiA6IisJyk7XG4gIGNvbnN0IFtyZWdQaW4sIHNldFJlZ1Bpbl0gPSB1c2VTdGF0ZSgnMTIzNCcpO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVMb2dpbiA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IoJycpO1xuXG4gICAgY29uc3QgdXNlcnMgPSBzdG9yYWdlLmdldFVzZXJzKCk7XG4gICAgY29uc3QgbWF0Y2hlZFVzZXIgPSB1c2Vycy5maW5kKFxuICAgICAgKHUpID0+XG4gICAgICAgIHUudXNlcm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gdXNlcm5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgdS5wYXNzd29yZCA9PT0gcGFzc3dvcmRcbiAgICApO1xuXG4gICAgaWYgKG1hdGNoZWRVc2VyKSB7XG4gICAgICBzdG9yYWdlLnNldEN1cnJlbnRVc2VyKG1hdGNoZWRVc2VyKTtcbiAgICAgIG9uTG9naW5TdWNjZXNzKG1hdGNoZWRVc2VyKTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RXJyb3IoJ0lE44G+44Gf44Gv44OR44K544Ov44O844OJ44GM5q2j44GX44GP44GC44KK44G+44Gb44KT44CCKOODh+ODleOCqeODq+ODiDogYWRtaW4gLyBwYXNzd29yZDEyMyknKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVnaXN0ZXIgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKCcnKTtcblxuICAgIGlmICghcmVnTmFtZS50cmltKCkgfHwgIXJlZ1VzZXJuYW1lLnRyaW0oKSB8fCAhcmVnUGFzc3dvcmQudHJpbSgpKSB7XG4gICAgICBzZXRFcnJvcign5rCP5ZCN44CB44Ot44Kw44Kk44OzSUTjgIHjg5Hjgrnjg6/jg7zjg4njgpLlhaXlipvjgZfjgabjgY/jgaDjgZXjgYTjgIInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VycyA9IHN0b3JhZ2UuZ2V0VXNlcnMoKTtcbiAgICBpZiAodXNlcnMuc29tZSgodSkgPT4gdS51c2VybmFtZS50b0xvd2VyQ2FzZSgpID09PSByZWdVc2VybmFtZS50cmltKCkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIHNldEVycm9yKCfjgZPjga7jg63jgrDjgqTjg7NJROOBr+aXouOBq+S9v+eUqOOBleOCjOOBpuOBhOOBvuOBmeOAgicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1VzZXIgPSBzdG9yYWdlLmFkZEVtcGxveWVlKHtcbiAgICAgIHVzZXJuYW1lOiByZWdVc2VybmFtZS50cmltKCksXG4gICAgICBwYXNzd29yZDogcmVnUGFzc3dvcmQsXG4gICAgICBuYW1lOiByZWdOYW1lLnRyaW0oKSxcbiAgICAgIGVtcGxveWVlQ29kZTogcmVnQ29kZS50cmltKCkgfHwgYEVNUDAwJHt1c2Vycy5sZW5ndGggKyAxfWAsXG4gICAgICBkZXBhcnRtZW50OiByZWdEZXBhcnRtZW50LnRyaW0oKSB8fCAn5pSv5o+044K544K/44OD44OVJyxcbiAgICAgIHBpbjogcmVnUGluLnRyaW0oKSB8fCAnMTIzNCcsXG4gICAgICBob3VybHlXYWdlOiAxMjAwLFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgc3RvcmFnZS5zZXRDdXJyZW50VXNlcihuZXdVc2VyKTtcbiAgICBvbkxvZ2luU3VjY2VzcyhuZXdVc2VyKTtcbiAgICBvbkNsb3NlKCk7XG4gIH07XG5cbiAgY29uc3QgZmlsbEFkbWluQ3JlZGVudGlhbHMgPSAoKSA9PiB7XG4gICAgc2V0VXNlcm5hbWUoJ2FkbWluJyk7XG4gICAgc2V0UGFzc3dvcmQoJ3Bhc3N3b3JkMTIzJyk7XG4gICAgc2V0RXJyb3IoJycpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGJnLWJsYWNrLzYwIGJhY2tkcm9wLWJsdXIteHMgYW5pbWF0ZS1pbiBmYWRlLWluIGR1cmF0aW9uLTE1MFwiPlxuICAgICAgPGRpdiBcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LW1kIGJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgICAgPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC02IHB5LTQgYmctc2xhdGUtOTAwIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAge2lzUmVnaXN0ZXJNb2RlID8gJ+aWsOimj+OCouOCq+OCpuODs+ODiOS9nOaIkCcgOiAn566h55CG6ICFIC8g44Om44O844K244O86KqN6Ki8J31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkLWxnIGhvdmVyOmJnLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCLplonjgZjjgotcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtNiBtdC00IHAtMyBiZy1yb3NlLTUwIGJvcmRlciBib3JkZXItcm9zZS0yMDAgcm91bmRlZC1sZyB0ZXh0LXJvc2UtNzAwIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7IWlzUmVnaXN0ZXJNb2RlID8gKFxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVMb2dpbn0gY2xhc3NOYW1lPVwicC02IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICDjg63jgrDjgqTjg7NJRFxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3VzZXJuYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5L6LOiBhZG1pblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWVtZXJhbGQtNTAwIGZvY3VzOmJnLXdoaXRlIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICDjg5Hjgrnjg6/jg7zjg4lcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLigKLigKLigKLigKLigKLigKLigKLigKJcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgdGV4dC1zbSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1lbWVyYWxkLTUwMCBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC00IGJnLWVtZXJhbGQtNjAwIGhvdmVyOmJnLWVtZXJhbGQtNzAwIHRleHQtd2hpdGUgZm9udC1tZWRpdW0gdGV4dC1zbSByb3VuZGVkLWxnIHNoYWRvdy1zbSB0cmFuc2l0aW9uIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICDjg63jgrDjgqTjg7NcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIGF1dG9maWxsIGhlbHBlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtmaWxsQWRtaW5DcmVkZW50aWFsc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNzAwIGhvdmVyOnVuZGVybGluZSBmb250LW1lZGl1bSBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEtleVJvdW5kIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICDnrqHnkIbogIVJROODu+ODkeOCueODr+ODvOODieOCkuiHquWLleWFpeWKm1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldElzUmVnaXN0ZXJNb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgaG92ZXI6dW5kZXJsaW5lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIElE5paw6KaP5L2c5oiQXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVSZWdpc3Rlcn0gY2xhc3NOYW1lPVwicC02IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAg5rCP5ZCNIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3JlZ05hbWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuS+izog5bGx55SwIOWkqumDjlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMS41IHRleHQtc20gYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctZW1lcmFsZC01MDAgZm9jdXM6Ymctd2hpdGVcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICDluIzmnJvjg63jgrDjgqTjg7NJRCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlZ1VzZXJuYW1lfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdVc2VybmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInlhbWFkYVwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgdGV4dC1zbSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1lbWVyYWxkLTUwMCBmb2N1czpiZy13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg44OR44K544Ov44O844OJIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlZ1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuKAouKAouKAouKAouKAouKAolwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgdGV4dC1zbSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1lbWVyYWxkLTUwMCBmb2N1czpiZy13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMlwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg56S+5ZOh55Wq5Y+3XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtyZWdDb2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdDb2RlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRU1QMDA2XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEuNSB0ZXh0LXhzIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg6YOo572yXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtyZWdEZXBhcnRtZW50fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdEZXBhcnRtZW50KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5L2c5qWt54+tXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEuNSB0ZXh0LXhzIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAg57Ch5piTUElOICg05qGBKVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezR9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cmVnUGlufVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZWdQaW4oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIxMjM0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEuNSB0ZXh0LXhzIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgdGV4dC1jZW50ZXIgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNSZWdpc3Rlck1vZGUoZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDAgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOODreOCsOOCpOODs+OBq+aIu+OCi1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC13aGl0ZSBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTcwMCByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHNoYWRvdy14c1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VXNlckNoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICDjgqLjgqvjgqbjg7Pjg4jkvZzmiJDjgZfjgabliKnnlKhcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=