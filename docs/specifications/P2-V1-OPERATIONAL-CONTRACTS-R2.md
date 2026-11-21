# AI Agent Orchestrator — V1 Operational Contracts (P2-R2)

- **Classification** — technical specification and review candidate.
- **Prior revision** — [P2-R1](P2-V1-OPERATIONAL-CONTRACTS-R1.md).
- **Purpose** — specify operational contracts CT-01–CT-08 for independent regression review. [Consolidated review triage](../reviews/P2-V1-INDEPENDENT-REVIEWS-TRIAGE-R1.md).
- **Implementation authorization** — none. Technology selection belongs to P3.

## 1. Authority, scope, and status

### 1.1 Source hierarchy

1. Formally homologated architectural directives, `docs/architecture/003-diretrizes-arquiteturais-v04.md`, SHA-256 `6e6a8987f112d866c4f52cd2d16c60b33548a6542c5299b510036d4efedc409b`. The formal [approval record](../architecture/004-registro-homologacao-v04.md) establishes the approved status of those exact bytes.
2. Human P1 decisions, recorded in the [P2-R1 review protocol](../reviews/P2-V1-INDEPENDENT-REVIEW-PROMPT-R1.md) and reaffirmed for this revision.
   - **P1-DEC-01:** at most one coordinated active operational execution at a time.
   - **P1-DEC-02:** V1 web UI inclusion remains open pending P3 technical and cost assessment and a human decision.
   - **P1-DEC-03:** propose a protocol of 3–5 small real-repository validation tasks.
3. Express human task and operation authorizations grant particular permissions within the approved directives and P1 decisions.
4. This P2-R2 is a candidate. Human approval is required for any additional material constraint.

Historical experimental POCs 006–007 support sequential invocation and review in synthetic scenarios. They do not prove production-quality isolation, recovery, gates, or real-repository operation.

### 1.2 Scope of this specification

Specify contract behavior, preconditions, postconditions, invariants, verifiable evidence, failure handling, and cross-contract interfaces. Physical representation, runtime/tooling choice, and UI implementation are reserved for P3. Codex and Antigravity are the initial supported agents; their real CLI capabilities must be established before implementation.

**Non-goals:** implementing code; migrating AI Orchestration Lab; mandatory ChatGPT API or AI Memory messaging; distributed infrastructure; visual workflow editor; multiuser platform; unapproved Git/GitHub effects.

### 1.3 Terms

- **Task:** human-described unit of work tied to an authorized consumer project and repository.
- **Specification revision:** immutable identity of the exact task definition subject to authorization.
- **Authorization:** verifiable human decision tied to identified content, permitted operations, scope, limits, conditions, and applicable gates.
- **Operation:** one intended coordinated action; **attempt:** a specific invocation toward that operation.
- **Execution reservation** — exclusive local authority to prepare an operation with effects, admit execution, and supervise that execution through safe release.
- **Admission** — the point at which the orchestrator lets a specific dispatch or effect proceed under current authority and verified conditions.
- **Artifact set:** retrievable, immutable identity of the exact materials captured for testing/review.
- **Evidence:** record of observed or verified events/effects; a report alone is not proof.
- **Gate:** human decision required before an action may proceed.
- **Authoritative event:** validated durable record owned by the orchestrator, not an agent narrative or AI Memory message.

## 2. Logical records

| Record | Minimum logical attributes | Core constraint |
| --- | --- | --- |
| Task | taskId, projectId, repository identity, baseline, current specification revision, applicable artifact set, phase, state and final outcome | No implicit project/namespace selection |
| SpecificationRevision | project/task identity, revisionId, canonical content identity, objective, sources, repository/baseline, scope, roles, limits, acceptance criteria, allowed operations and gates | Immutable once used for authorization |
| Authorization | authorizationId, human actor/proof, project/task identity, approved revision and digest, permissions, conditions, decision, effective order and expiry if applicable | Agent assertion cannot establish authority |
| Operation | operationId, taskId, type, required authorization, expected context, state, expected effects and evidence | Stable identity across attempts |
| ExecutionAttempt | attemptId, operationId, dispatch and supervision correlation, observed process identity when available, state, outcome/evidence | Correlatable from the point of launch |
| ExecutionReservation | reservationId, owner instance, operationId, attemptId, generation, status | Exclusive across local instances and restart |
| ArtifactSet | artifactSetId, taskId, operationId, inventory, version digests, protected storage references, provenance | Retrieved bytes must match registered identity |
| Review | reviewId, taskId, reviewer, exact artifactSetId, specification revision, findings, outcome | Reviewer approval is not human homologation |
| Gate | gateId, project/task identity, type, expected context, requested effect, evidence, status, human decision and conditions | No passage by agent declaration |
| Event | Authoritative event attributes in §4.3 | Append-like history with verifiable ordering |
| CleanupOperation | cleanupId, taskId, resource IDs, authorization, eligibility, attempt and result | Cleanup separately tracked after eligible closure |

These records describe logical distinctions. A local implementation may consolidate them in one protected history and derive current views from it. Field labels and physical models remain open.

## 3. CT-01 — Task identity, specification, authorization

**Normative basis:** DEC-02, DEC-06, DEC-09, DEC-16.

**Initial dispatch preconditions.** The human registers the task directly with the orchestrator. The orchestrator validates project, repository, baseline, sources, scope, roles, limits, acceptance criteria, operations and gates against the exact approved content.

