# AI Agent Orchestrator experimental foundation handoff

## 1. Identification

- **Project** — AI Agent Orchestrator.
- **Reference date** — 2026-11-19, in the America/Sao_Paulo time zone.
- **Repository** — `$HOME/projects/ai-agent-orchestrator`.
- **Git** — local `main` branch, with no initial commit, remotes, or index entries. Documents and evidence are in the working tree as untracked files.
- **Experimental phase** — POCs 001–007 documented. The local collection preserves the available selected evidence from POCs 005–007.
- **Current gate** — preservation and this handoff were authorized. The documentation awaits formal human approval. Technical planning, implementation, and Git integration operations require separate authorization.

## 2. Origin and motivation

The investigation began in a discussion of the features of AI Memory, presented by Fábio Akita. The product's communication and persistent memory could reduce manual transfer of requests, context, and reviews between agents. The POCs investigated message delivery first, then non-interactive invocation, and finally the sequencing of execution, review, and validation.

## 3. Strategic objective

Build an independent application that can be reused across projects such as IAS and Jungle. The application would work with AI Memory to route requests and reviews and coordinate authorized tasks, with results and evidence linked to the work. The application must preserve human authority over scope, steps, and integration.

## 4. History of POCs 001–007

The results of POCs 001–004 and the POC-005 run come from the account of the experimental session tracked by GPT. Primary local evidence exists for the POC-005 code and the execution artifacts from POCs 006–007. The inventory records provenance and gaps. [Evidence manifest](../../evidence/pocs/MANIFEST.md)

| POC | Objective and mechanism | Result and lessons learned | Evidence and limits |
| --- | --- | --- | --- |
| 001 | Verify sending, listing, and individual claiming through the AI Memory CLI. | The session reported basic inbox operations. The message ID served as the reference for the individual claim. | History in the experimental report. Primary execution records are unavailable in the local collection. |
| 002 | Check the inbox from Antigravity through MCP in non-interactive execution. | The session reported the lookup and an initial permissions difficulty. Compatibility of access depends on the effective permissions of the run. | History in the experimental report. Logs are missing for checking configuration or reproducing the sequence. |
| 003 | Send a message from Antigravity using the MCP tool `memory_message_send`. | The send was reported in the session. It is a precedent for direct agent communication via MCP. | History in the experimental report, with no primary send log. |
| 004 | Have Codex receive and read the message sent by Antigravity. | The session reported receipt and reading via MCP, complementing the POC-003 send. | History in the experimental report, with no original output to verify the read or identity. |
| 005 | Invoke Antigravity after detecting a target message. The script checks the inbox via CLI, validates the response to the claim by ID, records the ID, and invokes the `ai-memory run` wrapper. | The session reported automatic invocation and exit code `0`. The script shows the planned sequence, stopping on ambiguity and with no automatic retry. | [POC-005 script](../../evidence/pocs/005/poc_ai_memory_005.py). The original output, execution manifest, and claim state are unavailable in the local collection. |
| 006 | Sequence implementation, review, and review handling. Codex implemented `normalize_label`, the dispatcher used the inbox through the CLI and passed context to Antigravity and the review to Codex. | The manifest records PASS. There was one request and one response, an `APROVADO` review, and a record of the Codex response. Five tests passed before and five afterward. The case demonstrates coordination between separate processes in a synthetic tree, with code that already passed the tests before review. | [POC-006 manifest](../../evidence/pocs/006/result.json) and [Codex response](../../evidence/pocs/006/demo/REVIEW_RESPONSE.md). The review was textual, and the tree check did not verify the immutability of each permitted file. |
| 007 | Verify detection and correction of a controlled defect. After initial implementation, the dispatcher injected `split(" ")`. Antigravity received the specification, source, diff, and public tests, with no notice of the injection and no regression tests in the first review. | The manifest records PASS. All three public tests passed even with the defect. The `AJUSTES` review identified four classes of failure. In RED, four of the five tests failed with exit code `1`. After Codex corrected the implementation to use `split()`, all five regression tests and all three public tests passed with exit code `0`. The regression review was `APROVADO`. Four messages formed two request and response cycles. The workflow showed the value of counterexamples and tests independent of the public suite. | [POC-007 manifest](../../evidence/pocs/007/result.json), [injection record](../../evidence/pocs/007/_poc_logs/fault-injection.json), [RED](../../evidence/pocs/007/_poc_logs/tests-red.stderr.txt), and [GREEN](../../evidence/pocs/007/_poc_logs/tests-green.stderr.txt). The record ends when the dispatcher claims the final response. The initial implementation and the defective version survive in embedded records, and the corrected code is available as a file. |

## 5. Conceptual architecture

| Actor | Conceptual responsibility |
| --- | --- |
| AI Memory | Provide context, persistent memory, and communication between agents. |
| AI Agent Orchestrator | Coordinate tasks, processes, states, approval gates, and evidence collection, binding review to the version evaluated. |
| Codex and Antigravity | Execute or review according to the assignment and authorized limits. In the experiment, Codex implemented and corrected, and Antigravity reviewed. |
| Human owner | Decide on scope, authorizations, exceptions, and formal approval. |

The final technical architecture is pending approval. Persistence, transport, execution environment, and representation of gates remain open.

## 6. Established human decisions

