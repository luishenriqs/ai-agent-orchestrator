> Published copy of the original Antigravity / Gemini 4 Neon (Medium) response, transcript line 75, step 74, 2026-11-24T18:03:02Z. Local paths and file links were adapted for publication. The original UTF-8 response is preserved with SHA-256 `1bc050b844ac6a301a268438df98bfe325638388e4d64e0fe4cdf24879679741`. The original wording and conclusions remain in Portuguese. See the [formal homologation record](../specifications/P3-MVP-01-FORMAL-HOMOLOGATION.md) for provenance.

# Relatório de Revisão Técnica Independente R1 — P3-MVP-01

## 1. Resumo executivo

**Parecer conclusivo:** **`SUFICIENTE COM RECOMENDAÇÕES NÃO BLOQUEANTES`**

A implementação offline de **P3-MVP-01**, preparada pelo Codex na branch `p3/mvp-01` (worktree dedicada `~/projects/ai-agent-orchestrator-p3-mvp-01`) e pinada em `VERSION.sha256` = `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`, foi integralmente auditada em modo somente leitura e reproduzida independentemente sobre uma cópia verificada em diretório descartável em ext4.

- **Integridade:** 41/41 entradas do manifesto final (`5e04c246...`), 27/27 entradas do manifesto diagnóstico anterior (`a082ce6c...`) e 10/10 arquivos de `VERSION.sha256` (`598a7650...`) verificados sem divergência; snapshot 100% byte-idêntico à worktree de implementação.
- **Reprodução:** **25/25 testes aprovados** (0 falhas, 0 ignorados) em 28,11s, reproduzindo inclusive o digest determinístico do `ArtifactSet` de exemplo (`d103b9539f74f092086a4827ac5ff10e2b66b0ef5f53b9b3643568fe6b26abaf`), complementados por 4 sondas adversariais independentes.
- **Change budget:** 10 arquivos (8 de código, 1 de testes, 1 documental), **1.138 linhas líquidas de código e testes** (917 código + 221 testes) e 0 dependências externas — dentro dos tetos autorizados (≤ 25 arquivos, ≤ 3.500 linhas).
- **Achados:** **0 BLOCKER · 0 MAJOR · 2 MINOR · 1 EDITORIAL**.

Esta revisão não autoriza correções, commits, integração Git, homologação ou execução de agentes reais.

---

## 2. Identidade e independência do revisor

- **Agente e modelo:** Antigravity / Gemini 4 Neon (Medium).
- **Ferramenta / ambiente de execução observado:** Linux `6.6.87.2-microsoft-standard-WSL2` x86_64, Node.js `v24.22.2`, Bubblewrap `0.6.1`, `prlimit` (`util-linux 2.37.2`), Git `2.34.1`.
- **Papel desempenhado:** Revisor técnico independente da implementação `P3-MVP-01` (revisão R1).
- **Confirmação de independência:** Este revisor não participou da autoria, implementação ou correções do código submetido; na etapa anterior, atuou exclusivamente como revisor somente leitura do pacote documental estratégico (sem coautoria). Nenhum contato ou solicitação foi dirigido ao Codex durante esta revisão.
- **Contexto de acesso:** Leitura direta do repositório principal, worktree de implementação, pacotes de evidência e fontes normativas; execução controlada de testes exclusivamente sobre cópia em `/tmp/p3-review-r1-*` (ext4, UID comum, offline, fixtures sem remoto), removida ao término.
- **Limitações efetivas:** Revisão restrita ao envelope offline com autoridade sintética HMAC e adaptador substituto determinístico; sem invocação de CLIs reais (`codex`, `agy`), sem testes entre UIDs distintos do SO, sem validação de queda real de energia/disco e sem operações remotas Git.

---

## 3. Escopo e limitações

