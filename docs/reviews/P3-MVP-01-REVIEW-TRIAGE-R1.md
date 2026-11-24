# P3-MVP-01 — Final R1 finding dispositions

The project owner accepted these dispositions on 24 November 2026 for the offline version identified by SHA-256 `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc` of `VERSION.sha256`. The final distribution is **0 BLOCKER, 0 MAJOR, 2 MINOR and 1 EDITORIAL**. The three findings remain outstanding in the forms described below.

## P3-REV-01 — Reapproval after temporal invalidation

**MINOR · CONFIRMED · Nonblocking functional defect · Unfixed.** `approve()` and `authorize()` apply different time and boot-identity criteria. An authorization that is correctly invalidated can prevent reapproval until explicitly revoked. The behavior remains fail-closed. The review found no unauthorized execution resulting from the defect. The owner deferred remediation to a separately authorized increment. [Approval and authorization logic](../../p3-mvp-01/state.ts#L133-L164)

## P3-REV-02 — Cancellation, revocation and data exposure

**MINOR · CONFIRMED · Known nonblocking residual nonconformity in the offline envelope · Unfixed.** The `cancel` and `revoke` commands both call `state.revoke()`, which records `kind='revoked'`. P2-R2 requires attempt cancellation and authorization revocation to be distinguished. The addendum confirms that the operational outcome distinguishes `cancelled`, with containment, fail-closed cessation and admission/invalidation ordering preserved. It also confirms unnecessary exposure of synthetic `proof` and `nonce` in `status()`.

The owner accepted the residual nonconformity for these exact offline bytes. This acceptance preserves the original contracts and carries no automatic acceptance into real operation. Remediation is recommended before enabling real operations and requires specific authorization. The initial R1 wording is retained in the review copy and qualified by the addendum and this disposition. [CLI dispatch](../../p3-mvp-01/cli.ts#L25) · [R1 addendum](P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1-ADDENDUM.md)

## P3-REV-03 — Custody and selection of a released attempt

**EDITORIAL · PARTIALLY CONFIRMED · Preventive recommendation · Unimplemented.** The offline installation admits one task and at most one attempt over its lifecycle. The addendum shows that the released-attempt query cannot select another historical attempt in this version. No functional defect in that query was confirmed within this scope.

When the implementation evolves, evaluate PID-namespace depth assumptions, explicit candidate-to-attempt association, and deterministic generation-based selection if multiple attempts become supported. This is a recommendation for that future context. [Handoff query](../../p3-mvp-01/workflow.ts#L195-L204) · [R1 addendum](P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1-ADDENDUM.md)

The dispositions apply to the homologated offline version. New technical decisions and implementation changes require their applicable human authorization. [R1 report](P3-MVP-01-INDEPENDENT-IMPLEMENTATION-REVIEW-R1.md) · [Homologation](../specifications/P3-MVP-01-FORMAL-HOMOLOGATION.md)
