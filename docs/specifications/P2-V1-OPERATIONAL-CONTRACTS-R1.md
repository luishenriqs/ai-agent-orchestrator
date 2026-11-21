# AI Agent Orchestrator — V1 Operational Contracts (P2-R1)

**Classification:** Technical specification — review candidate, not approved  
**Proposed repository path:** `docs/specifications/001-v1-operational-contracts.md` (not created in the repository)  
**Date:** 2026-11-20  
**Purpose:** Consolidate functional operational contracts CT-01–CT-08 for independent adversarial review.  
**Implementation authorization:** None. No programming language, persistence engine, process manager, sandbox implementation, or web UI has been selected.

## 1. Authority, scope, and status

### 1.1 Source hierarchy

1. Express human authorization for the particular task and operation.
2. Formally homologated architectural directives, `docs/architecture/003-diretrizes-arquiteturais-v04.md`, SHA-256 `6e6a8987f112d866c4f52cd2d16c60b33548a6542c5299b510036d4efedc409b`; approval established by `docs/architecture/004-registro-homologacao-v04.md` on 2026-11-20. The directive document's historical header still says "candidate"; the later approval record establishes its approved status without changing those bytes.
3. Human P1 decisions, as supplied in this planning conversation:
   - **P1-DEC-01:** at most one coordinated active operational execution at a time.
   - **P1-DEC-02:** V1 web UI inclusion remains open pending P3 cost assessment.
   - **P1-DEC-03:** propose a protocol of 3–5 small real-repository validation tasks.
4. This P2-R1: **proposed**, not yet independently reviewed or homologated. Where a proposed rule imposes material constraints beyond the architectural directives, human approval is required.

Historical experimental POCs 006–007 support sequential invocation and review in synthetic scenarios. They do not prove production-quality isolation, recovery, gates, or real-repository operation.

### 1.2 Scope of this specification

Specify contract behavior, preconditions, postconditions, invariants, verifiable evidence, failure handling, and cross-contract interfaces. Physical representation, runtime/tooling choice, and UI implementation are reserved for P3. Codex and Antigravity are the initial supported agents; their real CLI capabilities must be established before implementation.

**Non-goals:** implementing code; migrating AI Orchestration Lab; mandatory ChatGPT API or AI Memory messaging; distributed infrastructure; visual workflow editor; multiuser platform; unapproved Git/GitHub effects.

### 1.3 Terms

- **Task:** human-described unit of work tied to an authorized consumer project and repository.
- **Specification revision:** immutable identity of the exact task definition subject to authorization.
- **Authorization:** verifiable human decision tied to identified content, permitted operations, scope, limits, conditions, and applicable gates.
- **Operation:** one intended coordinated action; **attempt:** a specific invocation toward that operation.
- **Execution reservation:** exclusive permission to dispatch one coordinated operation, not merely a status flag.
- **Artifact set:** retrievable, immutable identity of the exact materials captured for testing/review.
- **Evidence:** record of observed or verified events/effects; a report alone is not proof.
- **Gate:** human decision required before an action may proceed.
- **Authoritative event:** validated durable record owned by the orchestrator, not an agent narrative or AI Memory message.

## 2. Logical records (proposed, not physical schemas)

