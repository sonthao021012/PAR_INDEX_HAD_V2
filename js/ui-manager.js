/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lớp điều khiển DOM, Biểu đồ trực quan (Chart.js), Hộp thoại Chấm điểm & Minh chứng,
 * Quản trị Cài đặt Hệ thống (Đa năm, Thêm/Sửa/Xóa tiêu chí, Sao lưu/Khôi phục, Google Apps Script Drive)
 * và Cơ chế xuất Báo cáo hành chính (CSV/Excel, Báo cáo tổng hợp, Biểu mẫu In A4)
 */

import Chart from "chart.js/auto";
import {
  DEPARTMENTS,
  DOMAINS_META,
  KEY_MILESTONES_2851,
  GAS_SCRIPT_TEMPLATE,
  LOCAL_STORAGE_KEYS
} from "./config.js";
import { EvidenceItem } from "./models.js";

export class UIManager {
  constructor(appController) {
    this.app = appController;
    this.radarChart = null;
    this.deptBarChart = null;
    this.domainProgressChart = null;
    this.activeTab = "dashboard"; // 'dashboard' | 'scoring' | 'units' | 'reports' | 'settings'
    this.filters = {
      domainId: "ALL",
      dept: "ALL",
      status: "ALL",
      search: ""
    };
    this.settingsCritFilter = {
      domainId: "ALL",
      search: ""
    };
    this.editingCriterion = null;
    this.tempInputs = {};
    this.tempEvidences = [];
    this.isAdminUnlocked = this.loadAdminUnlockState();
  }

