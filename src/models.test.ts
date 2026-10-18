import test from "node:test";
import assert from "node:assert/strict";
import {
  BooleanCriterion,
  CCHCManager,
  createCriterionInstance
} from "../js/models.js";
import { DEFAULT_CRITERIA_DATA } from "../js/data-cchc-2851.js";
import { ADMIN_PASSWORD, GAS_SCRIPT_TEMPLATE } from "../js/config.js";

test("DEFAULT_CRITERIA_DATA starts with 0 simulated scores, 0 simulated evidences, and no 1680 references", () => {
  const manager = new CCHCManager(DEFAULT_CRITERIA_DATA);
  const all = manager.getAllCriteria();
  assert.ok(all.length >= 90, `Expected >= 90 criteria, got ${all.length}`);

  const metrics = manager.getOverallMetrics();
  assert.equal(metrics.baseMaxScore, 100.0);
  assert.equal(metrics.totalSelfScore, 0);
  assert.equal(metrics.bonusScore, 0);
  assert.equal(metrics.penaltyScore, 0);
  assert.equal(metrics.finalScore, 0);
  assert.equal(metrics.evaluatedCount, 0);
  assert.equal(metrics.evidenceRate, 0);
  assert.equal(metrics.rankingInfo.grade, "Chưa xếp loại");

  for (const c of all) {
    assert.equal(c.selfScore, 0, `Criterion ${c.code} should start at 0 score`);
    assert.equal(c.evidences.length, 0, `Criterion ${c.code} should start with 0 evidences`);
    assert.equal(c.isEvaluated(), false, `Criterion ${c.code} should start unevaluated`);
    assert.ok(
      !c.title.includes("1680") && !c.regulationText.includes("1680") && !c.warningNote.includes("1680"),
      `Criterion ${c.code} should not reference 1680`
    );
  }
});

test("Domain maxScores in DEFAULT_CRITERIA_DATA match Phụ lục II - QĐ 2851/QĐ-UBND", () => {
  const manager = new CCHCManager(DEFAULT_CRITERIA_DATA);
  const groups = manager.getDomainGroups();

  const expectedMax = {
    I: 27.0,
    II: 4.0,
    III: 11.0,
    IV: 9.0,
    V: 12.0,
    VI: 9.0,
    VII: 20.0,
    VIII: 8.0,
    IX: 10.0
  };

  for (const g of groups) {
    const summary = g.getSummary();
    assert.equal(
      summary.maxScore,
      expectedMax[g.id],
      `Domain ${g.id} maxScore should be ${expectedMax[g.id]} but got ${summary.maxScore}`
    );
  }
});

test("Polymorphic scoring calculation works when user inputs real values", () => {
  const manager = new CCHCManager(DEFAULT_CRITERIA_DATA);

  // 1. BooleanCriterion: I.4.c (Kiểm tra CCHC trước 30/11)
  const critI4c = manager.getCriterionById("I.4.c");
  assert.ok(critI4c instanceof BooleanCriterion);
  assert.equal(critI4c.calculateScore({ achieved: true }), 1.0);
  assert.equal(critI4c.calculateScore({ achieved: false }), 0.0);

  // 2. FormulaCriterion: I.3 (Hoàn thành kế hoạch CCHC năm: b/(a+c))
  const critI3 = manager.getCriterionById("I.3");
  assert.equal(critI3.calculateScore({ a: 25, b: 15, c: 0 }), 0.0);
  assert.equal(critI3.calculateScore({ a: 25, b: 25, c: 0 }), critI3.maxScore);

  // 3. FormulaCriterion: I.6.c.3 (Video tuyên truyền DVC trực tuyến >= 500 lượt xem)
  const critVideo = manager.getCriterionById("I.6.c.3");
  assert.equal(critVideo.calculateScore({ views: 320, isMonotonous: 0 }), 0.0);
  assert.equal(critVideo.calculateScore({ views: 520, isMonotonous: 1 }), 0.5);
  assert.equal(critVideo.calculateScore({ views: 520, isMonotonous: 0 }), 1.0);

  // 4. FormulaCriterion: VII.1.c (Xác suất >= 50 văn bản điện tử ký số 100%)
  const critVII1c = manager.getCriterionById("VII.1.c");
  assert.equal(critVII1c.calculateScore({ a: 55, b: 54 }), Number(((54 / 55) * critVII1c.maxScore).toFixed(2)));
  assert.equal(critVII1c.calculateScore({ a: 55, b: 55 }), critVII1c.maxScore);

  // 5. TieredCriterion: II.2.a (Tự kiểm tra VBQPPL)
  const critII2a = manager.getCriterionById("II.2.a");
  assert.equal(critII2a.calculateScore({ selectedTier: "full" }), 1.0);
  assert.equal(critII2a.calculateScore({ selectedTier: "partial" }), 0.5);

  // 6. FormulaCriterion: VII.2.b (Ứng dụng AI: aiForStaff + aiForCitizen + aiAdvanced, giới hạn 1,0đ nếu onlyCityAI=1)
  const critVII2b = manager.getCriterionById("VII.2.b");
  assert.equal(
    critVII2b.calculateScore({ onlyCityAI: 0, aiForStaff: 1, aiForCitizen: 1, aiAdvanced: 1 }),
    3.0
  );
  assert.equal(
    critVII2b.calculateScore({ onlyCityAI: 0, aiForStaff: 1, aiForCitizen: 1, aiAdvanced: 0 }),
    2.0
  );
  assert.equal(
    critVII2b.calculateScore({ onlyCityAI: 1, aiForStaff: 1, aiForCitizen: 1, aiAdvanced: 1 }),
    1.0
  );

  // 7. ChecklistCriterion: IX.1.a (Điểm thưởng đối thoại: cộng điểm từng phần 0,33đ / 0,66đ / 1,00đ)
  const critIX1a = manager.getCriterionById("IX.1.a");
  assert.equal(
    critIX1a.calculateScore({ doc_plan_invite: true, doc_conclusion: false, doc_followup: false }),
    0.33
  );
  assert.equal(
    critIX1a.calculateScore({ doc_plan_invite: true, doc_conclusion: true, doc_followup: false }),
    0.66
  );
  assert.equal(
    critIX1a.calculateScore({ doc_plan_invite: true, doc_conclusion: true, doc_followup: true }),
    1.0
  );
});

