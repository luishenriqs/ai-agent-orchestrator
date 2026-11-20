# Auditoria Independente Integral do Repositório — AI Agent Orchestrator (R1)

## 1. Identificação e escopo

- **Projeto:** AI Agent Orchestrator
- **Artefato:** `docs/reviews/005-auditoria-integral-independente-r1.md`
- **Classificação:** Auditoria arquitetural e documental integral, persistente, anterior à homologação humana das diretrizes arquiteturais
- **Agente / Papel:** Antigravity — auditor técnico e arquitetural independente
- **Modo:** AUDITORIA AMPLA INTEGRAL (somente leitura sobre o repositório; criação exclusiva deste relatório)
- **Data da auditoria:** 2026-11-20
- **Escopo:** Leitura integral de todos os 9 documentos Markdown do repositório (fundação experimental e consolidação arquitetural pendente de homologação) e inventário/exame efetivo de todos os 72 artefatos experimentais preservados em `evidence/pocs/005/`, `006/` e `007/`.
- **Restrições respeitadas:** Nenhum arquivo existente foi modificado; nenhum código foi implementado; nenhuma POC foi executada; nenhuma mensagem do AI Memory foi consumida ou alterada; nenhuma operação Git de escrita (`commit`, `push`, `merge`, `tag`) foi realizada; nenhum arquivo externo ao repositório foi consultado.

---

## 2. Baseline Git observada

Verificação direta executada em `$HOME/projects/ai-agent-orchestrator`:

- **Branch ativa:** `main` (sincronizada com `origin/main` via `## main...origin/main`)
- **HEAD:** `eeb3f53a755d7c8b55a6fa606ed3c4ec89d79f91` — `docs: establish AI Agent Orchestrator experimental baseline`
- **Remoto configurado:** `origin git@github.com:luishenriqs/ai-agent-orchestrator` (fetch e push)
  - *Nota de divergência menor registrada sem alteração:* a especificação da auditoria cita a URL HTTPS (`https://github.com/luishenriqs/ai-agent-orchestrator`), enquanto o remoto local efetivamente configurado utiliza SSH (`git@github.com:luishenriqs/ai-agent-orchestrator`), apontando para o mesmo repositório.
- **Arquivos rastreados em `HEAD` (`eeb3f53`):** 78 arquivos (6 documentos Markdown da fundação experimental + 72 artefatos em `evidence/pocs/005/`, `006/` e `007/`).
- **Arquivos não rastreados (`??` na working tree, pendentes de homologação e commit):**
  - `docs/architecture/001-diretrizes-arquiteturais.md` (SHA-256 verificado: `b12cb547d861b4515fd9a3d6d6ab5468fb24864ec79db4ea734b7ba072e3d700`)
  - `docs/reviews/003-revisao-independente-diretrizes-arquiteturais-r1.md` (SHA-256 verificado: `da9cbebfddc934a11e32041f621a0069818e282f580062d400df7baba96fb860`)
  - `docs/reviews/004-revisao-regressiva-diretrizes-arquiteturais-r2.md` (SHA-256 verificado: `22f9cb971758748d16e3b2c62a92d79f2dadaa748f04f565fb1e55d921a0761c`)
- **Arquivos modificados/staged:** nenhum.
- **Arquivos ignorados:** nenhum (não existe `.gitignore` na raiz do repositório).
- **Separação de baselines:** A fundação experimental (`eeb3f53`) está publicada em `main`/`origin/main`; a consolidação arquitetural (`001-diretrizes-arquiteturais.md` e pareceres `003`/`004`) permanece na working tree como *untracked* e **pendente de homologação humana**.

---

## 3. Inventário completo de arquivos examinados

Total de arquivos existentes no repositório antes da criação deste relatório: **81 arquivos** (todos texto UTF-8; 0 arquivos binários; 0 arquivos inacessíveis).

### 3.1 Documentos normativos, históricos, arquiteturais e de revisão (9 arquivos — leitura integral)

| # | Caminho | Status Git | Linhas | Papel no repositório |
| --- | --- | --- | --- | --- |
| 1 | `README.md` | Rastreado (`eeb3f53`) | 13 | Apresentação inicial e decisão estratégica humana |
| 2 | `docs/001-relatorio-experimental.md` | Rastreado (`eeb3f53`) | 175 | Relatório experimental consolidado e saneado (POCs 001–007) |
| 3 | `docs/reviews/001-revisao-independente-r1.md` | Rastreado (`eeb3f53`) | 253 | Parecer R1 do Antigravity sobre a documentação experimental |
| 4 | `docs/reviews/002-revisao-regressiva-r2.md` | Rastreado (`eeb3f53`) | 119 | Parecer regressivo R2 do Antigravity (12/12 achados fechados) |
| 5 | `docs/handoffs/001-handoff-fundacao-experimental.md` | Rastreado (`eeb3f53`) | 92 | Handoff de continuidade da fundação experimental |
| 6 | `evidence/pocs/MANIFEST.md` | Rastreado (`eeb3f53`) | 104 | Inventário, hashes SHA-256, sanitizações e lacunas das POCs |
| 7 | `docs/architecture/001-diretrizes-arquiteturais.md` | Não rastreado (`??`) | 128 | Consolidação das 16 diretrizes arquiteturais (v0.2, pendente de homologação) |
| 8 | `docs/reviews/003-revisao-independente-diretrizes-arquiteturais-r1.md` | Não rastreado (`??`) | 70 | Parecer adversarial R1 sobre `001-diretrizes-arquiteturais.md` (v0.1) |
| 9 | `docs/reviews/004-revisao-regressiva-diretrizes-arquiteturais-r2.md` | Não rastreado (`??`) | 45 | Parecer regressivo R2 sobre `001-diretrizes-arquiteturais.md` (v0.2) + registro do Codex |

### 3.2 Artefatos experimentais preservados (72 arquivos — 100% inventariados e verificados)

Todos os 72 arquivos em `evidence/pocs/005/`, `006/` e `007/` foram verificados quanto a existência, tipo (todos UTF-8 texto), tamanho total (**96.180 bytes**, idêntico ao declarado em `MANIFEST.md` L5), integridade SHA-256 (**72/72 hashes conferem exatamente** com a coluna `SHA-256 preservado` de `MANIFEST.md`), conteúdo dos 12 arquivos sanitizados e varredura contra vazamento de caminhos pessoais (`/home/...`, `/mnt/c/Users/...`), tokens ou endereços locais (`0` vazamentos):

- **`evidence/pocs/005/` (1 arquivo, integral):** `poc_ai_memory_005.py`.
- **`evidence/pocs/006/` (28 arquivos: 23 integrais, 5 sanitizados):**
  - Raiz e `demo/` (5): `poc_ai_memory_006.py`, `result.json`, `demo/labels.py`, `demo/tests/test_labels.py`, `demo/REVIEW_RESPONSE.md`.
  - `_poc_logs/` (23): `git-status.{stdout,exit}.txt`, `POC-006-cd85b48a2fc5-{REVIEW,RESPONSE}-{send,pop}.{stdout,exit}.txt` (sendo os 2 `*-pop.stdout.txt` sanitizados), `POC-006-cd85b48a2fc5-RESPONSE-send.stderr.txt` (sanitizado), `codex-{implement,response}.{stdout,stderr,exit}.txt` (sendo os 2 `*.stderr.txt` sanitizados), `antigravity-review.{stdout,exit}.txt`, `tests-{before-review,final}.{stderr,exit}.txt`.
- **`evidence/pocs/007/` (43 arquivos: 36 integrais, 7 sanitizados):**
  - Raiz e `demo/` (5): `poc_ai_memory_007.py`, `result.json`, `regression_tests.py`, `demo/labels.py`, `demo/tests/test_labels.py`.
  - `_poc_logs/` (38): `fault-injection.json`, `REVIEW{1,2}-{send,pop}.{stdout,exit}.txt` e `REVIEW{1,2}-RESPONSE-{send,pop}.{stdout,exit}.txt` (sendo os 4 `*-pop.stdout.txt` sanitizados), `REVIEW1-RESPONSE-send.stderr.txt` (sanitizado), `codex-{initial,correct}.{stdout,stderr,exit}.txt` (sendo os 2 `*.stderr.txt` sanitizados), `antigravity-review{1,2}.{stdout,exit}.txt`, `tests-{initial,faulty-public,red,green,final-public}.{stderr,exit}.txt`.

---

## 4. Metodologia de auditoria

1. **Verificação da baseline Git e inventário físico:** confirmação de `HEAD`, branch, remoto, arquivos rastreados, não rastreados e ignorados, sem mutação do repositório.
2. **Leitura integral sequencial:** leitura completa dos 9 documentos Markdown sem depender de resumos ou buscas parciais.
3. **Auditoria automatizada somente-leitura do acervo experimental:** validação de contagem (72/72), tipo UTF-8, soma de bytes (96.180), hashes SHA-256 (72/72) contra `MANIFEST.md`, inspeção dos 12 arquivos sanitizados e busca por vazamentos de dados sensíveis.
4. **Confronto cruzado e adversarial:** comparação sistemática das 16 diretrizes (`DEC-01` a `DEC-16`), das seções normativas de `001-diretrizes-arquiteturais.md`, dos pareceres `001`–`004`, do relatório experimental e das evidências das POCs, separando rigorosamente decisões humanas, fatos verificados, relatos, propostas e inferências.
5. **Calibração de achados:** distinção entre questões deliberadamente abertas para o planejamento (Seção 15 das diretrizes) e lacunas/ambiguidades concretas que impactam a homologação ou a abertura do planejamento técnico.

---

## 5. Hierarquia e confiabilidade das fontes

