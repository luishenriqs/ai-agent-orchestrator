# AI Agent Orchestrator architectural directives

## 1. Identification and purpose

- **Document version** — 0.3, 2026-11-20.
- **Status** — consolidation of the directives approved by the human owner. Formal approval of the document is pending.
- **Author** — Codex, based on the directives communicated by the human owner.
- **Reference** — experimental foundation published on `main`, commit `eeb3f53a755d7c8b55a6fa606ed3c4ec89d79f91`.
- **Purpose** — guide technical planning and make its boundaries explicit. The workflows described are conceptual, and implementation of the orchestrator has yet to begin.

## 2. Context and motivation

The experimental foundation investigated how to reduce the manual work of forwarding tasks, results, and reviews between agents. POCs 006 and 007 recorded that a local dispatcher was able to coordinate Codex and Antigravity sequentially in synthetic repositories. The human directive is to focus further development on AI Agent Orchestrator, in partnership with AI Memory, and to preserve AI Orchestration Lab as a historical reference.

The orchestrator should be as simple as possible and as robust as necessary to automate the sequential workflow under study safely and traceably. Additional complexity is justified when it addresses a concrete risk or meets an approved requirement.

## 3. Sources and evidence hierarchy

- The human delegation for this consolidation is the source of decisions DEC-01 through DEC-16. Authority to execute a task comes from the applicable human authorization.
- The human decisions made after the audit guide the changes in version 0.3. The audit is an independent review, and the finding triage records how its findings were handled. [Full audit R1](../reviews/005-auditoria-integral-independente-r1.md) · [Audit finding triage](../reviews/006-triagem-auditoria-integral-r1.md)
- Primary artifacts support claims about the observed execution. The report distinguishes direct verification, reported results, and inferences. The documentation reviews assess the report's fidelity to its sources. [Experimental report](../001-relatorio-experimental.md) · [Experimental review R1](../reviews/001-revisao-independente-r1.md) · [Experimental review R2](../reviews/002-revisao-regressiva-r2.md)
- The README provides project context, the handoff brings together the information needed for continuity, and the manifest records the collection and its gaps. These documents preserve the state observed in the experimental foundation on 2026-11-19. [README](../../README.md) · [Experimental handoff](../handoffs/001-handoff-fundacao-experimental.md) · [Manifest](../../evidence/pocs/MANIFEST.md)
- An inference is limited by the observed conditions. A recommendation guides future evaluation. An open question requires a later decision, even when a plausible option already exists.

## 4. Consolidated human decisions

