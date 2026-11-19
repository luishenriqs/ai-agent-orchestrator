# Handoff da fundação experimental do AI Agent Orchestrator

## 1. Identificação

- **Projeto** — AI Agent Orchestrator.
- **Data de referência** — 2026-11-19, no fuso America/Sao_Paulo.
- **Repositório** — `$HOME/projects/ai-agent-orchestrator`.
- **Git** — branch local `main`, sem commit inicial, remotes ou entradas no índice. Os documentos e as evidências estão na árvore de trabalho como arquivos não rastreados.
- **Fase experimental** — POCs 001–007 documentadas. A preservação local reúne as evidências disponíveis e selecionadas das POCs 005–007.
- **Gate atual** — a preservação e este handoff foram autorizados. A documentação aguarda homologação humana. Planejamento técnico, implementação e operações de integração Git dependem de autorização própria.

## 2. Origem e motivação

A investigação começou em uma discussão sobre as funcionalidades do AI Memory, apresentado por Fábio Akita. A comunicação e a memória persistente oferecidas pelo produto poderiam reduzir o transporte manual de solicitações, contexto e pareceres entre agentes. As POCs investigaram primeiro a entrega de mensagens, depois o acionamento não interativo e, por fim, o encadeamento de execução, revisão e validação.

## 3. Objetivo estratégico

Construir uma aplicação independente e reutilizável em diferentes projetos, como IAS e Jungle. A aplicação trabalharia em parceria com o AI Memory para encaminhar solicitações e pareceres e coordenar tarefas autorizadas, com resultados e evidências vinculados ao trabalho. A aplicação deve preservar a autoridade humana sobre escopo, etapas e integração.

## 4. Histórico das POCs 001–007

Os resultados das POCs 001–004 e da execução da POC-005 vêm do relato da sessão experimental acompanhada pelo GPT. Há evidência local primária do código da POC-005 e dos artefatos de execução das POCs 006–007. O inventário registra a procedência e as lacunas. [Manifesto de evidências](../../evidence/pocs/MANIFEST.md)

| POC | Objetivo e mecanismo | Resultado e conhecimento adquirido | Evidências e limites |
| --- | --- | --- | --- |
| 001 | Verificar envio, listagem e reivindicação individual por meio da CLI do AI Memory. | A sessão reportou as operações básicas da inbox. O ID da mensagem serviu como referência para a reivindicação individual. | Histórico no relatório experimental. Os registros primários da execução estão indisponíveis no conjunto local. |
| 002 | Consultar a inbox pelo Antigravity via MCP em execução não interativa. | A sessão reportou a consulta e uma dificuldade inicial de permissões. A compatibilidade do acesso depende das permissões efetivas da execução. | Histórico no relatório experimental. Faltam logs para conferir a configuração ou reproduzir a sequência. |
| 003 | Enviar mensagem pelo Antigravity usando a ferramenta MCP `memory_message_send`. | O envio foi reportado na sessão. É um antecedente da comunicação direta do agente via MCP. | Histórico no relatório experimental, sem log primário do envio. |
| 004 | Receber e ler pelo Codex a mensagem enviada pelo Antigravity. | A sessão reportou o recebimento e a leitura via MCP, complementando o envio da POC-003. | Histórico no relatório experimental, sem saída original que permita conferir a leitura ou a identidade. |
| 005 | Acionar o Antigravity após detectar uma mensagem-alvo. O script consulta a inbox pela CLI, valida a resposta de reivindicação por ID, registra o ID e aciona o wrapper `ai-memory run`. | A sessão reportou acionamento automático e saída `0`. O script mostra a sequência planejada, com bloqueio em caso de ambiguidade e sem retry automático. | [Script da POC-005](../../evidence/pocs/005/poc_ai_memory_005.py). A saída original, o manifesto de execução e o estado da reivindicação não estão disponíveis no conjunto local. |
| 006 | Encadear implementação, revisão e tratamento do parecer. O Codex implementou `normalize_label`, o despachante usou a inbox pela CLI e passou o contexto ao Antigravity e o parecer ao Codex. | O manifesto registra PASS. Houve uma solicitação e uma resposta, parecer `APROVADO` e registro de resposta do Codex. Cinco testes passaram antes e cinco depois. O caso demonstra a coordenação entre processos separados em uma árvore sintética, com um código que já passava nos testes antes da revisão. | [Manifesto da POC-006](../../evidence/pocs/006/result.json) e [resposta do Codex](../../evidence/pocs/006/demo/REVIEW_RESPONSE.md). O parecer foi textual e a checagem de árvore não verificava a imutabilidade de cada arquivo permitido. |
| 007 | Verificar detecção e correção de defeito controlado. Após a implementação inicial, o despachante injetou `split(" ")`. O Antigravity recebeu especificação, fonte, diff e testes públicos, sem aviso da injeção nem os testes regressivos na primeira revisão. | O manifesto registra PASS. Os três testes públicos passaram mesmo com o defeito. O parecer `AJUSTES` apontou quatro classes de falha. No RED, quatro dos cinco testes falharam com saída `1`. Após o Codex corrigir para `split()`, os cinco regressivos e os três públicos passaram com saída `0`. O parecer regressivo foi `APROVADO`. Quatro mensagens compuseram dois ciclos de solicitação e resposta. O fluxo mostrou o valor de contraprovas e testes independentes da suíte pública. | [Manifesto da POC-007](../../evidence/pocs/007/result.json), [registro de injeção](../../evidence/pocs/007/_poc_logs/fault-injection.json), [RED](../../evidence/pocs/007/_poc_logs/tests-red.stderr.txt) e [GREEN](../../evidence/pocs/007/_poc_logs/tests-green.stderr.txt). O registro termina na reivindicação da resposta final pelo despachante. A implementação inicial e a versão defeituosa subsistem em registros incorporados, e o código corrigido está disponível como arquivo. |

