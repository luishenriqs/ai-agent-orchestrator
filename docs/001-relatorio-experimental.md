# Experimental report on integration between AI Memory, Codex, and Antigravity

**Origin and authorship** — experimental consolidation and R1 documentation remediation by Codex, with input from the GPT and Antigravity reviews.

**Date and status** — 2026-11-19 edition, subject to regression review and formal human approval.

## 1. Executive summary

POCs 006 and 007 record complete cycles in synthetic Git repositories. In 006, Codex implemented a Python function, Antigravity issued a review, and Codex documented its response. In 007, a review identified four categories of whitespace defects in a deliberately defective version that still passed the public tests. The logs record four regression test failures before the correction, five passing tests afterward, and a favorable regression review.

POC-005 has available source code and a PASS reported in the experimental session. The chronology of POCs 001 through 004 was reconstructed from that session's account. The material supports planning agent coordination that preserves human authorization and evidence at each step. Architecture and technology remain open.

## 2. Motivation and original problem

Work between agents involves transferring context, invoking the appropriate executor, routing changes for review, and preserving the evidence needed for human decisions. A communication mechanism covers information exchange. Control over sequencing, the effects of each execution, and authorizations must be explicit for this workflow to be usable across projects.

**Human strategic decision** — focus future development on AI Agent Orchestrator in partnership with AI Memory. AI Orchestration Lab will be preserved as a historical reference, with no continued active development planned. Any migration of its artifacts or contracts and any decision to incorporate planned capabilities require separate deliberation.

## 3. Objective of multi-agent integration

The experimental objective was to investigate whether Codex and Antigravity can participate non-interactively in a coordinated workflow with requests and reviews correlated through AI Memory.

Independence from the domain rules of IAS, Jungle, and other repositories guides the future product. The coordination proposal, subject to deliberation, covers executor assignment, execution, validation, review, correction, and human approval gates.

## 4. Environment and tools

| Component | Available record |
| --- | --- |
| Ubuntu on WSL2 | Experimental environment reported in the task description. |
| AI Memory 3.4.7 | Version reported in the task description. The session history reports CLI use in POC-001 and MCP integration in subsequent communication steps. In POCs 005 through 007, the scripts consulted use the AI Memory CLI for inbox operations. |
| Codex CLI | The POC 006 and 007 logs identify version 0.170.0, model `gpt-6.2-sol`, `approval: never`, and `sandbox: workspace-write [workdir, /tmp, $TMPDIR]`. The scripts invoke Codex in non-interactive mode. |
| Antigravity CLI | POC-005 calls for invocation through the wrapper `ai-memory run --require-server --no-autowire --no-exit-prompt antigravity --mode plan --print`. POCs 006 and 007 directly invoke `agy --mode plan --print`. The exact version was unavailable from the sources consulted. |
| Python 3 | Language used by the dispatchers and runtime for the tests using `unittest`. The experimental patch version was not established. |
| Git | Used to create demonstration repositories and, in POCs 006 and 007, to keep the initial reference in the index. Inspection of both trees during this preparation confirms the absence of commits. |

Preparation consisted of reading the sources. No POC, experimental test, or executor session was started during consolidation.

## 5. Role of AI Memory

AI Memory, created by Fábio Akita, remains an independent product for persistent memory and communication. The scripts for POCs 005 through 007 point to the same inbox, `default/luishenriqs-identity-and-access-server`, associated with IAS. The records for POCs 006 and 007 confirm the use of this namespace as both source and destination, although the code files for those runs were in separate temporary Git repositories.

The proposed orchestrator may use this channel while keeping authorization and work status under its own control. A claim confirms the message's transition in the inbox. Completion of a step depends on the evidence and criteria for the authorized work.

## 6. Chronology of POCs 001 through 007

| Step | Chronological record | Basis and limitation |
| --- | --- | --- |
| POC-001 | Verify sending, listing, and claiming messages through the AI Memory CLI. | History reported in the experimental session. |
| POC-002 | Verify Antigravity's inbox lookup through MCP, including the initial permissions difficulty in non-interactive execution. | History reported in the experimental session. |
| POC-003 | Verify Antigravity's sending of a message using the MCP tool `memory_message_send`. | History reported in the experimental session. |
| POC-004 | Verify that Codex receives and reads the message sent by Antigravity. | History reported in the experimental session. |
| POC-005 | Invoke Antigravity based on a target message. | Script inspected. PASS and exit code `0` reported in the experimental session. |
| POC-006 | Implementation, review request, review, and response handling. | Script, manifest, logs, test, code, and text response available. |
| POC-007 | Defect injection, adversarial review, RED, correction, GREEN, and regression review. | Script, manifest, logs, injection record, tests, and final code available. |