| ID | Approved directive |
| --- | --- |
| DEC-01 | Start with a local tool that is simple to design, implement, maintain, and operate and is geared toward the actual AI-assisted development workflow. Avoid premature abstractions, distributed infrastructure, and speculative features. Maintain minimum controls for integrity, security, authorization, and traceability. |
| DEC-02 | ChatGPT assists the human owner with planning, analysis of deliverables, and approval gates. The human defines the task and prepares the initial prompt with ChatGPT, then manually delivers the authorized, self-contained prompt to Codex, Antigravity, or another designated executor. The prompt identifies scope, baseline, sources, responsibilities, limits, and completion criteria. The first executor registers the task with the orchestrator before starting the coordinated workflow. Results may be returned to ChatGPT manually through a report and references. The first version has no mandatory automatic integration with the ChatGPT interface or API. |
| DEC-03 | AI Memory remains independent and assists with communication and persistent memory. The orchestrator coordinates work and verifies context and authorization before acting. Individual messages are insufficient to authorize execution. The reliability of asynchronous transport in production remains to be demonstrated. |
| DEC-04 | Favor small, structured messages that identify the requested action and reference local artifacts associated with the task. The full technical content remains in the documents. Final fields, payloads, and protocols will be determined during planning. |
| DEC-05 | Give documents used in coordination a verifiable identity and keep the versions used in review immutable. Each review identifies the exact version examined. Hashes can prove content identity and integrity. Logical identification, storage, and physical versioning will be determined during planning. |
| DEC-06 | Allow a temporary workspace at the consumer project's root, segregated by task, for instructions, intermediate documents, reviews, and execution artifacts. Prevent transient files from accidentally entering the consumer's version control, separate working artifacts from the orchestrator's control and evaluation records, and limit executor access to the authorized scope. Apply simple isolation proportionate to the risk. Clean up only after authorized closure and preservation of the required records. Records needed for recovery and audit must have a durable destination outside the temporary workspace. Naming, internal structure, retention, and the isolation mechanism remain to be defined. |
| DEC-07 | Promote relevant artifacts to persistent project locations using the concepts of handoffs, reviews, evidence, and technical documentation. Preserve the association between tasks, versions, results, and evidence. Inclusion in Git is selective. |
| DEC-08 | Favor sequential execution in the first version and avoid concurrency within the same task. After a step yields a result, the executor may request the next operation, and the orchestrator verifies the transition before invoking another executor. The workflow continues until authorized completion or a human approval gate. A single active execution in the orchestrator is an initial option to consider, subject to planning. |
| DEC-09 | Centralize operational state, sequencing, executor assignment, transition validation, scope enforcement, and routing to gates in the orchestrator. Agents may request actions and deliver results. The orchestrator verifies the authorization of the registered task before permitting transitions. Scope expansion and passage through gates require the applicable authorization. |
| DEC-10 | Maintain a structured history for each task. Actors report operations and results, and the orchestrator centralizes and validates transitions. The history identifies the last step known to be complete and operations whose completion is uncertain. Operational control relies on structured records. Free text may supplement these records. |
| DEC-11 | Preserve enough state to analyze and recover from interruptions. Adopt an authoritative event history and a current state that can be reconstructed or reconciled. Local files are an option to evaluate alongside other simple solutions. Distributed databases, messaging, and infrastructure fall outside the decisions at this stage. |
| DEC-12 | Make process failures, unexpected restarts, token limits, and context interruptions identifiable. During recovery, consult events, artifacts, and verified effects. The absence of a completion record is insufficient grounds to repeat a potentially irreversible operation. In the event of material uncertainty, stop and escalate to the human. Automatic recovery may be limited. |
| DEC-13 | Preserve continuity between sessions through a handoff containing verified state, artifacts, evidence, and the next step. It must be possible to validate resumption from persisted records, even if the preceding conversation context is unavailable. |
| DEC-14 | Preserve independence among drafting, implementation, and review. Codex and Antigravity may assume distinct roles as assigned. The review must identify the version analyzed and present verifiable findings. Link corrections to their findings and check for regressions where applicable. Formal approval rests with the human. |
| DEC-15 | Allow future integration of executors through controlled extensibility. Plan initially for Codex and Antigravity, both exercised in the POCs, and avoid a premature generic framework. |
| DEC-16 | Keep the orchestrator independent of consumer projects and their domain rules. Bind each integration to the context, repository, and authorizations of the task. The IAS namespace appears as a historical record of the POCs and is excluded from automatic selection. |

## 5. Responsibilities

| Actor | Conceptual responsibility |
| --- | --- |
| Human owner | Authorize scope, decide on gates and exceptions, formally approve deliverables, and authorize effects requiring a separate decision. |
| ChatGPT | Assist the human with prompt preparation, analysis of results, and decision-making. Receive the report and references forwarded manually when useful. |
| AI Memory | Assist with communication and persistent memory as an independent product. |
| Orchestrator | Verify context and authorization, assign executors, validate transitions, maintain operational state, and refer decisions to the human. |
| Executors and reviewers | Work within the assigned role and scope, produce verifiable results, and request the next operation. The reviewer examines the identified version independently of drafting and implementation. |

## 6. Conceptual operational workflow

1. The human and ChatGPT define the task and prepare the initial prompt. The human manually delivers the authorized prompt to the first designated executor, who registers the task with the orchestrator before starting the coordinated workflow. Before releasing the first coordinated action or transition, the orchestrator validates the task, scope, repository, baseline, executor, limits, and criteria against verifiable human authorization. Executor requests and AI Memory messages are inputs to this process. A standalone manual action remains outside the coordinated workflow until it passes this gate.
2. The executor works within scope and delivers the result, artifact versions, and evidence. The executor may request the next operation.
3. The orchestrator verifies that the version matches the evidence and checks the scope and transition requirements. It records the result and invokes the next step only when the transition is authorized.
4. When review is required, the independent reviewer examines the pinned version. If corrections are made, the workflow links the findings to the new version and routes it to the relevant regression check.
5. At the gate, the workflow waits for the human decision. When the task is closed with authorization, the workflow preserves the necessary records and forwards the report and references.

Sequential coordination determines the order of the steps. An asynchronous invocation or wait can occur without concurrent work on the same task. The choice of waiting mechanism and the number of supported active executions remain open.

