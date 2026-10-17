/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Điểm khởi chạy (Entry Point) điều phối toàn bộ ứng dụng (PARIndexApp)
 * UBND phường Hội An Đông - Theo dõi, đánh giá, xếp hạng kết quả CCHC
 */

import {
  ADMIN_PASSWORD,
  DEFAULT_SYSTEM_CONFIG,
  GAS_SCRIPT_TEMPLATE
} from "./config.js";
import { DEFAULT_CRITERIA_DATA } from "./data-cchc-2851.js";
import { CCHCManager } from "./models.js";
import { FirebaseRepository } from "./firebase-service.js";
import { UIManager } from "./ui-manager.js";

function extractDriveFolderId(inputStr = "") {
  const s = String(inputStr || "").trim();
  const match = s.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  return s;
}

export class PARIndexApp {
  constructor() {
    this.systemConfig = { ...DEFAULT_SYSTEM_CONFIG };
    this.manager = new CCHCManager(DEFAULT_CRITERIA_DATA, this.systemConfig.activeYear);
    this.repo = FirebaseRepository.getInstance();
    this.ui = new UIManager(this);
  }

  async init() {
    this.bindEvents();
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // Proceed if fonts fail
      }
    }
    this.ui.renderAll();

    // 1. Lắng nghe trạng thái kết nối Firebase
    this.repo.onConnectionChange((isConnected) => {
      this.ui.updateConnectionIndicator(isConnected);
    });

    // 2. Lắng nghe cấu hình hệ thống (Đa năm & Google Apps Script Drive)
    this.repo.subscribeSystemConfig((cfg) => {
      this.systemConfig = { ...this.systemConfig, ...cfg };
      if (Array.isArray(cfg.availableYears) && cfg.availableYears.length > 0) {
        for (const yr of cfg.availableYears) {
          const numYr = Number(yr);
          if (!this.manager.yearsDataMap.has(numYr)) {
            const cachedYr = this.repo.loadLocalFallback(this.repo.getCriteriaCacheKey(numYr));
            this.manager.setCriteriaList(
              Array.isArray(cachedYr) && cachedYr.length > 0 ? cachedYr : DEFAULT_CRITERIA_DATA,
              numYr
            );
          }
        }
        this.manager.availableYears = [...new Set(cfg.availableYears.map((y) => Number(y)))].sort(
          (a, b) => b - a
        );
      }
      if (cfg.activeYear && Number(cfg.activeYear) !== this.manager.activeYear) {
        this.manager.switchYear(Number(cfg.activeYear), DEFAULT_CRITERIA_DATA);
      }
      this.ui.renderAll();
    });

    // 3. Đăng ký lắng nghe dữ liệu tiêu chí thời gian thực từ Cloud Firestore
    this.repo.subscribeCriteria((docs) => {
      // Nhóm tài liệu theo năm để cập nhật đầy đủ vào yearsDataMap
      const docsByYear = {};
      for (const d of docs) {
        const yr = Number(d.year || 2026);
        if (!docsByYear[yr]) docsByYear[yr] = [];
        docsByYear[yr].push(d);
      }

      for (const [yrStr, yrDocs] of Object.entries(docsByYear)) {
        const yr = Number(yrStr);
        if (!this.manager.yearsDataMap.has(yr)) {
          this.manager.setCriteriaList(DEFAULT_CRITERIA_DATA, yr);
        }
        const prevActive = this.manager.activeYear;
        this.manager.activeYear = yr;
        this.manager.criteriaMap = this.manager.yearsDataMap.get(yr);
        for (const d of yrDocs) {
          this.manager.updateCriterionFromSnapshot(d);
        }
        this.manager.activeYear = prevActive;
        this.manager.criteriaMap = this.manager.yearsDataMap.get(prevActive);
      }

      this.ui.renderAll();
    });

    // 4. Tự động khởi tạo hoặc làm sạch dữ liệu giả lập cũ trên Cloud Firestore
    try {
      const resetDone = await this.repo.seedInitialDataIfEmpty(this.manager, false);
      if (resetDone) {
        this.ui.renderAll();
      }
    } catch {
      // Đã có fallback LocalStorage và xử lý lỗi trong FirebaseRepository
    }
  }

  bindEvents() {
    // 1. Điều hướng 5 phân hệ chính trên Top Bar & Mobile Bar
    const navTabs = ["dashboard", "scoring", "units", "reports", "settings"];
    for (const tabId of navTabs) {
      document.getElementById(`nav-tab-${tabId}`)?.addEventListener("click", (e) => {
        e.preventDefault();
        this.ui.switchTab(tabId);
      });
    }
    document.getElementById("brand-home-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.switchTab("dashboard");
    });
    document.querySelectorAll("[data-mobile-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-mobile-tab");
        if (tabId) this.ui.switchTab(tabId);
      });
    });

    // 2. Chọn Năm chấm điểm trên thanh Hero Banner
    document.getElementById("header-year-select")?.addEventListener("change", async (e) => {
      const targetYear = Number(e.target.value);
      if (targetYear) {
        await this.handleSwitchYear(targetYear);
      }
    });

    // 3. Nút CTA chính trên Top Bar: Xuất Báo cáo & In Biểu mẫu
    document.getElementById("btn-top-export")?.addEventListener("click", () => {
      this.ui.switchTab("reports");
    });

    // 4. Bộ lọc đa chiều tại Bảng Chấm điểm & Minh chứng
    document.getElementById("filter-domain")?.addEventListener("change", (e) => {
      this.ui.filters.domainId = e.target.value;
      this.ui.renderScoringTableView();
    });

    document.getElementById("filter-dept")?.addEventListener("change", (e) => {
      this.ui.filters.dept = e.target.value;
      this.ui.renderScoringTableView();
    });

    document.getElementById("filter-status")?.addEventListener("change", (e) => {
      this.ui.filters.status = e.target.value;
      this.ui.renderScoringTableView();
    });

    document.getElementById("filter-search")?.addEventListener("input", (e) => {
      this.ui.filters.search = e.target.value;
      this.ui.renderScoringTableView();
    });

    document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
      this.ui.resetFilters();
    });

    // 5. Sự kiện trong Modal Chấm điểm & Hồ sơ kiểm chứng
    document.getElementById("btn-close-modal")?.addEventListener("click", () => {
      this.ui.closeCriterionModal();
    });

    document.getElementById("btn-cancel-modal")?.addEventListener("click", () => {
      this.ui.closeCriterionModal();
    });

    document.getElementById("btn-add-evidence")?.addEventListener("click", () => {
      this.ui.handleAddEvidenceFromForm();
    });

    document.getElementById("btn-upload-ev-drive")?.addEventListener("click", async () => {
      await this.handleUploadEvidenceFileToDrive();
    });

    document.getElementById("btn-save-criterion")?.addEventListener("click", async () => {
      await this.handleSaveCriterionModal();
    });

    // 6. Các nút tác vụ Xuất báo cáo & Đặt lại Bảng điểm
    document.getElementById("btn-export-csv")?.addEventListener("click", () => {
      this.ui.exportToExcelCSV();
    });

    document.getElementById("btn-export-csv-report")?.addEventListener("click", () => {
      this.ui.exportToExcelCSV();
    });

    document.getElementById("btn-print-report")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("btn-seed-reset")?.addEventListener("click", async () => {
      await this.handleResetDefaultData();
    });

    document.getElementById("btn-seed-reset-settings")?.addEventListener("click", async () => {
      await this.handleResetDefaultData();
    });

    // 7. Sự kiện Cài đặt Hệ thống (Đăng nhập mật khẩu tsvmmm)
    document.getElementById("btn-unlock-settings")?.addEventListener("click", () => {
      this.handleUnlockSettings();
    });

    document.getElementById("input-admin-password")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.handleUnlockSettings();
      }
    });

    document.getElementById("btn-lock-settings")?.addEventListener("click", () => {
      this.ui.setAdminUnlockState(false);
      const pwdInp = document.getElementById("input-admin-password");
      if (pwdInp) pwdInp.value = "";
      this.ui.renderSettingsView();
      this.ui.showToast("Đã khóa Trung tâm Cài đặt Hệ thống.");
    });

    // 8. Sự kiện Tạo mới Năm chấm điểm
    document.getElementById("btn-create-year")?.addEventListener("click", async () => {
      await this.handleCreateNewYear();
    });

    // 9. Sự kiện Sao lưu & Khôi phục dữ liệu (Backup & Restore)
    document.getElementById("btn-export-backup-json")?.addEventListener("click", () => {
      this.handleExportBackupJSON();
    });

    document.getElementById("btn-restore-backup")?.addEventListener("click", async () => {
      await this.handleRestoreBackupJSON();
    });

    // 10. Sự kiện Cấu hình Google Drive & Google Apps Script
    document.getElementById("btn-copy-gas-code")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(GAS_SCRIPT_TEMPLATE);
        this.ui.showToast("Đã sao chép mã nguồn Google Apps Script (Code.gs) vào bộ nhớ tạm!");
      } catch {
        this.ui.showToast("Vui lòng mở mục Xem hướng dẫn bên dưới để sao chép mã Code.gs.", "warning");
      }
    });

    document.getElementById("btn-save-drive-config")?.addEventListener("click", async () => {
      await this.handleSaveDriveConfig();
    });

    document.getElementById("btn-test-gas-config")?.addEventListener("click", async () => {
      await this.handleTestGasConnection();
    });

    // 11. Sự kiện Quản trị Bộ tiêu chí (Thêm / Chỉnh sửa / Xóa tiêu chí)
    document.getElementById("settings-crit-domain-filter")?.addEventListener("change", (e) => {
      this.ui.settingsCritFilter.domainId = e.target.value;
      this.ui.renderSettingsCriteriaTable();
    });

    document.getElementById("settings-crit-search")?.addEventListener("input", (e) => {
      this.ui.settingsCritFilter.search = e.target.value;
      this.ui.renderSettingsCriteriaTable();
    });

    document.getElementById("btn-open-add-criterion")?.addEventListener("click", () => {
      this.ui.openCriterionCrudModal(null);
    });

    document.getElementById("btn-close-crud-modal")?.addEventListener("click", () => {
      this.ui.closeCriterionCrudModal();
    });

    document.getElementById("btn-cancel-crud-modal")?.addEventListener("click", () => {
      this.ui.closeCriterionCrudModal();
    });

    document.getElementById("btn-save-crud-criterion")?.addEventListener("click", async () => {
      await this.handleSaveCriterionDefinition();
    });
  }

  handleUnlockSettings() {
    const pwdInp = document.getElementById("input-admin-password");
    const errEl = document.getElementById("settings-auth-error");
    const entered = pwdInp?.value.trim() || "";

    if (entered !== ADMIN_PASSWORD) {
      if (errEl) {
        errEl.textContent = "Mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    if (errEl) errEl.classList.add("hidden");
    if (pwdInp) pwdInp.value = "";
    this.ui.setAdminUnlockState(true);
    this.ui.renderSettingsView();
    this.ui.showToast("Đăng nhập thành công! Đã mở khóa Trung tâm Cài đặt Hệ thống.");
  }

  async handleSwitchYear(targetYear) {
    const yr = Number(targetYear);
    if (!yr) return;

    if (!this.manager.yearsDataMap.has(yr)) {
      const cached = this.repo.loadLocalFallback(this.repo.getCriteriaCacheKey(yr));
      this.manager.setCriteriaList(
        Array.isArray(cached) && cached.length > 0 ? cached : DEFAULT_CRITERIA_DATA,
        yr
      );
    }

    this.manager.switchYear(yr, DEFAULT_CRITERIA_DATA);
    this.systemConfig.activeYear = yr;
    this.systemConfig.availableYears = [...this.manager.availableYears];

    try {
      await this.repo.saveSystemConfig(this.systemConfig);
    } catch {
      // Đã lưu LocalStorage trong saveSystemConfig
    }

    this.ui.renderAll();
    this.ui.showToast(`Đã chuyển sang Bảng chấm điểm CCHC Năm ${yr}!`);
  }

  async handleCreateNewYear() {
    const newYearInp = document.getElementById("input-new-year");
    const modeSel = document.getElementById("select-new-year-mode");
    const targetYear = Number(newYearInp?.value || 0);
    const cloneFromCurrent = modeSel?.value === "clone";

    if (!targetYear || targetYear < 2020 || targetYear > 2050) {
      this.ui.showToast("Vui lòng nhập Năm chấm điểm hợp lệ (từ 2020 đến 2050)!", "error");
      return;
    }

    const btn = document.getElementById("btn-create-year");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Đang khởi tạo năm mới...";
    }

    try {
      const newCriteriaList = this.manager.createNewYear(
        targetYear,
        cloneFromCurrent,
        DEFAULT_CRITERIA_DATA
      );
      this.systemConfig.activeYear = targetYear;
      this.systemConfig.availableYears = [...this.manager.availableYears];

      await this.repo.saveYearCriteriaBatch(
        newCriteriaList,
        targetYear,
        this.manager.getOverallMetrics(),
        "Quản trị hệ thống"
      );
      await this.repo.saveSystemConfig(this.systemConfig);

      this.ui.renderAll();
      this.ui.showToast(
        `Đã khởi tạo và chuyển sang Năm chấm điểm ${targetYear} (${newCriteriaList.length} tiêu chí, 0 điểm)!`
      );
    } catch (err) {
      this.ui.renderAll();
      this.ui.showToast(
        err instanceof Error ? err.message : `Đã khởi tạo Năm ${targetYear} trên bộ nhớ cục bộ.`,
        "warning"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "+ Tạo mới & Chuyển sang Năm chấm điểm này";
      }
    }
  }

  async handleDeleteYear(yearToDelete) {
    const yr = Number(yearToDelete);
    if (this.manager.availableYears.length <= 1) {
      this.ui.showToast("Hệ thống phải giữ lại tối thiểu 01 năm chấm điểm!", "error");
      return;
    }

    const criteriaOfYear = Array.from((this.manager.yearsDataMap.get(yr) || new Map()).values());
    try {
      this.manager.deleteYear(yr);
      this.systemConfig.activeYear = this.manager.activeYear;
      this.systemConfig.availableYears = [...this.manager.availableYears];

      await this.repo.deleteYearCriteriaBatch(criteriaOfYear, yr);
      await this.repo.saveSystemConfig(this.systemConfig);
      this.ui.renderAll();
      this.ui.showToast(`Đã xóa dữ liệu Năm ${yr}. Năm hiện hành là Năm ${this.manager.activeYear}.`);
    } catch {
      this.ui.renderAll();
      this.ui.showToast(`Đã xóa Năm ${yr} khỏi bộ nhớ phiên làm việc.`, "warning");
    }
  }

  handleExportBackupJSON() {
    const backupPayload = this.manager.exportFullBackup(this.systemConfig);
    const jsonStr = JSON.stringify(backupPayload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `Sao_Luu_CCHC_Phuong_Hoi_An_Dong_${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.ui.showToast("Đã tải xuống tệp Sao lưu toàn bộ dữ liệu hệ thống (.JSON)!");
  }

  async handleRestoreBackupJSON() {
    const fileInp = document.getElementById("input-restore-backup-file");
    const file = fileInp?.files?.[0];
    if (!file) {
      this.ui.showToast("Vui lòng chọn tệp sao lưu (.JSON) từ máy tính trước khi khôi phục!", "error");
      return;
    }

    const btn = document.getElementById("btn-restore-backup");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Đang khôi phục...";
    }

    try {
      const rawText = await file.text();
      const parsed = JSON.parse(rawText);
      const restoredInfo = this.manager.importFullBackup(parsed);

      if (restoredInfo.systemConfig && typeof restoredInfo.systemConfig === "object") {
        this.systemConfig = {
          ...this.systemConfig,
          ...restoredInfo.systemConfig,
          activeYear: restoredInfo.activeYear,
          availableYears: restoredInfo.availableYears
        };
      } else {
        this.systemConfig.activeYear = restoredInfo.activeYear;
        this.systemConfig.availableYears = restoredInfo.availableYears;
      }

      // Đồng bộ toàn bộ các năm lên Cloud Firestore & LocalStorage
      for (const yr of restoredInfo.availableYears) {
        const listForYr = Array.from((this.manager.yearsDataMap.get(Number(yr)) || new Map()).values());
        await this.repo.saveYearCriteriaBatch(
          listForYr,
          yr,
          yr === this.manager.activeYear ? this.manager.getOverallMetrics() : null,
          "Khôi phục từ tệp sao lưu"
        );
      }
      await this.repo.saveSystemConfig(this.systemConfig);

      if (fileInp) fileInp.value = "";
      this.ui.renderAll();
      this.ui.showToast(
        `Đã khôi phục thành công dữ liệu (${restoredInfo.availableYears.length} năm chấm điểm)!`
      );
    } catch (err) {
      this.ui.renderAll();
      this.ui.showToast(
        err instanceof Error ? err.message : "Tệp sao lưu không hợp lệ hoặc lỗi đồng bộ!",
        "error"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Khôi phục từ tệp đã chọn";
      }
    }
  }

  async handleSaveDriveConfig() {
    const gasInput = document.getElementById("input-gas-webapp-url");
    const folderIdInput = document.getElementById("input-drive-folder-id");
    const folderUrlInput = document.getElementById("input-drive-folder-url");

    const gasWebAppUrl = gasInput?.value.trim() || "";
    const rawFolderId = folderIdInput?.value.trim() || "";
    const driveFolderId = extractDriveFolderId(rawFolderId);
    const driveFolderUrl =
      folderUrlInput?.value.trim() ||
      (driveFolderId ? `https://drive.google.com/drive/folders/${driveFolderId}` : "");

    if (folderIdInput && driveFolderId) {
      folderIdInput.value = driveFolderId;
    }
    if (folderUrlInput && driveFolderUrl) {
      folderUrlInput.value = driveFolderUrl;
    }

    this.systemConfig = {
      ...this.systemConfig,
      activeYear: this.manager.activeYear,
      availableYears: [...this.manager.availableYears],
      gasWebAppUrl,
      driveFolderId,
      driveFolderUrl
    };

    try {
      await this.repo.saveSystemConfig(this.systemConfig);
      this.ui.showToast("Đã lưu thông số cấu hình Google Drive & Google Apps Script!");
    } catch {
      this.ui.showToast("Đã lưu cấu hình Google Drive vào bộ nhớ đệm cục bộ!", "warning");
    }
  }

  async handleTestGasConnection() {
    const gasInput = document.getElementById("input-gas-webapp-url");
    const url = gasInput?.value.trim() || this.systemConfig.gasWebAppUrl || "";
    if (!url) {
      this.ui.showToast("Vui lòng nhập URL Web App Google Apps Script (/exec) trước khi kiểm tra!", "error");
      return;
    }
    if (!url.startsWith("https://script.google.com/")) {
      this.ui.showToast(
        "URL phải bắt đầu bằng https://script.google.com/macros/s/.../exec",
        "warning"
      );
      return;
    }

    const btn = document.getElementById("btn-test-gas-config");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Đang kiểm tra...";
    }

    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        this.ui.showToast("Kết nối Google Apps Script thành công! Sẵn sàng tải file lên Google Drive.");
      } else {
        this.ui.showToast(`Apps Script phản hồi mã HTTP ${res.status}. Vui lòng kiểm tra quyền 'Anyone'.`, "warning");
      }
    } catch {
      this.ui.showToast(
        "Đã ghi nhận URL Apps Script. Hãy đảm bảo bạn đã chọn quyền 'Bất kỳ ai (Anyone)' khi triển khai.",
        "warning"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Kiểm tra kết nối";
      }
    }
  }

  async handleUploadEvidenceFileToDrive() {
    const fileInp = document.getElementById("input-ev-file-upload");
    const errEl = document.getElementById("new-ev-error");
    const file = fileInp?.files?.[0];

    if (!file) {
      if (errEl) {
        errEl.textContent = "Vui lòng bấm chọn tệp minh chứng từ máy tính trước khi tải lên Google Drive!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    if (!this.systemConfig.gasWebAppUrl) {
      if (errEl) {
        errEl.textContent =
          "Chưa cấu hình URL Web App Google Apps Script. Vui lòng vào mục 'Cài đặt hệ thống' (Mật khẩu: tsvmmm) để cài đặt thông số Google Drive!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    if (errEl) errEl.classList.add("hidden");
    const btn = document.getElementById("btn-upload-ev-drive");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Đang tải lên Drive...";
    }

    try {
      const critCode = this.ui.editingCriterion?.code || "CCHC";
      const uploaded = await this.repo.uploadFileToDriveViaGAS(
        file,
        critCode,
        this.manager.activeYear,
        this.systemConfig
      );

      const urlEl = document.getElementById("new-ev-url");
      const sumEl = document.getElementById("new-ev-summary");
      const docNumEl = document.getElementById("new-ev-docnum");

      if (urlEl) urlEl.value = uploaded.fileUrl;
      if (sumEl && !sumEl.value.trim()) {
        sumEl.value = `Tệp minh chứng đính kèm: ${file.name}`;
      }
      if (docNumEl && !docNumEl.value.trim()) {
        docNumEl.value = `MC-${critCode}`;
      }
      if (fileInp) fileInp.value = "";

      this.ui.showToast(`Đã tải tệp "${file.name}" lên Google Drive thành công!`);
    } catch (err) {
      if (errEl) {
        errEl.textContent = err instanceof Error ? err.message : "Lỗi khi tải tệp lên Google Drive.";
        errEl.classList.remove("hidden");
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Tải lên Drive (GAS)";
      }
    }
  }

  async handleSaveCriterionDefinition() {
    const origId = document.getElementById("crud-crit-original-id")?.value.trim() || "";
    const code = document.getElementById("crud-crit-code")?.value.trim() || "";
    const domainId = document.getElementById("crud-crit-domain")?.value || "I";
    const subGroup = document.getElementById("crud-crit-subgroup")?.value || "standard";
    const maxScore = Number(document.getElementById("crud-crit-maxscore")?.value || 0);
    const type = document.getElementById("crud-crit-type")?.value || "boolean";
    const deadline =
      document.getElementById("crud-crit-deadline")?.value.trim() ||
      `Năm ${this.manager.activeYear}`;
    const groupTitle =
      document.getElementById("crud-crit-grouptitle")?.value.trim() || "Nhóm tiêu chí đánh giá";
    const assignedDept =
      document.getElementById("crud-crit-dept")?.value || "Phòng Văn hóa – Xã hội phường";
    const title = document.getElementById("crud-crit-title")?.value.trim() || "";
    const regulationText =
      document.getElementById("crud-crit-regulation")?.value.trim() ||
      "Đạt 100% yêu cầu theo quy định được tính điểm tối đa.";
    const warningNote = document.getElementById("crud-crit-warning")?.value.trim() || "";
    const errEl = document.getElementById("crud-crit-error");

    if (!code || !title) {
      if (errEl) {
        errEl.textContent = "Vui lòng nhập đầy đủ Mã tiêu chí và Tên/Nội dung chi tiết của tiêu chí!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    if (errEl) errEl.classList.add("hidden");
    const targetId = origId || code.replace(/[^a-zA-Z0-9_.\-]/g, "_");

    const saveBtn = document.getElementById("btn-save-crud-criterion");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Đang lưu...";
    }

    try {
      const updatedInstance = this.manager.upsertCriterionDefinition({
        id: targetId,
        code,
        domainId,
        subGroup,
        maxScore,
        type,
        deadline,
        groupTitle,
        assignedDept,
        title,
        regulationText,
        warningNote
      });

      await this.repo.saveCriterion(
        updatedInstance,
        this.manager.getOverallMetrics(),
        "Quản trị hệ thống"
      );

      this.ui.closeCriterionCrudModal();
      this.ui.renderAll();
      this.ui.showToast(
        origId
          ? `Đã cập nhật cấu hình Tiêu chí ${updatedInstance.code}!`
          : `Đã thêm mới Tiêu chí ${updatedInstance.code} vào Năm ${this.manager.activeYear}!`
      );
    } catch {
      this.ui.closeCriterionCrudModal();
      this.ui.renderAll();
      this.ui.showToast(`Đã lưu Tiêu chí ${code} vào bộ nhớ cục bộ!`, "warning");
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Lưu Tiêu chí";
      }
    }
  }

  async handleDeleteCriterionDefinition(criterionId) {
    const removed = this.manager.deleteCriterionById(criterionId);
    if (!removed) return;

    try {
      await this.repo.deleteCriterion(removed, this.manager.getOverallMetrics(), "Quản trị hệ thống");
      this.ui.renderAll();
      this.ui.showToast(`Đã xóa Tiêu chí ${removed.code} khỏi Năm ${this.manager.activeYear}!`);
    } catch {
      this.ui.renderAll();
      this.ui.showToast(`Đã xóa Tiêu chí ${removed.code} khỏi bộ nhớ cục bộ!`, "warning");
    }
  }

  async handleSaveCriterionModal() {
    const crit = this.ui.editingCriterion;
    if (!crit) return;

    const deptSel = document.getElementById("modal-assigned-dept");
    const statusSel = document.getElementById("modal-status");
    const notesArea = document.getElementById("modal-notes");

    if (deptSel) crit.assignedDept = deptSel.value;
    if (statusSel) crit.status = statusSel.value;
    if (notesArea) crit.notes = notesArea.value.trim();

    if (crit.type === "formula") {
      document.querySelectorAll("[data-formula-field]").forEach((inp) => {
        const fieldName = inp.getAttribute("data-formula-field");
        if (fieldName) {
          this.ui.tempInputs[fieldName] = Number(inp.value || 0);
        }
      });
    } else if (crit.type === "boolean") {
      const chk = document.getElementById("modal-input-boolean");
      if (chk) {
        this.ui.tempInputs.achieved = Boolean(chk.checked);
      }
    } else if (crit.type === "penalty") {
      const chk = document.getElementById("modal-input-penalty");
      if (chk) {
        this.ui.tempInputs.violated = Boolean(chk.checked);
      }
    }

    crit.calculateScore(this.ui.tempInputs);
    crit.verifiedScore = crit.selfScore;
    crit.evidences = [...this.ui.tempEvidences];

    if (crit.subGroup !== "penalty") {
      if (crit.selfScore >= crit.maxScore && crit.validateEvidence()) {
        crit.status = "completed";
      } else if (crit.status === "pending") {
        crit.status = "in_progress";
      }
    }

    const saveBtn = document.getElementById("btn-save-criterion");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Đang lưu...";
    }

    try {
      const metrics = this.manager.getOverallMetrics();
      await this.repo.saveCriterion(crit, metrics, crit.assignedDept);
      this.ui.closeCriterionModal();
      this.ui.renderAll();
      this.ui.showToast(
        `Đã lưu điểm tự chấm (${crit.selfScore.toFixed(2)}đ) và ${
          crit.evidences.length
        } minh chứng cho Tiêu chí ${crit.code}!`
      );
    } catch {
      this.ui.closeCriterionModal();
      this.ui.renderAll();
      this.ui.showToast(
        `Đã lưu Tiêu chí ${crit.code} vào bộ nhớ đệm (Local Cache).`,
        "warning"
      );
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Lưu điểm & Minh chứng";
      }
    }
  }

  async handleResetDefaultData() {
    const activeYear = this.manager.activeYear;
    const btn = document.getElementById("btn-seed-reset");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Đang đặt lại...";
    }
    try {
      this.manager.setCriteriaList(DEFAULT_CRITERIA_DATA, activeYear);
      await this.repo.seedInitialDataIfEmpty(this.manager, true);
      this.ui.renderAll();
      this.ui.showToast(
        `Đã đặt lại toàn bộ Bảng chấm điểm Năm ${activeYear} về trạng thái ban đầu (0 điểm, không có dữ liệu giả lập)!`
      );
    } catch {
      this.ui.renderAll();
      this.ui.showToast(`Đã đặt lại bộ tiêu chí chuẩn QĐ 2851/QĐ-UBND Năm ${activeYear} về 0 điểm!`, "warning");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Đặt lại Bảng điểm (0đ)";
      }
    }
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const app = new PARIndexApp();
    window.cchcApp = app;
    app.init();
  });
}