**Local trust boundary.** The designated human and protected orchestrator decision surface are trusted under the local V1 operating assumptions. Treat task inputs, executor and reviewer output, and their subprocesses as untrusted. The protected surface presents the actual project, task, revision and approved content, requested permissions, conditions, and applicable artifact or effect. The human confirms that context through a capability unavailable to executors, reviewers and their subprocesses. The orchestrator records proof of that decision bound to the same context it presented. Agent-supplied files, environment or API inputs, claimed identities, hashes and messages can provide data. They cannot invoke or impersonate the human decision capability. If the boundary or binding cannot be verified, deny admission.

**Rules:**

- AUTH-01 No coordinated execution without a valid, applicable human authorization.
- AUTH-02 Authorization binds the human decision to the project, task, exact specification revision, verifiable content identity, permissions and conditions. Include the artifact set and effect context when the decision concerns either.
- AUTH-03 Every change to canonical approved content creates a new revision and requires authorization for that revision. Metadata excluded from canonical content must be non-authoritative and incapable of changing the displayed or enforced scope, conditions, acceptance criteria or effects.
- AUTH-04 No agent or AI Memory message may confer or expand authorization.
- AUTH-05 Permissions are checked against the **effect** of the operation, not just its textual description or command name.
- AUTH-06 An authorization covering multiple steps remains usable within its conditions, without gratuitous confirmation per command.
- AUTH-07 Rejection, revocation, replacement, applicable expiry and new decisions preserve the prior record. Revalidate eligibility and authority before competing for the reservation, under the reservation before preparation with effects, immediately at dispatch admission, and immediately at the admission of each privileged effect, including Git/GitHub effects.
- AUTH-08 Authority records comply with the protected storage boundary in ISO-03.
- AUTH-09 A task cannot borrow authorization, repository identity or AI Memory namespace from another project. Exclude the historical IAS namespace from automatic selection.

**Concurrent invalidation.** Order the admission of each dispatch or privileged effect against revocation, replacement and cancellation in authoritative records. Check any applicable expiry at admission. If invalidation takes effect first, deny the pending admission and apply §4.2. A previous positive check confers no right to proceed. If admission wins, prevent additional admissions under invalidated authority, stop affected execution through the containment procedure, and reconcile each admitted effect. A running executor cannot continue new work under the revoked scope. Effects already admitted may have occurred and remain subject to verification. Physical authentication, canonicalization, and the enforcement mechanism go to P3.

**Acceptance evidence:** manipulated revision, wrong-project approval, agent-supplied approval marker, and unauthorized change of limits are all rejected; approved multi-step workflow does not require repeated approval while unchanged.

## 4. CT-02 — Task, operation, and gate state

**Normative basis:** DEC-08–DEC-13.

### 4.1 Distinct dimensions

Track task phase, task state, operation, attempt, reservation, gate and cleanup separately. `RUNNING` denotes an admitted workflow phase. Liveness and slot ownership come from CT-03/07. Record the decision to homologate, reject, administratively close, or cancel independently of `CLOSED`.

### 4.2 Permitted transitions

The listed transitions require CT-01, CT-03, CT-07 and CT-08 conditions wherever applicable. Suspension, escalation, and verified recovery may be recorded without admitting another operation.

| Task transition | Required condition |
| --- | --- |
| `REGISTERED → AUTHORIZED` | Initial human gate approved for exact specification. |
| `AUTHORIZED → RUNNING` | Eligible operation has durable admission under the reservation. Each subsequent coordinated operation obeys CT-03, including within a running phase. |
| `AUTHORIZED → WAITING_HUMAN` | Another decision is required or authorization is invalidated before any associated execution or effect was admitted. |
| `AUTHORIZED / RUNNING / WAITING_HUMAN / FAILED → SUSPENDED` | Reconciliation, investigation or containment is required. In-flight cancellation or invalidation and interruptions enter this path when control or effects require verification. |
| `RUNNING → WAITING_HUMAN` | Required gate is pending. The preceding execution has ceased and its result is durably recorded. |
| `RUNNING / SUSPENDED → FAILED` | Impeding failure is verified, execution has ceased, and effects are known and safely recorded. |
| `SUSPENDED → WAITING_HUMAN` | Execution has ceased and the orchestrator records a required decision, including escalation of remote uncertainty. Escalation itself may be reported while the task remains suspended and local liveness is unresolved. |
| `WAITING_HUMAN / SUSPENDED → AUTHORIZED` | Required human decisions are valid for pending work, any required recovery is verified, and no unresolved effect blocks that work. |
| `REGISTERED / AUTHORIZED / WAITING_HUMAN / SUSPENDED / FAILED → CLOSED` | All CT-08 closure conditions hold. Homologated closure is from `WAITING_HUMAN` and requires the verified final homologation decision. Rejection, cancellation and administrative closure require the applicable human closure decision. |