| Nível | Categoria | Fontes no repositório | Confiabilidade e limite |
| --- | --- | --- | --- |
| 1 | **Decisões humanas expressamente aprovadas** | Diretrizes estratégicas em `README.md` (L7–9), `001-relatorio-experimental.md` (L17, L23), `001-handoff-fundacao-experimental.md` (Seção 6); diretrizes `DEC-01`–`DEC-16` consolidadas em `001-diretrizes-arquiteturais.md` (Seção 4). | **Ressalva importante:** `001-diretrizes-arquiteturais.md` ainda está **pendente de homologação humana** (Seção 1, L6), e a fonte temporária `decisoes-delegacao.md` citada em `003` (L12) não está no repositório. A fidelidade das `DEC-01`–`DEC-16` ao texto original foi atestada pelos pareceres `003`/`004`, mas sua vigência normativa formal depende do ato de homologação humana. |
| 2 | **Evidências experimentais primárias verificáveis** | 72 artefatos em `evidence/pocs/005/`, `006/`, `007/` e hashes em `MANIFEST.md`. | **Alta** dentro do escopo sintético (72/72 SHA-256 conferidos). Limitada à função `normalize_label`, repositórios temporários sem commits e 12 arquivos com sanitização documentada. |
| 3 | **Consolidação experimental auditada** | `docs/001-relatorio-experimental.md`, `docs/handoffs/001-handoff-fundacao-experimental.md`. | **Alta** — verificadas contra os artefatos primários e aprovadas em R2 (`002`). |
| 4 | **Pareceres independentes (recomendações)** | `docs/reviews/001`, `002`, `003`, `004`. | **Insumos técnicos independentes**, não equivalentes a homologação humana. `004` foi executada sobre texto no prompt sem ferramentas, com hash final confirmado nesta auditoria. |
| 5 | **Resultados reportados sem evidência primária completa** | POCs 001–004 (cronologia) e execução/PASS da POC-005 (em `001-relatorio-experimental.md` Seções 6 e 8; `MANIFEST.md` L100–101). | **Moderada/limitada** — atribuídos ao relato da sessão experimental acompanhada pelo GPT; impossível auditar comandos ou saídas originais. |
| 6 | **Propostas técnicas, inferências e hipóteses** | Seções 10, 11, 13–15 do relatório experimental; Seções 6–12 e 15–16 de `001-diretrizes-arquiteturais.md`; `evidence/pocs/` como contrato definitivo. | **Pendentes de deliberação/planejamento** — não constituem compromissos de implementação nem arquitetura definitiva. |

---

## 6. Resumo executivo

A auditoria integral confirmou que o repositório `ai-agent-orchestrator` apresenta uma fundação experimental excepcionalmente bem documentada e auditável (`eeb3f53`, 72/72 artefatos íntegros, 96.180 bytes exatos, zero vazamentos de dados sensíveis) e uma consolidação arquitetural (`docs/architecture/001-diretrizes-arquiteturais.md`, v0.2, SHA-256 `b12cb547...`) concisa, coerente, fiel ao princípio de simplicidade (`DEC-01`) e livre de contradições graves ou sobreengenharia prematura.

Não foram identificados achados **`BLOCKER`** nem **`MAJOR`**. Foram identificados **6 achados** (**4 `MINOR`** e **2 `EDITORIAL`**):
- **`AUD-001` (MINOR):** Necessidade de contrato explícito de isolamento Git e de sandbox para a área temporária na raiz do projeto consumidor (`DEC-06` vs. `DEC-16` e risco observado na POC-007).
- **`AUD-002` (MINOR):** Ambiguidade operacional residual no ponto de entrada canônico do gate inicial entre prompt manual direto ao executor (`DEC-02`) e validação prévia pelo orquestrador (`DEC-09`, Seção 6 passo 1).
- **`AUD-003` (MINOR):** Ausência no repositório do documento temporário `decisoes-delegacao.md` citado em `003`, tornando o ato explícito de homologação humana de `001-diretrizes-arquiteturais.md` essencial para consolidar a fonte normativa primária.
- **`AUD-004` (MINOR):** Fronteira de V1 não explicitamente fechada para *interface web* e *automação de operações Git/GitHub*, que constam em aberto sem indicar se pertencem à V1 ou a versões posteriores.
- **`AUD-005` (EDITORIAL):** O relatório experimental classifica a versão `3.4.7` do AI Memory como apenas informada na tarefa, embora 2 logs preservados em `evidence/pocs/` comprovem diretamente `version="3.4.7"`.
- **`AUD-006` (EDITORIAL):** `README.md` ainda exibe o status de 2026-11-19 pré-commit/pré-R2 (esperado pelo congelamento histórico de `eeb3f53`, devendo ser atualizado após a homologação das diretrizes).

**Veredito independente:** **`SUFICIENTE COM RESSALVAS — RECOMENDO HOMOLOGAÇÃO CONDICIONADA`**. As diretrizes arquiteturais estão prontas para homologação humana, condicionada a que as 4 ressalvas `MINOR` sejam explicitamente endereçadas na homologação e na abertura do planejamento técnico.

---

## 7. Reconstrução completa dos objetivos do projeto

Com base em `README.md` (L3–9), `001-relatorio-experimental.md` (Seções 2–3), `001-handoff-fundacao-experimental.md` (Seções 2–3) e `001-diretrizes-arquiteturais.md` (Seções 1–2, 4 e 16):

- **Problema a resolver:** No desenvolvimento assistido por múltiplos agentes de IA (como Codex e Antigravity), o responsável humano precisa manualmente transferir contexto, acionar o executor adequado, encaminhar alterações para revisão independente, acompanhar correções e reunir evidências para tomada de decisão. Um canal de mensageria isolado (como o AI Memory) resolve a troca de informações, mas não controla sequência, estado operacional, escopo, integridade de versões nem gates de autorização (`001-relatorio-experimental.md` L15; `001-diretrizes-arquiteturais.md` L13).
- **Atividades humanas a reduzir/automatizar:** Transporte manual de solicitações, contexto, artefatos e pareceres entre agentes; acionamento sequencial de executores e revisores; coleta e correlação de evidências por etapa; preparação de relatórios e referências para decisão humana (`001-handoff-fundacao-experimental.md` L14; `001-diretrizes-arquiteturais.md` L13, L29, L61).
- **Benefício operacional esperado:** Fluxo sequencial local, simples, seguro, auditável e reutilizável em diferentes projetos (IAS, Jungle e projetos futuros), reduzindo atrito manual sem sacrificar controle humano nem introduzir infraestrutura distribuída desnecessária (`DEC-01`, `DEC-08`, `DEC-16`).
- **Limite de autonomia dos agentes:** Agentes atuam estritamente dentro do papel, repositório, baseline e escopo autorizados; podem solicitar a próxima operação e entregar resultados verificáveis, mas **não** podem ampliar escopo, ultrapassar gates, autoautorizar execuções, homologar entregas ou repetir operações potencialmente irreversíveis sob incerteza material (`DEC-03`, `DEC-09`, `DEC-12`, `DEC-14`; `001-diretrizes-arquiteturais.md` Seções 5, 10 e 13).
- **Critérios de sucesso da primeira versão (planejamento/arquitetura mínima — `001-diretrizes-arquiteturais.md` Seção 16, L120–126):**
  1. Receber tarefa autorizada, isolar contexto do projeto consumidor e coordenar Codex e Antigravity em sequência com transições verificáveis.
  2. Trocar referências curtas com o AI Memory (produto auxiliar independente), verificar autorização humana por fonte própria, fixar versões imutáveis de artefatos e manter revisão independente com vínculo achado–correção–regressão.
  3. Preservar histórico estruturado, permitir recuperação da última etapa comprovada após interrupção e encaminhar efeitos incertos ao humano.
  4. Respeitar gates humanos, promover/preservar registros antes de limpar áreas temporárias e permitir continuidade entre sessões via handoff sem depender do histórico conversacional.
  5. Operar localmente de forma simples para Codex e Antigravity, admitindo futura incorporação controlada de novos executores sem framework prematuro.

---

## 8. Matriz das decisões humanas

### 8.1 Decisões estratégicas da fundação experimental (já estabelecidas e publicadas em `eeb3f53`)

| ID | Enunciado fiel | Fonte e seção | Status de aprovação |
| --- | --- | --- | --- |
| **EST-01** | Desenvolver o AI Agent Orchestrator como aplicação independente, reutilizável em diferentes projetos (IAS, Jungle e futuros) e complementar ao AI Memory. | `README.md` L3–7; `001-handoff-fundacao-experimental.md` Seção 6 (L47) | **Decisão humana estabelecida** |
| **EST-02** | Preservar autoridade humana final sobre escopo, execução, decisões, homologação e integração; mensagens no AI Memory são insumo técnico. | `README.md` L5; `001-handoff-fundacao-experimental.md` Seção 6 (L48) | **Decisão humana estabelecida** |
| **EST-03** | Concentrar desenvolvimento futuro no AI Agent Orchestrator em parceria com o AI Memory; preservar o AI Orchestration Lab como referência histórica sem continuidade ativa prevista. | `README.md` L9; `001-relatorio-experimental.md` Seção 2 (L17); `001-handoff-fundacao-experimental.md` Seção 6 (L49) | **Decisão humana estabelecida** |
| **EST-04** | Condicionar exclusão, alteração ou migração de artefatos/contratos do AI Orchestration Lab a autorização específica, sem presumir equivalência funcional. | `README.md` L9; `001-relatorio-experimental.md` L17; `001-handoff-fundacao-experimental.md` Seção 6 (L50) | **Decisão humana estabelecida** |

### 8.2 As 16 diretrizes arquiteturais (`DEC-01` a `DEC-16`)

*Nota de status:* Todas as 16 diretrizes abaixo constam em `docs/architecture/001-diretrizes-arquiteturais.md` (Seção 4, L26–43) como consolidação das diretrizes comunicadas pelo responsável humano, com parecer favorável em `004` (R2), mas o documento inteiro permanece **pendente de homologação documental humana** (Seção 1, L6).