- Develop AI Agent Orchestrator as an independent application that can be reused across projects and complements AI Memory.
- Preserve human authority over scope, execution, decisions, and formal approval.
- Focus future development on AI Agent Orchestrator in partnership with AI Memory. Preserve AI Orchestration Lab as a historical reference, with no continued active development planned.
- Require specific authorization to delete, modify, or automatically migrate the Lab's artifacts and contracts. Historical preservation neither authorizes these actions nor proves equivalence between the projects.

## 7. Documentation status

| Document | Status |
| --- | --- |
| [README.md](../../README.md) | Initially drafted by Codex and remediated in R1. Introduces the project and the strategic decision. |
| [Experimental report](../001-relatorio-experimental.md) | Drafted by Codex and remediated using findings from GPT and Antigravity. Distinguishes observations, reports, inferences, proposals, and decisions. |
| [Independent review R1](../reviews/001-revisao-independente-r1.md) | Original Antigravity review. Classified six findings and concluded `AJUSTES NECESSÁRIOS` (adjustments required). |
| [Regression review R2](../reviews/002-revisao-regressiva-r2.md) | Review completed on 2026-11-19. Checked the 12 findings and issued `SUFICIENTE — APTO PARA HOMOLOGAÇÃO HUMANA` (sufficient — ready for formal human approval). |
| [Evidence manifest](../../evidence/pocs/MANIFEST.md) | Created in this step. Catalogs each new file in directories 005, 006, and 007, with provenance, hashes, redactions, and gaps. |
| [Experimental foundation handoff](001-handoff-fundacao-experimental.md) | This document, created in this step to allow a new instance to resume the work. |

The current authorization established the local collection that earlier documents still describe as a proposal. The final structure and retention and access policy remain subject to deliberation. Formal human approval of the initial documentation remains pending.

## 8. Technical results and limitations

- **Transport and invocation** — POCs 001–004 record CLI and MCP use in the session account. In POC-005, the script uses `ai-memory run --require-server --no-autowire --no-exit-prompt antigravity --mode plan --print`. In POCs 006–007, the dispatcher called `agy --mode plan --print` directly and invoked Codex in non-interactive mode. The agents received technical context through CLI prompts. Inbox requests contained summaries.
- **Namespace and identity** — all three scripts point to `default/luishenriqs-identity-and-access-server`. The logs from POCs 006–007 confirm its use as both source and destination, with `from_agent: "other"` and `from_owner_user: null`. The `--agent` parameter of `pop` is the claimant label selected by the dispatcher. The authenticated identity of the sender remains unverified.
- **Mediation and payload** — the same dispatcher executed `send` followed by `pop` by ID. In the six records, creation and claim were approximately 19–22 ms apart. The scripts limited reviews to 25,000 characters in POC-006 and 20,000 in POC-007. All three observed reviews arrived in full. A claim records an inbox transition, and completion depends on the evidence for the step.
- **Review and validation** — POC-006 included a textual review in a separate process and handling of the review. In POC-007, records link adversarial review, RED, correction, GREEN, and experimental regression review. The experimental regression review is distinct from documentation review R2.
- **Isolation** — the 006–007 code repositories were temporary and had no commits. IAS data as an AI Memory project were shared through the inbox. The Codex v0.170.0 headers record `approval: never` and `workspace-write [workdir, /tmp, $TMPDIR]`. In POC-007, `/tmp` allowed writes in the parent directory of the tree checked by `guard_tree`. The regression test, logs, and manifest were outside that check. Auditing effects outside the demo remained beyond the scope of the experimental records.
- **Failures and scale** — POC-007 recorded a local in-memory duplication self-test and a timeout self-test in an isolated subprocess. Reliable recovery after an actual crash, concurrency between dispatchers, reliable asynchronous delivery, implemented human approval gates, and simultaneous support for multiple projects remain to be demonstrated. The results are limited to the small Python function and the synthetic environments examined.

## 9. Risks and open questions

- Define the task and state model, persistence, and idempotency across claim, recording, invocation, and writing the result.
- Verify message and artifact identity and provenance. Define security, isolation, and permissions for files, processes, and the network.
- Define process control, timeouts, cancellation, partial failure recovery, reconciliation, and concurrency.
- Deliberate on contract versioning, the link between evidence and the reviewed version, retention, access, and artifact integrity.
- Define verifiable human approval gates, multi-project support, and which AI Memory CLI or MCP contracts can be used for each operation.

## 10. Next gate

Documentation regression review R2 was completed with a recommendation in favor of formal approval. The next gate is the human owner's decision on formal approval of the documentation baseline. Starting technical planning requires the corresponding authorization.

## 11. Guidance for a new instance

1. Read the documentation baseline, this handoff, and the manifest. Use the persistent documents to recover facts, limits, and decisions.
2. Check the actual state of the branch, index, commits, remotes, and working tree. Revalidate the hashes of the copies and check the sanitization notes before comparing them with the originals.
3. Respect the gates. Await authorization before starting planning, implementation, or new runs, and treat the technical architecture as pending.
4. Use agent memory and messages as historical context. Normative authorization comes from the human owner and the applicable documents.
5. Preserve project isolation. The IAS inbox is part of the experimental history. The access scope for a new session must be established by the authorization in effect.
