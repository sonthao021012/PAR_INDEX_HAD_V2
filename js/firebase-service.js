/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lớp kết nối Cloud Firestore Realtime, Auth, Google Apps Script Drive Upload & LocalStorage Fallback
 * Dự án Firebase: bau-cu-hoi-an-dong
 */

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocFromServer,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  where
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {
  FIREBASE_CONFIG,
  COLLECTIONS,
  LOCAL_STORAGE_KEYS,
  EVALUATION_YEAR,
  DEFAULT_SYSTEM_CONFIG
} from "./config.js";
import { resolveEvidenceFileMeta } from "./models.js";

const VALID_DOMAIN_IDS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

const OperationType = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LIST: "list",
  GET: "get",
  WRITE: "write"
};

function hasSimulatedLegacyData(docs = []) {
  return docs.some(
    (d) =>
      Array.isArray(d.evidences) &&
      d.evidences.some((ev) =>
        String(ev?.fileUrl || "").includes("https://drive.google.com/drive/folders/")
      )
  );
}

export class FirebaseRepository {
  static instance = null;

  static getInstance() {
    if (!FirebaseRepository.instance) {
      FirebaseRepository.instance = new FirebaseRepository();
    }
    return FirebaseRepository.instance;
  }

  constructor() {
    this.app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApps()[0];
    this.db = getFirestore(this.app, FIREBASE_CONFIG.firestoreDatabaseId);
    this.auth = getAuth(this.app);
    this.isConnected = false;
    this.unsubscribers = [];
    this.connectionListeners = [];
    this.authListeners = [];

    this.purgeLegacySimulatedCache();

    onAuthStateChanged(this.auth, (user) => {
      for (const cb of this.authListeners) {
        cb(user);
      }
    });

    this.testConnection();
  }

  purgeLegacySimulatedCache() {
    try {
      localStorage.removeItem("cchc_hoi_an_dong_2026_criteria_v1");
      localStorage.removeItem("cchc_hoi_an_dong_2026_summary_v1");
      localStorage.removeItem("cchc_hoi_an_dong_2026_tasks_v1");
      localStorage.removeItem("cchc_hoi_an_dong_2026_logs_v1");
    } catch {
      // Ignore storage errors
    }
  }

  getCriteriaCacheKey(year = EVALUATION_YEAR) {
    return `${LOCAL_STORAGE_KEYS.CRITERIA_PREFIX}${year}`;
  }

  getSummaryCacheKey(year = EVALUATION_YEAR) {
    return `${LOCAL_STORAGE_KEYS.SUMMARY_PREFIX}${year}`;
  }

  async testConnection() {
    try {
      await getDocFromServer(doc(this.db, "test", "connection"));
      this.setConnectionStatus(true);
    } catch (error) {
      if (error instanceof Error && error.message.includes("the client is offline")) {
        console.error("Please check your Firebase configuration.");
        this.setConnectionStatus(false);
      } else {
        this.setConnectionStatus(true);
      }
    }
  }

  setConnectionStatus(status) {
    this.isConnected = status;
    for (const cb of this.connectionListeners) {
      cb(status);
    }
  }

  onConnectionChange(callback) {
    this.connectionListeners.push(callback);
    callback(this.isConnected);
  }

  onUserChange(callback) {
    this.authListeners.push(callback);
    callback(this.auth.currentUser);
  }