| Record | Minimum logical attributes | Core constraint |
| --- | --- | --- |
| Task | taskId, projectId, repository identity, baseline, currentSpecificationRevision, taskState | No implicit project/namespace selection |
| SpecificationRevision | taskId, revisionId, canonical content identity, objective, scope, role assignment, limits, acceptance criteria, allowed operations | Immutable once used for authorization |
| Authorization | authorizationId, actor/proof, taskId, specificationRevision, digest, permissions, conditions, decision, recordedAt | Agent assertion cannot establish authority |
| Operation | operationId, taskId, type, required authorization, input revision, expected effects and evidence | Stable identity across attempts |
| ExecutionAttempt | attemptId, operationId, dispatch identity, observed process identity, status, outcome/evidence | Distinguishes attempt from operation |
| ExecutionReservation | reservationId, owner instance, operationId, attemptId, generation, status | Exclusive across local instances and restart |
| ArtifactSet | artifactSetId, taskId, operationId, inventory, version digests, protected storage references, provenance | Retrieved bytes must match registered identity |
| Review | reviewId, taskId, reviewer, exact artifactSetId, specification revision, findings, outcome | Reviewer approval is not human homologation |
| Gate | gateId, taskId, type, context revision, requested effect, evidence, decision, conditions | No passage by agent declaration |
| Event | eventId, taskId, ordered sequence, type, actor, operation/attempt refs, evidence refs, recordedAt, payload | Append-like authoritative history with verifiable ordering |
| CleanupOperation | cleanupId, taskId, resource IDs, authorization, eligibility, attempt and result | Cleanup separately tracked after eligible closure |

Field labels are candidates; no code-level names or data structures are approved.

## 3. CT-01 — Task identity, specification, authorization

**Normative basis:** DEC-02, DEC-06, DEC-09, DEC-16.

**Preconditions for initial dispatch:** task registered directly in orchestrator; human authorization established by a mechanism independent of the executor; approval bound to the same exact specification revision being executed; validated project, repository, baseline, scope, agents/roles, limits, acceptance criteria, operations and gates.

**Rules:**

- AUTH-01 No coordinated execution without a valid, applicable human authorization.
- AUTH-02 Authorization identifies the exact approved specification revision and verifiable content identity.
- AUTH-03 Revisions used in authorization are not silently replaced; material changes require an applicable new authorization.
- AUTH-04 No agent or AI Memory message may confer or expand authorization.
- AUTH-05 Permissions are checked against the **effect** of the operation, not just its textual description or command name.
- AUTH-06 An authorization covering multiple steps remains usable within its conditions, without gratuitous confirmation per command.
- AUTH-07 Rejection, revocation, modification and new authorization decisions are appended without erasing past decisions.
- AUTH-08 Protected authority records are outside all executor-writable areas.
- AUTH-09 A task cannot borrow authorization, repository identity, or AI Memory namespace from another project.

**Open P2 design:** define a verifiable local human-approval ceremony, its authentication assumption/threat model, and material-versus-editorial revision policy. A digest alone proves content identity, not human provenance or approval. Canonicalization and physical storage go to P3.

**Acceptance evidence:** manipulated revision, wrong-project approval, agent-supplied approval marker, and unauthorized change of limits are all rejected; approved multi-step workflow does not require repeated approval while unchanged.

## 4. CT-02 — Task, operation, and gate state

**Normative basis:** DEC-08–DEC-13.

### 4.1 Distinct dimensions

Global task state, individual attempt status, gate status, execution reservation status, cleanup status, and final outcome **must not be collapsed into one field**. `RUNNING` is a global workflow condition; it does not prove a live subprocess. The phase (implementation, test, review, correction, final reporting) is recorded separately from the global task state.

**Candidate task states:** `REGISTERED`, `AUTHORIZED`, `RUNNING`, `WAITING_HUMAN`, `SUSPENDED`, `FAILED`, `CLOSED`.

**Candidate attempt states:** `PENDING`, `DISPATCHING`, `ACTIVE`, `RESULT_REPORTED`, `VERIFIED`, `FAILED`, `UNCERTAIN`.

**Candidate gate states:** `PENDING`, `APPROVED`, `REJECTED`; gate conditions and later superseding/revoking decisions must be represented independently.

**Candidate cleanup states:** `NOT_ELIGIBLE`, `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`.

**Final outcome** distinct from state: homologated, rejected, administratively closed, or authorized cancellation, as appropriate. None may be inferred solely from `CLOSED`.

### 4.2 Permitted global task transitions (candidate)