| Dimension | Lifecycle and transition conditions |
| --- | --- |
| Operation | `PENDING → IN_PROGRESS` on durable admission of an attempt, or `PENDING → CANCELLED` when withdrawn before admission. `IN_PROGRESS → BLOCKED` when containment or an effect remains unresolved. `IN_PROGRESS / BLOCKED → COMPLETED / FAILED / CANCELLED` requires evidence of completion, confirmed inability to complete the work under its current conditions, or verified withdrawal with effects accounted for, respectively. Record a proved completion even if the task is cancelled. `IN_PROGRESS / BLOCKED → PENDING` requires the prior attempt resolved, intended effects absent, and a safe, authorized retry under CT-07. Pending work without current authority waits or is withdrawn. Completed, failed and cancelled operations are terminal. A separately authorized action can address a proved outstanding effect. |
| ExecutionAttempt | `PREPARED → ADMITTED` on durable admission. `PREPARED → CANCELLED` requires withdrawal and proof that execution was never admitted. `ADMITTED → UNCERTAIN` on unresolved execution or effect. `ADMITTED / UNCERTAIN → VERIFIED / VERIFIED_NOT_EXECUTED / FAILED` requires verified completion, proved absence of intended effects, or proven failure with effects accounted for, respectively, and verified cessation where applicable. Observed launch, process exit, cancellation request and reported result are distinct events. If a cancelled in-flight attempt completed an effect, retain that fact and its evidence. |
| ExecutionReservation | `HELD → RECOVERING` on loss of owner authority, failure of durable recording relevant to release, or uncertain execution requiring takeover. The slot remains occupied. Recovery authority may inspect and contain under CT-03/07. `HELD / RECOVERING → RELEASED` only under EXE-10. Release is terminal for the reservation. New work acquires a new reservation under current ownership. |
| Gate | `PENDING → APPROVED / REJECTED` on valid binding and durable human decision. `PENDING / APPROVED → INACTIVE` when withdrawn, superseded or no longer applicable. Historical decisions remain visible. A new decision for changed context uses a new gate. Rejection stops the gated action and routes to authorized correction, another applicable decision or authorized closure. |
| Cleanup | Ineligible until CT-08 permits `NOT_ELIGIBLE → PENDING`. `PENDING → IN_PROGRESS` requires CT-03 admission and current cleanup authorization and eligibility. A pending request whose conditions lapse returns to `NOT_ELIGIBLE`. `IN_PROGRESS → COMPLETED / FAILED` requires verified disposition. Uncertainty remains attached to the cleanup operation and blocks conflicting work until reconciled. If retry is safe and authorized, `FAILED → PENDING` after revalidation. `COMPLETED` is terminal and the task stays closed throughout. |

A cancellation request before admission withdraws the affected operation or prepared attempt after checking that no effect was admitted. A cancellation, revocation, replacement or expiry after admission stops new effects and follows CT-07 before any affected work resumes or closes. Preparation effects already admitted count as execution for these decisions. A confirmed failure with no eligible follow-up can be closed through the applicable human gate. A closed task has no transition to ordinary execution. Post-closure reconciliation and authorized cleanup can append evidence and state for their own dimensions.

### 4.3 State invariants

- ST-01 Every authoritative transition requires validated preconditions and a durable event. An unavailable or ambiguous write is handled by REC-10.
- ST-02 Attempt completion is never inferred from a zero exit code alone.
- ST-03 A state of `SUSPENDED` or `WAITING_HUMAN` does not automatically mean subprocesses or external effects have stopped.
- ST-04 `UNCERTAIN` cannot become `FAILED` solely due to an absent response.
- ST-05 Validate project, task, active step, expected state revision, authorization context, operation/attempt and artifact set as applicable to the transition. Evaluate those conditions together with the authoritative update. Duplicate delivery has no repeated effect. Reject mismatched references. Preserve relevant stale or late observations as historical evidence in the correct context. They cannot advance current work, satisfy its gates or reopen a closed task. Late evidence about a pending effect may inform CT-07 reconciliation.
- ST-06 The current state is reconstructible/reconcilable from authoritative events and observed effects.
- ST-07 Neither review approval nor reported completion advances a human gate.

Executors may report results and request the next operation. The orchestrator validates the proposed transition, its authority and its expected context before selecting and directly invoking the next designated agent.

**Event contract.** Identify event, project, task, authoritative sequence, actor, type, applicable operation/attempt and reservation ownership, prior state revision, recording time, optional observed time, payload and evidence references. Authoritative sequence determines ordering. Intent, admission, observed launch, reported result, verified result, gate decision, recovery and closure are distinct event classes.

**Persistence contract.** Make the authoritative history sufficient to rebuild the state or expose work requiring reconciliation. The orchestrator may use a cached view only while it agrees with durable records. CT-07 defines the response to write failure and interruption. The physical engine belongs to P3.

## 5. CT-03 — Agent dispatch and operational exclusivity

**Normative basis:** DEC-08, DEC-12, DEC-15; P1-DEC-01.

**Dispatch contract.** Perform read-only preflight and obtain the installation-wide reservation. Under the reservation, revalidate eligibility and authority and durably record intent and admission for preparation with effects before performing that preparation. This includes creating or changing worktrees or branches. Record preparation effects separately from the result of any subsequent launch. Establish effective isolation before invoking the designated CLI directly. Before spawn, durably record the attempt and its admission and bind it to a supervision correlation that applies to the process and descendants from creation. Recovery must be able to use it without an observed PID or launch record. Supervise execution, collect results, verify effects, durably record the outcome or reconciliation obligation, and release only under EXE-10.

