# AI Agent Orchestrator

AI Agent Orchestrator is a project for coordinating AI agents in software development and reducing manual handoff of tasks, results, and reviews. It is independent of consumer projects such as IAS and Jungle. AI Memory, an independent product created by Fábio Akita, can support persistent memory, context retrieval, handoffs, and complementary communication.

Future development focuses on AI Agent Orchestrator. AI Orchestration Lab will be preserved as a historical reference, with no continued active development planned. Any migration of artifacts or contracts requires a separate decision.

## Approved v0.4 workflow

1. The human owner defines the task and scope, then registers and authorizes it directly in the orchestrator. ChatGPT may assist with planning, prompt preparation, and analysis of deliverables. Automatic integration with the ChatGPT interface or API is optional in V1.
2. The orchestrator verifies the authorization, binds it to the approved content, records that content's verifiable identity, and directly invokes the first designated executor. Codex and Antigravity execute or review as assigned in a local, sequential workflow. The orchestrator coordinates transitions and enforces the applicable human authorization for scope changes and gates.
3. Each task uses its own Git worktree on a dedicated branch with effective access isolation, preserving the user's main working tree. Authorizations, state, history, review findings, and control evidence are kept outside the consumer repository and executor-writable areas. Worktree cleanup requires authorized closure and preservation of the necessary evidence.
4. The orchestrator maintains authoritative structured events and persistent state for traceability and recovery. AI Memory messages provide optional support and confer no authorization or authority over transitions. The main V1 workflow requires no short-message protocol. Operations without an explicit AI Memory dependency continue during an outage.
5. Versioned, immutable artifacts support independent review. Commits and hashes can identify versions used in execution, testing, and review. Agents may perform Git/GitHub operations when covered by the applicable authorization and approval gates.

The architecture prioritizes simplicity, with controls proportionate to risk and without distributed infrastructure or premature abstractions. The decision on a minimal local web interface for V1 remains open pending P3's technical and cost evaluation and a human decision.

## Status and next gate

The experimental foundation and architecture v0.4 are preserved. The human owner approved v0.4 on 20 November 2026 following independent review. [Architecture homologation](docs/architecture/004-registro-homologacao-v04.md)

The human owner also approved the eight P2-R2 operational contracts. The historical approval record preserves its 63-character SHA-256 field. The complementary ratification identifies the exact contract bytes as `9d7212409b9ecad66d79e50dba04f046b6f93403263b0c8222b2afdc421d98e6`. The addendum is preserved in `~/.local/share/ai-agent-orchestrator/decisions/2026-11-24-v1-product-pivot/`. [P2-R2 contracts](docs/specifications/P2-V1-OPERATIONAL-CONTRACTS-R2.md) · [Historical approval](docs/specifications/P2-V1-FORMAL-HOMOLOGATION-R2.md)

Under **Alternative B**, development prioritizes the functional V1 product core. On 24 November 2026 the owner homologated **P3-MVP-01**, the offline increment on the dedicated `p3/mvp-01` branch. That branch is separate from `main`. The ten-file version is identified by SHA-256 `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc` of `VERSION.sha256`. [Implementation and offline reproduction](p3-mvp-01/README.md) · [Formal homologation](docs/specifications/P3-MVP-01-FORMAL-HOMOLOGATION.md)

The increment uses Node.js 24.22.2, erasable TypeScript, SQLite 3.53.4 through `node:sqlite`, `node:test`, Git 2.34.1, Bubblewrap 0.6.1 and `prlimit` 2.37.2. It runs one task and one attempt per installation with synthetic authority, a deterministic offline substitute, an isolated worktree and a pinned evidence handoff. The independent R1 review reproduced 25 passing tests and concluded **SUFICIENTE COM RECOMENDAÇÕES NÃO BLOQUEANTES**. The two MINOR findings remain unfixed and the EDITORIAL recommendation remains unimplemented. [R1 review](docs/reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1.md) · [R1 addendum](docs/reviews/P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1-ADDENDUM.md) · [Definitive triage](docs/reviews/P3-MVP-01-REVIEW-TRIAGE-R1.md)

REV-V1-01 is satisfied for the demonstrated offline envelope. The next technical gate is separately authorized preparation of **I → R**, including pending **REV-V1-02**. Real agents, real human authentication, full V1 readiness, remote consumer-project integration and productivity measurement are outside this homologation. The first genuine productivity measurement remains pending. The experimental evidence is preserved and OBS-2 remains inactive. The historical reservations remain NOT VERIFIABLE. [Closure handoff](docs/handoffs/005-handoff-p3-mvp-01-offline-homologation.md)

## Documentation

- Experimental foundation · [Report](docs/001-relatorio-experimental.md), [handoff](docs/handoffs/001-handoff-fundacao-experimental.md), and [evidence manifest](evidence/pocs/MANIFEST.md).
- Architecture · [Approved v0.4 directives](docs/architecture/003-diretrizes-arquiteturais-v04.md) and [v0.3 directives, English translation](docs/architecture/001-diretrizes-arquiteturais.md).
- V1 operational contracts · [P2-R2 specification](docs/specifications/P2-V1-OPERATIONAL-CONTRACTS-R2.md) and [independent review triage](docs/reviews/P2-V1-INDEPENDENT-REVIEWS-TRIAGE-R1.md).
- Review · [Full audit](docs/reviews/005-auditoria-integral-independente-r1.md), [finding triage](docs/reviews/006-triagem-auditoria-integral-r1.md), and [regression review](docs/reviews/007-revisao-regressiva-saneamento-auditoria-r1.md).
