# AI Agent Orchestrator

O AI Agent Orchestrator é um projeto para coordenar agentes de IA no desenvolvimento de software e reduzir o repasse manual de tarefas, resultados e pareceres. É independente dos projetos consumidores, como IAS e Jungle. A solução prevista trabalha em parceria com o AI Memory, produto independente criado por Fábio Akita que oferece comunicação auxiliar e memória persistente.

O desenvolvimento futuro se concentra no AI Agent Orchestrator. O AI Orchestration Lab será preservado como referência histórica, sem continuidade ativa de desenvolvimento prevista. Uma eventual migração de artefatos ou contratos depende de decisão específica.

## Fluxo previsto

1. O responsável humano define o escopo e decide nos gates, com apoio manual do ChatGPT na preparação da tarefa e na análise das entregas. O humano entrega um prompt autorizado ao primeiro executor designado, que registra a tarefa no orquestrador.
2. O orquestrador verifica a autorização aplicável antes de liberar ações ou transições coordenadas. Codex e Antigravity executam ou revisam conforme a designação, em um fluxo inicialmente local e sequencial.
3. Mensagens curtas referenciam artefatos versionados e imutáveis. Eventos estruturados e estado persistente sustentam a rastreabilidade e a retomada controlada. Operações Git/GitHub podem ser executadas pelos agentes quando cobertas pela autorização e pelos gates aplicáveis.

A arquitetura prioriza simplicidade, com controles proporcionais aos riscos e sem infraestrutura distribuída ou abstrações prematuras. Uma interface web local mínima segue como proposta para a V1, condicionada à validação prévia do núcleo via CLI, à avaliação de custo e à decisão humana.

## Estado e próximo gate

A fundação experimental está publicada. As diretrizes arquiteturais v0.3 passaram pela revisão independente e foram homologadas pelo responsável humano em 20/11/2026. O próximo gate é a autorização do planejamento técnico. A implementação ainda não começou. [Registro de homologação](docs/architecture/002-registro-homologacao-v03.md)

## Documentação

- Fundação experimental · [Relatório](docs/001-relatorio-experimental.md), [handoff](docs/handoffs/001-handoff-fundacao-experimental.md) e [manifesto de evidências](evidence/pocs/MANIFEST.md).
- Arquitetura · [Diretrizes v0.3](docs/architecture/001-diretrizes-arquiteturais.md).
- Revisão · [Auditoria integral](docs/reviews/005-auditoria-integral-independente-r1.md), [triagem](docs/reviews/006-triagem-auditoria-integral-r1.md) e [parecer regressivo](docs/reviews/007-revisao-regressiva-saneamento-auditoria-r1.md).
