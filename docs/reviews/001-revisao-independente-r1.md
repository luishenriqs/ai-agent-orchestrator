# Revisão Independente R1 — Documentação Inicial do AI Agent Orchestrator

## 1. Identificação da revisão e baseline

- **Projeto:** AI Agent Orchestrator
- **Revisão:** R1 — Auditoria documental independente
- **Papel:** Revisor técnico independente (modo somente leitura sobre fontes; criação exclusiva deste parecer)
- **Origem da documentação auditada:** Preparação inicial realizada pelo Codex
- **Data da revisão:** 2026-11-19
- **Repositório auditado:** `$HOME/projects/ai-agent-orchestrator`
- **Branch observada:** `main`
- **Estado Git inicial (antes da criação deste parecer):**
  - Repositório Git local recém-inicializado, sem commits (`## No commits yet on main`; `git log` retorna ausência de commits em `main`).
  - Sem remotes configurados (`git remote -v` vazio).
  - Arquivos presentes na árvore de trabalho (todos *untracked*):
    - `README.md`
    - `docs/001-relatorio-experimental.md`
  - Nenhuma alteração preexistente foi modificada durante a auditoria.

---

## 2. Resumo executivo

A documentação inicial composta por `README.md` e `docs/001-relatorio-experimental.md` apresenta boa qualidade técnica, disciplina epistêmica acima da média e consistência interna entre os dois arquivos. Os documentos diferenciam adequadamente o papel do AI Memory e do futuro orquestrador, evitam atribuir aprovação a propostas futuras, preservam a independência frente a aplicações consumidoras (IAS, Jungle e projetos futuros) e conferem com fidelidade a maior parte dos artefatos primários das POCs 006 e 007 (incluindo hashes SHA-256, IDs de mensagens, logs de testes RED/GREEN e ausência de commits nas árvores sintéticas).

Entretanto, a verificação independente das fontes primárias identificou **6 achados** (**0 BLOCKER**, **2 MAJOR**, **3 MINOR**, **1 EDITORIAL**). Os dois achados **MAJOR** impedem a recomendação de aprovação documental definitiva antes de saneamento:

1. **R1-001 (MAJOR):** O relatório omite que os scripts das POCs 005, 006 e 007 operaram sobre o namespace/inbox do projeto IAS no AI Memory (`default/luishenriqs-identity-and-access-server`) e que as mensagens das POCs 006 e 007 foram enviadas sem identidade real do agente remetente (`"from_agent": "other"`, `"from_owner_user": null`). Isso impacta a rastreabilidade de isolamento e proveniência para o planejamento técnico.
2. **R1-002 (MAJOR):** A documentação não registra a orientação estratégica humana recente que concentra o desenvolvimento futuro no `AI Agent Orchestrator` em parceria com o AI Memory, preservando o `AI Orchestration Lab` como referência histórica sem continuidade ativa de implementação prevista.

**Parecer conclusivo:** **`AJUSTES NECESSÁRIOS`** (sem recomendação de aprovação documental definitiva enquanto houver achados `MAJOR` abertos).

---

## 3. Fontes consultadas

Todas as fontes abaixo foram verificadas quanto à existência e consultadas exclusivamente em modo leitura. Nenhuma POC foi reexecutada, nenhuma mensagem pendente do AI Memory foi consumida e nenhum subprocesso de agente foi iniciado.

### 3.1 Documentos auditados (leitura integral)

| Caminho | Existência | Observação |
| --- | --- | --- |
| `$HOME/projects/ai-agent-orchestrator/README.md` | Verificada | Lido integralmente (11 linhas). |
| `$HOME/projects/ai-agent-orchestrator/docs/001-relatorio-experimental.md` | Verificada | Lido integralmente (151 linhas). |

### 3.2 Fontes experimentais consultadas