- EXE-01 At most one coordinated operational execution is active across the installation. The reservation covers agent invocation and operations executed by the orchestrator, including effectful preparation, tests, Git/GitHub actions, and cleanup. A mediated effect is a sequential substep of the owner’s execution if the executor waits and mediation meets CT-01/04/08. Otherwise, handle the request after the agent operation has ceased. Read-only eligibility checks and recording a human decision do not acquire an execution slot.
- EXE-02 Multiple registered or waiting tasks are allowed. Waiting for a human decision requires no slot after the preceding reservation meets EXE-10.
- EXE-03 Acquisition and ownership must be exclusive across competing local instances and restarts. Reading a free slot confers no authority.
- EXE-04 Ownership identity and generation must prevent an obsolete owner from admitting a spawn or effect, advancing authoritative state as owner, or releasing a reservation after losing authority.
- EXE-05 Verify cessation of relevant local execution and descendants. Parent exit, timeouts, task state, and a cancellation request do not establish cessation.
- EXE-06 An orphaned or indeterminate reservation remains occupied. An exclusive recovery owner may take responsibility for inspection and containment after fencing the previous owner. It may not admit ordinary work while the previous execution can still be active. Completion of takeover for new work requires verified cessation and release under EXE-10.
- EXE-07 Separate measured usage, estimated usage, and hard enforceable limits. Do not claim token quotas are enforceable without verified CLI support.
- EXE-08 New attempt is not automatic retry. Safe re-dispatch requires CT-07 reconciliation and authorization.
- EXE-09 Codex and Antigravity roles are task-assigned; adapters must have verified CLI semantics in the actual installation.
- EXE-10 Release requires verified cessation of the associated local execution, reconciliation of reservation ownership, and durable recording of the outcome or a durable unresolved external-effect obligation with effective conflict blocks. If local liveness or a condition of release is unknown, retain the slot for recovery. A remote uncertainty with no remaining local execution may allow release after its conflict bounds are established and enforced. A task status change or human decision alone cannot release a reservation.

**Open for P3.** CLI flags and outputs, process supervision, cancellation and resource limits, reservation and fencing mechanisms, and scheduling. Explicit operator dispatch is sufficient if it meets the contract. A queue is optional.

## 6. CT-04 — Worktree, sandbox and authority boundaries

**Normative basis:** DEC-06, DEC-16.

- ISO-01 Each task uses a dedicated branch and Git worktree; the user's principal working tree remains protected.
- ISO-02 Worktree separation is not a sandbox. Enforce read/write/execution and network/credential boundaries suited to the authorized task.
- ISO-03 Store authorizations, operational state, history, review findings and control evidence durably outside the consumer repository and outside all areas executors or reviewers can write to, including through links, mounts, subprocesses or privileged interfaces.
- ISO-04 Executors may access authorized task workspace data and scoped Git capabilities. They must lack unrestricted write access to shared Git metadata, including refs outside the task, hooks and configuration, and ambient credentials capable of effects outside their delegation. The orchestrator executes or enforces mediation for privileged Git/GitHub effects, including any local Git action that would otherwise require broader capability. The enforcement boundary applies to the effective repository, metadata, executable tooling, credentials, and destinations. It must hold across alternative tools and direct network access.
- ISO-05 Reviewer operates with effectively enforced read-only access to the pinned review version; tests that write need separate scratch output.
- ISO-06 Validate and contain the effective filesystem target at use, including link or mount changes and path traversal. Filenames and artifact references never confer authority.
- ISO-07 Prevent transient output accidentally entering version control.
- ISO-08 Permission model must account for child processes, network egress and inherited secrets.
- ISO-09 Fail closed when claimed isolation cannot be enforced or verified; do not silently downgrade sandbox guarantees.
- ISO-10 Worktree creation/reuse and cleanup are reconciled to task identity and recorded effects.

**P3 feasibility gate.** Demonstrate enforcement in the actual WSL2/Ubuntu environment and with the actual CLIs by observing protected targets and testing alternative access paths. Permission to perform Git/GitHub effects never confers unconstrained access to Git internals or credentials.

## 7. CT-05 — Immutable artifacts, evidence and version identity

**Normative basis:** DEC-05–DEC-07, DEC-10, DEC-13.

**Logical capture protocol.** Define the inventory of source and other relevant inputs, their provenance and the boundary from which bytes are captured. Verify that conflicting writers are excluded from that boundary from inventory through capture and consistency verification. Capture the bytes into protected storage. Verify that the bytes, inventory and provenance match the stable source observed for capture, and verify retrieval and integrity after capture. Publish the immutable artifact-set identity only after these checks. A detected mutation or unverified capture prevents publication and test or review attribution.

- ART-01 A review identifies exactly which artifact set (content, paths, provenance and relevant version) it examined.
- ART-02 Captured versions used in review are immutable and retrievable for their required retention period.
- ART-03 A correction creates a new version and references the predecessor, never overwrites it.
- ART-04 Authoritative test evidence identifies the exact `artifactSetId`, actual test invocation, test inputs and relevant execution context needed to interpret or reproduce the result, including applicable toolchain, dependencies and configuration. The orchestrator verifies that the tested inputs are from the pinned version and are protected against conflicting mutation throughout use. Tests may run directly on the protected version or on an equivalent verified execution view. Include generated files and other materials that affect the result in the input or derivation evidence tied to that version. Use separate authorized scratch for outputs that need writes. A result is inapplicable if relevant inputs differ, can change without verification while in use, or cannot be attributed to the published version.
- ART-05 Metadata-only hash references without retrievable bytes are insufficient.
- ART-06 Artifacts belong to a verified task/project and permissions; no path or hash supplied by an agent grants access.
- ART-07 Protected indexes and control evidence cannot be altered by executors/reviewers.
- ART-08 Promote or forward selected deliverables to the agreed persistent destination within applicable authorization and gates. Preserve the association among project, task, artifact set, review, result, provenance and evidence. For Git promotion use CT-08. Keep authoritative records under ISO-03. Provide the human usable references to the retained materials.