A revisão cobriu integralmente os 10 arquivos da versão submetida, o relatório de entrega (REPORT.md (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/REPORT.md`)), a matriz de rastreabilidade (TRACEABILITY.md (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/TRACEABILITY.md`)), o checkpoint 8.7 (CHECKPOINT-8.7.md (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/CHECKPOINT-8.7.md`)), os logs de canário e suíte, e o vínculo com o pacote diagnóstico anterior (`AnFHEgVI`).

Funcionalidades expressamente reservadas a gates posteriores (`I → R`, `O/D01–O/V4`, `G`) — incluindo `REV-V1-02`, CLIs reais, `A01` humano real, `A12`/`A13`/`A15`, fechamento administrativo de efeitos remotos e integração Git — não foram exigidas nem receberam crédito operacional.

---

## 4. Baseline e versão efetivamente examinada

- **Repositório principal:** `~/projects/ai-agent-orchestrator` em `main@146a5b390c0bee14175272b9a9627b9172d947f3` (`origin/main` coincidente, 0 diffs rastreados/staged, `.git/index` = `5385573e959125ca566c0fb6201729db744fd892e4d989d5c4544a615004eb91`, `.git/config` = `ac64837d22278b4545d967576cb3f5077e24eef6602b90f0228e506dfa1949a1`).
- **Worktree de implementação:** `~/projects/ai-agent-orchestrator-p3-mvp-01` na branch `p3/mvp-01` sobre `146a5b390c0bee14175272b9a9627b9172d947f3`, contendo exclusivamente os 10 arquivos não rastreados em `p3-mvp-01/` (sem staging ou commit).
- **Identidade da versão pinada (VERSION.sha256 (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/VERSION.sha256`)):** `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`.
- **Comparação snapshot vs. worktree:** `diff -ruN` retornou `IDENTICAL` e `sha256sum --strict -c VERSION.sha256` passou 10/10 em ambos os locais.

---

## 5. Integridade normativa

Todas as fontes normativas foram localizadas, lidas e validadas segundo a precedência do projeto:
- 003-diretrizes-arquiteturais-v04.md (`~/projects/ai-agent-orchestrator/docs/architecture/003-diretrizes-arquiteturais-v04.md`) (`6e6a8987...`) e 004-registro-homologacao-v04.md (`~/projects/ai-agent-orchestrator/docs/architecture/004-registro-homologacao-v04.md`) (`c2d8adbe...`).
- P2-V1-OPERATIONAL-CONTRACTS-R2.md (`~/projects/ai-agent-orchestrator/docs/specifications/P2-V1-OPERATIONAL-CONTRACTS-R2.md`) (`9d721240...`), P2-V1-FORMAL-HOMOLOGATION-R2.md (`~/projects/ai-agent-orchestrator/docs/specifications/P2-V1-FORMAL-HOMOLOGATION-R2.md`) (`dfbcfc85...`, preservado com o campo histórico de 63 caracteres) e P2-R2-SHA256-RATIFICATION-ADDENDUM.md (`~/.local/share/ai-agent-orchestrator/decisions/2026-11-24-v1-product-pivot/P2-R2-SHA256-RATIFICATION-ADDENDUM.md`) (`fa90f2df...`).
- CROSS-AUDIT-TRIAGE-AND-STRATEGIC-DECISION.md (`~/.local/share/ai-agent-orchestrator/decisions/2026-11-24-v1-product-pivot/CROSS-AUDIT-TRIAGE-AND-STRATEGIC-DECISION.md`) (`4d50f47e...`), P3-MVP-01-IMPLEMENTATION-SPEC.md (`~/.local/share/ai-agent-orchestrator/decisions/2026-11-24-v1-product-pivot/P3-MVP-01-IMPLEMENTATION-SPEC.md`) (`2f7e4690...`), V1-STRATEGIC-CONSOLIDATION-HOMOLOGATION-RECORD.md (`~/.local/share/ai-agent-orchestrator/handoffs/2026-11-24-v1-product-pivot/V1-STRATEGIC-CONSOLIDATION-HOMOLOGATION-RECORD.md`) e 004-handoff-v1-product-pivot-p3-mvp-01.md (`~/.local/share/ai-agent-orchestrator/handoffs/2026-11-24-v1-product-pivot/004-handoff-v1-product-pivot-p3-mvp-01.md`).
- Os três arquivos não rastreados preexistentes na árvore principal (`002-handoff...`, `003-handoff...`, `EXP-02-C-R2-E1-OBS-2-R2-PLAN.md`) permaneceram intactos antes e depois da revisão.

---

## 6. Integridade dos manifestos

