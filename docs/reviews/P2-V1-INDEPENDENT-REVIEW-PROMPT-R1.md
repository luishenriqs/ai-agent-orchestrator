# AI Agent Orchestrator — Independent Adversarial Review Prompt (P2-R1)

**Review type:** independent, adversarial, read-only technical and architectural review.  
**Candidate:** `P2-V1-OPERATIONAL-CONTRACTS-R1.md` (supply complete file to reviewer).  
**Normative source:** `docs/architecture/003-diretrizes-arquiteturais-v04.md` with formal approval in `docs/architecture/004-registro-homologacao-v04.md`, SHA-256 `6e6a8987f112d866c4f52cd2d16c60b33548a6542c5299b510036d4efedc409b`.  
**Human P1 decisions:** one active coordinated execution at a time; decide V1 web UI only after P3 cost evaluation; propose 3–5 small real-repository tasks.

## Reviewer mandate

Act as an independent critical reviewer. Evaluate the submitted P2-R1 **as written**, without designing a new system from scratch or treating technical preferences as mandatory requirements. Do not implement code, mutate files or Git, run executors, or issue approvals on behalf of the human owner.

Read the *complete* v0.4 and approval record, then the *complete* P2-R1 before issuing a verdict. State if any source was unavailable. The historical "candidate" wording in v0.4 is superseded as to approval status by the formal approval record; do not treat this as an unresolved architecture decision.

## Required checks

1. **Authority traceability:** map each material P2 rule to DEC-01–DEC-16 and the three human P1 decisions. Flag new material constraints, contradictions, or silently invented permissions.
2. **Formal state correctness:** identify unreachable states, invalid transitions, ambiguous statuses, terminal-state escapes, revocation/cancel paths, stale/duplicate events, and ambiguous final outcomes. Distinguish state of task, operation, attempt, reservation, gate and cleanup.
3. **Approval provenance:** can agent-supplied instructions, files, events or payloads bypass binding between human approval and exact content? Is the local approval mechanism sufficiently specified for P2 versus legitimately deferred to P3?
4. **Concurrency/restart:** challenge cross-instance one-active-execution, lock/fencing races, cancellation, orphan processes, crash between durable intent and dispatch, and unsafe reservation release.
5. **Isolation:** evaluate Git worktree shared metadata, symlinks, credential leakage, network, subprocesses, reviewer write access, temporary test outputs, and control-store integrity. Distinguish technical impossibility from implementation choice.
6. **Evidence binding:** can a review examine altered content? Do captures include enough reproducible context? Is PASS attributable to exact code and test environment? Are snapshots retrievable and immutable?
7. **Recovery/external effects:** examine write-ahead intent, remote Git result ambiguity, non-idempotent actions, uncertain state, safe resumption, and the distinction between a failed process and a known effect.
8. **Gates/Git/closure:** verify no fabricated prohibition of authorized push/PR/merge; check force push and destructive effects, final homologation, rejection, cleanup eligibility, and unresolved-effect closure.
9. **Proportionality:** identify overengineering and needless abstractions for a single-user local V1, but retain the minimum controls actually needed for safety and traceability.
10. **Acceptance and real validation:** do the test scenarios prove the claims rather than merely check declared configurations? Is the four-task proposal within P1 and meaningfully representative?

## Finding format (mandatory)

For every finding provide:

- Stable ID (`P2-REV-001` etc.) and severity: `BLOCKER`, `MAJOR`, `MINOR`, `EDITORIAL`.
- Precise section / invariant / transition and supporting quotation or concise reference.
- Concrete failure scenario or counterexample.
- Impact on correctness, integrity, safety, evidence or scope.
- Minimum corrective change; no architecture redesign unless unavoidable.
- Disposition: `P2 MUST FIX`, `P3 FEASIBILITY GATE`, or `OPTIONAL RECOMMENDATION`, with rationale.

Distinguish facts directly supported by approved documents, implications derived from the specification, and recommendations. Do not classify an open technology choice as a defect unless deferring it makes the contract impossible to evaluate or unsafe.

## Adversarial scenarios to explicitly analyze

- Two orchestrators read a free slot at the same time; one crashes after launching a descendant.
- Human revokes or revises permission after an attempt is prepared but before its effect.
- An agent modifies Git shared refs/credentials outside the worktree or writes through a symlink.
- A test writes to a source path while the supposedly immutable review version is being captured.
- A CLI reports success but the event write fails; a remote push succeeds but the network response is lost.
- A late review for version V1 arrives after correction produced V2.
- The task is closed administratively while a remote effect remains uncertain.
- AI Memory is offline, yet the core path should not depend on its message transport.

## Required final deliverable

1. Evidence and source sufficiency statement.
2. Short executive verdict: `APPROVE FOR HUMAN HOMOLOGATION`, `APPROVE WITH NON-BLOCKING RECOMMENDATIONS`, or `CHANGES REQUIRED`.
3. Findings table by severity with stable IDs, direct evidence, failure mode and minimal remediation.
4. Independent cross-contract consistency assessment of CT-01–CT-08.
5. Traceability/regression verdict against v0.4 and P1 decisions.
6. Explicit list of genuine P2 blockers versus acceptable P3 technology/feasibility choices.
7. Proposed minimum regression/acceptance checks after any edits.
8. Residual risks and recommendation for the human approval gate.

The reviewer supplies findings and recommendations only. The human owner retains final authority; an independent favorable review is **not** authorization to implement, commit, push or merge.
