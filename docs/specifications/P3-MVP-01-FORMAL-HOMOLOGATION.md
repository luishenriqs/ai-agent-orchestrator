# Formal human homologation of P3-MVP-01

**Decision date** — 24 November 2026.
**Authority** — The human owner of AI Agent Orchestrator, in the express delegation *P3-MVP-01 — Formal Homologation, Consolidation and Branch Publication*.
**Recorder** — Codex, acting as the executor. The human decision follows the R1 review, targeted addendum and final finding dispositions.

## Approved scope and identity

The decision approves the exact offline increment below, with synthetic authority, a deterministic substitute and a single task and attempt per installation. The originating baseline is `main@146a5b390c0bee14175272b9a9627b9172d947f3` in `luishenriqs/ai-agent-orchestrator`. The publication branch and dedicated worktree are `p3/mvp-01` and `~/projects/ai-agent-orchestrator-p3-mvp-01`.

The SHA-256 of `VERSION.sha256` is `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`. It identifies these ten files under [p3-mvp-01/](../../p3-mvp-01/), including its own README.

| File | Lines |
|---|---:|
| `common.ts` | 80 |
| `state.ts` | 259 |
| `git.ts` | 55 |
| `sandbox.ts` | 150 |
| `payload.ts` | 61 |
| `artifacts.ts` | 74 |
| `workflow.ts` | 204 |
| `cli.ts` | 34 |
| `test/offline.test.ts` | 221 |
| `README.md` | 40 |

The approved implementation uses eight code files and one test file, with 917 implementation lines and 221 test lines, plus the 40-line internal README. No external dependency was added. The inventory remains within the authorized 25-file and 3,500-line budget.

## Normative references and authorization

The human decisions and [homologated architecture v0.4](../architecture/003-diretrizes-arquiteturais-v04.md) govern the increment. The architecture SHA-256 is `6e6a8987f112d866c4f52cd2d16c60b33548a6542c5299b510036d4efedc409b`. [Architecture homologation](../architecture/004-registro-homologacao-v04.md)

The [P2-R2 contracts](P2-V1-OPERATIONAL-CONTRACTS-R2.md) are identified by the ratified SHA-256 `9d7212409b9ecad66d79e50dba04f046b6f93403263b0c8222b2afdc421d98e6`. The preserved historical record contains the 63-character field. Use it together with the ratified addendum. [Historical record](P2-V1-FORMAL-HOMOLOGATION-R2.md)

The strategic triage, P2-R2 addendum and P3-MVP-01 specification remain in `~/.local/share/ai-agent-orchestrator/decisions/2026-11-24-v1-product-pivot/`. Their documentary homologation and the preceding handoff remain in `~/.local/share/ai-agent-orchestrator/handoffs/2026-11-24-v1-product-pivot/`. The D → I implementation delegation of 24 November 2026 and its technology complement allowed the offline core and selected `prlimit` after checkpoint 8.7. This record preserves all earlier instruments.

## Evidence and independent review

| Protected evidence under `~/.local/share/ai-agent-orchestrator/evidence/` | Manifest SHA-256 |
|---|---|
| `p3-mvp-01-2026-11-24-resume-8lt1SU4W/` · implementation, 41 entries | `5e04c246faeeabf8b2a28d80c9cf1dd77386001814c9eb7b8be92f6c86938852` |
| `p3-mvp-01-2026-11-24-AnFHEgVI/` · prior diagnosis, 27 entries | `a082ce6cb230c60de4b34eac81425999596db57c6700f0d3274dc3043c0778f2` |

The checkpoint passed for the offline envelope after validation of Node → Bubblewrap → prlimit → Node. The limits of 24 processes/threads and 65,536 bytes per file were observed as soft and hard limits. They apply to UID accounting and individual files. This evidence establishes neither an aggregate storage quota nor readiness for real agents.

The executor reported `P3_MVP_01_IMPLEMENTATION_READY_FOR_INDEPENDENT_REVIEW` and 25 passing tests. Antigravity / Gemini 4 Neon (Medium) reported 25/25 tests reproduced and passed, with zero failures and zero skipped. It checked 41/41 and 27/27 manifest entries, all ten version entries, byte equality with the worktree, the budget and zero additional dependencies. The reproduced ArtifactSet was `d103b9539f74f092086a4827ac5ff10e2b66b0ef5f53b9b3643568fe6b26abaf`. The four adversarial groups covered monotonic clock sharing, spawn error/close behavior, gitfile enforcement, and private-root/database/boot constraints. The boot-change reapproval defect is recorded as P3-REV-01.

The reviewer reaffirmed **SUFICIENTE COM RECOMENDAÇÕES NÃO BLOQUEANTES** in the targeted addendum. The technical coordinator recommended **RECOMENDO HOMOLOGAR PARA ENCERRAMENTO**, as recorded by the owner in the publication delegation. The verdict has 0 BLOCKER, 0 MAJOR, 2 MINOR and 1 EDITORIAL. [R1 report](../reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1.md) · [R1 addendum](../reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1-ADDENDUM.md)

The primary sources are full response records in Antigravity transcript `bb1da86f-6ef0-4764-b683-9f1c26f4d660`, `.system_generated/logs/transcript_full.jsonl`. The observed transcript SHA-256 was `7d1e9428735ce21f23e527cdeda731c9d8fa8e22b2c8caef472b178aad253641`. The original UTF-8 R1 response at line 75 hashes to `1bc050b844ac6a301a268438df98bfe325638388e4d64e0fe4cdf24879679741`. The original addendum at line 77 hashes to `592e5be702783065beacec1dd30ff7ef4a32aab0989995b0f3be615920ddb853`. The protected closure package `~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-publication-nMU0rNxO/` preserves those original responses, their transcript records and available tool evidence. Published copies adapt local path and link formatting for the repository.

## Residual findings and subsequent gates

- **P3-REV-01 · MINOR · Confirmed and unfixed.** Reapproval after temporal or boot invalidation remains fail-closed and can require explicit revocation.
- **P3-REV-02 · MINOR · Confirmed and unfixed.** The owner accepted the known offline residual nonconformity in cancellation/revocation event identity and the unnecessary exposure of synthetic proof and nonce in status. The operational cancellation outcome and containment were confirmed. Remediation before real operation remains a recommendation requiring specific authorization.
- **P3-REV-03 · EDITORIAL · Partially confirmed and unimplemented.** The released-attempt query has no confirmed defect in this single-attempt lifecycle. Namespace-depth and future selection recommendations remain preventive.

The final triage records the full treatment and leaves all three findings outstanding. The decision has no effect on the text of P2-R2. [Final triage](../reviews/P3-MVP-01-REVIEW-TRIAGE-R1.md)

**REV-V1-01 is satisfied in the demonstrated offline envelope. REV-V1-02 remains pending at I → R.** The approval excludes full V1 operational readiness, real human authentication, real agents, multiple real tasks, measured productivity and remote integration of consumer projects. Alternative B remains in effect. The OBS-1 and OBS-1-R2 reservations remain **NOT VERIFIABLE**. Earlier experimental findings retain their dispositions and the experimental track remains inactive. O/D01–O/V4 and G retain their own gates.

The owner authorized selective staging, a commit on `p3/mvp-01` and normal publication of that branch only to `origin/refs/heads/p3/mvp-01`, subject to identity and scope checks. The pre-publication handoff defers the actual commit and remote verification to the closure report. [Handoff](../handoffs/005-handoff-p3-mvp-01-offline-homologation.md)