| Manifesto | SHA-256 verificado | Entradas | Resultado |
|---|---|---|---|
| SHA256SUMS (pacote final `resume-8lt1SU4W`) (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/SHA256SUMS`) | `5e04c246faeeabf8b2a28d80c9cf1dd77386001814c9eb7b8be92f6c86938852` | 41/41 | **OK** |
| VERSION.sha256 (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/VERSION.sha256`) | `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc` | 10/10 | **OK** (snapshot e worktree) |
| SHA256SUMS (pacote diagnóstico `AnFHEgVI`) (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-AnFHEgVI/SHA256SUMS`) | `a082ce6cb230c60de4b34eac81425999596db57c6700f0d3274dc3043c0778f2` | 27/27 | **OK** |

---

## 7. Avaliação de REV-V1-01 e checkpoint 8.7

- **Resolução de REV-V1-01:** Adequada e documentada em CHECKPOINT-8.7.md (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/CHECKPOINT-8.7.md`). A composição `Node 24.22.2 → Bubblewrap 0.6.1 → /usr/bin/prlimit 2.37.2 → Node` resolveu o bloqueio anterior de `RLIMIT` na preparação do namespace sem recorrer a shell (`bash`) ou elevação de privilégios.
- **Evidência de canários (BOUNDARY.log (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/BOUNDARY.log`), CUSTODY.log (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/CUSTODY.log`)):** Comprovou limites `RLIMIT_NPROC=24:24`, `RLIMIT_FSIZE=65536:65536`, `RLIMIT_CORE=0:0`, negação de elevação unilateral (`EPERM`), herança em descendentes, negação de rede TCP (`ECONNREFUSED`) e Unix (`ENOENT`), ausência de FDs/env vazados, proteção de gitfile/fixture/home e limpeza da árvore pai/filho/neto nos cenários `normal`, `timeout`, `cancel` e `controller-loss`.
- **Limites declarados com transparência:** O checkpoint explicita corretamente que `RLIMIT_NPROC` contabiliza por UID (incluindo threads) e `RLIMIT_FSIZE` é por arquivo, não constituindo quota exclusiva de instalação nem quota agregada ext4. `REV-V1-02` permanece intocado para o gate `I → R`.

---

## 8. Avaliação integral da implementação

O código em `p3-mvp-01/` é enxuto, legível e bem particionado em 8 módulos sem dependências externas:
- [common.ts](../../p3-mvp-01/common.ts) (80 linhas): `digest`, `durableCreate` (`wx`, `0o600`, `fsync` de arquivo e diretório), `privateDirectory` (`0o700`, dono, caminho canônico), `readPrivate` (`O_NOFOLLOW | O_NONBLOCK`, `nlink===1`, teto de bytes), `selfScope` (`boot_id` + `ns/pid`), `startTime` (`/proc/<pid>/stat` campo 22, filtrando `Z`/`X`) e `fault` (autossinalização `SIGKILL` restrita a `process.pid`).
- [state.ts](../../p3-mvp-01/state.ts) (259 linhas): esquema SQLite `STRICT`, autoridade HMAC-SHA256 sintética de teste, reserva exclusiva por índice único parcial, transições transacionais, revogação e reconciliação.
- [git.ts](../../p3-mvp-01/git.ts) (55 linhas): execução mediada do `/usr/bin/git` pinado por SHA-256 com hooks, protocolos, fsmonitor, atributos e configs globais/sistema desabilitados.
- [sandbox.ts](../../p3-mvp-01/sandbox.ts) (150 linhas): atestação por SHA-256 de `bwrap`, `prlimit`, `node`, loader, 7 bibliotecas e `payload.ts`; supervisão via `--info-fd 3`; varredura de cessação de namespace.
- [payload.ts](../../p3-mvp-01/payload.ts) (61 linhas): substituto determinístico isolado sem imports do projeto; valida limites e `CapEff: 0` no arranque e aguarda `/permit/grant`.
- [artifacts.ts](../../p3-mvp-01/artifacts.ts) (74 linhas): captura em duas leituras com validação de `(ino, dev, ctimeNs, mtimeNs, size)` e bytes, publicação em `0400`/`0500` com `fsync` e verificação integral do envelope de handoff.
- [workflow.ts](../../p3-mvp-01/workflow.ts) (204 linhas): orquestração ponta a ponta (`execute`, `recover`, `handoff`) com ordenação de entrega sob `BEGIN IMMEDIATE`.
- [cli.ts](../../p3-mvp-01/cli.ts) (34 linhas): interface mínima com `umask(0o077)` e recusa de comandos fora do escopo offline.

