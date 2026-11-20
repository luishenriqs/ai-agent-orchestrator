# Formal approval record for the v0.4 architectural directives

- **Approved document** — [AI Agent Orchestrator architectural directives](003-diretrizes-arquiteturais-v04.md).
- **Version** — 0.4.
- **Repository path** — `docs/architecture/003-diretrizes-arquiteturais-v04.md`.
- **SHA-256 of the approved document** — `6e6a8987f112d866c4f52cd2d16c60b33548a6542c5299b510036d4efedc409b`.
- **Formal approval date** — 20/11/2026.
- **Authority** — the human owner of the AI Agent Orchestrator project, by express decision in the delegation for formal approval and Git integration.
- **Independent review** — *AI Agent Orchestrator — Independent Architectural Regression Review R1 (v0.4 Candidate)*, conducted by Gemini 4 Neon on 20/11/2026. The report is maintained outside the repository.
- **Review verdict** — `APPROVED — READY FOR HUMAN HOMOLOGATION`, without reservations. Findings by severity were 0 blocker, 0 major, 0 minor, and 0 editorial. The review identified no architectural regression.

The human owner formally approved the exact bytes identified above. The document retains the wording of the candidate submitted for independent review. This record establishes its formal approval status.

## Approved decisions

- **DEC-02** — The human registers and authorizes tasks directly in the orchestrator. The orchestrator binds authorization to the approved content, records its verifiable identity, and invokes the first designated executor after validating the initial gate.
- **DEC-03 and DEC-04** — AI Memory remains independent and provides optional support. The orchestrator invokes agents directly and maintains authoritative operational state. The main V1 workflow requires no AI Memory messaging protocol.
- **DEC-06** — Each task uses a dedicated Git worktree and branch, with effective access isolation and protected control records outside the consumer repository and executor-writable areas.

The other 12 decisions, DEC-01, DEC-05, and DEC-07 through DEC-16, are preserved. The formal approval of the Portuguese v0.3 original remains recorded separately. [v0.3 formal approval record](002-registro-homologacao-v03.md)

## Integration and scope

The human owner authorized squash integration into `main` from the approved baseline `198a53fd34f6dd3ea979092159da020ac47c6593`, subject to integrity, scope, and merge checks. The integration commit is traceable in the history of this record on `main`.

Starting technical planning or implementing V1 requires separate human authorization.