## 5. Arquitetura conceitual

| Ator | Responsabilidade conceitual |
| --- | --- |
| AI Memory | Oferecer contexto, memória persistente e comunicação entre agentes. |
| AI Agent Orchestrator | Coordenar tarefas, processos, estados, gates e coleta de evidências, vinculando a revisão à versão avaliada. |
| Codex e Antigravity | Executar ou revisar conforme a designação e os limites autorizados. Na experiência, o Codex implementou e corrigiu, e o Antigravity revisou. |
| Responsável humano | Decidir escopo, autorizações, exceções e homologação. |

A arquitetura técnica definitiva está pendente de aprovação. Persistência, transporte, ambiente de execução e representação dos gates continuam em aberto.

## 6. Decisões humanas estabelecidas

- Desenvolver o AI Agent Orchestrator como aplicação independente, reutilizável em diferentes projetos e complementar ao AI Memory.
- Preservar a autoridade humana sobre escopo, execução, decisões e homologação.
- Concentrar o desenvolvimento futuro no AI Agent Orchestrator em parceria com o AI Memory. Preservar o AI Orchestration Lab como referência histórica, sem continuidade ativa de desenvolvimento prevista.
- Condicionar exclusão, alteração ou migração automática de artefatos e contratos do Lab a autorização específica. A preservação histórica não autoriza essas ações nem comprova equivalência entre os projetos.

## 7. Estado documental

| Documento | Estado |
| --- | --- |
| [README.md](../../README.md) | Elaboração inicial pelo Codex e saneamento R1. Apresenta o projeto e a decisão estratégica. |
| [Relatório experimental](../001-relatorio-experimental.md) | Elaborado pelo Codex e saneado com os achados do GPT e do Antigravity. Distingue observações, relatos, inferências, propostas e decisões. |
| [Parecer independente R1](../reviews/001-revisao-independente-r1.md) | Revisão original do Antigravity. Classificou seis achados e concluiu `AJUSTES NECESSÁRIOS`. |
| [Parecer regressivo R2](../reviews/002-revisao-regressiva-r2.md) | Revisão concluída em 2026-11-19. Conferiu os 12 achados e emitiu `SUFICIENTE — APTO PARA HOMOLOGAÇÃO HUMANA`. |
| [Manifesto de evidências](../../evidence/pocs/MANIFEST.md) | Criado nesta etapa. Cataloga cada arquivo novo nas pastas 005, 006 e 007, com proveniência, hashes, supressões e lacunas. |
| [Handoff da fundação experimental](001-handoff-fundacao-experimental.md) | Este documento, criado nesta etapa para permitir retomada por uma nova instância. |

A autorização atual tornou efetivo o acervo local que os documentos anteriores ainda descrevem como proposta. A estrutura e a política definitiva de retenção e acesso permanecem a deliberar. A homologação humana da documentação inicial continua pendente.