---

## 9. Autorização, admissão e exclusividade

- **Autoridade sintética:** Claramente rotulada como `synthetic-local-operator` com chave `test-authority` (`0o600`, 32 bytes) em `control/`, fora de todas as montagens do sandbox. Não se apresenta como autenticação humana operacional real (`A01` real permanece em `I → R`).
- **Vínculo ao conteúdo e anti-adulteração:** `specification()` valida chaves exatas; `approve()` vincula HMAC-SHA256 a `nonce`, `digest`, `project`, `task`, `baseline`, `operations`, `issued`, `expires`, `boot` e `expiresMonotonic`; `authorize()` usa `timingSafeEqual` e revalida `digest(task.spec) === task.digest` e todos os campos no ponto de uso.
- **Relógio monotônico e boot:** Confirmado em contraprova (`PROBE_1_MONOTONIC_SHARED`) que `process.hrtime.bigint()` compartilha `CLOCK_MONOTONIC` entre processos Node distintos no mesmo boot. Identificado um descompasso menor em `approve()` vs. `authorize()` quanto à reemissão após mudança de boot/expiração monotônica (`P3-REV-01`, *fail-closed*).
- **Exclusividade e ordenação:** Índice único parcial `one_reservation ON attempt ((1)) WHERE phase NOT IN ('released')` + `BEGIN IMMEDIATE` impede duas execuções ativas entre processos distintos (`A05`). O ponto de entrega local (`renameSync(pending, grant)` + `fsync(permit)`) ocorre dentro da mesma transação `BEGIN IMMEDIATE` que revalida `authorize(true)`, `owner()` e `cancelled === 0`, serializando estritamente entrega contra revogação (`CA-02` / `A21`).

---

## 10. Persistência e recuperação

- **SQLite:** Localizado em `<root>/control/state.sqlite` (`0o600`, `nlink===1`, dono verificado em `State`), `journal_mode=delete`, `synchronous=EXTRA` (`3`), foreign keys habilitadas, tabelas `STRICT`, transações `BEGIN IMMEDIATE` com rollback explícito em erro.
- **Fronteira SQLite ↔ spawn/efeitos:** O código e o relatório não atribuem atomicidade indevida entre SQLite e `spawn`. A intenção (`spawn-admitted`) precede `spawn`; se o coordenador cair antes da observação do kernel (`after-spawn`), `row.custody` é `null` e `recover()` mantém a reserva retida (`uncertain` / `retained`), sem liberar nem repetir.
- **Janelas de falha verificadas:**
  - `after-reserve` / `before-spawn`: pré-spawn comprovado + reconciliação de worktree/ref → libera sem repetir (`payload-not-delivered`).
  - `after-spawn` (sem `custody`): cessação não comprovável → **retém reserva** com obrigação `REC-09`.
  - `after-attach` / `before-delivery`: cessação verificada por `custody` + ausência de `/permit/grant` + `preparedEffectsMatch()` → libera sem repetir.
  - `after-delivery` / `partial` / `lost-ack` / `after-ack` / `before-result` / `readonly-result`: efeito possível ou falha de gravação final → **retém reserva** com obrigação `REC-09`, sem handoff e sem redespacho.
- **Divergência de boot/namespace na recuperação:** Confirmado em contraprova (`PROBE_4_BOOT_MISMATCH_RECOVER`) que `recover()` recusa liberar a reserva quando `row.scope !== JSON.stringify(selfScope())`.

---

## 11. Isolamento e custódia