  loadAdminUnlockState() {
    try {
      return sessionStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_UNLOCKED) === "true";
    } catch {
      return false;
    }
  }

  setAdminUnlockState(unlocked) {
    this.isAdminUnlocked = Boolean(unlocked);
    try {
      if (this.isAdminUnlocked) {
        sessionStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_UNLOCKED, "true");
      } else {
        sessionStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_UNLOCKED);
      }
    } catch {
      // Ignore storage error
    }
  }

  escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  formatNum(val, decimals = 2) {
    return Number(val || 0).toLocaleString("vi-VN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const bgClass =
      type === "error"
        ? "bg-rose-900 text-white border-rose-700"
        : type === "warning"
        ? "bg-amber-900 text-white border-amber-700"
        : "bg-slate-900 text-white border-slate-700";

    const toast = document.createElement("div");
    toast.className = `px-4 py-3 rounded-xl border shadow-xl text-sm font-medium flex items-center justify-between gap-3 transition-opacity duration-200 ${bgClass}`;
    toast.innerHTML = `
      <span>${this.escapeHtml(message)}</span>
      <button type="button" aria-label="Đóng thông báo" class="text-xs opacity-80 hover:opacity-100 px-2 py-0.5 font-semibold cursor-pointer">Đóng</button>
    `;

    toast.querySelector("button")?.addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4500);
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    const tabs = ["dashboard", "scoring", "units", "reports", "settings"];
    for (const t of tabs) {
      const section = document.getElementById(`view-${t}`);
      const navBtn = document.getElementById(`nav-tab-${t}`);
      if (section) {
        section.classList.toggle("hidden", t !== tabId);
      }
      if (navBtn) {
        if (t === tabId) {
          navBtn.className =
            "btn-tactile-nav-active px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 cursor-pointer";
        } else {
          navBtn.className =
            "btn-tactile-nav px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 cursor-pointer";
        }
      }
    }

    document.querySelectorAll("[data-mobile-tab]").forEach((btn) => {
      const mTab = btn.getAttribute("data-mobile-tab");
      if (mTab === tabId) {
        btn.className =
          "px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 rounded-lg whitespace-nowrap cursor-pointer";
      } else {
        btn.className =
          "px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg whitespace-nowrap cursor-pointer";
      }
    });

    this.renderAll();
  }

  updateConnectionIndicator(isConnected) {
    const statusText = document.getElementById("firebase-sync-label");
    const badge = document.getElementById("firebase-sync-badge");
    const icon = document.getElementById("firebase-sync-icon");
    const dot = document.getElementById("firebase-sync-dot");

    if (statusText) {
      statusText.textContent = isConnected
        ? "Đồng bộ trực tuyến"
        : "Lưu trữ ngoại tuyến";
    }
    if (badge) {
      badge.className = isConnected
        ? "flex items-center gap-2 bg-slate-800/90 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-300"
        : "flex items-center gap-2 bg-slate-800/90 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-semibold text-amber-300";
    }
    if (icon) {
      icon.className = isConnected
        ? "w-4 h-4 text-emerald-400 shrink-0"
        : "w-4 h-4 text-amber-400 shrink-0";
    }
    if (dot) {
      dot.className = isConnected
        ? "w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"
        : "w-2 h-2 rounded-full bg-amber-400 shrink-0";
    }
  }

  renderYearSelector() {
    const activeYear = this.app.manager.activeYear;
    const availableYears = this.app.manager.availableYears;

    const heroLabel = document.getElementById("hero-active-year-label");
    if (heroLabel) {
      heroLabel.textContent = `Năm ${activeYear}`;
    }

    const selectEl = document.getElementById("header-year-select");
    if (selectEl) {
      selectEl.innerHTML = availableYears
        .map(
          (yr) =>
            `<option value="${yr}" class="text-slate-900" ${
              Number(yr) === Number(activeYear) ? "selected" : ""
            }>Năm ${yr}</option>`
        )
        .join("");
    }
  }

  renderAll() {
    this.renderYearSelector();
    this.renderKPIHeader();
    if (this.activeTab === "dashboard") {
      this.renderDashboardView();
    } else if (this.activeTab === "scoring") {
      this.renderScoringTableView();
    } else if (this.activeTab === "units") {
      this.renderUnitsView();
    } else if (this.activeTab === "reports") {
      this.renderReportsView();
    } else if (this.activeTab === "settings") {
      this.renderSettingsView();
    }
  }

  /**
   * 1. Render 4 Thẻ KPI Tổng quan Nổi khối
   */
  renderKPIHeader() {
    const m = this.app.manager.getOverallMetrics();

    const elBaseScore = document.getElementById("kpi-base-score");
    const elBaseSub = document.getElementById("kpi-base-sub");
    const elBonusScore = document.getElementById("kpi-bonus-score");
    const elPenaltyScore = document.getElementById("kpi-penalty-score");
    const elFinalScore = document.getElementById("kpi-final-score");
    const elFinalGrade = document.getElementById("kpi-final-grade");
    const elEvidenceRate = document.getElementById("kpi-evidence-rate");
    const elEvidenceSub = document.getElementById("kpi-evidence-sub");

    if (elBaseScore) {
      elBaseScore.textContent = `${this.formatNum(m.totalSelfScore)} / ${this.formatNum(
        m.baseMaxScore
      )}`;
    }
    if (elBaseSub) {
      elBaseSub.textContent = `Đã chấm ${m.evaluatedCount}/${m.totalStandardCriteria} tiêu chí · Đạt tối đa ${m.completedCount} tiêu chí`;
    }
    if (elBonusScore) elBonusScore.textContent = `+${this.formatNum(m.bonusScore)}đ`;
    if (elPenaltyScore) {
      elPenaltyScore.textContent = `-${this.formatNum(m.penaltyScore)}đ`;
      elPenaltyScore.className =
        m.penaltyScore > 0
          ? "text-xl font-extrabold font-mono tabular-nums text-rose-700"
          : "text-xl font-extrabold font-mono tabular-nums text-emerald-700";
    }
    if (elFinalScore) elFinalScore.textContent = this.formatNum(m.finalScore);
    if (elFinalGrade) {
      elFinalGrade.textContent =
        m.evaluatedCount === 0
          ? "Chưa xếp loại · Bắt đầu chấm điểm để tính kết quả"
          : `Xếp loại dự kiến: ${m.rankingInfo.grade} · ${m.rankingInfo.description}`;
      elFinalGrade.className =
        m.evaluatedCount === 0
          ? "text-xs text-slate-600 font-semibold mt-1.5"
          : "text-xs text-emerald-800 font-bold mt-1.5";
    }
    if (elEvidenceRate) elEvidenceRate.textContent = `${m.evidenceRate}%`;
    if (elEvidenceSub) {
      elEvidenceSub.textContent = `${m.validEvidenceCount}/${m.totalActiveEvidenceCriteria} tiêu chí đã đính kèm văn bản kiểm chứng`;
    }
  }

  /**
   * 2. Render Dashboard Tổng quan: Biểu đồ + Thẻ Nổi khối 9 lĩnh vực + Bảng Cảnh báo rủi ro
   */
  renderDashboardView() {
    this.renderCharts();
    this.renderDomainSummaryCards();
    this.renderRiskWarningsTable();
  }

  renderCharts() {
    const chartFont = '"Plus Jakarta Sans", sans-serif';
    Chart.defaults.font.family = chartFont;
    const isHeadless =
      typeof navigator !== "undefined" &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    const domainGroups = this.app.manager.getDomainGroups();
    const standardDomains = domainGroups.filter((d) => d.id !== "IX");

    // 1. Biểu đồ Radar: Tỷ lệ % đạt được của 8 Lĩnh vực so với mức chuẩn 100%
    const radarCanvas = document.getElementById("chart-radar-domains");
    if (radarCanvas && radarCanvas.offsetParent !== null) {
      const labels = standardDomains.map((d) => d.shortName);
      const maxPctData = standardDomains.map(() => 100);
      const selfPctData = standardDomains.map((d) => {
        const s = d.getSummary();
        return s.maxScore > 0 ? Number(((s.selfScore / s.maxScore) * 100).toFixed(1)) : 0;
      });
      const evidencePctData = standardDomains.map((d) => d.getSummary().evidenceRate);

      if (this.radarChart) {
        this.radarChart.destroy();
      }

      this.radarChart = new Chart(radarCanvas, {
        type: "radar",
        data: {
          labels,
          datasets: [
            {
              label: "Tỷ lệ điểm tự chấm (%)",
              data: selfPctData,
              backgroundColor: "rgba(29, 78, 216, 0.2)",
              borderColor: "#1d4ed8",
              pointBackgroundColor: "#1d4ed8",
              borderWidth: 2
            },
            {
              label: "Tỷ lệ hoàn thành minh chứng (%)",
              data: evidencePctData,
              backgroundColor: "rgba(13, 148, 136, 0.14)",
              borderColor: "#0d9488",
              pointBackgroundColor: "#0d9488",
              borderWidth: 2,
              borderDash: [4, 4]
            },
            {
              label: "Mức tối đa QĐ 2851 (100%)",
              data: maxPctData,
              backgroundColor: "transparent",
              borderColor: "#94a3b8",
              pointBackgroundColor: "#94a3b8",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: isHeadless ? false : { duration: 250 },
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
                backdropColor: "transparent",
                font: { family: chartFont, size: 11 }
              },
              pointLabels: {
                font: { family: chartFont, size: 11, weight: "600" },
                color: "#1e293b"
              }
            }
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 12, font: { family: chartFont, size: 12 } }
            }
          }
        }
      });
    }

    // 2. Biểu đồ Cột ngang: So sánh Điểm tối đa & Điểm tự chấm theo 8 Lĩnh vực
    const barCanvas = document.getElementById("chart-bar-domains");
    if (barCanvas && barCanvas.offsetParent !== null) {
      const labels = standardDomains.map((d) => `${d.shortName} (${this.formatNum(d.maxScore, 1)}đ)`);
      const maxScores = standardDomains.map((d) => d.maxScore);
      const selfScores = standardDomains.map((d) => d.getSummary().selfScore);

      if (this.domainProgressChart) {
        this.domainProgressChart.destroy();
      }

      this.domainProgressChart = new Chart(barCanvas, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Điểm tự chấm",
              data: selfScores,
              backgroundColor: "#1d4ed8",
              borderRadius: 5
            },
            {
              label: "Điểm tối đa QĐ 2851",
              data: maxScores,
              backgroundColor: "#cbd5e1",
              borderRadius: 5
            }
          ]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          animation: isHeadless ? false : { duration: 250 },
          scales: {
            x: {
              beginAtZero: true,
              grid: { color: "#f1f5f9" },
              ticks: { font: { family: chartFont, size: 11 } }
            },
            y: {
              grid: { display: false },
              ticks: { font: { family: chartFont, size: 11, weight: "600" }, color: "#0f172a" }
            }
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 12, font: { family: chartFont, size: 12 } }
            }
          }
        }
      });
    }

    // 3. Biểu đồ Cột tiến độ theo 05 Cơ quan, Đơn vị thuộc UBND Phường
    const deptCanvas = document.getElementById("chart-bar-depts");
    if (deptCanvas && deptCanvas.offsetParent !== null) {
      const deptStats = this.app.manager.getDepartmentAnalytics();
      const labels = deptStats.map((d) => d.deptName.replace(" phường", ""));
      const scorePcts = deptStats.map((d) => d.scorePct);
      const evidencePcts = deptStats.map((d) => d.evidencePct);

      if (this.deptBarChart) {
        this.deptBarChart.destroy();
      }

      this.deptBarChart = new Chart(deptCanvas, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Tỷ lệ đạt điểm tiêu chí phụ trách (%)",
              data: scorePcts,
              backgroundColor: "#1e3a8a",
              borderRadius: 5
            },
            {
              label: "Tỷ lệ hoàn thành hồ sơ kiểm chứng (%)",
              data: evidencePcts,
              backgroundColor: "#0f766e",
              borderRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: isHeadless ? false : { duration: 250 },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                font: { family: chartFont, size: 11 },
                callback: (val) => `${val}%`
              }
            },
            x: {
              ticks: { font: { family: chartFont, size: 11, weight: "600" } }
            }
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 12, font: { family: chartFont, size: 12 } }
            }
          }
        }
      });
    }
  }

  renderDomainSummaryCards() {
    const grid = document.getElementById("domain-summary-grid");
    if (!grid) return;

    const groups = this.app.manager.getDomainGroups();
    grid.innerHTML = groups
      .map((g) => {
        const s = g.getSummary();
        const isBonusPenalty = g.id === "IX";
        const pct = isBonusPenalty
          ? Math.min(100, Math.round((s.bonusSelf / 10) * 100))
          : s.maxScore > 0
          ? Math.min(100, Math.round((s.selfScore / s.maxScore) * 100))
          : 0;

        return `
          <div
            data-jump-domain="${this.escapeHtml(g.id)}"
            role="button"
            tabindex="0"
            class="p-5 bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all cursor-pointer flex flex-col justify-between gap-3"
          >
            <div>
              <div class="flex items-baseline justify-between gap-2">
                <span class="font-mono text-xs font-extrabold text-blue-900">
                  ${this.escapeHtml(g.code)} · ${s.criteriaCount} tiêu chí
                </span>
                <span class="font-mono tabular-nums text-sm font-extrabold text-slate-900">
                  ${
                    isBonusPenalty
                      ? `+${this.formatNum(s.bonusSelf)} / -${this.formatNum(s.penaltySelf)}đ`
                      : `${this.formatNum(s.selfScore)} / ${this.formatNum(s.maxScore)}đ`
                  }
                </span>
              </div>
              <h3 class="text-sm font-bold text-slate-900 mt-1">
                ${this.escapeHtml(g.name)}
              </h3>
              <p class="text-xs text-slate-500 mt-1">
                Chủ trì: ${this.escapeHtml(g.leadDept)}
              </p>
            </div>

            <div class="space-y-1.5 pt-2 border-t border-slate-200/80">
              <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  class="h-full ${isBonusPenalty ? "bg-amber-600" : "bg-blue-700"} rounded-full"
                  style="width: ${pct}%"
                ></div>
              </div>
              <div class="flex items-center justify-between text-xs text-slate-600 font-mono tabular-nums">
                <span>Đạt: ${pct}%</span>
                <span>Minh chứng: ${s.evidenceRate}%</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-jump-domain]").forEach((card) => {
      const handleActivate = () => {
        const domainId = card.getAttribute("data-jump-domain");
        this.filters.domainId = domainId || "ALL";
        const selectEl = document.getElementById("filter-domain");
        if (selectEl) selectEl.value = this.filters.domainId;
        this.switchTab("scoring");
      };
      card.addEventListener("click", handleActivate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      });
    });
  }

  renderRiskWarningsTable() {
    const tbody = document.getElementById("risk-warnings-tbody");
    const countEl = document.getElementById("risk-count-label");
    if (!tbody) return;

    const m = this.app.manager.getOverallMetrics();
    const warnings = this.app.manager.getRiskWarnings();

    if (m.evaluatedCount === 0 && warnings.length === 0) {
      if (countEl) {
        countEl.textContent = `Chưa chấm điểm (0/${m.totalStandardCriteria} tiêu chí đã cập nhật)`;
        countEl.className = "text-xs font-bold text-slate-600 font-mono tabular-nums";
      }
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 px-4 text-center text-sm text-slate-600 bg-slate-50/60">
            <div>Bảng điểm Năm ${m.year} đang ở trạng thái khởi tạo chuẩn theo Phụ lục II - Quyết định số 2851/QĐ-UBND (0 điểm, không có dữ liệu giả lập).</div>
            <div class="mt-3">
              <button
                type="button"
                id="btn-jump-start-scoring"
                class="btn-tactile-primary px-4 py-2 text-xs font-bold rounded-lg cursor-pointer"
              >
                Mở Bảng Chấm điểm & Cập nhật Minh chứng →
              </button>
            </div>
          </td>
        </tr>
      `;
      document.getElementById("btn-jump-start-scoring")?.addEventListener("click", () => {
        this.switchTab("scoring");
      });
      return;
    }

    if (countEl) {
      countEl.textContent =
        warnings.length > 0
          ? `${warnings.length} tiêu chí cần rà soát / khắc phục`
          : "0 tiêu chí rủi ro - Các tiêu chí đã chấm đều đạt chuẩn";
      countEl.className =
        warnings.length > 0
          ? "text-xs font-bold text-amber-800 font-mono tabular-nums"
          : "text-xs font-bold text-emerald-800 font-mono tabular-nums";
    }

    if (warnings.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 px-4 text-center text-sm text-emerald-800 bg-emerald-50/40">
            Các tiêu chí đã chấm điểm đều đạt điểm tối đa và có đầy đủ hồ sơ kiểm chứng hợp lệ, không phát sinh điểm trừ.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = warnings
      .map(({ criterion: c, reason, lostPoints }) => {
        return `
          <tr class="border-b border-slate-200 hover:bg-amber-50/40 transition-colors">
            <td class="py-3 px-4 font-mono text-xs font-bold text-amber-900 whitespace-nowrap">${this.escapeHtml(
              c.code
            )}</td>
            <td class="py-3 px-4">
              <div class="text-sm font-semibold text-slate-900">${this.escapeHtml(c.title)}</div>
              <div class="text-xs text-amber-800 mt-1">${this.escapeHtml(reason)}</div>
            </td>
            <td class="py-3 px-4 text-xs text-slate-700">${this.escapeHtml(c.assignedDept)}</td>
            <td class="py-3 px-4 text-right font-mono tabular-nums text-xs font-semibold text-slate-900 whitespace-nowrap">
              ${this.formatNum(c.selfScore)} / ${this.formatNum(c.maxScore)}
            </td>
            <td class="py-3 px-4 text-right font-mono tabular-nums text-xs font-bold text-rose-700 whitespace-nowrap">
              -${this.formatNum(lostPoints)}đ
            </td>
            <td class="py-3 px-4 text-right">
              <button
                type="button"
                data-open-criterion="${this.escapeHtml(c.id)}"
                class="btn-tactile-primary px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer"
              >
                Khắc phục
              </button>
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll("[data-open-criterion]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open-criterion");
        if (id) this.openCriterionModal(id);
      });
    });
  }

  /**
   * 3. Render Bảng Chấm điểm & Quản lý Minh chứng Tương tác
   */
  renderScoringTableView() {
    const tbody = document.getElementById("scoring-criteria-tbody");
    const countLabel = document.getElementById("scoring-filter-count");
    if (!tbody) return;

    const filtered = this.app.manager.filterCriteria(this.filters);
    const sumMax = filtered
      .filter((c) => c.subGroup !== "penalty")
      .reduce((s, c) => s + c.maxScore, 0);
    const sumSelf = filtered
      .filter((c) => c.subGroup !== "penalty")
      .reduce((s, c) => s + c.selfScore, 0);

    if (countLabel) {
      countLabel.textContent = `Hiển thị ${filtered.length} tiêu chí · Tự chấm: ${this.formatNum(
        sumSelf
      )} / ${this.formatNum(sumMax)} điểm`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-10 px-4 text-center text-slate-500 text-sm">
            Không tìm thấy tiêu chí nào khớp với bộ lọc hiện tại.
            <button type="button" id="btn-reset-filters-inline" class="ml-2 text-blue-800 underline font-semibold cursor-pointer">Xóa bộ lọc</button>
          </td>
        </tr>
      `;
      document.getElementById("btn-reset-filters-inline")?.addEventListener("click", () => {
        this.resetFilters();
      });
      return;
    }

    let lastGroupTitle = "";
    const rowsHtml = [];

    for (const c of filtered) {
      const groupKey = `${c.domainId} - ${c.groupTitle}`;
      if (groupKey !== lastGroupTitle) {
        lastGroupTitle = groupKey;
        const domainMeta = DOMAINS_META.find((d) => d.id === c.domainId);
        rowsHtml.push(`
          <tr class="bg-slate-100/95 border-y border-slate-300">
            <td colspan="8" class="py-2.5 px-4 text-xs font-extrabold text-slate-800">
              ${this.escapeHtml(domainMeta ? `${domainMeta.code}: ${domainMeta.name}` : "")} · ${this.escapeHtml(
          c.groupTitle
        )}
            </td>
          </tr>
        `);
      }

      const evCount = c.evidences.length;
      const isPenalty = c.subGroup === "penalty";
      const isBonus = c.subGroup === "bonus";
      const evaluated = c.isEvaluated();

      let statusLabel = "Chưa chấm điểm";
      let statusColor = "text-slate-500";
      if (!evaluated) {
        statusLabel = isPenalty ? "Không vi phạm" : "Chưa chấm điểm";
        statusColor = "text-slate-500";
      } else if (c.isAtRisk()) {
        statusLabel = isPenalty ? "Bị trừ điểm" : "Hụt điểm / Thiếu MC";
        statusColor = "text-rose-700 font-bold";
      } else if (c.status === "in_progress") {
        statusLabel = "Đang rà soát";
        statusColor = "text-blue-800 font-semibold";
      } else {
        statusLabel = "Đã hoàn thành";
        statusColor = "text-emerald-800 font-bold";
      }

      const evSummaryHtml =
        evCount > 0
          ? `<div class="text-xs text-slate-800 font-semibold">${evCount} văn bản kiểm chứng</div>
             <div class="text-xs text-slate-500 truncate max-w-[180px]">${this.escapeHtml(
               c.evidences[0].docNumber
             )}: ${this.escapeHtml(c.evidences[0].summary)}</div>`
          : isPenalty
          ? `<span class="text-xs text-slate-500">Không phát sinh vi phạm</span>`
          : `<span class="text-xs text-slate-500">Chưa đính kèm minh chứng</span>`;

      rowsHtml.push(`
        <tr class="border-b border-slate-200 hover:bg-blue-50/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs font-extrabold ${
            isPenalty ? "text-rose-800" : isBonus ? "text-emerald-800" : "text-blue-900"
          } whitespace-nowrap align-top">
            ${this.escapeHtml(c.code)}
          </td>
          <td class="py-3 px-4 align-top">
            <div class="text-sm font-semibold text-slate-900">${this.escapeHtml(c.title)}</div>
            <div class="text-xs text-slate-600 mt-1 line-clamp-2">${this.escapeHtml(
              c.regulationText
            )}</div>
            ${
              c.dynamicWarning
                ? `<div class="text-xs text-amber-800 mt-1 font-semibold">${this.escapeHtml(
                    c.dynamicWarning
                  )}</div>`
                : ""
            }
          </td>
          <td class="py-3 px-4 text-xs text-slate-700 align-top">
            <div class="font-semibold text-slate-900">${this.escapeHtml(c.assignedDept)}</div>
            <div class="text-slate-500 mt-0.5">Hạn: ${this.escapeHtml(c.deadline)}</div>
          </td>
          <td class="py-3 px-4 text-right font-mono tabular-nums text-sm text-slate-700 align-top whitespace-nowrap">
            ${isPenalty ? `-${this.formatNum(c.maxScore)}` : this.formatNum(c.maxScore)}
          </td>
          <td class="py-3 px-4 text-right font-mono tabular-nums text-sm font-extrabold ${
            isPenalty
              ? c.selfScore > 0
                ? "text-rose-700"
                : "text-emerald-700"
              : !evaluated
              ? "text-slate-500"
              : c.selfScore < c.maxScore
              ? "text-amber-700"
              : "text-blue-900"
          } align-top whitespace-nowrap">
            ${isPenalty && c.selfScore > 0 ? `-${this.formatNum(c.selfScore)}` : this.formatNum(c.selfScore)}
          </td>
          <td class="py-3 px-4 align-top">
            ${evSummaryHtml}
          </td>
          <td class="py-3 px-4 align-top text-xs ${statusColor}">
            ${statusLabel}
          </td>
          <td class="py-3 px-4 text-right align-top whitespace-nowrap">
            <button
              type="button"
              data-open-criterion="${this.escapeHtml(c.id)}"
              class="btn-tactile-primary px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer"
            >
              Chấm điểm
            </button>
          </td>
        </tr>
      `);
    }

    tbody.innerHTML = rowsHtml.join("");

    tbody.querySelectorAll("[data-open-criterion]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open-criterion");
        if (id) this.openCriterionModal(id);
      });
    });
  }

  resetFilters() {
    this.filters = {
      domainId: "ALL",
      dept: "ALL",
      status: "ALL",
      search: ""
    };
    const domSel = document.getElementById("filter-domain");
    const deptSel = document.getElementById("filter-dept");
    const statSel = document.getElementById("filter-status");
    const searchInp = document.getElementById("filter-search");
    if (domSel) domSel.value = "ALL";
    if (deptSel) deptSel.value = "ALL";
    if (statSel) statSel.value = "ALL";
    if (searchInp) searchInp.value = "";
    this.renderScoringTableView();
  }

  /**
   * 4. Render Theo dõi Phân công & Tiến độ 05 Cơ quan, Đơn vị thuộc UBND Phường
   */
  renderUnitsView() {
    this.renderCharts();

    const milestonesGrid = document.getElementById("milestones-2851-grid");
    if (milestonesGrid) {
      milestonesGrid.innerHTML = KEY_MILESTONES_2851.map((m) => {
        return `
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2">
            <div>
              <div class="font-mono tabular-nums text-xs font-extrabold text-blue-900">
                Mốc hạn định: ${this.escapeHtml(m.date)}
              </div>
              <div class="text-xs font-bold text-slate-900 mt-1 leading-relaxed">
                ${this.escapeHtml(m.title)}
              </div>
            </div>
            <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-200/70">
              ${this.escapeHtml(m.unit)}
            </div>
          </div>
        `;
      }).join("");
    }

    const deptContainer = document.getElementById("dept-cards-grid");
    if (deptContainer) {
      const stats = this.app.manager.getDepartmentAnalytics();
      deptContainer.innerHTML = stats
        .map((st) => {
          const deptMeta = DEPARTMENTS.find((d) => d.name === st.deptName);
          return `
            <div class="surface-elevated p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-baseline justify-between gap-2">
                  <h4 class="text-base font-extrabold text-slate-900">${this.escapeHtml(st.deptName)}</h4>
                  <span class="font-mono tabular-nums text-xs font-extrabold text-blue-900">${
                    st.scorePct
                  }% điểm đạt</span>
                </div>
                <p class="text-xs text-slate-500 font-medium mt-1">${this.escapeHtml(
                  deptMeta?.leadPerson || ""
                )}</p>
                <p class="text-xs text-slate-700 mt-3 leading-relaxed">${this.escapeHtml(
                  deptMeta?.responsibilityNote || ""
                )}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span class="font-mono tabular-nums">Chủ trì: <strong>${
                  st.leadCount
                }</strong> TC · Phối hợp: <strong>${
            st.coordCount
          }</strong> TC (${this.formatNum(st.selfPts)}/${this.formatNum(st.maxPts)}đ)</span>
                <button
                  type="button"
                  data-filter-dept-jump="${this.escapeHtml(st.deptName)}"
                  class="text-blue-900 font-bold hover:underline cursor-pointer whitespace-nowrap"
                >
                  Chấm điểm đơn vị →
                </button>
              </div>
            </div>
          `;
        })
        .join("");

      deptContainer.querySelectorAll("[data-filter-dept-jump]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const deptName = btn.getAttribute("data-filter-dept-jump") || "ALL";
          this.filters.dept = deptName;
          const deptSel = document.getElementById("filter-dept");
          if (deptSel) deptSel.value = deptName;
          this.switchTab("scoring");
        });
      });
    }
  }

  /**
   * 5. Render Cơ chế Báo cáo & Xuất Biểu mẫu Tự đánh giá CCHC chuẩn Hành chính
   */
  renderReportsView() {
    const m = this.app.manager.getOverallMetrics();
    const groups = this.app.manager.getDomainGroups();
    const warnings = this.app.manager.getRiskWarnings();

    const reportContainer = document.getElementById("official-report-preview");
    if (!reportContainer) return;

    const domainRowsHtml = groups
      .map((g) => {
        const s = g.getSummary();
        const isIX = g.id === "IX";
        return `
          <tr class="border border-slate-400 bg-slate-100 font-bold text-slate-900">
            <td class="py-2 px-3 border border-slate-400 text-center font-mono text-xs">${this.escapeHtml(
              g.id
            )}</td>
            <td class="py-2 px-3 border border-slate-400 text-xs uppercase">${this.escapeHtml(
              g.name
            )}</td>
            <td class="py-2 px-3 border border-slate-400 text-xs">${this.escapeHtml(g.leadDept)}</td>
            <td class="py-2 px-3 border border-slate-400 text-right font-mono tabular-nums text-xs">${
              isIX ? "±10,00" : this.formatNum(s.maxScore)
            }</td>
            <td class="py-2 px-3 border border-slate-400 text-right font-mono tabular-nums text-xs">${this.formatNum(
              s.selfScore
            )}</td>
            <td class="py-2 px-3 border border-slate-400 text-xs">${s.evidenceRate}% hồ sơ minh chứng</td>
          </tr>
          ${g.criteria
            .map((c) => {
              const evText =
                c.evidences.length > 0
                  ? c.evidences.map((e) => `${e.docNumber} (${e.issueDate}): ${e.summary}`).join("; ")
                  : c.subGroup === "penalty"
                  ? "Không phát sinh vi phạm"
                  : "Chưa cập nhật văn bản";
              return `
                <tr class="border border-slate-300 text-slate-800">
                  <td class="py-1.5 px-3 border border-slate-300 text-center font-mono text-xs">${this.escapeHtml(
                    c.code
                  )}</td>
                  <td class="py-1.5 px-3 border border-slate-300 text-xs">${this.escapeHtml(
                    c.title
                  )}</td>
                  <td class="py-1.5 px-3 border border-slate-300 text-xs">${this.escapeHtml(
                    c.assignedDept
                  )}</td>
                  <td class="py-1.5 px-3 border border-slate-300 text-right font-mono tabular-nums text-xs">${
                    c.subGroup === "penalty"
                      ? `-${this.formatNum(c.maxScore)}`
                      : this.formatNum(c.maxScore)
                  }</td>
                  <td class="py-1.5 px-3 border border-slate-300 text-right font-mono tabular-nums text-xs font-semibold">${
                    c.subGroup === "penalty" && c.selfScore > 0
                      ? `-${this.formatNum(c.selfScore)}`
                      : this.formatNum(c.selfScore)
                  }</td>
                  <td class="py-1.5 px-3 border border-slate-300 text-xs">${this.escapeHtml(
                    evText
                  )}</td>
                </tr>
              `;
            })
            .join("")}
        `;
      })
      .join("");

    reportContainer.innerHTML = `
      <div class="surface-elevated p-8 text-slate-900">
        <!-- Quốc hiệu & Tiêu ngữ chuẩn thể thức hành chính -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-300 text-center">
          <div>
            <div class="text-xs font-bold uppercase">ỦY BAN NHÂN DÂN</div>
            <div class="text-sm font-bold uppercase underline underline-offset-4">PHƯỜNG HỘI AN ĐÔNG</div>
            <div class="text-xs mt-1">Số: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/BC-UBND</div>
          </div>
          <div>
            <div class="text-xs font-bold uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="text-sm font-bold underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</div>
            <div class="text-xs italic mt-1">Hội An Đông, ngày ${new Date().getDate()} tháng ${
      new Date().getMonth() + 1
    } năm ${m.year}</div>
          </div>
        </div>

        <div class="text-center my-6">
          <h3 class="text-lg font-extrabold uppercase">BÁO CÁO TỔNG HỢP TỰ ĐÁNH GIÁ, CHẤM ĐIỂM KẾT QUẢ CẢI CÁCH HÀNH CHÍNH NĂM ${
            m.year
          }</h3>
          <p class="text-xs text-slate-600 mt-1">
            (Theo Phụ lục II - Quyết định số 2851/QĐ-UBND ngày 30/6/2026 của Chủ tịch UBND thành phố Đà Nẵng)
          </p>
        </div>

        <!-- Phần I: Khái quát kết quả tự chấm điểm -->
        <div class="mb-6 text-sm space-y-2 leading-relaxed">
          <h4 class="font-bold uppercase text-slate-900">I. KẾT QUẢ TỰ ĐÁNH GIÁ, CHẤM ĐIỂM TỔNG HỢP NĂM ${
            m.year
          }</h4>
          <p>
            1. Tổng điểm chuẩn đạt được (Mục I đến Mục VIII):
            <strong class="tabular-nums">${this.formatNum(m.totalSelfScore)} / ${this.formatNum(
      m.baseMaxScore
    )} điểm</strong> (Đã chấm ${m.evaluatedCount}/${m.totalStandardCriteria} tiêu chí chính).
          </p>
          <p>
            2. Tổng điểm thưởng (Mục IX.1):
            <strong class="tabular-nums text-emerald-800">+${this.formatNum(
              m.bonusScore
            )} / 10,00 điểm</strong>.
          </p>
          <p>
            3. Tổng điểm trừ (Mục IX.2):
            <strong class="tabular-nums ${
              m.penaltyScore > 0 ? "text-rose-700" : "text-slate-900"
            }">-${this.formatNum(m.penaltyScore)} / 10,00 điểm</strong>.
          </p>
          <p>
            4. Tổng điểm xếp hạng CCHC (PAR Index) năm ${m.year} dự kiến:
            <strong class="tabular-nums text-blue-900 text-base">${this.formatNum(
              m.finalScore
            )} điểm</strong> — Xếp loại: <strong>${this.escapeHtml(m.rankingInfo.grade)}</strong>.
          </p>
          <p>
            5. Tỷ lệ hoàn thành hồ sơ, tài liệu kiểm chứng:
            <strong class="tabular-nums">${m.evidenceRate}%</strong> (${
      m.validEvidenceCount
    }/${m.totalActiveEvidenceCriteria} tiêu chí có đầy đủ văn bản kiểm chứng).
          </p>
          ${
            m.evaluatedCount === 0
              ? `<p class="text-slate-600">6. Trạng thái dữ liệu: Bảng điểm năm ${m.year} hiện đang ở trạng thái khởi tạo ban đầu (chưa nhập số liệu tự chấm điểm).</p>`
              : warnings.length > 0
              ? `<p class="text-amber-900">6. Nội dung đang tiếp tục hoàn thiện: Hiện có <strong>${warnings.length}</strong> tiêu chí đã chấm đang được các phòng, đơn vị bổ sung tối ưu điểm số và minh chứng.</p>`
              : `<p class="text-emerald-900">6. Đánh giá chung: Các tiêu chí đã chấm điểm đều hoàn thành tối đa và đầy đủ hồ sơ kiểm chứng.</p>`
          }
        </div>

        <!-- Phần II: Bảng phụ lục tự chấm điểm chi tiết -->
        <div class="mb-6">
          <h4 class="font-bold uppercase text-sm text-slate-900 mb-3">II. BẢNG TỰ CHẤM ĐIỂM CHI TIẾT KÈM DANH MỤC TÀI LIỆU KIỂM CHỨNG</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-400 text-left">
              <thead>
                <tr class="bg-slate-200 text-slate-900 text-xs font-bold">
                  <th class="py-2 px-3 border border-slate-400 text-center w-20">Mã TC</th>
                  <th class="py-2 px-3 border border-slate-400">Nội dung Tiêu chí, Tiêu chí thành phần</th>
                  <th class="py-2 px-3 border border-slate-400 w-44">Đơn vị chủ trì</th>
                  <th class="py-2 px-3 border border-slate-400 text-right w-24">Điểm tối đa</th>
                  <th class="py-2 px-3 border border-slate-400 text-right w-24">Tự chấm</th>
                  <th class="py-2 px-3 border border-slate-400 w-64">Tài liệu kiểm chứng (Số hiệu, Ngày, Trích yếu)</th>
                </tr>
              </thead>
              <tbody>
                ${domainRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Chữ ký trình duyệt -->
        <div class="grid grid-cols-2 gap-6 mt-8 pt-4 text-center text-xs">
          <div>
            <div class="font-bold uppercase">CƠ QUAN THƯỜNG TRỰC TỔNG HỢP</div>
            <div class="italic text-slate-600 mt-0.5">(Phòng Văn hóa – Xã hội phường)</div>
            <div class="h-20"></div>
            <div class="font-semibold">(Ký, ghi rõ họ tên)</div>
          </div>
          <div>
            <div class="font-bold uppercase">TM. ỦY BAN NHÂN DÂN</div>
            <div class="font-bold uppercase mt-0.5">CHỦ TỊCH</div>
            <div class="h-20"></div>
            <div class="font-semibold">(Ký, đóng dấu và ghi rõ họ tên)</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 6. Render Mục Cài đặt Hệ thống (Mật khẩu: tsvmmm)
   */
  renderSettingsView() {
    const lockPanel = document.getElementById("settings-lock-panel");
    const unlockedPanel = document.getElementById("settings-unlocked-panel");
    if (!lockPanel || !unlockedPanel) return;

    if (!this.isAdminUnlocked) {
      lockPanel.classList.remove("hidden");
      unlockedPanel.classList.add("hidden");
      return;
    }

    lockPanel.classList.add("hidden");
    unlockedPanel.classList.remove("hidden");

    // 1. Render Danh sách các năm chấm điểm
    const yearsListEl = document.getElementById("settings-years-list");
    if (yearsListEl) {
      const activeYear = this.app.manager.activeYear;
      const years = this.app.manager.availableYears;
      yearsListEl.innerHTML = years
        .map((yr) => {
          const isCurrent = Number(yr) === Number(activeYear);
          const mapForYr = this.app.manager.yearsDataMap.get(Number(yr));
          const count = mapForYr ? mapForYr.size : 0;
          return `
            <div class="p-3 bg-white border ${
              isCurrent ? "border-blue-600 bg-blue-50/40" : "border-slate-200"
            } rounded-xl flex items-center justify-between gap-3">
              <div>
                <span class="font-mono tabular-nums text-sm font-extrabold text-slate-900">Năm ${yr}</span>
                <span aria-hidden="true"> · </span>
                <span class="text-xs text-slate-600">${count} tiêu chí</span>
                ${
                  isCurrent
                    ? `<span aria-hidden="true"> · </span><span class="text-xs font-bold text-blue-800">Đang chọn (Hiện hành)</span>`
                    : ""
                }
              </div>
              <div class="flex items-center gap-2">
                ${
                  !isCurrent
                    ? `<button type="button" data-select-year="${yr}" class="btn-tactile-secondary px-3 py-1 text-xs font-bold text-blue-900 rounded-lg cursor-pointer">Chọn năm ${yr}</button>`
                    : ""
                }
                ${
                  years.length > 1
                    ? `<button type="button" data-delete-year="${yr}" class="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 rounded-lg cursor-pointer">Xóa</button>`
                    : ""
                }
              </div>
            </div>
          `;
        })
        .join("");

      yearsListEl.querySelectorAll("[data-select-year]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const yr = Number(btn.getAttribute("data-select-year"));
          if (yr) this.app.handleSwitchYear(yr);
        });
      });

      yearsListEl.querySelectorAll("[data-delete-year]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const yr = Number(btn.getAttribute("data-delete-year"));
          if (yr) this.app.handleDeleteYear(yr);
        });
      });
    }

    // 2. Render Thông tin Sao lưu
    const backupStatsEl = document.getElementById("backup-stats-summary");
    if (backupStatsEl) {
      const yearsCount = this.app.manager.availableYears.length;
      const critCount = this.app.manager.getAllCriteria().length;
      const evCount = this.app.manager
        .getAllCriteria()
        .reduce((acc, c) => acc + c.evidences.length, 0);
      backupStatsEl.textContent = `Hiện có ${yearsCount} năm chấm điểm · Năm ${this.app.manager.activeYear} gồm ${critCount} tiêu chí và ${evCount} văn bản minh chứng đã đính kèm.`;
    }

    // 3. Render Cấu hình Google Drive & Google Apps Script
    const sysCfg = this.app.systemConfig || {};
    const gasInput = document.getElementById("input-gas-webapp-url");
    const folderIdInput = document.getElementById("input-drive-folder-id");
    const folderUrlInput = document.getElementById("input-drive-folder-url");
    const gasCodePreview = document.getElementById("gas-code-preview");

    if (gasInput && document.activeElement !== gasInput) {
      gasInput.value = sysCfg.gasWebAppUrl || "";
    }
    if (folderIdInput && document.activeElement !== folderIdInput) {
      folderIdInput.value = sysCfg.driveFolderId || "";
    }
    if (folderUrlInput && document.activeElement !== folderUrlInput) {
      folderUrlInput.value = sysCfg.driveFolderUrl || "";
    }
    if (gasCodePreview && !gasCodePreview.textContent) {
      gasCodePreview.textContent = GAS_SCRIPT_TEMPLATE;
    }

    // 4. Render Bảng Quản trị Danh mục Tiêu chí (Thêm / Sửa / Xóa)
    this.renderSettingsCriteriaTable();
  }

  renderSettingsCriteriaTable() {
    const tbody = document.getElementById("settings-criteria-tbody");
    if (!tbody) return;

    const filtered = this.app.manager.filterCriteria({
      domainId: this.settingsCritFilter.domainId || "ALL",
      dept: "ALL",
      status: "ALL",
      search: this.settingsCritFilter.search || ""
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 px-4 text-center text-xs text-slate-500">
            Không tìm thấy tiêu chí nào phù hợp.
          </td>
        </tr>
      `;
      return;
    }

    const typeMap = {
      boolean: "Đạt / Không đạt",
      tiered: "Bậc thang",
      formula: "Công thức %",
      checklist: "Checklist",
      penalty: "Điểm trừ"
    };

    tbody.innerHTML = filtered
      .map((c) => {
        const isPenalty = c.subGroup === "penalty";
        return `
          <tr class="border-b border-slate-200 hover:bg-slate-50 text-xs">
            <td class="py-2.5 px-4 font-mono font-extrabold text-blue-900 whitespace-nowrap">
              ${this.escapeHtml(c.code)}
            </td>
            <td class="py-2.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
              Mục ${this.escapeHtml(c.domainId)}
            </td>
            <td class="py-2.5 px-4">
              <div class="font-bold text-slate-900">${this.escapeHtml(c.title)}</div>
              <div class="text-slate-500 line-clamp-1 mt-0.5">${this.escapeHtml(
                c.regulationText
              )}</div>
            </td>
            <td class="py-2.5 px-4 text-right font-mono tabular-nums font-bold ${
              isPenalty ? "text-rose-700" : "text-slate-900"
            } whitespace-nowrap">
              ${isPenalty ? `-${this.formatNum(c.maxScore)}` : this.formatNum(c.maxScore)}đ
            </td>
            <td class="py-2.5 px-4 text-slate-600 whitespace-nowrap">
              ${this.escapeHtml(typeMap[c.type] || c.type)}
            </td>
            <td class="py-2.5 px-4 text-slate-700">
              ${this.escapeHtml(c.assignedDept)}
            </td>
            <td class="py-2.5 px-4 text-right whitespace-nowrap space-x-1.5">
              <button
                type="button"
                data-edit-crit-def="${this.escapeHtml(c.id)}"
                class="px-2.5 py-1 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md cursor-pointer"
              >
                Sửa
              </button>
              <button
                type="button"
                data-delete-crit-def="${this.escapeHtml(c.id)}"
                class="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md cursor-pointer"
              >
                Xóa
              </button>
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll("[data-edit-crit-def]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-edit-crit-def");
        if (id) this.openCriterionCrudModal(id);
      });
    });

    tbody.querySelectorAll("[data-delete-crit-def]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-delete-crit-def");
        if (id) this.app.handleDeleteCriterionDefinition(id);
      });
    });
  }

  /**
   * 7. Mở / Đóng Modal Thêm mới hoặc Chỉnh sửa Tiêu chí (CRUD)
   */
  openCriterionCrudModal(criterionId = null) {
    const modal = document.getElementById("criterion-crud-modal");
    if (!modal) return;

    const heading = document.getElementById("crud-modal-heading");
    const origIdInp = document.getElementById("crud-crit-original-id");
    const codeInp = document.getElementById("crud-crit-code");
    const domainSel = document.getElementById("crud-crit-domain");
    const subGroupSel = document.getElementById("crud-crit-subgroup");
    const maxScoreInp = document.getElementById("crud-crit-maxscore");
    const typeSel = document.getElementById("crud-crit-type");
    const deadlineInp = document.getElementById("crud-crit-deadline");
    const groupTitleInp = document.getElementById("crud-crit-grouptitle");
    const deptSel = document.getElementById("crud-crit-dept");
    const titleArea = document.getElementById("crud-crit-title");
    const regArea = document.getElementById("crud-crit-regulation");
    const warnInp = document.getElementById("crud-crit-warning");
    const errEl = document.getElementById("crud-crit-error");

    if (errEl) errEl.classList.add("hidden");

    const existing = criterionId ? this.app.manager.getCriterionById(criterionId) : null;
    if (existing) {
      if (heading) heading.textContent = `Chỉnh sửa Tiêu chí ${existing.code}`;
      if (origIdInp) origIdInp.value = existing.id;
      if (codeInp) codeInp.value = existing.code;
      if (domainSel) domainSel.value = existing.domainId;
      if (subGroupSel) subGroupSel.value = existing.subGroup || "standard";
      if (maxScoreInp) maxScoreInp.value = existing.maxScore;
      if (typeSel) typeSel.value = existing.type || "boolean";
      if (deadlineInp) deadlineInp.value = existing.deadline || `Năm ${this.app.manager.activeYear}`;
      if (groupTitleInp) groupTitleInp.value = existing.groupTitle || "";
      if (deptSel) deptSel.value = existing.assignedDept;
      if (titleArea) titleArea.value = existing.title || "";
      if (regArea) regArea.value = existing.regulationText || "";
      if (warnInp) warnInp.value = existing.warningNote || "";
    } else {
      if (heading) heading.textContent = `Thêm mới Tiêu chí CCHC (Năm ${this.app.manager.activeYear})`;
      if (origIdInp) origIdInp.value = "";
      if (codeInp) codeInp.value = "";
      if (domainSel) domainSel.value = "I";
      if (subGroupSel) subGroupSel.value = "standard";
      if (maxScoreInp) maxScoreInp.value = "1.0";
      if (typeSel) typeSel.value = "boolean";
      if (deadlineInp) deadlineInp.value = `Năm ${this.app.manager.activeYear}`;
      if (groupTitleInp) groupTitleInp.value = "Nhóm tiêu chí bổ sung";
      if (deptSel) deptSel.value = "Phòng Văn hóa – Xã hội phường";
      if (titleArea) titleArea.value = "";
      if (regArea) regArea.value = "Đạt 100% yêu cầu theo quy định được tính điểm tối đa.";
      if (warnInp) warnInp.value = "";
    }

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  closeCriterionCrudModal() {
    const modal = document.getElementById("criterion-crud-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * 8. Mở Modal Chấm điểm & Hồ sơ kiểm chứng
   */
  openCriterionModal(criterionId) {
    const crit = this.app.manager.getCriterionById(criterionId);
    if (!crit) return;

    this.editingCriterion = crit;
    this.tempInputs = JSON.parse(JSON.stringify(crit.inputs || {}));
    this.tempEvidences = crit.evidences.map((e) => new EvidenceItem(e.toJSON()));

    const modal = document.getElementById("criterion-modal");
    if (!modal) return;

    document.getElementById("modal-criterion-code").textContent = `Tiêu chí ${crit.code} · Năm ${this.app.manager.activeYear}`;
    document.getElementById("modal-criterion-title").textContent = crit.title;
    document.getElementById("modal-criterion-reg").textContent = crit.regulationText;
    document.getElementById("modal-criterion-warning").textContent =
      crit.warningNote ||
      "Đảm bảo đính kèm đầy đủ văn bản, tài liệu kiểm chứng hợp lệ theo quy định tại Quyết định số 2851/QĐ-UBND.";

    const deptSel = document.getElementById("modal-assigned-dept");
    if (deptSel) deptSel.value = crit.assignedDept;

    const statusSel = document.getElementById("modal-status");
    if (statusSel) statusSel.value = crit.status;

    const notesArea = document.getElementById("modal-notes");
    if (notesArea) notesArea.value = crit.notes || "";

    const fileInput = document.getElementById("input-ev-file-upload");
    if (fileInput) fileInput.value = "";

    this.renderModalDynamicInputs();
    this.renderModalEvidenceList();
    this.recalculateModalPreviewScore();

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  closeCriterionModal() {
    const modal = document.getElementById("criterion-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
    this.editingCriterion = null;
  }

  renderModalDynamicInputs() {
    const container = document.getElementById("modal-dynamic-inputs");
    if (!container || !this.editingCriterion) return;

    const c = this.editingCriterion;

    if (c.type === "boolean") {
      const checked = Boolean(this.tempInputs.achieved);
      container.innerHTML = `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="modal-input-boolean"
              class="w-5 h-5 text-blue-900 rounded border-slate-300 focus:ring-blue-800"
              ${checked ? "checked" : ""}
            />
            <span class="text-sm font-bold text-slate-900">
              Đánh dấu ĐẠT yêu cầu của tiêu chí (${this.formatNum(c.maxScore)} điểm)
            </span>
          </label>
        </div>
      `;
      container.querySelector("#modal-input-boolean")?.addEventListener("change", (e) => {
        this.tempInputs.achieved = e.target.checked;
        this.recalculateModalPreviewScore();
      });
      return;
    }

    if (c.type === "penalty") {
      const violated = Boolean(this.tempInputs.violated);
      container.innerHTML = `
        <div class="p-4 bg-rose-50/70 border border-rose-200 rounded-xl">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="modal-input-penalty"
              class="w-5 h-5 text-rose-700 rounded border-rose-300 focus:ring-rose-700"
              ${violated ? "checked" : ""}
            />
            <span class="text-sm font-bold text-rose-900">
              Có phát sinh vi phạm nội dung này (Bị trừ -${this.formatNum(c.maxScore)} điểm)
            </span>
          </label>
          <p class="text-xs text-rose-700 mt-1.5">Để trống (không chọn) nếu đơn vị kiểm soát tốt, không vi phạm.</p>
        </div>
      `;
      container.querySelector("#modal-input-penalty")?.addEventListener("change", (e) => {
        this.tempInputs.violated = e.target.checked;
        this.recalculateModalPreviewScore();
      });
      return;
    }

    if (c.type === "tiered") {
      const tiers = c.formulaConfig?.tiers || [];
      container.innerHTML = `
        <div class="space-y-2">
          <label for="modal-select-tier" class="block text-xs font-bold text-slate-700">
            Chọn bậc đánh giá thực tế theo Phụ lục II - Quyết định 2851/QĐ-UBND:
          </label>
          <select
            id="modal-select-tier"
            class="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="" ${!this.tempInputs.selectedTier ? "selected" : ""}>
              -- Chưa chọn bậc đánh giá (0,00 điểm) --
            </option>
            ${tiers
              .map(
                (t) => `
              <option value="${this.escapeHtml(t.key)}" ${
                  this.tempInputs.selectedTier === t.key ? "selected" : ""
                }>
                ${this.escapeHtml(t.label)} (${this.formatNum(t.score)} điểm)
              </option>
            `
              )
              .join("")}
          </select>
        </div>
      `;
      container.querySelector("#modal-select-tier")?.addEventListener("change", (e) => {
        this.tempInputs.selectedTier = e.target.value;
        this.recalculateModalPreviewScore();
      });
      return;
    }

    if (c.type === "checklist") {
      const items = c.formulaConfig?.items || [];
      container.innerHTML = `
        <div class="space-y-2.5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div class="text-xs font-bold text-slate-700 mb-2">
            Chọn các nội dung thành phần đã hoàn thành đầy đủ:
          </div>
          ${items
            .map(
              (item) => `
            <label class="flex items-start gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                data-checklist-key="${this.escapeHtml(item.key)}"
                class="mt-0.5 w-4 h-4 text-blue-900 rounded border-slate-300"
                ${this.tempInputs[item.key] ? "checked" : ""}
              />
              <span class="text-sm text-slate-800">
                ${this.escapeHtml(item.label)}
                <span class="font-mono text-xs text-blue-900 font-bold">(${this.formatNum(
                  item.score
                )}đ)</span>
              </span>
            </label>
          `
            )
            .join("")}
        </div>
      `;
      container.querySelectorAll("[data-checklist-key]").forEach((chk) => {
        chk.addEventListener("change", () => {
          const key = chk.getAttribute("data-checklist-key");
          if (key) {
            this.tempInputs[key] = chk.checked;
            this.recalculateModalPreviewScore();
          }
        });
      });
      return;
    }

    if (c.type === "formula") {
      const fields = c.formulaConfig?.fields || [];
      container.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          ${fields
            .map(
              (f) => `
            <div>
              <label for="modal-formula-${this.escapeHtml(
                f.name
              )}" class="block text-xs font-bold text-slate-700 mb-1">
                ${this.escapeHtml(f.label)}
              </label>
              <input
                type="number"
                step="any"
                id="modal-formula-${this.escapeHtml(f.name)}"
                data-formula-field="${this.escapeHtml(f.name)}"
                value="${Number(this.tempInputs[f.name] ?? 0)}"
                class="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          `
            )
            .join("")}
        </div>
      `;
      container.querySelectorAll("[data-formula-field]").forEach((inp) => {
        inp.addEventListener("input", () => {
          const fieldName = inp.getAttribute("data-formula-field");
          if (fieldName) {
            this.tempInputs[fieldName] = Number(inp.value || 0);
            this.recalculateModalPreviewScore();
          }
        });
      });
    }
  }

  recalculateModalPreviewScore() {
    if (!this.editingCriterion) return;
    const hasInputs = Object.keys(this.tempInputs || {}).length > 0;
    const score = hasInputs ? this.editingCriterion.calculateScore(this.tempInputs) : 0;
    const previewEl = document.getElementById("modal-preview-score");
    const warnEl = document.getElementById("modal-dynamic-calc-warning");

    if (previewEl) {
      const prefix = this.editingCriterion.subGroup === "penalty" && score > 0 ? "-" : "";
      previewEl.textContent = `${prefix}${this.formatNum(score)} / ${this.formatNum(
        this.editingCriterion.maxScore
      )} điểm`;
    }
    if (warnEl) {
      if (hasInputs && this.editingCriterion.dynamicWarning) {
        warnEl.textContent = this.editingCriterion.dynamicWarning;
        warnEl.classList.remove("hidden");
      } else {
        warnEl.textContent = "";
        warnEl.classList.add("hidden");
      }
    }
  }

  renderModalEvidenceList() {
    const listContainer = document.getElementById("modal-evidence-list");
    if (!listContainer) return;

    if (this.tempEvidences.length === 0) {
      listContainer.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-300 rounded-xl">
          Chưa có văn bản kiểm chứng nào được đính kèm. Vui lòng thêm văn bản hoặc tải file lên Google Drive bên dưới.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.tempEvidences
      .map(
        (ev, idx) => `
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="text-xs space-y-0.5">
          <div class="font-bold text-slate-900">
            <span class="font-mono text-blue-900">${this.escapeHtml(ev.docNumber)}</span>
            <span aria-hidden="true"> · </span>
            <span class="font-mono text-slate-500">Ngày: ${this.escapeHtml(
              ev.issueDate || String(this.app.manager.activeYear)
            )}</span>
          </div>
          <div class="text-slate-700">${this.escapeHtml(ev.summary)}</div>
          ${
            ev.fileUrl
              ? `<a href="${this.escapeHtml(
                  ev.fileUrl
                )}" target="_blank" rel="noopener noreferrer" class="text-blue-800 font-medium hover:underline inline-block truncate max-w-md">${this.escapeHtml(
                  ev.fileUrl
                )}</a>`
              : ""
          }
        </div>
        <button
          type="button"
          data-remove-evidence="${idx}"
          aria-label="Xóa văn bản ${this.escapeHtml(ev.docNumber)}"
          class="px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 rounded-lg transition-colors shrink-0 self-end sm:self-center cursor-pointer"
        >
          Xóa
        </button>
      </div>
    `
      )
      .join("");

    listContainer.querySelectorAll("[data-remove-evidence]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-remove-evidence"));
        this.tempEvidences.splice(idx, 1);
        this.renderModalEvidenceList();
      });
    });
  }

  handleAddEvidenceFromForm() {
    const docNumEl = document.getElementById("new-ev-docnum");
    const dateEl = document.getElementById("new-ev-date");
    const sumEl = document.getElementById("new-ev-summary");
    const urlEl = document.getElementById("new-ev-url");
    const errEl = document.getElementById("new-ev-error");

    const docNumber = docNumEl?.value.trim() || "";
    const issueDate = dateEl?.value.trim() || new Date().toISOString().slice(0, 10);
    const summary = sumEl?.value.trim() || "";
    const fileUrl = urlEl?.value.trim() || "";

    if (!docNumber || !summary) {
      if (errEl) {
        errEl.textContent = "Vui lòng nhập đầy đủ Số ký hiệu văn bản và Trích yếu nội dung minh chứng!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    if (errEl) errEl.classList.add("hidden");

    this.tempEvidences.push(
      new EvidenceItem({
        docNumber,
        issueDate,
        summary,
        fileUrl,
        checklistPassed: true
      })
    );

    if (docNumEl) docNumEl.value = "";
    if (sumEl) sumEl.value = "";
    if (urlEl) urlEl.value = "";
    this.renderModalEvidenceList();
  }

  /**
   * 9. Xuất file CSV chuẩn UTF-8 BOM (mở trực tiếp bằng Microsoft Excel tiếng Việt có dấu)
   */
  exportToExcelCSV() {
    const activeYear = this.app.manager.activeYear;
    const all = this.app.manager.getAllCriteria();
    const headers = [
      "Năm đánh giá",
      "Mã Tiêu chí",
      "Lĩnh vực",
      "Nhóm tiêu chí",
      "Tên Tiêu chí thành phần",
      "Đơn vị chủ trì",
      "Kỳ đánh giá",
      "Điểm tối đa",
      "Điểm tự chấm",
      "Trạng thái",
      "Số lượng minh chứng",
      "Chi tiết Văn bản kiểm chứng",
      "Ghi chú thẩm định"
    ];

    const escapeCsv = (val) => {
      const s = String(val ?? "").replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = all.map((c) => {
      const evDetail = c.evidences
        .map((e) => `${e.docNumber} (${e.issueDate}): ${e.summary}`)
        .join(" | ");
      return [
        activeYear,
        c.code,
        `Mục ${c.domainId}`,
        c.groupTitle,
        c.title,
        c.assignedDept,
        c.deadline,
        c.maxScore,
        c.selfScore,
        c.status,
        c.evidences.length,
        evDetail,
        c.notes
      ]
        .map(escapeCsv)
        .join(",");
    });

    const csvContent = "\uFEFF" + [headers.map(escapeCsv).join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Bang_Tu_Cham_Diem_CCHC_Phuong_Hoi_An_Dong_${activeYear}_QD2851.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showToast(`Đã xuất Bảng tự chấm điểm CCHC năm ${activeYear} ra file Excel (.CSV) thành công!`);
  }
}