| From | To | Necessary condition (never by itself sufficient) |
| --- | --- | --- |
| REGISTERED | AUTHORIZED | Human approval for exact specification |
| REGISTERED | CLOSED | Authorized cancellation/closure, evidence retained |
| AUTHORIZED | RUNNING | Dispatch eligibility, verified context and exclusive reservation |
| AUTHORIZED | WAITING_HUMAN | Additional human decision required |
| AUTHORIZED | SUSPENDED | Verified safety blocker |
| AUTHORIZED | CLOSED | Authorized closure |
| RUNNING | WAITING_HUMAN | Agent operation no longer active or otherwise safely controlled; gate required |
| RUNNING | SUSPENDED | Interruption, unsafe/unknown effect or containment issue |
| RUNNING | FAILED | Impeding failure established and effects handled safely |
| RUNNING | CLOSED | Verified result, final authorization, necessary preservation |
| WAITING_HUMAN | AUTHORIZED | Decision enables not-yet-dispatched work |
| WAITING_HUMAN | RUNNING | Valid decision and safe continuation |
| WAITING_HUMAN | SUSPENDED | Reconciliation/containment required |
| WAITING_HUMAN | CLOSED | Authorized final decision and preservation |
| SUSPENDED | AUTHORIZED | Verified recovery leaves pending dispatch eligible |
| SUSPENDED | RUNNING | Verified reconciliation and applicable authorization |
| SUSPENDED | WAITING_HUMAN | Material uncertainty escalated |
| SUSPENDED | FAILED | Impeding failure established |
| SUSPENDED | CLOSED | Safe, authorized closure; uncertainty cannot be erased |
| FAILED | SUSPENDED | Authorized investigation/recovery plan |
| FAILED | CLOSED | Authorized closure, evidence retained |

No direct new execution from `CLOSED`. The precise transition matrix must be reviewed for unreachable states, cancellation, revocation, late results and exceptional paths; it is a candidate contract, not an independently verified proof of completeness.

### 4.3 State invariants

- ST-01 No task-state transition without validated preconditions and a durable authoritative event.
- ST-02 Attempt completion is never inferred from a zero exit code alone.
- ST-03 A state of `SUSPENDED` or `WAITING_HUMAN` does not automatically mean subprocesses or external effects have stopped.
- ST-04 `UNCERTAIN` cannot become `FAILED` solely due to an absent response.
- ST-05 A late, duplicate, stale, wrong-project or out-of-order event cannot mutate current state without expected-version validation.
- ST-06 The current state is reconstructible/reconcilable from authoritative events and observed effects.
- ST-07 Neither review approval nor reported completion advances a human gate.

**Event contract:** eventId, taskId, sequence, eventType, actor, operationId/attemptId (if applicable), recordedAt, optional occurredAt, prior state revision, structured payload, evidence refs. Order by authoritative sequence, not arrival timestamp. Intent, observed launch, reported result, verified result, gate decision, recovery and closure are distinct event classes.

**Persistence contract:** record prerequisite durable intent before dispatch; retain append-like evidence of decisions and outcomes; do not claim an externally atomic transaction. Physical engine deferred to P3.

## 5. CT-03 — Agent dispatch and operational exclusivity

**Normative basis:** DEC-08, DEC-12, DEC-15; P1-DEC-01.

**Dispatch contract:** verify eligibility and authorization; prepare sandbox/worktree; obtain exclusive local reservation; durably register intent and attempt; invoke designated CLI under enforced permissions; supervise process tree; capture streams and exit/outcome; verify observed effects and evidence; record the result; release capacity only when safe.