Markdown headings or structured metadata can record the declared origin of instructions and requests. A field such as `origin: human` records a claim of origin. Proving authorization requires a verifiable source or procedure independent of the declaration produced by the executor. The specific mechanism will be defined during planning, with complexity proportionate to local use.

## 7. Short messages and referenced artifacts

The message identifies the action being requested and makes it possible to locate the relevant task and artifact. The orchestrator treats incoming messages as untrusted inputs. Local documents retain the full context. Before using the reference, the orchestrator verifies that it belongs to the authorized project and task, that the version matches the requested one, and that access is within the executor's authorization. The orchestrator also checks that the request matches the active step. Missing, mismatched, or out-of-scope references, as well as duplicate or out-of-order requests, do not by themselves authorize a transition. How these cases are detected and reconciled will be determined during planning.

These elements describe what communication must make verifiable. Planning will determine how references are represented, which message fields are used, and how transport is implemented and versioned.

## 8. Versioning and immutability

Each version used in review remains immutable for as long as it is retained. It must be retrievable for the applicable retention period. A correction creates a new version, preserves the link to the reviewed version, and makes it possible to distinguish which results still apply. A hash can verify that content matches, provided it is linked to the artifact and expected version. Authorization and provenance require their own verification. The means of pinning the version and storing its contents remain open.

## 9. Events, state, and recovery

The structured history must make it possible to associate the operation, responsible actor, result, and evidence with the task and to identify the last completed step and any operations whose completion is uncertain. The orchestrator validates the transition before recording it as complete and preserves the distinction among a requested operation, an observed execution, and a verified result. An inbox claim proves the message transition, and completion of the step depends on its own evidence. Operational control uses structured records, supplemented by free text. It must be possible to reconstruct or reconcile the current state from the authoritative event history and evidence.

When the history and observed effects diverge, recovery checks the available evidence and escalates to the human any uncertainty that prevents a safe next action. Record format, storage, and the reconciliation mechanism remain open.

## 10. Authorization and formal approval gates

The initial gate defines the task, scope, and executor. Scope changes, advancement that requires a human decision, and formal approval depend on the corresponding authorization. The orchestrator enforces the gate and presents the human owner with what is verified and what remains pending. AI Memory messages, reviews, and exit codes are inputs to verification. The human owner decides on formal approval and on effects that require their own authorization.

### Git and GitHub operations

Agents and the orchestrator can perform Git and GitHub operations when needed for development or integration. Operational authorization defines each operation, its scope, destination, strategy, and gate. The technical contract remains pending.

- Read-only Git inspections may take place within the authorized scope. Branch creation, staging, and local commits must be covered by the delegation.
- Pushes, PR creation, checks, merges, and other integration operations may be automated after unambiguous human authorization covering the operations and their conditions. Authorization already granted does not require reconfirmation for each command within those limits.
- Force pushes, destructive operations, changes to the merge strategy, and bypassing protections require specific authorization. In the event of conflicts, failed checks, or unexpected changes, stop the affected operation. Integration must exclude unrelated work and changes that have yet to pass the applicable review.

## 11. Interruptions and handoffs

Process failures, unexpected restarts, and context interruptions, including those caused by token limits, leave execution subject to verification. The handoff records what was verified, what remains uncertain, where to find the versions and evidence, and the next appropriate step. On resumption, the orchestrator revalidates context and scope and reconciles state against the history, artifacts, and observable effects. The executor may check the handoff and may proceed only after the orchestrator validates resumption. Potentially irreversible operations remain suspended if their prior effect cannot be determined safely. In the event of material uncertainty, the orchestrator stops the workflow and requests human intervention.

## 12. Persistence, promotion, and cleanup

A workspace at the root of the consumer project may hold transient artifacts segregated by task. The history needed for recovery and the evidence needed for continuity must have a durable destination outside the temporary workspace. Before cleanup, closure must be authorized and the relevant records must have been promoted to persistent destinations. Promotion preserves the link among the task, version, review, result, and evidence. Handoffs, reviews, evidence, and technical documentation each serve distinct purposes. Specific destinations, retention policy, and criteria for inclusion in Git will be determined during planning.

A local Git exclusion and separation of permissions consistent with the scope are candidate solutions, subject to the technology selected. Planning must seek the simplest mechanism that prevents accidental inclusion in version control and protects control and evaluation records.

## 13. Invariants

