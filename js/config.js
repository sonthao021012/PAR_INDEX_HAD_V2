/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cấu hình Firebase & Hằng số hệ thống
 * Hệ thống Quản lý, Theo dõi, Tự đánh giá và Xếp hạng Kết quả CCHC (PAR Index)
 * UBND phường Hội An Đông - Theo Phụ lục II Quyết định số 2851/QĐ-UBND ngày 30/6/2026
 */

export const FIREBASE_CONFIG = {
  projectId: "bau-cu-hoi-an-dong",
  appId: "1:736515363687:web:28a4afdc68f17a263315c2",
  apiKey: "AIzaSyB0v99cSqsAFCeEzso3UbIC_cQBqPuodNQ",
  authDomain: "bau-cu-hoi-an-dong.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-5c74b9b7-a649-4aec-b28f-a3b7490e88a7",
  storageBucket: "bau-cu-hoi-an-dong.firebasestorage.app",
  messagingSenderId: "736515363687"
};

export const ADMIN_PASSWORD = "tsvmmm";

export const COLLECTIONS = {
  CRITERIA: "cchc_2851_criteria",
  SUMMARY: "cchc_2851_summary",
  CONFIG: "cchc_system_config",
  TASKS: "cchc_par_index_tasks",
  LOGS: "cchc_par_index_logs"
};

export const LOCAL_STORAGE_KEYS = {
  CRITERIA_PREFIX: "cchc_hoi_an_dong_criteria_v3_",
  SUMMARY_PREFIX: "cchc_hoi_an_dong_summary_v3_",
  SYSTEM_CONFIG: "cchc_hoi_an_dong_system_config_v3",
  LOGS: "cchc_hoi_an_dong_2026_logs_v2_clean",
  ADMIN_UNLOCKED: "cchc_hoi_an_dong_admin_unlocked_v1"
};

export const EVALUATION_YEAR = 2026;

export const DEFAULT_SYSTEM_CONFIG = {
  id: "main",
  activeYear: 2026,
  availableYears: [2026],
  gasWebAppUrl: "",
  driveFolderId: "",
  driveFolderUrl: "",
  updatedAt: "2026-07-01T00:00:00.000Z"
};

export const GAS_SCRIPT_TEMPLATE = `/**
 * MÃ NGUỒN GOOGLE APPS SCRIPT (Code.gs) - TẢI FILE MINH CHỨNG CCHC LÊN GOOGLE DRIVE
 * Hướng dẫn cài đặt:
 * 1. Truy cập https://script.google.com -> Tạo dự án mới (New Project)
 * 2. Xóa mã mặc định và dán toàn bộ đoạn mã này vào file Code.gs
 * 3. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment)
 * 4. Chọn loại: "Ứng dụng web" (Web app)
 *    - Thực thi dưới dạng (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 * 5. Bấm Triển khai, cấp quyền Google Drive và sao chép URL Web App (/exec) dán vào Cài đặt hệ thống.
 */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var folderId = payload.folderId || "";
    var year = String(payload.year || "2026");
    var criterionCode = String(payload.criterionCode || "MinhChung");
    var fileName = payload.fileName || ("MC_" + criterionCode + "_" + new Date().getTime());
    var mimeType = payload.mimeType || "application/pdf";
    var base64Data = payload.base64Data || "";

    var parentFolder = folderId
      ? DriveApp.getFolderById(folderId)
      : DriveApp.getRootFolder();

    // Tự động tạo thư mục Năm chấm điểm (VD: CCHC_HoiAnDong_2026)
    var yearFolderName = "CCHC_HoiAnDong_" + year;
    var yearFolders = parentFolder.getFoldersByName(yearFolderName);
    var yearFolder = yearFolders.hasNext() ? yearFolders.next() : parentFolder.createFolder(yearFolderName);

    // Giải mã Base64 và tạo file trên Google Drive
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType, "[" + criterionCode + "] " + fileName);
    var file = yearFolder.createFile(blob);

    // Cấp quyền xem qua link để Hội đồng thẩm định có thể mở kiểm tra
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      fileId: file.getId(),
      fileName: file.getName(),
      fileUrl: file.getUrl(),
      viewUrl: "https://drive.google.com/file/d/" + file.getId() + "/view"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "CCHC Phường Hội An Đông - Google Drive Uploader"
  })).setMimeType(ContentService.MimeType.JSON);
}`;

