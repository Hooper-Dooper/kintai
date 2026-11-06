const STORAGE_KEYS = {
	USERS: "pochikin_users_v2",
	ATTENDANCE: "pochikin_attendance_v2",
	PUNCHES: "pochikin_punches_v2",
	SETTINGS: "pochikin_settings_v2",
	GAS_CONFIG: "pochikin_gas_config_v2",
	CURRENT_USER: "pochikin_current_user_v2"
};
// Initial default settings matching the user's screenshot
export const DEFAULT_SETTINGS = {
	facilityName: "就労継続支援B型事業所sabot",
	announcementTitle: "重要なお知らせ",
	announcementContent: "【業務連絡】11月度の健康診断アンケートは来週火曜日までに提出してください。寒暖差が激しいため、体調管理に留意しましょう。",
	announcementActive: true,
	standardStartTime: "09:00",
	standardEndTime: "18:00",
	standardWorkHours: 8,
	roundMinutes: 1,
	kioskAutoResetSeconds: 8,
	soundEnabled: true
};
export const DEFAULT_GAS_CONFIG = {
	webAppUrl: "",
	sheetName: "勤怠実績ログ",
	autoSyncEnabled: true,
	lastSyncTime: null,
	lastSyncStatus: "idle",
	lastSyncMessage: "未接続（URLを設定してください）",
	syncCount: 0
};
// Initial sample users
const INITIAL_USERS = [
	{
		id: "user_admin",
		username: "admin",
		password: "password123",
		name: "管理者",
		role: "admin",
		employeeCode: "ADM001",
		department: "管理者",
		pin: "9999",
		hourlyWage: 2e3,
		active: true,
		createdAt: "2026-01-01"
	},
	{
		id: "user_sato",
		username: "sato",
		password: "password123",
		name: "佐藤 健一",
		role: "employee",
		employeeCode: "EMP001",
		department: "作業第一係",
		pin: "1001",
		hourlyWage: 1200,
		active: true,
		createdAt: "2026-01-10"
	},
	{
		id: "user_suzuki",
		username: "suzuki",
		password: "password123",
		name: "鈴木 恵美",
		role: "employee",
		employeeCode: "EMP002",
		department: "デザイン制作班",
		pin: "1002",
		hourlyWage: 1250,
		active: true,
		createdAt: "2026-02-01"
	},
	{
		id: "user_tanaka",
		username: "tanaka",
		password: "password123",
		name: "田中 翔太",
		role: "employee",
		employeeCode: "EMP003",
		department: "梱包・出荷係",
		pin: "1003",
		hourlyWage: 1180,
		active: true,
		createdAt: "2026-03-15"
	},
	{
		id: "user_takahashi",
		username: "takahashi",
		password: "password123",
		name: "高橋 美咲",
		role: "employee",
		employeeCode: "EMP004",
		department: "作業支援班",
		pin: "1004",
		hourlyWage: 1220,
		active: true,
		createdAt: "2026-04-01"
	},
	{
		id: "user_watanabe",
		username: "watanabe",
		password: "password123",
		name: "渡辺 裕樹",
		role: "employee",
		employeeCode: "EMP005",
		department: "軽作業班",
		pin: "1005",
		hourlyWage: 1150,
		active: true,
		createdAt: "2026-05-10"
	}
];
// Helper to format date YYYY/MM/DD
export function formatDate(d) {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}/${m}/${day}`;
}
// Helper to format time HH:MM
export function formatTimeHHMM(d) {
	const h = String(d.getHours()).padStart(2, "0");
	const m = String(d.getMinutes()).padStart(2, "0");
	return `${h}:${m}`;
}
// Helper to format time HH:MM:SS
export function formatTimeHHMMSS(d) {
	const h = String(d.getHours()).padStart(2, "0");
	const m = String(d.getMinutes()).padStart(2, "0");
	const s = String(d.getSeconds()).padStart(2, "0");
	return `${h}:${m}:${s}`;
}
// Parse "HH:MM" to minutes from 00:00
export function parseTimeToMinutes(timeStr) {
	if (!timeStr || !timeStr.includes(":")) return 0;
	const [h, m] = timeStr.split(":").map(Number);
	return (h || 0) * 60 + (m || 0);
}
// Generate realistic past logs for demonstration (last 30 days)
function generateInitialRecords() {
	const attendanceList = [];
	const punchList = [];
	const employees = INITIAL_USERS.filter((u) => u.role === "employee");
	const now = new Date(2026, 10, 6);
	// Generate 20 workdays in past month
	for (let offset = 25; offset >= 1; offset--) {
		const curDate = new Date(now);
		curDate.setDate(now.getDate() - offset);
		const dayOfWeek = curDate.getDay();
		if (dayOfWeek === 0 || dayOfWeek === 6) continue;
		const dateStr = formatDate(curDate);
		employees.forEach((emp, empIdx) => {
			// 90% attendance rate
			if (Math.random() < .08) return;
			// Base hours: clock in around 08:50 - 09:05
			const inMinuteOffset = Math.floor((empIdx * 3 + offset * 7) % 25) - 10;
			const inHour = 8;
			const inMin = 50 + inMinuteOffset;
			const inDate = new Date(curDate);
			inDate.setHours(inHour, inMin, 0);
			// Base clock out around 17:30 - 18:45
			const outMinuteOffset = Math.floor((empIdx * 5 + offset * 11) % 50);
			const outHour = 17;
			const outMin = 30 + outMinuteOffset;
			const outDate = new Date(curDate);
			outDate.setHours(outHour, outMin, 0);
			const clockIn = formatTimeHHMM(inDate);
			const clockOut = formatTimeHHMM(outDate);
			const breakMinutes = 60;
			const totalSpan = parseTimeToMinutes(clockOut) - parseTimeToMinutes(clockIn);
			const workMinutes = Math.max(0, totalSpan - breakMinutes);
			const overtimeMinutes = Math.max(0, workMinutes - 8 * 60);
			const pIn = {
				id: `p_in_${emp.id}_${dateStr}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				type: "clock_in",
				timestamp: inDate.toISOString(),
				date: dateStr,
				time: formatTimeHHMMSS(inDate),
				syncedToSheets: true
			};
			const pOut = {
				id: `p_out_${emp.id}_${dateStr}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				type: "clock_out",
				timestamp: outDate.toISOString(),
				date: dateStr,
				time: formatTimeHHMMSS(outDate),
				syncedToSheets: true
			};
			punchList.push(pIn, pOut);
			attendanceList.push({
				id: `${emp.id}_${dateStr.replace(/\//g, "-")}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				date: dateStr,
				clockIn,
				clockOut,
				breakMinutes,
				totalWorkMinutes: workMinutes,
				overtimeMinutes,
				status: "completed",
				isManualEdit: offset === 3 && empIdx === 0,
				editedBy: offset === 3 && empIdx === 0 ? "管理者" : undefined,
				note: offset === 3 && empIdx === 0 ? "打刻忘れ修正（所長承認）" : "",
				punches: [pIn, pOut],
				lastSyncStatus: "synced"
			});
		});
	}
	// Add today's sample punches (November 6, 2026)
	const todayStr = formatDate(now);
	employees.forEach((emp, i) => {
		if (i === 0) {
			// Sato: already clocked in and working
			const inTime = "08:52";
			const inDate = new Date(now);
			inDate.setHours(8, 52, 0);
			const pIn = {
				id: `p_in_${emp.id}_${todayStr}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				type: "clock_in",
				timestamp: inDate.toISOString(),
				date: todayStr,
				time: "08:52:14",
				syncedToSheets: true
			};
			punchList.push(pIn);
			attendanceList.push({
				id: `${emp.id}_${todayStr.replace(/\//g, "-")}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				date: todayStr,
				clockIn: inTime,
				breakMinutes: 0,
				totalWorkMinutes: 0,
				overtimeMinutes: 0,
				status: "working",
				punches: [pIn],
				lastSyncStatus: "synced"
			});
		} else if (i === 1) {
			// Suzuki: clocked in and currently on break
			const inTime = "09:02";
			const inDate = new Date(now);
			inDate.setHours(9, 2, 0);
			const pIn = {
				id: `p_in_${emp.id}_${todayStr}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				type: "clock_in",
				timestamp: inDate.toISOString(),
				date: todayStr,
				time: "09:02:40",
				syncedToSheets: true
			};
			const breakDate = new Date(now);
			breakDate.setHours(12, 5, 0);
			const pBreak = {
				id: `p_break_${emp.id}_${todayStr}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				type: "break_start",
				timestamp: breakDate.toISOString(),
				date: todayStr,
				time: "12:05:10",
				syncedToSheets: true
			};
			punchList.push(pIn, pBreak);
			attendanceList.push({
				id: `${emp.id}_${todayStr.replace(/\//g, "-")}`,
				userId: emp.id,
				employeeName: emp.name,
				employeeCode: emp.employeeCode,
				date: todayStr,
				clockIn: inTime,
				breakMinutes: 45,
				totalWorkMinutes: 180,
				overtimeMinutes: 0,
				status: "on_break",
				punches: [pIn, pBreak],
				lastSyncStatus: "synced"
			});
		}
	});
	return {
		attendance: attendanceList,
		punches: punchList
	};
}
// Storage Manager
class AttendanceStorage {
	constructor() {
		this.users = [];
		this.attendance = [];
		this.punches = [];
		this.settings = DEFAULT_SETTINGS;
		this.gasConfig = DEFAULT_GAS_CONFIG;
		this.currentUser = null;
		this.init();
	}
	init() {
		if (typeof window === "undefined") return;
		try {
			const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
			const storedAtt = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
			const storedPunches = localStorage.getItem(STORAGE_KEYS.PUNCHES);
			const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
			const storedGas = localStorage.getItem(STORAGE_KEYS.GAS_CONFIG);
			const storedCur = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
			if (!storedUsers || !storedAtt) {
				// Seed initial data
				const initial = generateInitialRecords();
				this.users = INITIAL_USERS;
				this.attendance = initial.attendance;
				this.punches = initial.punches;
				this.settings = DEFAULT_SETTINGS;
				this.gasConfig = DEFAULT_GAS_CONFIG;
				this.saveAll();
			} else {
				this.users = JSON.parse(storedUsers);
				this.attendance = JSON.parse(storedAtt);
				this.punches = storedPunches ? JSON.parse(storedPunches) : [];
				this.settings = storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;
				this.gasConfig = storedGas ? JSON.parse(storedGas) : DEFAULT_GAS_CONFIG;
				if (storedCur) {
					this.currentUser = JSON.parse(storedCur);
				}
			}
		} catch (e) {
			console.error("Storage init failed, using defaults", e);
			this.users = INITIAL_USERS;
			const initial = generateInitialRecords();
			this.attendance = initial.attendance;
			this.punches = initial.punches;
			this.settings = DEFAULT_SETTINGS;
			this.gasConfig = DEFAULT_GAS_CONFIG;
		}
	}
	saveUsers() {
		localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
	}
	saveAttendance() {
		localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(this.attendance));
	}
	savePunches() {
		localStorage.setItem(STORAGE_KEYS.PUNCHES, JSON.stringify(this.punches));
	}
	saveAll() {
		this.saveUsers();
		this.saveAttendance();
		this.savePunches();
		localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
		localStorage.setItem(STORAGE_KEYS.GAS_CONFIG, JSON.stringify(this.gasConfig));
	}
	// --- Users & Employee Master ---
	getUsers() {
		return [...this.users];
	}
	getActiveEmployees() {
		return this.users.filter((u) => u.role === "employee" && u.active);
	}
	getUserById(id) {
		return this.users.find((u) => u.id === id);
	}
	addEmployee(params) {
		const newUser = {
			...params,
			id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
			role: "employee",
			createdAt: formatDate(new Date())
		};
		this.users.push(newUser);
		this.saveUsers();
		return newUser;
	}
	updateUser(id, updates) {
		const idx = this.users.findIndex((u) => u.id === id);
		if (idx === -1) return null;
		this.users[idx] = {
			...this.users[idx],
			...updates
		};
		this.saveUsers();
		// If name changed, update corresponding attendance records
		if (updates.name || updates.employeeCode) {
			this.attendance.forEach((att) => {
				if (att.userId === id) {
					if (updates.name) att.employeeName = updates.name;
					if (updates.employeeCode) att.employeeCode = updates.employeeCode;
				}
			});
			this.saveAttendance();
		}
		if (this.currentUser?.id === id) {
			this.currentUser = {
				...this.currentUser,
				...updates
			};
			localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
		}
		return this.users[idx];
	}
	deleteUser(id) {
		const idx = this.users.findIndex((u) => u.id === id);
		if (idx === -1) return false;
		this.users.splice(idx, 1);
		this.saveUsers();
		return true;
	}
	// --- Current User Login Session ---
	getCurrentUser() {
		return this.currentUser;
	}
	setCurrentUser(user) {
		this.currentUser = user;
		if (user) {
			localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
		} else {
			localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
		}
	}
	// --- Punch Actions ---
	punch(userId, type, note = "") {
		const user = this.getUserById(userId);
		if (!user) throw new Error("ユーザーが見つかりません");
		const now = new Date();
		const dateStr = formatDate(now);
		const timeStr = formatTimeHHMMSS(now);
		const timeHHMM = formatTimeHHMM(now);
		const punchRecord = {
			id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
			userId,
			employeeName: user.name,
			employeeCode: user.employeeCode,
			type,
			timestamp: now.toISOString(),
			date: dateStr,
			time: timeStr,
			note,
			syncedToSheets: false
		};
		this.punches.unshift(punchRecord);
		this.savePunches();
		// Find or create daily attendance
		const attendanceId = `${userId}_${dateStr.replace(/\//g, "-")}`;
		let daily = this.attendance.find((a) => a.id === attendanceId);
		if (!daily) {
			daily = {
				id: attendanceId,
				userId,
				employeeName: user.name,
				employeeCode: user.employeeCode,
				date: dateStr,
				breakMinutes: 0,
				totalWorkMinutes: 0,
				overtimeMinutes: 0,
				status: "not_started",
				punches: []
			};
			this.attendance.unshift(daily);
		}
		daily.punches.push(punchRecord);
		// Update status and times according to punch type
		if (type === "clock_in" || type === "direct_in") {
			if (!daily.clockIn) daily.clockIn = timeHHMM;
			daily.status = "working";
			if (type === "direct_in") daily.isDirectIn = true;
		} else if (type === "clock_out" || type === "direct_out") {
			daily.clockOut = timeHHMM;
			daily.status = "completed";
			if (type === "direct_out") daily.isDirectOut = true;
		} else if (type === "break" || type === "break_start") {
			if (daily.status === "working") {
				daily.status = "on_break";
			} else if (daily.status === "on_break") {
				daily.status = "working";
				// Add 60 mins break or estimate
				daily.breakMinutes = (daily.breakMinutes || 0) + 60;
			}
		} else if (type === "break_end") {
			daily.status = "working";
		}
		// Recompute total work minutes if clockOut is present
		if (daily.clockIn && daily.clockOut) {
			const inMin = parseTimeToMinutes(daily.clockIn);
			const outMin = parseTimeToMinutes(daily.clockOut);
			const totalSpan = Math.max(0, outMin - inMin);
			daily.totalWorkMinutes = Math.max(0, totalSpan - (daily.breakMinutes || 0));
			daily.overtimeMinutes = Math.max(0, daily.totalWorkMinutes - this.settings.standardWorkHours * 60);
		}
		this.saveAttendance();
		return {
			punch: punchRecord,
			attendance: daily
		};
	}
	// --- Attendance Record Management (管理者側でデータの修正) ---
	getAllAttendance() {
		return [...this.attendance].sort((a, b) => b.date.localeCompare(a.date));
	}
	getAllPunches() {
		return [...this.punches].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
	}
	getTodayAttendanceForUser(userId) {
		const todayStr = formatDate(new Date());
		return this.attendance.find((a) => a.userId === userId && a.date === todayStr);
	}
	getAttendanceByUser(userId) {
		return this.attendance.filter((a) => a.userId === userId).sort((a, b) => b.date.localeCompare(a.date));
	}
	updateAttendanceRecord(id, updates) {
		const idx = this.attendance.findIndex((a) => a.id === id);
		if (idx === -1) return null;
		const record = this.attendance[idx];
		if (updates.clockIn !== undefined) record.clockIn = updates.clockIn;
		if (updates.clockOut !== undefined) record.clockOut = updates.clockOut;
		if (updates.breakMinutes !== undefined) record.breakMinutes = updates.breakMinutes;
		if (updates.note !== undefined) record.note = updates.note;
		if (updates.status !== undefined) record.status = updates.status;
		record.isManualEdit = true;
		record.editedBy = updates.adminName || "管理者";
		// Recalculate working minutes
		if (record.clockIn && record.clockOut) {
			const inMin = parseTimeToMinutes(record.clockIn);
			const outMin = parseTimeToMinutes(record.clockOut);
			const span = Math.max(0, outMin - inMin);
			record.totalWorkMinutes = Math.max(0, span - (record.breakMinutes || 0));
			record.overtimeMinutes = Math.max(0, record.totalWorkMinutes - this.settings.standardWorkHours * 60);
			if (!updates.status) {
				record.status = "completed";
			}
		}
		this.saveAttendance();
		return record;
	}
	addManualAttendanceRecord(data) {
		const user = this.getUserById(data.userId);
		if (!user) throw new Error("ユーザーが見つかりません");
		const inMin = parseTimeToMinutes(data.clockIn);
		const outMin = parseTimeToMinutes(data.clockOut);
		const span = Math.max(0, outMin - inMin);
		const totalWorkMinutes = Math.max(0, span - data.breakMinutes);
		const overtimeMinutes = Math.max(0, totalWorkMinutes - this.settings.standardWorkHours * 60);
		const id = `${data.userId}_${data.date.replace(/\//g, "-")}`;
		const newRecord = {
			id,
			userId: data.userId,
			employeeName: user.name,
			employeeCode: user.employeeCode,
			date: data.date,
			clockIn: data.clockIn,
			clockOut: data.clockOut,
			breakMinutes: data.breakMinutes,
			totalWorkMinutes,
			overtimeMinutes,
			status: "completed",
			note: data.note || "管理者手動登録",
			isManualEdit: true,
			editedBy: data.adminName,
			punches: []
		};
		// Remove existing if any
		const existingIdx = this.attendance.findIndex((a) => a.id === id);
		if (existingIdx !== -1) {
			this.attendance[existingIdx] = newRecord;
		} else {
			this.attendance.unshift(newRecord);
		}
		this.saveAttendance();
		return newRecord;
	}
	deleteAttendanceRecord(id) {
		const idx = this.attendance.findIndex((a) => a.id === id);
		if (idx === -1) return false;
		this.attendance.splice(idx, 1);
		this.saveAttendance();
		return true;
	}
	// --- Settings & Gas Config ---
	getSettings() {
		return { ...this.settings };
	}
	updateSettings(updates) {
		this.settings = {
			...this.settings,
			...updates
		};
		localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
		return this.settings;
	}
	getGasConfig() {
		return { ...this.gasConfig };
	}
	updateGasConfig(updates) {
		this.gasConfig = {
			...this.gasConfig,
			...updates
		};
		localStorage.setItem(STORAGE_KEYS.GAS_CONFIG, JSON.stringify(this.gasConfig));
		return this.gasConfig;
	}
	// Reset to factory sample data
	resetAllData() {
		localStorage.removeItem(STORAGE_KEYS.USERS);
		localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
		localStorage.removeItem(STORAGE_KEYS.PUNCHES);
		localStorage.removeItem(STORAGE_KEYS.SETTINGS);
		localStorage.removeItem(STORAGE_KEYS.GAS_CONFIG);
		localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
		this.init();
	}
}
export const storage = new AttendanceStorage();