  handleFirestoreError(error, operationType, path) {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: this.auth.currentUser?.uid || null,
        email: this.auth.currentUser?.email || null,
        emailVerified: this.auth.currentUser?.emailVerified || null,
        isAnonymous: this.auth.currentUser?.isAnonymous || null,
        tenantId: this.auth.currentUser?.tenantId || null,
        providerInfo:
          this.auth.currentUser?.providerData?.map((provider) => ({
            providerId: provider.providerId,
            email: provider.email
          })) || []
      },
      operationType,
      path
    };
    console.error("Firestore Error: ", JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async signOutUser() {
    return signOut(this.auth);
  }

  saveLocalFallback(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors
    }
  }

  loadLocalFallback(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /**
   * Lắng nghe cấu hình hệ thống (Năm chấm điểm & Google Apps Script Drive)
   * Tự động đồng bộ 2 chiều giữa Cloud Firestore (cchc_system_config/main) và LocalStorage
   */
  subscribeSystemConfig(onConfigCallback) {
    const cached = this.loadLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG);
    if (cached && typeof cached === "object") {
      onConfigCallback({ ...DEFAULT_SYSTEM_CONFIG, ...cached }, "local_cache");
    }

    const configDocRef = doc(this.db, COLLECTIONS.CONFIG, "main");

    const handleRemoteDoc = (docSnap) => {
      if (docSnap.exists()) {
        const remoteData = docSnap.data() || {};
        const localNow = this.loadLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG) || {};

        // Nếu trên Firebase chưa có cấu hình Drive nhưng máy cục bộ đã lưu trước đó, tự động đẩy lên Firebase
        const remoteHasDrive = Boolean(
          String(remoteData.gasWebAppUrl || "").trim() ||
            String(remoteData.driveFolderId || "").trim() ||
            String(remoteData.driveFolderUrl || "").trim()
        );
        const localHasDrive = Boolean(
          String(localNow.gasWebAppUrl || "").trim() ||
            String(localNow.driveFolderId || "").trim() ||
            String(localNow.driveFolderUrl || "").trim()
        );

        const merged = {
          ...DEFAULT_SYSTEM_CONFIG,
          ...remoteData,
          gasWebAppUrl: remoteHasDrive
            ? String(remoteData.gasWebAppUrl || "").trim()
            : String(localNow.gasWebAppUrl || "").trim(),
          driveFolderId: remoteHasDrive
            ? String(remoteData.driveFolderId || "").trim()
            : String(localNow.driveFolderId || "").trim(),
          driveFolderUrl: remoteHasDrive
            ? String(remoteData.driveFolderUrl || "").trim()
            : String(localNow.driveFolderUrl || "").trim()
        };

        this.saveLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG, merged);
        onConfigCallback(merged, "firestore_realtime");

        if (!remoteHasDrive && localHasDrive) {
          this.saveSystemConfig(merged, { explicitDriveUpdate: true }).catch(() => {
            // Đã lưu LocalFallback
          });
        }
      } else {
        // Nếu tài liệu cchc_system_config/main chưa tồn tại trên Firebase, khởi tạo ngay
        const initialCfg = {
          ...DEFAULT_SYSTEM_CONFIG,
          ...(this.loadLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG) || {})
        };
        this.saveSystemConfig(initialCfg, { explicitDriveUpdate: true }).catch(() => {
          // Bỏ qua nếu đang ngoại tuyến
        });
      }
    };

    const unsub = onSnapshot(
      configDocRef,
      (docSnap) => {
        this.setConnectionStatus(true);
        handleRemoteDoc(docSnap);
      },
      () => {
        // Fallback to local config silently if offline
      }
    );

    // Chủ động truy vấn trực tiếp từ máy chủ Firebase ngay khi khởi động để đảm bảo dữ liệu mới nhất
    getDocFromServer(configDocRef)
      .then((docSnap) => {
        this.setConnectionStatus(true);
        handleRemoteDoc(docSnap);
      })
      .catch(() => {
        // Đã có onSnapshot và LocalStorage xử lý
      });

    this.unsubscribers.push(unsub);
    return unsub;
  }

  async saveSystemConfig(configData, options = {}) {
    const cached = this.loadLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG) || {};
    const explicitDriveUpdate = Boolean(options.explicitDriveUpdate);

    const gasWebAppUrl = explicitDriveUpdate
      ? String(configData.gasWebAppUrl || "").trim()
      : String(configData.gasWebAppUrl || cached.gasWebAppUrl || "").trim();
    const driveFolderId = explicitDriveUpdate
      ? String(configData.driveFolderId || "").trim()
      : String(configData.driveFolderId || cached.driveFolderId || "").trim();
    const driveFolderUrl = explicitDriveUpdate
      ? String(configData.driveFolderUrl || "").trim()
      : String(configData.driveFolderUrl || cached.driveFolderUrl || "").trim();

    const activeYear = Number(configData.activeYear || cached.activeYear || EVALUATION_YEAR);
    const rawYears =
      Array.isArray(configData.availableYears) && configData.availableYears.length > 0
        ? configData.availableYears
        : Array.isArray(cached.availableYears) && cached.availableYears.length > 0
        ? cached.availableYears
        : [activeYear];

    const normalizedYears = [...new Set(rawYears.map((y) => Number(y)).filter((y) => y >= 2020 && y <= 2050))];
    if (!normalizedYears.includes(activeYear)) {
      normalizedYears.push(activeYear);
    }

    const payload = {
      id: "main",
      activeYear,
      availableYears: normalizedYears.slice(0, 20),
      gasWebAppUrl: gasWebAppUrl.slice(0, 1000),
      driveFolderId: driveFolderId.slice(0, 200),
      driveFolderUrl: driveFolderUrl.slice(0, 1000),
      updatedAt: new Date().toISOString()
    };

    this.saveLocalFallback(LOCAL_STORAGE_KEYS.SYSTEM_CONFIG, payload);
    const path = `${COLLECTIONS.CONFIG}/main`;
    try {
      await setDoc(doc(this.db, COLLECTIONS.CONFIG, "main"), payload);
      this.setConnectionStatus(true);
      return payload;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, path);
    }
  }

  /**
   * Lắng nghe thời gian thực bộ tiêu chí CCHC 2851 (hỗ trợ đa năm)
   */
  subscribeCriteria(onDataCallback) {
    const cached2026 = this.loadLocalFallback(this.getCriteriaCacheKey(EVALUATION_YEAR));
    if (
      cached2026 &&
      Array.isArray(cached2026) &&
      cached2026.length > 0 &&
      !hasSimulatedLegacyData(cached2026)
    ) {
      onDataCallback(cached2026, "local_cache");
    }

    const q = query(
      collection(this.db, COLLECTIONS.CRITERIA),
      where("domainId", "in", VALID_DOMAIN_IDS)
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        this.setConnectionStatus(true);
        const docs = [];
        snapshot.forEach((docSnap) => {
          docs.push(docSnap.data());
        });
        if (docs.length > 0 && !hasSimulatedLegacyData(docs)) {
          // Phân nhóm theo năm để lưu cache địa phương
          const byYear = {};
          for (const d of docs) {
            const yr = Number(d.year || EVALUATION_YEAR);
            if (!byYear[yr]) byYear[yr] = [];
            byYear[yr].push(d);
          }
          for (const [yr, list] of Object.entries(byYear)) {
            this.saveLocalFallback(this.getCriteriaCacheKey(yr), list);
          }
          onDataCallback(docs, "firestore_realtime");
        }
      },
      (error) => {
        this.setConnectionStatus(false);
        try {
          this.handleFirestoreError(error, OperationType.GET, COLLECTIONS.CRITERIA);
        } catch {
          // Handled and logged
        }
      }
    );

    this.unsubscribers.push(unsub);
    return unsub;
  }

  /**
   * Lưu cập nhật 1 tiêu chí lên Cloud Firestore + LocalStorage + Ghi Audit Log
   */
  async saveCriterion(criterionInstance, summaryMetrics, actorName = "UBND Phường Hội An Đông") {
    const year = Number(criterionInstance.year || summaryMetrics?.year || EVALUATION_YEAR);
    const payload = criterionInstance.toFirestoreJSON(year);
    payload.updatedBy = String(actorName).slice(0, 128);
    payload.updatedAt = new Date().toISOString();

    const cacheKey = this.getCriteriaCacheKey(year);
    const cachedList = this.loadLocalFallback(cacheKey) || [];
    const idx = cachedList.findIndex((c) => c.id === payload.id);
    if (idx >= 0) cachedList[idx] = payload;
    else cachedList.push(payload);
    this.saveLocalFallback(cacheKey, cachedList);

    const critDocPath = `${COLLECTIONS.CRITERIA}/${payload.id}`;
    try {
      await setDoc(doc(this.db, COLLECTIONS.CRITERIA, payload.id), payload);
      if (summaryMetrics) {
        await this.saveSummary(summaryMetrics, actorName);
      }
      await this.appendAuditLog(
        payload.id,
        `[${year}] Cập nhật tiêu chí ${payload.code}: Tự chấm ${payload.selfScore}đ (${payload.evidences.length} minh chứng)`,
        actorName
      );
      this.setConnectionStatus(true);
      return true;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, critDocPath);
    }
  }

  /**
   * Xóa 1 tiêu chí khỏi Cloud Firestore & LocalStorage
   */
  async deleteCriterion(criterionInstance, summaryMetrics, actorName = "Quản trị hệ thống") {
    const year = Number(criterionInstance.year || summaryMetrics?.year || EVALUATION_YEAR);
    const docId = criterionInstance.getFirestoreDocId(year);

    const cacheKey = this.getCriteriaCacheKey(year);
    const cachedList = (this.loadLocalFallback(cacheKey) || []).filter((c) => c.id !== docId);
    this.saveLocalFallback(cacheKey, cachedList);

    const critDocPath = `${COLLECTIONS.CRITERIA}/${docId}`;
    try {
      await deleteDoc(doc(this.db, COLLECTIONS.CRITERIA, docId));
      if (summaryMetrics) {
        await this.saveSummary(summaryMetrics, actorName);
      }
      await this.appendAuditLog(
        docId,
        `[${year}] Xóa tiêu chí ${criterionInstance.code} (${criterionInstance.title})`,
        actorName
      );
      return true;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.DELETE, critDocPath);
    }
  }

  /**
   * Lưu hàng loạt bộ tiêu chí của 1 năm (dùng khi tạo năm mới hoặc khôi phục sao lưu)
   */
  async saveYearCriteriaBatch(criteriaList, year, summaryMetrics, actorName = "Quản trị hệ thống") {
    const targetYear = Number(year || EVALUATION_YEAR);
    const serialized = criteriaList.map((c) => c.toFirestoreJSON(targetYear));
    this.saveLocalFallback(this.getCriteriaCacheKey(targetYear), serialized);

    try {
      const batch = writeBatch(this.db);
      for (const payload of serialized) {
        const ref = doc(this.db, COLLECTIONS.CRITERIA, payload.id);
        batch.set(ref, payload);
      }
      await batch.commit();
      if (summaryMetrics) {
        await this.saveSummary(summaryMetrics, actorName);
      }
      return true;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, COLLECTIONS.CRITERIA);
    }
  }

  /**
   * Xóa toàn bộ tiêu chí của 1 năm chấm điểm
   */
  async deleteYearCriteriaBatch(criteriaList, year) {
    const targetYear = Number(year);
    try {
      localStorage.removeItem(this.getCriteriaCacheKey(targetYear));
      localStorage.removeItem(this.getSummaryCacheKey(targetYear));
    } catch {
      // Ignore localStorage error
    }

    try {
      const batch = writeBatch(this.db);
      for (const c of criteriaList) {
        const docId = c.getFirestoreDocId(targetYear);
        batch.delete(doc(this.db, COLLECTIONS.CRITERIA, docId));
      }
      batch.delete(doc(this.db, COLLECTIONS.SUMMARY, String(targetYear)));
      await batch.commit();
      return true;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.DELETE, COLLECTIONS.CRITERIA);
    }
  }

  async saveSummary(metrics, actorName = "UBND Phường Hội An Đông") {
    const targetYear = Number(metrics?.year || EVALUATION_YEAR);
    const docId = String(targetYear);
    const summaryPayload = {
      year: targetYear,
      totalSelfScore: Number(Number(metrics.totalSelfScore || 0).toFixed(2)),
      totalVerifiedScore: Number(Number(metrics.totalVerifiedScore || 0).toFixed(2)),
      bonusScore: Number(Number(metrics.bonusScore || 0).toFixed(2)),
      penaltyScore: Number(Number(metrics.penaltyScore || 0).toFixed(2)),
      finalScore: Number(Number(metrics.finalScore || 0).toFixed(2)),
      evidenceRate: Number(Number(metrics.evidenceRate || 0).toFixed(2)),
      isLocked: false,
      updatedBy: String(actorName).slice(0, 128),
      updatedAt: new Date().toISOString()
    };

    this.saveLocalFallback(this.getSummaryCacheKey(targetYear), summaryPayload);
    const path = `${COLLECTIONS.SUMMARY}/${docId}`;
    try {
      await setDoc(doc(this.db, COLLECTIONS.SUMMARY, docId), summaryPayload);
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, path);
    }
  }

  async appendAuditLog(criterionId, action, actor = "UBND Phường Hội An Đông") {
    const logId = `LOG_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const logItem = {
      id: logId,
      criterionId: String(criterionId).slice(0, 64),
      action: String(action).slice(0, 500),
      actor: String(actor).slice(0, 128),
      timestamp: new Date().toISOString()
    };

    const cachedLogs = this.loadLocalFallback(LOCAL_STORAGE_KEYS.LOGS) || [];
    cachedLogs.unshift(logItem);
    this.saveLocalFallback(LOCAL_STORAGE_KEYS.LOGS, cachedLogs.slice(0, 50));

    try {
      await setDoc(doc(this.db, COLLECTIONS.LOGS, logId), logItem);
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.LOGS}/${logId}`);
    }
  }

  /**
   * Khởi tạo hoặc Đặt lại toàn bộ khung tiêu chí chuẩn QĐ 2851 (0 điểm giả lập) lên Cloud Firestore
   */
  async seedInitialDataIfEmpty(manager, forceReset = false) {
    try {
      const activeYear = Number(manager.activeYear || EVALUATION_YEAR);
      if (!forceReset) {
        const q = query(
          collection(this.db, COLLECTIONS.CRITERIA),
          where("domainId", "in", VALID_DOMAIN_IDS)
        );
        const existingSnap = await getDocs(q);
        const existingDocs = [];
        existingSnap.forEach((s) => existingDocs.push(s.data()));

        if (
          !existingSnap.empty &&
          existingSnap.size >= 40 &&
          !hasSimulatedLegacyData(existingDocs)
        ) {
          return false;
        }
      }

      const batch = writeBatch(this.db);
      const criteriaList = manager.getAllCriteria();
      for (const crit of criteriaList) {
        const payload = crit.toFirestoreJSON(activeYear);
        const ref = doc(this.db, COLLECTIONS.CRITERIA, payload.id);
        batch.set(ref, payload);
      }

      await batch.commit();
      await this.saveSummary(manager.getOverallMetrics(), "Khởi tạo khung tiêu chí chuẩn QĐ 2851");
      this.saveLocalFallback(
        this.getCriteriaCacheKey(activeYear),
        criteriaList.map((c) => c.toFirestoreJSON(activeYear))
      );
      return true;
    } catch (error) {
      this.handleFirestoreError(error, OperationType.WRITE, COLLECTIONS.CRITERIA);
    }
  }

  /**
   * Tải tệp minh chứng hoặc tệp nén (.ZIP, .RAR, .7Z, .TAR.GZ...) lên Google Drive thông qua Google Apps Script Web App
   */
  async uploadFileToDriveViaGAS(file, criterionCode, year, systemConfig = {}) {
    const gasUrl = String(systemConfig.gasWebAppUrl || "").trim();
    if (!gasUrl) {
      throw new Error(
        "Chưa cấu hình URL Web App Google Apps Script. Vui lòng vào mục 'Cài đặt hệ thống' để thiết lập thông số Google Drive."
      );
    }
    if (!file) {
      throw new Error("Vui lòng chọn tệp văn bản hoặc tệp nén minh chứng để tải lên.");
    }
    // Hỗ trợ tệp nén và tài liệu dung lượng tối đa 30MB qua Apps Script
    if (file.size > 30 * 1024 * 1024) {
      throw new Error("Kích thước tệp vượt quá 30MB. Vui lòng chia nhỏ tệp nén hoặc tài liệu trước khi tải lên.");
    }

    const fileMeta = resolveEvidenceFileMeta(file.name, file.type, file.size);

    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = String(reader.result || "");
        const commaIdx = res.indexOf(",");
        resolve(commaIdx >= 0 ? res.slice(commaIdx + 1) : res);
      };
      reader.onerror = () => reject(new Error("Không thể đọc tệp từ thiết bị."));
      reader.readAsDataURL(file);
    });

    const payload = {
      folderId: String(systemConfig.driveFolderId || "").trim(),
      year: String(year || EVALUATION_YEAR),
      criterionCode: String(criterionCode || "MinhChung"),
      fileName: file.name,
      mimeType: fileMeta.mimeType,
      isArchive: fileMeta.isArchive,
      fileType: fileMeta.ext,
      base64Data
    };

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script trả về mã lỗi HTTP ${response.status}.`);
    }

    const result = await response.json();
    if (result.status !== "success") {
      throw new Error(result.message || "Lỗi khi tải tệp lên Google Drive qua Apps Script.");
    }

    return {
      fileId: result.fileId || "",
      fileName: result.fileName || file.name,
      fileUrl: result.viewUrl || result.fileUrl || "",
      fileType: fileMeta.ext,
      fileSize: file.size,
      isArchive: fileMeta.isArchive
    };
  }
}
