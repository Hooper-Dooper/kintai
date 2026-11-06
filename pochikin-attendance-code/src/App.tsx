const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport6_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { storage } from "/src/utils/storage.ts";
import { UserPunchScreen } from "/src/components/UserPunchScreen.tsx";
import { AdminLayout } from "/src/components/admin/AdminLayout.tsx";
import { AdminLoginModal } from "/src/components/AdminLoginModal.tsx";
import { HistoryModal } from "/src/components/HistoryModal.tsx";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport6_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export default function App() {
	const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());
	const [viewMode, setViewMode] = useState("punch");
	const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
	const [isGlobalHistoryOpen, setIsGlobalHistoryOpen] = useState(false);
	const isAdmin = currentUser?.role === "admin";
	const handleOpenAdminLogin = () => {
		if (isAdmin) {
			setViewMode("admin");
		} else {
			setIsAdminLoginOpen(true);
		}
	};
	const handleLoginSuccess = (user) => {
		setCurrentUser(user);
		if (user.role === "admin") {
			setViewMode("admin");
		}
	};
	const handleLogout = () => {
		storage.setCurrentUser(null);
		setCurrentUser(null);
		setViewMode("punch");
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-slate-900 text-slate-800",
		children: [
			viewMode === "admin" ? /* @__PURE__ */ _jsxDEV(AdminLayout, {
				onBackToPunchScreen: () => setViewMode("punch"),
				onLogout: handleLogout,
				currentUser
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this) : /* @__PURE__ */ _jsxDEV("div", {
				className: "relative",
				children: [/* @__PURE__ */ _jsxDEV(UserPunchScreen, {
					onOpenAdminLogin: handleOpenAdminLogin,
					isAdminLoggedIn: isAdmin,
					onGoToAdmin: () => setViewMode("admin")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "fixed bottom-3 right-3 z-40 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 shadow-lg text-xs text-white",
					children: [
						/* @__PURE__ */ _jsxDEV("span", {
							className: "text-slate-400 text-[11px] font-medium hidden sm:inline",
							children: "画面切替:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setViewMode("punch"),
							className: `px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${viewMode === "punch" ? "bg-[#31828f] text-white shadow-2xs" : "text-slate-300 hover:text-white"}`,
							children: "打刻画面"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => {
								if (isAdmin) {
									setViewMode("admin");
								} else {
									handleOpenAdminLogin();
								}
							},
							className: "px-2.5 py-1 rounded-full text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer",
							children: "管理者画面"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setIsGlobalHistoryOpen(true),
							className: "px-2.5 py-1 rounded-full text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer",
							children: "過去の全ログ"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV(AdminLoginModal, {
				isOpen: isAdminLoginOpen,
				onClose: () => setIsAdminLoginOpen(false),
				onLoginSuccess: handleLoginSuccess
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(HistoryModal, {
				isOpen: isGlobalHistoryOpen,
				onClose: () => setIsGlobalHistoryOpen(false),
				users: storage.getActiveEmployees()
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLGdCQUFnQjtBQUVoQyxTQUFTLGVBQWU7QUFDeEIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxvQkFBb0I7OztBQUU3QixlQUFlLFNBQVMsTUFBTTtDQUM1QixNQUFNLENBQUMsYUFBYSxrQkFBa0IsU0FBc0IsUUFBUSxlQUFlLENBQUM7Q0FDcEYsTUFBTSxDQUFDLFVBQVUsZUFBZSxTQUE0QixPQUFPO0NBQ25FLE1BQU0sQ0FBQyxrQkFBa0IsdUJBQXVCLFNBQVMsS0FBSztDQUM5RCxNQUFNLENBQUMscUJBQXFCLDBCQUEwQixTQUFTLEtBQUs7Q0FFcEUsTUFBTSxVQUFVLGFBQWEsU0FBUztDQUV0QyxNQUFNLDZCQUE2QjtFQUNqQyxJQUFJLFNBQVM7R0FDWCxZQUFZLE9BQU87RUFDckIsT0FBTztHQUNMLG9CQUFvQixJQUFJO0VBQzFCO0NBQ0Y7Q0FFQSxNQUFNLHNCQUFzQixTQUFlO0VBQ3pDLGVBQWUsSUFBSTtFQUNuQixJQUFJLEtBQUssU0FBUyxTQUFTO0dBQ3pCLFlBQVksT0FBTztFQUNyQjtDQUNGO0NBRUEsTUFBTSxxQkFBcUI7RUFDekIsUUFBUSxlQUFlLElBQUk7RUFDM0IsZUFBZSxJQUFJO0VBQ25CLFlBQVksT0FBTztDQUNyQjtDQUVBLE9BQ0Usd0JBQUMsT0FBRDtFQUFLLFdBQVU7WUFBZjtHQUVHLGFBQWEsVUFDWix3QkFBQyxhQUFEO0lBQ0UsMkJBQTJCLFlBQVksT0FBTztJQUM5QyxVQUFVO0lBQ0c7R0FDZDs7OztjQUVELHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxpQkFBRDtLQUNFLGtCQUFrQjtLQUNsQixpQkFBaUI7S0FDakIsbUJBQW1CLFlBQVksT0FBTztJQUN2Qzs7OztjQUdELHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWY7TUFDRSx3QkFBQyxRQUFEO09BQU0sV0FBVTtpQkFBMEQ7TUFBVzs7Ozs7TUFDckYsd0JBQUMsVUFBRDtPQUNFLGVBQWUsWUFBWSxPQUFPO09BQ2xDLFdBQVcsNEVBQ1QsYUFBYSxVQUNULHVDQUNBO2lCQUVQO01BRU87Ozs7O01BQ1Isd0JBQUMsVUFBRDtPQUNFLGVBQWU7UUFDYixJQUFJLFNBQVM7U0FDWCxZQUFZLE9BQU87UUFDckIsT0FBTztTQUNMLHFCQUFxQjtRQUN2QjtPQUNGO09BQ0EsV0FBVTtpQkFDWDtNQUVPOzs7OztNQUNSLHdCQUFDLFVBQUQ7T0FDRSxlQUFlLHVCQUF1QixJQUFJO09BQzFDLFdBQVU7aUJBQ1g7TUFFTzs7Ozs7S0FDTDs7Ozs7WUFDRjs7Ozs7O0dBSVAsd0JBQUMsaUJBQUQ7SUFDRSxRQUFRO0lBQ1IsZUFBZSxvQkFBb0IsS0FBSztJQUN4QyxnQkFBZ0I7R0FDakI7Ozs7O0dBR0Qsd0JBQUMsY0FBRDtJQUNFLFFBQVE7SUFDUixlQUFlLHVCQUF1QixLQUFLO0lBQzNDLE9BQU8sUUFBUSxtQkFBbUI7R0FDbkM7Ozs7O0VBQ0U7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFwcC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi91dGlscy9zdG9yYWdlJztcbmltcG9ydCB7IFVzZXJQdW5jaFNjcmVlbiB9IGZyb20gJy4vY29tcG9uZW50cy9Vc2VyUHVuY2hTY3JlZW4nO1xuaW1wb3J0IHsgQWRtaW5MYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRtaW4vQWRtaW5MYXlvdXQnO1xuaW1wb3J0IHsgQWRtaW5Mb2dpbk1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0FkbWluTG9naW5Nb2RhbCc7XG5pbXBvcnQgeyBIaXN0b3J5TW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvSGlzdG9yeU1vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihzdG9yYWdlLmdldEN1cnJlbnRVc2VyKCkpO1xuICBjb25zdCBbdmlld01vZGUsIHNldFZpZXdNb2RlXSA9IHVzZVN0YXRlPCdwdW5jaCcgfCAnYWRtaW4nPigncHVuY2gnKTtcbiAgY29uc3QgW2lzQWRtaW5Mb2dpbk9wZW4sIHNldElzQWRtaW5Mb2dpbk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNHbG9iYWxIaXN0b3J5T3Blbiwgc2V0SXNHbG9iYWxIaXN0b3J5T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaXNBZG1pbiA9IGN1cnJlbnRVc2VyPy5yb2xlID09PSAnYWRtaW4nO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5BZG1pbkxvZ2luID0gKCkgPT4ge1xuICAgIGlmIChpc0FkbWluKSB7XG4gICAgICBzZXRWaWV3TW9kZSgnYWRtaW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0SXNBZG1pbkxvZ2luT3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTG9naW5TdWNjZXNzID0gKHVzZXI6IFVzZXIpID0+IHtcbiAgICBzZXRDdXJyZW50VXNlcih1c2VyKTtcbiAgICBpZiAodXNlci5yb2xlID09PSAnYWRtaW4nKSB7XG4gICAgICBzZXRWaWV3TW9kZSgnYWRtaW4nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xuICAgIHN0b3JhZ2Uuc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgc2V0Q3VycmVudFVzZXIobnVsbCk7XG4gICAgc2V0Vmlld01vZGUoJ3B1bmNoJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgIHsvKiBWaWV3IFN3aXRjaGVyIGJhc2VkIG9uIHN0YXRlICovfVxuICAgICAge3ZpZXdNb2RlID09PSAnYWRtaW4nID8gKFxuICAgICAgICA8QWRtaW5MYXlvdXRcbiAgICAgICAgICBvbkJhY2tUb1B1bmNoU2NyZWVuPXsoKSA9PiBzZXRWaWV3TW9kZSgncHVuY2gnKX1cbiAgICAgICAgICBvbkxvZ291dD17aGFuZGxlTG9nb3V0fVxuICAgICAgICAgIGN1cnJlbnRVc2VyPXtjdXJyZW50VXNlcn1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8VXNlclB1bmNoU2NyZWVuXG4gICAgICAgICAgICBvbk9wZW5BZG1pbkxvZ2luPXtoYW5kbGVPcGVuQWRtaW5Mb2dpbn1cbiAgICAgICAgICAgIGlzQWRtaW5Mb2dnZWRJbj17aXNBZG1pbn1cbiAgICAgICAgICAgIG9uR29Ub0FkbWluPXsoKSA9PiBzZXRWaWV3TW9kZSgnYWRtaW4nKX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIFF1aWNrIEFjY2VzcyBGbG9hdGluZyBCYXIgZm9yIEV2YWx1YXRpb24gJiBEZW1vICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTMgcmlnaHQtMyB6LTQwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJnLXNsYXRlLTkwMC84MCBiYWNrZHJvcC1ibHVyLW1kIHB4LTMgcHktMS41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC84MCBzaGFkb3ctbGcgdGV4dC14cyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSBoaWRkZW4gc206aW5saW5lXCI+55S76Z2i5YiH5pu/Ojwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Vmlld01vZGUoJ3B1bmNoJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbiBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlID09PSAncHVuY2gnXG4gICAgICAgICAgICAgICAgICA/ICdiZy1bIzMxODI4Zl0gdGV4dC13aGl0ZSBzaGFkb3ctMnhzJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOaJk+WIu+eUu+mdolxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBZG1pbikge1xuICAgICAgICAgICAgICAgICAgc2V0Vmlld01vZGUoJ2FkbWluJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGhhbmRsZU9wZW5BZG1pbkxvZ2luKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbiBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOeuoeeQhuiAheeUu+mdolxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzR2xvYmFsSGlzdG9yeU9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg6YGO5Y6744Gu5YWo44Ot44KwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogQWRtaW4gTG9naW4gTW9kYWwgKi99XG4gICAgICA8QWRtaW5Mb2dpbk1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNBZG1pbkxvZ2luT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNBZG1pbkxvZ2luT3BlbihmYWxzZSl9XG4gICAgICAgIG9uTG9naW5TdWNjZXNzPXtoYW5kbGVMb2dpblN1Y2Nlc3N9XG4gICAgICAvPlxuXG4gICAgICB7LyogR2xvYmFsIEhpc3RvcnkgTW9kYWwgKi99XG4gICAgICA8SGlzdG9yeU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNHbG9iYWxIaXN0b3J5T3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNHbG9iYWxIaXN0b3J5T3BlbihmYWxzZSl9XG4gICAgICAgIHVzZXJzPXtzdG9yYWdlLmdldEFjdGl2ZUVtcGxveWVlcygpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdfQ==