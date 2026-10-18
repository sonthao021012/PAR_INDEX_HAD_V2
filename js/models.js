/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Thiết kế Hướng đối tượng (OOP ES6 Classes)
 * Bao gồm: EvidenceItem, BaseCriterion, BooleanCriterion, TieredCriterion,
 * FormulaCriterion, ChecklistCriterion, BonusPenaltyCriterion, DomainGroup, CCHCManager
 */

import { DOMAINS_META, EVALUATION_YEAR, getRankingGrade } from "./config.js";

const ARCHIVE_MIME_MAP = {
  zip: "application/zip",
  rar: "application/vnd.rar",
  "7z": "application/x-7z-compressed",
  "tar.gz": "application/gzip",
  tgz: "application/gzip",
  gz: "application/gzip",
  tar: "application/x-tar",
  "tar.bz2": "application/x-bzip2",
  bz2: "application/x-bzip2",
  "tar.xz": "application/x-xz",
  xz: "application/x-xz"
};

const DOCUMENT_MIME_MAP = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg"
};

/**
 * Nhận diện định dạng tệp minh chứng (Đặc biệt hỗ trợ các định dạng tệp nén .ZIP, .RAR, .7Z, .TAR.GZ...)
 */
export function resolveEvidenceFileMeta(fileNameOrText = "", rawMimeType = "", fileSize = 0) {
  const cleanStr = String(fileNameOrText || "").trim().toLowerCase();
  let detectedExt = "";

  const multiExts = ["tar.gz", "tar.bz2", "tar.xz"];
  for (const mExt of multiExts) {
    if (
      cleanStr.endsWith(`.${mExt}`) ||
      cleanStr.includes(`.${mExt} `) ||
      cleanStr.includes(`.${mExt})`)
    ) {
      detectedExt = mExt;
      break;
    }
  }

  if (!detectedExt) {
    const extMatch = cleanStr.match(/\.(zip|rar|7z|tgz|tar|gz|bz2|xz|pdf|docx?|xlsx?|pptx?|png|jpe?g)(?:$|\b|\s|\))/i);
    if (extMatch) {
      detectedExt = extMatch[1].toLowerCase();
    }
  }

  const rawMime = String(rawMimeType || "").trim().toLowerCase();
  if (!detectedExt && rawMime) {
    if (rawMime.includes("zip")) detectedExt = "zip";
    else if (rawMime.includes("rar")) detectedExt = "rar";
    else if (rawMime.includes("7z")) detectedExt = "7z";
    else if (rawMime.includes("gzip")) detectedExt = "gz";
    else if (rawMime.includes("tar")) detectedExt = "tar";
    else if (rawMime.includes("pdf")) detectedExt = "pdf";
  }

  const isArchive = Boolean(
    (detectedExt && Object.prototype.hasOwnProperty.call(ARCHIVE_MIME_MAP, detectedExt)) ||
      /zip|rar|7z|gzip|x-tar|x-bzip|x-xz/i.test(rawMime)
  );

  const mimeType =
    ARCHIVE_MIME_MAP[detectedExt] ||
    DOCUMENT_MIME_MAP[detectedExt] ||
    (rawMime && rawMime !== "application/octet-stream" ? rawMime : "") ||
    (isArchive ? "application/zip" : "application/octet-stream");

  const sizeNum = Math.max(0, Number(fileSize || 0));
  let formattedSize = "";
  if (sizeNum > 0) {
    if (sizeNum >= 1024 * 1024) {
      formattedSize = `${(sizeNum / (1024 * 1024)).toFixed(2).replace(".", ",")} MB`;
    } else if (sizeNum >= 1024) {
      formattedSize = `${(sizeNum / 1024).toFixed(1).replace(".", ",")} KB`;
    } else {
      formattedSize = `${sizeNum} B`;
    }
  }

  const extUpper = detectedExt ? detectedExt.toUpperCase() : isArchive ? "ZIP" : "";
  const badgeLabel = isArchive
    ? `Tệp nén .${extUpper || "ZIP"}`
    : extUpper
    ? `Tệp .${extUpper}`
    : "Tài liệu";

  return {
    ext: extUpper,
    isArchive,
    mimeType,
    formattedSize,
    badgeLabel
  };
}

/**
 * 1. Lớp quản lý Hồ sơ minh chứng (EvidenceItem)
 */
export class EvidenceItem {
  constructor(data = {}) {
    this.docNumber = String(data.docNumber || "").slice(0, 120);
    this.issueDate = String(data.issueDate || "").slice(0, 32);
    this.summary = String(data.summary || "").slice(0, 500);
    this.fileUrl = String(data.fileUrl || "").slice(0, 500);
    this.fileName = String(data.fileName || "").slice(0, 255);
    this.fileSize = Math.max(0, Number(data.fileSize || 0));

    const meta = resolveEvidenceFileMeta(
      this.fileName || this.fileUrl || this.summary,
      data.mimeType || "",
      this.fileSize
    );
    this.fileType = String(data.fileType || meta.ext || "").slice(0, 32);
    this.isArchive = Boolean(data.isArchive !== undefined ? data.isArchive : meta.isArchive);
    this.checklistPassed = Boolean(data.checklistPassed !== false);
  }

  isValid() {
    return this.docNumber.trim().length > 0 && this.summary.trim().length > 0;
  }

  toJSON() {
    return {
      docNumber: this.docNumber,
      issueDate: this.issueDate,
      summary: this.summary,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      fileType: this.fileType,
      fileSize: this.fileSize,
      isArchive: this.isArchive,
      checklistPassed: this.checklistPassed
    };
  }
}

/**
 * 2. Lớp cơ sở Trừu tượng & Đóng gói (BaseCriterion)
 */
export class BaseCriterion {
  constructor(raw = {}) {
    this.id = String(raw.id || raw.code || "").trim();
    this.code = String(raw.code || raw.id || "").trim();
    this.domainId = raw.domainId || "I";
    this.year = Number(raw.year || EVALUATION_YEAR);
    this.subGroup = raw.subGroup || "standard"; // 'standard' | 'bonus' | 'penalty'
    this.groupTitle = raw.groupTitle || "Nhóm tiêu chí đánh giá";
    this.title = raw.title || "";
    this.maxScore = Number(raw.maxScore || 0);
    this.selfScore = Number(raw.selfScore ?? 0);
    this.verifiedScore = Number(raw.verifiedScore ?? this.selfScore);
    this.type = raw.type || "boolean";
    this.formulaType = raw.formulaType || null;
    this.formulaConfig = raw.formulaConfig ? JSON.parse(JSON.stringify(raw.formulaConfig)) : {};
    this.assignedDept = raw.assignedDept || "Phòng Văn hóa – Xã hội phường";
    this.coordinatingDepts = Array.isArray(raw.coordinatingDepts) ? [...raw.coordinatingDepts] : [];
    this.deadline = raw.deadline || `Năm ${this.year}`;
    this.status = raw.status || "pending"; // 'pending' | 'in_progress' | 'completed' | 'warning'
    this.regulationText = raw.regulationText || "";
    this.warningNote = raw.warningNote || "";
    this.inputs = raw.inputs ? { ...raw.inputs } : {};
    this.evidences = Array.isArray(raw.evidences)
      ? raw.evidences.map((ev) => (ev instanceof EvidenceItem ? ev : new EvidenceItem(ev)))
      : [];
    this.notes = raw.notes || "";
    this.updatedBy = raw.updatedBy || "UBND Phường Hội An Đông";
    this.updatedAt = raw.updatedAt || new Date().toISOString();
    this.dynamicWarning = "";
  }

  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    return this.selfScore;
  }

  computeScore(inputs = this.inputs) {
    return this.calculateScore(inputs);
  }

  validateEvidence() {
    if (this.subGroup === "penalty") {
      return true;
    }
    return this.evidences.length > 0 && this.evidences.every((e) => e.isValid());
  }

  getCompletionPercentage() {
    if (this.subGroup === "penalty") {
      return this.selfScore === 0 ? 100 : 0;
    }
    if (this.maxScore <= 0) return 0;
    return Math.min(100, Math.round((this.selfScore / this.maxScore) * 100));
  }

  isEvaluated() {
    return (
      this.status !== "pending" ||
      this.selfScore > 0 ||
      this.evidences.length > 0 ||
      Object.keys(this.inputs || {}).length > 0
    );
  }

  isAtRisk() {
    if (this.subGroup === "penalty") {
      return this.selfScore > 0;
    }
    if (!this.isEvaluated()) {
      return false;
    }
    if (this.status === "warning") return true;
    if (this.selfScore < this.maxScore && this.subGroup !== "bonus") return true;
    if (this.selfScore > 0 && !this.validateEvidence()) return true;
    return false;
  }

  getRiskReason() {
    if (this.subGroup === "penalty" && this.selfScore > 0) {
      return `Phát sinh điểm trừ (-${this.selfScore.toFixed(2)}đ) - Cần chấn chỉnh và khắc phục ngay`;
    }
    if (this.dynamicWarning) {
      return this.dynamicWarning;
    }
    if (this.selfScore < this.maxScore && this.subGroup !== "bonus") {
      const lost = (this.maxScore - this.selfScore).toFixed(2);
      return `Đang hụt ${lost} điểm so với điểm tối đa (${this.selfScore.toFixed(2)}/${this.maxScore.toFixed(2)}đ)`;
    }
    if (this.selfScore > 0 && !this.validateEvidence()) {
      return "Đã chấm điểm nhưng chưa đính kèm văn bản/tài liệu kiểm chứng hợp lệ";
    }
    return "";
  }

  getFirestoreDocId(year = this.year) {
    const cleanId = String(this.id).replace(/[^a-zA-Z0-9_.\-]/g, "_").slice(0, 50);
    return Number(year) === 2026 ? cleanId : `${year}_${cleanId}`;
  }

  toFirestoreJSON(year = this.year) {
    const docId = this.getFirestoreDocId(year);
    return {
      id: String(docId).slice(0, 64),
      code: String(this.code).slice(0, 32),
      domainId: String(this.domainId),
      year: Number(year || EVALUATION_YEAR),
      subGroup: String(this.subGroup || "standard"),
      groupTitle: String(this.groupTitle || "").slice(0, 500),
      title: String(this.title || "").slice(0, 1000),
      maxScore: Number(Number(this.maxScore || 0).toFixed(2)),
      type: String(this.type || "boolean").slice(0, 32),
      selfScore: Number(Number(this.selfScore).toFixed(2)),
      verifiedScore: Number(Number(this.verifiedScore).toFixed(2)),
      status: String(this.status),
      assignedDept: String(this.assignedDept).slice(0, 200),
      deadline: String(this.deadline).slice(0, 64),
      regulationText: String(this.regulationText || "").slice(0, 3000),
      warningNote: String(this.warningNote || "").slice(0, 2000),
      inputs: this.inputs || {},
      evidences: this.evidences.slice(0, 50).map((e) => e.toJSON()),
      notes: String(this.notes || "").slice(0, 2000),
      updatedBy: String(this.updatedBy || "Chuyên viên CCHC").slice(0, 128),
      updatedAt: String(this.updatedAt || new Date().toISOString()).slice(0, 64)
    };
  }

  toFullJSON() {
    return {
      ...this.toFirestoreJSON(this.year),
      id: this.id,
      formulaType: this.formulaType,
      formulaConfig: this.formulaConfig,
      coordinatingDepts: this.coordinatingDepts
    };
  }
}

/**
 * 3. Lớp kế thừa: BooleanCriterion (Đạt / Không đạt)
 */