### POCs 001 through 004 — Communication

The results of these steps were presented in the experimental session tracked by GPT. The reported sequence runs from verifying inbox operations through the CLI to Codex reading the message sent by Antigravity. The chronology for each POC is based on that account. The local collection examined lacks the primary records needed to verify these four runs independently.

### POC-005 — Automatic invocation

The Python dispatcher checks the IAS inbox identified in section 5 and looks for a pending message by the subject and body of the experimental request. It treats multiple matches as ambiguous, claims by ID, verifies the returned ID and state, and records the ID before invoking Antigravity. The code captures stdout, stderr, and the exit code, requires the expected text confirmation, and stops without retrying on failure.

According to the experimental session account, terminal output shown to the participants confirmed that Antigravity was invoked automatically from this inbox and returned exit code `0`. The local collection contains the script, and the original execution output remains unavailable for verification. The session is therefore the source of the PASS result.

### POC-006 — Implementation and review

Codex implemented `normalize_label` in a synthetic tree. The dispatcher sent and claimed the request through AI Memory and forwarded the specification, tests, and diff to Antigravity. The review approved the implementation. The dispatcher recorded the response in the inbox, claimed it by ID, and included the review in the context sent to Codex, which produced `demo/REVIEW_RESPONSE.md`.

The manifest records PASS. The logs record five passing tests before review and five at the end, both with exit code 0. The request and response have send and claim logs with exit code 0 and IDs matching the manifest. The review was textual and based on the supplied material. The tree check covered file paths and symbolic links without proving the immutability of each permitted file or checking effects outside the experimental directory.

### POC-007 — Adversarial review

1. Codex produced the initial implementation, and all three public tests passed.
2. The dispatcher replaced the contents of `labels.py` with a test version using `split(" ")` and recorded the prior and defective hashes. The three public tests continued to pass.
3. Antigravity's initial review was blind to the deliberate injection and hidden regression tests. The reviewer received the specification, source, diff, and public tests. In its `AJUSTES` review, it presented counterexamples for leading and trailing spaces, repeated spaces, tabs and newlines, and whitespace-only inputs.
4. RED recorded five tests, four failures, and exit code 1. The empty-string case passed at this stage.
5. Codex corrected the function using `split()` without an argument. GREEN recorded five passing regression tests, and the three public tests continued to pass, both with exit code 0.
6. Antigravity issued an `APROVADO` regression review after examining the versions and cases. The dispatcher recorded the review and claimed the response in the inbox under the Codex label. The workflow ends at that delivery. The artifact records no further Codex session after the final review.

The manifest records PASS and four correlated messages, making up two request and response cycles. All four IDs match the send and claim logs, all with exit code 0. The final source hash matches the corrected hash in the manifest. The manifest also records a local self-test for duplication, timeout, and absence of retries. The script shows that it uses an in-memory set and a separate test subprocess. This limits the evidence for actual concurrency and recovery after a crash.

### Message mediation in POCs 006 and 007

The same dispatcher ran `send` and `pop` by ID in a synchronous sequence via the CLI. In the six claim records, the intervals between `created_at` and `claimed_at` were approximately 19 to 22 ms. The agents received context from the dispatcher in CLI prompts. Inbox requests contained short summaries, and review prompts included the specification and, depending on the step, source code, diff, and tests.

The scripts limited review text sent to the inbox to the first 25,000 characters in POC-006 and the first 20,000 in POC-007. At steps where Codex handled the review, the dispatcher inserted the reviewer's output text in the prompt subject to the same limit. The truncation mentioned in finding R1-003 of the [independent review](reviews/001-revisao-independente-r1.md) corresponds to the rule in the scripts. The three recorded reviews stayed below the limits, and their full text appears in the inbox records.

## 7. Results actually demonstrated

