/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Bộ dữ liệu gốc đầy đủ 100% các tiêu chí, tiêu chí thành phần
 * Phụ lục II - Quyết định số 2851/QĐ-UBND ngày 30/6/2026 của Chủ tịch UBND TP Đà Nẵng
 * (Trạng thái chuẩn chưa chấm điểm - Không chứa dữ liệu giả lập)
 */

export const DEFAULT_CRITERIA_DATA = [
  {
    "id": "I.1.a",
    "code": "I.1.a",
    "domainId": "I",
    "groupTitle": "1. Kế hoạch CCHC giai đoạn năm 2026-2030 (QĐ 2072/QĐ-UBND ngày 12/5/2026)",
    "title": "Ban hành Kế hoạch CCHC giai đoạn 2026-2030 đúng thời gian quy định",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "30/06/2026",
    "status": "pending",
    "regulationText": "Ban hành đúng thời gian quy định theo Quyết định số 2072/QĐ-UBND ngày 12/5/2026 của UBND thành phố Đà Nẵng: chấm 0,5 điểm. Trễ hạn hoặc không ban hành: 0 điểm.",
    "warningNote": "Kiểm tra ngày ký ban hành Kế hoạch giai đoạn 2026-2030 của UBND phường so với mốc quy định của TP.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.1.b",
    "code": "I.1.b",
    "domainId": "I",
    "groupTitle": "1. Kế hoạch CCHC giai đoạn năm 2026-2030 (QĐ 2072/QĐ-UBND ngày 12/5/2026)",
    "title": "Xác định đầy đủ các nhiệm vụ theo Kế hoạch CCHC giai đoạn 2026-2030 của UBND thành phố",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "30/06/2026",
    "status": "pending",
    "regulationText": "Xác định đầy đủ các nhiệm vụ: chấm 1,5 điểm; Xác định thiếu 01 - 02 nhiệm vụ: chấm 0,5 điểm; Xác định thiếu từ 02 nhiệm vụ trở lên: chấm 0 điểm.",
    "warningNote": "Rà soát kỹ bảng đối chiếu nhiệm vụ giai đoạn của phường với QĐ 2072/QĐ-UBND để không bị sót nhiệm vụ.",
    "formulaConfig": {
      "unitLabel": "số nhiệm vụ thiếu",
      "tiers": [
        {
          "key": "full",
          "label": "Xác định đầy đủ 100% các nhiệm vụ theo KH giai đoạn của TP (Thiếu 0 nhiệm vụ)",
          "score": 1.5
        },
        {
          "key": "missing_1_2",
          "label": "Xác định thiếu 01 - 02 nhiệm vụ",
          "score": 0.5
        },
        {
          "key": "missing_more",
          "label": "Xác định thiếu từ 02 nhiệm vụ trở lên",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.2.a",
    "code": "I.2.a",
    "domainId": "I",
    "groupTitle": "2. Xây dựng Kế hoạch CCHC hằng năm",
    "title": "Ban hành Kế hoạch CCHC năm 2026 đúng thời hạn (theo Công văn hướng dẫn của Sở Nội vụ)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Ban hành đúng thời hạn theo Công văn hướng dẫn xây dựng Kế hoạch của Sở Nội vụ: chấm 1,0 điểm. Trễ hạn: 0 điểm.",
    "warningNote": "",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.2.b.1",
    "code": "I.2.b.1",
    "domainId": "I",
    "groupTitle": "2. Xây dựng Kế hoạch CCHC hằng năm",
    "title": "Chất lượng KH: Xác định đầy đủ các nhiệm vụ CCHC trên các lĩnh vực theo Kế hoạch CCHC của thành phố",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả cơ quan, đơn vị"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Xác định đầy đủ các nhiệm vụ: chấm 01 điểm; Xác định thiếu 01 nhiệm vụ: chấm 0,25 điểm; Xác định thiếu từ 02 nhiệm vụ trở lên: chấm 0 điểm.",
    "warningNote": "Phòng VH-XH rà soát chất lượng của việc ban hành kế hoạch, đối chiếu từng đầu việc với KH thành phố.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full",
          "label": "Xác định đầy đủ 100% nhiệm vụ CCHC trên các lĩnh vực",
          "score": 1
        },
        {
          "key": "missing_1",
          "label": "Xác định thiếu 01 nhiệm vụ",
          "score": 0.25
        },
        {
          "key": "missing_2_plus",
          "label": "Xác định thiếu từ 02 nhiệm vụ trở lên",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.2.b.2",
    "code": "I.2.b.2",
    "domainId": "I",
    "groupTitle": "2. Xây dựng Kế hoạch CCHC hằng năm",
    "title": "Chất lượng KH: Xác định rõ trách nhiệm triển khai, cụ thể hóa kết quả, lượng hóa tỷ lệ hoàn thành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Xác định đầy đủ rõ trách nhiệm, cụ thể hóa kết quả, lượng hóa tỷ lệ hoàn thành: 01 điểm; 01 nhiệm vụ chưa rõ: 0,25 điểm; Từ 02 nhiệm vụ trở lên chưa rõ: 0 điểm.",
    "warningNote": "Mỗi nhiệm vụ trong Phụ lục Kế hoạch CCHC năm 2026 phải có cột Sản phẩm đầu ra, Thời gian hoàn thành, Đơn vị chủ trì.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "clear_all",
          "label": "100% nhiệm vụ rõ trách nhiệm, sản phẩm đầu ra và lượng hóa tỷ lệ hoàn thành",
          "score": 1
        },
        {
          "key": "unclear_1",
          "label": "Có 01 nhiệm vụ chưa rõ trách nhiệm / chưa lượng hóa kết quả",
          "score": 0.25
        },
        {
          "key": "unclear_2_plus",
          "label": "Từ 02 nhiệm vụ trở lên chưa rõ trách nhiệm / chưa lượng hóa",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.3",
    "code": "I.3",
    "domainId": "I",
    "groupTitle": "3. Mức độ hoàn thành Kế hoạch cải cách hành chính",
    "title": "Tỷ lệ hoàn thành các nhiệm vụ đề ra theo Kế hoạch CCHC năm 2026 của đơn vị",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "plan_completion",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả 05 cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tỷ lệ = b / (a + c). Trong đó: b là số nhiệm vụ đã hoàn thành (có tài liệu kiểm chứng kèm theo); a là tổng số nhiệm vụ đề ra theo KH đơn vị; c là số nhiệm vụ thiếu so với KH thành phố. Đạt 100%: 2,0 điểm; Từ 80% đến dưới 100%: Tỷ lệ * 1,0 điểm; Dưới 80%: 0 điểm.",
    "warningNote": "Chỉ đạo tại Mục 1 & Mục 7 Quyết định 2851/QĐ-UBND: Thực hiện cập nhật kế hoạch và tiến độ trên phần mềm đầy đủ, hoàn thành 100% tiến độ đề ra của Kế hoạch CCHC năm 2026 trước 30/9/2026. Lưu ý: Chỉ hụt 1 nhiệm vụ (97%) sẽ bị rớt từ 2,0đ xuống 0,97đ!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số nhiệm vụ đã hoàn thành có tài liệu kiểm chứng (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số nhiệm vụ đề ra tại QĐ 2349/QĐ-UBND (a)",
          "default": 0
        },
        {
          "name": "c",
          "label": "Số nhiệm vụ thiếu so với KH thành phố (c)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.4.a",
    "code": "I.4.a",
    "domainId": "I",
    "groupTitle": "4. Công tác kiểm tra cải cách hành chính",
    "title": "Có xây dựng kế hoạch kiểm tra công tác CCHC đối với các đơn vị trực thuộc",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "30/04/2026",
    "status": "pending",
    "regulationText": "Có xây dựng kế hoạch kiểm tra đối với các đơn vị trực thuộc: 0,5 điểm. Không có: 0 điểm.",
    "warningNote": "Đảm bảo Kế hoạch kiểm tra CCHC năm 2026 ban hành đúng thẩm quyền.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.4.b",
    "code": "I.4.b",
    "domainId": "I",
    "groupTitle": "4. Công tác kiểm tra cải cách hành chính",
    "title": "Tổ chức hoạt động kiểm tra công tác CCHC (trực tiếp hoặc trực tuyến)",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các phòng, trung tâm thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Kiểm tra 100% các đơn vị (hoặc tối thiểu 10 đơn vị trực thuộc nếu có >=10 đơn vị): 1,5 điểm; Từ 50% đến dưới 100%: 0,5 điểm; Dưới 50%: 0 điểm.",
    "warningNote": "Lưu giữ đầy đủ Biên bản kiểm tra tại từng phòng chuyên môn, Trung tâm thuộc phường.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "rate_100",
          "label": "Kiểm tra đạt 100% các đơn vị theo Kế hoạch",
          "score": 1.5
        },
        {
          "key": "rate_50_99",
          "label": "Kiểm tra từ 50% đến dưới 100% các đơn vị",
          "score": 0.5
        },
        {
          "key": "rate_under_50",
          "label": "Kiểm tra dưới 50% các đơn vị",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.4.c",
    "code": "I.4.c",
    "domainId": "I",
    "groupTitle": "4. Công tác kiểm tra cải cách hành chính",
    "title": "Hoàn thành việc kiểm tra và ban hành Thông báo kết luận chung trước ngày 30/11 hằng năm",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Hoàn thành việc ban hành văn bản, báo cáo kết luận chung các nội dung kiểm tra trước ngày 30/11. Phải nêu rõ kết quả đạt được, tồn tại, hạn chế, đề nghị khắc phục, thời hạn báo cáo khắc phục: 1,0 điểm. Chưa đảm bảo: 0 điểm.",
    "warningNote": "Bắt buộc trong Thông báo kết luận phải ghi rõ câu: 'Thời hạn các đơn vị gửi báo cáo khắc phục về UBND phường trước ngày ... (tối đa 10 ngày làm việc)'.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.4.d",
    "code": "I.4.d",
    "domainId": "I",
    "groupTitle": "4. Công tác kiểm tra cải cách hành chính",
    "title": "Các đơn vị được kiểm tra có báo cáo khắc phục kết quả sau kiểm tra (trong tối đa 10 ngày làm việc)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các cơ quan, đơn vị được kiểm tra"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Báo cáo khắc phục phải ban hành trong tối đa 10 ngày làm việc kể từ khi ban hành thông báo kết luận. 100% đơn vị đảm bảo thời gian & nội dung: 1,0 điểm; Từ 90% đến dưới 100%: 0,5 điểm; Dưới 90%: 0 điểm.",
    "warningNote": "CẢNH BÁO MẤT ĐIỂM: Phải kiểm tra ngày ký báo cáo khắc phục của từng đơn vị, nếu trễ quá 10 ngày làm việc kể từ ngày ký Thông báo kết luận sẽ bị trừ điểm.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "fix_100",
          "label": "100% đơn vị được kiểm tra có báo cáo khắc phục đúng hạn (<= 10 ngày làm việc)",
          "score": 1
        },
        {
          "key": "fix_90_99",
          "label": "Từ 90% đến dưới 100% đơn vị có báo cáo khắc phục đảm bảo quy định",
          "score": 0.5
        },
        {
          "key": "fix_under_90",
          "label": "Dưới 90% đơn vị hoặc trễ hạn > 10 ngày làm việc",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.5.a",
    "code": "I.5.a",
    "domainId": "I",
    "groupTitle": "5. Thực hiện báo cáo kết quả CCHC trực tuyến",
    "title": "Đầy đủ và đúng thời hạn các báo cáo định kỳ CCHC trực tuyến theo quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đầy đủ và đúng thời hạn các báo cáo theo quy định: 1,0 điểm. Thiếu hoặc trễ mỗi báo cáo trừ 0,5 điểm (một báo cáo không đầy đủ nội dung được xem là 01 báo cáo trễ hạn, không đầy đủ).",
    "warningNote": "Thực hiện cập nhật kế hoạch và cập nhật tiến độ, báo cáo trên phần mềm đầy đủ, đúng hạn.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "late_0",
          "label": "Đầy đủ 100% và đúng hạn tất cả các kỳ báo cáo trực tuyến (0 báo cáo trễ/thiếu)",
          "score": 1
        },
        {
          "key": "late_1",
          "label": "Thiếu hoặc trễ 01 báo cáo định kỳ (-0,5 điểm)",
          "score": 0.5
        },
        {
          "key": "late_2_plus",
          "label": "Thiếu hoặc trễ từ 02 báo cáo trở lên",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.5.b",
    "code": "I.5.b",
    "domainId": "I",
    "groupTitle": "5. Thực hiện báo cáo kết quả CCHC trực tuyến",
    "title": "Đầy đủ các nội dung báo cáo theo mẫu yêu cầu của thành phố",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả cơ quan, đơn vị"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đầy đủ các nội dung theo mẫu yêu cầu: 1,0 điểm. Mỗi báo cáo không đầy đủ nội dung theo mẫu yêu cầu trừ 0,5 điểm.",
    "warningNote": "Đảm bảo báo cáo CCHC năm tích hợp đầy đủ các mục chuyên đề (Chỉ thị 05-CT/TU, KH 233/KH-UBND, KH 44-KH/TU).",
    "formulaConfig": {
      "tiers": [
        {
          "key": "content_full",
          "label": "100% báo cáo đầy đủ nội dung và phụ lục biểu mẫu theo yêu cầu",
          "score": 1
        },
        {
          "key": "content_miss_1",
          "label": "Có 01 báo cáo thiếu nội dung theo mẫu (-0,5 điểm)",
          "score": 0.5
        },
        {
          "key": "content_miss_2",
          "label": "Có từ 02 báo cáo trở lên thiếu nội dung",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.a",
    "code": "I.6.a",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Xây dựng Kế hoạch tuyên truyền CCHC năm 2026 có lượng hóa các nội dung triển khai",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "31/03/2026",
    "status": "pending",
    "regulationText": "Có từ 04 trở lên giải pháp tuyên truyền: 1,0 điểm; Có 03 giải pháp: 0,5 điểm; Có 02 giải pháp hoặc không đảm bảo yêu cầu KH chung của TP: 0,25 điểm; Dưới 02 giải pháp hoặc không xây dựng KH: 0 điểm.",
    "warningNote": "Kế hoạch tuyên truyền phải lượng hóa số lượng tin bài, số lượt phát thanh, số tờ rơi, video clip, cuộc thi, lớp tập huấn.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "sol_4_plus",
          "label": "KH đầy đủ nội dung, lượng hóa từ 04 giải pháp tuyên truyền trở lên",
          "score": 1
        },
        {
          "key": "sol_3",
          "label": "Có 03 giải pháp tuyên truyền theo kế hoạch",
          "score": 0.5
        },
        {
          "key": "sol_2",
          "label": "Có 02 giải pháp hoặc chưa đảm bảo yêu cầu KH chung của TP",
          "score": 0.25
        },
        {
          "key": "sol_under_2",
          "label": "Dưới 02 giải pháp hoặc không xây dựng kế hoạch",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.b",
    "code": "I.6.b",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Mức độ hoàn thành Kế hoạch tuyên truyền CCHC do đơn vị ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có từ 04 giải pháp tuyên truyền và hoàn thành theo kế hoạch: 1,0 điểm; Có từ 03 giải pháp hoàn thành: 0,5 điểm; Có từ 02 giải pháp hoàn thành: 0,25 điểm; Không đạt: 0 điểm.",
    "warningNote": "Đối chiếu kết quả thực hiện thực tế với từng chỉ tiêu lượng hóa trong KH 28/KH-UBND.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "done_4_plus",
          "label": "Hoàn thành từ 04 giải pháp tuyên truyền trở lên theo kế hoạch",
          "score": 1
        },
        {
          "key": "done_3",
          "label": "Hoàn thành 03 giải pháp tuyên truyền theo kế hoạch",
          "score": 0.5
        },
        {
          "key": "done_2",
          "label": "Hoàn thành 02 giải pháp tuyên truyền theo kế hoạch",
          "score": 0.25
        },
        {
          "key": "done_under_2",
          "label": "Hoàn thành dưới 02 giải pháp",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.c.1",
    "code": "I.6.c.1",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Đăng tải thường xuyên nội dung chỉ đạo, tuyên truyền tại chuyên mục CCHC trên Trang TTĐT (> 500 lượt truy cập)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "web_views_threshold",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đăng tải thường xuyên các nội dung chỉ đạo, tuyên truyền CCHC trực tuyến tại chuyên mục CCHC trên Trang thông tin điện tử của đơn vị. Đơn vị có lượt truy cập trên 500 lượt thì mới chấm 1,0 điểm. Thấp hơn hoặc bằng 500 lượt thì không chấm điểm (0 điểm).",
    "warningNote": "Chỉ đạo tại Mục 1 & Mục 9 Quyết định 2851/QĐ-UBND: Thường xuyên đăng tải tin bài trên Trang TTĐT phường và chụp ảnh màn hình bộ đếm lượt truy cập > 500 lượt.",
    "formulaConfig": {
      "fields": [
        {
          "name": "views",
          "label": "Tổng số lượt truy cập chuyên mục CCHC trên Trang TTĐT (yêu cầu > 500)",
          "default": 0
        },
        {
          "name": "articles",
          "label": "Số lượng tin, bài, văn bản đã đăng tải trong năm",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.c.2",
    "code": "I.6.c.2",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Xây dựng thiết kế tờ rơi đồ họa, hồ sơ mẫu hướng dẫn TTHC tuyên truyền rộng rãi qua MXH/Zalo tổ dân phố",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thiết kế đồ họa tờ rơi, hồ sơ mẫu hướng dẫn người dân, doanh nghiệp thực hiện TTHC và tuyên truyền rộng rãi qua Zalo tổ dân phố, Facebook, Viber... (không cần in ấn thực tế): 0,5 điểm. Không chấm điểm nếu nội dung thông tin đã lỗi thời.",
    "warningNote": "Đảm bảo tờ rơi Infographic cập nhật đúng tên phường mới và quy trình TTHC năm 2026, kèm ảnh chụp màn hình gửi vào các nhóm Zalo Tổ dân phố.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.c.3",
    "code": "I.6.c.3",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Xây dựng phóng sự, video clip tuyên truyền về công tác CCHC đăng tải MXH đạt từ 500 lượt xem trở lên",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "video_views_quality",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Video clip tuyên truyền đăng tải rộng rãi trên MXH (Zalo, Facebook, Youtube, Tiktok...) đạt từ 500 lượt xem trở lên, có mô tả, thuyết minh hoặc phụ đề hướng dẫn cụ thể: 1,0 điểm. Nếu chỉ dùng điện thoại quay lại màn hình máy tính đơn điệu: chấm 0,5 điểm. Lượt xem < 500 hoặc không mở xem được: 0 điểm.",
    "warningNote": "CHỈ ĐẠO TRỌNG TÂM Quyết định 2851/QĐ-UBND (Mục 1 & Mục 9): Phòng VH-XH phối hợp Trung tâm Cung ứng DVSNC xây dựng phóng sự, video clip có thuyết minh/phụ đề và đẩy mạnh tương tác trên Zalo, Facebook, Youtube, Tiktok để vượt 500 lượt xem!",
    "formulaConfig": {
      "fields": [
        {
          "name": "views",
          "label": "Tổng số lượt xem Video clip trên MXH (yêu cầu >= 500)",
          "default": 0
        },
        {
          "name": "isMonotonous",
          "label": "Chất lượng sản xuất (0 = Có thuyết minh/phụ đề sinh động; 1 = Chỉ quay màn hình đơn điệu)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.d.1",
    "code": "I.6.d.1",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Tổ chức Cuộc thi (trực tiếp, trực tuyến, sân khấu hóa...) liên quan đến công tác CCHC, chuyển đổi số",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổ chức Cuộc thi (thông qua một trong các hình thức trực tiếp, trực tuyến, sân khấu hóa...) liên quan đến công tác cải cách hành chính, chuyển đổi số: 1,5 điểm. Không tổ chức: 0 điểm.",
    "warningNote": "Tham mưu UBND phường ban hành Kế hoạch và tổ chức cuộc thi về CCHC tại Phường (Đủ KH, Thể lệ, Quyết định trao giải, Báo cáo kết quả).",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.6.d.2",
    "code": "I.6.d.2",
    "domainId": "I",
    "groupTitle": "6. Công tác tuyên truyền cải cách hành chính (7,0 điểm)",
    "title": "Tổ chức lớp tập huấn chuyên đề về công tác cải cách hành chính, chuyển đổi số",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổ chức lớp tập huấn chuyên đề về công tác cải cách hành chính, chuyển đổi số: 1,0 điểm. Không tổ chức: 0 điểm.",
    "warningNote": "Hồ sơ kiểm chứng gồm: Kế hoạch tập huấn, Giấy mời, Danh sách điểm danh học viên, Tài liệu bài giảng, Hình ảnh hội nghị.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.7.a",
    "code": "I.7.a",
    "domainId": "I",
    "groupTitle": "7. Triển khai thực hiện các Kế hoạch của UBND thành phố (4,0 điểm)",
    "title": "Công tác chỉ đạo, triển khai thực hiện Chỉ thị số 05-CT/TU ngày 10/11/2025 của Ban Thường vụ Thành ủy",
    "maxScore": 2.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổng 2,5 điểm gồm: (1) Xây dựng kế hoạch triển khai Chỉ thị 05-CT/TU đầy đủ nội dung, đúng thời gian (0,5đ); (2) Đăng ký nội dung, nhiệm vụ đảm bảo thời gian và nội dung theo hướng dẫn Sở Nội vụ (0,5đ); (3) Mức độ hoàn thành các nhiệm vụ đã đăng ký (1,5đ). Lưu ý: Nếu KH hoặc đăng ký thiếu nội dung/trễ hạn thì mục hoàn thành chấm tối đa 0,5đ.",
    "warningNote": "Phải đính kèm đủ 3 văn bản: Kế hoạch thực hiện Chỉ thị 05-CT/TU, Công văn đăng ký nhiệm vụ gửi Sở Nội vụ, và Báo cáo kết quả thực hiện kèm minh chứng.",
    "formulaConfig": {
      "items": [
        {
          "key": "plan_05",
          "label": "Xây dựng KH triển khai Chỉ thị 05-CT/TU đầy đủ nội dung, đúng hạn",
          "score": 0.5
        },
        {
          "key": "reg_05",
          "label": "Đăng ký nội dung, nhiệm vụ với Sở Nội vụ đúng hạn",
          "score": 0.5
        },
        {
          "key": "done_05",
          "label": "Hoàn thành 100% các nhiệm vụ đã đăng ký (có minh chứng)",
          "score": 1.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.7.b",
    "code": "I.7.b",
    "domainId": "I",
    "groupTitle": "7. Triển khai thực hiện các Kế hoạch của UBND thành phố (4,0 điểm)",
    "title": "Triển khai KH số 233/KH-UBND (QĐ 534/QĐ-TTg) và KH số 44-KH/TU (Kết luận 226-KL/TW về chấn chỉnh lề lối làm việc)",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổng 1,5 điểm gồm: (1) Xây dựng kế hoạch thực hiện của đơn vị đảm bảo đầy đủ nội dung và thời gian (0,5đ); (2) Báo cáo kết quả triển khai tích hợp vào báo cáo định kỳ CCHC hằng năm (1,0đ). Nếu KH thiếu nhiệm vụ chấm tối đa 0,5đ mục báo cáo.",
    "warningNote": "Kiểm tra mục báo cáo thực hiện KH 233/KH-UBND và KH 44-KH/TU phải nằm trong Báo cáo CCHC năm của phường.",
    "formulaConfig": {
      "items": [
        {
          "key": "plan_233",
          "label": "Xây dựng Kế hoạch thực hiện KH 233/KH-UBND & KH 44-KH/TU đúng hạn, đủ nội dung",
          "score": 0.5
        },
        {
          "key": "rep_233",
          "label": "Tích hợp đầy đủ kết quả thực hiện vào Báo cáo CCHC năm của đơn vị",
          "score": 1
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "I.8",
    "code": "I.8",
    "domainId": "I",
    "groupTitle": "8. Đổi mới, sáng tạo trong triển khai nhiệm vụ CCHC (3,0 điểm)",
    "title": "Số lượng sáng kiến hoặc giải pháp mới trong triển khai nhiệm vụ CCHC tại địa phương",
    "maxScore": 3,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Tất cả cơ quan, đơn vị"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có từ 03 sáng kiến hoặc giải pháp mới trở lên: 3,0 điểm; Có 02 sáng kiến hoặc giải pháp mới: 2,0 điểm; Có 01 sáng kiến hoặc giải pháp mới: 1,0 điểm; Không có sáng kiến: 0 điểm.",
    "warningNote": "Tham mưu UBND phường triển khai tối thiểu 03 sáng kiến, giải pháp mới trong công tác CCHC kèm Quyết định công nhận/triển khai và báo cáo hiệu quả.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "ini_3_plus",
          "label": "Có từ 03 sáng kiến hoặc giải pháp mới trở lên được triển khai hiệu quả",
          "score": 3
        },
        {
          "key": "ini_2",
          "label": "Có 02 sáng kiến hoặc giải pháp mới",
          "score": 2
        },
        {
          "key": "ini_1",
          "label": "Có 01 sáng kiến hoặc giải pháp mới",
          "score": 1
        },
        {
          "key": "ini_0",
          "label": "Không có sáng kiến hoặc giải pháp mới",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "II.1",
    "code": "II.1",
    "domainId": "II",
    "groupTitle": "1. Thực hiện rà soát, tham mưu xử lý kết quả rà soát VBQPPL",
    "title": "Thực hiện rà soát, tham mưu xử lý kết quả rà soát văn bản quy phạm pháp luật do cơ quan mình tham mưu ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Công chức Tư pháp - Hộ tịch"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện đầy đủ theo quy định: chấm 1,0 điểm; Có thực hiện nhưng chưa đầy đủ theo quy định: chấm 0,5 điểm; Không thực hiện: 0 điểm.",
    "warningNote": "Giao Văn phòng HĐND-UBND phường khẩn trương hoàn thành đúng tiến độ Kế hoạch rà soát VBQPPL theo quy định của cấp trên.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full",
          "label": "Thực hiện rà soát và xử lý kết quả rà soát VBQPPL đầy đủ, đúng tiến độ",
          "score": 1
        },
        {
          "key": "partial",
          "label": "Có thực hiện nhưng chưa đầy đủ theo quy định",
          "score": 0.5
        },
        {
          "key": "none",
          "label": "Không thực hiện",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "II.2.a",
    "code": "II.2.a",
    "domainId": "II",
    "groupTitle": "2. Thực hiện tự kiểm tra văn bản quy phạm pháp luật (2,0 điểm)",
    "title": "Thực hiện tự kiểm tra văn bản quy phạm pháp luật do cơ quan, đơn vị mình tham mưu ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Công chức Tư pháp - Hộ tịch"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện đầy đủ theo quy định: 1,0 điểm; Có thực hiện nhưng chưa đầy đủ: 0,5 điểm; Không thực hiện: 0 điểm.",
    "warningNote": "Lập danh mục và phiếu tự kiểm tra đối với 100% VBQPPL ban hành trong năm.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full",
          "label": "Thực hiện tự kiểm tra VBQPPL đầy đủ 100% theo quy định",
          "score": 1
        },
        {
          "key": "partial",
          "label": "Có thực hiện nhưng chưa đầy đủ",
          "score": 0.5
        },
        {
          "key": "none",
          "label": "Không thực hiện",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "II.2.b",
    "code": "II.2.b",
    "domainId": "II",
    "groupTitle": "2. Thực hiện tự kiểm tra văn bản quy phạm pháp luật (2,0 điểm)",
    "title": "Báo cáo kết quả tự kiểm tra văn bản quy phạm pháp luật do cơ quan, đơn vị mình tham mưu ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Công chức Tư pháp - Hộ tịch"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có thực hiện báo cáo kết quả tự kiểm tra VBQPPL: 1,0 điểm; Không thực hiện báo cáo: 0 điểm.",
    "warningNote": "Phải có Báo cáo kết quả tự kiểm tra VBQPPL gửi Sở Tư pháp / cấp trên đúng thời hạn.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "II.3",
    "code": "II.3",
    "domainId": "II",
    "groupTitle": "3. Kiểm soát quy định thủ tục hành chính (1,0 điểm)",
    "title": "Kiến nghị cải cách TTHC, sửa đổi bổ sung VBQPPL quy định TTHC và được cơ quan có thẩm quyền đồng ý sửa đổi",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có các kiến nghị cải cách TTHC, kiến nghị cụ thể sửa đổi, bổ sung VBQPPL quy định TTHC trong năm đánh giá: 0,5 điểm. Các kiến nghị được cơ quan, ban, ngành đồng ý sửa đổi: 0,5 điểm.",
    "warningNote": "Lưu giữ cả Công văn kiến nghị của UBND phường và Văn bản phản hồi đồng ý/tiếp thu của Sở chuyên ngành hoặc Văn phòng UBND TP.",
    "formulaConfig": {
      "items": [
        {
          "key": "proposed",
          "label": "Có văn bản kiến nghị cải cách TTHC, sửa đổi bổ sung VBQPPL quy định TTHC",
          "score": 0.5
        },
        {
          "key": "accepted",
          "label": "Kiến nghị được cơ quan, sở, ban, ngành có thẩm quyền đồng ý sửa đổi",
          "score": 0.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.1.a",
    "code": "III.1.a",
    "domainId": "III",
    "groupTitle": "1. Thực hiện các báo cáo liên quan đến hoạt động kiểm soát TTHC (1,0 điểm)",
    "title": "Báo cáo hoạt động kiểm soát TTHC đầy đủ số lượng và đúng thời hạn",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Báo cáo đầy đủ số lượng và đúng thời hạn: 0,5 điểm. Thiếu hoặc trễ 03 ngày làm việc mỗi báo cáo trừ nửa số điểm (0,25 điểm).",
    "warningNote": "Giao Trung tâm Phục vụ HCC phường chủ trì thực hiện nghiêm các báo cáo kiểm soát TTHC, tuyệt đối không trễ quá 03 ngày làm việc.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "ontime_all",
          "label": "Báo cáo đầy đủ số lượng và đúng thời hạn 100%",
          "score": 0.5
        },
        {
          "key": "late_1",
          "label": "Thiếu hoặc trễ hạn (> 03 ngày làm việc) 01 báo cáo",
          "score": 0.25
        },
        {
          "key": "late_2_plus",
          "label": "Thiếu hoặc trễ hạn từ 02 báo cáo trở lên",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.1.b",
    "code": "III.1.b",
    "domainId": "III",
    "groupTitle": "1. Thực hiện các báo cáo liên quan đến hoạt động kiểm soát TTHC (1,0 điểm)",
    "title": "Báo cáo hoạt động kiểm soát TTHC đầy đủ các nội dung theo mẫu yêu cầu",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Báo cáo đầy đủ các nội dung theo mẫu yêu cầu: 0,5 điểm. Thiếu mỗi nội dung trừ nửa số điểm (0,25 điểm).",
    "warningNote": "Kiểm tra kỹ các phụ lục thống kê TTHC đính kèm báo cáo theo Thông tư 01/2020/TT-VPCP và Thông tư 03/2025/TT-VPCP.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full_content",
          "label": "Đầy đủ 100% nội dung và biểu mẫu kiểm soát TTHC",
          "score": 0.5
        },
        {
          "key": "miss_1",
          "label": "Thiếu 01 nội dung theo mẫu yêu cầu",
          "score": 0.25
        },
        {
          "key": "miss_2_plus",
          "label": "Thiếu từ 02 nội dung trở lên",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.2",
    "code": "III.2",
    "domainId": "III",
    "groupTitle": "2. Thực hiện cơ chế một cửa, cơ chế một cửa liên thông (2,0 điểm)",
    "title": "Kết quả giải quyết hồ sơ TTHC: Tỷ lệ hồ sơ TTHC do UBND phường tiếp nhận trong năm được giải quyết đúng hạn",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "ontime_dossier_rate",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Các phòng chuyên môn giải quyết TTHC"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Từ 98% - 100%: 2,0 điểm; Từ 95% - dưới 98%: 1,5 điểm; Từ 90% - dưới 95%: 1,0 điểm; Dưới 90%: 0 điểm. Ghi chú: Nếu qua kiểm tra xác suất của Sở Nội vụ có hồ sơ trễ hạn thì lấy kết quả kiểm tra của Sở Nội vụ.",
    "warningNote": "Phấn đấu tỷ lệ hồ sơ TTHC giải quyết đúng hạn đạt 100% (tối thiểu đạt >= 98%). Nếu có hồ sơ trễ hạn bắt buộc phải ban hành Thư xin lỗi để không bị trừ 1,0 điểm tại Mục IX.2.a!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số hồ sơ TTHC giải quyết đúng hạn và trước hạn (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số hồ sơ TTHC đã giải quyết trong kỳ (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.3.a",
    "code": "III.3.a",
    "domainId": "III",
    "groupTitle": "3. Tiếp nhận, xử lý phản ánh, kiến nghị (PAKN) của cá nhân, tổ chức (2,0 điểm)",
    "title": "Xử lý phản ánh, kiến nghị của cá nhân, tổ chức thuộc thẩm quyền giải quyết của phường",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "ratio_ba",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Các phòng chuyên môn"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tính điểm theo công thức: (b/a) * điểm tối đa (1,0đ). Trong đó: a là tổng số kiến nghị phải trả lời; b là số kiến nghị đã được trả lời. Trường hợp a = 0 thì đạt điểm tối đa.",
    "warningNote": "Giao Văn phòng HĐND-UBND phường triển khai hoàn thành đúng tiến độ, phấn đấu đạt 100% tiêu chí tiếp nhận, xử lý PAKN thuộc thẩm quyền.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số phản ánh, kiến nghị đã được xử lý, trả lời đúng hạn (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số phản ánh, kiến nghị thuộc thẩm quyền phải trả lời (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.3.b",
    "code": "III.3.b",
    "domainId": "III",
    "groupTitle": "3. Tiếp nhận, xử lý phản ánh, kiến nghị (PAKN) của cá nhân, tổ chức (2,0 điểm)",
    "title": "Công khai kết quả trả lời PAKN của cá nhân, tổ chức thuộc thẩm quyền",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% số PAKN được xử lý, trả lời được công khai theo quy định: 1,0 điểm; Từ 80% đến dưới 100%: 0,5 điểm; Dưới 80%: 0 điểm.",
    "warningNote": "Công khai đầy đủ văn bản trả lời PAKN trên Cổng thông tin điện tử phường và Hệ thống PAKN.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "pub_100",
          "label": "100% số PAKN đã xử lý được công khai đầy đủ theo quy định",
          "score": 1
        },
        {
          "key": "pub_80_99",
          "label": "Từ 80% đến dưới 100% số PAKN được công khai",
          "score": 0.5
        },
        {
          "key": "pub_under_80",
          "label": "Dưới 80% số PAKN được công khai",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.4.a",
    "code": "III.4.a",
    "domainId": "III",
    "groupTitle": "4. Thực hiện khảo sát mức độ hài lòng đối với dịch vụ hành chính công (6,0 điểm)",
    "title": "Xây dựng kế hoạch khảo sát hài lòng trực tuyến và khảo sát chuyên ngành tại https://khaosathailong.danang.gov.vn",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "30/04/2026",
    "status": "pending",
    "regulationText": "Có xây dựng kế hoạch thực hiện khảo sát đảm bảo các nội dung theo quy định về khung khảo sát mức độ hài lòng trực tuyến và chuyên ngành tại https://khaosathailong.danang.gov.vn (có thể lồng ghép trong 1 kế hoạch): 1,0 điểm. Không ban hành: 0 điểm.",
    "warningNote": "Giao Phòng Văn hóa - Xã hội phối hợp Trung tâm Phục vụ HCC xây dựng kế hoạch và triển khai khảo sát mức độ hài lòng của tổ chức, công dân.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.4.b",
    "code": "III.4.b",
    "domainId": "III",
    "groupTitle": "4. Thực hiện khảo sát mức độ hài lòng đối với dịch vụ hành chính công (6,0 điểm)",
    "title": "Kết quả đánh giá khảo sát hài lòng trực tuyến tại https://khaosathailong.danang.gov.vn (tỷ lệ phúc tra < 20%)",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tỷ lệ đảm bảo theo quy định về Khung khảo sát mức độ hài lòng và tỷ lệ phúc tra sai lệch dưới 20%: 1,5 điểm; Không đảm bảo tối thiểu nhưng đạt từ 50% theo quy định (phúc tra < 20%): 0,5 điểm; Phúc tra sai lệch trên 20% hoặc đạt dưới 50%: 0 điểm.",
    "warningNote": "Tuyệt đối hướng dẫn công dân tự đánh giá bằng số điện thoại chính chủ để khi Sở Nội vụ phúc tra ngẫu nhiên không bị sai lệch thông tin quá 20%.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full_valid",
          "label": "Đạt 100% quy định Khung khảo sát & Tỷ lệ phúc tra sai lệch dưới 20%",
          "score": 1.5
        },
        {
          "key": "half_valid",
          "label": "Triển khai đạt từ 50% quy định & Tỷ lệ phúc tra dưới 20%",
          "score": 0.5
        },
        {
          "key": "invalid",
          "label": "Phúc tra sai lệch trên 20% hoặc số lượng khảo sát dưới 50%",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.4.c",
    "code": "III.4.c",
    "domainId": "III",
    "groupTitle": "4. Thực hiện khảo sát mức độ hài lòng đối với dịch vụ hành chính công (6,0 điểm)",
    "title": "Tổ chức khảo sát độc lập bằng mã QR trên hệ thống TP đối với TTHC phát sinh nhiều hồ sơ (có văn bản gửi Sở Nội vụ giám sát)",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tạo mẫu phiếu trên https://khaosathailong.danang.gov.vn, xuất mã QR và có văn bản gửi Sở Nội vụ giám sát. Triển khai khảo sát từ 02 lĩnh vực trở lên (đủ mẫu số chung): 2,0 điểm; Triển khai 01 lĩnh vực: 1,0 điểm; Số phiếu không đảm bảo tỷ lệ chung: 0,5 điểm/lĩnh vực.",
    "warningNote": "BẮT BUỘC: (1) Không lấy kết quả khảo sát trực tuyến để tính cho mục này; (2) Phải có Công văn gửi Sở Nội vụ giám sát trong quá trình triển khai; (3) Khảo sát >= 02 lĩnh vực (VD: Hộ tịch & Chứng thực/Đất đai).",
    "formulaConfig": {
      "tiers": [
        {
          "key": "qr_2_domains",
          "label": "Khảo sát độc lập QR từ 02 lĩnh vực trở lên (đủ số phiếu + có CV gửi Sở Nội vụ giám sát)",
          "score": 2
        },
        {
          "key": "qr_1_domain",
          "label": "Khảo sát độc lập QR 01 lĩnh vực (đủ số phiếu) hoặc 02 lĩnh vực nhưng thiếu mẫu số phiếu",
          "score": 1
        },
        {
          "key": "qr_1_low",
          "label": "Khảo sát 01 lĩnh vực nhưng số lượng phiếu chưa đạt tỷ lệ chung",
          "score": 0.5
        },
        {
          "key": "qr_none",
          "label": "Không triển khai trên hệ thống TP hoặc số phiếu quá thấp",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "III.4.d",
    "code": "III.4.d",
    "domainId": "III",
    "groupTitle": "4. Thực hiện khảo sát mức độ hài lòng đối với dịch vụ hành chính công (6,0 điểm)",
    "title": "Báo cáo đánh giá kết quả khảo sát (đủ 03 nội dung) và đề xuất giải pháp cải thiện dịch vụ hành chính công",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Báo cáo phải thể hiện đầy đủ 03 nội dung: (1) Về khảo sát trực tuyến; (2) Khảo sát độc lập chuyên ngành do đơn vị tự triển khai trên hệ thống TP; (3) Khảo sát độc lập do thành phố triển khai (Viện Nghiên cứu, Trung tâm IOC), kèm nguyên nhân hạn chế và giải pháp. Thiếu 1 trong 3 nội dung hoặc không hoàn thành KH khảo sát: 0 điểm.",
    "warningNote": "CẢNH BÁO QUAN TRỌNG: Báo cáo đánh giá khảo sát hài lòng bắt buộc phải có đủ cả 3 phần (Trực tuyến + Độc lập tự làm + Độc lập do TP/IOC làm). Thiếu 1 phần sẽ bị 0 điểm toàn bộ mục III.4.d (1,5 điểm)!",
    "formulaConfig": {
      "allRequiredForScore": true,
      "items": [
        {
          "key": "part1_online",
          "label": "Phần 1: Đánh giá số liệu & kết quả khảo sát trực tuyến",
          "score": 0.5
        },
        {
          "key": "part2_self_qr",
          "label": "Phần 2: Đánh giá kết quả khảo sát độc lập chuyên ngành do phường tự triển khai",
          "score": 0.5
        },
        {
          "key": "part3_city_ioc",
          "label": "Phần 3: Đánh giá kết quả khảo sát độc lập do TP triển khai (Viện Nghiên cứu/IOC) + Giải pháp",
          "score": 0.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.1",
    "code": "IV.1",
    "domainId": "IV",
    "groupTitle": "1. Sắp xếp, kiện toàn tổ chức bộ máy của các cơ quan, đơn vị (1,0 điểm)",
    "title": "Hoàn thiện quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của địa phương và các đơn vị trực thuộc",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Kịp thời, đúng quy định: chấm 1,0 điểm; Không kịp thời hoặc không đúng quy định: 0 điểm.",
    "warningNote": "Giao Phòng Văn hóa - Xã hội hoàn thành các tiêu chí về sắp xếp, kiện toàn tổ chức bộ máy các phòng, trung tâm thuộc phường.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.2.a",
    "code": "IV.2.a",
    "domainId": "IV",
    "groupTitle": "2. Thực hiện các quy định về quản lý biên chế (2,0 điểm)",
    "title": "Thực hiện quy định về sử dụng biên chế hành chính (không vượt quá số lượng được giao)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Sử dụng không vượt quá số lượng biên chế hành chính được giao: 1,0 điểm; Vượt quá: 0 điểm.",
    "warningNote": "Đối chiếu danh sách bảng lương công chức với Quyết định giao biên chế năm 2026 của UBND TP.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.2.b",
    "code": "IV.2.b",
    "domainId": "IV",
    "groupTitle": "2. Thực hiện các quy định về quản lý biên chế (2,0 điểm)",
    "title": "Thực hiện quy định về số lượng người làm việc hưởng lương từ NSNN trong các đơn vị sự nghiệp công lập",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường",
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Sử dụng không vượt quá số lượng người làm việc được giao: 1,0 điểm; Vượt quá: 0 điểm.",
    "warningNote": "Kiểm tra số lượng viên chức hưởng lương ngân sách tại các đơn vị sự nghiệp trực thuộc phường.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.3",
    "code": "IV.3",
    "domainId": "IV",
    "groupTitle": "3. Cơ cấu số lượng lãnh đạo (1,0 điểm)",
    "title": "Thực hiện đúng 100% quy định về cơ cấu số lượng lãnh đạo (lãnh đạo UBND phường và lãnh đạo các phòng chuyên môn)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện đúng 100% quy định về cơ cấu số lượng lãnh đạo UBND cấp xã và lãnh đạo các phòng chuyên môn thuộc UBND cấp xã: 1,0 điểm.",
    "warningNote": "Đảm bảo số lượng Phó Chủ tịch UBND phường và Phó Trưởng phòng chuyên môn không vượt quy định.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.4.a",
    "code": "IV.4.a",
    "domainId": "IV",
    "groupTitle": "4. Thực hiện phân cấp, ủy quyền trong quản lý nhà nước (5,0 điểm)",
    "title": "Thực hiện các quy định về đề xuất, phê duyệt và thực hiện phân cấp, ủy quyền trong quản lý nhà nước",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường",
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổng 2,0 điểm gồm: (1) Có văn bản kiến nghị, đề xuất nội dung cần phân cấp, ủy quyền (0,5đ); (2) Được phê duyệt và ban hành Quyết định triển khai thực tế (0,5đ); (3) Thực hiện phân cấp, ủy quyền cho công chức thuộc UBND cấp mình đúng quy định (1,0đ - nếu có đề xuất nhưng không được phê duyệt chấm 0,5đ).",
    "warningNote": "Quan tâm thực hiện phân cấp, ủy quyền quản lý ngành, lĩnh vực cho các phòng ban, đơn vị và công chức chuyên môn (như ủy quyền ký chứng thực).",
    "formulaConfig": {
      "items": [
        {
          "key": "propose_pc",
          "label": "Có văn bản kiến nghị, đề xuất các nội dung cần thực hiện phân cấp, ủy quyền",
          "score": 0.5
        },
        {
          "key": "approve_pc",
          "label": "Có kiến nghị được phê duyệt và ban hành Quyết định triển khai thực tế",
          "score": 0.5
        },
        {
          "key": "delegate_cc",
          "label": "Thực hiện phân cấp, ủy quyền cho phòng ban, công chức thuộc UBND phường đúng quy định",
          "score": 1
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.4.b",
    "code": "IV.4.b",
    "domainId": "IV",
    "groupTitle": "4. Thực hiện phân cấp, ủy quyền trong quản lý nhà nước (5,0 điểm)",
    "title": "Tổ chức kiểm tra đánh giá trên thực tế đối với các nhiệm vụ đã được phân cấp, ủy quyền",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đơn vị có tiến hành kiểm tra đánh giá trên thực tế đối với các nhiệm vụ đã được phân cấp, ủy quyền (có thể lồng ghép kiểm tra CCHC cuối năm nhưng phải có mục kiểm tra phân cấp, ủy quyền đối với đúng đối tượng nhận ủy quyền): 1,0 điểm. Không thực hiện: 0 điểm.",
    "warningNote": "Trong Biên bản và Thông báo kết luận kiểm tra CCHC phải có mục riêng ghi nhận kết quả kiểm tra các quyết định phân cấp, ủy quyền đã ban hành.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.4.c",
    "code": "IV.4.c",
    "domainId": "IV",
    "groupTitle": "4. Thực hiện phân cấp, ủy quyền trong quản lý nhà nước (5,0 điểm)",
    "title": "Thực hiện báo cáo định kỳ, đột xuất đảm bảo thời gian, yêu cầu về nhiệm vụ phân cấp, ủy quyền",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Phòng Kinh tế, Hạ tầng và Đô thị phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện báo cáo định kỳ, đột xuất đảm bảo thời gian, yêu cầu liên quan đến việc thực hiện nhiệm vụ phân cấp, ủy quyền thuộc ngành lĩnh vực: 1,0 điểm.",
    "warningNote": "Tổng hợp đầy đủ báo cáo phân cấp, ủy quyền gửi Sở Nội vụ và các Sở chuyên ngành.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IV.4.d",
    "code": "IV.4.d",
    "domainId": "IV",
    "groupTitle": "4. Thực hiện phân cấp, ủy quyền trong quản lý nhà nước (5,0 điểm)",
    "title": "100% đơn vị được kiểm tra phân cấp, ủy quyền có báo cáo khắc phục tồn tại hạn chế, đề xuất giải pháp",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các phòng, đơn vị được kiểm tra"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% đơn vị được kiểm tra có báo cáo khắc phục các nội dung tồn tại hạn chế, đề xuất các giải pháp trong thời gian đến về phân cấp, ủy quyền: 1,0 điểm.",
    "warningNote": "Báo cáo khắc phục của các đơn vị phải có phần giải trình, khắc phục về nghiệp vụ được phân cấp, ủy quyền.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.1.a",
    "code": "V.1.a",
    "domainId": "V",
    "groupTitle": "1. Thực hiện cơ cấu công chức, viên chức theo vị trí việc làm (2,0 điểm)",
    "title": "Cập nhật, hoàn thiện quy định về vị trí việc làm của cơ quan, tổ chức thuộc phạm vi quản lý",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Cập nhật, hoàn thiện quy định về vị trí việc làm đầy đủ, kịp thời: 1,0 điểm; Chưa đầy đủ hoặc chưa kịp thời: 0 điểm.",
    "warningNote": "Giao Phòng Văn hóa - Xã hội hoàn thành các tiêu chí về cơ cấu công chức, viên chức theo vị trí việc làm.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.1.b",
    "code": "V.1.b",
    "domainId": "V",
    "groupTitle": "1. Thực hiện cơ cấu công chức, viên chức theo vị trí việc làm (2,0 điểm)",
    "title": "Tỷ lệ cơ quan, tổ chức hành chính của đơn vị bố trí công chức theo đúng vị trí việc làm được phê duyệt",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% số cơ quan, tổ chức hành chính bố trí đúng VTVL: 0,5 điểm; Dưới 100%: 0 điểm.",
    "warningNote": "Kiểm tra bảng phân công công tác công chức khớp 100% với bản mô tả vị trí việc làm và ngạch công chức.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.1.c",
    "code": "V.1.c",
    "domainId": "V",
    "groupTitle": "1. Thực hiện cơ cấu công chức, viên chức theo vị trí việc làm (2,0 điểm)",
    "title": "Tỷ lệ đơn vị sự nghiệp thuộc đơn vị bố trí viên chức theo đúng vị trí việc làm được phê duyệt",
    "maxScore": 0.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% đơn vị sự nghiệp bố trí viên chức đúng VTVL: 0,5 điểm; Dưới 100%: 0 điểm.",
    "warningNote": "Kiểm tra danh sách bố trí viên chức tại Trung tâm Phục vụ HCC và Trung tâm Cung ứng DVSNC.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.2",
    "code": "V.2",
    "domainId": "V",
    "groupTitle": "2. Thực hiện quy định về bổ nhiệm vị trí lãnh đạo (1,0 điểm)",
    "title": "Thực hiện quy định về bổ nhiệm, bổ nhiệm lại vị trí lãnh đạo tại các phòng, ban, đơn vị sự nghiệp trực thuộc",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% lãnh đạo các phòng chuyên môn bổ nhiệm đúng điều kiện, tiêu chuẩn: 0,5 điểm; 100% lãnh đạo tại các đơn vị sự nghiệp trực thuộc bổ nhiệm, bổ nhiệm lại đúng điều kiện, tiêu chuẩn: 0,5 điểm.",
    "warningNote": "Rà soát hồ sơ bổ nhiệm cán bộ quản lý đảm bảo đủ tiêu chuẩn trình độ lý luận chính trị, quản lý nhà nước.",
    "formulaConfig": {
      "items": [
        {
          "key": "dept_leaders",
          "label": "100% lãnh đạo các phòng chuyên môn bổ nhiệm đúng điều kiện, tiêu chuẩn",
          "score": 0.5
        },
        {
          "key": "unit_leaders",
          "label": "100% lãnh đạo tại các đơn vị sự nghiệp trực thuộc bổ nhiệm đúng điều kiện, tiêu chuẩn",
          "score": 0.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.3.a",
    "code": "V.3.a",
    "domainId": "V",
    "groupTitle": "3. Đào tạo, bồi dưỡng cán bộ, công chức, viên chức (2,0 điểm)",
    "title": "Xây dựng kế hoạch đào tạo, bồi dưỡng công chức, viên chức hàng năm đúng quy định, kịp thời",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "31/03/2026",
    "status": "pending",
    "regulationText": "Xây dựng kế hoạch đúng quy định, kịp thời: 1,0 điểm; Không đúng quy định hoặc không kịp thời: 0 điểm.",
    "warningNote": "Kế hoạch đào tạo, bồi dưỡng CBCCVC phải ban hành ngay từ đầu năm.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.3.b",
    "code": "V.3.b",
    "domainId": "V",
    "groupTitle": "3. Đào tạo, bồi dưỡng cán bộ, công chức, viên chức (2,0 điểm)",
    "title": "Mức độ hoàn thành kế hoạch đào tạo, bồi dưỡng công chức, viên chức",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Hoàn thành 100% kế hoạch đào tạo, bồi dưỡng: 1,0 điểm; Không đạt 100% kế hoạch: 0 điểm.",
    "warningNote": "Đính kèm danh sách cử CBCCVC tham gia các lớp bồi dưỡng và chứng chỉ/giấy chứng nhận hoàn thành.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.4",
    "code": "V.4",
    "domainId": "V",
    "groupTitle": "4. Chấp hành kỷ luật, kỷ cương hành chính (1,5 điểm)",
    "title": "Trong năm không có cán bộ, công chức, viên chức bị xử lý kỷ luật",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả 05 cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổng 1,5 điểm gồm: (a) Không có người đứng đầu cơ quan, đơn vị bị xử lý kỷ luật (0,5đ); (b) Không có lãnh đạo, quản lý cấp phòng trở lên bị xử lý kỷ luật (0,5đ); (c) Không có CCVC không giữ chức vụ lãnh đạo, quản lý bị xử lý kỷ luật (0,5đ).",
    "warningNote": "Tăng cường văn hóa công vụ, chấp hành kỷ luật, kỷ cương hành chính. Nếu có CBCCVC bị kỷ luật vừa mất điểm mục này vừa bị trừ 1,0 điểm tại Mục IX.2.b!",
    "formulaConfig": {
      "items": [
        {
          "key": "no_head_disc",
          "label": "Không có người đứng đầu cơ quan, đơn vị bị xử lý kỷ luật",
          "score": 0.5
        },
        {
          "key": "no_mgr_disc",
          "label": "Không có lãnh đạo, quản lý cấp phòng trở lên bị xử lý kỷ luật",
          "score": 0.5
        },
        {
          "key": "no_staff_disc",
          "label": "Không có công chức, viên chức không giữ chức vụ lãnh đạo bị xử lý kỷ luật",
          "score": 0.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.5",
    "code": "V.5",
    "domainId": "V",
    "groupTitle": "5. Cập nhật thông tin trên Phần mềm quản lý CBCCVC (2,0 điểm)",
    "title": "Tỷ lệ hồ sơ CBCCVC, người lao động (kể cả đơn vị trực thuộc) được cập nhật kịp thời, đầy đủ và xác thực trên Phần mềm",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "cbccvc_software_rate",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% hồ sơ được cập nhật kịp thời, đầy đủ và xác thực: 2,0 điểm; Từ 80% đến dưới 100%: Tỷ lệ % đạt được * 1,0 điểm; Dưới 80%: 0 điểm.",
    "warningNote": "Lưu ý: Chỉ sót 1 hồ sơ chưa bấm nút 'Xác thực' trên phần mềm quản lý CBCCVC thành phố thì điểm sẽ rớt từ 2,0đ xuống dưới 1,0đ!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số hồ sơ CBCCVC đã cập nhật đầy đủ và xác thực trên phần mềm (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số hồ sơ CBCCVC, người lao động toàn phường & đơn vị trực thuộc (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.6.a",
    "code": "V.6.a",
    "domainId": "V",
    "groupTitle": "6. Triển khai công tác đánh giá, xếp loại công chức theo hiệu quả công việc (3,5 điểm)",
    "title": "Triển khai đánh giá kết quả làm việc hàng tháng của công chức trên phần mềm của UBND thành phố đúng thời gian quy định",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "monthly_eval_software",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đánh giá đầy đủ và đúng thời gian quy định tất cả các tháng: 2,0 điểm; Có 01 tháng trễ hạn hoặc không đầy đủ: 1,0 điểm; Có > 01 tháng trễ hạn/không đầy đủ: 0 điểm. *Ghi chú: Đơn vị có tỷ lệ Xuất sắc quá cao hoặc đánh giá đồng đều (Mức Tốt) tất cả các tháng thì chấm tối đa 0,5 điểm.",
    "warningNote": "KIỂM SOÁT CHỐNG MẤT ĐIỂM: Đôn đốc 100% CBCC đánh giá trước hạn cuối mỗi tháng và kiểm soát tỷ lệ xếp loại để không bị khống chế trần 0,5 điểm!",
    "formulaConfig": {
      "fields": [
        {
          "name": "lateMonths",
          "label": "Số tháng đánh giá trễ hạn hoặc không đầy đủ (0, 1, hoặc >=2)",
          "default": 0
        },
        {
          "name": "isFlatOrTooHigh",
          "label": "Vi phạm tỷ lệ Xuất sắc quá cao hoặc cào bằng mức Tốt (0 = Không vi phạm, 1 = Có vi phạm)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "V.6.b",
    "code": "V.6.b",
    "domainId": "V",
    "groupTitle": "6. Triển khai công tác đánh giá, xếp loại công chức theo hiệu quả công việc (3,5 điểm)",
    "title": "Thực hiện đánh giá, xếp loại chất lượng công chức cuối năm có sử dụng kết quả đánh giá hàng tháng xuất từ phần mềm",
    "maxScore": 1.5,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "yearly_eval_software",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đánh giá cuối năm đầy đủ, đúng hạn có sử dụng kết quả hàng tháng xuất từ phần mềm: 1,5 điểm; Có 01 tháng không hoàn thành: 1,0 điểm; Có > 01 tháng không hoàn thành: 0 điểm. Nếu tỷ lệ Xuất sắc quá cao hoặc đồng đều mức Tốt qua theo dõi tháng/quý thì chấm tối đa 0,5 điểm.",
    "warningNote": "Lưu trữ bảng xuất dữ liệu tổng hợp điểm 12 tháng từ phần mềm làm căn cứ họp xét cuối năm.",
    "formulaConfig": {
      "fields": [
        {
          "name": "lateMonths",
          "label": "Số tháng không hoàn thành đúng quy định (0, 1, hoặc >=2)",
          "default": 0
        },
        {
          "name": "isFlatOrTooHigh",
          "label": "Vi phạm tỷ lệ Xuất sắc quá cao hoặc cào bằng mức Tốt (0 = Không, 1 = Có)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.1",
    "code": "VI.1",
    "domainId": "VI",
    "groupTitle": "1. Lập dự toán ngân sách hằng năm (1,0 điểm - Theo đánh giá Sở Tài chính)",
    "title": "Lập và gửi dự toán ngân sách hằng năm đảm bảo thời gian và biểu mẫu theo quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Lập và gửi dự toán đảm bảo thời gian và biểu mẫu theo quy định: 1,0 điểm; Chưa đảm bảo thời gian hoặc thiếu biểu mẫu: 0,5 điểm; Không thực hiện: 0 điểm.",
    "warningNote": "Giao Phòng Kinh tế, Hạ tầng và Đô thị triển khai hoàn thành các tiêu chí lĩnh vực cải cách tài chính công.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "full",
          "label": "Lập và gửi dự toán đảm bảo đúng thời gian và đầy đủ biểu mẫu quy định",
          "score": 1
        },
        {
          "key": "partial",
          "label": "Chưa đảm bảo thời gian hoặc thiếu biểu mẫu quy định",
          "score": 0.5
        },
        {
          "key": "none",
          "label": "Không thực hiện",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.2.a",
    "code": "VI.2.a",
    "domainId": "VI",
    "groupTitle": "2. Tình hình chấp hành dự toán ngân sách (3,0 điểm)",
    "title": "Thực hiện phân bổ và giao dự toán cho các đơn vị trực thuộc đảm bảo đầy đủ biểu mẫu và đúng thời gian quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Các đơn vị dự toán trực thuộc"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện phân bổ và giao dự toán cho các đơn vị trực thuộc đảm bảo đầy đủ biểu mẫu và đúng thời gian: 1,0 điểm. Nếu không đảm bảo 01 trong các tiêu chí thì không đạt điểm (0 điểm).",
    "warningNote": "Chuẩn bị sẵn Quyết định giao dự toán đầu năm và các phụ lục phân bổ chi tiết phục vụ Sở Tài chính thẩm định.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.2.b",
    "code": "VI.2.b",
    "domainId": "VI",
    "groupTitle": "2. Tình hình chấp hành dự toán ngân sách (3,0 điểm)",
    "title": "Lập và nộp báo cáo quyết toán năm trước liền kề đảm bảo đúng thời gian, biểu mẫu theo quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Lập và nộp báo cáo quyết toán năm trước liền kề đảm bảo đúng thời gian, biểu mẫu: 1,0 điểm. Không đảm bảo 01 trong các tiêu chí: 0 điểm.",
    "warningNote": "Lưu giữ biên nhận nộp báo cáo quyết toán ngân sách gửi Sở Tài chính đúng thời gian quy định.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.2.c",
    "code": "VI.2.c",
    "domainId": "VI",
    "groupTitle": "2. Tình hình chấp hành dự toán ngân sách (3,0 điểm)",
    "title": "Lập và nộp báo cáo quyết toán các chế độ chính sách an sinh xã hội năm trước liền kề đúng thời gian, biểu mẫu",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Lập và nộp báo cáo quyết toán các chế độ chính sách an sinh xã hội năm trước liền kề đảm bảo đúng thời gian, biểu mẫu: 1,0 điểm.",
    "warningNote": "Phối hợp chặt chẽ giữa bộ phận Tài chính - Kế toán và công chức Văn hóa - Xã hội phụ trách Bảo trợ xã hội.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.3.a",
    "code": "VI.3.a",
    "domainId": "VI",
    "groupTitle": "3. Thực hiện cơ chế tự chủ tại các đơn vị sự nghiệp công lập (2,0 điểm)",
    "title": "Có báo cáo đầy đủ tình hình thực hiện chế độ tự chủ, tự chịu trách nhiệm về sử dụng biên chế và kinh phí quản lý hành chính đúng hạn",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường",
      "Các đơn vị sự nghiệp công lập"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có báo cáo đầy đủ tình hình thực hiện chế độ tự chủ, tự chịu trách nhiệm về sử dụng biên chế và kinh phí quản lý hành chính đúng hạn theo quy định: 1,0 điểm.",
    "warningNote": "Gửi báo cáo tự chủ tài chính trước thời hạn quy định của Sở Tài chính.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.3.b",
    "code": "VI.3.b",
    "domainId": "VI",
    "groupTitle": "3. Thực hiện cơ chế tự chủ tại các đơn vị sự nghiệp công lập (2,0 điểm)",
    "title": "100% số lượng đơn vị sự nghiệp công lập thuộc phường xây dựng Quy chế chi tiêu nội bộ",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Trung tâm Cung ứng dịch vụ sự nghiệp công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% số lượng đơn vị sự nghiệp công lập xây dựng Quy chế chi tiêu nội bộ (tại thời điểm báo cáo phải có Quy chế chi tiêu nội bộ minh chứng): 1,0 điểm.",
    "warningNote": "Đính kèm trọn bộ Quy chế chi tiêu nội bộ năm 2026 của tất cả các đơn vị sự nghiệp trực thuộc UBND phường.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.4.a",
    "code": "VI.4.a",
    "domainId": "VI",
    "groupTitle": "4. Tình hình công khai ngân sách cấp xã (2,0 điểm)",
    "title": "Thực hiện công khai ngân sách đảm bảo đầy đủ biểu mẫu và đúng thời gian quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Thực hiện công khai đảm bảo đầy đủ biểu mẫu và đúng thời gian quy định: 1,0 điểm. Nếu không đảm bảo 01 trong các tiêu chí thì không đạt điểm phần này.",
    "warningNote": "Tập trung hoàn thành tiêu chí công khai ngân sách (niêm yết và đăng tải trên Trang TTĐT phường).",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.4.b",
    "code": "VI.4.b",
    "domainId": "VI",
    "groupTitle": "4. Tình hình công khai ngân sách cấp xã (2,0 điểm)",
    "title": "Báo cáo tình hình thực hiện công khai dự toán và quyết toán ngân sách đảm bảo đúng thời gian quy định",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Báo cáo tình hình thực hiện công khai dự toán và quyết toán ngân sách đảm bảo đúng thời gian quy định: 1,0 điểm.",
    "warningNote": "Đính kèm văn bản báo cáo tình hình công khai ngân sách gửi Sở Tài chính.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VI.5",
    "code": "VI.5",
    "domainId": "VI",
    "groupTitle": "5. Thực hiện thu ngân sách nhà nước theo chỉ tiêu thành phố giao (1,0 điểm)",
    "title": "Kết quả thực hiện thu ngân sách nhà nước trên địa bàn theo chỉ tiêu thành phố giao",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "budget_revenue_rate",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Đội Thuế liên phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đạt tỷ lệ 100% chỉ tiêu thành phố giao trở lên: 1,0 điểm; Đạt từ 80% đến dưới 100%: 0,5 điểm; Dưới 80%: 0 điểm.",
    "warningNote": "Phấn đấu hoàn thành vượt mức thu NSNN để vừa đạt 1,0đ mục này vừa lấy thêm tới +2,0 điểm thưởng tại Mục IX.1.f (Top 20/93 xã, phường)!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Tổng thu NSNN thực tế đạt được (tỷ đồng) (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Chỉ tiêu dự toán thu NSNN thành phố giao (tỷ đồng) (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.1.a",
    "code": "VII.1.a",
    "domainId": "VII",
    "groupTitle": "1. Ứng dụng chữ ký số văn bản điện tử tại đơn vị (3,0 điểm)",
    "title": "Tỷ lệ văn bản đến khi được quét từ bản giấy lên Phần mềm QLVBĐH có chữ ký số cơ quan (kiểm tra xác suất >= 50 VB)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "percentage_linear",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Kiểm tra xác suất ít nhất 50 văn bản bất kỳ trong năm đánh giá (loại trừ văn bản mật). Đạt tỷ lệ 100%: 1,0 điểm; Dưới 100%: Tỷ lệ % đạt được * 1,0 điểm.",
    "warningNote": "Kiểm soát chặt chẽ khâu Văn thư số hóa văn bản giấy đến phải ký số cơ quan 100% trước khi phát hành vào luồng xử lý.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đến bản giấy được quét có ký số cơ quan hợp lệ (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đến kiểm tra xác suất (a >= 50)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.1.b",
    "code": "VII.1.b",
    "domainId": "VII",
    "groupTitle": "1. Ứng dụng chữ ký số văn bản điện tử tại đơn vị (3,0 điểm)",
    "title": "Tỷ lệ văn bản đi được ký số lãnh đạo UBND phường và ký số cơ quan hợp lệ (kiểm tra xác suất >= 50 VB)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "percentage_linear",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Kiểm tra xác suất ít nhất 50 văn bản đi (trừ văn bản mật). Đạt tỷ lệ 100%: 1,0 điểm; Dưới 100%: Tỷ lệ % đạt được * 1,0 điểm.",
    "warningNote": "Nếu chưa thực hiện đầy đủ chữ ký số lãnh đạo UBND phường sẽ vừa bị giảm điểm mục này vừa bị trừ 1,0 điểm tại Mục IX.2.h!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đi có đủ chữ ký số Lãnh đạo UBND & ký số cơ quan hợp lệ (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đi của UBND kiểm tra xác suất (a >= 50)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.1.c",
    "code": "VII.1.c",
    "domainId": "VII",
    "groupTitle": "1. Ứng dụng chữ ký số văn bản điện tử tại đơn vị (3,0 điểm)",
    "title": "Tỷ lệ văn bản đi được ký số lãnh đạo Phòng, ban chuyên môn và ký số cơ quan phòng ban hợp lệ",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "percentage_linear",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Phòng Kinh tế, Hạ tầng và Đô thị phường",
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Kiểm tra xác suất văn bản đi của các phòng, ban chuyên môn (trừ văn bản mật). Đạt tỷ lệ 100%: 1,0 điểm; Dưới 100%: Tỷ lệ % đạt được * 1,0 điểm.",
    "warningNote": "CẢNH BÁO: Qua tự rà soát xác suất 50 văn bản của các phòng chuyên môn có 02 văn bản thiếu hiển thị ảnh chữ ký số cá nhân Trưởng phòng (đạt 48/50 = 96%). Đề nghị các Phòng khắc phục 100%!",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đi của Phòng có đủ ký số Lãnh đạo Phòng & ký số cơ quan Phòng (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đi của Phòng kiểm tra xác suất (a >= 50)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.2.a",
    "code": "VII.2.a",
    "domainId": "VII",
    "groupTitle": "2. Phát triển các ứng dụng, dịch vụ trong nội bộ cơ quan nhà nước (4,0 điểm)",
    "title": "Tỷ lệ xử lý văn bản, hồ sơ công việc hoàn toàn trên môi trường điện tử của đơn vị",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường",
      "Tất cả cơ quan, đơn vị"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đạt 100%: 1,0 điểm; Đạt từ 80% - dưới 100%: 0,5 điểm; Đạt dưới 80%: 0,25 điểm.",
    "warningNote": "Đảm bảo 100% hồ sơ công việc (trừ văn bản mật) được tạo lập, trình ký và lưu trữ điện tử trên QLVBĐH.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "env_100",
          "label": "Đạt 100% văn bản, hồ sơ công việc xử lý hoàn toàn trên môi trường điện tử",
          "score": 1
        },
        {
          "key": "env_80_99",
          "label": "Đạt từ 80% đến dưới 100%",
          "score": 0.5
        },
        {
          "key": "env_under_80",
          "label": "Đạt dưới 80%",
          "score": 0.25
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.2.b",
    "code": "VII.2.b",
    "domainId": "VII",
    "groupTitle": "2. Phát triển các ứng dụng, dịch vụ trong nội bộ cơ quan nhà nước (4,0 điểm)",
    "title": "Mức độ ứng dụng Trí tuệ nhân tạo (AI) do đơn vị tự xây dựng theo quy định và hướng dẫn của Sở KH&CN",
    "maxScore": 3,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "ai_applications",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Chỉ tính riêng nội dung do đơn vị tự xây dựng (nếu chỉ triển khai các nội dung do thành phố xây dựng thì chấm tối đa 1,0 điểm mục này). Gồm: (1) Có ứng dụng AI phục vụ CCVC (1,0đ); (2) Có ứng dụng AI phục vụ người dân, doanh nghiệp (1,0đ); (3) Có ứng dụng AI nâng cao khác (1,0đ).",
    "warningNote": "Giao Phòng Văn hóa - Xã hội hoàn thành tiêu chí Mức độ ứng dụng Trí tuệ nhân tạo (AI). Phải có hồ sơ chứng minh do phường tự xây dựng/huấn luyện theo hướng dẫn của Sở KH&CN!",
    "formulaConfig": {
      "fields": [
        {
          "name": "onlyCityAI",
          "label": "Nguồn xây dựng (0 = Phường tự xây dựng ứng dụng AI riêng; 1 = Chỉ dùng ứng dụng AI của TP)",
          "default": 0
        },
        {
          "name": "aiForStaff",
          "label": "Ứng dụng AI phục vụ công chức, viên chức (0 hoặc 1)",
          "default": 0
        },
        {
          "name": "aiForCitizen",
          "label": "Ứng dụng AI phục vụ người dân, doanh nghiệp tra cứu TTHC (0 hoặc 1)",
          "default": 0
        },
        {
          "name": "aiAdvanced",
          "label": "Ứng dụng AI nâng cao khác phục vụ quản lý đô thị, tổng hợp dữ liệu (0 hoặc 1)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.3.a",
    "code": "VII.3.a",
    "domainId": "VII",
    "groupTitle": "3. Ứng dụng Phần mềm Quản lý văn bản và điều hành - QLVBĐH (5,0 điểm)",
    "title": "100% văn bản đến (trừ văn bản mật) được nhập trên Phần mềm Quản lý văn bản và điều hành / Tổng số văn bản đến",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% văn bản đến (trừ văn bản mật) được nhập trên Phần mềm QLVBĐH: 1,0 điểm. Nếu không nhập đầy đủ 100% thì không đạt điểm (0 điểm).",
    "warningNote": "Đối chiếu sổ văn bản đến giấy với sổ văn bản đến điện tử trên QLVBĐH đảm bảo khớp 100%.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.3.b",
    "code": "VII.3.b",
    "domainId": "VII",
    "groupTitle": "3. Ứng dụng Phần mềm Quản lý văn bản và điều hành - QLVBĐH (5,0 điểm)",
    "title": "100% văn bản đi (trừ văn bản mật) được nhập trên Phần mềm Quản lý văn bản và điều hành / Tổng số văn bản đi",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "100% văn bản đi (trừ văn bản mật) được nhập trên Phần mềm QLVBĐH: 1,0 điểm. Nếu không nhập đầy đủ 100% thì không đạt điểm (0 điểm).",
    "warningNote": "Không cấp số văn bản đi ngoài hệ thống phần mềm QLVBĐH (trừ văn bản mật).",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.3.c",
    "code": "VII.3.c",
    "domainId": "VII",
    "groupTitle": "3. Ứng dụng Phần mềm Quản lý văn bản và điều hành - QLVBĐH (5,0 điểm)",
    "title": "Tỷ lệ văn bản đến được Lãnh đạo UBND và Lãnh đạo Văn phòng trực tiếp bút phê/có ý kiến hoặc lưu kết thúc trên QLVBĐH",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "percentage_linear",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Lãnh đạo UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đạt tỷ lệ 100%: 1,0 điểm; Dưới 100%: Tỷ lệ % đạt được * 1,0 điểm.",
    "warningNote": "Văn thư và Chánh Văn phòng rà soát hàng tuần các văn bản đến còn tồn đọng trên tài khoản Lãnh đạo để bấm bút phê hoặc lưu kết thúc 100%.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đến đã được Lãnh đạo bút phê chuyển xử lý hoặc lưu kết thúc (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đến trên phần mềm QLVBĐH (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.3.d",
    "code": "VII.3.d",
    "domainId": "VII",
    "groupTitle": "3. Ứng dụng Phần mềm Quản lý văn bản và điều hành - QLVBĐH (5,0 điểm)",
    "title": "Tỷ lệ văn bản đi có đính kèm dự thảo trên phần mềm khi xử lý để trình các cấp lãnh đạo / Tổng số văn bản đi",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "percentage_linear",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả các phòng, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Không tính văn bản được chuyển từ phần mềm Một cửa điện tử. Đạt tỷ lệ 100%: 1,0 điểm; Dưới 100%: Tỷ lệ % đạt được * 1,0 điểm.",
    "warningNote": "100% chuyên viên khi trình ký văn bản đi phải tạo luồng trình dự thảo trực tiếp trên QLVBĐH, không trình giấy ngoài luồng.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đi có đính kèm dự thảo trình ký trên QLVBĐH (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đi (không tính VB từ Một cửa điện tử) (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.3.d_dd",
    "code": "VII.3.đ",
    "domainId": "VII",
    "groupTitle": "3. Ứng dụng Phần mềm Quản lý văn bản và điều hành - QLVBĐH (5,0 điểm)",
    "title": "Trên 90% văn bản đi có kết nối với văn bản đến hoặc công việc tạo mới trên Hệ thống QLVBĐH / Tổng số văn bản đi",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "threshold_90_percent",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường",
      "Các phòng chuyên môn"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Trên 90% văn bản đi có kết nối với văn bản đến hoặc công việc tạo mới trên Hệ thống QLVBĐH / Tổng số văn bản đi: 1,0 điểm. Từ 90% trở xuống: 0 điểm.",
    "warningNote": "Chuyên viên khi dự thảo văn bản đi bắt buộc chọn liên kết với Văn bản đến hoặc Hồ sơ công việc tạo mới để tỷ lệ luôn đạt > 90%.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số văn bản đi có kết nối với VB đến hoặc công việc tạo mới (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số văn bản đi trên Hệ thống QLVBĐH (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.4.a",
    "code": "VII.4.a",
    "domainId": "VII",
    "groupTitle": "4. Phát triển ứng dụng, dịch vụ phục vụ người dân, tổ chức (3,0 điểm)",
    "title": "Xây dựng mới hoặc nâng cấp các phần mềm chuyên ngành phục vụ cho công tác quản lý (Mỗi phần mềm 1,0đ, tối đa 2,0đ)",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "specialized_software",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Phòng Kinh tế, Hạ tầng và Đô thị phường",
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Mỗi phần mềm xây dựng mới hoặc nâng cấp trong năm đánh giá được 1,0 điểm, tối đa 2,0 điểm. Đối với phần mềm xây mới phải cung cấp đủ 04 yếu tố: Hợp đồng, địa chỉ web, tài khoản đăng nhập, hình ảnh chụp màn hình (thiếu 1 yếu tố không có điểm). Đối với phần mềm tự xây dựng/tự nâng cấp phải chứng minh qua văn bản và tính năng cụ thể.",
    "warningNote": "Phần mềm Theo dõi, Đánh giá & Xếp hạng CCHC (PAR Index) này chính là 01 phần mềm chuyên ngành tiêu biểu do phường tự xây dựng phục vụ công tác quản lý!",
    "formulaConfig": {
      "fields": [
        {
          "name": "validSoftwareCount",
          "label": "Số phần mềm chuyên ngành xây mới/nâng cấp đủ 04 yếu tố kiểm chứng (0, 1, hoặc >=2)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.4.b",
    "code": "VII.4.b",
    "domainId": "VII",
    "groupTitle": "4. Phát triển ứng dụng, dịch vụ phục vụ người dân, tổ chức (3,0 điểm)",
    "title": "Triển khai số hóa hồ sơ giải quyết TTHC (Số hóa >= 80% và Tái sử dụng dữ liệu số hóa >= 30%)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "digitization_rates",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Các phòng chuyên môn giải quyết TTHC"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổng 1,0 điểm gồm: (1) Tỷ lệ số hóa hồ sơ, kết quả giải quyết TTHC từ 80% trở lên (0,5 điểm); (2) Tỷ lệ khai thác, sử dụng lại thông tin, dữ liệu số hóa từ 30% trở lên (0,5 điểm).",
    "warningNote": "Giao Trung tâm Phục vụ HCC triển khai thực hiện nghiêm các tiêu chí về số hóa hồ sơ, kết quả giải quyết TTHC.",
    "formulaConfig": {
      "fields": [
        {
          "name": "digitizedRate",
          "label": "Tỷ lệ số hóa hồ sơ, kết quả giải quyết TTHC (%) (yêu cầu >= 80%)",
          "default": 0
        },
        {
          "name": "reusedRate",
          "label": "Tỷ lệ khai thác, sử dụng lại dữ liệu số hóa (%) (yêu cầu >= 30%)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.5.a",
    "code": "VII.5.a",
    "domainId": "VII",
    "groupTitle": "5. Thực hiện thanh toán trực tuyến (4,0 điểm)",
    "title": "Tỷ lệ TTHC có phí, lệ phí được tích hợp, đồng bộ trên Cổng DVC quốc gia có phát sinh giao dịch thanh toán trực tuyến",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "ratio_ba",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Kinh tế, Hạ tầng và Đô thị phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tính điểm theo công thức: (b/a) * 2,0 điểm. Trong đó: a là tổng số TTHC thuộc thẩm quyền giải quyết có phí, lệ phí; b là số TTHC có phát sinh giao dịch có phí, lệ phí trực tuyến.",
    "warningNote": "Rà soát danh mục các TTHC có thu phí/lệ phí tại phường để đảm bảo 100% thủ tục có phát sinh hồ sơ đều thanh toán trực tuyến.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số TTHC có phát sinh giao dịch thanh toán phí, lệ phí trực tuyến (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số TTHC thuộc thẩm quyền có phí, lệ phí (có phát sinh hồ sơ) (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.5.b",
    "code": "VII.5.b",
    "domainId": "VII",
    "groupTitle": "5. Thực hiện thanh toán trực tuyến (4,0 điểm)",
    "title": "Tỷ lệ hồ sơ thanh toán phí, lệ phí trực tuyến qua Cổng DVC quốc gia, Cổng DVC thành phố trên tổng số hồ sơ DVCTT có phí, lệ phí",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "ratio_ba",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Đoàn Thanh niên hỗ trợ tại Bộ phận Một cửa"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tính điểm theo công thức: (b/a) * 2,0 điểm. Trong đó: a là tổng số hồ sơ DVCTT có phí, lệ phí; b là số hồ sơ DVCTT phát sinh thanh toán trực tuyến.",
    "warningNote": "Hướng dẫn 100% công dân quét mã VietQR thanh toán trực tuyến trên Cổng DVC để nâng tỷ lệ b/a tiệm cận 100%.",
    "formulaConfig": {
      "fields": [
        {
          "name": "b",
          "label": "Số hồ sơ DVCTT thanh toán phí, lệ phí trực tuyến (b)",
          "default": 0
        },
        {
          "name": "a",
          "label": "Tổng số hồ sơ DVCTT có phát sinh phí, lệ phí (a)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VII.6",
    "code": "VII.6",
    "domainId": "VII",
    "groupTitle": "6. Triển khai camera giám sát tại Trung tâm phục vụ hành chính công (1,0 điểm)",
    "title": "Triển khai hệ thống camera giám sát tại Trung tâm Phục vụ hành chính công và tích hợp về Trung tâm IOC thành phố",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Có triển khai camera giám sát tại Trung tâm Phục vụ HCC: 0,5 điểm; Tích hợp tín hiệu về Trung tâm IOC thành phố: 0,5 điểm.",
    "warningNote": "Thường xuyên kiểm tra đường truyền kết nối camera từ Bộ phận Một cửa phường về Trung tâm IOC Đà Nẵng đảm bảo hoạt động liên tục 24/7.",
    "formulaConfig": {
      "items": [
        {
          "key": "has_cam",
          "label": "Có triển khai hệ thống camera giám sát tại Trung tâm Phục vụ HCC",
          "score": 0.5
        },
        {
          "key": "ioc_integrated",
          "label": "Đã kết nối, tích hợp luồng video trực tiếp về Trung tâm IOC thành phố",
          "score": 0.5
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.1.a",
    "code": "VIII.1.a",
    "domainId": "VIII",
    "groupTitle": "1. Kết quả điều tra khảo sát của Sở Nội vụ (5,0 điểm)",
    "title": "Chỉ số hài lòng về tiếp cận dịch vụ hành chính công",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "satisfaction_survey",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Phương thức tính điểm: Tỷ lệ hài lòng (%) * 1,0 điểm / 100.",
    "warningNote": "Giao Phòng Văn hóa - Xã hội phối hợp Trung tâm Phục vụ HCC tham mưu các giải pháp nâng cao chỉ số Tác động của công tác CCHC theo Mục VIII.",
    "formulaConfig": {
      "fields": [
        {
          "name": "satisfactionRate",
          "label": "Tỷ lệ hài lòng về tiếp cận dịch vụ (%) (0 - 100%)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.1.b",
    "code": "VIII.1.b",
    "domainId": "VIII",
    "groupTitle": "1. Kết quả điều tra khảo sát của Sở Nội vụ (5,0 điểm)",
    "title": "Chỉ số hài lòng về tổ chức giải quyết TTHC và kết quả giải quyết TTHC",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "satisfaction_survey",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Phương thức tính điểm: Tỷ lệ hài lòng (%) * 1,0 điểm / 100.",
    "warningNote": "Đảm bảo giải quyết hồ sơ trước hạn và không phát sinh phiền hà cho người dân.",
    "formulaConfig": {
      "fields": [
        {
          "name": "satisfactionRate",
          "label": "Tỷ lệ hài lòng về tổ chức & kết quả giải quyết TTHC (%) (0 - 100%)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.1.c",
    "code": "VIII.1.c",
    "domainId": "VIII",
    "groupTitle": "1. Kết quả điều tra khảo sát của Sở Nội vụ (5,0 điểm)",
    "title": "Chỉ số hài lòng về thái độ, năng lực của công chức giải quyết TTHC",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "satisfaction_survey",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Phương thức tính điểm: Tỷ lệ hài lòng (%) * 1,0 điểm / 100.",
    "warningNote": "Thực hiện nghiêm chuẩn mực văn hóa công vụ '4 Xin, 4 Luôn' tại quầy tiếp nhận.",
    "formulaConfig": {
      "fields": [
        {
          "name": "satisfactionRate",
          "label": "Tỷ lệ hài lòng về công chức giải quyết TTHC (%) (0 - 100%)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.1.d",
    "code": "VIII.1.d",
    "domainId": "VIII",
    "groupTitle": "1. Kết quả điều tra khảo sát của Sở Nội vụ (5,0 điểm)",
    "title": "Chỉ số hài lòng về việc tiếp nhận, xử lý phản ánh, kiến nghị liên quan đến TTHC",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "formula",
    "formulaType": "satisfaction_survey",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Phương thức tính điểm: Tỷ lệ hài lòng (%) * 2,0 điểm / 100.",
    "warningNote": "Chủ động liên hệ trao đổi trực tiếp với công dân sau khi xử lý PAKN để nâng cao sự hài lòng.",
    "formulaConfig": {
      "fields": [
        {
          "name": "satisfactionRate",
          "label": "Tỷ lệ hài lòng về việc tiếp nhận, xử lý PAKN (%) (0 - 100%)",
          "default": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.2",
    "code": "VIII.2",
    "domainId": "VIII",
    "groupTitle": "2. Tác động của cải cách đến hoạt động quản lý nhà nước (3,0 điểm)",
    "title": "Tác động của cải cách đến chất lượng văn bản quy phạm pháp luật do đơn vị ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đảm bảo tính hợp hiến, hợp pháp, khả thi và hiệu quả tác động của các VBQPPL do đơn vị ban hành: 1,0 điểm.",
    "warningNote": "Không có VBQPPL bị đình chỉ thi hành hoặc bãi bỏ do trái pháp luật.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.3",
    "code": "VIII.3",
    "domainId": "VIII",
    "groupTitle": "2. Tác động của cải cách đến hoạt động quản lý nhà nước (3,0 điểm)",
    "title": "Tác động của cải cách đến tổ chức bộ máy hành chính tinh gọn, hiệu lực, hiệu quả",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Tổ chức bộ máy vận hành thông suốt, hiệu lực, hiệu quả sau sắp xếp: 1,0 điểm.",
    "warningNote": "Đánh giá rõ hiệu quả mô hình tổ chức các phòng chuyên môn và Trung tâm thuộc phường.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "VIII.4",
    "code": "VIII.4",
    "domainId": "VIII",
    "groupTitle": "2. Tác động của cải cách đến hoạt động quản lý nhà nước (3,0 điểm)",
    "title": "Tác động của cải cách đến hiện đại hóa hành chính và chuyển đổi số tại địa phương",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Đạt các chỉ tiêu hiện đại hóa nền hành chính, chuyển đổi số phục vụ người dân và doanh nghiệp: 1,0 điểm.",
    "warningNote": "Minh chứng bằng tỷ lệ dịch vụ công trực tuyến toàn trình và mức độ ứng dụng CNTT, AI.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.a",
    "code": "IX.1.a",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Tổ chức các diễn đàn, Hội nghị đối thoại, ngày hội, gặp mặt giữa Lãnh đạo UBND phường với người dân, doanh nghiệp",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "checklist",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường",
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Phải hội đủ 03 nội dung: (1) Có Kế hoạch triển khai, giấy mời tổ chức trên thực tế; (2) Văn bản thông báo nội dung kết luận sau buổi đối thoại/gặp mặt; (3) Báo cáo của các cơ quan đơn vị có liên quan để triển khai nội dung thông báo kết luận: +1,0 điểm. Không tính tiếp dân định kỳ hoặc lớp tập huấn CBCCVC.",
    "warningNote": "Chủ động nghiên cứu giải pháp Điểm thưởng tại Mục IX. Lưu ý phải đủ cả 3 văn bản (KH/Giấy mời + Thông báo kết luận + Báo cáo triển khai kết luận) mới được cộng 1,0 điểm!",
    "formulaConfig": {
      "allRequiredForScore": true,
      "items": [
        {
          "key": "doc_plan_invite",
          "label": "Có Kế hoạch triển khai và Giấy mời tổ chức đối thoại trên thực tế",
          "score": 0.33
        },
        {
          "key": "doc_conclusion",
          "label": "Có Văn bản thông báo nội dung kết luận sau buổi đối thoại/gặp mặt",
          "score": 0.33
        },
        {
          "key": "doc_followup",
          "label": "Có Báo cáo của các đơn vị liên quan triển khai nội dung thông báo kết luận",
          "score": 0.34
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.b",
    "code": "IX.1.b",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Có sáng kiến được Hội đồng xét sáng kiến thành phố công nhận có tác dụng, ảnh hưởng đối với thành phố",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Các cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Cứ 01 sáng kiến được Hội đồng cấp thành phố xét duyệt (do Sở KH&CN tổ chức) và được công nhận tại Quyết định của UBND thành phố được cộng 1,0 điểm, tối đa không quá 2,0 điểm.",
    "warningNote": "Theo dõi sát Quyết định công nhận sáng kiến cấp thành phố năm 2026 của UBND TP Đà Nẵng.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "city_ini_2",
          "label": "Có từ 02 sáng kiến trở lên được UBND thành phố công nhận (+2,0 điểm)",
          "score": 2
        },
        {
          "key": "city_ini_1",
          "label": "Có 01 sáng kiến được UBND thành phố công nhận (+1,0 điểm)",
          "score": 1
        },
        {
          "key": "city_ini_0",
          "label": "Chưa có sáng kiến cấp thành phố công nhận (0 điểm)",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.c",
    "code": "IX.1.c",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Có đề xuất và tổ chức thực hiện thí điểm có hiệu quả các nội dung cải cách hành chính",
    "maxScore": 3,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Mỗi nội dung tự nguyện đăng ký thí điểm, được cơ quan có thẩm quyền chấp thuận hoặc chọn làm đơn vị thí điểm và triển khai có hiệu quả trong thực tế (có báo cáo gửi Sở Nội vụ theo dõi định kỳ kèm hình ảnh minh họa) được cộng 1,0 điểm, tối đa 3,0 điểm.",
    "warningNote": "Bắt buộc phải có văn bản chấp thuận thí điểm và Báo cáo đánh giá định kỳ gửi Sở Nội vụ kèm hình ảnh minh họa.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "pilot_3",
          "label": "Triển khai hiệu quả 03 nội dung thí điểm CCHC (đủ báo cáo gửi Sở Nội vụ) (+3,0 điểm)",
          "score": 3
        },
        {
          "key": "pilot_2",
          "label": "Triển khai hiệu quả 02 nội dung thí điểm CCHC (+2,0 điểm)",
          "score": 2
        },
        {
          "key": "pilot_1",
          "label": "Triển khai hiệu quả 01 nội dung thí điểm CCHC (+1,0 điểm)",
          "score": 1
        },
        {
          "key": "pilot_0",
          "label": "Không có mô hình thí điểm được chấp thuận (0 điểm)",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.d",
    "code": "IX.1.d",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Được UBND thành phố biểu dương tên đơn vị trong văn bản Báo cáo tình hình thực hiện nhiệm vụ do Văn phòng UBND TP ban hành",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Được UBND thành phố biểu dương tên đơn vị trong văn bản tại Báo cáo tình hình, kết quả thực hiện nhiệm vụ của UBND TP, Chủ tịch UBND TP giao do Văn phòng UBND TP ban hành: +1,0 điểm. (Không tính khen thưởng chuyên đề, Giấy khen, Bằng khen).",
    "warningNote": "Rà soát các Thông báo kết luận/Báo cáo hàng tháng của Văn phòng UBND TP có nêu tên biểu dương phường Hội An Đông.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.e",
    "code": "IX.1.e",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Tăng cường công tác xây dựng, áp dụng, duy trì và cải tiến Hệ thống quản lý chất lượng phù hợp tiêu chuẩn TCVN ISO 9001:2015",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "boolean",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường",
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Xây dựng, áp dụng, duy trì và cải tiến Hệ thống quản lý chất lượng phù hợp tiêu chuẩn quốc gia TCVN ISO 9001:2015: +1,0 điểm.",
    "warningNote": "Đảm bảo đầy đủ Quyết định công bố lại HTQLCL ISO 9001:2015, Kế hoạch và Biên bản đánh giá nội bộ, Xem xét của lãnh đạo năm 2026.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.1.f",
    "code": "IX.1.f",
    "domainId": "IX",
    "subGroup": "bonus",
    "groupTitle": "1. Điểm thưởng (Tối đa +10,0 điểm)",
    "title": "Thực hiện thu ngân sách hàng năm do thành phố giao đạt thứ hạng cao trong 93 xã, phường",
    "maxScore": 2,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "tiered",
    "assignedDept": "Phòng Kinh tế, Hạ tầng và Đô thị phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "Năm 2026",
    "status": "pending",
    "regulationText": "Giá trị thu NSNN thuộc nhóm 20 địa phương cao nhất: +2,0 điểm; Thuộc nhóm từ vị trí thứ 21 đến 40 so với 93 xã, phường: +1,0 điểm; Thuộc nhóm từ vị trí thứ 41 đến 70 so với 93 xã, phường: +0,5 điểm.",
    "warningNote": "Theo dõi bảng tổng hợp xếp hạng thu NSNN khối 93 xã, phường của Sở Tài chính / Cục Thuế thành phố.",
    "formulaConfig": {
      "tiers": [
        {
          "key": "top_1_20",
          "label": "Thuộc nhóm 20 địa phương có giá trị thu NSNN cao nhất (+2,0 điểm)",
          "score": 2
        },
        {
          "key": "top_21_40",
          "label": "Thuộc nhóm vị trí thứ 21 đến 40 so với 93 xã, phường (+1,0 điểm)",
          "score": 1
        },
        {
          "key": "top_41_70",
          "label": "Thuộc nhóm vị trí thứ 41 đến 70 so với 93 xã, phường (+0,5 điểm)",
          "score": 0.5
        },
        {
          "key": "top_over_70",
          "label": "Từ vị trí 71 trở đi (0 điểm)",
          "score": 0
        }
      ]
    },
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.a.1",
    "code": "IX.2.a (1)",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Không tiếp nhận hồ sơ qua Một cửa điện tử, không trả kết quả đúng hạn, báo cáo số liệu không chính xác",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Các phòng chuyên môn"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu: Không tiếp nhận hồ sơ qua Hệ thống một cửa điện tử, không thực hiện đúng thời gian trả kết quả theo quy định, không ban hành văn bản khi hồ sơ đến hạn trả kết quả nhưng chưa có kết quả theo ngày hẹn trên giấy biên nhận; báo cáo số liệu phục vụ các đoàn kiểm tra không đảm bảo tính chính xác.",
    "warningNote": "Tuyệt đối không để phát sinh các nội dung bị trừ điểm tại Mục IX!",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.a.2",
    "code": "IX.2.a (2)",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Không ban hành thông báo xin lỗi cho tổ chức, công dân khi hồ sơ trễ hạn và quá hạn trên thực tế",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Trung tâm Phục vụ hành chính công phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường",
      "Các phòng chuyên môn"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu: Không ban hành thông báo xin lỗi cho tổ chức, công dân khi hồ sơ trễ hạn và quá hạn trên thực tế (kể cả trường hợp thẩm quyền quyết định của UBND thành phố và thông qua kết quả kiểm tra định kỳ về công tác công vụ của Sở Nội vụ).",
    "warningNote": "CHỈ ĐẠO ĐẶC BIỆT TẠI MỤC 7 Quyết định 2851/QĐ-UBND: 'Nhất là việc ban hành thông báo xin lỗi cho tổ chức, công dân khi hồ sơ trễ hạn và quá hạn'. Phát sinh 01 hồ sơ trễ hạn phải có ngay 01 văn bản xin lỗi!",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.b",
    "code": "IX.2.b",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Có công chức hoặc viên chức bị xử lý kỷ luật (tính theo thời điểm ban hành Quyết định kỷ luật)",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Tất cả cơ quan, đơn vị thuộc phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu trong năm có công chức hoặc viên chức bị xử lý kỷ luật (tính theo thời điểm ban hành Quyết định kỷ luật).",
    "warningNote": "Quán triệt nghiêm kỷ luật công vụ tại tất cả các phòng, trung tâm.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.c",
    "code": "IX.2.c",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Không trung thực trong đính kèm tài liệu giải trình CCHC hoặc báo cáo hồ sơ giải quyết trễ hẹn",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu không trung thực trong việc đính kèm tài liệu giải trình đánh giá xếp hạng CCHC hàng năm; không trung thực trong báo cáo hồ sơ trễ hẹn (số liệu không trùng khớp hoặc hợp thức hóa trên hệ thống).",
    "warningNote": "Kiểm tra chéo toàn bộ file minh chứng trước khi trình Lãnh đạo UBND phường ký báo cáo ngày 15/10/2026.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.d",
    "code": "IX.2.d",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Bị Lãnh đạo UBND thành phố phê bình bằng văn bản vì không thực hiện nhiệm vụ đúng thời gian, tiến độ được giao",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Tất cả các cơ quan, đơn vị"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu bị Lãnh đạo UBND thành phố phê bình bằng văn bản vì không thực hiện nhiệm vụ đúng thời gian, tiến độ được giao.",
    "warningNote": "Theo dõi sát hệ thống giao nhiệm vụ của UBND thành phố, không để bất kỳ nhiệm vụ nào quá hạn.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.d_dd",
    "code": "IX.2.đ",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Bị lãnh đạo thành phố phản ánh, phê bình liên quan đến CCHC hoặc chậm trễ xử lý PAKN bị nhắc nhở, đôn đốc bằng văn bản",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu bị lãnh đạo TP phản ánh, phê bình liên quan đến CCHC (kể cả đơn vị trực thuộc) hoặc chậm trễ xử lý PAKN và bị nhắc nhở, đôn đốc bằng văn bản.",
    "warningNote": "Xử lý dứt điểm PAKN trước hạn từ 1-2 ngày trên Cổng 1022 và Cổng DVC Quốc gia.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.e",
    "code": "IX.2.e",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Để báo đài, phương tiện truyền thông phản ánh đúng sự thật hoặc phản ánh về phòng, chống tham nhũng gây mất hình ảnh TP",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Phòng Văn hóa – Xã hội phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu thực hiện không tốt các nội dung quản lý để báo đài, truyền thông phản ánh đúng sự thật hoặc phản ánh về phòng chống tham nhũng gây mất hình ảnh thành phố.",
    "warningNote": "Chủ động nắm bắt thông tin báo chí và giải quyết kịp thời kiến nghị của nhân dân từ cơ sở.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.g",
    "code": "IX.2.g",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Không triển khai hoặc triển khai không đúng thời gian việc lấy ý kiến điều tra xã hội học phục vụ đánh giá CCHC",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Trung tâm Phục vụ hành chính công phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu không triển khai hoặc triển khai không đúng thời gian việc lấy ý kiến điều tra xã hội học phục vụ đánh giá xếp hạng CCHC của thành phố theo văn bản Sở Nội vụ.",
    "warningNote": "Phối hợp thực hiện nghiêm túc các đợt khảo sát điều tra XHH của Sở Nội vụ.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.h",
    "code": "IX.2.h",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Chưa thực hiện đầy đủ chữ ký số của lãnh đạo UBND phường",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Văn phòng HĐND-UBND phường",
    "coordinatingDepts": [
      "Lãnh đạo UBND phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu chưa thực hiện đầy đủ chữ ký số của lãnh đạo UBND xã, phường, đặc khu.",
    "warningNote": "100% Chủ tịch và các Phó Chủ tịch UBND phường thực hiện ký số văn bản đi trên Hệ thống QLVBĐH.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  },
  {
    "id": "IX.2.i",
    "code": "IX.2.i",
    "domainId": "IX",
    "subGroup": "penalty",
    "groupTitle": "2. Điểm trừ (Tối đa -10,0 điểm - Kiểm soát ngăn ngừa rủi ro)",
    "title": "[Điểm trừ] Thực hiện các văn bản tham gia ý kiến, báo cáo chuyên đề CCHC không đảm bảo thời gian và nội dung",
    "maxScore": 1,
    "selfScore": 0,
    "verifiedScore": 0,
    "type": "penalty",
    "assignedDept": "Phòng Văn hóa – Xã hội phường",
    "coordinatingDepts": [
      "Văn phòng HĐND-UBND phường"
    ],
    "deadline": "31/12/2026",
    "status": "pending",
    "regulationText": "Bị trừ 1,0 điểm nếu thực hiện các văn bản tham gia ý kiến, các báo cáo chuyên đề liên quan đến công tác CCHC phục vụ báo cáo của UBND TP (do Sở Nội vụ triển khai) không đảm bảo thời gian và nội dung.",
    "warningNote": "Theo dõi sát các công văn lấy ý kiến hoặc yêu cầu báo cáo đột xuất từ Phòng CCHC & VTLT - Sở Nội vụ.",
    "inputs": {},
    "evidences": [],
    "notes": ""
  }
];