**Open for P3.** Physical snapshot or Git object strategy, inventory representation, hash algorithm and canonical format, retention duration, size limits, test capture tooling and secret redaction. A commit at every transition is optional.

## 8. CT-06 — Independent review, findings and corrections

**Normative basis:** DEC-14; DEC-05.

**Review request must reference:** task and approved specification revision; immutable artifact-set identity; review agent/role; acceptance criteria; authorized evidence; allowed inspection scope.

**Finding record.** Identify the finding, review, exact artifact set, severity (BLOCKER, MAJOR, MINOR or EDITORIAL), problem, verifiable evidence, affected material, recommendation, disposition and supporting evidence.

| Technical outcome | Routing |
| --- | --- |
| `APPROVED` | Applies only to the requested scope and exact artifact set. An open BLOCKER makes approval invalid. An open MAJOR requires verified resolution or an explicit human waiver bound to the finding and version before downstream acceptance. A waiver retains the finding and remains subject to mandatory invariants. |
| `CHANGES_REQUIRED` | Hold positive review credit. Link in-scope correction to findings and request review or regression checks for the new version as applicable. Escalate out-of-scope corrections or exhausted limits to the human. |
| `INCONCLUSIVE` | Hold positive review credit. Reconcile the missing evidence or arrange a bounded authorized review of the applicable version. Escalate when safe continuation is unavailable. |

A CLI or process failure belongs to the operation lifecycle in CT-02/07. An internally inconsistent report is not accepted as approval and follows the inconclusive route pending clarification. Formal homologation is a separate human decision under CT-08.

- REV-01 The orchestrator verifies independence of the reviewer from drafting and implementing the material under review. A change of role label alone cannot establish independence. Roles may be assigned to either supported agent as applicable.
- REV-02 Review examines a pinned immutable version under enforced access constraints.
- REV-03 The reviewer does not authorize itself, expand scope, or homologate the result.
- REV-04 Findings remain linked to the exact reviewed version; corrections reference findings and produce a new version.
- REV-05 Regressions are checked where applicable and test evidence specifies the actual version.
- REV-06 Corrections outside approved scope stop for human decision.
- REV-07 Apply task-authorized limits sufficient to bound correction and review cycles. Exhaustion stops the cycle and routes it to a human decision.
- REV-08 Validate the exact expected review request and current artifact set under ST-05. A late or superseded review may be retained for its own version. It cannot satisfy a gate or provide approval for the current version. Review outcome and human homologation remain distinct.

## 9. CT-07 — Failure, effects and safe recovery

**Normative basis:** DEC-10–DEC-13.

**Effect protocol.** Under CT-03 exclusivity, durably record intent and recovery identity, admit the effect under current CT-01 authority, perform it, verify the result, and durably record the outcome or the unresolved effect. External effects and local records have separate failure boundaries. Arbitrary external effects have no assumed exactly-once guarantee.

| Effect classification | Required evidence and disposition |
| --- | --- |
| `VERIFIED_COMPLETED` | Evidence proves the intended effect in its bound context. Credit the effect once and do not repeat it. |
| `VERIFIED_NOT_EXECUTED` | Evidence proves the effect did not occur and that it cannot still occur from this attempt. An observed failed launch may support this only if the relevant effects and liveness are accounted for. |
| `KNOWN_DIFFERENT_EFFECT` | Evidence proves a different, incomplete or undesired effect. Record what actually happened and require an applicable decision for any corrective effect. |
| `UNCERTAIN` | Evidence is insufficient to establish what happened or what can still happen. Record the uncertainty and apply conflict blocks. |

Classify each material effect independently. A known partial result records the verified subset and the status of the remainder. Resolve an attempt as `VERIFIED` when its required result and effects are proved. Use `VERIFIED_NOT_EXECUTED` when the intended action is proved to have never taken effect and no material effect remains. Use `FAILED` for other confirmed failure with material effects accounted for. Use `UNCERTAIN` while evidence is insufficient to resolve the result, material effects or liveness. An observed process launch can coexist with verified non-execution of the intended external effect. For example, a process can fail while preparing a request that never reached the provider. Absence of a completion record, a timeout, an exit code or matching remote state alone cannot prove non-execution.

**Recovery steps.** Secure exclusive recovery authority where execution ownership is in doubt. Read authoritative intent and admissions, use pre-spawn correlation to inspect local execution and descendants, and reconcile worktrees, evidence and remote effects. Compare observations against the recorded effect identity and its verification conditions. Durably record proved facts, remaining uncertainty and conflict scope before admitting any safe next action. If material effects cannot be bounded, block every potentially affected action. A surviving local execution is handled by CT-03 regardless of remote state.