export class BooleanCriterion extends BaseCriterion {
  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    const achieved = Boolean(this.inputs.achieved);
    this.selfScore = achieved ? this.maxScore : 0.0;
    this.dynamicWarning = achieved ? "" : "Chưa đạt yêu cầu của tiêu chí (0 điểm).";
    return this.selfScore;
  }
}

/**
 * 4. Lớp kế thừa: TieredCriterion (Chấm điểm theo bậc thang / ngưỡng điều kiện)
 */
export class TieredCriterion extends BaseCriterion {
  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    const tiers = this.formulaConfig?.tiers || [];
    if (!this.inputs.selectedTier) {
      this.selfScore = 0.0;
      this.dynamicWarning = "";
      return this.selfScore;
    }
    const found = tiers.find((t) => t.key === this.inputs.selectedTier);
    if (found) {
      this.selfScore = Number(found.score);
      if (this.selfScore < this.maxScore && this.subGroup !== "bonus") {
        this.dynamicWarning = `Đang ở bậc '${found.label}' (${this.selfScore}/${this.maxScore}đ).`;
      } else {
        this.dynamicWarning = "";
      }
    } else {
      this.selfScore = 0.0;
    }
    return this.selfScore;
  }
}

/**
 * 5. Lớp kế thừa: ChecklistCriterion (Chấm điểm tổng hợp theo danh mục thành phần)
 */
export class ChecklistCriterion extends BaseCriterion {
  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    const items = this.formulaConfig?.items || [];
    let sum = 0;
    const missingLabels = [];
    for (const item of items) {
      if (this.inputs[item.key]) {
        sum += Number(item.score || 0);
      } else {
        missingLabels.push(item.label);
      }
    }
    const allChecked = items.length > 0 && missingLabels.length === 0;
    this.selfScore = allChecked ? this.maxScore : Math.min(this.maxScore, Number(sum.toFixed(2)));

    if (missingLabels.length > 0) {
      if (this.formulaConfig?.allRequiredForScore && this.selfScore > 0) {
        this.dynamicWarning = `Đã đạt ${items.length - missingLabels.length}/${items.length} thành phần (${this.selfScore.toFixed(2)}/${this.maxScore.toFixed(2)}đ). Lưu ý bổ sung đủ cả ${items.length} thành phần để đạt tối đa khi thẩm định.`;
      } else {
        this.dynamicWarning = `Chưa hoàn thành ${missingLabels.length} nội dung thành phần.`;
      }
    } else {
      this.dynamicWarning = "";
    }
    return this.selfScore;
  }
}

/**
 * 6. Lớp kế thừa: FormulaCriterion (Chấm điểm theo công thức toán học tỷ lệ b/a hoặc % thực tế)
 */
export class FormulaCriterion extends BaseCriterion {
  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    this.dynamicWarning = "";