| ID | Enunciado fiel (síntese fiel à Seção 4) | Fonte e seção | Status de aprovação | Motivação técnica | Consequência operacional | Dependências / questões pendentes |
| --- | --- | --- | --- | --- | --- | --- |
| **DEC-01** | Começar com ferramenta local, simples de projetar, implementar, manter e operar, evitando abstrações prematuras, infraestrutura distribuída e funcionalidades especulativas, mantendo controles mínimos de integridade, segurança, autorização e rastreabilidade. | `001-diretrizes-arquiteturais.md` Seção 4 (L28), Seção 2 (L15), Seção 16 (L126) | Comunicada pelo humano; **homologação documental pendente** | Reduzir custo de construção/operação e evitar sobreengenharia antes de validar o fluxo real. | Arquitetura local-first; toda complexidade extra exige justificativa por risco concreto ou requisito aprovado. | Escolha de linguagem, persistência local e interface mínima (Seção 15). |
| **DEC-02** | ChatGPT apoia o humano no planejamento, análise e gates. Início manual com prompt autorizado e autocontido (escopo, baseline, fontes, responsabilidades, limites, critérios) para executor designado; retorno ao ChatGPT pode ser manual; V1 dispensa integração automática obrigatória ao ChatGPT. | `001-diretrizes-arquiteturais.md` Seção 4 (L29), Seção 5 (L50), Seção 6 (L57) | Comunicada pelo humano; **homologação documental pendente** | Manter humano e ChatGPT na camada estratégica sem acoplar V1 à API/UI do ChatGPT. | Elimina dependência de integração automática com ChatGPT na V1; exige formato claro de prompt autorizado e relatório final. | Articulação exata entre prompt manual e registro prévio no orquestrador (`AUD-002`). |
| **DEC-03** | AI Memory permanece independente e auxilia em comunicação e memória persistente; orquestrador coordena e verifica contexto/autorização antes de agir; mensagens isoladas não autorizam execução; entrega assíncrona confiável em produção segue por demonstrar. | `001-diretrizes-arquiteturais.md` Seção 4 (L30), Seção 5 (L51), Seção 7 (L67), Seção 13 (L97), Seção 16 (L123) | Comunicada pelo humano; **homologação documental pendente** | Evitar acoplamento ao produto de terceiros e impedir escalada de privilégio via prompt injection em mensagens. | Orquestrador mantém fonte própria de autorização/estado; mensagens do AI Memory são tratadas como entrada não confiável. | Contratos CLI vs. MCP e estratégia de verificação de proveniência (Seção 15). |
| **DEC-04** | Privilegiar mensagens pequenas e estruturadas indicando ação solicitada e referenciando artefatos locais vinculados à tarefa; conteúdo técnico completo fica nos documentos. | `001-diretrizes-arquiteturais.md` Seção 4 (L31), Seção 7 (L67–69), Seção 16 (L123) | Comunicada pelo humano; **homologação documental pendente** | Superar limites de payload/truncamento (20k/25k chars nas POCs) e manter documentos como fonte completa. | Mensagens da inbox servem como ponteiros/sinais estruturados; validação prévia de referências antes do uso. | Schema, campos obrigatórios, versionamento de payload e protocolo (Seção 15). |
| **DEC-05** | Dar identidade verificável aos documentos usados na coordenação e preservar imutabilidade das versões empregadas em revisão; cada parecer aponta a versão exata examinada; hashes comprovam identidade/integridade de conteúdo. | `001-diretrizes-arquiteturais.md` Seção 4 (L32), Seção 8 (L73), Seção 13 (L95–96) | Comunicada pelo humano; **homologação documental pendente** | Evitar divergência entre código testado, versão revisada e versão corrigida (risco identificado nas POCs). | Toda correção gera nova versão vinculada à anterior; versões revisadas ficam imutáveis enquanto retidas. | Identificação lógica, snapshot pré-commit e armazenamento físico (Seção 15). |
| **DEC-06** | Admitir área temporária na raiz do projeto consumidor, segregada por tarefa, para instruções, intermediários, revisões e artefatos; limpar só após encerramento autorizado e preservação dos registros necessários; registros de retomada/auditoria devem ter destino durável fora dela. | `001-diretrizes-arquiteturais.md` Seção 4 (L33), Seção 12 (L91), Seção 13 (L96) | Comunicada pelo humano; **homologação documental pendente** | Organizar artefatos transitórios perto do projeto sem perder rastreabilidade nem poluir o repositório permanentemente. | Separação obrigatória entre área transitória e destino durável; limpeza condicionada a gate e promoção. | Nomenclatura, estrutura interna, retenção e isolamento Git/sandbox (`AUD-001`, Seção 15). |
| **DEC-07** | Promover artefatos relevantes a destinos persistentes do projeto (handoffs, reviews, evidence, documentação técnica), preservando associação tarefa–versões–resultados–evidências; inclusão em Git é seletiva. | `001-diretrizes-arquiteturais.md` Seção 4 (L34), Seção 12 (L91) | Comunicada pelo humano; **homologação documental pendente** | Garantir auditabilidade durável sem versionar ruído transitório no Git. | Pipeline explícito de promoção antes da limpeza da área temporária. | Destinos concretos, critérios de seleção Git e política de retenção/acesso (Seção 15). |
| **DEC-08** | Favorecer execução sequencial na V1 e evitar concorrência na mesma tarefa; executor solicita próxima operação e orquestrador valida transição antes de acionar próximo executor; uma única execução ativa global é opção inicial a considerar. | `001-diretrizes-arquiteturais.md` Seção 4 (L35), Seção 6 (L63), Seção 16 (L122) | Comunicada pelo humano; **homologação documental pendente** | Minimizar condições de corrida e simplificar controle de estado na V1. | Sem paralelismo intra-tarefa; espera assíncrona pode existir sem concorrência na mesma tarefa. | Limite de execuções ativas no orquestrador e mecanismo de espera (Seção 15). |
| **DEC-09** | Centralizar no orquestrador estado operacional, sequência, executor designado, validação de transições, cumprimento do escopo e encaminhamento a gates; ampliação de escopo e passagem por gates exigem autorização aplicável. | `001-diretrizes-arquiteturais.md` Seção 4 (L36), Seção 5 (L52), Seção 6 (L57–59), Seção 10 (L83) | Comunicada pelo humano; **homologação documental pendente** | Evitar autoridade difusa entre agentes e garantir ponto único de controle normativo. | Agentes propõem/executam; apenas o orquestrador valida e avança transições. | Mecanismo concreto de verificação de escopo e autorização inicial (`AUD-002`, Seção 15). |
| **DEC-10** | Manter histórico estruturado por tarefa; orquestrador centraliza e valida transições; histórico identifica última etapa comprovadamente concluída e operações com conclusão incerta; texto livre apenas complementa registros estruturados. | `001-diretrizes-arquiteturais.md` Seção 4 (L37), Seção 9 (L77), Seção 13 (L96) | Comunicada pelo humano; **homologação documental pendente** | Eliminar fragilidade de controle baseado em parsing de texto livre (limitação observada nas POCs). | Toda decisão de transição e retomada lê registros estruturados, não prose livre. | Schema de eventos e nomenclatura de estados (Seção 15). |
| **DEC-11** | Preservar estado suficiente para analisar e retomar interrupções; adotar histórico autoritativo de eventos e estado atual reconstruível/reconciliável; arquivos locais são opção a avaliar; banco/mensageria/infra distribuída fora das decisões desta etapa. | `001-diretrizes-arquiteturais.md` Seção 4 (L38), Seção 9 (L77–79), Seção 16 (L124) | Comunicada pelo humano; **homologação documental pendente** | Permitir auditoria e retomada determinística mantendo simplicidade local. | Fonte de verdade baseada em log autoritativo de eventos + estado derivável/reconciliável. | Escolha de armazenamento local (ex.: JSONL/SQLite) e algoritmo de reconciliação (Seção 15). |
| **DEC-12** | Tornar reconhecíveis falhas de processo, reinicializações inesperadas, limites de tokens e interrupções de contexto; na retomada consultar eventos, artefatos e efeitos comprovados; ausência de registro de conclusão não autoriza repetir operação irreversível; incerteza material interrompe e escala ao humano. | `001-diretrizes-arquiteturais.md` Seção 4 (L39), Seção 11 (L87), Seção 13 (L96), Seção 16 (L124) | Comunicada pelo humano; **homologação documental pendente** | Impedir corrupção silenciosa ou repetição perigosa após crashes/timeouts/limites de contexto. | Política fail-closed sob incerteza material; recuperação automática deliberadamente limitada. | Classificação de operações irreversíveis, detecção de processos órfãos e timeouts (Seção 15). |
| **DEC-13** | Preservar continuidade entre sessões por handoff com estado comprovado, artefatos, evidências e próximo passo, validável a partir dos registros persistidos mesmo sem contexto conversacional anterior. | `001-diretrizes-arquiteturais.md` Seção 4 (L40), Seção 11 (L87), Seção 16 (L125) | Comunicada pelo humano; **homologação documental pendente** | Garantir resiliência à perda de janela de contexto ou troca de instância de agente. | Handoffs estruturados e validados pelo orquestrador na retomada. | Formato e ciclo de vida dos handoffs por tarefa (Seção 15). |
| **DEC-14** | Preservar independência entre elaboração, implementação e revisão; Codex e Antigravity podem assumir papéis distintos conforme designação; parecer identifica versão analisada e traz achados verificáveis; correções vinculadas a achados e revisão regressiva; homologação é humana. | `001-diretrizes-arquiteturais.md` Seção 4 (L41), Seção 5 (L53), Seção 6 (L60), Seção 13 (L95), Seção 16 (L123) | Comunicada pelo humano; **homologação documental pendente** | Evitar viés de autorrevisão e assegurar rastreabilidade achado → correção → regressão (demonstrada na POC-007). | Separação de papéis por etapa; revisor nunca é o mesmo executor da versão analisada. | Formato estruturado mínimo de achados e pareceres (Seção 15). |
| **DEC-15** | Permitir futura incorporação de executores com extensibilidade controlada; planejar inicialmente para Codex e Antigravity (exercitados nas POCs) e evitar framework genérico prematuro. | `001-diretrizes-arquiteturais.md` Seção 4 (L42), Seção 15 (L113), Seção 16 (L126) | Comunicada pelo humano; **homologação documental pendente** | Evitar lock-in nos dois agentes atuais sem pagar custo de abstração prematura. | Adaptadores simples para Codex e Antigravity com contrato mínimo de entrada/saída. | Condições mínimas de integração de executores (Seção 15). |
| **DEC-16** | Manter o orquestrador independente dos projetos consumidores e de suas regras de domínio; vincular cada integração ao contexto, repositório e autorizações da tarefa; namespace do IAS é apenas registro histórico das POCs e fica fora da seleção automática. | `001-diretrizes-arquiteturais.md` Seção 4 (L43), Seção 13 (L96–97), Seção 16 (L122) | Comunicada pelo humano; **homologação documental pendente** | Garantir reutilização limpa em IAS, Jungle e projetos futuros, evitando vazamento entre projetos. | Nenhum default hardcoded de projeto consumidor (proibindo repetição do padrão das POCs 005–007). | Registro de projetos autorizados e mapeamento de namespaces/workspaces (Seção 15). |