- The artifacts for POCs 006 and 007 record that an external dispatcher could interleave Codex and Antigravity runs with send and claim operations through the AI Memory CLI in a synthetic workflow.
- POC-006 records Codex handling the review and two runs of the five-test suite with exit code 0.
- POC-007 records that a specification-based review detected defects missed by the public suite. The same five regression tests recorded four failures in RED and none in GREEN. The regression review confirmed the correction in the case studied.
- Automatic invocation by monitoring the inbox in POC-005 is supported by the script logic and the session account. Communication operations in POCs 001 through 004, including CLI and MCP use, remain reported results.

## 8. Evidence and limitations

**Direct verification** means that the file, its contents, or agreement between artifacts was checked during this preparation. A **reported result** attributes a claim to the experimental session, task description, or record produced by the executor or dispatcher. A **technical inference** is a conclusion drawn from the collection and limited to the cases and conditions it represents. A **hypothesis** is an explanation or expectation still subject to verification. A **future proposal** is a technical option still subject to deliberation and formal approval. An **established human decision** is a directive already set by the human owner, such as the strategic direction in section 2.

| Source consulted | Evidence used |
| --- | --- |
| Account of the experimental session tracked by GPT, supplied during documentation review | Individual history of POCs 001 through 004 and the report of automatic invocation and exit code `0` in POC-005. |
| Task description | Reported context and environment and human strategic direction. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_005.py` | Selection, claim, local record, invocation, and success condition. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_006.py` | Workflow between executors, stop criteria, synthetic repository boundaries, and artifact generation. |
| `/tmp/ias-ai-memory-poc-006-3nvadl13/` | `result.json`, agent, message, and test logs in `_poc_logs/`, `demo/labels.py`, public tests, `demo/REVIEW_RESPONSE.md`, and demo Git state. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_007.py` | Injection, tree verification, message routing, RED/GREEN criteria, and local self-test. |
| `/tmp/ias-ai-memory-poc-007-c5_hla_j/` | `result.json`, `_poc_logs/fault-injection.json`, agent logs, messages, reviews, and tests, `regression_tests.py`, source, public tests, and demo Git state. |

To identify the inspected manifests if they remain available, the SHA-256 of `result.json` for POC-006 is `9a3a37ce1dce4162aa1371e50653599aefb555531220ca9784494f29001374bd` and for POC-007 it is `4e6646242b523f1eed43f6c5f0734117c779dabfa908267bdbdbd020ef2aecf1`. References in `/tmp` are volatile. The original artifacts remain in their original locations.

POC-006 records `ias_touched: false` in the manifest. The record is a claim by the dispatcher. POC-007 explicitly records the lack of independent verification of this point. The synthetic tree checks do not provide an audit of effects on the historical IAS. The primary records for POCs 001 through 004 and the POC-005 execution result were also unavailable in the indicated collection.

For CLI sends in POCs 006 and 007, the output of `send` identifies the ID and the source and destination namespaces. The JSON obtained from `pop` records `"from_agent": "other"` and `"from_owner_user": null`. The `--agent` parameter of `pop` specifies the claimant label chosen by the dispatcher. These records support correlating messages by ID and leave the authenticated identity of the sender unverified.

## 9. Problems encountered and solutions applied

- **Message ambiguity and duplication.** POC-005 stops on multiple matches and records the claimed ID locally. POCs 006 and 007 verify the newly sent ID and the returned state. POC-007 also checks subject, body, and repetition within the run. An interruption between the claim and durable recording may require reconciliation.
- **Interpreting process failures.** The scripts handle exit codes and timeouts and stop the workflow on anticipated errors without automatic retry. In POCs 006 and 007, per-step logs preserve the observed output and codes. The local POC-007 self-test provides limited evidence about the mechanism, without a distributed failure test.
- **Insufficient coverage.** The literal-space splitting defect escaped the POC-007 public suite. A review with counterexamples and regression tests reduced this gap. The correction splits on runs of whitespace and ignores leading and trailing whitespace.
- **Scope and independence.** POCs 006 and 007 used synthetic repositories and textual reviews. POC-007 added hashes for protected files and checked that the source remained unchanged during reviews. The evidence covers the observed tree and files.

## 10. Resulting conceptual architecture

The candidate workflow starts with human authorization for a task. The orchestrator binds the scope, repository, and working reference, invokes an executor, and collects the results and validation evidence. A review request may travel through AI Memory with a reference to the task and the version under examination. The orchestrator receives the review, prepares a correction and a new review where applicable, and presents the evidence for a human decision.

The inference from the experiments is that communication, execution, and verification can be coordinated by an external layer. The persistence mechanism, transport, execution isolation, and operating model for each gate remain open.

## 11. Proposed responsibilities

| Actor | Candidate responsibility |
| --- | --- |
| AI Memory | Persistent memory, context, and communication between agents, including requests and reviews that can be correlated. |
| Orchestrator | Control sequence, processes, states, authorized limits, links between versions and evidence, failure handling, and routing to approval gates. |
| Executors and reviewers | Implement, test, or review as assigned and permitted. Record the result, evidence, and limitations. The reviewer examines the specified version and explains the reasoning for the review. |
| Human owner | Approve scope and changes, resolve exceptions, formally approve decisions, and authorize integration. Agent messages serve as technical input. |

## 12. Unresolved technical risks

- Failures and concurrency between claim, persistence, process start, and recording output can leave a task or message in an uncertain state.
- Child processes, time limits, cancellation, and recovery of partial execution need investigation in the target environment.
- Messages and reviews may contain improper instructions or manipulated references. Authorization and agent identity require verification independent of the content received.
- Workspace selection and subsequent tree checks alone do not guarantee containment of access to other projects, configuration, credentials, or the network.
- In POC-007, the writable area `/tmp` included the parent directory of `demo/`, containing `regression_tests.py`, `_poc_logs/`, and `result.json`. These artifacts were outside the tree checked by `guard_tree`. The correction logs do not show Codex accessing `regression_tests.py`. The recorded configuration allowed writes to that location.
- Free-text reviews can be ambiguous. The scripts use simple text patterns for some criteria, subject to format negotiation and validation.
- Retention in `/tmp`, data exposure in logs, and divergence between the tested and reviewed source affect traceability. The POCs cover a small function and controlled runs, with generalization and scale yet to be evaluated.

## 13. Candidate requirements for planning

1. Bind each execution to a task ID, authorized project, reference version, scope, role, and verifiable human authorization.
2. Record state transitions and message IDs with process, test, review, and human decision evidence linked to the version evaluated.
3. Validate message source, destination, type, and correlation before using it as context. Preserve the distinction between claim and completion.
4. Provide execution isolation, a file budget, and permissions proportionate to the role. Bound Git changes and external access according to authorization.
5. Define semantics for duplication, concurrency, timeout, cancellation, recovery, and manual reconciliation, with verifiable effects.
6. Bind review to the exact content, preserve independence, and require counterexamples for reproducible findings where applicable.
7. Retain sufficient evidence for audit with access control, defined retention, and minimization of sensitive data.
8. Submit scope changes, formal approval, and integration to the applicable human approval gate.

## 14. Open architectural questions

- Which component holds the execution state, and how does it reconcile discrepancies with inbox states and IDs?
- Which operations will use CLI, MCP, or another supported contract, and what will the versioned message format be?
- Where will the agents run, and how will read, write, subprocess, and network limits be verified?
- What model for concurrency, execution ownership, and recovery covers failures between claim and invocation?
- Which artifact identifies the version under analysis, especially before a commit, and how will the review link that version to test results?
- How will identities, human approvals, retention, and access to evidence be recorded across projects?
- What are the minimum criteria for adopting the solution in a real repository, and which integration operations will require specific authorization?

## 15. Recommendations for the next phase

Start technical planning with human approval of a small, verifiable scope. Prioritize modeling states, the link between version and evidence, the authorization boundary, and failure scenarios between claim and process start. Compare AI Memory integration and isolation options against these requirements. Define measurable criteria for duplication, timeout, recovery, and containment before requesting authorization for new experiments or implementation.

The recommendation is to preserve the available essential artifacts from POCs 005 through 007 in persistent storage. The path `evidence/pocs/` is a candidate structure, subject to approval as a storage contract. The collection should include execution logs and exit codes, manifests, reviews, versions of the evaluated code, tests, and RED/GREEN results where applicable. Record the origin, execution, and version associated with each artifact and verify integrity using SHA-256 hashes. Define access and retention and minimize sensitive data in shared copies, recording the redactions and their relationship to the restricted originals.

Authorization for this step covers local documentation preparation. Architecture, stack, implementation, and Git integration require separate deliberation.