    switch (this.formulaType) {
      case "plan_completion": {
        const b = Math.max(0, Number(this.inputs.b || 0));
        const a = Math.max(1, Number(this.inputs.a || 1));
        const c = Math.max(0, Number(this.inputs.c || 0));
        const ratio = b / (a + c);
        if (ratio >= 1.0) {
          this.selfScore = this.maxScore;
        } else if (ratio >= 0.8) {
          this.selfScore = Number((ratio * 1.0).toFixed(2));
          this.dynamicWarning = `Tỷ lệ hoàn thành đạt ${(ratio * 100).toFixed(1)}% (<100%), điểm bị giảm mạnh theo công thức R * 1,0đ = ${this.selfScore}đ!`;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Tỷ lệ hoàn thành đạt ${(ratio * 100).toFixed(1)}% (<80%), bị chấm 0 điểm!`;
        }
        break;
      }

      case "web_views_threshold": {
        const views = Number(this.inputs.views || 0);
        if (views > 500) {
          this.selfScore = this.maxScore;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Lượt truy cập chuyên mục CCHC hiện tại (${views} lượt) chưa vượt quá 500 lượt -> 0 điểm!`;
        }
        break;
      }

      case "video_views_quality": {
        const views = Number(this.inputs.views || 0);
        const isMonotonous = Number(this.inputs.isMonotonous || 0) === 1;
        if (views < 500) {
          this.selfScore = 0.0;
          this.dynamicWarning = `Video clip tuyên truyền mới đạt ${views} lượt xem (< 500 lượt) -> 0 điểm!`;
        } else if (isMonotonous) {
          this.selfScore = Number((this.maxScore * 0.5).toFixed(2));
          this.dynamicWarning =
            "Video clip đã đạt >= 500 lượt xem nhưng mới chỉ quay màn hình đơn điệu -> Chỉ được chấm nửa số điểm (0,5/1,0đ). Cần bổ sung thuyết minh/phụ đề!";
        } else {
          this.selfScore = this.maxScore;
        }
        break;
      }

      case "ontime_dossier_rate": {
        const b = Math.max(0, Number(this.inputs.b || 0));
        const a = Math.max(1, Number(this.inputs.a || 1));
        const pct = (b / a) * 100;
        if (pct >= 98) {
          this.selfScore = 2.0;
        } else if (pct >= 95) {
          this.selfScore = 1.5;
          this.dynamicWarning = `Tỷ lệ hồ sơ đúng hạn đạt ${pct.toFixed(2)}% (< 98% theo QĐ 2851/QĐ-UBND) -> Mất 0,5 điểm!`;
        } else if (pct >= 90) {
          this.selfScore = 1.0;
          this.dynamicWarning = `Tỷ lệ hồ sơ đúng hạn đạt ${pct.toFixed(2)}% (90% - <95%) -> Mất 1,0 điểm!`;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Tỷ lệ hồ sơ đúng hạn dưới 90% (${pct.toFixed(2)}%) -> 0 điểm!`;
        }
        break;
      }

      case "ratio_ba": {
        const a = Number(this.inputs.a ?? 0);
        const b = Number(this.inputs.b ?? 0);
        if (a <= 0) {
          this.selfScore = 0.0;
          this.dynamicWarning = "Chưa nhập tổng số mẫu số (a > 0) để tính tỷ lệ b/a.";
        } else {
          const ratio = Math.min(1, Math.max(0, b / a));
          this.selfScore = Number((ratio * this.maxScore).toFixed(2));
          if (ratio < 1) {
            this.dynamicWarning = `Tỷ lệ b/a đạt ${(ratio * 100).toFixed(2)}% (${b}/${a}) -> Điểm đạt ${this.selfScore}/${this.maxScore}đ.`;
          }
        }
        break;
      }

      case "cbccvc_software_rate": {
        const a = Math.max(1, Number(this.inputs.a || 1));
        const b = Math.max(0, Number(this.inputs.b || 0));
        const ratio = b / a;
        if (ratio >= 1.0) {
          this.selfScore = 2.0;
        } else if (ratio >= 0.8) {
          this.selfScore = Number((ratio * 1.0).toFixed(2));
          this.dynamicWarning = `Hồ sơ CBCCVC xác thực đạt ${(ratio * 100).toFixed(1)}% (<100%) -> Bị tính theo Tỷ lệ * 1,0đ = ${this.selfScore}đ!`;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Hồ sơ CBCCVC xác thực dưới 80% -> 0 điểm!`;
        }
        break;
      }

      case "monthly_eval_software":
      case "yearly_eval_software": {
        const lateMonths = Number(this.inputs.lateMonths || 0);
        const isFlatOrTooHigh = Number(this.inputs.isFlatOrTooHigh || 0) === 1;
        let rawScore = 0;
        if (lateMonths <= 0) {
          rawScore = this.maxScore;
        } else if (lateMonths === 1) {
          rawScore = 1.0;
          this.dynamicWarning = "Có 01 tháng đánh giá trễ hạn hoặc không đầy đủ -> Chỉ đạt 1,0 điểm.";
        } else {
          rawScore = 0.0;
          this.dynamicWarning = "Có nhiều hơn 01 tháng đánh giá trễ hạn hoặc không đầy đủ -> 0 điểm!";
        }
        if (isFlatOrTooHigh && rawScore > 0.5) {
          rawScore = 0.5;
          this.dynamicWarning =
            "CẢNH BÁO: Tỷ lệ Xuất sắc quá cao hoặc đánh giá cào bằng mức Tốt các tháng -> Bị khống chế tối đa 0,5 điểm!";
        }
        this.selfScore = rawScore;
        break;
      }

      case "budget_revenue_rate": {
        const a = Math.max(0.01, Number(this.inputs.a || 1));
        const b = Math.max(0, Number(this.inputs.b || 0));
        const pct = (b / a) * 100;
        if (pct >= 100) {
          this.selfScore = 1.0;
        } else if (pct >= 80) {
          this.selfScore = 0.5;
          this.dynamicWarning = `Thu NSNN hiện đạt ${pct.toFixed(1)}% chỉ tiêu TP giao (80% - <100%) -> Đạt 0,5/1,0đ.`;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Thu NSNN hiện đạt ${pct.toFixed(1)}% (< 80% chỉ tiêu) -> 0 điểm!`;
        }
        break;
      }

      case "percentage_linear": {
        const a = Math.max(1, Number(this.inputs.a || 1));
        const b = Math.max(0, Number(this.inputs.b || 0));
        const ratio = Math.min(1, b / a);
        this.selfScore = Number((ratio * this.maxScore).toFixed(2));
        if (ratio < 1) {
          this.dynamicWarning = `Đạt ${b}/${a} văn bản (${(ratio * 100).toFixed(1)}%) -> Điểm tính theo tỷ lệ: ${this.selfScore}/${this.maxScore}đ.`;
        }
        break;
      }

      case "threshold_90_percent": {
        const a = Math.max(1, Number(this.inputs.a || 1));
        const b = Math.max(0, Number(this.inputs.b || 0));
        const pct = (b / a) * 100;
        if (pct > 90) {
          this.selfScore = this.maxScore;
        } else {
          this.selfScore = 0.0;
          this.dynamicWarning = `Tỷ lệ văn bản đi có kết nối công việc đạt ${pct.toFixed(2)}% (<= 90%) -> Không đạt điểm!`;
        }
        break;
      }

      case "specialized_software": {
        const count = Math.max(0, Number(this.inputs.validSoftwareCount || 0));
        this.selfScore = Math.min(2.0, Number((count * 1.0).toFixed(2)));
        if (this.selfScore < 2.0) {
          this.dynamicWarning = `Hiện có ${count} phần mềm chuyên ngành đủ 04 yếu tố hồ sơ (${this.selfScore}/2,0đ).`;
        }
        break;
      }

      case "digitization_rates": {
        const dig = Number(this.inputs.digitizedRate || 0);
        const reuse = Number(this.inputs.reusedRate || 0);
        let score = 0;
        const warns = [];
        if (dig >= 80) score += 0.5;
        else warns.push(`Số hóa hồ sơ đạt ${dig}% (< 80%)`);
        if (reuse >= 30) score += 0.5;
        else warns.push(`Tái sử dụng dữ liệu số hóa đạt ${reuse}% (< 30%)`);
        this.selfScore = score;
        this.dynamicWarning = warns.join("; ");
        break;
      }

      case "ai_applications": {
        const onlyCityAI = Number(this.inputs.onlyCityAI || 0) === 1;
        const staff = Number(this.inputs.aiForStaff || 0) > 0 ? 1.0 : 0.0;
        const citizen = Number(this.inputs.aiForCitizen || 0) > 0 ? 1.0 : 0.0;
        const advanced = Number(this.inputs.aiAdvanced || 0) > 0 ? 1.0 : 0.0;
        const rawScore = Number((staff + citizen + advanced).toFixed(2));

        if (onlyCityAI) {
          this.selfScore = rawScore > 0 ? Math.min(1.0, rawScore) : 1.0;
          this.dynamicWarning =
            "Đơn vị đang chọn 'Chỉ triển khai ứng dụng AI của TP' (Nguồn = 1) nên chỉ được tính tối đa 1,00/3,00 điểm. Nếu do Phường tự xây dựng, hãy chọn '0 = Phường tự xây dựng' để được cộng đủ tối đa 3,00 điểm.";
        } else {
          this.selfScore = Math.min(this.maxScore, rawScore);
          if (this.selfScore < this.maxScore) {
            this.dynamicWarning = `Đã đạt ${rawScore}/3 nội dung ứng dụng AI do đơn vị tự xây dựng (${this.selfScore.toFixed(2)}/${this.maxScore.toFixed(2)}đ).`;
          }
        }
        break;
      }

      case "satisfaction_survey": {
        const rate = Math.min(100, Math.max(0, Number(this.inputs.satisfactionRate || 0)));
        this.selfScore = Number(((rate * this.maxScore) / 100).toFixed(2));
        break;
      }

      default: {
        // Hỗ trợ tiêu chí công thức tùy chỉnh (nhập tỷ lệ % hoàn thành 0-100)
        const pct = Math.min(100, Math.max(0, Number(this.inputs.customPercent || 0)));
        this.selfScore = Number(((pct * this.maxScore) / 100).toFixed(2));
        break;
      }
    }

    return this.selfScore;
  }
}

/**
 * 7. Lớp kế thừa: BonusPenaltyCriterion (Lĩnh vực IX - Điểm thưởng & Điểm trừ)
 */
export class BonusPenaltyCriterion extends BaseCriterion {
  calculateScore(inputData = this.inputs) {
    this.inputs = { ...this.inputs, ...inputData };
    if (this.subGroup === "penalty") {
      const violated = Boolean(this.inputs.violated);
      this.selfScore = violated ? this.maxScore : 0.0;
      if (violated) {
        this.status = "warning";
        this.dynamicWarning = `CẢNH BÁO ĐỎ: Đang phát sinh vi phạm bị trừ ${this.maxScore.toFixed(1)} điểm tại tiêu chí ${this.code}!`;
      } else {
        this.dynamicWarning = "";
      }
      return this.selfScore;
    }
    return this.selfScore;
  }
}

/**
 * Factory khởi tạo đúng lớp con đa hình cho từng tiêu chí
 */
export function createCriterionInstance(raw) {
  let instance;
  if (raw.type === "penalty" || raw.subGroup === "penalty") {
    instance = new BonusPenaltyCriterion({ ...raw, type: "penalty", subGroup: "penalty" });
  } else if (raw.type === "boolean") {
    instance = new BooleanCriterion(raw);
  } else if (raw.type === "tiered") {
    instance = new TieredCriterion(raw);
  } else if (raw.type === "checklist") {
    instance = new ChecklistCriterion(raw);
  } else if (raw.type === "formula") {
    instance = new FormulaCriterion(raw);
  } else {
    instance = new BaseCriterion(raw);
  }
  if (raw.inputs && Object.keys(raw.inputs).length > 0) {
    instance.calculateScore(raw.inputs);
  } else {
    instance.selfScore = Number(raw.selfScore || 0);
    instance.verifiedScore = Number(raw.verifiedScore || 0);
    instance.dynamicWarning = "";
  }
  return instance;
}

/**
 * 8. Lớp quản lý Nhóm Lĩnh vực (DomainGroup)
 */
export class DomainGroup {
  constructor(meta, criteriaList = []) {
    this.id = meta.id;
    this.code = meta.code;
    this.name = meta.name;
    this.shortName = meta.shortName;
    const computedMax = Number(
      criteriaList
        .filter((c) => c.subGroup !== "penalty")
        .reduce((acc, c) => acc + c.maxScore, 0)
        .toFixed(2)
    );
    this.maxScore = meta.id === "IX" ? 10.0 : computedMax > 0 ? computedMax : meta.maxScore;
    this.leadDept = meta.leadDept;
    this.keyControlNote = meta.keyControlNote;
    this.criteria = criteriaList;
  }

  getSummary() {
    if (this.id === "IX") {
      const bonusCriteria = this.criteria.filter((c) => c.subGroup === "bonus");
      const penaltyCriteria = this.criteria.filter((c) => c.subGroup === "penalty");
      const bonusSelf = Math.min(
        10.0,
        Number(bonusCriteria.reduce((acc, c) => acc + c.selfScore, 0).toFixed(2))
      );
      const bonusVerified = Math.min(
        10.0,
        Number(bonusCriteria.reduce((acc, c) => acc + c.verifiedScore, 0).toFixed(2))
      );
      const penaltySelf = Math.min(
        10.0,
        Number(penaltyCriteria.reduce((acc, c) => acc + c.selfScore, 0).toFixed(2))
      );
      const penaltyVerified = Math.min(
        10.0,
        Number(penaltyCriteria.reduce((acc, c) => acc + c.verifiedScore, 0).toFixed(2))
      );
      const withEvidence = bonusCriteria.filter((c) => c.validateEvidence()).length;
      return {
        domainId: this.id,
        name: this.name,
        shortName: this.shortName,
        maxScore: 10.0,
        selfScore: Number((bonusSelf - penaltySelf).toFixed(2)),
        verifiedScore: Number((bonusVerified - penaltyVerified).toFixed(2)),
        bonusSelf,
        penaltySelf,
        criteriaCount: this.criteria.length,
        evidenceRate: bonusCriteria.length
          ? Math.round((withEvidence / bonusCriteria.length) * 100)
          : 0
      };
    }

    const selfScore = Number(this.criteria.reduce((acc, c) => acc + c.selfScore, 0).toFixed(2));
    const verifiedScore = Number(
      this.criteria.reduce((acc, c) => acc + c.verifiedScore, 0).toFixed(2)
    );
    const withEvidence = this.criteria.filter((c) => c.validateEvidence()).length;
    const evidenceRate = this.criteria.length
      ? Math.round((withEvidence / this.criteria.length) * 100)
      : 0;
    const achieveRate = this.maxScore > 0 ? Math.round((selfScore / this.maxScore) * 100) : 0;

    return {
      domainId: this.id,
      code: this.code,
      name: this.name,
      shortName: this.shortName,
      leadDept: this.leadDept,
      keyControlNote: this.keyControlNote,
      maxScore: this.maxScore,
      selfScore,
      verifiedScore,
      achieveRate,
      criteriaCount: this.criteria.length,
      withEvidenceCount: withEvidence,
      evidenceRate
    };
  }
}

/**
 * 9. Lớp Bộ điều khiển Nghiệp vụ Trung tâm (CCHCManager) - Hỗ trợ Đa năm & Quản trị Tiêu chí
 */
export class CCHCManager {
  constructor(initialCriteria = [], initialYear = EVALUATION_YEAR) {
    this.activeYear = Number(initialYear || EVALUATION_YEAR);
    this.availableYears = [this.activeYear];
    this.yearsDataMap = new Map();
    this.criteriaMap = new Map();
    this.setCriteriaList(initialCriteria, this.activeYear);
  }

  setCriteriaList(rawList = [], year = this.activeYear) {
    const targetYear = Number(year || this.activeYear);
    const mapForYear = new Map();
    for (const item of rawList) {
      const rawWithYear = { ...item, year: targetYear };
      // Chuẩn hóa ID gốc (bỏ tiền tố năm nếu có)
      if (String(rawWithYear.id).startsWith(`${targetYear}_`)) {
        rawWithYear.id = String(rawWithYear.id).slice(`${targetYear}_`.length);
      }
      const instance =
        item instanceof BaseCriterion ? item : createCriterionInstance(rawWithYear);
      instance.year = targetYear;
      mapForYear.set(instance.id, instance);
    }
    this.yearsDataMap.set(targetYear, mapForYear);
    if (!this.availableYears.includes(targetYear)) {
      this.availableYears.push(targetYear);
      this.availableYears.sort((a, b) => b - a);
    }
    if (targetYear === this.activeYear) {
      this.criteriaMap = mapForYear;
    }
  }

  switchYear(year, baselineCriteria = []) {
    const targetYear = Number(year);
    if (!this.yearsDataMap.has(targetYear)) {
      this.setCriteriaList(baselineCriteria, targetYear);
    }
    this.activeYear = targetYear;
    this.criteriaMap = this.yearsDataMap.get(targetYear);
    if (!this.availableYears.includes(targetYear)) {
      this.availableYears.push(targetYear);
      this.availableYears.sort((a, b) => b - a);
    }
  }

  createNewYear(newYear, cloneFromCurrent = false, baselineCriteria = []) {
    const targetYear = Number(newYear);
    if (isNaN(targetYear) || targetYear < 2020 || targetYear > 2050) {
      throw new Error("Năm chấm điểm phải nằm trong khoảng từ 2020 đến 2050.");
    }
    const sourceList = cloneFromCurrent
      ? this.getAllCriteria().map((c) => ({
          ...c.toFullJSON(),
          year: targetYear,
          deadline: `Năm ${targetYear}`,
          selfScore: 0,
          verifiedScore: 0,
          status: "pending",
          inputs: {},
          evidences: [],
          notes: ""
        }))
      : baselineCriteria.map((c) => ({
          ...c,
          year: targetYear,
          deadline: c.deadline?.includes("2026")
            ? c.deadline.replace("2026", String(targetYear))
            : `Năm ${targetYear}`,
          selfScore: 0,
          verifiedScore: 0,
          status: "pending",
          inputs: {},
          evidences: [],
          notes: ""
        }));

    this.setCriteriaList(sourceList, targetYear);
    this.switchYear(targetYear, baselineCriteria);
    return this.getAllCriteria();
  }

  deleteYear(yearToDelete) {
    const targetYear = Number(yearToDelete);
    if (this.availableYears.length <= 1) {
      throw new Error("Hệ thống phải giữ lại tối thiểu 01 năm chấm điểm.");
    }
    this.yearsDataMap.delete(targetYear);
    this.availableYears = this.availableYears.filter((y) => y !== targetYear);
    if (this.activeYear === targetYear) {
      this.activeYear = this.availableYears[0];
      this.criteriaMap = this.yearsDataMap.get(this.activeYear);
    }
  }

  upsertCriterionDefinition(defData) {
    const id = String(defData.id || defData.code || "").trim();
    const code = String(defData.code || id).trim();
    if (!id || !code) {
      throw new Error("Vui lòng nhập Mã tiêu chí hợp lệ.");
    }

    const existing = this.criteriaMap.get(id);
    if (existing) {
      existing.code = code;
      existing.domainId = defData.domainId || existing.domainId;
      existing.subGroup = defData.subGroup || existing.subGroup;
      existing.groupTitle = defData.groupTitle || existing.groupTitle;
      existing.title = defData.title || existing.title;
      existing.maxScore = Number(defData.maxScore ?? existing.maxScore);
      existing.assignedDept = defData.assignedDept || existing.assignedDept;
      existing.deadline = defData.deadline || existing.deadline;
      existing.regulationText = defData.regulationText ?? existing.regulationText;
      existing.warningNote = defData.warningNote ?? existing.warningNote;
      if (defData.type && defData.type !== existing.type) {
        const rebuilt = createCriterionInstance({
          ...existing.toFullJSON(),
          type: defData.type,
          subGroup: defData.subGroup || existing.subGroup,
          maxScore: Number(defData.maxScore ?? existing.maxScore)
        });
        this.criteriaMap.set(id, rebuilt);
        return rebuilt;
      }
      if (existing.isEvaluated()) {
        existing.calculateScore(existing.inputs);
      }
      return existing;
    }

    const type = defData.subGroup === "penalty" ? "penalty" : defData.type || "boolean";
    const newInstance = createCriterionInstance({
      id,
      code,
      domainId: defData.domainId || "I",
      year: this.activeYear,
      subGroup: defData.subGroup || "standard",
      groupTitle: defData.groupTitle || "Tiêu chí bổ sung",
      title: defData.title || "",
      maxScore: Number(defData.maxScore || 1.0),
      type,
      formulaType: type === "formula" ? "custom_percent" : null,
      formulaConfig:
        type === "formula"
          ? {
              fields: [
                {
                  name: "customPercent",
                  label: "Tỷ lệ hoàn thành thực tế (%)",
                  default: 0
                }
              ]
            }
          : type === "tiered"
          ? {
              tiers: [
                {
                  key: "full",
                  label: "Đạt 100% yêu cầu của tiêu chí",
                  score: Number(defData.maxScore || 1.0)
                },
                {
                  key: "partial",
                  label: "Đạt một phần yêu cầu (50% số điểm)",
                  score: Number((Number(defData.maxScore || 1.0) * 0.5).toFixed(2))
                },
                {
                  key: "none",
                  label: "Chưa đạt yêu cầu (0 điểm)",
                  score: 0
                }
              ]
            }
          : {},
      assignedDept: defData.assignedDept || "Phòng Văn hóa – Xã hội phường",
      coordinatingDepts: [],
      deadline: defData.deadline || `Năm ${this.activeYear}`,
      status: "pending",
      regulationText: defData.regulationText || "Chấm điểm theo kết quả thẩm định thực tế.",
      warningNote: defData.warningNote || "",
      inputs: {},
      evidences: [],
      notes: ""
    });

    this.criteriaMap.set(id, newInstance);
    return newInstance;
  }

  deleteCriterionById(id) {
    const target = this.criteriaMap.get(id);
    if (!target) return null;
    this.criteriaMap.delete(id);
    return target;
  }

  getAllCriteria() {
    return Array.from(this.criteriaMap.values());
  }

  getCriterionById(id) {
    return this.criteriaMap.get(id) || null;
  }

  updateCriterionFromSnapshot(docData) {
    if (!docData || !docData.id) return;
    const docYear = Number(docData.year || 2026);
    if (docYear !== this.activeYear) return;

    const rawId = String(docData.id).startsWith(`${docYear}_`)
      ? String(docData.id).slice(`${docYear}_`.length)
      : String(docData.id);

    let existing = this.criteriaMap.get(rawId);
    if (!existing && docData.title) {
      // Nếu là tiêu chí mới do người dùng thêm từ Cài đặt
      existing = createCriterionInstance({
        ...docData,
        id: rawId
      });
      this.criteriaMap.set(rawId, existing);
    }
    if (existing) {
      if (docData.code) existing.code = docData.code;
      if (docData.domainId) existing.domainId = docData.domainId;
      if (docData.subGroup) existing.subGroup = docData.subGroup;
      if (docData.groupTitle) existing.groupTitle = docData.groupTitle;
      if (docData.title) existing.title = docData.title;
      if (typeof docData.maxScore === "number") existing.maxScore = docData.maxScore;
      if (docData.regulationText !== undefined) existing.regulationText = docData.regulationText;
      if (docData.warningNote !== undefined) existing.warningNote = docData.warningNote;
      existing.assignedDept = docData.assignedDept || existing.assignedDept;
      existing.deadline = docData.deadline || existing.deadline;
      existing.status = docData.status || existing.status;
      existing.notes = docData.notes ?? existing.notes;
      existing.updatedBy = docData.updatedBy || existing.updatedBy;
      existing.updatedAt = docData.updatedAt || existing.updatedAt;
      if (docData.inputs && Object.keys(docData.inputs).length > 0) {
        existing.calculateScore(docData.inputs);
        existing.verifiedScore = existing.selfScore;
      } else {
        existing.inputs = {};
        existing.selfScore = Number(docData.selfScore || 0);
        existing.verifiedScore =
          typeof docData.verifiedScore === "number" ? docData.verifiedScore : existing.selfScore;
        existing.dynamicWarning = "";
      }
      if (Array.isArray(docData.evidences)) {
        existing.evidences = docData.evidences.map((ev) => new EvidenceItem(ev));
      }
    }
  }

  getDomainGroups() {
    const all = this.getAllCriteria();
    return DOMAINS_META.map((meta) => {
      const list = all.filter((c) => c.domainId === meta.id);
      return new DomainGroup(meta, list);
    });
  }

  getOverallMetrics() {
    const all = this.getAllCriteria();
    const standardCriteria = all.filter((c) => c.domainId !== "IX");
    const bonusCriteria = all.filter((c) => c.domainId === "IX" && c.subGroup === "bonus");
    const penaltyCriteria = all.filter((c) => c.domainId === "IX" && c.subGroup === "penalty");

    const baseMaxScore = Number(
      standardCriteria.reduce((sum, c) => sum + c.maxScore, 0).toFixed(2)
    );
    const totalSelfScore = Number(
      standardCriteria.reduce((sum, c) => sum + c.selfScore, 0).toFixed(2)
    );
    const totalVerifiedScore = Number(
      standardCriteria.reduce((sum, c) => sum + c.verifiedScore, 0).toFixed(2)
    );

    const bonusScore = Math.min(
      10.0,
      Number(bonusCriteria.reduce((sum, c) => sum + c.selfScore, 0).toFixed(2))
    );
    const penaltyScore = Math.min(
      10.0,
      Number(penaltyCriteria.reduce((sum, c) => sum + c.selfScore, 0).toFixed(2))
    );

    const rawFinalScore = Number((totalSelfScore + bonusScore - penaltyScore).toFixed(2));
    const finalScore = Math.max(0, rawFinalScore);

    const activeCriteriaForEvidence = [
      ...standardCriteria,
      ...bonusCriteria.filter((c) => c.selfScore > 0)
    ];
    const validEvidenceCount = activeCriteriaForEvidence.filter((c) => c.validateEvidence()).length;
    const evidenceRate = activeCriteriaForEvidence.length
      ? Math.round((validEvidenceCount / activeCriteriaForEvidence.length) * 100)
      : 0;

    const evaluatedCount = standardCriteria.filter((c) => c.isEvaluated()).length;
    const completedCount = standardCriteria.filter(
      (c) => c.selfScore >= c.maxScore && c.validateEvidence()
    ).length;

    const rankingInfo = getRankingGrade(Math.min(100, finalScore), evaluatedCount);

    return {
      year: this.activeYear,
      baseMaxScore: baseMaxScore > 0 ? baseMaxScore : 100.0,
      totalSelfScore,
      totalVerifiedScore,
      bonusScore,
      penaltyScore,
      finalScore,
      evidenceRate,
      validEvidenceCount,
      totalActiveEvidenceCriteria: activeCriteriaForEvidence.length,
      evaluatedCount,
      completedCount,
      totalStandardCriteria: standardCriteria.length,
      rankingInfo
    };
  }

  getDepartmentAnalytics() {
    const deptNames = [
      "Phòng Văn hóa – Xã hội phường",
      "Văn phòng HĐND-UBND phường",
      "Trung tâm Phục vụ hành chính công phường",
      "Phòng Kinh tế, Hạ tầng và Đô thị phường",
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ];

    const all = this.getAllCriteria();

    return deptNames.map((deptName) => {
      const leadCriteria = all.filter(
        (c) => c.assignedDept === deptName && c.subGroup !== "penalty"
      );
      const coordCriteria = all.filter(
        (c) =>
          c.assignedDept !== deptName &&
          c.subGroup !== "penalty" &&
          Array.isArray(c.coordinatingDepts) &&
          c.coordinatingDepts.some((d) => d.includes(deptName.replace(" phường", "")))
      );

      const basisCriteria = leadCriteria.length > 0 ? leadCriteria : coordCriteria;
      const maxPts = Number(basisCriteria.reduce((s, c) => s + c.maxScore, 0).toFixed(2));
      const selfPts = Number(basisCriteria.reduce((s, c) => s + c.selfScore, 0).toFixed(2));
      const evidenced = basisCriteria.filter((c) => c.validateEvidence()).length;
      const evidencePct = basisCriteria.length
        ? Math.round((evidenced / basisCriteria.length) * 100)
        : 0;
      const scorePct = maxPts > 0 ? Math.round((selfPts / maxPts) * 100) : 0;

      return {
        deptName,
        leadCount: leadCriteria.length,
        coordCount: coordCriteria.length,
        maxPts,
        selfPts,
        scorePct,
        evidenced,
        evidencePct,
        atRiskCount: basisCriteria.filter((c) => c.isAtRisk()).length
      };
    });
  }

  getRiskWarnings() {
    return this.getAllCriteria()
      .filter((c) => c.isAtRisk())
      .map((c) => ({
        criterion: c,
        reason: c.getRiskReason(),
        lostPoints:
          c.subGroup === "penalty"
            ? c.selfScore
            : Math.max(0, Number((c.maxScore - c.selfScore).toFixed(2)))
      }))
      .sort((a, b) => b.lostPoints - a.lostPoints);
  }

  filterCriteria({ domainId = "ALL", dept = "ALL", status = "ALL", search = "" } = {}) {
    const keyword = search.trim().toLowerCase();
    return this.getAllCriteria().filter((c) => {
      if (domainId !== "ALL" && c.domainId !== domainId) return false;
      if (dept !== "ALL") {
        const matchLead = c.assignedDept === dept;
        const matchCoord =
          Array.isArray(c.coordinatingDepts) &&
          c.coordinatingDepts.some((d) => d.includes(dept.replace(" phường", "")));
        if (!matchLead && !matchCoord) return false;
      }
      if (status === "PENDING" && c.isEvaluated()) return false;
      if (status === "RISK" && !c.isAtRisk()) return false;
      if (status === "MISSING_EVIDENCE" && c.validateEvidence()) return false;
      if (status === "COMPLETED" && (!c.isEvaluated() || c.isAtRisk() || !c.validateEvidence())) {
        return false;
      }
      if (status === "IN_PROGRESS" && c.status !== "in_progress") return false;

      if (keyword) {
        const hay = `${c.code} ${c.title} ${c.groupTitle} ${c.assignedDept} ${c.regulationText}`.toLowerCase();
        if (!hay.includes(keyword)) return false;
      }
      return true;
    });
  }

  exportFullBackup(systemConfig = {}) {
    const yearsData = {};
    for (const [yr, map] of this.yearsDataMap.entries()) {
      yearsData[yr] = Array.from(map.values()).map((c) => c.toFullJSON());
    }
    return {
      app: "CCHC_PAR_INDEX_HOI_AN_DONG",
      version: "3.0",
      exportedAt: new Date().toISOString(),
      activeYear: this.activeYear,
      availableYears: [...this.availableYears],
      systemConfig,
      yearsData
    };
  }

  importFullBackup(backupObj) {
    if (!backupObj || typeof backupObj !== "object" || !backupObj.yearsData) {
      throw new Error("Tệp sao lưu không đúng định dạng chuẩn JSON của Hệ thống CCHC.");
    }
    this.yearsDataMap.clear();
    this.availableYears = [];
    for (const [yrStr, criteriaArr] of Object.entries(backupObj.yearsData)) {
      const yr = Number(yrStr);
      if (!isNaN(yr) && Array.isArray(criteriaArr)) {
        this.setCriteriaList(criteriaArr, yr);
      }
    }
    const targetActive = Number(backupObj.activeYear || this.availableYears[0] || 2026);
    this.activeYear = this.yearsDataMap.has(targetActive)
      ? targetActive
      : this.availableYears[0] || 2026;
    this.criteriaMap = this.yearsDataMap.get(this.activeYear) || new Map();
    return {
      activeYear: this.activeYear,
      availableYears: this.availableYears,
      systemConfig: backupObj.systemConfig || null
    };
  }
}
