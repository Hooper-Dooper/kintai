import { storage } from "/src/utils/storage.ts";
/**
* Parses employee CSV and adds them to storage.
* Supported headers: 社員番号, 氏名, 部署, ログインID, パスワード, 簡易PIN, 時給
*/
export function importEmployeesFromCSV(csvText) {
	const lines = csvText.trim().split(/\r?\n/);
	if (lines.length <= 1) {
		return {
			successCount: 0,
			errorCount: 0,
			errors: ["CSVデータが空です"]
		};
	}
	let successCount = 0;
	let errorCount = 0;
	const errors = [];
	// Parse header
	const header = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
	// Find column indices
	const idxCode = header.findIndex((h) => h.includes("社員番号") || h.includes("コード"));
	const idxName = header.findIndex((h) => h.includes("氏名") || h.includes("名前"));
	const idxDept = header.findIndex((h) => h.includes("部署") || h.includes("所属"));
	const idxUser = header.findIndex((h) => h.includes("ログインID") || h.includes("ID") || h.includes("ユーザー"));
	const idxPass = header.findIndex((h) => h.includes("パスワード") || h.includes("pass"));
	const idxPin = header.findIndex((h) => h.includes("PIN") || h.includes("暗証番号"));
	const idxWage = header.findIndex((h) => h.includes("時給") || h.includes("給与"));
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;
		const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
		const name = idxName !== -1 ? cols[idxName] : cols[1] || "";
		if (!name) {
			errorCount++;
			errors.push(`${i + 1}行目: 氏名が未入力です`);
			continue;
		}
		const code = idxCode !== -1 ? cols[idxCode] : cols[0] || `EMP${String(Date.now()).slice(-3)}`;
		const dept = idxDept !== -1 ? cols[idxDept] : cols[2] || "一般";
		const username = idxUser !== -1 ? cols[idxUser] : cols[3] || `user_${Date.now()}_${i}`;
		const password = idxPass !== -1 ? cols[idxPass] : cols[4] || "password123";
		const pin = idxPin !== -1 ? cols[idxPin] : cols[5] || "1234";
		const wage = idxWage !== -1 ? Number(cols[idxWage]) || 1200 : 1200;
		try {
			storage.addEmployee({
				name,
				employeeCode: code,
				department: dept,
				username,
				password,
				pin,
				hourlyWage: wage,
				active: true
			});
			successCount++;
		} catch (err) {
			errorCount++;
			errors.push(`${i + 1}行目: ${err instanceof Error ? err.message : String(err)}`);
		}
	}
	return {
		successCount,
		errorCount,
		errors
	};
}
/**
* Downloads a sample employee CSV template
*/
export function downloadEmployeeCsvTemplate() {
	const BOM = "﻿";
	const header = "社員番号,氏名,部署,ログインID,パスワード,簡易PIN,時給";
	const sampleRows = [
		"EMP010,山田 太郎,営業第一課,yamada,password123,1234,1300",
		"EMP011,佐藤 花子,開発部,sato_h,password123,5678,1400",
		"EMP012,高橋 健治,総務部,takahashi_k,password123,9012,1250"
	];
	const content = BOM + [header, ...sampleRows].join("\r\n");
	const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "従業員登録_サンプルテンプレート.csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

//# sourceMappingURL=data:application/json;base64,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TztBQUM1Qzs7OztBQUtBLE9BQU8sU0FBUyw4QkFBb0M7Q0FDbEQsTUFBTSxNQUFNO0NBQ1osTUFBTSxTQUFTO0NBQ2YsTUFBTSxhQUFhO0VBQ2pCO0VBQ0E7RUFDQTtDQUNGO0NBQ0EsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUMsS0FBSyxNQUFNO0NBQ3pELE1BQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0NBQ3BFLE1BQU0sTUFBTSxJQUFJLGdCQUFnQixJQUFJO0NBQ3BDLE1BQU0sSUFBSSxTQUFTLGNBQWMsR0FBRztDQUNwQyxFQUFFLE9BQU87Q0FDVCxFQUFFLFdBQVc7Q0FDYixTQUFTLEtBQUssWUFBWSxDQUFDO0NBQzNCLEVBQUUsTUFBTTtDQUNSLFNBQVMsS0FBSyxZQUFZLENBQUM7Q0FDM0IsSUFBSSxnQkFBZ0IsR0FBRztBQUN6QiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJjc3ZJbXBvcnRlci50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IFVzZXIsIERhaWx5QXR0ZW5kYW5jZSB9IGZyb20gJy4uL3R5cGVzL2F0dGVuZGFuY2UnO1xuXG4vKipcbiAqIFBhcnNlcyBlbXBsb3llZSBDU1YgYW5kIGFkZHMgdGhlbSB0byBzdG9yYWdlLlxuICogU3VwcG9ydGVkIGhlYWRlcnM6IOekvuWToeeVquWPtywg5rCP5ZCNLCDpg6jnvbIsIOODreOCsOOCpOODs0lELCDjg5Hjgrnjg6/jg7zjg4ksIOewoeaYk1BJTiwg5pmC57WmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRFbXBsb3llZXNGcm9tQ1NWKGNzdlRleHQ6IHN0cmluZyk6IHtcbiAgc3VjY2Vzc0NvdW50OiBudW1iZXI7XG4gIGVycm9yQ291bnQ6IG51bWJlcjtcbiAgZXJyb3JzOiBzdHJpbmdbXTtcbn0ge1xuICBjb25zdCBsaW5lcyA9IGNzdlRleHQudHJpbSgpLnNwbGl0KC9cXHI/XFxuLyk7XG4gIGlmIChsaW5lcy5sZW5ndGggPD0gMSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3NDb3VudDogMCwgZXJyb3JDb3VudDogMCwgZXJyb3JzOiBbJ0NTVuODh+ODvOOCv+OBjOepuuOBp+OBmSddIH07XG4gIH1cblxuICBsZXQgc3VjY2Vzc0NvdW50ID0gMDtcbiAgbGV0IGVycm9yQ291bnQgPSAwO1xuICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XG5cbiAgLy8gUGFyc2UgaGVhZGVyXG4gIGNvbnN0IGhlYWRlciA9IGxpbmVzWzBdLnNwbGl0KCcsJykubWFwKChoKSA9PiBoLnRyaW0oKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKSk7XG5cbiAgLy8gRmluZCBjb2x1bW4gaW5kaWNlc1xuICBjb25zdCBpZHhDb2RlID0gaGVhZGVyLmZpbmRJbmRleCgoaCkgPT4gaC5pbmNsdWRlcygn56S+5ZOh55Wq5Y+3JykgfHwgaC5pbmNsdWRlcygn44Kz44O844OJJykpO1xuICBjb25zdCBpZHhOYW1lID0gaGVhZGVyLmZpbmRJbmRleCgoaCkgPT4gaC5pbmNsdWRlcygn5rCP5ZCNJykgfHwgaC5pbmNsdWRlcygn5ZCN5YmNJykpO1xuICBjb25zdCBpZHhEZXB0ID0gaGVhZGVyLmZpbmRJbmRleCgoaCkgPT4gaC5pbmNsdWRlcygn6YOo572yJykgfHwgaC5pbmNsdWRlcygn5omA5bGeJykpO1xuICBjb25zdCBpZHhVc2VyID0gaGVhZGVyLmZpbmRJbmRleCgoaCkgPT4gaC5pbmNsdWRlcygn44Ot44Kw44Kk44OzSUQnKSB8fCBoLmluY2x1ZGVzKCdJRCcpIHx8IGguaW5jbHVkZXMoJ+ODpuODvOOCtuODvCcpKTtcbiAgY29uc3QgaWR4UGFzcyA9IGhlYWRlci5maW5kSW5kZXgoKGgpID0+IGguaW5jbHVkZXMoJ+ODkeOCueODr+ODvOODiScpIHx8IGguaW5jbHVkZXMoJ3Bhc3MnKSk7XG4gIGNvbnN0IGlkeFBpbiA9IGhlYWRlci5maW5kSW5kZXgoKGgpID0+IGguaW5jbHVkZXMoJ1BJTicpIHx8IGguaW5jbHVkZXMoJ+aal+iovOeVquWPtycpKTtcbiAgY29uc3QgaWR4V2FnZSA9IGhlYWRlci5maW5kSW5kZXgoKGgpID0+IGguaW5jbHVkZXMoJ+aZgue1picpIHx8IGguaW5jbHVkZXMoJ+e1puS4jicpKTtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICBpZiAoIWxpbmUpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgY29scyA9IGxpbmUuc3BsaXQoJywnKS5tYXAoKGMpID0+IGMudHJpbSgpLnJlcGxhY2UoL15cInxcIiQvZywgJycpKTtcbiAgICBjb25zdCBuYW1lID0gaWR4TmFtZSAhPT0gLTEgPyBjb2xzW2lkeE5hbWVdIDogY29sc1sxXSB8fCAnJztcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIGVycm9yQ291bnQrKztcbiAgICAgIGVycm9ycy5wdXNoKGAke2kgKyAxfeihjOebrjog5rCP5ZCN44GM5pyq5YWl5Yqb44Gn44GZYCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlID0gaWR4Q29kZSAhPT0gLTEgPyBjb2xzW2lkeENvZGVdIDogY29sc1swXSB8fCBgRU1QJHtTdHJpbmcoRGF0ZS5ub3coKSkuc2xpY2UoLTMpfWA7XG4gICAgY29uc3QgZGVwdCA9IGlkeERlcHQgIT09IC0xID8gY29sc1tpZHhEZXB0XSA6IGNvbHNbMl0gfHwgJ+S4gOiIrCc7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBpZHhVc2VyICE9PSAtMSA/IGNvbHNbaWR4VXNlcl0gOiBjb2xzWzNdIHx8IGB1c2VyXyR7RGF0ZS5ub3coKX1fJHtpfWA7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBpZHhQYXNzICE9PSAtMSA/IGNvbHNbaWR4UGFzc10gOiBjb2xzWzRdIHx8ICdwYXNzd29yZDEyMyc7XG4gICAgY29uc3QgcGluID0gaWR4UGluICE9PSAtMSA/IGNvbHNbaWR4UGluXSA6IGNvbHNbNV0gfHwgJzEyMzQnO1xuICAgIGNvbnN0IHdhZ2UgPSBpZHhXYWdlICE9PSAtMSA/IE51bWJlcihjb2xzW2lkeFdhZ2VdKSB8fCAxMjAwIDogMTIwMDtcblxuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlLmFkZEVtcGxveWVlKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZW1wbG95ZWVDb2RlOiBjb2RlLFxuICAgICAgICBkZXBhcnRtZW50OiBkZXB0LFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIHBpbixcbiAgICAgICAgaG91cmx5V2FnZTogd2FnZSxcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBzdWNjZXNzQ291bnQrKztcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGVycm9yQ291bnQrKztcbiAgICAgIGVycm9ycy5wdXNoKGAke2kgKyAxfeihjOebrjogJHtlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycil9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgc3VjY2Vzc0NvdW50LCBlcnJvckNvdW50LCBlcnJvcnMgfTtcbn1cblxuLyoqXG4gKiBEb3dubG9hZHMgYSBzYW1wbGUgZW1wbG95ZWUgQ1NWIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEVtcGxveWVlQ3N2VGVtcGxhdGUoKTogdm9pZCB7XG4gIGNvbnN0IEJPTSA9ICdcXHVGRUZGJztcbiAgY29uc3QgaGVhZGVyID0gJ+ekvuWToeeVquWPtyzmsI/lkI0s6YOo572yLOODreOCsOOCpOODs0lELOODkeOCueODr+ODvOODiSznsKHmmJNQSU4s5pmC57WmJztcbiAgY29uc3Qgc2FtcGxlUm93cyA9IFtcbiAgICAnRU1QMDEwLOWxseeUsCDlpKrpg44s5Za25qWt56ys5LiA6KqyLHlhbWFkYSxwYXNzd29yZDEyMywxMjM0LDEzMDAnLFxuICAgICdFTVAwMTEs5L2Q6JekIOiKseWtkCzplovnmbrpg6gsc2F0b19oLHBhc3N3b3JkMTIzLDU2NzgsMTQwMCcsXG4gICAgJ0VNUDAxMizpq5jmqYsg5YGl5rK7LOe3j+WLmemDqCx0YWthaGFzaGlfayxwYXNzd29yZDEyMyw5MDEyLDEyNTAnLFxuICBdO1xuICBjb25zdCBjb250ZW50ID0gQk9NICsgW2hlYWRlciwgLi4uc2FtcGxlUm93c10uam9pbignXFxyXFxuJyk7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0sIHsgdHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTg7JyB9KTtcbiAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICBhLmRvd25sb2FkID0gJ+W+k+alreWToeeZu+mMsl/jgrXjg7Pjg5fjg6vjg4bjg7Pjg5fjg6zjg7zjg4guY3N2JztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgYS5jbGljaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG59XG4iXX0=