---

## 9. Matriz de requisitos e invariantes

| Categoria | Descrição | Origem (Explícito / Inferido) | Referência documental |
| --- | --- | --- | --- |
| **Requisito funcional** | Vincular cada tarefa a ID, projeto autorizado, repositório, baseline, escopo, papel/executor, limites e autorização humana verificável. | **Explícito** | `001-relatorio-experimental.md` Seção 13 #1; `001-diretrizes-arquiteturais.md` Seção 6 #1, Seção 13 |
| **Requisito funcional** | Coordenar execução sequencial entre Codex e Antigravity com validação de transição, revisão independente, correção vinculada a achados e verificação regressiva. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-08`, `DEC-14`, Seção 6, Seção 16 #1–2 |
| **Requisito funcional** | Trocar mensagens curtas estruturadas com referências a artefatos locais imutáveis, validando pertencimento ao projeto/tarefa, versão e etapa ativa. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-04`, `DEC-05`, Seção 7 |
| **Requisito funcional** | Promover artefatos relevantes (`handoffs`, `reviews`, `evidence`, docs) antes de limpar área temporária segregada por tarefa. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-06`, `DEC-07`, Seção 12 |
| **Requisito funcional** | Gerar handoff validável a partir de registros persistidos para continuidade entre sessões. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-13`, Seção 11 |
| **Requisito não funcional** | Simplicidade operacional e estrutural local-first, sem infraestrutura distribuída ou framework genérico prematuro. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-01`, `DEC-11`, `DEC-15`, Seção 2 |
| **Requisito não funcional** | Extensibilidade controlada para inclusão futura de outros executores além de Codex e Antigravity. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-15`, Seção 15, Seção 16 #5 |
| **Segurança** | Tratar mensagens recebidas e pareceres como entradas não confiáveis; verificar origem, destino, correlação, duplicidade e ordenação. | **Explícito** | `001-relatorio-experimental.md` Seção 12–13; `001-diretrizes-arquiteturais.md` `DEC-03`, Seção 7 |
| **Segurança** | Reduzir dados sensíveis em cópias compartilhadas de evidências, mantendo rastreabilidade de supressões e hashes. | **Explícito** | `001-relatorio-experimental.md` Seção 13 #7, Seção 15; `MANIFEST.md` L11–12 |
| **Segurança** | Proteger artefatos de controle/avaliação (logs, estado, testes regressivos) contra escrita acidental pelo sandbox do executor. | **Inferido** (a partir do risco documentado da POC-007) | `001-relatorio-experimental.md` Seção 12 (L144); `001-diretrizes-arquiteturais.md` Seção 14 (L103) |
| **Autorização** | Autorização humana verificável por fonte própria (não por mensagem isolada do AI Memory) para início, mudança de escopo, gates e homologação. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-03`, `DEC-09`, Seção 10, Seção 16 #2 |
| **Restrição arquitetural** | AI Memory permanece produto independente; banco, mensageria e infraestrutura distribuídos fora desta etapa; regras de domínio fora do núcleo do orquestrador. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-03`, `DEC-11`, `DEC-16`, Seção 13 |
| **Rastreabilidade** | Histórico estruturado por tarefa ligando operação, responsável, versão examinada (imutável, verificável por hash), resultado e evidência; distinção entre reivindicação e conclusão. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-05`, `DEC-10`, Seções 8–9 |
| **Persistência** | Histórico autoritativo de eventos + estado atual reconstruível ou reconciliável; destino durável obrigatório fora da área temporária. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-06`, `DEC-11`, Seções 9 e 12 |
| **Isolamento entre projetos** | Contexto, repositório, namespace e autorizações segregados por tarefa; proibição de reuso automático do namespace do IAS. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-16`, Seção 13 |
| **Condições de parada** | Interromper e escalar ao humano diante de incerteza material, efeito anterior indeterminado em operação potencialmente irreversível, referência fora de escopo ou gate obrigatório. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-12`, Seções 7, 10 e 11 |
| **Condições de recuperação** | Na retomada, o orquestrador revalida contexto/escopo e reconcilia histórico autoritativo, artefatos e efeitos observáveis antes de autorizar o executor a prosseguir. | **Explícito** | `001-diretrizes-arquiteturais.md` `DEC-11`, `DEC-12`, `DEC-13`, Seção 11 |
| **Invariantes positivas** | Preservar autorização verificável, vínculo projeto/baseline, escopo do executor, independência da revisão, identidade/imutabilidade das versões e vínculo evento–resultado–evidência. | **Explícito** | `001-diretrizes-arquiteturais.md` Seção 13 (L95) |
| **Invariantes negativas** | Impedir escrita/execução fora de escopo, passagem por gate sem autorização, substituição silenciosa de versão revisada, reuso automático de namespace alheio, repetição insegura sob efeito incerto, controle só por texto livre e área temporária como destino durável único. | **Explícito** | `001-diretrizes-arquiteturais.md` Seção 13 (L96) |

---

## 10. Descrição integral do fluxo operacional

Reconstrução do ciclo completo a partir de `001-diretrizes-arquiteturais.md` (Seções 4, 6–12) e `001-relatorio-experimental.md` (Seções 6 e 10):