- **Perfil efetivo em [sandbox.ts](../../p3-mvp-01/sandbox.ts#L71-L82):** Coincide com o perfil aprovado no checkpoint 8.7 (`--unshare-user --unshare-pid --unshare-net --unshare-ipc --unshare-uts --die-with-parent --new-session --clearenv --cap-drop ALL --proc /proc --dev /dev`, `HOME=/nonexistent`, `UV_THREADPOOL_SIZE=2`, apenas loader + 7 bibliotecas específicas + `/node` + `/limits` + `/payload.ts` em leitura, `--info-fd 3`, `/limits --nproc=24:24 --fsize=65536:65536 --core=0:0 --`).
- **Correção de `ceased()` ([sandbox.ts:45-65](../../p3-mvp-01/sandbox.ts#L45-L65)):** Verifica primeiro extinção de `root` e `init` por `(pid, startTime)`. Na varredura de `/proc`, filtra por `uid()`, lê `/proc/<pid>/status` para `NSpid:` e só consulta `namespace(pid)` quando `localIds.length > 1` (processos em namespaces PID filhos). Se `NSpid` estiver ausente ou qualquer leitura/symlink em namespace filho falhar com erro diferente de `ENOENT`/`ESRCH` (ex.: `EACCES`), retorna `false` (*fail-closed*). Não trata ausência de visibilidade como prova de cessação.
- **Proteção de `.git`:** Confirmado em contraprova (`PROBE_3_BWRAP_GITFILE`) que a montagem `--ro-bind` de `/work/.git` sobre `/work` gravável bloqueia escrita (`EROFS`), remoção (`EBUSY`), renomeação (`EBUSY`) e escrita via symlink (`EROFS`), enquanto o `gitdir` comum permanece ausente do mount namespace.

---

## 12. Git e identidade de versões

- Árvore principal e 3 arquivos não rastreados preexistentes intactos; único delta no inventário principal foi a criação da branch `p3/mvp-01` e da worktree dedicada (GIT-EXPECTED-DIFF.log (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/GIT-EXPECTED-DIFF.log`)).
- Fixture de produto sempre criada sem remoto (`fixtureState()` exige `git remote === ''`, `refs/heads/main`, `HEAD === baseline`, working tree limpa), com binário `/usr/bin/git` pinado por SHA-256 e hooks/protocolos/configs externos desabilitados.
- Captura em [artifacts.ts](../../p3-mvp-01/artifacts.ts) valida inventário exato (`.git,task.txt`), rejeita symlinks/hardlinks (`O_NOFOLLOW`, `nlink===1`), detecta mutação durante captura (`unstable`) e imobiliza o snapshot (`0400`/`0500` + `fsync`).
- Testes (`action='test'`) e leitor (`action='review'`) recebem exclusivamente `/snapshot` somente leitura e `/scratch` gravável separado; um `PASS` de hash divergente (`stale-pass`) é rejeitado e retém a reserva como `uncertain`.

---

## 13. Evidências e handoff

- O envelope de handoff (samples/verified/handoff.json (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/samples/verified/handoff.json`)) vincula `schema`, `project`, `task`, `attempt`, `specification`, `authority` (digest do nonce), `baseline`, `artifact`, `manifest`, hashes das 3 observações (`execute.json`, `test.json`, `reader.json`), entradas e provas de `test` e `reader`, `lastProven`, `outstanding` e `next: 'independent-review-and-human-gate'`.
- `handoff()` revalida o envelope contra a tabela `candidate`, o estado da tarefa (`verified`), ausência de reserva ativa, último evento `approved`, bytes reais do snapshot e hashes/conteúdo das 3 evidências em disco. Adulteração em `candidate` ou `test.json` é detectada e rejeitada.

---

## 14. Resultado da reprodução da suíte

Comando executado sobre cópia verificada em diretório temporário exclusivo em ext4 (`/tmp/p3-review-r1-*`):

```sh
sha256sum --strict -c VERSION.sha256
node --test --test-concurrency=1 p3-mvp-01/test/offline.test.ts
```

- **Integridade da cópia:** 10/10 `OK`.
- **Resultado:** **25/25 testes `PASS`**, 0 falhas, 0 cancelados, 0 ignorados, duração `28.107,66 ms`, código de saída `0`.
- **ArtifactSet reproduzido:** `d103b9539f74f092086a4827ac5ff10e2b66b0ef5f53b9b3643568fe6b26abaf` (idêntico ao reportado pelo executor).

---

## 15. Resultados dos testes adversariais adicionais

Executados em script independente (`adversarial.mjs`) dentro da cópia descartável em `/tmp/p3-review-r1-*`:

| Sonda | Objeto verificado | Resultado observado |
|---|---|---|
| `PROBE_1_MONOTONIC_SHARED` | `process.hrtime.bigint()` entre processos Node distintos | **PASS** (`t1 <= t2 <= t3`, relógio monotônico compartilhado no boot) |
| `PROBE_2_SPAWN_ERROR_CLOSE` | Emissão de `'close'` após `'error'` em `spawn('/nonexistent...')` no Node 24.22.2 | `{"errFired":true,"closeFired":true,"hung":false}` (**sem hang** em `sandbox.ts:132-137`) |
| `PROBE_3_BWRAP_GITFILE` | Tentativa de `write`, `unlink`, `rename` e escrita via symlink em `/work/.git` no perfil `bwrap` do produto | `{"write":"EROFS","unlink":"EBUSY","rename":"EBUSY","symlinkWrite":"EROFS"}` (**PASS**) |
| `PROBE_4` (4a–4d) | Raiz symlink, `state.sqlite` com modo `0644`, troca de `boot` em aprovação e em `recover()` | Symlink rejeitado (`canonical directory`), `0644` rejeitado (`unprotected database`), `recover()` em boot diverso retém reserva (**PASS**); `approve()` após troca de boot recusou reemissão (`Error: previous approval is still applicable or consumed`) — registrado em **`P3-REV-01`** |

---

## 16. Matriz independente de atendimento dos requisitos

| Grupo / Cenários P2-R2 | Status na revisão independente | Evidência verificada |
|---|---|---|
| **CT-01 (`A01`–`A04`, `A20`, `A21`)** | **Atendido (escopo offline)** | Rejeição de aprovação ausente, forjada, expirada, revogada, duplicada, projeto/escopo divergente e conteúdo alterado; revogação antes do spawn e pós-entrega testadas. `A01` humano real reservado a `I → R`. |
| **CT-02 / CT-03 (`A05`–`A07`, `A28`, `A29`)** | **Atendido (escopo offline)** | Concorrência entre dois processos reais (`spawn`), 5 pontos de `SIGKILL` pré-entrega, descendentes reais com `bwrap --unshare-pid --die-with-parent`, cancelamento, timeout e teto de saída 8 KiB. |
| **CT-04 (`A08`, `A09`, `A16` offline)** | **Atendido (escopo offline)** | `bwrap` + `prlimit`, `/work/.git` protegido (`EROFS`/`EBUSY`), controles fora do mount namespace, leitor read-only em `/snapshot` + `/scratch`, negações de rede/FDs/home em `BOUNDARY.log`. |
| **CT-05 / CT-06 (`A10`, `A11`, `A14`, `A23`, `A24`)** | **Atendido (escopo offline)** | Captura estável com detecção de mutação (`unstable`), recusa de `stale-pass`, rejeição de handoff/evidência adulterados, gate humano preservado. `A12`/`A13` reservados a `I → R`. |
| **CT-07 (`A17`, `A18`, `A22`, `A25`, `A27`)** | **Atendido (escopo offline)** | Perda de ACK, entrega parcial, `SIGKILL` pós-entrega/pós-ACK/pré-resultado e SQLite `query_only=ON` retêm reserva com obrigação `REC-09` sem redespacho; execução sem AI Memory. `A15` e fechamento administrativo remoto reservados a `G`. |
| **CT-08 (`A19`, `A26` recusa offline)** | **Atendido (recusa offline)** | CLI rejeita `push`, `merge`, `cleanup`, `close`, `integrate`, `approve-review`; fixtures sem remoto. Caminho positivo de integração reservado a `G`. |

A matriz TRACEABILITY.md (`~/.local/share/ai-agent-orchestrator/evidence/p3-mvp-01-2026-11-24-resume-8lt1SU4W/TRACEABILITY.md`) não atribui cobertura inexistente e delimita honestamente os cenários diferidos.

---

## 17. Verificação do change budget

Contagem independente por `wc -l` sobre `version/p3-mvp-01/`:

| Categoria | Arquivos | Linhas | Limite autorizado | Status |
|---|---|---|---|---|
| Código (`artifacts.ts` 74, `cli.ts` 34, `common.ts` 80, `git.ts` 55, `payload.ts` 61, `sandbox.ts` 150, `state.ts` 259, `workflow.ts` 204) | 8 | 917 | — | OK |
| Testes (`test/offline.test.ts`) | 1 | 221 | — | OK |
| **Subtotal código + testes** | **9** | **1.138** | **≤ 25 arquivos / ≤ 3.500 linhas** | **DENTRO** |
| Documentação (`README.md`) | 1 | 40 | — | OK |
| Dependências externas adicionadas | 0 | — | 0 | **DENTRO** |

Os requisitos qualitativos do orçamento (1 persistência, 1 supervisor, 1 adaptador/substituto determinístico, 1 CLI mínima, 1 execução ativa, 1 fixture descartável sem remoto) foram integralmente respeitados. Os scripts diagnósticos (`boundary.mjs`, `custody.mjs` e pacote `AnFHEgVI`) permanecem fora da árvore do produto e não são necessários para executar a CLI ou sua suíte.

---

## 18. Achados por severidade

**Contagem:** `0 BLOCKER` · `0 MAJOR` · `2 MINOR` · `1 EDITORIAL`.

### `P3-REV-01` — **MINOR** (Defeito confirmado, não bloqueante)
- **Requisito / contrato afetado:** `CT-01` (`AUTH-07`), consistência entre expiração monotônica/boot e reaprovação.
- **Arquivo e localização:** [state.ts:139-142](../../p3-mvp-01/state.ts#L139-L142) vs. [state.ts:161-163](../../p3-mvp-01/state.ts#L161-L163).
- **Versão examinada:** `VERSION.sha256` = `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`.
- **Descrição objetiva:** `authorize()` invalida uma aprovação quando `p.boot !== selfScope().boot` ou `process.hrtime.bigint() >= BigInt(p.expiresMonotonic)`, mas `approve()` só permite substituir uma aprovação não consumida anterior quando `previous.revoked` ou `JSON.parse(previous.payload).expires <= Date.now()`.
- **Evidência verificável / contraprova:** Sonda `PROBE_4_BOOT_MISMATCH_REAPPROVE`: após alterar `boot` na aprovação (com assinatura HMAC válida), `run` falhou corretamente (`approval expired, revoked or consumed`), mas `approve` também falhou com `Error: previous approval is still applicable or consumed`.
- **Impacto:** Baixo e *fail-closed* (nenhuma quebra de segurança); exige invocar `revoke` antes de `approve` caso o host reinicie ou o relógio de parede recue enquanto uma aprovação não consumida ainda tem `expires > Date.now()`.
- **Recomendação de saneamento:** Reutilizar em `approve()` o mesmo predicado completo de validade temporal/boot de `authorize()` (em incremento futuro ou saneamento autorizado).

### `P3-REV-02` — **MINOR** (Simplificação de contrato / recomendação não bloqueante)
- **Requisito / contrato afetado:** `CT-02` §4.2 (distinção entre cancelamento e revogação) e higiene de exposição de `status()`.
- **Arquivo e localização:** [cli.ts:25](../../p3-mvp-01/cli.ts#L25), [state.ts:151](../../p3-mvp-01/state.ts#L151), [state.ts:196-207](../../p3-mvp-01/state.ts#L196-L207) e [state.ts:236-238](../../p3-mvp-01/state.ts#L236-L238).
- **Versão examinada:** `VERSION.sha256` = `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`.
- **Descrição objetiva:** (a) Os subcomandos `cancel` e `revoke` invocam igualmente `state.revoke()`, gravando sempre evento `kind = 'revoked'`; (b) `state.status()` retorna o payload bruto do evento `approved`, que inclui `proof` e `nonce` sintéticos (os arquivos `samples/*/status.json` do pacote foram sanitizados fora da CLI).
- **Evidência verificável:** Inspeção direta de `cli.ts:25` e `state.ts:151,196-207,237`.
- **Impacto:** Sem quebra de segurança no modelo offline (chave HMAC nunca é exposta e o processo confinado não tem acesso à CLI nem ao SQLite), mas mistura semanticamente revogação de autorização e cancelamento de tentativa na trilha de eventos.
- **Recomendação de saneamento:** Ao evoluir para múltiplas tentativas/operações reais, distinguir o evento `cancelled` de `revoked` e omitir `proof`/`nonce` na projeção de `status()`.

### `P3-REV-03` — **EDITORIAL** (Recomendação de melhoria)
- **Requisito / contrato afetado:** Robustez de varredura de namespace e consulta de tentativa liberada.
- **Arquivo e localização:** [sandbox.ts:59](../../p3-mvp-01/sandbox.ts#L59) e [workflow.ts:198](../../p3-mvp-01/workflow.ts#L198).
- **Versão examinada:** `VERSION.sha256` = `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`.
- **Descrição objetiva:** `ceased()` compara `localIds.length > 1` (pressupondo coordenador em profundidade 1 de PID namespace; permanece *fail-closed* se aninhado) e `handoff()` consulta `SELECT id FROM attempt WHERE phase='released'` sem `ORDER BY generation DESC LIMIT 1` (exato apenas porque a instalação offline admite uma única tentativa).
- **Impacto:** Nulo no escopo offline atual.
- **Recomendação de saneamento:** Parametrizar a profundidade de `NSpid` a partir de `/proc/self/status` e ordenar explicitamente por `generation DESC LIMIT 1` em evoluções futuras.

---

## 19. Riscos residuais

Mantêm-se como riscos residuais conhecidos e explicitamente delimitados (não resolvidos pela fatia offline):
1. **Autoridade operacional real (`A01`):** A chave HMAC sintética reside sob o mesmo UID do operador; separação de identidade operacional e superfície humana real ficam para `I → R`.
2. **Fronteira externa SQLite ↔ `spawn`:** Queda exatamente entre `spawn-admitted` e `process-observed` retém corretamente a reserva como incerta e exige intervenção do operador.
3. **Limites de recursos:** `RLIMIT_NPROC` (UID) e `RLIMIT_FSIZE` (por arquivo) não constituem cgroup dedicado nem quota agregada de disco.
4. **Compatibilidade com agentes reais (`REV-V1-02`):** O perfil `bwrap` estrito (7 bibliotecas, sem rede, sem auth/home, sem Git dentro do sandbox) foi provado apenas para o substituto determinístico; `codex` e `agy` exigirão prova própria no gate `I → R`.
5. **Reservas históricas `OBS-1` e `OBS-1-R2`:** Permanecem `NOT VERIFIABLE` e inalteradas.

---

## 20. Recomendações

1. Preservar a versão pinada (`598a7650...`) sem alterações até decisão humana de homologação do incremento offline `P3-MVP-01`.
2. Incorporar o saneamento simples de `P3-REV-01` e `P3-REV-02` apenas quando houver autorização humana subsequente (na preparação de `I → R` ou em eventual tarefa de consolidação).
3. Antes de qualquer avanço para `I → R`, manter o fechamento estrito de `REV-V1-02` (probes autorizados das CLIs reais, credenciais, egress e custódia real).

---

## 21. Parecer conclusivo

**`SUFICIENTE COM RECOMENDAÇÕES NÃO BLOQUEANTES`**

A implementação offline **P3-MVP-01** (`VERSION.sha256` = `598a76505569b4e549f9527aa083ff1048efcb6455da96c5133906f6fd3f02dc`, manifesto final `SHA256SUMS` = `5e04c246faeeabf8b2a28d80c9cf1dd77386001814c9eb7b8be92f6c86938852`) atende integralmente aos requisitos homologados para o incremento offline, cumpre o change budget, preserva a baseline e as fronteiras de segurança, e teve sua suíte de 25 testes integralmente reproduzida com sucesso e sem achados `BLOCKER` ou `MAJOR`.

A decisão de homologação, eventual staging/commit na branch `p3/mvp-01` e a autorização do próximo gate (`I → R`) permanecem exclusivamente sob autoridade do proprietário humano.

*(Verificação pós-revisão confirmou árvore principal `~/projects/ai-agent-orchestrator` e índice `.git/index` inalterados.)*