- REC-01 Never automatically repeat a potentially irreversible or uncertain effect.
- REC-02 No new attempt while a prior conflicting effect remains uncertain.
- REC-03 A verified prior success must not be re-executed; verified non-execution permits considering a new **authorized** attempt.
- REC-04 Uncertainty requiring material judgment escalates to the human.
- REC-05 A handoff identifies the last proven step, pending operations, effects and uncertainties, artifact and evidence references, applicable authority and next safe action. Before any resumption, the orchestrator verifies the handoff against current durable events, scope and authorization, artifact versions and observable effects. Executor possession of the handoff provides no admission.
- REC-06 Restart/crash does not clear live-process or effect uncertainty.
- REC-07 Reconciliation decisions append evidence rather than rewriting history.
- REC-08 Verify external effects with applicable service-specific observations, expected revisions and stable identifiers when available. After a lost push response, a remote ref may establish the current destination state while leaving the earlier attempt unresolved. Preserve uncertainty unless the available evidence proves the required fact. Assume idempotency only where the provider guarantees it for that operation and context.
- REC-09 A durable unresolved-effect record identifies the affected scope and resources, facts and unknowns, preserved evidence, responsible human or authorized recovery owner, required next decision or check, and conflict blocks. Enforce it across restarts, tasks and administrative closure until reconciled.
- REC-10 On failure or ambiguity of an authoritative write, fail closed. Do not credit the result, advance authority in memory, admit another effect, or release the affected slot. Stop further admissions and contain ongoing execution under recovery authority. A CLI success remains unverified until the durable state and observed effects are reconciled. Resume only after authoritative recording is restored and the applicable safety conditions are verified. An intent whose durability cannot be verified does not admit a new effect.
- REC-11 AI Memory is independent and optional for the main workflow. Unavailability affects only an operation with an explicit dependency on it. Hold or fail that operation under its authorized criteria. Independent orchestration, gates, evidence and recovery continue from local authoritative records. Messages remain untrusted supplementary inputs.

**Open for P3.** Process supervision, storage durability mechanism, provider-specific verification recipes, and how to automate the recovery steps that have provable preconditions.

## 10. CT-08 — Gates, authorized Git/GitHub effects and closure

**Normative basis:** DEC-02, DEC-06, DEC-09, DEC-14; v0.4 §10.

**Human gates.** Apply the initial, scope change, exception, recovery, final homologation and closure gates where required by the task and effect. Each decision identifies the human proof, project/task, exact revision, applicable artifact set, requested effect or outcome, evidence and conditions. Before deciding, the human can inspect what is verified and what remains pending. Record each applicable decision explicitly. One human interaction may record multiple decisions when the exact context and scope of each are presented and confirmed.

**Git/GitHub effect descriptor.** Identify operation kind, repository and destination, exact content or reviewed artifact set where applicable, source/destination refs, expected revisions, strategy, conditions and checks, authorization and verification plan. Scope Git inspections to the task. Require applicable delegation for staging, commits, branch/worktree creation and other local effects.

- GATE-01 Neither agent text, AI Memory message, exit code, nor reviewer approval passes a human gate.
- GATE-02 Existing authorization can cover multiple in-scope Git actions without per-command confirmation.
- GATE-03 Push, PR creation, checks and merge may be automated under unambiguous human authorization covering the operations, scope, destination, strategy, conditions and gates. Execute or mediate privileged effects through ISO-04.
- GATE-04 Force push, destructive actions, changed merge strategy or bypass protections require specific authorization.
- GATE-05 At effect admission, revalidate current authorization and the descriptor, including expected revisions and checks applicable to the actual content and destination. Require an enforcement mechanism that keeps those conditions valid at the effect. Stop on conflicts, failed checks, unexpected ref changes, ambiguous outcomes, or inability to guarantee a required precondition.
- GATE-06 Git control cannot be bypassed through an unrestricted shell, shared Git metadata, direct network credentials or alternate tools.
- GATE-07 Final homologation, rejection, administrative closure and cancellation remain distinct outcomes.
- GATE-08 Closure is a verified human-authorized outcome; cleanup is a separately audited effect, only after authorized closure and preservation of necessary evidence.
- GATE-09 `CLOSED` does not mean cleanup succeeded, and cleanup failure does not silently reopen the task.
- GATE-10 A closed task admits only its authorized reconciliation and cleanup under §4.2. New ordinary work requires a distinct authorized task lifecycle.
- GATE-11 Integration must use the exact authorized content and applicable review, excluding unrelated work and changes without applicable review. Verify the association with the artifact set and actual commits or content to be integrated. A source or destination name alone is insufficient.

**Final homologation.** Route the verified candidate through the human gate under §4.2. Verify the exact current artifact set, applicable acceptance evidence, effects that have been attempted and are material to the result, and all applicable review dispositions. An open BLOCKER, unmet required evidence, unresolved review or material uncertainty prevents positive homologation. If the candidate changes, require the applicable evidence and a new decision for the changed context. Execute any separately authorized final Git actions in the approved order and under their own conditions. A decision may be conditional on a specified final action. Verify that action against the condition before closing as homologated.

**Closure preconditions.** Apply §4.2 and verify cessation of all associated local execution and release of its reservations under EXE-10. Resolve or withdraw ordinary pending operations, and transfer any unresolved external effects under the administrative closure rule below. Record the applicable human decision, preserve required reports, artifact sets and evidence, and provide usable references to the human. Homologated closure requires the final homologation decision for the exact outcome and verification of any required completion effect. Rejection and cancellation preserve their distinct decisions and observed effects. To close a rejected or cancelled task with unresolved external effects, record an explicit administrative closure that preserves the rejection or cancellation decision.

**Administrative closure with external uncertainty.** Require the human to acknowledge the specific risk and authorize handling under a durable REC-09 obligation. Keep the evidence, responsibility and conflict blocks effective after closure. Reconciliation can continue under its applicable authority without resuming the task. Closure and authorization to handle risk confer no proof of the effect.

**Cleanup.** After authorized closure and preservation, verify resource identities, branch and worktree safety, current eligibility and separate authorization. Block destructive cleanup of resources that may still be needed for containment or reconciliation. With unresolved external effects, destructive cleanup of associated resources requires specific authorization and verification that equivalent necessary content and evidence, including commits when needed, remain retrievable in protected storage and that the pending obligation and blocks remain effective. If equivalence or safe disposal cannot be established, retain the resources. Admit cleanup separately under CT-03 and record its result without reopening the task.