- EXE-01 At most one orchestrator-coordinated active invocation at a time across all tasks in the local installation.
- EXE-02 Multiple registered/awaiting-human tasks are allowed; waiting at a gate does not reserve a process slot once preceding process termination has been verified.
- EXE-03 Exclusivity must survive competing orchestrator instances and restarts; a process-local boolean is insufficient.
- EXE-04 Ownership identity/generation must prevent obsolete instance owners from dispatching after losing reservation authority.
- EXE-05 Process termination is not inferred from task status or timeout request; inspect associated descendants/side effects.
- EXE-06 An unknown surviving process capable of conflicting effects blocks incompatible new dispatch.
- EXE-07 Separate measured usage, estimated usage, and hard enforceable limits. Do not claim token quotas are enforceable without verified CLI support.
- EXE-08 New attempt is not automatic retry. Safe re-dispatch requires CT-07 reconciliation and authorization.
- EXE-09 Codex and Antigravity roles are task-assigned; adapters must have verified CLI semantics in the actual installation.

**Open:** actual CLI flags/outputs, process groups, cancellation, resource limits, reservation mechanism and queue order. A basic eligible-task queue is a candidate, not an approved scheduling requirement.

## 6. CT-04 — Worktree, sandbox and authority boundaries

**Normative basis:** DEC-06, DEC-16.

- ISO-01 Each task uses a dedicated branch and Git worktree; the user's principal working tree remains protected.
- ISO-02 Worktree separation is not a sandbox. Enforce read/write/execution and network/credential boundaries suited to the authorized task.
- ISO-03 Control evidence, authority and event store must be beyond executor write capabilities, including indirect access through links or mount paths.
- ISO-04 Treat shared Git metadata, refs, hooks/configuration, executable tooling and access tokens as potential escape routes.
- ISO-05 Reviewer operates with effectively enforced read-only access to the pinned review version; tests that write need separate scratch output.
- ISO-06 Canonicalize/contain filesystem references and handle symlink/path traversal escapes; filenames and artifact refs never convey authority.
- ISO-07 Prevent transient output accidentally entering version control.
- ISO-08 Permission model must account for child processes, network egress and inherited secrets.
- ISO-09 Fail closed when claimed isolation cannot be enforced or verified; do not silently downgrade sandbox guarantees.
- ISO-10 Worktree creation/reuse and cleanup are reconciled to task identity and recorded effects.

**Key feasibility gate for P3:** demonstrate enforcement in the actual WSL2/Ubuntu environment and actual CLIs, not merely configuration strings. Permission to perform Git/GitHub effects never implies unconstrained access to all Git internals or credentials.

## 7. CT-05 — Immutable artifacts, evidence and version identity

**Normative basis:** DEC-05–DEC-07, DEC-10, DEC-13.

**Logical capture protocol:** verify no conflicting writer; inventory relevant files and context; capture content into protected storage; validate hashes and retrieval; publish immutable artifact-set identity; only then route to review. Failed capture is not a published reviewable version.

- ART-01 A review identifies exactly which artifact set (content, paths, provenance and relevant version) it examined.
- ART-02 Captured versions used in review are immutable and retrievable for their required retention period.
- ART-03 A correction creates a new version and references the predecessor, never overwrites it.
- ART-04 Test evidence is bound to the code and environment it actually tested; old PASS cannot silently carry over to modified code.
- ART-05 Metadata-only hash references without retrievable bytes are insufficient.
- ART-06 Artifacts belong to a verified task/project and permissions; no path or hash supplied by an agent grants access.
- ART-07 Protected indexes and control evidence cannot be altered by executors/reviewers.
- ART-08 Selective promotion to consumer Git does not replace protected operational records.

**Open:** snapshot-versus-Git physical strategy, inventory boundary, hash algorithm/canonical format, retention, size limits, test evidence completeness and secret redaction policy. Commits are **not** mandatory at every transition.

## 8. CT-06 — Independent review, findings and corrections

**Normative basis:** DEC-14; DEC-05.

**Review request must reference:** task and approved specification revision; immutable artifact-set identity; review agent/role; acceptance criteria; authorized evidence; allowed inspection scope.

**Candidate outcomes:** `APPROVED` (within scope; not bug-free proof), `CHANGES_REQUIRED`, `INCONCLUSIVE`. CLI/process failure is an **operation failure**, not automatically a negative code review.

