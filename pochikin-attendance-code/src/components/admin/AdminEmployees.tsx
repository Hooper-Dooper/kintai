const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { UserPlus, Edit3, Trash2, Search, Eye, EyeOff, Upload, Download } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { importEmployeesFromCSV, downloadEmployeeCsvTemplate } from "/src/utils/csvImporter.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminEmployees.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminEmployees = ({ onEmployeesChanged }) => {
	const [users, setUsers] = useState(storage.getUsers());
	const [search, setSearch] = useState("");
	const [showPasswords, setShowPasswords] = useState(false);
	// New Employee Modal
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newName, setNewName] = useState("");
	const [newCode, setNewCode] = useState("");
	const [newDepartment, setNewDepartment] = useState("作業第一係");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("password123");
	const [newPin, setNewPin] = useState("");
	const [newHourlyWage, setNewHourlyWage] = useState(1200);
	// Edit Employee Modal
	const [editingUser, setEditingUser] = useState(null);
	const [editName, setEditName] = useState("");
	const [editCode, setEditCode] = useState("");
	const [editDepartment, setEditDepartment] = useState("");
	const [editUsername, setEditUsername] = useState("");
	const [editPassword, setEditPassword] = useState("");
	const [editPin, setEditPin] = useState("");
	const [editHourlyWage, setEditHourlyWage] = useState(1200);
	const [editActive, setEditActive] = useState(true);
	const fileInputRef = useRef(null);
	const refreshList = () => {
		setUsers(storage.getUsers());
		onEmployeesChanged();
	};
	const handleCsvFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			if (!text) return;
			const result = importEmployeesFromCSV(text);
			if (result.successCount > 0) {
				alert(`${result.successCount}名の従業員を一括追加しました！${result.errorCount > 0 ? ` (エラー: ${result.errorCount}件)` : ""}`);
				refreshList();
			} else {
				alert(`一括追加に失敗しました:\n${result.errors.join("\n")}`);
			}
		};
		reader.readAsText(file);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleAddEmployee = (e) => {
		e.preventDefault();
		if (!newName.trim() || !newUsername.trim()) {
			alert("氏名とログインIDを入力してください。");
			return;
		}
		const code = newCode.trim() || `EMP${String(users.length + 1).padStart(3, "0")}`;
		const pin = newPin.trim() || String(Math.floor(1e3 + Math.random() * 9e3));
		storage.addEmployee({
			name: newName.trim(),
			employeeCode: code,
			department: newDepartment.trim() || "一般",
			username: newUsername.trim(),
			password: newPassword.trim() || "password123",
			pin,
			hourlyWage: Number(newHourlyWage) || 1200,
			active: true
		});
		// Reset form
		setNewName("");
		setNewCode("");
		setNewUsername("");
		setNewPassword("password123");
		setNewPin("");
		setIsAddModalOpen(false);
		refreshList();
	};
	const openEditModal = (u) => {
		setEditingUser(u);
		setEditName(u.name);
		setEditCode(u.employeeCode);
		setEditDepartment(u.department);
		setEditUsername(u.username);
		setEditPassword(u.password);
		setEditPin(u.pin);
		setEditHourlyWage(u.hourlyWage);
		setEditActive(u.active);
	};
	const handleSaveEdit = (e) => {
		e.preventDefault();
		if (!editingUser) return;
		storage.updateUser(editingUser.id, {
			name: editName.trim(),
			employeeCode: editCode.trim(),
			department: editDepartment.trim(),
			username: editUsername.trim(),
			password: editPassword,
			pin: editPin.trim(),
			hourlyWage: Number(editHourlyWage),
			active: editActive
		});
		setEditingUser(null);
		refreshList();
	};
	const handleDeleteUser = (u) => {
		if (u.role === "admin") {
			alert("管理者アカウントは削除できません。");
			return;
		}
		if (window.confirm(`「${u.name}」さんを従業員マスタから削除しますか？`)) {
			storage.deleteUser(u.id);
			refreshList();
		}
	};
	const toggleActiveStatus = (u) => {
		if (u.role === "admin") return;
		storage.updateUser(u.id, { active: !u.active });
		refreshList();
	};
	const filteredUsers = users.filter((u) => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return u.name.toLowerCase().includes(q) || u.employeeCode.toLowerCase().includes(q) || u.department.toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-xl font-bold text-slate-900 tracking-tight",
					children: "従業員マスタ管理"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-xs text-slate-500 mt-1",
					children: "スタッフの名前変更、新規追加、ログインID・パスワード、簡易打刻PINの設定が簡単に行えます。"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 158,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ _jsxDEV("input", {
							type: "file",
							ref: fileInputRef,
							onChange: handleCsvFileChange,
							accept: ".csv,text/csv",
							className: "hidden"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: downloadEmployeeCsvTemplate,
							className: "px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
							title: "CSV登録用の雛形ファイルをダウンロード",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-slate-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 13
							}, this), "CSV雛形"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => fileInputRef.current?.click(),
							className: "px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition inline-flex items-center gap-1.5 shadow-2xs",
							title: "CSVファイルから複数の従業員を一括追加",
							children: [/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5 text-emerald-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 13
							}, this), "CSV一括登録"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => {
								// suggest auto employee code
								setNewCode(`EMP${String(users.length + 1).padStart(3, "0")}`);
								setNewPin(String(Math.floor(1e3 + Math.random() * 9e3)));
								setIsAddModalOpen(true);
							},
							className: "px-4 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg transition inline-flex items-center gap-1.5 shadow-xs",
							children: [/* @__PURE__ */ _jsxDEV(UserPlus, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 13
							}, this), "従業員を新規追加"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex-1 min-w-[240px] relative",
					children: [/* @__PURE__ */ _jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "氏名、社員番号、部署、IDで絞り込み...",
						className: "w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#31828f]"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 212,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => setShowPasswords(!showPasswords),
						className: "text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5",
						children: [showPasswords ? /* @__PURE__ */ _jsxDEV(EyeOff, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 30
						}, this) : /* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 67
						}, this), showPasswords ? "パスワードを隠す" : "ID・パスワードを表示"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "text-xs text-slate-500 font-mono-num",
						children: [
							"登録総数: ",
							/* @__PURE__ */ _jsxDEV("span", {
								className: "font-bold text-slate-800",
								children: users.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 19
							}, this),
							"名"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 211,
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
									children: "社員番号"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "氏名"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "部署 / 所属"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "ログインID"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "パスワード"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "簡易PIN"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "時給"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 250,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap",
									children: "在籍状態"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-3 px-3.5 whitespace-nowrap text-right",
									children: "操作"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("tbody", {
							className: "divide-y divide-slate-100 font-mono-num",
							children: filteredUsers.map((u) => {
								const isAdmin = u.role === "admin";
								return /* @__PURE__ */ _jsxDEV("tr", {
									className: "hover:bg-slate-50 transition-colors",
									children: [
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-medium text-slate-900",
											children: u.employeeCode
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 261,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans font-bold text-slate-800 flex items-center gap-2",
											children: [u.name, isAdmin && /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-normal",
												children: "管理者"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans text-slate-600",
											children: u.department
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-700 font-semibold",
											children: u.username
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 275,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-600",
											children: showPasswords ? u.password : "••••••••"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-700 font-mono",
											children: u.pin || "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 281,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-slate-700",
											children: ["¥", u.hourlyWage?.toLocaleString()]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 284,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap font-sans",
											children: /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => toggleActiveStatus(u),
												disabled: isAdmin,
												className: `px-2 py-0.5 rounded text-[11px] font-bold transition ${u.active ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-slate-200 text-slate-600 hover:bg-slate-300"} ${isAdmin ? "cursor-default" : "cursor-pointer"}`,
												children: u.active ? "在籍中" : "停止中"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 288,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-3.5 whitespace-nowrap text-right font-sans",
											children: /* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-end gap-1",
												children: [/* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => openEditModal(u),
													className: "px-2.5 py-1 text-xs font-medium text-[#31828f] bg-teal-50 hover:bg-teal-100 rounded transition inline-flex items-center gap-1",
													children: [/* @__PURE__ */ _jsxDEV(Edit3, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 308,
														columnNumber: 27
													}, this), "編集"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 303,
													columnNumber: 25
												}, this), !isAdmin && /* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => handleDeleteUser(u),
													className: "p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition",
													title: "削除",
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
												lineNumber: 302,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 301,
											columnNumber: 21
										}, this)
									]
								}, u.id, true, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 19
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 255,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 240,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 239,
				columnNumber: 7
			}, this),
			isAddModalOpen && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(UserPlus, { className: "w-5 h-5 text-teal-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-base",
								children: "従業員の新規追加"
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
							onClick: () => setIsAddModalOpen(false),
							className: "text-slate-400 hover:text-white p-1 rounded",
							children: "✕"
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
						onSubmit: handleAddEmployee,
						className: "p-6 space-y-3.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: ["氏名 ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-rose-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 24
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: newName,
									onChange: (e) => setNewName(e.target.value),
									placeholder: "例: 佐々木 葵",
									className: "w-full text-sm px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "社員番号"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: newCode,
									onChange: (e) => setNewCode(e.target.value),
									placeholder: "EMP006",
									className: "w-full text-sm font-mono px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 368,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "所属部署 / 班"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 380,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: newDepartment,
									onChange: (e) => setNewDepartment(e.target.value),
									placeholder: "例: 制作係",
									className: "w-full text-sm px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 383,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "時給 (円)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 393,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "number",
									step: 10,
									value: newHourlyWage,
									onChange: (e) => setNewHourlyWage(Number(e.target.value)),
									className: "w-full text-sm font-mono px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 378,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 bg-teal-50/50 border border-teal-100 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs font-bold text-teal-900",
										children: "ログイン・打刻用アカウント情報"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: ["ログインID ", /* @__PURE__ */ _jsxDEV("span", {
												className: "text-rose-500",
												children: "*"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 411,
												columnNumber: 30
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 410,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: newUsername,
											onChange: (e) => setNewUsername(e.target.value),
											placeholder: "sasaki",
											className: "w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg",
											required: true
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 413,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 409,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: ["パスワード ", /* @__PURE__ */ _jsxDEV("span", {
												className: "text-rose-500",
												children: "*"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 425,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 424,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: newPassword,
											onChange: (e) => setNewPassword(e.target.value),
											placeholder: "password123",
											className: "w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg",
											required: true
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 427,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 423,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 408,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1",
										children: "簡易PIN (タブレット共有打刻用 4桁)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 439,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "text",
										maxLength: 4,
										value: newPin,
										onChange: (e) => setNewPin(e.target.value),
										placeholder: "1234",
										className: "w-32 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 442,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 438,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 406,
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
									lineNumber: 454,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "submit",
									className: "px-5 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg shadow-xs",
									children: "従業員を追加する"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 461,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 453,
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
			editingUser && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-6 py-4 bg-slate-900 text-white",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Edit3, { className: "w-5 h-5 text-teal-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 479,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "font-bold text-base",
								children: "従業員情報の変更・名前修正"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 480,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 478,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setEditingUser(null),
							className: "text-slate-400 hover:text-white p-1 rounded",
							children: "✕"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 482,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 477,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("form", {
						onSubmit: handleSaveEdit,
						className: "p-6 space-y-3.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: ["氏名 (名前の変更) ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-rose-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 494,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 493,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: editName,
									onChange: (e) => setEditName(e.target.value),
									className: "w-full text-sm px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#31828f]",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 496,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 492,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "社員番号"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 506,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: editCode,
									onChange: (e) => setEditCode(e.target.value),
									className: "w-full text-sm font-mono px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 509,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 491,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "所属部署"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 521,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: editDepartment,
									onChange: (e) => setEditDepartment(e.target.value),
									className: "w-full text-sm px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 524,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "時給 (円)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "number",
									step: 10,
									value: editHourlyWage,
									onChange: (e) => setEditHourlyWage(Number(e.target.value)),
									className: "w-full text-sm font-mono px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 536,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 532,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 519,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs font-bold text-slate-800",
										children: "ログイン・セキュリティ"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 547,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "ログインID"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 550,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: editUsername,
											onChange: (e) => setEditUsername(e.target.value),
											className: "w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg",
											required: true
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 553,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 549,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "パスワード"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 563,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: editPassword,
											onChange: (e) => setEditPassword(e.target.value),
											className: "w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg",
											required: true
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 566,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 562,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 548,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "簡易PIN (4桁)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 578,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											maxLength: 4,
											value: editPin,
											onChange: (e) => setEditPin(e.target.value),
											className: "w-28 text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 581,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 577,
											columnNumber: 19
										}, this), editingUser.role !== "admin" && /* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-4",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "checkbox",
												checked: editActive,
												onChange: (e) => setEditActive(e.target.checked),
												className: "rounded text-[#31828f] focus:ring-[#31828f]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 592,
												columnNumber: 23
											}, this), "在籍中として有効化"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 591,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 576,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 flex justify-end gap-2 border-t border-slate-200",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setEditingUser(null),
									className: "px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg",
									children: "キャンセル"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 605,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "submit",
									className: "px-5 py-2 text-xs font-semibold text-white bg-[#31828f] hover:bg-[#286f7b] rounded-lg shadow-xs",
									children: "変更内容を保存"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 612,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 604,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 490,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 476,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 475,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 155,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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O1dBQzFDLFdBQVU7VUFDWDs7OztrQkFDRTs7OztvQkFFSixZQUFZLFNBQVMsV0FDcEIsd0JBQUMsU0FBRDtXQUFPLFdBQVU7cUJBQWpCLENBQ0Usd0JBQUMsU0FBRDtZQUNFLE1BQUs7WUFDTCxTQUFTO1lBQ1QsV0FBVyxNQUFNLGNBQWMsRUFBRSxPQUFPLE9BQU87WUFDL0MsV0FBVTtXQUNYOzs7O3FCQUFDLFdBRUc7Ozs7O2tCQUVOOzs7Ozs7UUFDRjs7Ozs7O09BRUwsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQWYsQ0FDRSx3QkFBQyxVQUFEO1NBQ0UsTUFBSztTQUNMLGVBQWUsZUFBZSxJQUFJO1NBQ2xDLFdBQVU7bUJBQ1g7UUFFTzs7OztrQkFDUix3QkFBQyxVQUFEO1NBQ0UsTUFBSztTQUNMLFdBQVU7bUJBQ1g7UUFFTzs7OztnQkFDTDs7Ozs7O01BQ0Q7Ozs7O2FBQ0g7Ozs7OztHQUNGOzs7OztFQUVKOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBZG1pbkVtcGxveWVlcy50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVc2VyUGx1cywgRWRpdDMsIFRyYXNoMiwgS2V5LCBDaGVjaywgU2hpZWxkLCBTZWFyY2gsIFVzZXJDaGVjaywgRXllLCBFeWVPZmYsIFVwbG9hZCwgRmlsZVRleHQsIERvd25sb2FkIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi90eXBlcy9hdHRlbmRhbmNlJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlJztcbmltcG9ydCB7IGltcG9ydEVtcGxveWVlc0Zyb21DU1YsIGRvd25sb2FkRW1wbG95ZWVDc3ZUZW1wbGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NzdkltcG9ydGVyJztcblxuaW50ZXJmYWNlIEFkbWluRW1wbG95ZWVzUHJvcHMge1xuICBvbkVtcGxveWVlc0NoYW5nZWQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBBZG1pbkVtcGxveWVlczogUmVhY3QuRkM8QWRtaW5FbXBsb3llZXNQcm9wcz4gPSAoeyBvbkVtcGxveWVlc0NoYW5nZWQgfSkgPT4ge1xuICBjb25zdCBbdXNlcnMsIHNldFVzZXJzXSA9IHVzZVN0YXRlPFVzZXJbXT4oc3RvcmFnZS5nZXRVc2VycygpKTtcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dQYXNzd29yZHMsIHNldFNob3dQYXNzd29yZHNdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIE5ldyBFbXBsb3llZSBNb2RhbFxuICBjb25zdCBbaXNBZGRNb2RhbE9wZW4sIHNldElzQWRkTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld05hbWUsIHNldE5ld05hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3Q29kZSwgc2V0TmV3Q29kZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdEZXBhcnRtZW50LCBzZXROZXdEZXBhcnRtZW50XSA9IHVzZVN0YXRlKCfkvZzmpa3nrKzkuIDkv4InKTtcbiAgY29uc3QgW25ld1VzZXJuYW1lLCBzZXROZXdVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdQYXNzd29yZCwgc2V0TmV3UGFzc3dvcmRdID0gdXNlU3RhdGUoJ3Bhc3N3b3JkMTIzJyk7XG4gIGNvbnN0IFtuZXdQaW4sIHNldE5ld1Bpbl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdIb3VybHlXYWdlLCBzZXROZXdIb3VybHlXYWdlXSA9IHVzZVN0YXRlKDEyMDApO1xuXG4gIC8vIEVkaXQgRW1wbG95ZWUgTW9kYWxcbiAgY29uc3QgW2VkaXRpbmdVc2VyLCBzZXRFZGl0aW5nVXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlZGl0TmFtZSwgc2V0RWRpdE5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZWRpdENvZGUsIHNldEVkaXRDb2RlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2VkaXREZXBhcnRtZW50LCBzZXRFZGl0RGVwYXJ0bWVudF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlZGl0VXNlcm5hbWUsIHNldEVkaXRVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlZGl0UGFzc3dvcmQsIHNldEVkaXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlZGl0UGluLCBzZXRFZGl0UGluXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2VkaXRIb3VybHlXYWdlLCBzZXRFZGl0SG91cmx5V2FnZV0gPSB1c2VTdGF0ZSgxMjAwKTtcbiAgY29uc3QgW2VkaXRBY3RpdmUsIHNldEVkaXRBY3RpdmVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcblxuICBjb25zdCByZWZyZXNoTGlzdCA9ICgpID0+IHtcbiAgICBzZXRVc2VycyhzdG9yYWdlLmdldFVzZXJzKCkpO1xuICAgIG9uRW1wbG95ZWVzQ2hhbmdlZCgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNzdkZpbGVDaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcblxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGV2ZW50LnRhcmdldD8ucmVzdWx0IGFzIHN0cmluZztcbiAgICAgIGlmICghdGV4dCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBpbXBvcnRFbXBsb3llZXNGcm9tQ1NWKHRleHQpO1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzQ291bnQgPiAwKSB7XG4gICAgICAgIGFsZXJ0KGAke3Jlc3VsdC5zdWNjZXNzQ291bnR95ZCN44Gu5b6T5qWt5ZOh44KS5LiA5ous6L+95Yqg44GX44G+44GX44Gf77yBJHtyZXN1bHQuZXJyb3JDb3VudCA+IDAgPyBgICjjgqjjg6njg7w6ICR7cmVzdWx0LmVycm9yQ291bnR95Lu2KWAgOiAnJ31gKTtcbiAgICAgICAgcmVmcmVzaExpc3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KGDkuIDmi6zov73liqDjgavlpLHmlZfjgZfjgb7jgZfjgZ86XFxuJHtyZXN1bHQuZXJyb3JzLmpvaW4oJ1xcbicpfWApO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSBmaWxlSW5wdXRSZWYuY3VycmVudC52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEVtcGxveWVlID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIW5ld05hbWUudHJpbSgpIHx8ICFuZXdVc2VybmFtZS50cmltKCkpIHtcbiAgICAgIGFsZXJ0KCfmsI/lkI3jgajjg63jgrDjgqTjg7NJROOCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhOOAgicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGUgPSBuZXdDb2RlLnRyaW0oKSB8fCBgRU1QJHtTdHJpbmcodXNlcnMubGVuZ3RoICsgMSkucGFkU3RhcnQoMywgJzAnKX1gO1xuICAgIGNvbnN0IHBpbiA9IG5ld1Bpbi50cmltKCkgfHwgU3RyaW5nKE1hdGguZmxvb3IoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwKSk7XG5cbiAgICBzdG9yYWdlLmFkZEVtcGxveWVlKHtcbiAgICAgIG5hbWU6IG5ld05hbWUudHJpbSgpLFxuICAgICAgZW1wbG95ZWVDb2RlOiBjb2RlLFxuICAgICAgZGVwYXJ0bWVudDogbmV3RGVwYXJ0bWVudC50cmltKCkgfHwgJ+S4gOiIrCcsXG4gICAgICB1c2VybmFtZTogbmV3VXNlcm5hbWUudHJpbSgpLFxuICAgICAgcGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLnRyaW0oKSB8fCAncGFzc3dvcmQxMjMnLFxuICAgICAgcGluLFxuICAgICAgaG91cmx5V2FnZTogTnVtYmVyKG5ld0hvdXJseVdhZ2UpIHx8IDEyMDAsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgfSk7XG5cbiAgICAvLyBSZXNldCBmb3JtXG4gICAgc2V0TmV3TmFtZSgnJyk7XG4gICAgc2V0TmV3Q29kZSgnJyk7XG4gICAgc2V0TmV3VXNlcm5hbWUoJycpO1xuICAgIHNldE5ld1Bhc3N3b3JkKCdwYXNzd29yZDEyMycpO1xuICAgIHNldE5ld1BpbignJyk7XG4gICAgc2V0SXNBZGRNb2RhbE9wZW4oZmFsc2UpO1xuICAgIHJlZnJlc2hMaXN0KCk7XG4gIH07XG5cbiAgY29uc3Qgb3BlbkVkaXRNb2RhbCA9ICh1OiBVc2VyKSA9PiB7XG4gICAgc2V0RWRpdGluZ1VzZXIodSk7XG4gICAgc2V0RWRpdE5hbWUodS5uYW1lKTtcbiAgICBzZXRFZGl0Q29kZSh1LmVtcGxveWVlQ29kZSk7XG4gICAgc2V0RWRpdERlcGFydG1lbnQodS5kZXBhcnRtZW50KTtcbiAgICBzZXRFZGl0VXNlcm5hbWUodS51c2VybmFtZSk7XG4gICAgc2V0RWRpdFBhc3N3b3JkKHUucGFzc3dvcmQpO1xuICAgIHNldEVkaXRQaW4odS5waW4pO1xuICAgIHNldEVkaXRIb3VybHlXYWdlKHUuaG91cmx5V2FnZSk7XG4gICAgc2V0RWRpdEFjdGl2ZSh1LmFjdGl2ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUVkaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghZWRpdGluZ1VzZXIpIHJldHVybjtcblxuICAgIHN0b3JhZ2UudXBkYXRlVXNlcihlZGl0aW5nVXNlci5pZCwge1xuICAgICAgbmFtZTogZWRpdE5hbWUudHJpbSgpLFxuICAgICAgZW1wbG95ZWVDb2RlOiBlZGl0Q29kZS50cmltKCksXG4gICAgICBkZXBhcnRtZW50OiBlZGl0RGVwYXJ0bWVudC50cmltKCksXG4gICAgICB1c2VybmFtZTogZWRpdFVzZXJuYW1lLnRyaW0oKSxcbiAgICAgIHBhc3N3b3JkOiBlZGl0UGFzc3dvcmQsXG4gICAgICBwaW46IGVkaXRQaW4udHJpbSgpLFxuICAgICAgaG91cmx5V2FnZTogTnVtYmVyKGVkaXRIb3VybHlXYWdlKSxcbiAgICAgIGFjdGl2ZTogZWRpdEFjdGl2ZSxcbiAgICB9KTtcblxuICAgIHNldEVkaXRpbmdVc2VyKG51bGwpO1xuICAgIHJlZnJlc2hMaXN0KCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlVXNlciA9ICh1OiBVc2VyKSA9PiB7XG4gICAgaWYgKHUucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgYWxlcnQoJ+euoeeQhuiAheOCouOCq+OCpuODs+ODiOOBr+WJiumZpOOBp+OBjeOBvuOBm+OCk+OAgicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAod2luZG93LmNvbmZpcm0oYOOAjCR7dS5uYW1lfeOAjeOBleOCk+OCkuW+k+alreWToeODnuOCueOCv+OBi+OCieWJiumZpOOBl+OBvuOBmeOBi++8n2ApKSB7XG4gICAgICBzdG9yYWdlLmRlbGV0ZVVzZXIodS5pZCk7XG4gICAgICByZWZyZXNoTGlzdCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0b2dnbGVBY3RpdmVTdGF0dXMgPSAodTogVXNlcikgPT4ge1xuICAgIGlmICh1LnJvbGUgPT09ICdhZG1pbicpIHJldHVybjtcbiAgICBzdG9yYWdlLnVwZGF0ZVVzZXIodS5pZCwgeyBhY3RpdmU6ICF1LmFjdGl2ZSB9KTtcbiAgICByZWZyZXNoTGlzdCgpO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkVXNlcnMgPSB1c2Vycy5maWx0ZXIoKHUpID0+IHtcbiAgICBpZiAoIXNlYXJjaC50cmltKCkpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHEgPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gKFxuICAgICAgdS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgIHUuZW1wbG95ZWVDb2RlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgIHUuZGVwYXJ0bWVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8XG4gICAgICB1LnVzZXJuYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSlcbiAgICApO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS01XCI+XG4gICAgICB7LyogVG9wIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBiZy13aGl0ZSBwLTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHRyYWNraW5nLXRpZ2h0XCI+5b6T5qWt5ZOh44Oe44K544K/566h55CGPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG10LTFcIj5cbiAgICAgICAgICAgIOOCueOCv+ODg+ODleOBruWQjeWJjeWkieabtOOAgeaWsOimj+i/veWKoOOAgeODreOCsOOCpOODs0lE44O744OR44K544Ov44O844OJ44CB57Ch5piT5omT5Yi7UElO44Gu6Kit5a6a44GM57Ch5Y2Y44Gr6KGM44GI44G+44GZ44CCXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIHsvKiBIaWRkZW4gZmlsZSBpbnB1dCBmb3IgQ1NWIHVwbG9hZCAqL31cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNzdkZpbGVDaGFuZ2V9XG4gICAgICAgICAgICBhY2NlcHQ9XCIuY3N2LHRleHQvY3N2XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17ZG93bmxvYWRFbXBsb3llZUNzdlRlbXBsYXRlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS01MCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgICB0aXRsZT1cIkNTVueZu+mMsueUqOOBrumbm+W9ouODleOCoeOCpOODq+OCkuODgOOCpuODs+ODreODvOODiVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2xhdGUtNTAwXCIgLz5cbiAgICAgICAgICAgIENTVumbm+W9olxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWVtZXJhbGQtODAwIGJnLWVtZXJhbGQtNTAgaG92ZXI6YmctZW1lcmFsZC0xMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTIwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgICB0aXRsZT1cIkNTVuODleOCoeOCpOODq+OBi+OCieikh+aVsOOBruW+k+alreWToeOCkuS4gOaLrOi/veWKoFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNjAwXCIgLz5cbiAgICAgICAgICAgIENTVuS4gOaLrOeZu+mMslxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAvLyBzdWdnZXN0IGF1dG8gZW1wbG95ZWUgY29kZVxuICAgICAgICAgICAgICBzZXROZXdDb2RlKGBFTVAke1N0cmluZyh1c2Vycy5sZW5ndGggKyAxKS5wYWRTdGFydCgzLCAnMCcpfWApO1xuICAgICAgICAgICAgICBzZXROZXdQaW4oU3RyaW5nKE1hdGguZmxvb3IoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwKSkpO1xuICAgICAgICAgICAgICBzZXRJc0FkZE1vZGFsT3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctWyMzMTgyOGZdIGhvdmVyOmJnLVsjMjg2ZjdiXSByb3VuZGVkLWxnIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LXhzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VXNlclBsdXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICDlvpPmpa3lk6HjgpLmlrDopo/ov73liqBcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRvb2xiYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeHMgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy1bMjQwcHhdIHJlbGF0aXZlXCI+XG4gICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNDAwIGFic29sdXRlIGxlZnQtMyB0b3AtMi41XCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuawj+WQjeOAgeekvuWToeeVquWPt+OAgemDqOe9suOAgUlE44Gn57We44KK6L6844G/Li4uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXhzIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGcgcGwtOSBwci0zIHB5LTEuNSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctWyMzMTgyOGZdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmRzKCFzaG93UGFzc3dvcmRzKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtzaG93UGFzc3dvcmRzID8gPEV5ZU9mZiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPEV5ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAge3Nob3dQYXNzd29yZHMgPyAn44OR44K544Ov44O844OJ44KS6Zqg44GZJyA6ICdJROODu+ODkeOCueODr+ODvOODieOCkuihqOekuid9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9uby1udW1cIj5cbiAgICAgICAgICAgIOeZu+mMsue3j+aVsDogPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtODAwXCI+e3VzZXJzLmxlbmd0aH08L3NwYW4+5ZCNXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBFbXBsb3llZXMgVGFibGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LTJ4cyBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzIGJvcmRlci1jb2xsYXBzZVwiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNzAwIGZvbnQtc2VtaWJvbGQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuekvuWToeeVquWPtzwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+5rCP5ZCNPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7pg6jnvbIgLyDmiYDlsZ48L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuODreOCsOOCpOODs0lEPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7jg5Hjgrnjg6/jg7zjg4k8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiPuewoeaYk1BJTjwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+5pmC57WmPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXBcIj7lnKjnsY3nirbmhYs8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXJpZ2h0XCI+5pON5L2cPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTEwMCBmb250LW1vbm8tbnVtXCI+XG4gICAgICAgICAgICAgIHtmaWx0ZXJlZFVzZXJzLm1hcCgodSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWRtaW4gPSB1LnJvbGUgPT09ICdhZG1pbic7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17dS5pZH0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtNTAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3UuZW1wbG95ZWVDb2RlfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgZm9udC1zYW5zIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt1Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAge2lzQWRtaW4gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gYmctc2xhdGUtOTAwIHRleHQtd2hpdGUgcHgtMS41IHB5LTAuNSByb3VuZGVkIGZvbnQtbm9ybWFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIOeuoeeQhuiAhVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCBmb250LXNhbnMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dS5kZXBhcnRtZW50fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbGF0ZS03MDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt1LnVzZXJuYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zLjUgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkcyA/IHUucGFzc3dvcmQgOiAn4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiJ31cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc2xhdGUtNzAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHt1LnBpbiB8fCAnLSd9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIMKle3UuaG91cmx5V2FnZT8udG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtMy41IHdoaXRlc3BhY2Utbm93cmFwIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlQWN0aXZlU3RhdHVzKHUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQWRtaW59XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHUuYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTgwMCBob3ZlcjpiZy1lbWVyYWxkLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDAgaG92ZXI6Ymctc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAke2lzQWRtaW4gPyAnY3Vyc29yLWRlZmF1bHQnIDogJ2N1cnNvci1wb2ludGVyJ31gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt1LmFjdGl2ZSA/ICflnKjnsY3kuK0nIDogJ+WBnOatouS4rSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMuNSB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXJpZ2h0IGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5FZGl0TW9kYWwodSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1bIzMxODI4Zl0gYmctdGVhbC01MCBob3ZlcjpiZy10ZWFsLTEwMCByb3VuZGVkIHRyYW5zaXRpb24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEVkaXQzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg57eo6ZuGXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshaXNBZG1pbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGVVc2VyKHUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSB0ZXh0LXJvc2UtNTAwIGhvdmVyOnRleHQtcm9zZS03MDAgaG92ZXI6Ymctcm9zZS01MCByb3VuZGVkIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwi5YmK6ZmkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQWRkIEVtcGxveWVlIE1vZGFsICovfVxuICAgICAge2lzQWRkTW9kYWxPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGJnLWJsYWNrLzYwIGJhY2tkcm9wLWJsdXIteHMgYW5pbWF0ZS1pbiBmYWRlLWluIGR1cmF0aW9uLTE1MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LWxnIGJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTYgcHktNCBiZy1zbGF0ZS05MDAgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFVzZXJQbHVzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWJhc2VcIj7lvpPmpa3lk6Hjga7mlrDopo/ov73liqA8L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHAtMSByb3VuZGVkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlQWRkRW1wbG95ZWV9IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTMuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOawj+WQjSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLkvos6IOS9kOOAheacqCDokbVcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBweC0zIHB5LTEuNSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAg56S+5ZOh55Wq5Y+3XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0NvZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3Q29kZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRU1QMDA2XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICDmiYDlsZ7pg6jnvbIgLyDnj61cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3RGVwYXJ0bWVudH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdEZXBhcnRtZW50KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLkvos6IOWItuS9nOS/glwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXNtIHB4LTMgcHktMS41IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAg5pmC57WmICjlhoYpXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0hvdXJseVdhZ2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3SG91cmx5V2FnZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctdGVhbC01MC81MCBib3JkZXIgYm9yZGVyLXRlYWwtMTAwIHJvdW5kZWQtbGcgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXRlYWwtOTAwXCI+44Ot44Kw44Kk44Oz44O75omT5Yi755So44Ki44Kr44Km44Oz44OI5oOF5aCxPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICDjg63jgrDjgqTjg7NJRCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdVc2VybmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1VzZXJuYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInNhc2FraVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQteHMgZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAg44OR44K544Ov44O844OJIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDBcIj4qPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwicGFzc3dvcmQxMjNcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXhzIGZvbnQtbW9ubyBweC0zIHB5LTEuNSBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOewoeaYk1BJTiAo44K/44OW44Os44OD44OI5YWx5pyJ5omT5Yi755SoIDTmoYEpXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXs0fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UGlufVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1BpbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMTIzNFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMzIgdGV4dC14cyBmb250LW1vbm8gcHgtMyBweS0xLjUgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBqdXN0aWZ5LWVuZCBnYXAtMiBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMCBiZy1zbGF0ZS0xMDAgaG92ZXI6Ymctc2xhdGUtMjAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOOCreODo+ODs+OCu+ODq1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLVsjMzE4MjhmXSBob3ZlcjpiZy1bIzI4NmY3Yl0gcm91bmRlZC1sZyBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOW+k+alreWToeOCkui/veWKoOOBmeOCi1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogRWRpdCBFbXBsb3llZSBNb2RhbCAqL31cbiAgICAgIHtlZGl0aW5nVXNlciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay82MCBiYWNrZHJvcC1ibHVyLXhzIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1sZyBiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC02IHB5LTQgYmctc2xhdGUtOTAwIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxFZGl0MyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtdGVhbC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1iYXNlXCI+5b6T5qWt5ZOh5oOF5aCx44Gu5aSJ5pu044O75ZCN5YmN5L+u5q2jPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nVXNlcihudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHAtMSByb3VuZGVkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU2F2ZUVkaXR9IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTMuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOawj+WQjSAo5ZCN5YmN44Gu5aSJ5pu0KSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdE5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RWRpdE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBweC0zIHB5LTEuNSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1bIzMxODI4Zl1cIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAg56S+5ZOh55Wq5Y+3XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRDb2RlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRDb2RlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICDmiYDlsZ7pg6jnvbJcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdERlcGFydG1lbnR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RWRpdERlcGFydG1lbnQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1zbSBweC0zIHB5LTEuNSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIOaZgue1piAo5YaGKVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD17MTB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0SG91cmx5V2FnZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0SG91cmx5V2FnZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtc20gZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1sZyBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtODAwXCI+44Ot44Kw44Kk44Oz44O744K744Kt44Ol44Oq44OG44KjPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICDjg63jgrDjgqTjg7NJRFxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRVc2VybmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRVc2VybmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQteHMgZm9udC1tb25vIHB4LTMgcHktMS41IGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAg44OR44K544Ov44O844OJXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdFBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RWRpdFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC14cyBmb250LW1vbm8gcHgtMyBweS0xLjUgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIOewoeaYk1BJTiAoNOahgSlcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17NH1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdFBpbn1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRQaW4oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjggdGV4dC14cyBmb250LW1vbm8gcHgtMyBweS0xLjUgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAge2VkaXRpbmdVc2VyLnJvbGUgIT09ICdhZG1pbicgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIGN1cnNvci1wb2ludGVyIHB0LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtlZGl0QWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0QWN0aXZlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCB0ZXh0LVsjMzE4MjhmXSBmb2N1czpyaW5nLVsjMzE4MjhmXVwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICDlnKjnsY3kuK3jgajjgZfjgabmnInlirnljJZcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBmbGV4IGp1c3RpZnktZW5kIGdhcC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmdVc2VyKG51bGwpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDAgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDjgq3jg6Pjg7Pjgrvjg6tcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBiZy1bIzMxODI4Zl0gaG92ZXI6YmctWyMyODZmN2JdIHJvdW5kZWQtbGcgc2hhZG93LXhzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDlpInmm7TlhoXlrrnjgpLkv53lrZhcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=