## 11. Cross-contract invariants

| ID | Invariant | Contract(s) |
| --- | --- | --- |
| INV-01 | Human authorization precedes coordinated execution | 01, 08 |
| INV-02 | Authorization is bound to verifiably identified content | 01 |
| INV-03 | Agents cannot confer or enlarge authority | 01, 04, 08 |
| INV-04 | Orchestrator validates all authoritative transitions | 02 |
| INV-05 | One coordinated active execution across the installation, including effectful preparation and orchestrator actions | 03, 07 |
| INV-06 | Effective isolation is mandatory for dispatch | 03, 04 |
| INV-07 | Authoritative records remain outside the consumer repository and executor- or reviewer-writable areas | 01, 04 |
| INV-08 | Review uses a retrievable immutable version | 05, 06 |
| INV-09 | Corrections do not overwrite prior reviewed versions | 05, 06 |
| INV-10 | Test evidence pins the actual inputs and applicable execution context of the tested version | 05, 06 |
| INV-11 | Intent, observed execution and verified outcome are distinct | 02, 07 |
| INV-12 | No unsafe retry of uncertain effects and no new conflicting effect while uncertainty remains | 03, 07 |
| INV-13 | Recovery revalidates context, authorization and evidence | 07 |
| INV-14 | Human gates remain authoritative | 01, 08 |
| INV-15 | Git/GitHub effects respect authorized scope and conditions, and integration uses only the applicable reviewed content | 04, 08 |
| INV-16 | Closure and cleanup preserve evidence and distinct authorities, and unresolved-effect blocks survive closure | 05, 07, 08 |
| INV-17 | Project isolation prevents cross-project implicit selection | 01, 04 |
| INV-18 | Main V1 workflow is independent of AI Memory messaging and only explicitly dependent operations are affected by an outage | 01, 07 |

## 12. Acceptance-test matrix (minimum normative scenarios)

| ID | Scenario | Required observation |
| --- | --- | --- |
| A01 | Missing or agent-forged approval with a matching digest, including attempts to access the human approval surface | No forged decision or coordinated dispatch |
| A02 | Canonical specification changes or the displayed approval target differs from the effect context | Admission blocked until applicable authorization for exact content |
| A03 | Wrong-project or stale reference | Rejected without affecting live task |
| A04 | Duplicate command/result delivery | No duplicate effects or invalid state transition |
| A05 | Two instances read a free slot and race to prepare and dispatch | Only one instance can perform preparation with effects and admit execution |
| A06 | Crash before spawn or immediately after spawn, before a launch record | Recover durable intent and supervision correlation, inspect observed effects and account for local execution before release |
| A07 | Crash or cancellation with a surviving descendant after parent exit | Descendant remains under recovery, old owner is fenced, slot stays unavailable until safe release |
| A08 | Out-of-scope write through a link, child process, shared Git metadata or alternate path | Protected targets remain unchanged and protected credentials and control surfaces remain inaccessible |
| A09 | Reviewer attempts to write a pinned version and a test produces authorized scratch output | Pinned inputs remain unchanged and scratch output is isolated from source and control evidence |
| A10 | Test PASS uses older, generated, or otherwise different inputs from the published version | PASS is inapplicable unless actual inputs and relevant context match the published version and remain stable during use |
| A11 | Agent output says success; evidence absent | Not `VERIFIED` |
| A12 | Review returns CHANGES_REQUIRED | Finding-linked authorized correction and new version |
| A13 | Reviewer took part in drafting or implementation, review is inconclusive, CLI fails, or proposed approval contains an open BLOCKER | No positive review credit. Distinguish ineligible assignment, operational failure and review outcomes under CT-06/07 |
| A14 | Review says approved, no human homologation | Final gate remains pending |
| A15 | Remote accepts a push but the response is lost, or later observations are insufficient | Record only provable facts, preserve unresolved effects and prevent conflicting repeat |
| A16 | Unauthorized push, merge or force push through either the nominal interface or alternate credentials, tools or network paths | Remote effects are prevented and dedicated authorized capabilities remain usable |
| A17 | Restart with uncertain external effect | Explicit uncertainty; unsafe conflicting actions blocked |
| A18 | AI Memory unavailable with independent work and an explicitly dependent operation | Main path continues from local records, and only the dependent operation is held or failed |
| A19 | Cleanup requested before preservation/closure | Cleanup rejected |
| A20 | Cross-project task alternation, including a missing current namespace where IAS exists | Context, permissions and evidence remain isolated and the historical IAS namespace is never automatically selected |
| A21 | Revocation, replacement or expiry after effect preparation and before admission, then repeat with the admission occurring first | Invalidation first denies admission. Admission first blocks later admissions under invalidated authority and triggers containment and reconciliation |
| A22 | CLI reports success and the authoritative result write fails | No state advancement, successor admission or reservation release before reconciliation and durable recording |
| A23 | Late review and human approval for V1 arrive after V2 becomes current | Preserve relevant observations as V1 history and reject them for current advancement or gate satisfaction |
| A24 | Writer changes source during version capture | Reject the unverified capture, withhold publication and withhold evidence attribution |
| A25 | Administrative closure while a remote effect is uncertain, followed by cleanup and restart | Durable conflict block and reconciliation evidence survive closure and restart. Destructive cleanup is blocked while affected resources remain needed or safe disposal is unverified |
| A26 | Integration includes unrelated or unreviewed work, changes expected head/destination, or has stale checks | Prevent the mismatched effect before integration. An exact in-scope authorized integration remains eligible |
| A27 | Operation completes one of several effects before failing | Record the proved subset and uncertain or absent remainder. No repeat of the completed effect |
| A28 | Cancel before admission, prove non-execution after an admitted crash, and later reject a required gate | Record each disposition distinctly. No gated effect follows rejection, and retry after proved non-execution requires authorization and CT-07 checks |
| A29 | In-flight cancellation followed by attempted direct closure. Separately, offer a stale handoff for resumption of a suspended task | Reject direct running-to-close and contain and reconcile before closure. Resumption of suspended work requires orchestrator revalidation and valid authority |

