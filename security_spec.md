# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **CriterionRecord (`/cchc_2851_criteria/{docId}`)**:
   - Document ID must match `^[a-zA-Z0-9_\\.\\-]+$` and length <= 128.
   - Must contain exact required keys (`id`, `code`, `domainId`, `selfScore`, `verifiedScore`, `status`, `assignedDept`, `deadline`, `inputs`, `evidences`, `notes`, `updatedBy`, `updatedAt`).
   - Scores (`selfScore`, `verifiedScore`) must be numbers between -10 and 30.
   - `evidences` must be a bounded list (`size() <= 50`).
   - `domainId` must be one of `['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']`.
2. **SummaryRecord (`/cchc_2851_summary/{docId}`)**:
   - Must contain exact required keys (`year`, `totalSelfScore`, `totalVerifiedScore`, `bonusScore`, `penaltyScore`, `finalScore`, `evidenceRate`, `isLocked`, `updatedBy`, `updatedAt`).
   - `year` must be an integer between 2024 and 2035.
3. **TaskRecord (`/cchc_par_index_tasks/{docId}`)**:
   - Must contain exact required keys (`id`, `title`, `domainId`, `assignedDept`, `deadline`, `status`, `hasEvidence`, `docRef`, `updatedAt`).
4. **AuditLogRecord (`/cchc_par_index_logs/{docId}`)**:
   - Must contain exact required keys (`id`, `criterionId`, `action`, `actor`, `timestamp`).
   - Logs are append-only (no delete, no update).

## 2. The "Dirty Dozen" Payloads
1. **Shadow Field Injection on Criterion**: Adding `"isAdminOverride": true` to `/cchc_2851_criteria/I.1.a`. Rejected by `hasOnly()`.
2. **Oversized Notes Payload**: Sending a 50,000-character `notes` string to `/cchc_2851_criteria/I.1.a`. Rejected by `notes.size() <= 2000`.
3. **Invalid Domain Enum**: Setting `domainId: "X"` on `/cchc_2851_criteria/I.1.a`. Rejected by `domainId in ['I','II','III','IV','V','VI','VII','VIII','IX']`.
4. **Out-of-Bounds Score**: Setting `selfScore: 999` on `/cchc_2851_criteria/I.1.a`. Rejected by `selfScore >= -10 && selfScore <= 30`.
5. **Unbounded Evidence Array**: Sending 100 items in `evidences` list. Rejected by `evidences.size() <= 50`.
6. **ID Poisoning**: Creating document with 500-char ID or special characters `../admin`. Rejected by `isValidId(docId)`.
7. **Missing Required Field on Create**: Omitting `status` on `/cchc_2851_criteria/I.1.a`. Rejected by `hasAll()`.
8. **Type Confusion on Summary**: Setting `totalSelfScore: "100"` (string instead of number) on `/cchc_2851_summary/2026`. Rejected by `is number`.
9. **Audit Log Tampering (Update)**: Attempting to update an existing log in `/cchc_par_index_logs/log_1`. Rejected by `allow update: if false`.
10. **Audit Log Deletion**: Attempting to delete `/cchc_par_index_logs/log_1`. Rejected by `allow delete: if false`.
11. **Task Status Invalid Enum**: Updating `/cchc_par_index_tasks/task_1` with `status: "hacked"`. Rejected by `status in ['pending', 'in_progress', 'completed', 'overdue']`.
12. **Unmapped Collection Write**: Writing to `/users_secret/doc1`. Rejected by global default-deny `match /{document=**} { allow read, write: if false; }`.