export const DEPARTMENTS = [
  {
    id: "ALL",
    name: "Tất cả cơ quan, đơn vị",
    shortName: "Tất cả đơn vị",
    leadPerson: "UBND Phường Hội An Đông"
  },
  {
    id: "VP_HDND_UBND",
    name: "Văn phòng HĐND-UBND phường",
    shortName: "Văn phòng HĐND-UBND",
    leadPerson: "Chánh Văn phòng & Công chức Tư pháp, Văn thư",
    responsibilityNote:
      "Phụ trách Mục II (Cải cách thể chế - rà soát, kiểm tra VBQPPL), phối hợp Mục III (tiếp nhận, xử lý PAKN), Mục VII (văn bản điện tử, ký số và Hệ thống QLVBĐH)."
  },
  {
    id: "PHONG_VHXH",
    name: "Phòng Văn hóa – Xã hội phường",
    shortName: "Phòng Văn hóa – Xã hội",
    leadPerson: "Trưởng phòng VH-XH & Công chức Nội vụ - CCHC, CĐS",
    responsibilityNote:
      "Cơ quan thường trực tổng hợp Bộ chỉ số CCHC toàn phường; phụ trách Mục I (Chỉ đạo điều hành, kiểm tra, tuyên truyền, sáng kiến), Mục IV & V (Tổ chức bộ máy & Chế độ công vụ), Mục VII (Chuyển đổi số, ứng dụng AI) và Mục VIII (Hiệu quả tác động CCHC)."
  },
  {
    id: "PHONG_KT_HT_DT",
    name: "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    shortName: "Phòng Kinh tế, HT & ĐT",
    leadPerson: "Trưởng phòng Kinh tế, HT & ĐT",
    responsibilityNote:
      "Phụ trách Mục VI (Cải cách tài chính công): chấp hành dự toán ngân sách, chi trả an sinh xã hội không dùng tiền mặt, tự chủ ĐVSNCL, công khai ngân sách và thực hiện chỉ tiêu thu NSNN."
  },
  {
    id: "TT_PVHCC",
    name: "Trung tâm Phục vụ hành chính công phường",
    shortName: "Trung tâm Phục vụ HCC",
    leadPerson: "Giám đốc Trung tâm Phục vụ HCC",
    responsibilityNote:
      "Phụ trách Mục III (Cải cách TTHC: kiểm soát TTHC, giải quyết hồ sơ một cửa, một cửa liên thông, khảo sát sự hài lòng) và Mục VII (Số hóa hồ sơ, tái sử dụng dữ liệu, dịch vụ công trực tuyến, thanh toán trực tuyến, Camera IOC)."
  },
  {
    id: "TT_CUDVSNC",
    name: "Trung tâm Cung ứng dịch vụ sự nghiệp công phường",
    shortName: "Trung tâm Cung ứng DVSNC",
    leadPerson: "Giám đốc Trung tâm Cung ứng DVSNC",
    responsibilityNote:
      "Phối hợp thực hiện Mục I (Tuyên truyền CCHC: xây dựng tin bài, phóng sự, video clip tuyên truyền dịch vụ công trực tuyến trên hệ thống truyền thanh, Trang TTĐT và mạng xã hội) và Mục VI (cơ chế tự chủ ĐVSNCL)."
  }
];

export const DOMAINS_META = [
  {
    id: "I",
    code: "Mục I",
    name: "Công tác chỉ đạo, điều hành CCHC",
    shortName: "I. Chỉ đạo, điều hành",
    maxScore: 27.0,
    leadDept: "Phòng Văn hóa – Xã hội phường",
    keyControlNote:
      "KH giai đoạn 2026-2030 & KH năm đủ nhiệm vụ; Kiểm tra CCHC trước 30/11, báo cáo khắc phục <= 10 ngày; Web > 500 lượt xem, Video >= 500 lượt xem; >= 03 sáng kiến."
  },
  {
    id: "II",
    code: "Mục II",
    name: "Cải cách thể chế",
    shortName: "II. Cải cách thể chế",
    maxScore: 4.0,
    leadDept: "Văn phòng HĐND-UBND phường",
    keyControlNote:
      "Hoàn thành đúng tiến độ KH rà soát VBQPPL; thực hiện tự kiểm tra và báo cáo tự kiểm tra VBQPPL; có văn bản kiến nghị sửa đổi TTHC được cấp trên đồng ý."
  },
  {
    id: "III",
    code: "Mục III",
    name: "Cải cách thủ tục hành chính",
    shortName: "III. Thủ tục hành chính",
    maxScore: 11.0,
    leadDept: "Trung tâm Phục vụ hành chính công phường",
    keyControlNote:
      "Báo cáo KSTTHC không trễ quá 03 ngày; Hồ sơ đúng hạn đạt 98%-100%; Xử lý & công khai 100% PAKN; Khảo sát QR độc lập >= 02 lĩnh vực."
  },
  {
    id: "IV",
    code: "Mục IV",
    name: "Cải cách tổ chức bộ máy hành chính",
    shortName: "IV. Tổ chức bộ máy",
    maxScore: 9.0,
    leadDept: "Phòng Văn hóa – Xã hội phường",
    keyControlNote:
      "Kiện toàn chức năng nhiệm vụ; không vượt biên chế hành chính & sự nghiệp; đúng 100% cơ cấu lãnh đạo; đề xuất, thực hiện và kiểm tra phân cấp, ủy quyền."
  },
  {
    id: "V",
    code: "Mục V",
    name: "Cải cách chế độ công vụ",
    shortName: "V. Chế độ công vụ",
    maxScore: 12.0,
    leadDept: "Phòng Văn hóa – Xã hội phường",
    keyControlNote:
      "100% bố trí đúng VTVL; 100% hồ sơ CBCCVC xác thực phần mềm; đánh giá công chức đúng hạn tất cả các tháng (tránh tỷ lệ Xuất sắc quá cao hoặc cào bằng mức Tốt)."
  },
  {
    id: "VI",
    code: "Mục VI",
    name: "Cải cách tài chính công",
    shortName: "VI. Tài chính công",
    maxScore: 9.0,
    leadDept: "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    keyControlNote:
      "Lập, phân bổ, quyết toán ngân sách & an sinh xã hội đúng hạn, đủ biểu mẫu; 100% ĐVSNCL có Quy chế chi tiêu nội bộ; công khai ngân sách; thu NSNN đạt 100%."
  },
  {
    id: "VII",
    code: "Mục VII",
    name: "Chuyển đổi số trong cơ quan nhà nước",
    shortName: "VII. Chuyển đổi số",
    maxScore: 20.0,
    leadDept: "Phòng Văn hóa – Xã hội & Trung tâm Phục vụ HCC",
    keyControlNote:
      "Kiểm tra xác suất >=50 VB ký số 100%; tự xây dựng 03 ứng dụng AI; QLVBĐH 100% nhập đi/đến, >90% kết nối công việc; 02 phần mềm chuyên ngành đủ 4 yếu tố; Số hóa >=80%."
  },
  {
    id: "VIII",
    code: "Mục VIII",
    name: "Hiệu quả tác động của công tác CCHC",
    shortName: "VIII. Hiệu quả tác động",
    maxScore: 8.0,
    leadDept: "Phòng Văn hóa – Xã hội & Trung tâm Phục vụ HCC",
    keyControlNote:
      "Điểm điều tra xã hội học của Sở Nội vụ (5,0 điểm) và tác động tích cực đến chất lượng VBQPPL, tổ chức bộ máy, hiện đại hóa hành chính (3,0 điểm)."
  },
  {
    id: "IX",
    code: "Mục IX",
    name: "Điểm thưởng và Điểm trừ",
    shortName: "IX. Thưởng / Trừ",
    maxScore: 10.0,
    leadDept: "UBND Phường & Phòng Văn hóa – Xã hội",
    keyControlNote:
      "Điểm thưởng tối đa +10,0 điểm (Đối thoại dân, sáng kiến TP, mô hình thí điểm, biểu dương, ISO 9001, Top 20 thu NSNN). Kiểm soát 09 nhóm Điểm trừ (-10,0đ)."
  }
];

