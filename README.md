# AI Agent Orchestrator

AI Agent Orchestrator is a project for coordinating AI agents in software development and reducing manual handoff of tasks, results, and reviews. It is independent of consumer projects such as IAS and Jungle. AI Memory, an independent product created by Fábio Akita, can support persistent memory, context retrieval, handoffs, and complementary communication.

Future development focuses on AI Agent Orchestrator. AI Orchestration Lab will be preserved as a historical reference, with no continued active development planned. Any migration of artifacts or contracts requires a separate decision.

## Approved v0.4 workflow

1. The human owner defines the task and scope, then registers and authorizes it directly in the orchestrator. ChatGPT may assist with planning, prompt preparation, and analysis of deliverables. Automatic integration with the ChatGPT interface or API is optional in V1.
2. The orchestrator verifies the authorization, binds it to the approved content, records that content's verifiable identity, and directly invokes the first designated executor. Codex and Antigravity execute or review as assigned in a local, sequential workflow. The orchestrator coordinates transitions and enforces the applicable human authorization for scope changes and gates.
3. Each task uses its own Git worktree on a dedicated branch with effective access isolation, preserving the user's main working tree. Authorizations, state, history, review findings, and control evidence are kept outside the consumer repository and executor-writable areas. Worktree cleanup requires authorized closure and preservation of the necessary evidence.
4. The orchestrator maintains authoritative structured events and persistent state for traceability and recovery. AI Memory messages provide optional support and confer no authorization or authority over transitions. The main V1 workflow requires no short-message protocol. Operations without an explicit AI Memory dependency continue during an outage.
5. Versioned, immutable artifacts support independent review. Commits and hashes can identify versions used in execution, testing, and review. Agents may perform Git/GitHub operations when covered by the applicable authorization and approval gates.

The architecture prioritizes simplicity, with controls proportionate to risk and without distributed infrastructure or premature abstractions. A minimal local web interface remains a proposal for V1, conditional on prior CLI validation of the core, a cost assessment, and a human decision.

## Status and next gate

The experimental foundation has been published. The original Portuguese v0.3 architectural directives passed independent review and received formal approval from the human owner on 20/11/2026. The v0.4 directives passed independent review and received formal approval from the human owner on 20/11/2026. The approved document retains the exact text submitted for review, including its candidate status wording. Starting technical planning requires separate authorization. Implementation has yet to begin. [v0.3 formal approval record](docs/architecture/002-registro-homologacao-v03.md) · [v0.4 formal approval record](docs/architecture/004-registro-homologacao-v04.md)

## Documentation

- Experimental foundation · [Report](docs/001-relatorio-experimental.md), [handoff](docs/handoffs/001-handoff-fundacao-experimental.md), and [evidence manifest](evidence/pocs/MANIFEST.md).
- Architecture · [Approved v0.4 directives](docs/architecture/003-diretrizes-arquiteturais-v04.md) and [v0.3 directives, English translation](docs/architecture/001-diretrizes-arquiteturais.md).
- Review · [Full audit](docs/reviews/005-auditoria-integral-independente-r1.md), [finding triage](docs/reviews/006-triagem-auditoria-integral-r1.md), and [regression review](docs/reviews/007-revisao-regressiva-saneamento-auditoria-r1.md).
