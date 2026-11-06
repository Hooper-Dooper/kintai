const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=5bc9976f";
import { X, Bell, Info } from "/node_modules/.vite/deps/lucide-react.js?v=5bc9976f";
var _jsxFileName = "/app/applet/src/components/NoticeModal.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5bc9976f";
export const NoticeModal = ({ isOpen, onClose, settings }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-6 py-4 bg-amber-500 text-white",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Bell, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 28,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("h3", {
							className: "text-lg font-bold tracking-tight",
							children: settings.announcementTitle || "重要なお知らせ"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 29,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-1 rounded-lg hover:bg-amber-600 transition-colors text-white",
						"aria-label": "閉じる",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "p-6 space-y-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm",
						children: [/* @__PURE__ */ _jsxDEV(Info, { className: "w-5 h-5 shrink-0 text-amber-600 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "whitespace-pre-wrap leading-relaxed",
							children: settings.announcementContent || "現在、新しいお知らせはありません。"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 46,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-slate-500 text-right",
						children: [settings.facilityName, " 事務局"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end",
					children: /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onClose,
						className: "px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs",
						children: "確認しました"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsR0FBRyxNQUFNLFlBQVk7OztBQVM5QixPQUFPLE1BQU0sZUFBMkMsRUFDdEQsUUFDQSxTQUNBLGVBQ0k7Q0FDSixJQUFJLENBQUMsUUFBUSxPQUFPO0NBRXBCLE9BQ0Usd0JBQUMsT0FBRDtFQUFLLFdBQVU7WUFDYix3QkFBQyxPQUFEO0dBQ0UsV0FBVTtHQUNWLE1BQUs7R0FDTCxjQUFXO2FBSGI7SUFNRSx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxNQUFELEVBQU0sV0FBVSxVQUFXOzs7O2dCQUMzQix3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFDWCxTQUFTLHFCQUFxQjtNQUM3Qjs7OztjQUNEOzs7OztlQUNMLHdCQUFDLFVBQUQ7TUFDRSxTQUFTO01BQ1QsV0FBVTtNQUNWLGNBQVc7Z0JBRVgsd0JBQUMsR0FBRCxFQUFHLFdBQVUsVUFBVzs7Ozs7S0FDbEI7Ozs7YUFDTDs7Ozs7O0lBR0wsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmLENBQ0Usd0JBQUMsTUFBRCxFQUFNLFdBQVUseUNBQTBDOzs7O2dCQUMxRCx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFDWixTQUFTLHVCQUF1QjtNQUM5Qjs7OztjQUNGOzs7OztlQUNMLHdCQUFDLEtBQUQ7TUFBRyxXQUFVO2dCQUFiLENBQ0csU0FBUyxjQUFhLE1BQ3RCOzs7OzthQUNBOzs7Ozs7SUFHTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUNiLHdCQUFDLFVBQUQ7TUFDRSxNQUFLO01BQ0wsU0FBUztNQUNULFdBQVU7Z0JBQ1g7S0FFTzs7Ozs7SUFDTDs7Ozs7R0FDRjs7Ozs7O0NBQ0Y7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiTm90aWNlTW9kYWwudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBYLCBCZWxsLCBJbmZvIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFN5c3RlbVNldHRpbmdzIH0gZnJvbSAnLi4vdHlwZXMvYXR0ZW5kYW5jZSc7XG5cbmludGVyZmFjZSBOb3RpY2VNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBzZXR0aW5nczogU3lzdGVtU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBjb25zdCBOb3RpY2VNb2RhbDogUmVhY3QuRkM8Tm90aWNlTW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIHNldHRpbmdzLFxufSkgPT4ge1xuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctYmxhY2svNjAgYmFja2Ryb3AtYmx1ci14cyBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMTUwXCI+XG4gICAgICA8ZGl2IFxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctbGcgYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIG92ZXJmbG93LWhpZGRlblwiXG4gICAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTYgcHktNCBiZy1hbWJlci01MDAgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxCZWxsIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgIHtzZXR0aW5ncy5hbm5vdW5jZW1lbnRUaXRsZSB8fCAn6YeN6KaB44Gq44GK55+l44KJ44GbJ31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkLWxnIGhvdmVyOmJnLWFtYmVyLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCLplonjgZjjgotcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zIHAtNCBiZy1hbWJlci01MCBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCByb3VuZGVkLWxnIHRleHQtYW1iZXItOTAwIHRleHQtc21cIj5cbiAgICAgICAgICAgIDxJbmZvIGNsYXNzTmFtZT1cInctNSBoLTUgc2hyaW5rLTAgdGV4dC1hbWJlci02MDAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2hpdGVzcGFjZS1wcmUtd3JhcCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAge3NldHRpbmdzLmFubm91bmNlbWVudENvbnRlbnQgfHwgJ+ePvuWcqOOAgeaWsOOBl+OBhOOBiuefpeOCieOBm+OBr+OBguOCiuOBvuOBm+OCk+OAgid9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIHtzZXR0aW5ncy5mYWNpbGl0eU5hbWV9IOS6i+WLmeWxgFxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS03MDAgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1zbGF0ZS0xMDAgdHJhbnNpdGlvbi1jb2xvcnMgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg56K66KqN44GX44G+44GX44GfXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19