**Finding record:** findingId, reviewId, artifactSetId, severity, description, reproducible evidence/counterexample, affected artifacts, recommendation, resolution and supporting evidence. Severity candidate: BLOCKER, MAJOR, MINOR, EDITORIAL. Severity-to-gate policy remains to be formalized, not silently inferred.

- REV-01 Implementation and independent review are separated by task role and execution; role assignment is not permanently tied to a particular brand.
- REV-02 Review examines a pinned immutable version under enforced access constraints.
- REV-03 The reviewer does not authorize itself, expand scope, or homologate the result.
- REV-04 Findings remain linked to the exact reviewed version; corrections reference findings and produce a new version.
- REV-05 Regressions are checked where applicable and test evidence specifies the actual version.
- REV-06 Corrections outside approved scope stop for human decision.
- REV-07 Configurable cycle/time/resource limits prevent unbounded loops; an exhausted limit triggers applicable gate rather than implicit continuation.
- REV-08 `INCONCLUSIVE` is not approval; a favorable review is not final human homologation.

## 9. CT-07 — Failure, effects and safe recovery

**Normative basis:** DEC-10–DEC-13.

**Effect protocol:** (1) validate authorization; (2) durably record intent/identity; (3) perform effect; (4) observe/verify result; (5) persist outcome and evidence or explicit uncertainty. No claim of atomic exactly-once semantics across local event store and external effects.

**Recovery classification:** `VERIFIED_COMPLETED` (effect proven), `VERIFIED_NOT_EXECUTED` (absence proven), `UNCERTAIN` (insufficient evidence). A missing completion event is not proof of non-execution.

**Recovery steps:** secure exclusive recovery authority; read authoritative events; inspect surviving processes, worktrees and remote effects; validate artifacts/authorization; reconcile each pending operation; durably record reconciliation; release only safe and authorized next actions.

- REC-01 Never automatically repeat a potentially irreversible or uncertain effect.
- REC-02 No new attempt while a prior conflicting effect remains uncertain.
- REC-03 A verified prior success must not be re-executed; verified non-execution permits considering a new **authorized** attempt.
- REC-04 Uncertainty requiring material judgment escalates to the human.
- REC-05 A handoff reflects verifiable records, not agent recollection; it identifies last proven step, uncertainty, artifacts, authority and safe next action.
- REC-06 Restart/crash does not clear live-process or effect uncertainty.
- REC-07 Reconciliation decisions append evidence rather than rewriting history.
- REC-08 Verification of external effects uses service-specific observable identifiers when available; idempotency is not assumed without provider support.

**Open:** automatic-safe versus human-assisted recovery thresholds, process supervision details, effect-specific reconciliation recipes and storage durability properties.

## 10. CT-08 — Gates, authorized Git/GitHub effects and closure

**Normative basis:** DEC-02, DEC-06, DEC-09, DEC-14; v0.4 §10.

**Gate types (candidate):** initial authorization, scope change, exception, recovery decision, final homologation, closure authorization. Gate decision identifies task, exact context, requested permission, actor proof, conditions and evidence. `APPROVED` does not cover unrelated future effects.

**Git/GitHub effect descriptor:** operation kind, repository, source/destination refs, expected revisions, strategy, conditions/checks, authorization, verification plan. Authorization applies to effects, not just command strings.

- GATE-01 Neither agent text, AI Memory message, exit code, nor reviewer approval passes a human gate.
- GATE-02 Existing authorization can cover multiple in-scope Git actions without per-command confirmation.
- GATE-03 Branch/worktree creation and local commits need delegation; push/PR/merge may be automated within their expressly approved scope/destination/strategy/gates.
- GATE-04 Force push, destructive actions, changed merge strategy or bypass protections require specific authorization.
- GATE-05 Conflicts, failed checks, unexpected ref changes and ambiguous outcomes stop affected operations until validated/reconciled.
- GATE-06 Git control cannot be bypassed through an unrestricted shell, shared Git metadata, direct network credentials or alternate tools.
- GATE-07 Final homologation, rejection, administrative closure and cancellation remain distinct outcomes.
- GATE-08 Closure is a verified human-authorized outcome; cleanup is a separately audited effect, only after authorized closure and preservation of necessary evidence.
- GATE-09 `CLOSED` does not mean cleanup succeeded, and cleanup failure does not silently reopen the task.
- GATE-10 A closed task may not silently resume coordinated execution; new work requires a distinct authorized action/task lifecycle.