| Caminho | Existência | Artefatos inspecionados |
| --- | --- | --- |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_005.py` | Verificada | Leitura integral (135 linhas). Sem logs ou manifesto de execução no conjunto. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_006.py` | Verificada | Leitura integral (222 linhas). |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_007.py` | Verificada | Leitura integral (348 linhas). |
| `/tmp/ias-ai-memory-poc-006-3nvadl13/` | Verificada | `result.json` (SHA-256 `9a3a37ce1dce4162aa1371e50653599aefb555531220ca9784494f29001374bd`), `demo/labels.py` (SHA-256 `48c87796d8c7906267b378d5dd112cf98b0963ef03935182d986bd04ce615b7f`), `demo/REVIEW_RESPONSE.md`, logs em `_poc_logs/` (`*.exit.txt`, `*-send.stdout.txt`, `*-pop.stdout.txt`, `antigravity-review.*`, `codex-implement.*`, `codex-response.*`, `tests-before-review.*`, `tests-final.*`), estado Git de `demo/`. |
| `/tmp/ias-ai-memory-poc-007-c5_hla_j/` | Verificada | `result.json` (SHA-256 `4e6646242b523f1eed43f6c5f0734117c779dabfa908267bdbdbd020ef2aecf1`), `_poc_logs/fault-injection.json`, `demo/labels.py` (SHA-256 `cfefb68b637ea6a1ec497116ada9cbd63eb1c214d5f7279289a6ef3bb55eda10`), `regression_tests.py`, logs em `_poc_logs/` (`*.exit.txt`, `*-send.stdout.txt`, `*-pop.stdout.txt`, `antigravity-review1.*`, `antigravity-review2.*`, `codex-initial.*`, `codex-correct.*`, `tests-initial.*`, `tests-faulty-public.*`, `tests-red.*`, `tests-green.*`, `tests-final-public.*`), estado Git de `demo/`. |

### 3.3 Fontes ausentes no conjunto consultado

- Registros primários (comandos, logs, manifestos) das POCs 001 a 004.
- Logs de execução, saída textual, código de retorno e estado gravado (`~/.local/state/ai-memory-poc-005/processed.json`) da execução da POC-005.

---

## 4. Matriz de rastreabilidade das POCs

| POC | Evidência primária disponível | Fato verificado diretamente | Resultado reportado (não verificado diretamente) | Limite da evidência |
| --- | --- | --- | --- | --- |
| **POC-001 a POC-004** | Nenhuma no conjunto consultado. | Nenhum registro primário verificado diretamente. | Comunicação via inbox/MCP entre Codex e Antigravity (disponibilidade, envio, consulta, reivindicação, identificação, execução não interativa) reportada em bloco agregado. | Não é possível individualizar entregas por número de POC nem auditar comandos/saídas originais. |
| **POC-005** | Script `poc_ai_memory_005.py`. | Lógica de polling da inbox (`default/luishenriqs-identity-and-access-server`), filtro por `subject` e `body`, bloqueio em ambiguidade, `pop` por ID, persistência local antes do disparo, invocação via `ai-memory run ... antigravity --mode plan --print`, validação de `"POC-005 recebida"` e ausência de retry. | Resultado `PASS` da execução real. | Ausência de stdout/stderr, exit code e arquivo de estado da execução impede confirmar que o script rodou e obteve `PASS`. |
| **POC-006** | Script `poc_ai_memory_006.py` e diretório `/tmp/ias-ai-memory-poc-006-3nvadl13/`. | Ciclo em árvore sintética sem commits; `codex` (v0.170.0) implementou `labels.py`; 5 testes `unittest` passaram (`exit=0`) antes e depois; 2 roundtrips `send`+`pop` via CLI do AI Memory com IDs coincidentes com `result.json` (`01a1f584-ba68-7d60-b10b-d796b2fe6b22` e `01a1f585-214a-7711-a817-b795c7786777`, `exit=0`); `agy --mode plan --print` emitiu `VEREDITO: APROVADO`; Codex gerou `REVIEW_RESPONSE.md`. SHA-256 de `result.json` conferido. | `ias_touched: false` gravado como literal no manifesto pelo despachante. | Mensagens trafegaram na inbox do projeto IAS (`from_agent: "other"`); `send` e `pop` feitos em sequência (~20ms) pelo mesmo despachante; `check_tree` não valida hashes; código já passava nos 5 testes antes da revisão. |
| **POC-007** | Script `poc_ai_memory_007.py` e diretório `/tmp/ias-ai-memory-poc-007-c5_hla_j/`. | Implementação inicial do Codex passou nos 3 testes públicos (`exit=0`); injeção controlada de `split(" ")` registrada em `fault-injection.json` (hashes `clean_pre_injection_sha256` e `faulty_sha256`) manteve 3 testes públicos passando (`exit=0`); `antigravity-review1` emitiu `VEREDITO: AJUSTES` com 4 categorias de contraprovas sem aviso da injeção; `tests-red` registrou 5 testes, 4 falhas e `exit=1`; `codex-correct` alterou para `split()`; `tests-green` (5/5) e `tests-final-public` (3/3) passaram (`exit=0`); SHA-256 final de `labels.py` coincide com `corrected_sha256`; `antigravity-review2` emitiu `VEREDITO: APROVADO`; 4 pares `send`+`pop` via CLI coincidem com `result.json` (`exit=0`). SHA-256 de `result.json` conferido. | Execução bem-sucedida de `test_process_failures()` (o manifesto registra `true`, sem log dedicado da saída desse autoteste); ausência de verificação independente sobre o IAS (`not_independently_verified`). | Mensagens trafegaram na inbox do projeto IAS (`from_agent: "other"`); `send`+`pop` imediatos pelo despachante; sandbox `workspace-write` do Codex incluía `/tmp` inteiro (onde estavam `regression_tests.py` e `_poc_logs/`); autoteste de duplicidade/timeout é estritamente em memória e isolado. |

---

## 5. Avaliação de fidelidade histórica

O relatório `docs/001-relatorio-experimental.md` representa com fidelidade satisfatória:
- **Motivação original:** traduz corretamente a transição entre "mecanismo de comunicação" e necessidade de controle explícito de sequência, efeitos e autorizações entre projetos.
- **Sequência das POCs:** mantém a ordem cronológica 001–007 e evita fabricar granularidade inexistente para o bloco 001–004 ou simular evidência de execução para a POC-005.
- **Resultados observados nas POCs 006 e 007:** números de testes (5 na POC-006; 3 públicos e 5 regressivos com 4 falhas RED / 5 acertos GREEN na POC-007), vereditos (`APROVADO`, `AJUSTES`, `APROVADO`), ausência de segunda sessão do Codex após o parecer final da POC-007, ausência de commits nas árvores sintéticas e hashes SHA-256 dos dois `result.json` conferem exatamente com as evidências primárias.
- **Consistência entre `README.md` e `docs/001-relatorio-experimental.md`:** ambos convergem no escopo, na parceria com o AI Memory, na autoridade humana, na independência frente a IAS/Jungle e no estado atual de preparação documental sem implementação.

**Omissões históricas relevantes para o planejamento futuro:**
1. Uso efetivo do projeto do IAS no AI Memory (`default/luishenriqs-identity-and-access-server`) como inbox de todas as POCs 005–007, e registro de `from_agent: "other"` nos envios da POC-006 e POC-007 (Achado **R1-001**).
2. Ausência de registro da relação histórica e estratégica com o `AI Orchestration Lab` (Achado **R1-002**).
3. Assimetria de conteúdo entre inbox e prompt CLI + truncamento de pareceres nas POCs 006 e 007 (Achado **R1-003**).
4. Mudança de invocação do Antigravity entre POC-005 (`ai-memory run ... antigravity`) e POCs 006–007 (`agy` direto), além do escopo `/tmp` gravável e `approval: never` nos logs do Codex (Achado **R1-004**).

---

## 6. Avaliação das conclusões técnicas

### 6.1 Distinção de limites das conclusões (Critério 5.C)

| Limite avaliado | Avaliação na documentação |
| --- | --- |
| Comunicação por AI Memory vs. orquestração | **Bem diferenciado** (README L3–5; Relatório Seções 2, 5, 10 e 11). |
| Mensagem reivindicada vs. tarefa executada com sucesso | **Bem diferenciado** (Relatório L32 e L130). |
| Sucesso de subprocesso vs. correção funcional | **Diferenciado** (Relatório Seções 6, 9 e 12), embora os exemplos possam ser reforçados pela evidência da POC-007 em que `tests-faulty-public` teve `exit=0` com código defeituoso. |
| Testes locais de duplicidade vs. tolerância real a falhas | **Bem diferenciado** (Relatório L69, L98 e L119). |
| Revisão independente vs. garantia de ausência de defeitos | **Adequado** (Relatório L75 e L123–124 limita conclusões ao caso estudado). |
| Prova de conceito vs. produção | **Bem diferenciado** (README L9–11; Relatório Seções 1, 12, 14 e 15). |
| Isolamento reportado do IAS vs. isolamento comprovado | **Parcialmente adequado**: o relatório distingue bem no nível de repositório/filesystem (L93), mas omite que a inbox do projeto IAS no AI Memory foi utilizada pelas POCs 005–007 (Achado **R1-001**). |

### 6.2 Arquitetura conceitual e responsabilidades (Critério 5.D)

A separação de responsabilidades na Seção 11 do relatório e no `README.md` está **adequada**:
- **AI Memory:** memória persistente, contexto e mensageria (produto independente de Fábio Akita).
- **AI Agent Orchestrator:** coordenação, sequência, processos, estados, limites autorizados, vínculos entre versões e evidências, tratamento de falhas e gates.
- **Codex / Antigravity:** executores e revisores conforme designação e permissões.
- **Humano:** autoridade final sobre escopo, decisões, exceções, homologação e integração.

Nenhuma arquitetura definitiva é imposta indevidamente; as decisões de stack, persistência e transporte permanecem explicitamente em aberto.

### 6.3 Independência e reutilização (Critério 5.E)

- Ambos os documentos apresentam o `AI Agent Orchestrator` como projeto independente de repositórios consumidores (citando IAS, Jungle e projetos futuros como exemplos externos).
- Não há incorporação de regras de domínio do IAS no conceito do orquestrador.
- O AI Memory não é tratado como fonte de autorização operacional (README L5; Relatório L32, L115, L121 e L130).

### 6.4 Relação com o AI Orchestration Lab (Critério 5.F)

Registra-se formalmente neste parecer a **orientação estratégica humana recente**:
- O desenvolvimento futuro será concentrado no **AI Agent Orchestrator**, trabalhando em parceria com o **AI Memory**.
- O **AI Orchestration Lab** deverá ser preservado como **referência histórica**, sem continuidade de implementação ativa prevista.

**Avaliação:** Essa orientação **precisa ser formalizada posteriormente na documentação** (em `README.md` e em nota de contexto no relatório experimental ou documento de governança inicial), identificando-a explicitamente como decisão estratégica humana estabelecida. Sem esse registro, o repositório não documenta sua relação com o trabalho histórico do Lab nem delimita que não há migração automática de contratos ou desenvolvimento paralelo previsto (Achado **R1-002**).

---

## 7. Achados classificados

### R1-001
1. **Identificador:** `R1-001`
2. **Severidade:** `MAJOR`
3. **Arquivo e seção:** `docs/001-relatorio-experimental.md` — Seções 5, 6 e 8 (especialmente L32, L52, L56–58, L67–69 e L93).
4. **Afirmação ou problema analisado:** O relatório discute o isolamento do IAS apenas sob a ótica das árvores Git sintéticas (`ias_touched`) e afirma que os registros das POCs 006 e 007 correlacionam envio e reivindicação, omitindo dois fatos materiais: (a) os scripts das POCs 005, 006 e 007 operaram sobre a inbox do projeto IAS no AI Memory (`default/luishenriqs-identity-and-access-server`); e (b) nas POCs 006 e 007, `ai-memory message send` gravou `"from_agent": "other"` e `"from_owner_user": null` em todas as mensagens, sem identificar o agente remetente na origem.
5. **Evidência disponível:**
   - `poc_ai_memory_005.py` (L15–16), `poc_ai_memory_006.py` (L22–23), `poc_ai_memory_007.py` (L26–27): `WORKSPACE = "default"`, `PROJECT = "luishenriqs-identity-and-access-server"`.
   - Logs `*-send.stdout.txt` e `*-pop.stdout.txt` em `/tmp/ias-ai-memory-poc-006-3nvadl13/_poc_logs/` e `/tmp/ias-ai-memory-poc-007-c5_hla_j/_poc_logs/`: envio `from default/luishenriqs-identity-and-access-server to default/luishenriqs-identity-and-access-server`, com `"from_agent": "other"`, `"from_owner_user": null` e `security_notice` alertando entrada não confiável.
6. **Impacto:** Perda relevante de rastreabilidade técnica. Leva a subestimar o acoplamento de namespace/inbox ocorrido nas POCs e omite uma limitação concreta de proveniência de identidade no uso via CLI do AI Memory, ambas diretamente relevantes para o planejamento do orquestrador.
7. **Correção mínima recomendada:** Registrar explicitamente nas Seções 5, 6 e 8 que as POCs 005–007 usaram o projeto `default/luishenriqs-identity-and-access-server` no AI Memory (diferenciando isolamento da árvore de código do IAS vs. uso da inbox do projeto IAS) e documentar que os envios via CLI nas POCs 006–007 registraram `"from_agent": "other"` e `"from_owner_user": null`, com identificação do agente apenas no parâmetro `--agent` do `pop`.

---

### R1-002
1. **Identificador:** `R1-002`
2. **Severidade:** `MAJOR`
3. **Arquivo e seção:** `README.md` (L1–11) e `docs/001-relatorio-experimental.md` (Seções 1, 2 e 15).
4. **Afirmação ou problema analisado:** A documentação não registra a relação com o repositório `AI Orchestration Lab` nem a orientação estratégica humana recente de concentrar o desenvolvimento futuro no `AI Agent Orchestrator` (em parceria com o AI Memory), mantendo o `AI Orchestration Lab` como referência histórica sem continuidade ativa de implementação prevista.
5. **Evidência disponível:** Leitura integral de `README.md` e `docs/001-relatorio-experimental.md` (zero menções ao `AI Orchestration Lab`); orientação estratégica humana informada no escopo da revisão R1 (Seção 5.F).
6. **Impacto:** Lacuna material de governança e contexto para o planejamento técnico futuro, com risco de ambiguidade sobre escopo, manutenção paralela ou expectativa de migração de contratos do `AI Orchestration Lab`.
7. **Correção mínima recomendada:** Formalizar em nota concisa no `README.md` e no relatório experimental (marcada explicitamente como decisão estratégica humana estabelecida) que o desenvolvimento futuro concentra-se no `AI Agent Orchestrator` em parceria com o AI Memory e que o `AI Orchestration Lab` é preservado apenas como referência histórica, sem continuidade ativa prevista.

---

### R1-003
1. **Identificador:** `R1-003`
2. **Severidade:** `MINOR`
3. **Arquivo e seção:** `docs/001-relatorio-experimental.md` — Seções 6 e 7 (L56–58, L67–69, L73).
4. **Afirmação ou problema analisado:** Embora o relatório informe que a comunicação foi mediada pelo despachante via CLI, omite três características operacionais das POCs 006 e 007: (a) `send` e `pop` foram executados de forma síncrona pelo mesmo processo em ~20 ms; (b) as mensagens de requisição (`REVIEW`, `REVIEW1`, `REVIEW2`) na inbox continham apenas resumos curtos, enquanto especificação, código-fonte, diff e testes foram injetados diretamente pelo despachante no prompt CLI do revisor; e (c) os pareceres trafegados na inbox foram truncados em 25.000 caracteres (POC-006) e 20.000 caracteres (POC-007).
5. **Evidência disponível:** `poc_ai_memory_006.py` (L71–90, L155–178), `poc_ai_memory_007.py` (L101–127, L231–258, L299–318) e timestamps `created_at`/`claimed_at` nos logs `*-pop.stdout.txt`.
6. **Impacto:** Pode induzir leitura imprecisa sobre o volume e o tipo de artefatos efetivamente transportados pela inbox do AI Memory nas POCs e mascarar restrições de payload/truncamento relevantes para o desenho de contratos de mensagem.
7. **Correção mínima recomendada:** Acrescentar uma observação objetiva na Seção 6 (ou Seção 8) detalhando a execução síncrona `send`+`pop`, o fato de que o contexto técnico das requisições foi passado via prompt CLI e o limite de truncamento aplicado aos pareceres.

---

### R1-004
1. **Identificador:** `R1-004`
2. **Severidade:** `MINOR`
3. **Arquivo e seção:** `docs/001-relatorio-experimental.md` — Seção 4 (L23–24) e Seção 12 (L122).
4. **Afirmação ou problema analisado:** A tabela de ferramentas não registra que a POC-005 invoca o Antigravity via wrapper `ai-memory run --require-server --no-autowire --no-exit-prompt antigravity ...`, enquanto as POCs 006 e 007 invocam diretamente o binário `agy`. Tampouco registra parâmetros concretos observados nos logs do Codex (`approval: never`, `sandbox: workspace-write [workdir, /tmp, $TMPDIR]`, `model: gpt-6.2-sol`), em especial o fato de que o sandbox gravável em `/tmp` englobava o diretório pai dos artefatos da POC-007 (`regression_tests.py`, `_poc_logs/`, `result.json`), os quais não eram verificados por `guard_tree`.
5. **Evidência disponível:**
   - `poc_ai_memory_005.py` (L106–110) vs. `poc_ai_memory_006.py` (L170) e `poc_ai_memory_007.py` (L247, L310).
   - Cabeçalhos de `codex-implement.stderr.txt` (POC-006), `codex-initial.stderr.txt` e `codex-correct.stderr.txt` (POC-007); `poc_ai_memory_007.py` (L85–92, L262–264).
6. **Impacto:** Omissão de evidência concreta sobre diferenças de invocação dos executores e sobre o limite real do isolamento de sandbox em `/tmp` observado nas POCs. (Os logs de `codex-correct` não mostram acesso do Codex a `regression_tests.py`, mas a contenção não o impedia tecnicamente.)
7. **Correção mínima recomendada:** Atualizar as linhas de `Codex CLI` e `Antigravity CLI` na Seção 4 para registrar as duas formas de invocação do Antigravity e os parâmetros efetivos do sandbox do Codex (`workspace-write` incluindo `/tmp`, `approval: never`), vinculando essa observação ao risco de contenção na Seção 12.

---

### R1-005
1. **Identificador:** `R1-005`
2. **Severidade:** `MINOR`
3. **Arquivo e seção:** `docs/001-relatorio-experimental.md` — Seções 3, 8, 10, 11 e 13 (L15, L80, L102–135).
4. **Afirmação ou problema analisado:** A Seção 8 define apenas três categorias epistêmicas (`Verificação direta`, `Resultado reportado`, `Inferência`), sem distinguir explicitamente **decisões humanas já estabelecidas**, **hipóteses** e **propostas futuras ainda não homologadas**. Embora o texto use termos cautelosos ("candidata", "proposta"), na Seção 3 diretrizes de independência e propostas de coordenação aparecem no mesmo parágrafo sem marcação diferenciada.
5. **Evidência disponível:** `docs/001-relatorio-experimental.md` (L15, L80, L102–135).
6. **Impacto:** Pequena perda de clareza de governança sobre o que já é diretriz humana consolidada versus o que ainda é proposta técnica sujeita a deliberação.
7. **Correção mínima recomendada:** Expandir a definição de categorias na Seção 8 (ou incluir marcação breve nas Seções 3, 10–13) distinguindo fato verificado diretamente, resultado reportado, interpretação/inferência técnica, hipótese, proposta futura não homologada e decisão humana já estabelecida.

---

### R1-006
1. **Identificador:** `R1-006`
2. **Severidade:** `EDITORIAL`
3. **Arquivo e seção:** `README.md` (L9–11) e `docs/001-relatorio-experimental.md` (cabeçalho e Seções 4 e 8).
4. **Afirmação ou problema analisado:** Os documentos não trazem metadados mínimos de identificação temporal (data de consolidação) e status formal de homologação (ex.: rascunho sujeito a revisão independente e aprovação humana), o que é particularmente útil dado que o relatório referencia artefatos voláteis em `/tmp`.
5. **Evidência disponível:** `README.md` (L1–11) e `docs/001-relatorio-experimental.md` (L1–8, L28, L91).
6. **Impacto:** Sem impacto estrutural; apenas melhoria de rastreabilidade temporal e clareza editorial.
7. **Correção mínima recomendada:** Incluir breve bloco de metadados no topo de `docs/001-relatorio-experimental.md` (data, origem/autoria, status documental) e explicitar no `README.md` que a documentação inicial aguarda revisão/homologação humana.

---

## 8. Contraprovas

| # | Questão de contraprova | Resultado da verificação | Fundamentação |
| --- | --- | --- | --- |
| 1 | **O AI Memory comprovou comunicação direta entre agentes ou apenas transporte de mensagens?** | **Apenas transporte de mensagens mediado** (nas evidências verificadas). | Nas POCs 006 e 007, nem Codex nem Antigravity enviaram ou leram mensagens diretamente no AI Memory; o despachante executou `send` e `pop` via CLI em ~20 ms com `from_agent: "other"`. A comunicação via MCP das POCs 001–004 é apenas resultado reportado, sem evidência primária no conjunto. |
| 2 | **O despachante das POCs comprovou execução automática?** | **Parcialmente / não comprovada de forma assíncrona na POC-005.** | Na POC-005 existe o script de polling/acionamento, mas **há ausência de evidência primária da execução** (sem logs, exit code ou estado); o PASS é reportado. Nas POCs 006 e 007 há evidência direta de encadeamento automático de subprocessos após disparo manual (`--execute`), sem escuta contínua de inbox. |
| 3 | **A POC-006 realmente exercitou uma revisão independente?** | **Sim, com alcance limitado.** | `agy` rodou em processo separado (`--mode plan --print`), sem sessão compartilhada com o Codex, analisando apenas texto/diff/testes fornecidos e emitindo `VEREDITO: APROVADO`. Limitações: a implementação já passava nos 5 testes antes da revisão (não testou detecção de erro), o revisor não executou testes e `check_tree` não conferiu hashes dos arquivos existentes. |
| 4 | **A POC-007 detectou um defeito sem informar ao revisor sua localização?** | **Sim, no caso sintético testado.** | `poc_ai_memory_007.py` (L238–246) não informou a injeção nem enviou `regression_tests.py` na primeira revisão; `antigravity-review1.stdout.txt` retornou `VEREDITO: AJUSTES` com 4 contraprovas concretas contra `split(" ")`. Limitação: função trivial de 4 linhas frente a especificação explícita de whitespace e prompt explicitamente adversarial. |
| 5 | **A correção preservou o comportamento exigido?** | **Sim, no escopo da especificação e dos 8 testes.** | Após alteração para `split()`, `tests-green` (5/5) e `tests-final-public` (3/3) retornaram `exit=0`; o SHA-256 final de `demo/labels.py` coincide com `corrected_sha256` em `result.json`; `guard_tree` preservou arquivos imutáveis; `antigravity-review2` emitiu `VEREDITO: APROVADO`. Não constitui prova formal fora dos casos avaliados. |
| 6 | **Há evidência de recuperação após interrupção real do despachante?** | **Não (ausência de evidência).** | Nenhum experimento simulou queda real (SIGKILL/crash entre `pop`, persistência e execução) nem retomada/conciliação. Os scripts interrompem sem retry. O `test_process_failures()` da POC-007 verifica apenas duplicidade em `set` em memória e `TimeoutExpired` em `time.sleep(2)` isolado. |
| 7 | **Há evidência de suporte simultâneo a múltiplos projetos?** | **Não (ausência de evidência).** | Os três scripts (`005.py`, `006.py`, `007.py`) têm `WORKSPACE = "default"` e `PROJECT = "luishenriqs-identity-and-access-server"` fixos em código, operando em execução única sobre um único projeto. |
| 8 | **Há evidência de gates humanos implementados?** | **Não (ausência de evidência).** | Não há implementação de pausa, aprovação registrada ou gate entre etapas nas POCs; apenas disparo manual via `--execute` nas POCs 006–007 e `approval: never` nas chamadas do Codex. |
| 9 | **O isolamento do IAS foi comprovado independentemente?** | **Não.** | Na POC-006, `ias_touched: false` é literal emitido pelo próprio despachante; na POC-007, o manifesto registra `not_independently_verified`. Não há auditoria externa do repositório IAS, e **a inbox do projeto IAS no AI Memory foi efetivamente utilizada** nas POCs 005–007. |
| 10 | **As limitações estão claramente documentadas?** | **Parcialmente.** | As limitações centrais estão bem registradas (ausência de logs 001–005, mediação por despachante, repositório sintético, autoteste local, `/tmp` volátil), mas faltam pontos materiais identificados nos Achados **R1-001** a **R1-004** (inbox do IAS, `from_agent: "other"`, assimetria/truncamento de payload, sandbox `/tmp` do Codex e divergência `ai-memory run` vs. `agy`). |

---

## 9. Lacunas e limitações de evidência

1. **Ausência de evidências primárias das POCs 001–004:** permanecem exclusivamente como resultado reportado agregado; não há logs, comandos ou manifestos auditáveis.
2. **Ausência de evidências de execução da POC-005:** apenas o script Python foi verificado; não há comprovação direta do `PASS` reportado nem do arquivo `~/.local/state/ai-memory-poc-005/processed.json`.
3. **Volatilidade dos artefatos das POCs 006 e 007:** residem em `/tmp/ias-ai-memory-poc-006-3nvadl13/` e `/tmp/ias-ai-memory-poc-007-c5_hla_j/`, sujeitos a limpeza do sistema operacional.
4. **Ausência de log dedicado do autoteste da POC-007:** `result.json` registra `"duplicate_timeout_no_retry_selftest": true`, mas `test_process_failures()` imprime apenas em `stdout` do despachante (não grava em `_poc_logs/`).
5. **Ausência de versão registrada do Antigravity CLI e do Python 3 experimental:** nenhum log capturou a versão de `agy` ou `python3` utilizada nas execuções (limitação já reconhecida corretamente no relatório).
6. **Escopo experimental restrito:** todas as evidências verificadas referem-se a uma função Python de ~4 linhas em repositórios sintéticos sem commits, sem concorrência real, sem rede e sem regras de um repositório de produção.

---

## 10. Recomendações de saneamento documental

Para encerrar os achados abertos antes da homologação humana da documentação inicial, recomenda-se (em ciclo dedicado e autorizado):

1. **Saneamento prioritário (MAJOR):**
   - Atualizar `docs/001-relatorio-experimental.md` (Seções 5, 6 e 8) para documentar o uso do projeto `default/luishenriqs-identity-and-access-server` no AI Memory nas POCs 005–007 e o registro de `"from_agent": "other"` / `"from_owner_user": null` nos envios das POCs 006–007 (**R1-001**).
   - Atualizar `README.md` e `docs/001-relatorio-experimental.md` para formalizar, como decisão estratégica humana estabelecida, a concentração do desenvolvimento futuro no `AI Agent Orchestrator` (em parceria com o AI Memory) e a preservação do `AI Orchestration Lab` como referência histórica sem continuidade ativa prevista (**R1-002**).
2. **Saneamento complementar (MINOR e EDITORIAL):**
   - Documentar a mediação síncrona `send`+`pop`, a passagem de contexto via prompt CLI e o truncamento de 20k/25k caracteres nos pareceres (**R1-003**).
   - Registrar na Seção 4/12 a diferença de invocação do Antigravity (`ai-memory run` vs. `agy`) e os parâmetros de execução/sandbox do Codex (`approval: never`, `workspace-write` incluindo `/tmp`) (**R1-004**).
   - Expandir a legenda epistêmica da Seção 8 para separar explicitamente decisões humanas estabelecidas, hipóteses e propostas futuras não homologadas (**R1-005**).
   - Adicionar metadados mínimos (data, origem e status documental) ao relatório e nota de status no `README.md` (**R1-006**).

*(Nota: recomendações de saneamento são propostas técnicas desta revisão e não constituem autorização para alteração imediata dos documentos.)*

---

## 11. Parecer conclusivo

**Classificação:** **`AJUSTES NECESSÁRIOS`**

A documentação inicial elaborada pelo Codex possui base factual sólida nas evidências das POCs 006 e 007, linguagem disciplinada quanto a limites e separação conceitual adequada entre AI Memory, orquestrador, agentes e autoridade humana. Não foram encontrados achados `BLOCKER`.

Contudo, em razão dos **2 achados `MAJOR` abertos** (`R1-001` e `R1-002`), **não se recomenda aprovação documental definitiva neste momento**. Após o saneamento desses dois pontos (preferencialmente acompanhado dos ajustes `MINOR` e `EDITORIAL` listados na Seção 10) e conferência em nova rodada breve (R2) ou validação direta pelo responsável humano, a documentação estará apta para homologação como baseline do planejamento técnico.
