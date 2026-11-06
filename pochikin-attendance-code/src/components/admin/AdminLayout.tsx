const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport8_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { LogOut, ArrowLeft, Shield } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
import { AdminTop } from "/src/components/admin/AdminTop.tsx";
import { AdminCorrection } from "/src/components/admin/AdminCorrection.tsx";
import { AdminExport } from "/src/components/admin/AdminExport.tsx";
import { AdminEmployees } from "/src/components/admin/AdminEmployees.tsx";
import { AdminSettings } from "/src/components/admin/AdminSettings.tsx";
import { storage } from "/src/utils/storage.ts";
var _jsxFileName = "/app/applet/src/components/admin/AdminLayout.tsx";
import __vite__cjsImport8_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const AdminLayout = ({ onBackToPunchScreen, onLogout, currentUser }) => {
	const [activeTab, setActiveTab] = useState("top");
	const [users, setUsers] = useState(storage.getActiveEmployees());
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const handleDataChanged = () => {
		setUsers(storage.getActiveEmployees());
		setRefreshTrigger((prev) => prev + 1);
	};
	const menuItems = [
		{
			key: "top",
			label: "Top"
		},
		{
			key: "correction",
			label: "打刻データ修正"
		},
		{
			key: "export",
			label: "データ出力"
		},
		{
			key: "employees",
			label: "従業員マスタ"
		},
		{
			key: "settings",
			label: "設定"
		}
	];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-[#f0f2f5] flex flex-col font-sans text-slate-800",
		children: [/* @__PURE__ */ _jsxDEV("header", {
			className: "bg-[#242526] text-white px-5 sm:px-8 py-3.5 flex items-center justify-between shadow-md shrink-0 select-none",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-3",
				children: /* @__PURE__ */ _jsxDEV("h1", {
					className: "text-xl sm:text-2xl font-bold tracking-tight text-white font-sans",
					children: "Pochikin管理画面"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-3 text-xs sm:text-sm",
				children: [
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onBackToPunchScreen,
						className: "px-3 sm:px-4 py-1.5 sm:py-2 text-white bg-[#31828f] hover:bg-[#286f7b] rounded-md font-semibold transition flex items-center gap-1.5 shadow-2xs",
						children: [/* @__PURE__ */ _jsxDEV(ArrowLeft, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "打刻画面へ" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "hidden sm:flex items-center gap-2 pl-2 border-l border-white/20 text-slate-300",
						children: [/* @__PURE__ */ _jsxDEV(Shield, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: currentUser?.name || "管理者" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onLogout,
						className: "p-1.5 sm:px-3 sm:py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition flex items-center gap-1",
						title: "ログアウト",
						children: [/* @__PURE__ */ _jsxDEV(LogOut, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "hidden sm:inline",
							children: "ログアウト"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "flex-1 flex flex-col md:flex-row",
			children: [/* @__PURE__ */ _jsxDEV("aside", {
				className: "w-full md:w-56 lg:w-64 bg-[#f8f9fa] border-r border-slate-200 shrink-0 select-none",
				children: /* @__PURE__ */ _jsxDEV("nav", {
					className: "flex md:flex-col overflow-x-auto md:overflow-visible",
					children: menuItems.map((item) => {
						const isSelected = activeTab === item.key;
						return /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setActiveTab(item.key),
							className: `w-full text-left py-3.5 sm:py-4 px-6 text-base sm:text-lg font-medium transition cursor-pointer whitespace-nowrap shrink-0 border-b border-slate-200/50 md:border-b-0 ${isSelected ? "bg-[#ba8bb0] text-white shadow-xs" : "text-[#4a4a4a] hover:bg-slate-200/60 hover:text-slate-900"}`,
							children: item.label
						}, item.key, false, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("main", {
				className: "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full",
				children: [
					activeTab === "top" && /* @__PURE__ */ _jsxDEV(AdminTop, { onNavigate: (tab) => setActiveTab(tab) }, refreshTrigger, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this),
					activeTab === "correction" && /* @__PURE__ */ _jsxDEV(AdminCorrection, {
						users,
						onDataChanged: handleDataChanged
					}, refreshTrigger, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this),
					activeTab === "export" && /* @__PURE__ */ _jsxDEV(AdminExport, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 38
					}, this),
					activeTab === "employees" && /* @__PURE__ */ _jsxDEV(AdminEmployees, { onEmployeesChanged: handleDataChanged }, refreshTrigger, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 13
					}, this),
					activeTab === "settings" && /* @__PURE__ */ _jsxDEV(AdminSettings, { onSettingsChanged: handleDataChanged }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 79,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBZG1pbkxheW91dC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTG9nT3V0LCBBcnJvd0xlZnQsIFNoaWVsZCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBBZG1pbk1lbnVLZXksIFVzZXIgfSBmcm9tICcuLi8uLi90eXBlcy9hdHRlbmRhbmNlJztcbmltcG9ydCB7IEFkbWluVG9wIH0gZnJvbSAnLi9BZG1pblRvcCc7XG5pbXBvcnQgeyBBZG1pbkNvcnJlY3Rpb24gfSBmcm9tICcuL0FkbWluQ29ycmVjdGlvbic7XG5pbXBvcnQgeyBBZG1pbkV4cG9ydCB9IGZyb20gJy4vQWRtaW5FeHBvcnQnO1xuaW1wb3J0IHsgQWRtaW5FbXBsb3llZXMgfSBmcm9tICcuL0FkbWluRW1wbG95ZWVzJztcbmltcG9ydCB7IEFkbWluU2V0dGluZ3MgfSBmcm9tICcuL0FkbWluU2V0dGluZ3MnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0b3JhZ2UnO1xuXG5pbnRlcmZhY2UgQWRtaW5MYXlvdXRQcm9wcyB7XG4gIG9uQmFja1RvUHVuY2hTY3JlZW46ICgpID0+IHZvaWQ7XG4gIG9uTG9nb3V0OiAoKSA9PiB2b2lkO1xuICBjdXJyZW50VXNlcjogVXNlciB8IG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBBZG1pbkxheW91dDogUmVhY3QuRkM8QWRtaW5MYXlvdXRQcm9wcz4gPSAoe1xuICBvbkJhY2tUb1B1bmNoU2NyZWVuLFxuICBvbkxvZ291dCxcbiAgY3VycmVudFVzZXIsXG59KSA9PiB7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTxBZG1pbk1lbnVLZXk+KCd0b3AnKTtcbiAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZTxVc2VyW10+KHN0b3JhZ2UuZ2V0QWN0aXZlRW1wbG95ZWVzKCkpO1xuICBjb25zdCBbcmVmcmVzaFRyaWdnZXIsIHNldFJlZnJlc2hUcmlnZ2VyXSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IGhhbmRsZURhdGFDaGFuZ2VkID0gKCkgPT4ge1xuICAgIHNldFVzZXJzKHN0b3JhZ2UuZ2V0QWN0aXZlRW1wbG95ZWVzKCkpO1xuICAgIHNldFJlZnJlc2hUcmlnZ2VyKChwcmV2KSA9PiBwcmV2ICsgMSk7XG4gIH07XG5cbiAgY29uc3QgbWVudUl0ZW1zOiB7IGtleTogQWRtaW5NZW51S2V5OyBsYWJlbDogc3RyaW5nIH1bXSA9IFtcbiAgICB7IGtleTogJ3RvcCcsIGxhYmVsOiAnVG9wJyB9LFxuICAgIHsga2V5OiAnY29ycmVjdGlvbicsIGxhYmVsOiAn5omT5Yi744OH44O844K/5L+u5q2jJyB9LFxuICAgIHsga2V5OiAnZXhwb3J0JywgbGFiZWw6ICfjg4fjg7zjgr/lh7rlipsnIH0sXG4gICAgeyBrZXk6ICdlbXBsb3llZXMnLCBsYWJlbDogJ+W+k+alreWToeODnuOCueOCvycgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6ICfoqK3lrponIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1bI2YwZjJmNV0gZmxleCBmbGV4LWNvbCBmb250LXNhbnMgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyIC0gTWF0Y2hlcyBTY3JlZW5zaG90IDEgXCJQb2NoaWtpbueuoeeQhueUu+mdolwiICovfVxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJiZy1bIzI0MjUyNl0gdGV4dC13aGl0ZSBweC01IHNtOnB4LTggcHktMy41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBzaGFkb3ctbWQgc2hyaW5rLTAgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgUG9jaGlraW7nrqHnkIbnlLvpnaJcbiAgICAgICAgICA8L2gxPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgIHsvKiBCYWNrIHRvIFB1bmNoIFNjcmVlbiBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkJhY2tUb1B1bmNoU2NyZWVufVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBzbTpweC00IHB5LTEuNSBzbTpweS0yIHRleHQtd2hpdGUgYmctWyMzMTgyOGZdIGhvdmVyOmJnLVsjMjg2ZjdiXSByb3VuZGVkLW1kIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy0yeHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxBcnJvd0xlZnQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj7miZPliLvnlLvpnaLjgbg8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogVXNlciBpbmZvICYgTG9nb3V0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHBsLTIgYm9yZGVyLWwgYm9yZGVyLXdoaXRlLzIwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57Y3VycmVudFVzZXI/Lm5hbWUgfHwgJ+euoeeQhuiAhSd9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkxvZ291dH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHNtOnB4LTMgc206cHktMiB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzEwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICB0aXRsZT1cIuODreOCsOOCouOCpuODiFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExvZ091dCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj7jg63jgrDjgqLjgqbjg4g8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBNYWluIENvbnRhaW5lcjogU2lkZWJhciArIENvbnRlbnQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93XCI+XG4gICAgICAgIHsvKiBMZWZ0IFNpZGViYXIgTWVudSAtIE1hdGNoZXMgU2NyZWVuc2hvdCAxIGV4YWN0bHkgKi99XG4gICAgICAgIDxhc2lkZSBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy01NiBsZzp3LTY0IGJnLVsjZjhmOWZhXSBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHNocmluay0wIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJmbGV4IG1kOmZsZXgtY29sIG92ZXJmbG93LXgtYXV0byBtZDpvdmVyZmxvdy12aXNpYmxlXCI+XG4gICAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gYWN0aXZlVGFiID09PSBpdGVtLmtleTtcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihpdGVtLmtleSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgdGV4dC1sZWZ0IHB5LTMuNSBzbTpweS00IHB4LTYgdGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbiBjdXJzb3ItcG9pbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwLzUwIG1kOmJvcmRlci1iLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLVsjYmE4YmIwXSB0ZXh0LXdoaXRlIHNoYWRvdy14cydcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LVsjNGE0YTRhXSBob3ZlcjpiZy1zbGF0ZS0yMDAvNjAgaG92ZXI6dGV4dC1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2FzaWRlPlxuXG4gICAgICAgIHsvKiBNYWluIENvbnRlbnQgQXJlYSAqL31cbiAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIHAtNCBzbTpwLTYgbGc6cC04IG1heC13LTd4bCBteC1hdXRvIHctZnVsbFwiPlxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICd0b3AnICYmIChcbiAgICAgICAgICAgIDxBZG1pblRvcCBrZXk9e3JlZnJlc2hUcmlnZ2VyfSBvbk5hdmlnYXRlPXsodGFiKSA9PiBzZXRBY3RpdmVUYWIodGFiKX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdjb3JyZWN0aW9uJyAmJiAoXG4gICAgICAgICAgICA8QWRtaW5Db3JyZWN0aW9uXG4gICAgICAgICAgICAgIGtleT17cmVmcmVzaFRyaWdnZXJ9XG4gICAgICAgICAgICAgIHVzZXJzPXt1c2Vyc31cbiAgICAgICAgICAgICAgb25EYXRhQ2hhbmdlZD17aGFuZGxlRGF0YUNoYW5nZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2V4cG9ydCcgJiYgPEFkbWluRXhwb3J0IC8+fVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdlbXBsb3llZXMnICYmIChcbiAgICAgICAgICAgIDxBZG1pbkVtcGxveWVlc1xuICAgICAgICAgICAgICBrZXk9e3JlZnJlc2hUcmlnZ2VyfVxuICAgICAgICAgICAgICBvbkVtcGxveWVlc0NoYW5nZWQ9e2hhbmRsZURhdGFDaGFuZ2VkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdzZXR0aW5ncycgJiYgKFxuICAgICAgICAgICAgPEFkbWluU2V0dGluZ3Mgb25TZXR0aW5nc0NoYW5nZWQ9e2hhbmRsZURhdGFDaGFuZ2VkfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvbWFpbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==