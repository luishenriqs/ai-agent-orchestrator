# P3-MVP-01 — Offline homologation handoff

**Authority** — Formal human homologation dated 24 November 2026.
**Record state** — Prepared before commit and branch publication.
**Strategy** — Alternative B, prioritizing the functional V1 product core.

## Where to resume

The objective is to reduce manual forwarding between development agents while retaining human authority, local isolation, durable evidence, independent review and controlled Git effects. Architecture v0.4 and P2-R2 remain the normative baseline. The ratified 64-character P2-R2 digest is `9d7212409b9ecad66d79e50dba04f046b6f93403263b0c8222b2afdc421d98e6`. Use the ratification addendum together with the unchanged historical approval record. [Architecture](../architecture/003-diretrizes-arquiteturais-v04.md) · [P2-R2](../specifications/P2-V1-OPERATIONAL-CONTRACTS-R2.md) · [Homologation and provenance](../specifications/P3-MVP-01-FORMAL-HOMOLOGATION.md)

The originating Git baseline is `main@146a5b390c0bee14175272b9a9627b9172d947f3`. The dedicated `p3/mvp-01` worktree is `~/projects/ai-agent-orchestrator-p3-mvp-01`. Its ten homologated files live under [p3-mvp-01/](../../p3-mvp-01/). Their exact byte identity is the SHA-256 of `VERSION.sha256`, `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`.

## Delivered increment and evidence

The local CLI registers one task per fresh installation, binds its canonical content to synthetic authority and admits at most one attempt. SQLite stores state, reserve, attempt and authoritative events. The coordinator prepares a Git worktree for a disposable fixture without a remote, mediates Git effects, and calls an offline deterministic substitute. The supervised launch records custody and orders delivery against revocation. Uncertainty retains the relevant reservation. A separate confined reader verifies the pinned snapshot with a writable scratch area. The handoff identifies the tested version and leaves the human gate open.

The stack is Node.js 24.22.2, native erasable TypeScript, SQLite 3.53.4 through `node:sqlite`, `node:test`, Git 2.34.1, Bubblewrap 0.6.1 and `prlimit` 2.37.2 on ext4. Checkpoint 8.7 passed for the offline profile. REV-V1-01 is satisfied within that envelope. RLIMIT_NPROC includes UID process/thread accounting and RLIMIT_FSIZE is per file. There are no aggregate storage or exclusive per-installation process quotas.

The executor passed 25 tests. Antigravity / Gemini 4 Neon (Medium) independently reproduced 25/25 with no failures or skipped, verified 41/41 and 27/27 manifest entries and 10/10 version entries, confirmed the pinned snapshot and worktree are byte-identical, and performed four adversarial probe groups. The deterministic ArtifactSet was `d103b9539f74f092086a4827ac5ff10e2b66b0ef5f53b9b3643568fe6b26abaf`. R1 and its targeted addendum conclude **SUFICIENTE COM RECOMENDAÇÕES NÃO BLOQUEANTES**. [R1](../reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1.md) · [Addendum](../reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1-ADDENDUM.md)

Under `~/.local/share/ai-agent-orchestrator/evidence/`, verify `SHA256SUMS` in each package. The implementation evidence package `p3-mvp-01-2026-11-24-resume-8lt1SU4W/` has manifest hash `5e04c246faeeabf8b2a28d80c9cf1dd77386001814c9eb7b8be92f6c86938852`. The prior diagnosis `p3-mvp-01-2026-11-24-AnFHEgVI/` has manifest hash `a082ce6cb230c60de4b34eac81425999596db57c6700f0d3274dc3043c0778f2`. The subsequent closure package is `p3-mvp-01-2026-11-24-publication-nMU0rNxO/` and carries the original review responses, provenance and final Git observations.

## Residual findings and scope

- P3-REV-01 is a confirmed, unfixed MINOR in reapproval after temporal or boot invalidation. It fails closed. Remediation needs separate authorization.
- P3-REV-02 is a confirmed, unfixed MINOR. Cancellation and revocation share the recorded event identity, and status unnecessarily exposes synthetic proof and nonce. Correct operational cancellation and containment were confirmed. The owner accepted the residual nonconformity for this exact offline version. It remains a candidate for remediation before real operation.
- P3-REV-03 is a partially confirmed EDITORIAL recommendation for future evolution. The released-attempt query has no confirmed functional defect in the single-attempt envelope. Evaluate namespace depth, explicit association and ordering before expanding that envelope. [Definitive triage](../reviews/P3-MVP-01-REVIEW-TRIAGE-R1.md)

The scope approved here is offline only. Full V1 readiness, human authentication, real agents, multiple real tasks, consumer-project remote integration and measured productivity remain outside it. OBS-1 and OBS-1-R2 remain NOT VERIFIABLE. Experimental findings and the dormant OBS-2 track retain their prior dispositions.

## Git state and next gate

At preparation, the tree of `main` and its index were preserved, including the three preexisting untracked historical documents. The `p3/mvp-01` branch was at the originating baseline. The owner authorized selective staging of the implementation and specified records, one commit on the task branch, and normal push to `origin/refs/heads/p3/mvp-01`. The commit and verified remote SHA are recorded in the subsequent closure report after those operations. Integration into `main` remains outside this delegation.

A future instance should verify the closure manifest and the published commit against `VERSION.sha256`, read the formal decision and triage, and request applicable human authorization to prepare I → R, including REV-V1-02. Keep O/D01–O/V4 and G gated separately. This handoff grants no authority to begin those actions.