- **Preserve** verifiable authorization, association with the project and baseline, executor scope, review independence, version identity, and the association among event, result, and evidence.
- **Prevent** out-of-scope writes or execution, passage through a gate without authorization, silent replacement of a reviewed version, automatic reuse of another project's namespace, unsafe repetition when the previous effect is uncertain, control based solely on free text, and use of the temporary workspace as the only durable destination.
- **Keep** AI Memory independent and domain rules within consumer projects. The orchestrator must use only the context authorized for the task.

## 14. What the POCs demonstrate and where the evidence ends

- **Reported result** — POCs 001–004 have a history of communication via CLI or MCP but lack local primary records. For POC-005, the script is preserved. The invocation of Antigravity and exit code `0` were reported in the session, whose original output is unavailable.
- **Result demonstrated in the synthetic environment** — in POCs 006–007, the external dispatcher interleaved Codex and Antigravity processes with synchronous `send` and `pop` calls. Technical context was conveyed primarily through CLI prompts. Reviews stayed below the scripts' limits. POC-006 recorded a review and a response from Codex. POC-007 recorded defect detection, RED, correction, GREEN, and a regression review. The initial review received the diff, while the injection and regression tests were withheld.
- **Limits of validity** — the experiments covered one Python function and synthetic Git trees. Correlation uses message IDs in send and claim records and in manifests. The inbox associated with IAS was shared. The fields `from_agent: "other"` and `from_owner_user: null` and the `--agent` claim label leave the authenticated identity of the sender unverified. Write access to `/tmp` extended to artifacts outside the tree verified in POC-007. The timeout and duplicate self-test was local in scope. The evidence leaves open reliable asynchronous delivery, recovery after an actual failure, concurrency, generalization, implemented human approval gates, simultaneous support for multiple projects, and effects outside the demo, including on IAS.
- **Technical inference** — sequential local coordination is a plausible basis for planning the first version. Safe automation of gates and recovery still depends on a verifiable design. [Sections 6–12 of the experimental report](../001-relatorio-experimental.md)

## 15. Questions for technical planning

| Topic | Pending decisions |
| --- | --- |
| Implementation and interface | Language, framework, database or other persistence, API and CLI contracts, and whether to include a web interface in V1 after assessing the cost. |
| Messages and authorization | Transport per operation, fields and formats, protocol versioning, authentication, proof of initial authorization, and reference validation. |
| Events and state | Event format, state names, storage, and specific criteria for transitions and reconciliation. |
| Execution and failures | Subprocess strategy, sandbox, timeouts, resource limits, automatic retry, handling of external effects, limits on active executions, and minimum conditions for integrating executors. |
| Artifacts | Logical identification, physical versioning, directory structure, isolation of the temporary workspace, retention, access, promotion, and cleanup. |
| Git/GitHub integration | Operation contract, authorization verification, destinations, strategies, and stop conditions. |

**Recommendation for planning** — evaluate the least complex local options first and require justification tied to a risk or approved requirement before expanding the solution.

**Recommended proposal for V1** — evaluate a minimal local web interface during planning. If the additional cost is low or moderate and inclusion is approved, implement it in V1 after validating the operational core via CLI. The candidate scope is to display projects, tasks, execution state, the active executor, event history, errors, and interruptions, with access to relevant reports and evidence. A visual workflow editor, integrated chat, advanced dashboards, complex permission management, and commercial or multiuser features are outside this minimal proposal. The exploratory estimate is approximately **25–50 additional hours**. It serves as a reference for evaluation. Budget and requirements depend on approval. Planning must validate the actual cost before recommending inclusion to the human owner.

## 16. Sufficiency criteria for the future minimal architecture

Planning must demonstrate how the minimal solution:

1. Receives an authorized task, isolates the consumer project's context, and coordinates Codex and Antigravity sequentially with verifiable transitions.
2. Exchanges short references with AI Memory as an independent supporting product, verifies human authorization through a source of its own, and pins the version of each artifact. Keeps review independent of drafting and implementation and links findings, corrections, and regression checks where applicable.
3. Preserves structured history and allows recovery of the last verified step after an interruption, escalating uncertain effects to the human owner.
4. Respects the gates, preserves records before cleanup, and enables continuity between sessions without relying on conversation history as the sole source.
5. Keeps local operation simple for Codex and Antigravity, allows additional executors to be integrated later, and justifies additional mechanisms by concrete risks or approved requirements.

These criteria guide evaluation of the future plan. Formal approval of this document remains at the human approval gate.