//# sourceMappingURL=data:application/json;base64,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QWEsV0FBVyxhQUFhLFlBQVk7RUFDakQsS0FBSyxLQUFLO0NBQ1o7QUFDRjtBQUVBLE9BQU8sTUFBTSxVQUFVLElBQUksa0JBQWtCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbInN0b3JhZ2UudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGFpbHlBdHRlbmRhbmNlLFxuICBHYXNDb25maWcsXG4gIFB1bmNoUmVjb3JkLFxuICBQdW5jaFR5cGUsXG4gIFN5c3RlbVNldHRpbmdzLFxuICBVc2VyLFxuICBXb3JrU3RhdHVzLFxufSBmcm9tICcuLi90eXBlcy9hdHRlbmRhbmNlJztcblxuY29uc3QgU1RPUkFHRV9LRVlTID0ge1xuICBVU0VSUzogJ3BvY2hpa2luX3VzZXJzX3YyJyxcbiAgQVRURU5EQU5DRTogJ3BvY2hpa2luX2F0dGVuZGFuY2VfdjInLFxuICBQVU5DSEVTOiAncG9jaGlraW5fcHVuY2hlc192MicsXG4gIFNFVFRJTkdTOiAncG9jaGlraW5fc2V0dGluZ3NfdjInLFxuICBHQVNfQ09ORklHOiAncG9jaGlraW5fZ2FzX2NvbmZpZ192MicsXG4gIENVUlJFTlRfVVNFUjogJ3BvY2hpa2luX2N1cnJlbnRfdXNlcl92MicsXG59O1xuXG4vLyBJbml0aWFsIGRlZmF1bHQgc2V0dGluZ3MgbWF0Y2hpbmcgdGhlIHVzZXIncyBzY3JlZW5zaG90XG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogU3lzdGVtU2V0dGluZ3MgPSB7XG4gIGZhY2lsaXR5TmFtZTogJ+WwseWKtOe2mee2muaUr+aPtELlnovkuovmpa3miYBzYWJvdCcsXG4gIGFubm91bmNlbWVudFRpdGxlOiAn6YeN6KaB44Gq44GK55+l44KJ44GbJyxcbiAgYW5ub3VuY2VtZW50Q29udGVudDpcbiAgICAn44CQ5qWt5YuZ6YCj57Wh44CRMTHmnIjluqbjga7lgaXlurfoqLrmlq3jgqLjg7PjgrHjg7zjg4jjga/mnaXpgLHngavmm5zml6Xjgb7jgafjgavmj5Dlh7rjgZfjgabjgY/jgaDjgZXjgYTjgILlr5Lmmpblt67jgYzmv4DjgZfjgYTjgZ/jgoHjgIHkvZPoqr/nrqHnkIbjgavnlZnmhI/jgZfjgb7jgZfjgofjgYbjgIInLFxuICBhbm5vdW5jZW1lbnRBY3RpdmU6IHRydWUsXG4gIHN0YW5kYXJkU3RhcnRUaW1lOiAnMDk6MDAnLFxuICBzdGFuZGFyZEVuZFRpbWU6ICcxODowMCcsXG4gIHN0YW5kYXJkV29ya0hvdXJzOiA4LFxuICByb3VuZE1pbnV0ZXM6IDEsXG4gIGtpb3NrQXV0b1Jlc2V0U2Vjb25kczogOCxcbiAgc291bmRFbmFibGVkOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfR0FTX0NPTkZJRzogR2FzQ29uZmlnID0ge1xuICB3ZWJBcHBVcmw6ICcnLFxuICBzaGVldE5hbWU6ICfli6TmgKDlrp/nuL7jg63jgrAnLFxuICBhdXRvU3luY0VuYWJsZWQ6IHRydWUsXG4gIGxhc3RTeW5jVGltZTogbnVsbCxcbiAgbGFzdFN5bmNTdGF0dXM6ICdpZGxlJyxcbiAgbGFzdFN5bmNNZXNzYWdlOiAn5pyq5o6l57aa77yIVVJM44KS6Kit5a6a44GX44Gm44GP44Gg44GV44GE77yJJyxcbiAgc3luY0NvdW50OiAwLFxufTtcblxuLy8gSW5pdGlhbCBzYW1wbGUgdXNlcnNcbmNvbnN0IElOSVRJQUxfVVNFUlM6IFVzZXJbXSA9IFtcbiAge1xuICAgIGlkOiAndXNlcl9hZG1pbicsXG4gICAgdXNlcm5hbWU6ICdhZG1pbicsXG4gICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgbmFtZTogJ+euoeeQhuiAhScsXG4gICAgcm9sZTogJ2FkbWluJyxcbiAgICBlbXBsb3llZUNvZGU6ICdBRE0wMDEnLFxuICAgIGRlcGFydG1lbnQ6ICfnrqHnkIbogIUnLFxuICAgIHBpbjogJzk5OTknLFxuICAgIGhvdXJseVdhZ2U6IDIwMDAsXG4gICAgYWN0aXZlOiB0cnVlLFxuICAgIGNyZWF0ZWRBdDogJzIwMjYtMDEtMDEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICd1c2VyX3NhdG8nLFxuICAgIHVzZXJuYW1lOiAnc2F0bycsXG4gICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgbmFtZTogJ+S9kOiXpCDlgaXkuIAnLFxuICAgIHJvbGU6ICdlbXBsb3llZScsXG4gICAgZW1wbG95ZWVDb2RlOiAnRU1QMDAxJyxcbiAgICBkZXBhcnRtZW50OiAn5L2c5qWt56ys5LiA5L+CJyxcbiAgICBwaW46ICcxMDAxJyxcbiAgICBob3VybHlXYWdlOiAxMjAwLFxuICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICBjcmVhdGVkQXQ6ICcyMDI2LTAxLTEwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAndXNlcl9zdXp1a2knLFxuICAgIHVzZXJuYW1lOiAnc3V6dWtpJyxcbiAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICBuYW1lOiAn6Yi05pyoIOaBtee+jicsXG4gICAgcm9sZTogJ2VtcGxveWVlJyxcbiAgICBlbXBsb3llZUNvZGU6ICdFTVAwMDInLFxuICAgIGRlcGFydG1lbnQ6ICfjg4fjgrbjgqTjg7PliLbkvZznj60nLFxuICAgIHBpbjogJzEwMDInLFxuICAgIGhvdXJseVdhZ2U6IDEyNTAsXG4gICAgYWN0aXZlOiB0cnVlLFxuICAgIGNyZWF0ZWRBdDogJzIwMjYtMDItMDEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICd1c2VyX3RhbmFrYScsXG4gICAgdXNlcm5hbWU6ICd0YW5ha2EnLFxuICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgIG5hbWU6ICfnlLDkuK0g57+U5aSqJyxcbiAgICByb2xlOiAnZW1wbG95ZWUnLFxuICAgIGVtcGxveWVlQ29kZTogJ0VNUDAwMycsXG4gICAgZGVwYXJ0bWVudDogJ+aiseWMheODu+WHuuiNt+S/gicsXG4gICAgcGluOiAnMTAwMycsXG4gICAgaG91cmx5V2FnZTogMTE4MCxcbiAgICBhY3RpdmU6IHRydWUsXG4gICAgY3JlYXRlZEF0OiAnMjAyNi0wMy0xNScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3VzZXJfdGFrYWhhc2hpJyxcbiAgICB1c2VybmFtZTogJ3Rha2FoYXNoaScsXG4gICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgbmFtZTogJ+mrmOapiyDnvo7lkrInLFxuICAgIHJvbGU6ICdlbXBsb3llZScsXG4gICAgZW1wbG95ZWVDb2RlOiAnRU1QMDA0JyxcbiAgICBkZXBhcnRtZW50OiAn5L2c5qWt5pSv5o+054+tJyxcbiAgICBwaW46ICcxMDA0JyxcbiAgICBob3VybHlXYWdlOiAxMjIwLFxuICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICBjcmVhdGVkQXQ6ICcyMDI2LTA0LTAxJyxcbiAgfSxcbiAge1xuICAgIGlkOiAndXNlcl93YXRhbmFiZScsXG4gICAgdXNlcm5hbWU6ICd3YXRhbmFiZScsXG4gICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgbmFtZTogJ+a4oei+uiDoo5XmqLknLFxuICAgIHJvbGU6ICdlbXBsb3llZScsXG4gICAgZW1wbG95ZWVDb2RlOiAnRU1QMDA1JyxcbiAgICBkZXBhcnRtZW50OiAn6Lu95L2c5qWt54+tJyxcbiAgICBwaW46ICcxMDA1JyxcbiAgICBob3VybHlXYWdlOiAxMTUwLFxuICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICBjcmVhdGVkQXQ6ICcyMDI2LTA1LTEwJyxcbiAgfSxcbl07XG5cbi8vIEhlbHBlciB0byBmb3JtYXQgZGF0ZSBZWVlZL01NL0REXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkOiBEYXRlKTogc3RyaW5nIHtcbiAgY29uc3QgeSA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbSA9IFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBkYXkgPSBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHt5fS8ke219LyR7ZGF5fWA7XG59XG5cbi8vIEhlbHBlciB0byBmb3JtYXQgdGltZSBISDpNTVxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRpbWVISE1NKGQ6IERhdGUpOiBzdHJpbmcge1xuICBjb25zdCBoID0gU3RyaW5nKGQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbSA9IFN0cmluZyhkLmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke2h9OiR7bX1gO1xufVxuXG4vLyBIZWxwZXIgdG8gZm9ybWF0IHRpbWUgSEg6TU06U1NcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRUaW1lSEhNTVNTKGQ6IERhdGUpOiBzdHJpbmcge1xuICBjb25zdCBoID0gU3RyaW5nKGQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbSA9IFN0cmluZyhkLmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgcyA9IFN0cmluZyhkLmdldFNlY29uZHMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke2h9OiR7bX06JHtzfWA7XG59XG5cbi8vIFBhcnNlIFwiSEg6TU1cIiB0byBtaW51dGVzIGZyb20gMDA6MDBcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRpbWVUb01pbnV0ZXModGltZVN0cj86IHN0cmluZyk6IG51bWJlciB7XG4gIGlmICghdGltZVN0ciB8fCAhdGltZVN0ci5pbmNsdWRlcygnOicpKSByZXR1cm4gMDtcbiAgY29uc3QgW2gsIG1dID0gdGltZVN0ci5zcGxpdCgnOicpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gKGggfHwgMCkgKiA2MCArIChtIHx8IDApO1xufVxuXG4vLyBHZW5lcmF0ZSByZWFsaXN0aWMgcGFzdCBsb2dzIGZvciBkZW1vbnN0cmF0aW9uIChsYXN0IDMwIGRheXMpXG5mdW5jdGlvbiBnZW5lcmF0ZUluaXRpYWxSZWNvcmRzKCk6IHsgYXR0ZW5kYW5jZTogRGFpbHlBdHRlbmRhbmNlW107IHB1bmNoZXM6IFB1bmNoUmVjb3JkW10gfSB7XG4gIGNvbnN0IGF0dGVuZGFuY2VMaXN0OiBEYWlseUF0dGVuZGFuY2VbXSA9IFtdO1xuICBjb25zdCBwdW5jaExpc3Q6IFB1bmNoUmVjb3JkW10gPSBbXTtcbiAgY29uc3QgZW1wbG95ZWVzID0gSU5JVElBTF9VU0VSUy5maWx0ZXIoKHUpID0+IHUucm9sZSA9PT0gJ2VtcGxveWVlJyk7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKDIwMjYsIDEwLCA2KTsgLy8gTm92ZW1iZXIgNiwgMjAyNiAobWF0Y2hpbmcgc2NyZWVuc2hvdCBjb250ZXh0KVxuXG4gIC8vIEdlbmVyYXRlIDIwIHdvcmtkYXlzIGluIHBhc3QgbW9udGhcbiAgZm9yIChsZXQgb2Zmc2V0ID0gMjU7IG9mZnNldCA+PSAxOyBvZmZzZXQtLSkge1xuICAgIGNvbnN0IGN1ckRhdGUgPSBuZXcgRGF0ZShub3cpO1xuICAgIGN1ckRhdGUuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpIC0gb2Zmc2V0KTtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBjdXJEYXRlLmdldERheSgpO1xuICAgIGlmIChkYXlPZldlZWsgPT09IDAgfHwgZGF5T2ZXZWVrID09PSA2KSBjb250aW51ZTsgLy8gc2tpcCB3ZWVrZW5kc1xuXG4gICAgY29uc3QgZGF0ZVN0ciA9IGZvcm1hdERhdGUoY3VyRGF0ZSk7XG5cbiAgICBlbXBsb3llZXMuZm9yRWFjaCgoZW1wLCBlbXBJZHgpID0+IHtcbiAgICAgIC8vIDkwJSBhdHRlbmRhbmNlIHJhdGVcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wOCkgcmV0dXJuO1xuXG4gICAgICAvLyBCYXNlIGhvdXJzOiBjbG9jayBpbiBhcm91bmQgMDg6NTAgLSAwOTowNVxuICAgICAgY29uc3QgaW5NaW51dGVPZmZzZXQgPSBNYXRoLmZsb29yKChlbXBJZHggKiAzICsgb2Zmc2V0ICogNykgJSAyNSkgLSAxMDtcbiAgICAgIGNvbnN0IGluSG91ciA9IDg7XG4gICAgICBjb25zdCBpbk1pbiA9IDUwICsgaW5NaW51dGVPZmZzZXQ7XG4gICAgICBjb25zdCBpbkRhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgIGluRGF0ZS5zZXRIb3VycyhpbkhvdXIsIGluTWluLCAwKTtcblxuICAgICAgLy8gQmFzZSBjbG9jayBvdXQgYXJvdW5kIDE3OjMwIC0gMTg6NDVcbiAgICAgIGNvbnN0IG91dE1pbnV0ZU9mZnNldCA9IE1hdGguZmxvb3IoKGVtcElkeCAqIDUgKyBvZmZzZXQgKiAxMSkgJSA1MCk7XG4gICAgICBjb25zdCBvdXRIb3VyID0gMTc7XG4gICAgICBjb25zdCBvdXRNaW4gPSAzMCArIG91dE1pbnV0ZU9mZnNldDtcbiAgICAgIGNvbnN0IG91dERhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgIG91dERhdGUuc2V0SG91cnMob3V0SG91ciwgb3V0TWluLCAwKTtcblxuICAgICAgY29uc3QgY2xvY2tJbiA9IGZvcm1hdFRpbWVISE1NKGluRGF0ZSk7XG4gICAgICBjb25zdCBjbG9ja091dCA9IGZvcm1hdFRpbWVISE1NKG91dERhdGUpO1xuICAgICAgY29uc3QgYnJlYWtNaW51dGVzID0gNjA7XG5cbiAgICAgIGNvbnN0IHRvdGFsU3BhbiA9IHBhcnNlVGltZVRvTWludXRlcyhjbG9ja091dCkgLSBwYXJzZVRpbWVUb01pbnV0ZXMoY2xvY2tJbik7XG4gICAgICBjb25zdCB3b3JrTWludXRlcyA9IE1hdGgubWF4KDAsIHRvdGFsU3BhbiAtIGJyZWFrTWludXRlcyk7XG4gICAgICBjb25zdCBvdmVydGltZU1pbnV0ZXMgPSBNYXRoLm1heCgwLCB3b3JrTWludXRlcyAtIDggKiA2MCk7XG5cbiAgICAgIGNvbnN0IHBJbjogUHVuY2hSZWNvcmQgPSB7XG4gICAgICAgIGlkOiBgcF9pbl8ke2VtcC5pZH1fJHtkYXRlU3RyfWAsXG4gICAgICAgIHVzZXJJZDogZW1wLmlkLFxuICAgICAgICBlbXBsb3llZU5hbWU6IGVtcC5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IGVtcC5lbXBsb3llZUNvZGUsXG4gICAgICAgIHR5cGU6ICdjbG9ja19pbicsXG4gICAgICAgIHRpbWVzdGFtcDogaW5EYXRlLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGRhdGU6IGRhdGVTdHIsXG4gICAgICAgIHRpbWU6IGZvcm1hdFRpbWVISE1NU1MoaW5EYXRlKSxcbiAgICAgICAgc3luY2VkVG9TaGVldHM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwT3V0OiBQdW5jaFJlY29yZCA9IHtcbiAgICAgICAgaWQ6IGBwX291dF8ke2VtcC5pZH1fJHtkYXRlU3RyfWAsXG4gICAgICAgIHVzZXJJZDogZW1wLmlkLFxuICAgICAgICBlbXBsb3llZU5hbWU6IGVtcC5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IGVtcC5lbXBsb3llZUNvZGUsXG4gICAgICAgIHR5cGU6ICdjbG9ja19vdXQnLFxuICAgICAgICB0aW1lc3RhbXA6IG91dERhdGUudG9JU09TdHJpbmcoKSxcbiAgICAgICAgZGF0ZTogZGF0ZVN0cixcbiAgICAgICAgdGltZTogZm9ybWF0VGltZUhITU1TUyhvdXREYXRlKSxcbiAgICAgICAgc3luY2VkVG9TaGVldHM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBwdW5jaExpc3QucHVzaChwSW4sIHBPdXQpO1xuXG4gICAgICBhdHRlbmRhbmNlTGlzdC5wdXNoKHtcbiAgICAgICAgaWQ6IGAke2VtcC5pZH1fJHtkYXRlU3RyLnJlcGxhY2UoL1xcLy9nLCAnLScpfWAsXG4gICAgICAgIHVzZXJJZDogZW1wLmlkLFxuICAgICAgICBlbXBsb3llZU5hbWU6IGVtcC5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IGVtcC5lbXBsb3llZUNvZGUsXG4gICAgICAgIGRhdGU6IGRhdGVTdHIsXG4gICAgICAgIGNsb2NrSW4sXG4gICAgICAgIGNsb2NrT3V0LFxuICAgICAgICBicmVha01pbnV0ZXMsXG4gICAgICAgIHRvdGFsV29ya01pbnV0ZXM6IHdvcmtNaW51dGVzLFxuICAgICAgICBvdmVydGltZU1pbnV0ZXMsXG4gICAgICAgIHN0YXR1czogJ2NvbXBsZXRlZCcsXG4gICAgICAgIGlzTWFudWFsRWRpdDogb2Zmc2V0ID09PSAzICYmIGVtcElkeCA9PT0gMCwgLy8gMSByZWNvcmQgd2l0aCBlZGl0IG1hcmtlciBmb3IgZGVtb1xuICAgICAgICBlZGl0ZWRCeTogb2Zmc2V0ID09PSAzICYmIGVtcElkeCA9PT0gMCA/ICfnrqHnkIbogIUnIDogdW5kZWZpbmVkLFxuICAgICAgICBub3RlOiBvZmZzZXQgPT09IDMgJiYgZW1wSWR4ID09PSAwID8gJ+aJk+WIu+W/mOOCjOS/ruato++8iOaJgOmVt+aJv+iqje+8iScgOiAnJyxcbiAgICAgICAgcHVuY2hlczogW3BJbiwgcE91dF0sXG4gICAgICAgIGxhc3RTeW5jU3RhdHVzOiAnc3luY2VkJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQWRkIHRvZGF5J3Mgc2FtcGxlIHB1bmNoZXMgKE5vdmVtYmVyIDYsIDIwMjYpXG4gIGNvbnN0IHRvZGF5U3RyID0gZm9ybWF0RGF0ZShub3cpO1xuICBlbXBsb3llZXMuZm9yRWFjaCgoZW1wLCBpKSA9PiB7XG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIC8vIFNhdG86IGFscmVhZHkgY2xvY2tlZCBpbiBhbmQgd29ya2luZ1xuICAgICAgY29uc3QgaW5UaW1lID0gJzA4OjUyJztcbiAgICAgIGNvbnN0IGluRGF0ZSA9IG5ldyBEYXRlKG5vdyk7XG4gICAgICBpbkRhdGUuc2V0SG91cnMoOCwgNTIsIDApO1xuICAgICAgY29uc3QgcEluOiBQdW5jaFJlY29yZCA9IHtcbiAgICAgICAgaWQ6IGBwX2luXyR7ZW1wLmlkfV8ke3RvZGF5U3RyfWAsXG4gICAgICAgIHVzZXJJZDogZW1wLmlkLFxuICAgICAgICBlbXBsb3llZU5hbWU6IGVtcC5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IGVtcC5lbXBsb3llZUNvZGUsXG4gICAgICAgIHR5cGU6ICdjbG9ja19pbicsXG4gICAgICAgIHRpbWVzdGFtcDogaW5EYXRlLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyLFxuICAgICAgICB0aW1lOiAnMDg6NTI6MTQnLFxuICAgICAgICBzeW5jZWRUb1NoZWV0czogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBwdW5jaExpc3QucHVzaChwSW4pO1xuICAgICAgYXR0ZW5kYW5jZUxpc3QucHVzaCh7XG4gICAgICAgIGlkOiBgJHtlbXAuaWR9XyR7dG9kYXlTdHIucmVwbGFjZSgvXFwvL2csICctJyl9YCxcbiAgICAgICAgdXNlcklkOiBlbXAuaWQsXG4gICAgICAgIGVtcGxveWVlTmFtZTogZW1wLm5hbWUsXG4gICAgICAgIGVtcGxveWVlQ29kZTogZW1wLmVtcGxveWVlQ29kZSxcbiAgICAgICAgZGF0ZTogdG9kYXlTdHIsXG4gICAgICAgIGNsb2NrSW46IGluVGltZSxcbiAgICAgICAgYnJlYWtNaW51dGVzOiAwLFxuICAgICAgICB0b3RhbFdvcmtNaW51dGVzOiAwLFxuICAgICAgICBvdmVydGltZU1pbnV0ZXM6IDAsXG4gICAgICAgIHN0YXR1czogJ3dvcmtpbmcnLFxuICAgICAgICBwdW5jaGVzOiBbcEluXSxcbiAgICAgICAgbGFzdFN5bmNTdGF0dXM6ICdzeW5jZWQnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpID09PSAxKSB7XG4gICAgICAvLyBTdXp1a2k6IGNsb2NrZWQgaW4gYW5kIGN1cnJlbnRseSBvbiBicmVha1xuICAgICAgY29uc3QgaW5UaW1lID0gJzA5OjAyJztcbiAgICAgIGNvbnN0IGluRGF0ZSA9IG5ldyBEYXRlKG5vdyk7XG4gICAgICBpbkRhdGUuc2V0SG91cnMoOSwgMiwgMCk7XG4gICAgICBjb25zdCBwSW46IFB1bmNoUmVjb3JkID0ge1xuICAgICAgICBpZDogYHBfaW5fJHtlbXAuaWR9XyR7dG9kYXlTdHJ9YCxcbiAgICAgICAgdXNlcklkOiBlbXAuaWQsXG4gICAgICAgIGVtcGxveWVlTmFtZTogZW1wLm5hbWUsXG4gICAgICAgIGVtcGxveWVlQ29kZTogZW1wLmVtcGxveWVlQ29kZSxcbiAgICAgICAgdHlwZTogJ2Nsb2NrX2luJyxcbiAgICAgICAgdGltZXN0YW1wOiBpbkRhdGUudG9JU09TdHJpbmcoKSxcbiAgICAgICAgZGF0ZTogdG9kYXlTdHIsXG4gICAgICAgIHRpbWU6ICcwOTowMjo0MCcsXG4gICAgICAgIHN5bmNlZFRvU2hlZXRzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGJyZWFrRGF0ZSA9IG5ldyBEYXRlKG5vdyk7XG4gICAgICBicmVha0RhdGUuc2V0SG91cnMoMTIsIDUsIDApO1xuICAgICAgY29uc3QgcEJyZWFrOiBQdW5jaFJlY29yZCA9IHtcbiAgICAgICAgaWQ6IGBwX2JyZWFrXyR7ZW1wLmlkfV8ke3RvZGF5U3RyfWAsXG4gICAgICAgIHVzZXJJZDogZW1wLmlkLFxuICAgICAgICBlbXBsb3llZU5hbWU6IGVtcC5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IGVtcC5lbXBsb3llZUNvZGUsXG4gICAgICAgIHR5cGU6ICdicmVha19zdGFydCcsXG4gICAgICAgIHRpbWVzdGFtcDogYnJlYWtEYXRlLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyLFxuICAgICAgICB0aW1lOiAnMTI6MDU6MTAnLFxuICAgICAgICBzeW5jZWRUb1NoZWV0czogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBwdW5jaExpc3QucHVzaChwSW4sIHBCcmVhayk7XG4gICAgICBhdHRlbmRhbmNlTGlzdC5wdXNoKHtcbiAgICAgICAgaWQ6IGAke2VtcC5pZH1fJHt0b2RheVN0ci5yZXBsYWNlKC9cXC8vZywgJy0nKX1gLFxuICAgICAgICB1c2VySWQ6IGVtcC5pZCxcbiAgICAgICAgZW1wbG95ZWVOYW1lOiBlbXAubmFtZSxcbiAgICAgICAgZW1wbG95ZWVDb2RlOiBlbXAuZW1wbG95ZWVDb2RlLFxuICAgICAgICBkYXRlOiB0b2RheVN0cixcbiAgICAgICAgY2xvY2tJbjogaW5UaW1lLFxuICAgICAgICBicmVha01pbnV0ZXM6IDQ1LFxuICAgICAgICB0b3RhbFdvcmtNaW51dGVzOiAxODAsXG4gICAgICAgIG92ZXJ0aW1lTWludXRlczogMCxcbiAgICAgICAgc3RhdHVzOiAnb25fYnJlYWsnLFxuICAgICAgICBwdW5jaGVzOiBbcEluLCBwQnJlYWtdLFxuICAgICAgICBsYXN0U3luY1N0YXR1czogJ3N5bmNlZCcsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7IGF0dGVuZGFuY2U6IGF0dGVuZGFuY2VMaXN0LCBwdW5jaGVzOiBwdW5jaExpc3QgfTtcbn1cblxuLy8gU3RvcmFnZSBNYW5hZ2VyXG5jbGFzcyBBdHRlbmRhbmNlU3RvcmFnZSB7XG4gIHByaXZhdGUgdXNlcnM6IFVzZXJbXSA9IFtdO1xuICBwcml2YXRlIGF0dGVuZGFuY2U6IERhaWx5QXR0ZW5kYW5jZVtdID0gW107XG4gIHByaXZhdGUgcHVuY2hlczogUHVuY2hSZWNvcmRbXSA9IFtdO1xuICBwcml2YXRlIHNldHRpbmdzOiBTeXN0ZW1TZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1M7XG4gIHByaXZhdGUgZ2FzQ29uZmlnOiBHYXNDb25maWcgPSBERUZBVUxUX0dBU19DT05GSUc7XG4gIHByaXZhdGUgY3VycmVudFVzZXI6IFVzZXIgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZWRVc2VycyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5VU0VSUyk7XG4gICAgICBjb25zdCBzdG9yZWRBdHQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQVRURU5EQU5DRSk7XG4gICAgICBjb25zdCBzdG9yZWRQdW5jaGVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLlBVTkNIRVMpO1xuICAgICAgY29uc3Qgc3RvcmVkU2V0dGluZ3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuU0VUVElOR1MpO1xuICAgICAgY29uc3Qgc3RvcmVkR2FzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkdBU19DT05GSUcpO1xuICAgICAgY29uc3Qgc3RvcmVkQ3VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVVNFUik7XG5cbiAgICAgIGlmICghc3RvcmVkVXNlcnMgfHwgIXN0b3JlZEF0dCkge1xuICAgICAgICAvLyBTZWVkIGluaXRpYWwgZGF0YVxuICAgICAgICBjb25zdCBpbml0aWFsID0gZ2VuZXJhdGVJbml0aWFsUmVjb3JkcygpO1xuICAgICAgICB0aGlzLnVzZXJzID0gSU5JVElBTF9VU0VSUztcbiAgICAgICAgdGhpcy5hdHRlbmRhbmNlID0gaW5pdGlhbC5hdHRlbmRhbmNlO1xuICAgICAgICB0aGlzLnB1bmNoZXMgPSBpbml0aWFsLnB1bmNoZXM7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBERUZBVUxUX1NFVFRJTkdTO1xuICAgICAgICB0aGlzLmdhc0NvbmZpZyA9IERFRkFVTFRfR0FTX0NPTkZJRztcbiAgICAgICAgdGhpcy5zYXZlQWxsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVzZXJzID0gSlNPTi5wYXJzZShzdG9yZWRVc2Vycyk7XG4gICAgICAgIHRoaXMuYXR0ZW5kYW5jZSA9IEpTT04ucGFyc2Uoc3RvcmVkQXR0KTtcbiAgICAgICAgdGhpcy5wdW5jaGVzID0gc3RvcmVkUHVuY2hlcyA/IEpTT04ucGFyc2Uoc3RvcmVkUHVuY2hlcykgOiBbXTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHN0b3JlZFNldHRpbmdzID8gSlNPTi5wYXJzZShzdG9yZWRTZXR0aW5ncykgOiBERUZBVUxUX1NFVFRJTkdTO1xuICAgICAgICB0aGlzLmdhc0NvbmZpZyA9IHN0b3JlZEdhcyA/IEpTT04ucGFyc2Uoc3RvcmVkR2FzKSA6IERFRkFVTFRfR0FTX0NPTkZJRztcbiAgICAgICAgaWYgKHN0b3JlZEN1cikge1xuICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZEN1cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTdG9yYWdlIGluaXQgZmFpbGVkLCB1c2luZyBkZWZhdWx0cycsIGUpO1xuICAgICAgdGhpcy51c2VycyA9IElOSVRJQUxfVVNFUlM7XG4gICAgICBjb25zdCBpbml0aWFsID0gZ2VuZXJhdGVJbml0aWFsUmVjb3JkcygpO1xuICAgICAgdGhpcy5hdHRlbmRhbmNlID0gaW5pdGlhbC5hdHRlbmRhbmNlO1xuICAgICAgdGhpcy5wdW5jaGVzID0gaW5pdGlhbC5wdW5jaGVzO1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1M7XG4gICAgICB0aGlzLmdhc0NvbmZpZyA9IERFRkFVTFRfR0FTX0NPTkZJRztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNhdmVVc2VycygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuVVNFUlMsIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlcnMpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUF0dGVuZGFuY2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkFUVEVOREFOQ0UsIEpTT04uc3RyaW5naWZ5KHRoaXMuYXR0ZW5kYW5jZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlUHVuY2hlcygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuUFVOQ0hFUywgSlNPTi5zdHJpbmdpZnkodGhpcy5wdW5jaGVzKSk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVBbGwoKSB7XG4gICAgdGhpcy5zYXZlVXNlcnMoKTtcbiAgICB0aGlzLnNhdmVBdHRlbmRhbmNlKCk7XG4gICAgdGhpcy5zYXZlUHVuY2hlcygpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5TRVRUSU5HUywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXR0aW5ncykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5HQVNfQ09ORklHLCBKU09OLnN0cmluZ2lmeSh0aGlzLmdhc0NvbmZpZykpO1xuICB9XG5cbiAgLy8gLS0tIFVzZXJzICYgRW1wbG95ZWUgTWFzdGVyIC0tLVxuICBnZXRVc2VycygpOiBVc2VyW10ge1xuICAgIHJldHVybiBbLi4udGhpcy51c2Vyc107XG4gIH1cblxuICBnZXRBY3RpdmVFbXBsb3llZXMoKTogVXNlcltdIHtcbiAgICByZXR1cm4gdGhpcy51c2Vycy5maWx0ZXIoKHUpID0+IHUucm9sZSA9PT0gJ2VtcGxveWVlJyAmJiB1LmFjdGl2ZSk7XG4gIH1cblxuICBnZXRVc2VyQnlJZChpZDogc3RyaW5nKTogVXNlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMudXNlcnMuZmluZCgodSkgPT4gdS5pZCA9PT0gaWQpO1xuICB9XG5cbiAgYWRkRW1wbG95ZWUocGFyYW1zOiBPbWl0PFVzZXIsICdpZCcgfCAncm9sZScgfCAnY3JlYXRlZEF0Jz4pOiBVc2VyIHtcbiAgICBjb25zdCBuZXdVc2VyOiBVc2VyID0ge1xuICAgICAgLi4ucGFyYW1zLFxuICAgICAgaWQ6IGB1c2VyXyR7RGF0ZS5ub3coKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgNil9YCxcbiAgICAgIHJvbGU6ICdlbXBsb3llZScsXG4gICAgICBjcmVhdGVkQXQ6IGZvcm1hdERhdGUobmV3IERhdGUoKSksXG4gICAgfTtcbiAgICB0aGlzLnVzZXJzLnB1c2gobmV3VXNlcik7XG4gICAgdGhpcy5zYXZlVXNlcnMoKTtcbiAgICByZXR1cm4gbmV3VXNlcjtcbiAgfVxuXG4gIHVwZGF0ZVVzZXIoaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxVc2VyPik6IFVzZXIgfCBudWxsIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnVzZXJzLmZpbmRJbmRleCgodSkgPT4gdS5pZCA9PT0gaWQpO1xuICAgIGlmIChpZHggPT09IC0xKSByZXR1cm4gbnVsbDtcbiAgICB0aGlzLnVzZXJzW2lkeF0gPSB7IC4uLnRoaXMudXNlcnNbaWR4XSwgLi4udXBkYXRlcyB9O1xuICAgIHRoaXMuc2F2ZVVzZXJzKCk7XG5cbiAgICAvLyBJZiBuYW1lIGNoYW5nZWQsIHVwZGF0ZSBjb3JyZXNwb25kaW5nIGF0dGVuZGFuY2UgcmVjb3Jkc1xuICAgIGlmICh1cGRhdGVzLm5hbWUgfHwgdXBkYXRlcy5lbXBsb3llZUNvZGUpIHtcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZS5mb3JFYWNoKChhdHQpID0+IHtcbiAgICAgICAgaWYgKGF0dC51c2VySWQgPT09IGlkKSB7XG4gICAgICAgICAgaWYgKHVwZGF0ZXMubmFtZSkgYXR0LmVtcGxveWVlTmFtZSA9IHVwZGF0ZXMubmFtZTtcbiAgICAgICAgICBpZiAodXBkYXRlcy5lbXBsb3llZUNvZGUpIGF0dC5lbXBsb3llZUNvZGUgPSB1cGRhdGVzLmVtcGxveWVlQ29kZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnNhdmVBdHRlbmRhbmNlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXI/LmlkID09PSBpZCkge1xuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHsgLi4udGhpcy5jdXJyZW50VXNlciwgLi4udXBkYXRlcyB9O1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVVNFUiwgSlNPTi5zdHJpbmdpZnkodGhpcy5jdXJyZW50VXNlcikpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnVzZXJzW2lkeF07XG4gIH1cblxuICBkZWxldGVVc2VyKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnVzZXJzLmZpbmRJbmRleCgodSkgPT4gdS5pZCA9PT0gaWQpO1xuICAgIGlmIChpZHggPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy51c2Vycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLnNhdmVVc2VycygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gLS0tIEN1cnJlbnQgVXNlciBMb2dpbiBTZXNzaW9uIC0tLVxuICBnZXRDdXJyZW50VXNlcigpOiBVc2VyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXI7XG4gIH1cblxuICBzZXRDdXJyZW50VXNlcih1c2VyOiBVc2VyIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9VU0VSLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1VTRVIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLSBQdW5jaCBBY3Rpb25zIC0tLVxuICBwdW5jaCh1c2VySWQ6IHN0cmluZywgdHlwZTogUHVuY2hUeXBlLCBub3RlID0gJycpOiB7XG4gICAgcHVuY2g6IFB1bmNoUmVjb3JkO1xuICAgIGF0dGVuZGFuY2U6IERhaWx5QXR0ZW5kYW5jZTtcbiAgfSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlckJ5SWQodXNlcklkKTtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcign44Om44O844K244O844GM6KaL44Gk44GL44KK44G+44Gb44KTJyk7XG5cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBmb3JtYXREYXRlKG5vdyk7XG4gICAgY29uc3QgdGltZVN0ciA9IGZvcm1hdFRpbWVISE1NU1Mobm93KTtcbiAgICBjb25zdCB0aW1lSEhNTSA9IGZvcm1hdFRpbWVISE1NKG5vdyk7XG5cbiAgICBjb25zdCBwdW5jaFJlY29yZDogUHVuY2hSZWNvcmQgPSB7XG4gICAgICBpZDogYHBfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA2KX1gLFxuICAgICAgdXNlcklkLFxuICAgICAgZW1wbG95ZWVOYW1lOiB1c2VyLm5hbWUsXG4gICAgICBlbXBsb3llZUNvZGU6IHVzZXIuZW1wbG95ZWVDb2RlLFxuICAgICAgdHlwZSxcbiAgICAgIHRpbWVzdGFtcDogbm93LnRvSVNPU3RyaW5nKCksXG4gICAgICBkYXRlOiBkYXRlU3RyLFxuICAgICAgdGltZTogdGltZVN0cixcbiAgICAgIG5vdGUsXG4gICAgICBzeW5jZWRUb1NoZWV0czogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMucHVuY2hlcy51bnNoaWZ0KHB1bmNoUmVjb3JkKTtcbiAgICB0aGlzLnNhdmVQdW5jaGVzKCk7XG5cbiAgICAvLyBGaW5kIG9yIGNyZWF0ZSBkYWlseSBhdHRlbmRhbmNlXG4gICAgY29uc3QgYXR0ZW5kYW5jZUlkID0gYCR7dXNlcklkfV8ke2RhdGVTdHIucmVwbGFjZSgvXFwvL2csICctJyl9YDtcbiAgICBsZXQgZGFpbHkgPSB0aGlzLmF0dGVuZGFuY2UuZmluZCgoYSkgPT4gYS5pZCA9PT0gYXR0ZW5kYW5jZUlkKTtcblxuICAgIGlmICghZGFpbHkpIHtcbiAgICAgIGRhaWx5ID0ge1xuICAgICAgICBpZDogYXR0ZW5kYW5jZUlkLFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIGVtcGxveWVlTmFtZTogdXNlci5uYW1lLFxuICAgICAgICBlbXBsb3llZUNvZGU6IHVzZXIuZW1wbG95ZWVDb2RlLFxuICAgICAgICBkYXRlOiBkYXRlU3RyLFxuICAgICAgICBicmVha01pbnV0ZXM6IDAsXG4gICAgICAgIHRvdGFsV29ya01pbnV0ZXM6IDAsXG4gICAgICAgIG92ZXJ0aW1lTWludXRlczogMCxcbiAgICAgICAgc3RhdHVzOiAnbm90X3N0YXJ0ZWQnLFxuICAgICAgICBwdW5jaGVzOiBbXSxcbiAgICAgIH07XG4gICAgICB0aGlzLmF0dGVuZGFuY2UudW5zaGlmdChkYWlseSk7XG4gICAgfVxuXG4gICAgZGFpbHkucHVuY2hlcy5wdXNoKHB1bmNoUmVjb3JkKTtcblxuICAgIC8vIFVwZGF0ZSBzdGF0dXMgYW5kIHRpbWVzIGFjY29yZGluZyB0byBwdW5jaCB0eXBlXG4gICAgaWYgKHR5cGUgPT09ICdjbG9ja19pbicgfHwgdHlwZSA9PT0gJ2RpcmVjdF9pbicpIHtcbiAgICAgIGlmICghZGFpbHkuY2xvY2tJbikgZGFpbHkuY2xvY2tJbiA9IHRpbWVISE1NO1xuICAgICAgZGFpbHkuc3RhdHVzID0gJ3dvcmtpbmcnO1xuICAgICAgaWYgKHR5cGUgPT09ICdkaXJlY3RfaW4nKSBkYWlseS5pc0RpcmVjdEluID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbG9ja19vdXQnIHx8IHR5cGUgPT09ICdkaXJlY3Rfb3V0Jykge1xuICAgICAgZGFpbHkuY2xvY2tPdXQgPSB0aW1lSEhNTTtcbiAgICAgIGRhaWx5LnN0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgaWYgKHR5cGUgPT09ICdkaXJlY3Rfb3V0JykgZGFpbHkuaXNEaXJlY3RPdXQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2JyZWFrJyB8fCB0eXBlID09PSAnYnJlYWtfc3RhcnQnKSB7XG4gICAgICBpZiAoZGFpbHkuc3RhdHVzID09PSAnd29ya2luZycpIHtcbiAgICAgICAgZGFpbHkuc3RhdHVzID0gJ29uX2JyZWFrJztcbiAgICAgIH0gZWxzZSBpZiAoZGFpbHkuc3RhdHVzID09PSAnb25fYnJlYWsnKSB7XG4gICAgICAgIGRhaWx5LnN0YXR1cyA9ICd3b3JraW5nJztcbiAgICAgICAgLy8gQWRkIDYwIG1pbnMgYnJlYWsgb3IgZXN0aW1hdGVcbiAgICAgICAgZGFpbHkuYnJlYWtNaW51dGVzID0gKGRhaWx5LmJyZWFrTWludXRlcyB8fCAwKSArIDYwO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2JyZWFrX2VuZCcpIHtcbiAgICAgIGRhaWx5LnN0YXR1cyA9ICd3b3JraW5nJztcbiAgICB9XG5cbiAgICAvLyBSZWNvbXB1dGUgdG90YWwgd29yayBtaW51dGVzIGlmIGNsb2NrT3V0IGlzIHByZXNlbnRcbiAgICBpZiAoZGFpbHkuY2xvY2tJbiAmJiBkYWlseS5jbG9ja091dCkge1xuICAgICAgY29uc3QgaW5NaW4gPSBwYXJzZVRpbWVUb01pbnV0ZXMoZGFpbHkuY2xvY2tJbik7XG4gICAgICBjb25zdCBvdXRNaW4gPSBwYXJzZVRpbWVUb01pbnV0ZXMoZGFpbHkuY2xvY2tPdXQpO1xuICAgICAgY29uc3QgdG90YWxTcGFuID0gTWF0aC5tYXgoMCwgb3V0TWluIC0gaW5NaW4pO1xuICAgICAgZGFpbHkudG90YWxXb3JrTWludXRlcyA9IE1hdGgubWF4KDAsIHRvdGFsU3BhbiAtIChkYWlseS5icmVha01pbnV0ZXMgfHwgMCkpO1xuICAgICAgZGFpbHkub3ZlcnRpbWVNaW51dGVzID0gTWF0aC5tYXgoMCwgZGFpbHkudG90YWxXb3JrTWludXRlcyAtIHRoaXMuc2V0dGluZ3Muc3RhbmRhcmRXb3JrSG91cnMgKiA2MCk7XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlQXR0ZW5kYW5jZSgpO1xuICAgIHJldHVybiB7IHB1bmNoOiBwdW5jaFJlY29yZCwgYXR0ZW5kYW5jZTogZGFpbHkgfTtcbiAgfVxuXG4gIC8vIC0tLSBBdHRlbmRhbmNlIFJlY29yZCBNYW5hZ2VtZW50ICjnrqHnkIbogIXlgbTjgafjg4fjg7zjgr/jga7kv67mraMpIC0tLVxuICBnZXRBbGxBdHRlbmRhbmNlKCk6IERhaWx5QXR0ZW5kYW5jZVtdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMuYXR0ZW5kYW5jZV0uc29ydCgoYSwgYikgPT4gYi5kYXRlLmxvY2FsZUNvbXBhcmUoYS5kYXRlKSk7XG4gIH1cblxuICBnZXRBbGxQdW5jaGVzKCk6IFB1bmNoUmVjb3JkW10ge1xuICAgIHJldHVybiBbLi4udGhpcy5wdW5jaGVzXS5zb3J0KChhLCBiKSA9PiBiLnRpbWVzdGFtcC5sb2NhbGVDb21wYXJlKGEudGltZXN0YW1wKSk7XG4gIH1cblxuICBnZXRUb2RheUF0dGVuZGFuY2VGb3JVc2VyKHVzZXJJZDogc3RyaW5nKTogRGFpbHlBdHRlbmRhbmNlIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB0b2RheVN0ciA9IGZvcm1hdERhdGUobmV3IERhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXMuYXR0ZW5kYW5jZS5maW5kKChhKSA9PiBhLnVzZXJJZCA9PT0gdXNlcklkICYmIGEuZGF0ZSA9PT0gdG9kYXlTdHIpO1xuICB9XG5cbiAgZ2V0QXR0ZW5kYW5jZUJ5VXNlcih1c2VySWQ6IHN0cmluZyk6IERhaWx5QXR0ZW5kYW5jZVtdIHtcbiAgICByZXR1cm4gdGhpcy5hdHRlbmRhbmNlXG4gICAgICAuZmlsdGVyKChhKSA9PiBhLnVzZXJJZCA9PT0gdXNlcklkKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGIuZGF0ZS5sb2NhbGVDb21wYXJlKGEuZGF0ZSkpO1xuICB9XG5cbiAgdXBkYXRlQXR0ZW5kYW5jZVJlY29yZChcbiAgICBpZDogc3RyaW5nLFxuICAgIHVwZGF0ZXM6IHtcbiAgICAgIGNsb2NrSW4/OiBzdHJpbmc7XG4gICAgICBjbG9ja091dD86IHN0cmluZztcbiAgICAgIGJyZWFrTWludXRlcz86IG51bWJlcjtcbiAgICAgIG5vdGU/OiBzdHJpbmc7XG4gICAgICBzdGF0dXM/OiBXb3JrU3RhdHVzO1xuICAgICAgYWRtaW5OYW1lPzogc3RyaW5nO1xuICAgIH1cbiAgKTogRGFpbHlBdHRlbmRhbmNlIHwgbnVsbCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hdHRlbmRhbmNlLmZpbmRJbmRleCgoYSkgPT4gYS5pZCA9PT0gaWQpO1xuICAgIGlmIChpZHggPT09IC0xKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuYXR0ZW5kYW5jZVtpZHhdO1xuICAgIGlmICh1cGRhdGVzLmNsb2NrSW4gIT09IHVuZGVmaW5lZCkgcmVjb3JkLmNsb2NrSW4gPSB1cGRhdGVzLmNsb2NrSW47XG4gICAgaWYgKHVwZGF0ZXMuY2xvY2tPdXQgIT09IHVuZGVmaW5lZCkgcmVjb3JkLmNsb2NrT3V0ID0gdXBkYXRlcy5jbG9ja091dDtcbiAgICBpZiAodXBkYXRlcy5icmVha01pbnV0ZXMgIT09IHVuZGVmaW5lZCkgcmVjb3JkLmJyZWFrTWludXRlcyA9IHVwZGF0ZXMuYnJlYWtNaW51dGVzO1xuICAgIGlmICh1cGRhdGVzLm5vdGUgIT09IHVuZGVmaW5lZCkgcmVjb3JkLm5vdGUgPSB1cGRhdGVzLm5vdGU7XG4gICAgaWYgKHVwZGF0ZXMuc3RhdHVzICE9PSB1bmRlZmluZWQpIHJlY29yZC5zdGF0dXMgPSB1cGRhdGVzLnN0YXR1cztcblxuICAgIHJlY29yZC5pc01hbnVhbEVkaXQgPSB0cnVlO1xuICAgIHJlY29yZC5lZGl0ZWRCeSA9IHVwZGF0ZXMuYWRtaW5OYW1lIHx8ICfnrqHnkIbogIUnO1xuXG4gICAgLy8gUmVjYWxjdWxhdGUgd29ya2luZyBtaW51dGVzXG4gICAgaWYgKHJlY29yZC5jbG9ja0luICYmIHJlY29yZC5jbG9ja091dCkge1xuICAgICAgY29uc3QgaW5NaW4gPSBwYXJzZVRpbWVUb01pbnV0ZXMocmVjb3JkLmNsb2NrSW4pO1xuICAgICAgY29uc3Qgb3V0TWluID0gcGFyc2VUaW1lVG9NaW51dGVzKHJlY29yZC5jbG9ja091dCk7XG4gICAgICBjb25zdCBzcGFuID0gTWF0aC5tYXgoMCwgb3V0TWluIC0gaW5NaW4pO1xuICAgICAgcmVjb3JkLnRvdGFsV29ya01pbnV0ZXMgPSBNYXRoLm1heCgwLCBzcGFuIC0gKHJlY29yZC5icmVha01pbnV0ZXMgfHwgMCkpO1xuICAgICAgcmVjb3JkLm92ZXJ0aW1lTWludXRlcyA9IE1hdGgubWF4KDAsIHJlY29yZC50b3RhbFdvcmtNaW51dGVzIC0gdGhpcy5zZXR0aW5ncy5zdGFuZGFyZFdvcmtIb3VycyAqIDYwKTtcbiAgICAgIGlmICghdXBkYXRlcy5zdGF0dXMpIHtcbiAgICAgICAgcmVjb3JkLnN0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2F2ZUF0dGVuZGFuY2UoKTtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgYWRkTWFudWFsQXR0ZW5kYW5jZVJlY29yZChkYXRhOiB7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGNsb2NrSW46IHN0cmluZztcbiAgICBjbG9ja091dDogc3RyaW5nO1xuICAgIGJyZWFrTWludXRlczogbnVtYmVyO1xuICAgIG5vdGU/OiBzdHJpbmc7XG4gICAgYWRtaW5OYW1lOiBzdHJpbmc7XG4gIH0pOiBEYWlseUF0dGVuZGFuY2Uge1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXJCeUlkKGRhdGEudXNlcklkKTtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcign44Om44O844K244O844GM6KaL44Gk44GL44KK44G+44Gb44KTJyk7XG5cbiAgICBjb25zdCBpbk1pbiA9IHBhcnNlVGltZVRvTWludXRlcyhkYXRhLmNsb2NrSW4pO1xuICAgIGNvbnN0IG91dE1pbiA9IHBhcnNlVGltZVRvTWludXRlcyhkYXRhLmNsb2NrT3V0KTtcbiAgICBjb25zdCBzcGFuID0gTWF0aC5tYXgoMCwgb3V0TWluIC0gaW5NaW4pO1xuICAgIGNvbnN0IHRvdGFsV29ya01pbnV0ZXMgPSBNYXRoLm1heCgwLCBzcGFuIC0gZGF0YS5icmVha01pbnV0ZXMpO1xuICAgIGNvbnN0IG92ZXJ0aW1lTWludXRlcyA9IE1hdGgubWF4KDAsIHRvdGFsV29ya01pbnV0ZXMgLSB0aGlzLnNldHRpbmdzLnN0YW5kYXJkV29ya0hvdXJzICogNjApO1xuXG4gICAgY29uc3QgaWQgPSBgJHtkYXRhLnVzZXJJZH1fJHtkYXRhLmRhdGUucmVwbGFjZSgvXFwvL2csICctJyl9YDtcbiAgICBjb25zdCBuZXdSZWNvcmQ6IERhaWx5QXR0ZW5kYW5jZSA9IHtcbiAgICAgIGlkLFxuICAgICAgdXNlcklkOiBkYXRhLnVzZXJJZCxcbiAgICAgIGVtcGxveWVlTmFtZTogdXNlci5uYW1lLFxuICAgICAgZW1wbG95ZWVDb2RlOiB1c2VyLmVtcGxveWVlQ29kZSxcbiAgICAgIGRhdGU6IGRhdGEuZGF0ZSxcbiAgICAgIGNsb2NrSW46IGRhdGEuY2xvY2tJbixcbiAgICAgIGNsb2NrT3V0OiBkYXRhLmNsb2NrT3V0LFxuICAgICAgYnJlYWtNaW51dGVzOiBkYXRhLmJyZWFrTWludXRlcyxcbiAgICAgIHRvdGFsV29ya01pbnV0ZXMsXG4gICAgICBvdmVydGltZU1pbnV0ZXMsXG4gICAgICBzdGF0dXM6ICdjb21wbGV0ZWQnLFxuICAgICAgbm90ZTogZGF0YS5ub3RlIHx8ICfnrqHnkIbogIXmiYvli5XnmbvpjLInLFxuICAgICAgaXNNYW51YWxFZGl0OiB0cnVlLFxuICAgICAgZWRpdGVkQnk6IGRhdGEuYWRtaW5OYW1lLFxuICAgICAgcHVuY2hlczogW10sXG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBleGlzdGluZyBpZiBhbnlcbiAgICBjb25zdCBleGlzdGluZ0lkeCA9IHRoaXMuYXR0ZW5kYW5jZS5maW5kSW5kZXgoKGEpID0+IGEuaWQgPT09IGlkKTtcbiAgICBpZiAoZXhpc3RpbmdJZHggIT09IC0xKSB7XG4gICAgICB0aGlzLmF0dGVuZGFuY2VbZXhpc3RpbmdJZHhdID0gbmV3UmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF0dGVuZGFuY2UudW5zaGlmdChuZXdSZWNvcmQpO1xuICAgIH1cblxuICAgIHRoaXMuc2F2ZUF0dGVuZGFuY2UoKTtcbiAgICByZXR1cm4gbmV3UmVjb3JkO1xuICB9XG5cbiAgZGVsZXRlQXR0ZW5kYW5jZVJlY29yZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hdHRlbmRhbmNlLmZpbmRJbmRleCgoYSkgPT4gYS5pZCA9PT0gaWQpO1xuICAgIGlmIChpZHggPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5hdHRlbmRhbmNlLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuc2F2ZUF0dGVuZGFuY2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIC0tLSBTZXR0aW5ncyAmIEdhcyBDb25maWcgLS0tXG4gIGdldFNldHRpbmdzKCk6IFN5c3RlbVNldHRpbmdzIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnNldHRpbmdzIH07XG4gIH1cblxuICB1cGRhdGVTZXR0aW5ncyh1cGRhdGVzOiBQYXJ0aWFsPFN5c3RlbVNldHRpbmdzPik6IFN5c3RlbVNldHRpbmdzIHtcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzLCAuLi51cGRhdGVzIH07XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLlNFVFRJTkdTLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNldHRpbmdzKSk7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3M7XG4gIH1cblxuICBnZXRHYXNDb25maWcoKTogR2FzQ29uZmlnIHtcbiAgICByZXR1cm4geyAuLi50aGlzLmdhc0NvbmZpZyB9O1xuICB9XG5cbiAgdXBkYXRlR2FzQ29uZmlnKHVwZGF0ZXM6IFBhcnRpYWw8R2FzQ29uZmlnPik6IEdhc0NvbmZpZyB7XG4gICAgdGhpcy5nYXNDb25maWcgPSB7IC4uLnRoaXMuZ2FzQ29uZmlnLCAuLi51cGRhdGVzIH07XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkdBU19DT05GSUcsIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2FzQ29uZmlnKSk7XG4gICAgcmV0dXJuIHRoaXMuZ2FzQ29uZmlnO1xuICB9XG5cbiAgLy8gUmVzZXQgdG8gZmFjdG9yeSBzYW1wbGUgZGF0YVxuICByZXNldEFsbERhdGEoKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVlTLlVTRVJTKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX0tFWVMuQVRURU5EQU5DRSk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVlTLlBVTkNIRVMpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfS0VZUy5TRVRUSU5HUyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVlTLkdBU19DT05GSUcpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1VTRVIpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yYWdlID0gbmV3IEF0dGVuZGFuY2VTdG9yYWdlKCk7XG4iXX0=