test("System Settings: Admin password, GAS template, Multi-year management, Criteria CRUD, and Backup/Restore", () => {
  assert.equal(ADMIN_PASSWORD, "tsvmmm");
  assert.ok(GAS_SCRIPT_TEMPLATE.includes("function doPost(e)"));
  assert.ok(GAS_SCRIPT_TEMPLATE.includes("DriveApp"));

  const manager = new CCHCManager(DEFAULT_CRITERIA_DATA, 2026);
  assert.equal(manager.activeYear, 2026);
  assert.deepEqual(manager.availableYears, [2026]);

  // 1. Add a new criterion in 2026
  const added = manager.upsertCriterionDefinition({
    code: "I.8.test",
    domainId: "I",
    subGroup: "standard",
    groupTitle: "8. Tiêu chí kiểm thử",
    title: "Tiêu chí bổ sung kiểm thử",
    maxScore: 2.0,
    type: "boolean",
    assignedDept: "Phòng Văn hóa – Xã hội phường"
  });
  assert.equal(added.code, "I.8.test");
  assert.equal(manager.getCriterionById("I.8.test")?.maxScore, 2.0);
  assert.equal(manager.getOverallMetrics().baseMaxScore, 102.0);

  // 2. Edit existing criterion
  manager.upsertCriterionDefinition({
    id: "I.8.test",
    code: "I.8.test",
    title: "Tiêu chí bổ sung đã cập nhật",
    maxScore: 1.5
  });
  assert.equal(manager.getCriterionById("I.8.test")?.title, "Tiêu chí bổ sung đã cập nhật");
  assert.equal(manager.getOverallMetrics().baseMaxScore, 101.5);

  // 3. Create new year 2027 by cloning current structure (resetting scores to 0)
  added.calculateScore({ achieved: true });
  assert.equal(added.selfScore, 1.5);

  const list2027 = manager.createNewYear(2027, true, DEFAULT_CRITERIA_DATA);
  assert.equal(manager.activeYear, 2027);
  assert.ok(manager.availableYears.includes(2027));
  assert.ok(list2027.some((c) => c.code === "I.8.test"));
  assert.equal(manager.getCriterionById("I.8.test")?.selfScore, 0);
  assert.equal(manager.getCriterionById("I.8.test")?.getFirestoreDocId(2027), "2027_I.8.test");

  // 4. Delete criterion in 2027
  const deleted = manager.deleteCriterionById("I.8.test");
  assert.ok(deleted);
  assert.equal(manager.getCriterionById("I.8.test"), null);

  // 5. Export & Import Full Backup
  const backup = manager.exportFullBackup({ gasWebAppUrl: "https://script.google.com/macros/s/test/exec" });
  assert.equal(backup.activeYear, 2027);
  assert.ok(backup.yearsData[2026]);
  assert.ok(backup.yearsData[2027]);

  const freshManager = new CCHCManager(DEFAULT_CRITERIA_DATA, 2026);
  const restored = freshManager.importFullBackup(backup);
  assert.equal(restored.activeYear, 2027);
  assert.equal(restored.systemConfig.gasWebAppUrl, "https://script.google.com/macros/s/test/exec");
  assert.ok(freshManager.availableYears.includes(2026));
  assert.ok(freshManager.availableYears.includes(2027));

  // 6. Delete year 2027
  freshManager.deleteYear(2027);
  assert.equal(freshManager.activeYear, 2026);
  assert.deepEqual(freshManager.availableYears, [2026]);
});