export const KEY_MILESTONES_2851 = [
  {
    date: "12/05/2026",
    title: "Ban hành Kế hoạch CCHC giai đoạn 2026-2030 của UBND TP Đà Nẵng (QĐ 2072/QĐ-UBND)",
    unit: "Căn cứ chấm Tiêu chí I.1.a & I.1.b",
    status: "completed"
  },
  {
    date: "30/06/2026",
    title: "Ban hành Bộ chỉ số CCHC cấp xã, phường, đặc khu trên địa bàn TP Đà Nẵng (Phụ lục II - QĐ 2851/QĐ-UBND)",
    unit: "Chủ tịch UBND Thành phố Đà Nẵng",
    status: "completed"
  },
  {
    date: "30/11/2026",
    title: "Hạn chót hoàn thành kế hoạch kiểm tra CCHC và ban hành Thông báo kết luận kiểm tra",
    unit: "Quy định tại Tiêu chí I.4.c - QĐ 2851/QĐ-UBND",
    status: "upcoming"
  },
  {
    date: "20/12/2026",
    title: "Mốc khóa sổ giải ngân, quyết toán kinh phí thực hiện các nhiệm vụ CCHC trong năm",
    unit: "Quy định tại Tiêu chí I.7 - QĐ 2851/QĐ-UBND",
    status: "upcoming"
  }
];

export function getRankingGrade(finalScore, evaluatedCount = 1) {
  if (evaluatedCount === 0 && finalScore === 0) {
    return {
      grade: "Chưa xếp loại",
      badgeClass: "text-slate-600 bg-slate-100 border-slate-200",
      description: "Chưa có tiêu chí nào được chấm điểm"
    };
  }
  if (finalScore >= 90) {
    return {
      grade: "Xuất sắc",
      badgeClass: "text-emerald-800 bg-emerald-50 border-emerald-200",
      description: "Đạt từ 90 điểm trở lên (Nhóm dẫn đầu bảng xếp hạng)"
    };
  }
  if (finalScore >= 80) {
    return {
      grade: "Tốt",
      badgeClass: "text-blue-800 bg-blue-50 border-blue-200",
      description: "Đạt từ 80 đến dưới 90 điểm"
    };
  }
  if (finalScore >= 65) {
    return {
      grade: "Khá",
      badgeClass: "text-amber-800 bg-amber-50 border-amber-200",
      description: "Đạt từ 65 đến dưới 80 điểm"
    };
  }
  return {
    grade: "Trung bình / Cần cải thiện",
    badgeClass: "text-rose-800 bg-rose-50 border-rose-200",
    description: "Đạt dưới 65 điểm"
  };
}