**Closure preconditions:** applicable human decision; known or explicitly preserved/handled uncertain effects; required report, artifact sets and evidence retained; separately authorized final Git actions executed/reconciled as applicable. Cleanup is separately eligible/authorized/recorded, including worktree and branch safety checks.

## 11. Cross-contract invariants

| ID | Invariant | Contract(s) |
| --- | --- | --- |
| INV-01 | Human authorization precedes coordinated execution | 01, 08 |
| INV-02 | Authorization is bound to verifiably identified content | 01 |
| INV-03 | Agents cannot confer or enlarge authority | 01, 04, 08 |
| INV-04 | Orchestrator validates all authoritative transitions | 02 |
| INV-05 | Only one coordinated active execution at a time | 03 |
| INV-06 | Effective isolation is mandatory for dispatch | 03, 04 |
| INV-07 | Control records cannot be written by executors | 01, 04 |
| INV-08 | Review uses a retrievable immutable version | 05, 06 |
| INV-09 | Corrections do not overwrite prior reviewed versions | 05, 06 |
| INV-10 | Test evidence pins the tested version | 05, 06 |
| INV-11 | Intent, observed execution and verified outcome are distinct | 02, 07 |
| INV-12 | No unsafe retry of uncertain effects | 03, 07 |
| INV-13 | Recovery revalidates context, authorization and evidence | 07 |
| INV-14 | Human gates remain authoritative | 01, 08 |
| INV-15 | Git/GitHub effects respect authorized scope and conditions | 04, 08 |
| INV-16 | Closure and cleanup retain evidence and distinct authorities | 05, 08 |
| INV-17 | Project isolation prevents cross-project implicit selection | 01, 04 |
| INV-18 | AI Memory messaging is optional for main V1 workflow | 01, 02, 03 |

## 12. Acceptance-test matrix (minimum normative scenarios)

| ID | Scenario | Required observation |
| --- | --- | --- |
| A01 | Missing/agent-forged authorization | No coordinated dispatch |
| A02 | Approved specification changes | Mismatched operation blocked until applicable authorization |
| A03 | Wrong-project or stale reference | Rejected without affecting live task |
| A04 | Duplicate command/result delivery | No duplicate effects or invalid state transition |
| A05 | Two orchestrator instances race to dispatch | At most one valid active coordinated execution |
| A06 | Crash at dispatch boundary | Reconciliation; no assumed non-execution or blind retry |
| A07 | Surviving subprocess after cancellation | Capacity not unsafely released |
| A08 | Out-of-scope file write / symlink escape | Protected target unchanged |
| A09 | Reviewer tries to write pinned content | Protected snapshot unchanged |
| A10 | Test PASS belongs to older source version | Cannot be attributed to newer artifact set |
| A11 | Agent output says success; evidence absent | Not `VERIFIED` |
| A12 | Review returns CHANGES_REQUIRED | Finding-linked authorized correction and new version |
| A13 | Review inconclusive or CLI fails | No presumed approval |
| A14 | Review says approved, no human homologation | Final gate remains pending |
| A15 | Failed/unknown remote push result | Verify remote ref/effect before possible next action |
| A16 | Unauthorized push/merge/force push | Effect prevented, not merely logged |
| A17 | Restart with uncertain external effect | Explicit uncertainty; unsafe conflicting actions blocked |
| A18 | AI Memory unavailable for unrelated workflow | Main authorized path operates without messaging |
| A19 | Cleanup requested before preservation/closure | Cleanup rejected |
| A20 | Cross-project task alternation | Context/permissions/evidence remain isolated |