| Passo | Etapa do fluxo | Status empírico | Descrição e referências |
| --- | --- | --- | --- |
| 1 | **Preparação da tarefa (Humano + ChatGPT)** | **Manual / fora do orquestrador** | Humano e ChatGPT definem escopo, baseline, fontes, responsabilidades, limites e critérios de conclusão (`DEC-02`, Seção 5). |
| 2 | **Emissão do prompt inicial autorizado** | **Planejado (gate inicial)** | Humano emite prompt autorizado autocontido. Antes de qualquer ação coordenada, o orquestrador registra e valida tarefa, escopo, repositório, baseline, executor, limites e critérios a partir de autorização verificável (`001-diretrizes-arquiteturais.md` Seção 6 #1, Seção 10). *Ver `AUD-002`.* |
| 3 | **Recebimento pelo executor inicial** | **Demonstrado em POC sintética (006/007)** | Executor (ex.: Codex) é acionado em modo não interativo dentro do escopo autorizado (`poc_ai_memory_006.py`, `007.py`; `DEC-08`). |
| 4 | **Verificação do escopo e das fontes** | **Parcialmente demonstrado (POC-007 `guard_tree`) / Planejado** | Conferência de baseline, arquivos permitidos e integridade. Nas POCs 006–007, cobertura parcial (apenas árvore `demo/`); no orquestrador, validação centralizada antes e depois da etapa (`DEC-09`, Seção 6 #3). |
| 5 | **Produção dos artefatos** | **Demonstrado em POC sintética (006/007)** | Executor produz alterações/documentos, versão imutável dos artefatos e evidências de validação local (`001-diretrizes-arquiteturais.md` Seção 6 #2, Seção 8). |
| 6 | **Solicitação de revisão independente** | **Parcialmente demonstrado (POCs 006/007 via CLI síncrono) / Planejado (referências curtas)** | Executor ou orquestrador registra solicitação estruturada curta apontando tarefa e versão exata fixada; orquestrador valida transição e referências (`DEC-04`, `DEC-05`, `DEC-08`, Seção 7). |
| 7 | **Encaminhamento ao próximo executor (Revisor)** | **Demonstrado em POC sintética (006/007)** | Orquestrador aciona revisor independente (ex.: Antigravity em modo somente leitura/plan) sobre a versão fixada (`DEC-14`, Seção 6 #4). |
| 8 | **Tratamento dos achados** | **Demonstrado em POC sintética (006 resposta / 007 correção)** | Parecer identifica versão e achados verificáveis (com contraprovas quando aplicável); orquestrador valida transição e encaminha ao executor responsável pela correção (`DEC-14`, `001-relatorio-experimental.md` Seção 6). |
| 9 | **Correção e revisão regressiva** | **Demonstrado em POC sintética (007 RED/GREEN + review2)** | Correção gera nova versão vinculada à versão revisada e aos achados; testes e revisor independente executam verificação regressiva (`DEC-05`, `DEC-14`, Seção 6 #4, Seção 8). |
| 10 | **Geração dos relatórios finais** | **Planejado** | Orquestrador consolida histórico estruturado, versões, pareceres, evidências e pendências em relatório rastreável (`DEC-02`, `DEC-10`, Seção 6 #5). |
| 11 | **Encaminhamento ao gate humano** | **Planejado (não demonstrado nas POCs)** | Fluxo pausa no gate e apresenta ao responsável humano (com apoio manual do ChatGPT, se desejado) o que está comprovado ou pendente (`DEC-02`, `DEC-09`, Seção 10). |
| 12 | **Homologação e eventual integração Git** | **Planejado (não demonstrado nas POCs)** | Humano decide homologação e autoriza explicitamente efeitos externos ou operações Git (`DEC-09`, `DEC-14`, `README.md` L5). *Ver `AUD-004`.* |
| 13 | **Preservação das evidências e encerramento** | **Parcialmente demonstrado (preservação manual em `evidence/pocs/`) / Planejado (automação)** | Promoção dos registros relevantes a destinos duráveis (`handoffs`, `reviews`, `evidence`, docs), limpeza da área temporária somente após encerramento autorizado e emissão de handoff se necessário (`DEC-06`, `DEC-07`, `DEC-13`, Seção 12). |

---

## 11. Responsabilidades dos atores

| Ator | Responsabilidades previstas | Fontes | Sobreposições ou ambiguidades identificadas |
| --- | --- | --- | --- |
| **Responsável humano** | Autoridade final: autorizar escopo e início, decidir gates e exceções, homologar entregas, autorizar integração Git e deliberações sobre o Lab. | `README.md` L5; `001-diretrizes-arquiteturais.md` Seção 5 (L49), Seção 10 | Nenhuma sobreposição de autoridade. Apenas definir no planejamento o formato verificável da autorização humana no gate inicial (`AUD-002`). |
| **ChatGPT** | Apoiar o humano no planejamento, preparação de prompts, análise de entregas e decisão nos gates; recebe relatórios/referências manualmente. Fora do ciclo automático na V1. | `001-diretrizes-arquiteturais.md` `DEC-02`, Seção 5 (L50) | Fronteira clara. Não possui autoridade de execução nem integração automática na V1. |
| **AI Agent Orchestrator** | Centro operacional: validar contexto e autorização, designar executores, validar transições e escopo, manter histórico autoritativo e estado, gerenciar interrupções/retomada, promover evidências e aplicar gates. | `001-diretrizes-arquiteturais.md` `DEC-09`, Seção 5 (L52), Seções 6–12 | Fronteira coerente com os demais atores após o saneamento R2 (`004`). Resta precisar o mecanismo de entrada da tarefa inicial (`AUD-002`). |
| **AI Memory** | Produto independente (Fábio Akita) para memória persistente, contexto histórico e mensageria auxiliar entre agentes. Não é fonte de autorização nem dono do estado operacional. | `README.md` L5; `001-diretrizes-arquiteturais.md` `DEC-03`, Seção 5 (L51) | Fronteira muito bem definida. Nenhum acoplamento normativo indevido. |
| **Codex** | Agente executor ou revisor conforme designação (nas POCs atuou como implementador, corretor e consolidador documental); atua no escopo autorizado, entrega evidências e solicita próxima operação. | `001-relatorio-experimental.md` Seção 11; `001-diretrizes-arquiteturais.md` `DEC-14`, `DEC-15`, Seção 5 (L53) | Sem ambiguidade de papel (papéis são intercambiáveis por designação, mantendo independência entre elaboração/implementação e revisão). |
| **Antigravity** | Agente revisor ou executor conforme designação (nas POCs atuou como revisor independente adversarial/regressivo); examina versão fixada com independência e emite parecer verificável. | `001-relatorio-experimental.md` Seção 11; `001-diretrizes-arquiteturais.md` `DEC-14`, `DEC-15`, Seção 5 (L53) | Sem ambiguidade de papel. |
| **Futuros agentes executores/revisores** | Incorporação futura controlada sob o mesmo contrato mínimo de papel, escopo e evidência, sem construir framework genérico prematuro na V1. | `001-diretrizes-arquiteturais.md` `DEC-15`, Seção 15 (L113), Seção 16 (L126) | Bem delimitado; condições mínimas de integração remetidas ao planejamento. |

---

## 12. Limites e exclusões da primeira versão

Reconstrução estrita do que a documentação efetivamente estabelece (sem inventar escopos não documentados):

| Tema | Status na documentação | Referência |
| --- | --- | --- |
| **Coordenação local sequencial de Codex e Antigravity** | **Incluído** | `DEC-01`, `DEC-08`, `DEC-15`, Seção 16 #1 e #5 |
| **Mensagens curtas estruturadas + artefatos locais imutáveis com hash** | **Incluído** (contratos detalhados no planejamento) | `DEC-04`, `DEC-05`, Seção 16 #2 |
| **Histórico estruturado autoritativo + estado reconstruível/reconciliável** | **Incluído** (armazenamento local a escolher no planejamento) | `DEC-10`, `DEC-11`, Seção 16 #3 |
| **Gates humanos e handoffs entre sessões** | **Incluído** | `DEC-09`, `DEC-13`, `DEC-14`, Seção 16 #4 |
| **Suporte a múltiplos projetos consumidores (independência de domínio)** | **Incluído (isolamento por tarefa)**; execução simultânea multi-projeto **não decidida** | `DEC-16`, Seção 4 (L35), Seção 15 (L113) |
| **Integração automática com ChatGPT (UI/API)** | **Expressamente dispensada/excluída na V1** | `DEC-02` (L29) |
| **Execução paralela na mesma tarefa** | **Expressamente excluída na V1** | `DEC-08` (L35), Seção 6 (L63) |
| **Infraestrutura distribuída (banco/mensageria/infra distribuídos)** | **Expressamente excluída desta etapa** | `DEC-01` (L28), `DEC-11` (L38) |
| **Framework genérico prematuro para múltiplos agentes** | **Expressamente excluído** (inclusão futura de agentes **adiada** com extensibilidade controlada) | `DEC-15` (L42) |
| **Recuperação automática irrestrita** | **Expressamente limitada** (proibida repetição insegura sob efeito incerto; retry automático em aberto no planejamento) | `DEC-12` (L39), Seção 15 (L113) |
| **Interface web** | **Ainda não decidido** (listada na Seção 15 sem explicitar se entra na V1 ou se V1 é CLI-only — ver `AUD-004`) | Seção 15 (L110) |
| **Integração com GitHub / automação Git** | **Ainda não decidido** (operações Git condicionadas a gate humano, mas não está delimitado se V1 executa comandos Git/GitHub ou se ficam manuais — ver `AUD-004`) | `README.md` L5; `001-relatorio-experimental.md` L153, L167, L175 |
| **Persistência de estado (mecanismo concreto)** | **Ainda não decidido** (arquivos locais como opção a avaliar vs. outras soluções locais simples) | `DEC-11` (L38), Seção 15 (L110, L112) |
| **Mensageria (CLI vs. MCP, formato versionado)** | **Ainda não decidido** (mantendo AI Memory independente e mensagens curtas) | `DEC-03`, `DEC-04`, Seção 15 (L111) |

---

## 13. Avaliação das POCs

### 13.1 Resumo estruturado das POCs 001–007

| POC | Objetivo | Procedimento conhecido | Componentes | Resultados | Evidências no repositório | Limitações | Demonstrado vs. Não comprovado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **001** | Verificar envio, listagem e reivindicação individual pela CLI do AI Memory. | Reportado na sessão experimental acompanhada pelo GPT. | AI Memory CLI | Reportado como funcional. | Nenhuma evidência primária; apenas relato em `001-relatorio-experimental.md` (L48, L58) e `001-handoff` (L26). | Sem logs, comandos ou IDs primários. | **Não verificado diretamente** (resultado reportado). |
| **002** | Consultar inbox pelo Antigravity via MCP em modo não interativo. | Reportado na sessão (incluindo dificuldade inicial de permissões). | Antigravity, AI Memory MCP | Reportado como funcional após ajuste de permissões. | Apenas relato em `001-relatorio-experimental.md` (L49, L58) e `001-handoff` (L27). | Sem logs para reproduzir configuração de permissões. | **Não verificado diretamente** (resultado reportado). |
| **003** | Enviar mensagem pelo Antigravity via ferramenta MCP `memory_message_send`. | Reportado na sessão. | Antigravity, AI Memory MCP | Reportado como funcional. | Apenas relato (`001-relatorio-experimental.md` L50; `001-handoff` L28). | Sem log primário do envio. | **Não verificado diretamente** (resultado reportado). |
| **004** | Receber e ler pelo Codex a mensagem enviada pelo Antigravity. | Reportado na sessão. | Codex, AI Memory MCP | Reportado como funcional. | Apenas relato (`001-relatorio-experimental.md` L51; `001-handoff` L29). | Sem saída original para conferir leitura/identidade. | **Não verificado diretamente** (resultado reportado). |
| **005** | Acionar Antigravity automaticamente ao detectar mensagem-alvo na inbox. | Script Python faz polling em `default/luishenriqs-identity-and-access-server`, filtra por `subject`+`body`, rejeita ambiguidade, faz `pop` por ID, salva ID local e invoca `ai-memory run ... antigravity --mode plan --print`. | Python 3, AI Memory CLI, `ai-memory run`, Antigravity | PASS e `exit=0` reportados na sessão. | Script integral (`evidence/pocs/005/poc_ai_memory_005.py`, SHA-256 conferido). | Sem saída original de terminal, sem manifesto e sem `processed.json`. | **Demonstrado apenas o desenho do script**; execução real permanece **reportada**. |
| **006** | Encadear implementação (Codex), revisão independente (Antigravity) e resposta do Codex. | Repositório sintético em `/tmp` sem commits; Codex implementa `normalize_label`; 5 testes passam; despachante faz `send`+`pop` na inbox do IAS e invoca `agy --mode plan --print` com diff/testes; parecer `APROVADO`; despachante faz `send`+`pop` da resposta e invoca Codex, que cria `REVIEW_RESPONSE.md`; 5 testes finais passam. | Python 3, Codex v0.170.0 (`gpt-6.2-sol`), `agy`, AI Memory CLI v3.4.7, Git | `PASS`; 5/5 testes (`exit=0`) antes e depois; 2 mensagens correlacionadas; `VEREDITO: APROVADO`. | 28 arquivos em `evidence/pocs/006/` (todos conferidos com `MANIFEST.md`). | Código já estava correto antes da revisão; `check_tree` sem hashes; `ias_touched: false` autodeclarado; `send`+`pop` síncronos (~20 ms); `from_agent: "other"`. | **Demonstrado:** intercalação sequencial sintética e processamento de parecer. **Não comprovado:** detecção de defeito, isolamento do IAS, entrega assíncrona. |
| **007** | Testar detecção adversarial de defeito controlado, RED, correção, GREEN e revisão regressiva. | Codex implementa versão inicial (3 testes públicos passam); despachante injeta `split(" ")` (3 públicos continuam passando); `agy` revisa sem aviso da injeção nem testes regressivos e emite `VEREDITO: AJUSTES` com 4 contraprovas; `regression_tests.py` falha 4/5 (RED, `exit=1`); Codex corrige para `split()`; GREEN 5/5 e públicos 3/3 (`exit=0`); `agy` emite `VEREDITO: APROVADO`; autoteste local de duplicidade/timeout. | Python 3, Codex v0.170.0 (`gpt-6.2-sol`), `agy`, AI Memory CLI v3.4.7, Git | `PASS`; RED 4/5 falhas (`exit=1`), GREEN 5/5 (`exit=0`), públicos 3/3 (`exit=0`); 4 mensagens (2 ciclos); hashes conferidos. | 43 arquivos em `evidence/pocs/007/` (todos conferidos com `MANIFEST.md`). | Função trivial (~4 linhas); sandbox `/tmp` gravável alcançava `regression_tests.py` e `_poc_logs/` fora de `guard_tree`; autoteste em memória sem log dedicado; `ias_touched: not_independently_verified`. | **Demonstrado:** revisão adversarial e regressiva fechada em caso sintético. **Não comprovado:** recuperação real pós-queda, contenção de sandbox, entrega assíncrona, escala. |

### 13.2 Exame das 12 capacidades críticas frente à arquitetura proposta

1. **Uso da inbox do IAS:** Confirmado nos 3 scripts (`005`, `006`, `007`: `default/luishenriqs-identity-and-access-server`). A arquitetura proposta (`DEC-16`) corrige isso proibindo reuso automático do namespace do IAS.
2. **Identidade e proveniência das mensagens:** Nos 6 registros `*-pop.stdout.txt`, `from_agent` é `"other"` e `from_owner_user` é `null`; `--agent` no `pop` é rótulo do reivindicante. A arquitetura depende de verificação própria de autorização e proveniência (**ainda não demonstrada**).
3. **Correlação por identificadores:** Demonstrada nas POCs 006–007 via UUID de mensagem ligando `send`, `pop` e `result.json`.
4. **Comunicação síncrona vs. assíncrona:** Nas POCs 006–007, `send` e `pop` ocorreram em ~19–22 ms pelo mesmo despachante. Entrega assíncrona confiável permanece **não demonstrada** (reconhecido em `DEC-03` e Seção 14).
5. **Transporte de contexto por prompt:** Nas POCs 006–007, código, diff e testes foram passados nos argumentos CLI (`--print`); a inbox carregou resumos nas requisições e pareceres (1.119, 2.395 e 1.904 chars, abaixo dos limites de 25k/20k).
6. **Comunicação por referência a arquivos:** **Não demonstrada nas POCs** (é uma evolução proposta em `DEC-04` para evitar limites de payload e prompts gigantes).
7. **Execução não interativa dos agentes:** Demonstrada para `codex exec` e `agy --mode plan --print` nas POCs 006–007; para `ai-memory run ... antigravity`, apenas código + relato na POC-005.
8. **Revisão adversarial e regressiva:** Demonstrada na POC-007 em caso sintético simples.
9. **Limites dos sandboxes:** Nos logs do Codex (`codex-*.stderr.txt`), `sandbox: workspace-write [workdir, /tmp, $TMPDIR]` e `approval: never` deixavam `/tmp` inteiro gravável, incluindo `regression_tests.py` e `_poc_logs/` na POC-007. Contenção forte permanece **não demonstrada**.
10. **Falhas, timeouts e interrupções:** Apenas autoteste local em memória (`test_process_failures()`) na POC-007; falhas reais de subprocesso/crash não foram exercitadas.
11. **Recuperação durável:** **Ausência total de demonstração** nas POCs; a arquitetura proposta (`DEC-11`, `DEC-12`, `DEC-13`) depende dessa capacidade a ser desenhada no planejamento.
12. **Gates humanos automatizados:** **Ausência total de demonstração** nas POCs (apenas flag `--execute` manual); a arquitetura depende de desenho verificável no planejamento.

---

## 14. Análise de coerência arquitetural

### 14.1 Simplicidade (`DEC-01`)

A arquitetura consolidada em `001-diretrizes-arquiteturais.md` **atende bem** à exigência de simplicidade:
- Mantém escopo estritamente local, sem banco distribuído, broker externo, microsserviços ou framework genérico prematuro (`DEC-01`, `DEC-11`, `DEC-15`).
- Dispensa integração automática com ChatGPT na V1 (`DEC-02`).
- Adota execução sequencial sem concorrência na mesma tarefa (`DEC-08`).
- Mantém 16 decisões de implementação deliberadamente abertas para o planejamento (Seção 15), com recomendação explícita de avaliar primeiro opções locais de menor complexidade (L116).
- **Ponto de atenção:** a presença de *"interface web e suas funcionalidades"* na Seção 15 (L110) sem delimitação explícita frente à V1 (`AUD-004`) é o único ponto onde complexidade prematura poderia entrar sem requisito aprovado se não for delimitada na abertura do planejamento.

### 14.2 Comunicação e artefatos (`DEC-04`, `DEC-05`)

O modelo de mensagens curtas estruturadas com referências a artefatos locais imutáveis é **coerente e superior ao padrão das POCs**:
- Resolve o risco de truncamento (20k/25k chars) e evita trafegar código/diffs extensos dentro da inbox.
- A Seção 7 exige validação prévia de pertencimento ao projeto/tarefa, versão esperada, permissão do executor, etapa ativa e rejeição de mensagens duplicadas ou fora de ordem.
- A Seção 8 exige imutabilidade das versões revisadas enquanto retidas, vinculação de correções à versão anterior e integridade por hash vinculada ao artefato/versão esperada.
- **Ponto de atenção para o planejamento:** em repositórios reais antes de commit, fixar a "versão exata examinada" exigirá snapshot/hash de conjunto de arquivos ou patch/tree (não apenas de um arquivo isolado como `labels.py` na POC-007).

### 14.3 Execução sequencial (`DEC-08`)

O modelo sequencial é **adequado e suficiente para a V1**, reduzindo drasticamente a complexidade de concorrência. Contudo, a serialização **não elimina sozinha** os seguintes riscos residuais (reconhecidos conceitualmente em `DEC-12` e Seção 15, mas que exigirão contratos concretos no planejamento):
- **Processos órfãos / travados:** se o orquestrador cair enquanto um subprocesso (`codex`/`agy`) continua rodando, uma nova execução sequencial pode colidir com o processo anterior caso não haja lock local/verificação de PID.
- **Timeouts e limites de tokens:** podem encerrar a sessão do agente após escrita parcial de arquivos no workspace.
- **Duplicidade de disparo e efeitos irreversíveis:** se uma falha ocorrer entre o efeito externo (ex.: envio de mensagem ou alteração de arquivo) e a gravação do evento de conclusão, a retomada não pode repetir cegamente a operação (`DEC-12`).

---

## 15. Análise de segurança e gates humanos

Verificação dos 8 pontos críticos de governança (`001-diretrizes-arquiteturais.md` Seções 6, 7, 10, 11 e 13):

1. **Autorização inicial:** Exigida antes de qualquer ação coordenada (Seção 6 #1, Seção 10). *Ressalva (`AUD-002`):* há ambiguidade operacional residual quando o humano entrega o prompt diretamente ao executor (`DEC-02`) em vez de registrar/acionar primeiro no orquestrador (`DEC-09`).
2. **Limites da delegação:** Bem definidos (projeto, repositório, baseline, escopo, executor, limites e critérios de conclusão).
3. **Revisão independente:** Bem protegida (`DEC-14`, Seção 13: independência entre elaboração/implementação e revisão, vinculação à versão exata).
4. **Tratamento de achados:** Bem estruturado (achados verificáveis → correção gera nova versão → verificação regressiva).
5. **Encaminhamento ao humano:** Explicito em gates regulares e obrigatório diante de incerteza material (`DEC-12`, Seções 10 e 11).
6. **Homologação:** Exclusiva do responsável humano (`DEC-14`, Seção 10).
7. **Integração Git:** Condicionada a autorização humana específica (`README.md` L5; `001-relatorio-experimental.md` L167, L175). *Ressalva (`AUD-004`):* não está claro se a V1 executa comandos Git sob gate ou se Git/GitHub permanece 100% manual.
8. **Encerramento:** Condicionado a autorização e promoção prévia dos registros duráveis antes de limpar a área temporária (`DEC-06`, `DEC-07`, Seção 12).

**Possibilidades concretas de um agente ultrapassar involuntariamente uma autorização:**
- **Via sandbox amplo do executor:** como demonstrado na POC-007 (`workspace-write [workdir, /tmp, $TMPDIR]`), um executor pode tecnicamente escrever fora da árvore verificada se artefatos de controle/avaliação ou a área temporária ficarem no mesmo espaço gravável sem proteção (`AUD-001`).
- **Via área temporária na raiz do projeto consumidor (`DEC-06`):** sem exclusão explícita no Git (ex.: `.git/info/exclude`) e separação de permissões, artefatos transitórios podem interferir em diffs/commits do projeto consumidor (`AUD-001`).
- **Via atuação manual avulsa antes do registro no orquestrador:** mitigada em texto na Seção 6 #1, mas exige que o planejamento impeça o orquestrador de aceitar uma solicitação de executor como prova de autorização humana (`AUD-002`).

---

## 16. Análise de logs, estado, artefatos e recuperação

Exame de consistência entre os 9 mecanismos propostos (`DEC-05` a `DEC-07`, `DEC-10` a `DEC-13`, Seções 8, 9, 11 e 12):

- **Coerência geral:** **Alta.** A arquitetura separa claramente:
  - **Histórico autoritativo de eventos** (append-only estruturado por tarefa, registrando operações solicitadas, execuções observadas, resultados comprovados e operações com conclusão incerta);
  - **Estado operacional atual** (reconstruível ou reconciliável a partir do histórico e das evidências);
  - **Artefatos imutáveis** (versões fixadas com hash);
  - **Handoffs** (síntese de continuidade entre sessões validável contra os registros persistidos).
- **Ausência de contradição com simplicidade:** Manter um arquivo append-only estruturado (ex.: JSONL) + arquivo de estado reconciliável + arquivos imutáveis com SHA-256 + handoff Markdown/estruturado é perfeitamente viável em filesystem local simples, sem banco distribuído nem overengineering.
- **Controles essenciais para a V1:**
  1. Log estruturado autoritativo por tarefa (fora da área temporária) distinguindo *iniciado*, *concluído* e *incerto*.
  2. Fixação de versão/hash dos artefatos submetidos a revisão.
  3. Lock/exclusividade de execução ativa e verificação de estado/efeitos observáveis na retomada antes de qualquer ação.
  4. Interrupção fail-closed com escalonamento humano diante de efeito incerto em operação potencialmente irreversível.
  5. Handoff mínimo persistido para retomada sem depender do contexto da conversa.
- **Controles adiáveis para pós-V1:**
  1. Recuperação automática sofisticada ou retry automático de etapas com efeitos colaterais.
  2. Checkpoints granulares internos à sessão de um agente (além das fronteiras de etapa).
  3. Replicação, indexação avançada ou bancos/filas distribuídos.

---

## 17. Pontos fortes

1. **Disciplina epistêmica e rastreabilidade excepcionais:** distinção consistente entre fatos verificados diretamente, resultados reportados, inferências, hipóteses, propostas futuras e decisões humanas; 72/72 artefatos experimentais com hashes SHA-256 conferidos e zero vazamentos de dados sensíveis.
2. **Simplicidade pragmática (`DEC-01`):** foco local-first, sequencial, sem infraestrutura distribuída, sem integração prematura com ChatGPT e sem framework genérico prematuro.
3. **Separação limpa de responsabilidades:** AI Memory permanece independente; regras de domínio ficam nos projetos consumidores (`DEC-16`); autoridade normativa permanece centralizada no orquestrador sob gates humanos (`DEC-09`).
4. **Segurança orientada a desconfiança de entrada (`DEC-03`, Seção 7):** mensagens e pareceres são explicitamente tratados como entradas não confiáveis, nunca como autorização operacional isolada.
5. **Revisão independente institucionalizada (`DEC-14`):** separação entre elaboração/implementação e revisão com vínculo explícito achado → correção → regressão, já validada conceitualmente na POC-007.
6. **Resiliência realista a falhas (`DEC-11`–`DEC-13`):** reconhece falhas de processo, reinicializações inesperadas e limites de tokens, priorizando detecção honesta e escalonamento humano (fail-closed) em vez de prometer recuperação automática mágica.
7. **Extensibilidade controlada (`DEC-15`):** planeja para Codex e Antigravity sem acoplamento irreversível que impeça futuros agentes.
8. **Governança documental madura:** ciclo real de revisão independente + regressiva (R1/R2) aplicado tanto à fundação experimental (`001`/`002`) quanto às diretrizes arquiteturais (`003`/`004`).

---

## 18. Pontos fracos

1. **Capacidades centrais da V1 ainda não demonstradas empiricamente:** entrega assíncrona confiável, comunicação por referência a arquivos, recuperação durável após queda real, contenção efetiva de sandbox e gates humanos implementados não foram exercitados nas POCs. *Consequência prática:* o planejamento técnico precisará validar cada um desses mecanismos com critérios verificáveis antes da implementação ampla.
2. **Dependência de CLIs externas em evolução (`codex`, `agy`, `ai-memory`):** a própria história das POCs já mostrou divergência de invocação (`ai-memory run ... antigravity` na POC-005 vs. `agy` nas POCs 006–007) e ausência de registro de versão do `agy`. *Consequência prática:* mudanças de flags, formatos de saída ou políticas de sandbox nessas CLIs podem quebrar adaptadores do orquestrador.
3. **Limitação de contenção do sandbox local:** `workspace-write` do Codex incluiu `/tmp` inteiro nas POCs 006–007, e a área temporária na raiz do projeto consumidor (`DEC-06`) aproxima artefatos de orquestração do espaço gravável do executor. *Consequência prática:* risco de interferência em `git status` ou adulteração acidental de artefatos se o isolamento não for desenhado explicitamente no planejamento.
4. **Ausência de prova de identidade autenticada na camada CLI do AI Memory:** os logs das POCs 006–007 mostram `from_agent: "other"` e `from_owner_user: null`. *Consequência prática:* o orquestrador não pode delegar autenticação ou proveniência ao AI Memory e terá de manter verificação própria.
5. **Ambiguidade de escopo da V1 em dois itens de interface/integração:** interface web e automação Git/GitHub permanecem em aberto sem marcação clara de exclusão da V1 (`AUD-004`). *Consequência prática:* risco de crescimento desordenado do planejamento se não forem delimitados na abertura.
6. **Gargalo inerente ao modelo sequencial + gates manuais:** embora ideal para a V1, a execução sequencial com retorno manual ao humano/ChatGPT limita vazão em tarefas paralelizáveis. *Consequência prática:* aceitável na V1 por decisão consciente (`DEC-02`, `DEC-08`), mas impõe manter o fluxo enxuto para não reintroduzir atrito excessivo.

---

## 19. Achados classificados

### AUD-001
- **ID estável:** `AUD-001`
- **Severidade:** `MINOR`
- **Julgamento independente:** `CONFIRMADO`
- **Fonte e localização:** `docs/architecture/001-diretrizes-arquiteturais.md` — Seção 4 (`DEC-06`, L33; `DEC-16`, L43), Seção 12 (L91) e Seção 14 (L103).
- **Evidência:** `DEC-06` admite área temporária na raiz do projeto consumidor; nos logs preservados da POC-007 (`evidence/pocs/007/_poc_logs/codex-correct.stderr.txt` L7), `sandbox: workspace-write` do Codex concedia escrita a `[workdir, /tmp, $TMPDIR]`, alcançando artefatos fora de `guard_tree`. Além disso, arquivos na raiz de um repositório Git consumidor aparecem em `git status` se não isolados.
- **Descrição:** A documentação não explicita a necessidade de isolar a área temporária na raiz do projeto consumidor contra: (a) poluição do `git status`/staging do repositório consumidor sem exigir alteração intrusiva no `.gitignore` do projeto (`DEC-16`); e (b) escrita indevida pelo executor sobre arquivos de controle/avaliação.
- **Impacto:** Risco operacional no planejamento de misturar estado transitório do orquestrador com a working tree versionada do projeto consumidor ou repetir a exposição de artefatos de controle observada na POC-007.
- **Correção mínima recomendada:** Registrar no planejamento técnico (e, se desejado, como nota de escopo na Seção 15 de `001-diretrizes-arquiteturais.md`) o contrato de isolamento Git da área temporária (ex.: exclusão local não intrusiva) e a separação física/permissional entre área gravável do executor e artefatos de controle/avaliação.
- **Momento recomendado para resolução:** **B — Abertura do planejamento técnico** (sem bloquear homologação das diretrizes).

### AUD-002
- **ID estável:** `AUD-002`
- **Severidade:** `MINOR`
- **Julgamento independente:** `CONFIRMADO`
- **Fonte e localização:** `docs/architecture/001-diretrizes-arquiteturais.md` — Seção 4 (`DEC-02`, L29; `DEC-09`, L36) e Seção 6, passo 1 (L57).
- **Evidência:** `DEC-02` estabelece início manual com prompt autorizado para o executor designado; Seção 6 passo 1 exige que, antes de qualquer ação da tarefa coordenada, o orquestrador registre e valide a tarefa a partir de autorização verificável do humano, tratando solicitações do executor apenas como insumos.
- **Descrição:** Permanece uma ambiguidade operacional sobre o ponto de entrada canônico da tarefa coordenada: se o humano entrega o prompt autorizado primeiro ao orquestrador (que valida e aciona o executor) ou se entrega ao executor e depois confirma explicitamente no orquestrador.
- **Impacto:** Se não esclarecido no início do planejamento, pode gerar desenho ambíguo do gate inicial ou tentativa indevida de derivar autorização a partir de uma solicitação vinda do executor.
- **Correção mínima recomendada:** Definir na abertura do planejamento técnico o fluxo exato de registro da autorização inicial (ex.: entrada canônica pelo orquestrador com o prompt autorizado, ou confirmação explícita do humano no orquestrador antes da primeira transição coordenada).
- **Momento recomendado para resolução:** **B — Abertura do planejamento técnico** (ou esclarecimento breve na homologação humana).

### AUD-003
- **ID estável:** `AUD-003`
- **Severidade:** `MINOR`
- **Julgamento independente:** `CONFIRMADO` (`REQUER DECISÃO HUMANA` via ato de homologação)
- **Fonte e localização:** `docs/reviews/003-revisao-independente-diretrizes-arquiteturais-r1.md` (L12, L25, L55) e `docs/architecture/001-diretrizes-arquiteturais.md` (Seção 1, L6; Seção 3, L19).
- **Evidência:** `003` referencia `decisoes-delegacao.md` (*cópia temporária da delegação humana*), ausente do repositório; `001-diretrizes-arquiteturais.md` declara status *"Homologação documental pendente"*.
- **Descrição:** A partir apenas do repositório persistido, não é possível confrontar palavra-por-palavra `DEC-01`–`DEC-16` com o texto bruto da delegação humana original; a rastreabilidade depende dos pareceres `003`/`004` até que o responsável humano homologue formalmente `001-diretrizes-arquiteturais.md`.
- **Impacto:** Lacuna transitória de cadeia de custódia documental que se encerra automaticamente assim que a homologação humana for registrada de forma explícita.
- **Correção mínima recomendada:** Registrar explicitamente a homologação humana de `docs/architecture/001-diretrizes-arquiteturais.md` (com data e versão/hash homologado), tornando-o a fonte normativa autoritativa no repositório.
- **Momento recomendado para resolução:** **A — No ato de homologação humana** (antes de iniciar o planejamento técnico).

### AUD-004
- **ID estável:** `AUD-004`
- **Severidade:** `MINOR`
- **Julgamento independente:** `REQUER DECISÃO HUMANA`
- **Fonte e localização:** `docs/architecture/001-diretrizes-arquiteturais.md` — Seção 15 (L110) e `README.md` (L5) / `docs/001-relatorio-experimental.md` (L167, L175).
- **Evidência:** A Seção 15 lista *"interface web e suas funcionalidades"* como decisão pendente sem indicar se pertence à V1 ou a fase futura; igualmente, nenhum documento delimita se a V1 executará operações Git/GitHub sob gate humano ou se Git/GitHub permanecerá totalmente manual.
- **Descrição:** Falta fechamento explícito de fronteira da V1 para esses dois itens de alto impacto em escopo e risco.
- **Impacto:** Risco de expansão desnecessária de escopo (interface web) ou de desenho prematuro de efeitos irreversíveis (push/PR/merge automatizados) durante o planejamento da V1.
- **Correção mínima recomendada:** Definir explicitamente na homologação ou na abertura do planejamento técnico: (a) se a V1 será estritamente CLI/local (adiando interface web); e (b) se operações Git/GitHub ficam manuais na V1 ou se apenas operações Git locais específicas serão suportadas sob gate humano.
- **Momento recomendado para resolução:** **A/B — Na homologação humana ou como primeira decisão do planejamento técnico**.

### AUD-005
- **ID estável:** `AUD-005`
- **Severidade:** `EDITORIAL`
- **Julgamento independente:** `CONFIRMADO`
- **Fonte e localização:** `docs/001-relatorio-experimental.md` — Seção 4 (L30) vs. `evidence/pocs/006/_poc_logs/POC-006-cd85b48a2fc5-RESPONSE-send.stderr.txt`, `evidence/pocs/007/_poc_logs/REVIEW1-RESPONSE-send.stderr.txt` e `evidence/pocs/MANIFEST.md` (L39, L74).
- **Evidência:** Os dois logs preservados registram diretamente `ai-memory starting version="3.4.7"`, enquanto `001-relatorio-experimental.md` L30 diz apenas *"Versão informada na descrição da tarefa."*
- **Descrição:** Pequena subestimação da força da evidência disponível para a versão `3.4.7` do AI Memory nas POCs 006–007.
- **Impacto:** Nenhum impacto arquitetural ou de segurança; apenas precisão documental histórica.
- **Correção mínima recomendada:** Não reabrir o relatório histórico de `eeb3f53` apenas por isso; registrar como nota factual (já suprida por `MANIFEST.md` e por esta auditoria).
- **Momento recomendado para resolução:** **C — Opcional / sem ação imediata necessária**.

### AUD-006
- **ID estável:** `AUD-006`
- **Severidade:** `EDITORIAL`
- **Julgamento independente:** `CONFIRMADO`
- **Fonte e localização:** `README.md` (L11).
- **Evidência:** `README.md` L11 ainda afirma *"documentação inicial saneada em 2026-11-19, sujeita à revisão regressiva e à homologação humana"* e não referencia `docs/architecture/001-diretrizes-arquiteturais.md`, `docs/handoffs/` nem `evidence/pocs/MANIFEST.md`.
- **Descrição:** Estado editorial esperado pelo congelamento do commit `eeb3f53` (antes da homologação das diretrizes), mas que deixará o `README.md` defasado assim que as diretrizes forem homologadas e integradas.
- **Impacto:** Sem impacto técnico; afeta apenas a navegação inicial de quem entra no repositório.
- **Correção mínima recomendada:** Atualizar `README.md` somente após a homologação humana de `001-diretrizes-arquiteturais.md`, adicionando os links para diretrizes, handoff e manifesto e atualizando o estado atual.
- **Momento recomendado para resolução:** **A/B — No commit pós-homologação das diretrizes arquiteturais**.

---

## 20. Recomendações priorizadas

### A — Essenciais antes do planejamento técnico (no gate de homologação)
1. **Formalizar a homologação humana** de `docs/architecture/001-diretrizes-arquiteturais.md` (v0.2, SHA-256 `b12cb547d861b4515fd9a3d6d6ab5468fb24864ec79db4ea734b7ba072e3d700`), encerrando `AUD-003` e autorizando a integração Git dos documentos de consolidação arquitetural e a atualização editorial do `README.md` (`AUD-006`).
2. **Fechar duas fronteiras de V1** antes de detalhar contratos (`AUD-004`): confirmar se a V1 será estritamente CLI/local (adiando interface web) e se operações Git/GitHub permanecerão manuais na V1.

### B — Recomendadas para o planejamento técnico
1. **Definir o ponto de entrada canônico do gate inicial (`AUD-002`):** especificar como a autorização humana verificável é registrada no orquestrador antes de qualquer ação coordenada, mantendo o início manual com prompt autocontido (`DEC-02`) sem enfraquecer `DEC-09`.
2. **Definir o contrato de isolamento da área temporária (`AUD-001`):** garantir que a área transitória na raiz do projeto consumidor (`DEC-06`) não polua `git status`/commits do projeto consumidor (`DEC-16`) e fique separada de artefatos de controle/avaliação graváveis apenas pelo orquestrador.
3. **Especificar fixação de versão pré-commit (`DEC-05`):** definir como fixar e verificar por hash conjuntos de arquivos ou diffs/snapshots antes de commit, evitando que alterações concorrentes invalidem revisões.
4. **Adotar persistência local simples e auditável (`DEC-10`, `DEC-11`):** avaliar log estruturado append-only (ex.: JSONL) + estado reconstruível + lock de processo único na V1, com detecção de processos órfãos e política fail-closed para efeitos incertos (`DEC-12`).
5. **Validar contrato mínimo de adaptadores de executores (`DEC-15`):** padronizar invocação, captura de versão (inclusive `agy`), timeouts e captura de stdout/stderr/exit code para Codex e Antigravity sem criar framework genérico prematuro.
6. **Validar contrato de mensagens curtas com o AI Memory (`DEC-03`, `DEC-04`):** definir schema mínimo versionado com `task_id`, ação, referência de artefato, hash esperado e verificação independente de autorização/duplicidade.

### C — Evoluções futuras (fora da V1)
1. Interface web local de acompanhamento/aprovação de gates (caso adiada na V1).
2. Incorporação de novos executores/revisores além de Codex e Antigravity (`DEC-15`).
3. Execução concorrente controlada entre tarefas de projetos distintos (após maturação do modelo sequencial).
4. Políticas avançadas de retenção, compactação e rotação de evidências.

---

## 21. Decisões humanas ainda necessárias

1. **Homologação documental:** aprovar (com ou sem ajustes) `docs/architecture/001-diretrizes-arquiteturais.md` (v0.2, SHA-256 `b12cb547d861b4515fd9a3d6d6ab5468fb24864ec79db4ea734b7ba072e3d700`) e autorizar seu commit/publicação junto aos pareceres `003`, `004` e `005` e atualização editorial do `README.md`.
2. **Delimitação de interface na V1 (`AUD-004`):** confirmar se a V1 será exclusivamente CLI local (adiando interface web) ou se requer alguma interface web mínima.
3. **Delimitação de Git/GitHub na V1 (`AUD-004`):** confirmar se operações Git (`commit`, `branch`, `push`, PR) ficam fora do escopo automático da V1 (executadas manualmente após o gate humano) ou se alguma operação Git local será coordenada sob gate.
4. **Ponto de entrada do gate inicial (`AUD-002`):** confirmar preferência operacional entre (a) registrar/disparar a tarefa inicialmente pelo orquestrador com o prompt autorizado, ou (b) iniciar manualmente no executor e confirmar o registro no orquestrador antes de qualquer transição coordenada.
5. **Abertura do planejamento técnico:** autorizar formalmente a próxima fase (planejamento técnico dos contratos da V1).

---

## 22. Avaliação de suficiência documental

| Critério | Avaliação |
| --- | --- |
| Leitura integral de todos os documentos relevantes (9/9) | **Atendido** |
| Inventário e exame de todos os 72 artefatos experimentais | **Atendido** (72/72 verificados; 96.180 bytes; 72/72 SHA-256 conferidos; 0 vazamentos) |
| Confronto individual das 16 diretrizes (`DEC-01`–`DEC-16`) | **Atendido** |
| Ausência de `BLOCKER` e `MAJOR` | **Atendido** (0 `BLOCKER`, 0 `MAJOR`, 4 `MINOR`, 2 `EDITORIAL`) |
| Distinção entre fatos, relatos, propostas e decisões humanas | **Atendido** |
| Simplicidade e viabilidade da arquitetura conceitual | **Atendido** |
| Adequação como base para iniciar o planejamento técnico | **Atendido com ressalvas localizadas (`AUD-001` a `AUD-004`)** |

---

## 23. Conclusão independente

**Veredito:** **`SUFICIENTE COM RESSALVAS — RECOMENDO HOMOLOGAÇÃO CONDICIONADA`**

O repositório `ai-agent-orchestrator` encontra-se em estado documental sólido, íntegro e coerente. As 16 diretrizes consolidadas em `docs/architecture/001-diretrizes-arquiteturais.md` (v0.2) preservam a simplicidade local-first, respeitam os limites reais comprovados pelas POCs 001–007, mantêm o AI Memory independente, protegem a autoridade humana e evitam decisões técnicas prematuras. Não há achados `BLOCKER` nem `MAJOR`, tampouco contradições materiais entre os documentos.

Recomenda-se a **homologação humana condicionada** ao tratamento explícito das quatro ressalvas `MINOR` identificadas (`AUD-001` a `AUD-004`): formalização do ato de homologação como fonte normativa autoritativa (`AUD-003`), fechamento de fronteira da V1 para interface web e Git/GitHub (`AUD-004`), definição do ponto de entrada canônico do gate inicial (`AUD-002`) e previsão explícita do isolamento Git/sandbox da área temporária na raiz do projeto consumidor (`AUD-001`) na abertura do planejamento técnico. A decisão final de homologação pertence exclusivamente ao responsável humano.

---

## 24. Próximo gate recomendado

**Gate humano de homologação das diretrizes arquiteturais e abertura do planejamento técnico:**
1. Avaliação deste parecer (`005`) pelo GPT e pelo responsável humano;
2. Decisão humana sobre homologação de `docs/architecture/001-diretrizes-arquiteturais.md` (v0.2) e sobre as questões da Seção 21 (`AUD-002`, `AUD-003`, `AUD-004`);
3. Autorização (se aprovada) para commit dos documentos de consolidação arquitetural + pareceres (`003`, `004`, `005`) e atualização editorial do `README.md` (`AUD-006`);
4. Autorização formal para abertura da fase de **planejamento técnico da V1** (contratos mínimos de estado, mensagens, artefatos, isolamento e retomada).