Tests are future obligations, not executed evidence. Actual sandbox, CLI, remote-identity and crash tests must be demonstrated independently of unit-test mocks.

## 13. Proposed real-repository validation protocol (P1-DEC-03)

**Five small reversible tasks** across four validation scenarios, within the approved 3–5 range. Actual repository/task selection and execution require separate human delegation.

1. **VR-01:** one bounded implementation with independent review and final human gate. With separate applicable delegation, include a reversible push or PR on a disposable task branch and authorized post-closure cleanup. Collect authorization, exact version, invocation, review, relevant Git and cleanup evidence, and manual forwarding count.
2. **VR-02:** seeded/test-discoverable defect and review/correction cycle. Evidence: finding, before/after versions, regression evidence, bounded cycles.
3. **VR-03:** controlled interruption at a safe test boundary, restart and reconcile. Evidence: last proven step, uncertain-state handling, no duplicate effect.
4. **VR-04:** alternate between two small tasks, one in each of two consumer repositories with different task context. Verify baseline, worktree, permissions, artifacts and absence of context crossing.

Run synthetic fault injection and containment tests separately before the real tasks. Keep destructive and ambiguous-effect tests in controlled fixtures. Record human interventions, elapsed time, agent runtime and usage where available, and compare manual handoffs with the corresponding manual workflow. POC results provide historical context for the planned measurements.

## 14. Traceability to homologated directives

| Directive | Primary contract coverage |
| --- | --- |
| DEC-01 | All: local, proportionate design |
| DEC-02 | CT-01, CT-08 |
| DEC-03 | CT-01/02/03/07 (independent AI Memory, direct invocation, and isolated outages) |
| DEC-04 | CT-01/02/07 (optional complementary messaging and validated references) |
| DEC-05 | CT-05/06 |
| DEC-06 | CT-03/04/05/08 |
| DEC-07 | CT-05/08 |
| DEC-08 | CT-02/03 |
| DEC-09 | CT-01/02/08 |
| DEC-10 | CT-02/07 (structured history and evidence) |
| DEC-11 | CT-02/07 (reconstructible or reconcilable state) |
| DEC-12 | CT-03/07/08 (failures, effects, and containment) |
| DEC-13 | CT-05/07 (retained evidence and validated handoff) |
| DEC-14 | CT-05/06/08 |
| DEC-15 | CT-03 |
| DEC-16 | CT-01/04 |
| P1-DEC-01 | CT-03/07 and A05–A07 |
| P1-DEC-02 | §15.2, web UI cost evaluation and human decision |
| P1-DEC-03 | §13, five small real-repository tasks proposed for separate delegation |

## 15. Open items and downstream ownership

### 15.1 Independent regression before human homologation

| R1 open item | R2 contract and regression coverage |
| --- | --- |
| O-01 | §§3–5, 10 and A01/A02/A21 cover the human decision boundary and authority invalidation. |
| O-02 | §4 and A04/A23/A28/A29 cover lifecycles, cancellation, rejection and late results. |
| O-03 | §§4–5, 9 and A05–A07 cover exclusive admission, orphan recovery and safe release. |
| O-04 | §7 and A09/A10/A24 cover stable capture and test attribution. |
| O-05 | §§6, 10 and A08/A16/A26 cover the privilege boundary and controlled integration. |
| O-06 | §§9–10 and A17/A19/A25 cover uncertainty, administrative closure and cleanup blocks. |
| O-07 | §8 and A12–A14/A23 cover review outcome routing and applicability. |
| O-08 | §§4–5, 9 and A06/A22/A27 cover durable intent, write failure, partial effects and recovery. |

These are criteria for review and future acceptance. The [consolidated triage](../reviews/P2-V1-INDEPENDENT-REVIEWS-TRIAGE-R1.md) maps each original finding to its R2 disposition.

### 15.2 P3 — compare technical implementations

Compare local options for language/runtime, decision surface and authentication, canonicalization, storage and durability, process supervision and fencing, sandbox and credentials, executor adapters, artifact capture, and Git/GitHub enforcement. Demonstrate the human/executor authority boundary, process recovery including descendants, fail-closed storage behavior, isolation and mediation in WSL2/Ubuntu with the actual CLIs, reproducible artifact attribution, and remote effect preconditions and reconciliation. Assess CLI cancellation, output and token telemetry in the installed versions. V1 web UI inclusion remains open until the P3 technical and cost comparison and human decision. Any waiver of a contract invariant requires a separately approved change.

## 16. Formal review / approval status

**Status:** `READY FOR INDEPENDENT REGRESSION REVIEW`. The acceptance scenarios are future evidence obligations. Human homologation and authorization to begin P3 or implementation remain separate decisions.