Tests are future obligations, not executed evidence. Actual sandbox, CLI, remote-identity and crash tests must be demonstrated independently of unit-test mocks.

## 13. Proposed real-repository validation protocol (P1-DEC-03)

**Four small reversible tasks** (proposed, within approved 3–5 range); actual repository/task selection and execution require separate human delegation:

1. **VR-01:** one bounded implementation + independent review + final human gate. Evidence: authorization, exact version, invocation, review, manual forwarding count.
2. **VR-02:** seeded/test-discoverable defect and review/correction cycle. Evidence: finding, before/after versions, regression evidence, bounded cycles.
3. **VR-03:** controlled interruption at a safe test boundary, restart and reconcile. Evidence: last proven step, uncertain-state handling, no duplicate effect.
4. **VR-04:** alternate between two consumer repositories with different task context. Evidence: baseline, worktree, permissions, artifacts and no context crossing.

Run dedicated synthetic fault-injection and containment tests separately before these real tasks. Record human interventions, elapsed time, agent runtime/usage where available, and manual handoffs avoided. POC success is not substituted for these measurements.

## 14. Traceability to homologated directives

| Directive | Primary contract coverage |
| --- | --- |
| DEC-01 | All: local, proportionate design |
| DEC-02 | CT-01, CT-08 |
| DEC-03–04 | CT-01/02/03 (optional supporting AI Memory) |
| DEC-05 | CT-05/06 |
| DEC-06 | CT-03/04/08 |
| DEC-07 | CT-05/08 |
| DEC-08 | CT-02/03 |
| DEC-09 | CT-01/02/08 |
| DEC-10–11 | CT-02/07 |
| DEC-12–13 | CT-07 |
| DEC-14 | CT-05/06/08 |
| DEC-15 | CT-03 |
| DEC-16 | CT-01/04 |

## 15. Open items and downstream ownership

### 15.1 Before P2 homologation — contract-level decisions / adversarial checks

- **O-01:** threat model and minimal verifiable local human approval ceremony; revocation and scope-change semantics.
- **O-02:** full transition table validation for cancel/reject/expire/late events; distinguish operator action from workflow state.
- **O-03:** reconcile reservation owner fencing and process-liveness on WSL2 before re-dispatch.
- **O-04:** binding of snapshot inventory to tested/reviewed version, including files generated during tests.
- **O-05:** enforceable Git/GitHub privilege boundary for unrestricted shell and shared `.git` internals.
- **O-06:** explicit safety contract for closing tasks with unresolved external effects (recording uncertainty is not permission to leave dangerous effects uncontrolled).
- **O-07:** severity-to-correction/gate policy and handling of inconclusive review.
- **O-08:** event atomicity/durability requirements relative to a process spawn and local exclusivity release.

These are not silently considered resolved merely by the descriptive proposals above. The independent reviewer should classify whether each is a blocker to P2 approval or a technology-dependent P3 feasibility gate.

### 15.2 P3 — compare technical implementations

Language/runtime; process supervision; data store and atomic local record writes; locks/fencing; sandbox options for WSL2/Ubuntu; actual Codex/Antigravity CLI versions, invocation, cancel, output and token telemetry; snapshot/Git object strategy; credential access; CLI surface; Git/GitHub effect mediators; web UI **cost comparison and human decision**. P3 cannot waive these P2 invariants without a separately approved change.

## 16. Formal review / approval status

**Current verdict:** `P2-R1 — READY FOR INDEPENDENT ADVERSARIAL REVIEW AS A CANDIDATE`, **not** `APPROVED` and **not** `READY TO IMPLEMENT`.  
No claim has been made that tests ran, subprocesses were controlled, a sandbox was verified, or a Git operation was executed. Formal implementation approval remains a separate human gate.