## 8. Resultados e limitações técnicas

- **Transporte e acionamento** — as POCs 001–004 registram em relato a CLI e o MCP. Na POC-005, o script usa `ai-memory run --require-server --no-autowire --no-exit-prompt antigravity --mode plan --print`. Nas POCs 006–007, o despachante chamou diretamente `agy --mode plan --print` e acionou o Codex em modo não interativo. Os agentes receberam contexto técnico por prompts CLI. As solicitações na inbox continham resumos.
- **Namespace e identidade** — os três scripts apontam para `default/luishenriqs-identity-and-access-server`. Os logs das POCs 006–007 confirmam seu uso como origem e destino, com `from_agent: "other"` e `from_owner_user: null`. O `--agent` do `pop` é o rótulo do reivindicante escolhido pelo despachante. A identidade autenticada do remetente permanece sem comprovação.
- **Mediação e payload** — o mesmo despachante executou `send` seguido de `pop` por ID. Nos seis registros, criação e reivindicação ficaram separadas por aproximadamente 19–22 ms. Os scripts limitavam os pareceres a 25.000 caracteres na POC-006 e 20.000 na POC-007. Os três pareceres observados chegaram completos. A reivindicação registra uma transição na inbox, e a conclusão depende das evidências da etapa.
- **Revisão e validação** — houve revisão textual em processo separado e tratamento do parecer na POC-006. Na POC-007, os registros ligam revisão adversarial, RED, correção, GREEN e revisão regressiva experimental. O parecer regressivo experimental é distinto da revisão documental R2.
- **Isolamento** — os repositórios de código 006–007 eram temporários e sem commits. Os dados do IAS como projeto do AI Memory eram compartilhados pela inbox. Os cabeçalhos do Codex v0.170.0 registram `approval: never` e `workspace-write [workdir, /tmp, $TMPDIR]`. Na POC-007, `/tmp` autorizava escrita no diretório pai da árvore que `guard_tree` conferia. O teste regressivo, os logs e o manifesto ficavam fora dessa checagem. A auditoria dos efeitos externos ao demo permaneceu fora do alcance dos registros experimentais.
- **Falhas e escala** — foi registrado um autoteste local de duplicidade em memória e timeout em subprocesso isolado na POC-007. Faltam demonstrações de recuperação confiável após queda real, concorrência entre despachantes, entrega assíncrona confiável, gates humanos implementados e suporte simultâneo a múltiplos projetos. Os resultados se limitam à pequena função Python e aos ambientes sintéticos examinados.

## 9. Riscos e questões pendentes

- Definir modelo de tarefas e estados, persistência e idempotência entre reivindicação, registro, acionamento e gravação do resultado.
- Verificar identidade e proveniência de mensagens e artefatos. Delimitar segurança, isolamento e permissões de arquivos, processos e rede.
- Definir controle de processos, timeouts, cancelamento, recuperação de falhas parciais, conciliação e concorrência.
- Deliberar sobre versionamento de contratos, vínculo da evidência com a versão revisada, retenção, acesso e integridade dos artefatos.
- Definir gates humanos verificáveis, suporte a múltiplos projetos e quais contratos de CLI ou MCP do AI Memory poderão ser usados em cada operação.

## 10. Próximo gate

A revisão regressiva documental R2 foi concluída com recomendação favorável à homologação. O próximo gate é a decisão do responsável humano sobre a homologação da baseline documental. A abertura do planejamento técnico exige autorização correspondente.

## 11. Orientações para nova instância

1. Leia a baseline documental, este handoff e o manifesto. Use os documentos persistentes para recuperar fatos, limites e decisões.
2. Verifique o estado real da branch, do índice, dos commits, dos remotes e da árvore de trabalho. Revalide os hashes das cópias e consulte a indicação de sanitização antes de comparar com os originais.
3. Respeite os gates. Aguarde autorização para iniciar planejamento, implementação ou novas execuções e trate a arquitetura técnica como pendente.
4. Use a memória dos agentes e as mensagens como contexto histórico. A autorização normativa vem do responsável humano e dos documentos aplicáveis.
5. Preserve o isolamento dos projetos. A inbox do IAS é parte da história experimental. O escopo de acesso de uma nova sessão deve ser estabelecido pela autorização vigente.
