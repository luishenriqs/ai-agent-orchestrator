# AI Agent Orchestrator

AI Agent Orchestrator is a project for coordinating AI agents in software development and reducing manual handoff of tasks, results, and reviews. It is independent of consumer projects such as IAS and Jungle. The proposed solution works in partnership with AI Memory, an independent product created by Fábio Akita that provides supporting communication and persistent memory.

Future development focuses on AI Agent Orchestrator. AI Orchestration Lab will be preserved as a historical reference, with no continued active development planned. Any migration of artifacts or contracts requires a separate decision.

## Planned workflow

1. The human owner defines the scope and makes decisions at approval gates, with manual support from ChatGPT in preparing the task and analyzing deliverables. The human delivers an authorized prompt to the first designated executor, who registers the task with the orchestrator.
2. The orchestrator verifies the applicable authorization before releasing coordinated actions or transitions. Codex and Antigravity execute or review as assigned in an initially local, sequential workflow.
3. Short messages reference versioned, immutable artifacts. Structured events and persistent state support traceability and controlled recovery. Agents may perform Git/GitHub operations when covered by the applicable authorization and approval gates.

The architecture prioritizes simplicity, with controls proportionate to risk and without distributed infrastructure or premature abstractions. A minimal local web interface remains a proposal for V1, conditional on prior CLI validation of the core, a cost assessment, and a human decision.

## Status and next gate

The experimental foundation has been published. The original Portuguese v0.3 architectural directives passed independent review and received formal approval from the human owner on 20/11/2026. The next gate is authorization to start technical planning. Implementation has yet to begin. [Formal approval record](docs/architecture/002-registro-homologacao-v03.md)

## Documentation

- Experimental foundation · [Report](docs/001-relatorio-experimental.md), [handoff](docs/handoffs/001-handoff-fundacao-experimental.md), and [evidence manifest](evidence/pocs/MANIFEST.md).
- Architecture · [v0.3 directives](docs/architecture/001-diretrizes-arquiteturais.md).
- Review · [Full audit](docs/reviews/005-auditoria-integral-independente-r1.md), [finding triage](docs/reviews/006-triagem-auditoria-integral-r1.md), and [regression review](docs/reviews/007-revisao-regressiva-saneamento-auditoria-r1.md).
