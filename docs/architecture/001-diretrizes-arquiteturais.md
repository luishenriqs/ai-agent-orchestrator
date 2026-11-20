# Diretrizes arquiteturais do AI Agent Orchestrator

## 1. Identificação e objetivo

- **Versão documental** — 0.3, 2026-11-20.
- **Status** — consolidação das diretrizes aprovadas pelo responsável humano. Homologação documental pendente.
- **Autoria** — Codex, a partir das diretrizes comunicadas pelo responsável humano.
- **Referência** — fundação experimental publicada em `main`, commit `eeb3f53a755d7c8b55a6fa606ed3c4ec89d79f91`.
- **Objetivo** — orientar o planejamento técnico e explicitar seus limites. Os fluxos descritos são conceituais e a implementação do orquestrador ainda não começou.

## 2. Contexto e motivação

A fundação experimental investigou como reduzir o trabalho manual de encaminhar tarefas, resultados e pareceres entre agentes. As POCs 006 e 007 registraram que um despachante local pôde coordenar Codex e Antigravity em sequência em repositórios sintéticos. A orientação humana é concentrar a evolução no AI Agent Orchestrator, em parceria com o AI Memory, e preservar o AI Orchestration Lab como referência histórica.

O orquestrador deve ser tão simples quanto possível e tão robusto quanto necessário para automatizar, com segurança e rastreabilidade, o fluxo sequencial estudado. Complexidade adicional se justifica quando resolve um risco concreto ou atende a um requisito aprovado.

## 3. Fontes e hierarquia de evidências

- A delegação humana desta consolidação é a fonte das decisões DEC-01 a DEC-16. A autoridade para executar uma tarefa vem da autorização humana aplicável.
- As definições humanas posteriores à auditoria orientam as alterações da versão 0.3. A auditoria é um parecer independente e a triagem registra o encaminhamento de seus achados. [Auditoria integral R1](../reviews/005-auditoria-integral-independente-r1.md) · [Triagem da auditoria](../reviews/006-triagem-auditoria-integral-r1.md)
- Os artefatos primários sustentam afirmações sobre a execução observada. O relatório distingue verificação direta, resultados reportados e inferências. Os pareceres documentais avaliam a fidelidade do relatório às fontes. [Relatório experimental](../001-relatorio-experimental.md) · [Parecer experimental R1](../reviews/001-revisao-independente-r1.md) · [Parecer experimental R2](../reviews/002-revisao-regressiva-r2.md)
- O README situa o projeto, o handoff reúne o contexto de continuidade e o manifesto registra o acervo e suas lacunas. Esses documentos preservam o estado observado na fundação experimental de 2026-11-19. [README](../../README.md) · [Handoff experimental](../handoffs/001-handoff-fundacao-experimental.md) · [Manifesto](../../evidence/pocs/MANIFEST.md)
- Uma inferência é limitada pelas condições observadas. Uma recomendação orienta avaliação futura. Uma questão pendente exige decisão posterior, mesmo quando já há uma opção plausível.

## 4. Decisões humanas consolidadas

| ID | Diretriz aprovada |
| --- | --- |
| DEC-01 | Começar com uma ferramenta local, simples de projetar, implementar, manter e operar, orientada ao fluxo real de desenvolvimento assistido por IA. Evitar abstrações prematuras, infraestrutura distribuída e funcionalidades especulativas. Manter controles mínimos de integridade, segurança, autorização e rastreabilidade. |
| DEC-02 | O ChatGPT apoia o responsável humano no planejamento, na análise das entregas e nos gates. O humano define a tarefa e prepara o prompt inicial com o ChatGPT, então entrega manualmente o prompt autorizado e autocontido a Codex, Antigravity ou outro executor designado. O prompt identifica escopo, baseline, fontes, responsabilidades, limites e critérios de conclusão. O primeiro executor registra a tarefa no orquestrador antes de iniciar o fluxo coordenado. O retorno ao ChatGPT pode ser manual por relatório e referências. A primeira versão dispensa integração automática obrigatória à interface ou API do ChatGPT. |
| DEC-03 | O AI Memory permanece independente e auxilia na comunicação e memória persistente. O orquestrador coordena o trabalho e verifica contexto e autorização antes de agir. Mensagens isoladas são insuficientes para autorizar execução. A confiabilidade do transporte assíncrono em produção permanece por demonstrar. |
| DEC-04 | Privilegiar mensagens pequenas e estruturadas que indiquem a ação solicitada e referenciem artefatos locais vinculados à tarefa. O conteúdo técnico completo permanece nos documentos. Campos, payloads e protocolos definitivos ficam para o planejamento. |
| DEC-05 | Dar identidade verificável aos documentos usados na coordenação e preservar a imutabilidade das versões empregadas em revisão. Cada parecer aponta a versão exata examinada. Hashes podem comprovar identidade e integridade do conteúdo. Identificação lógica, armazenamento e versionamento físico ficam para o planejamento. |
| DEC-06 | Admitir área temporária na raiz do projeto consumidor, segregada por tarefa, para instruções, documentos intermediários, revisões e artefatos de execução. Evitar a inclusão acidental dos arquivos transitórios no versionamento do consumidor, separar artefatos de trabalho dos registros de controle e avaliação do orquestrador e limitar o acesso dos executores ao escopo autorizado. Aplicar isolamento simples e proporcional ao risco. Limpar somente após encerramento autorizado e preservação dos registros necessários. Os registros necessários à retomada e à auditoria devem ter um destino durável fora da área temporária. Nomenclatura, estrutura interna, retenção e mecanismo de isolamento ainda serão definidos. |
| DEC-07 | Promover artefatos relevantes a destinos persistentes do projeto, usando os conceitos de handoffs, reviews, evidence e documentação técnica. Preservar a associação entre tarefa, versões, resultados e evidências. A inclusão em Git é seletiva. |
| DEC-08 | Favorecer execução sequencial na primeira versão e evitar concorrência na mesma tarefa. Após o resultado de uma etapa, o executor pode solicitar a próxima operação e o orquestrador verifica a transição antes de acionar outro executor. O fluxo segue até conclusão autorizada ou gate humano. Uma única execução ativa no orquestrador é opção inicial a considerar, sujeita ao planejamento. |
| DEC-09 | Centralizar no orquestrador estado operacional, sequência, executor designado, validação de transições, cumprimento do escopo e encaminhamento a gates. Agentes podem solicitar ações e entregar resultados. O orquestrador verifica a autorização da tarefa registrada antes de permitir transições. A ampliação de escopo e a passagem por gates exigem a autorização aplicável. |
| DEC-10 | Manter histórico estruturado por tarefa. Os atores informam operações e resultados, e o orquestrador centraliza e valida transições. O histórico identifica a última etapa comprovadamente concluída e operações com conclusão incerta. O controle operacional depende de registros estruturados. Texto livre pode complementar esses registros. |
| DEC-11 | Preservar estado suficiente para analisar e retomar interrupções. Adotar histórico autoritativo de eventos e estado atual reconstruível ou reconciliável. Arquivos locais são uma opção a avaliar junto a outras soluções simples. Banco, mensageria e infraestrutura distribuídos ficam fora das decisões desta etapa. |
| DEC-12 | Tornar reconhecíveis falhas de processo, reinicializações inesperadas, limites de tokens e interrupções de contexto. Na retomada, consultar eventos, artefatos e efeitos comprovados. A falta de registro de conclusão é insuficiente para repetir operação potencialmente irreversível. Diante de incerteza material, interromper e encaminhar ao humano. A recuperação automática pode ser limitada. |
| DEC-13 | Preservar a continuidade entre sessões por handoff com estado comprovado, artefatos, evidências e próximo passo. A continuação deve poder ser validada a partir dos registros persistidos, mesmo que o contexto conversacional anterior esteja indisponível. |
| DEC-14 | Preservar independência entre elaboração, implementação e revisão. Codex e Antigravity podem assumir papéis distintos conforme designação. O parecer deve identificar a versão analisada e apresentar achados verificáveis. Vincular correções a seus achados e verificar regressão quando aplicável. A homologação é humana. |
| DEC-15 | Permitir futura incorporação de executores com extensibilidade controlada. Planejar inicialmente para Codex e Antigravity, ambos exercitados nas POCs, e evitar um framework genérico prematuro. |
| DEC-16 | Manter o orquestrador independente dos projetos consumidores e de suas regras de domínio. Vincular cada integração ao contexto, repositório e autorizações da tarefa. O namespace do IAS aparece como registro histórico das POCs e fica fora da seleção automática. |

## 5. Responsabilidades

| Ator | Responsabilidade conceitual |
| --- | --- |
| Responsável humano | Autorizar escopo, decidir gates e exceções, homologar entregas e autorizar efeitos que exijam decisão própria. |
| ChatGPT | Apoiar o humano na preparação do prompt, na análise dos resultados e na decisão. Receber, quando útil, o relatório e as referências encaminhados manualmente. |
| AI Memory | Auxiliar na comunicação e memória persistente como produto independente. |
| Orquestrador | Verificar contexto e autorização, designar executores, validar transições, manter o estado operacional e encaminhar decisões ao humano. |
| Executores e revisores | Atuar no papel e escopo designados, produzir resultados verificáveis e solicitar a próxima operação. O revisor examina a versão identificada com independência da elaboração e da implementação. |

## 6. Fluxo operacional conceitual

1. O humano e o ChatGPT definem a tarefa e preparam o prompt inicial. O humano entrega manualmente o prompt autorizado ao primeiro executor designado, que registra a tarefa no orquestrador antes de iniciar o fluxo coordenado. O orquestrador valida a tarefa, o escopo, o repositório, a baseline, o executor, os limites e os critérios a partir de autorização humana verificável, antes de liberar a primeira ação ou transição coordenada. Solicitações do executor e mensagens do AI Memory são insumos desse processo. Uma atuação manual avulsa permanece fora do fluxo coordenado até passar por esse gate.
2. O executor atua dentro do escopo e entrega resultado, versão dos artefatos e evidências. Pode solicitar a próxima operação.
3. O orquestrador confere a correspondência entre versão e evidências, o escopo e os requisitos da transição. Registra o resultado e aciona a próxima etapa somente quando a passagem estiver autorizada.
4. Quando há revisão, o revisor independente examina a versão fixada. Se houver correções, o fluxo vincula os achados à nova versão e encaminha a verificação regressiva pertinente.
5. No gate, o fluxo aguarda a decisão humana. Quando a tarefa é encerrada com autorização, preserva os registros necessários e encaminha o relatório e as referências.

O encadeamento sequencial determina a ordem das etapas. Um acionamento ou uma espera assíncrona pode existir sem trabalhos simultâneos na mesma tarefa. A escolha do mecanismo de espera e a capacidade de execuções ativas permanecem abertas.

Cabeçalhos Markdown ou metadados estruturados podem registrar a origem declarada de instruções e solicitações. Um campo como `origin: human` registra uma alegação de origem. A comprovação da autorização exige uma fonte ou um procedimento verificável independente da declaração produzida pelo executor. O mecanismo concreto será definido no planejamento, com complexidade proporcional ao uso local.

## 7. Mensagens curtas e artefatos referenciados

A mensagem informa qual ação está sendo solicitada e permite localizar a tarefa e o artefato correspondente. O orquestrador trata mensagens recebidas como entradas não confiáveis. Os documentos locais mantêm o contexto completo. Antes de usar a referência, o orquestrador verifica se ela pertence ao projeto e à tarefa autorizados, se a versão corresponde à solicitada e se o acesso cabe ao executor. O orquestrador também confere se a solicitação corresponde à etapa ativa. Referências ausentes, discrepantes ou fora de escopo, bem como solicitações duplicadas ou fora de ordem, não autorizam uma transição por si sós. A forma de detectar e conciliar esses casos será definida no planejamento.

Esses elementos descrevem o que a comunicação deve permitir verificar. A forma de representar uma referência, os campos de mensagem, o transporte e seu versionamento serão definidos no planejamento.

## 8. Versionamento e imutabilidade

Cada versão usada em revisão permanece imutável enquanto retida. A versão deve ser recuperável pelo período de retenção aplicável. Uma correção gera nova versão, preserva o vínculo com a versão revisada e permite distinguir quais resultados ainda se aplicam. Um hash pode conferir igualdade de conteúdo, desde que vinculado ao artefato e à versão esperada. A autorização e a procedência dependem de verificação própria. A forma de fixar a versão e armazenar seu conteúdo permanece aberta.

## 9. Eventos, estado e recuperação

O histórico estruturado deve permitir relacionar operação, responsável, resultado e evidência à tarefa e identificar a última etapa concluída e as operações com conclusão incerta. O orquestrador valida a transição antes de registrá-la como concluída e preserva a distinção entre uma operação solicitada, uma execução observada e um resultado comprovado. A reivindicação na inbox comprova a transição da mensagem e a conclusão da etapa depende de evidência própria. O controle operacional usa os registros estruturados, com texto livre como complemento. O estado atual deve poder ser reconstruído ou reconciliado a partir do histórico autoritativo e das evidências.

Quando o histórico e os efeitos observados divergem, a retomada verifica as evidências disponíveis e encaminha ao humano a incerteza que impedir uma próxima ação segura. O formato do registro, seu armazenamento e o mecanismo de reconciliação seguem em aberto.

## 10. Gates de autorização e homologação

O gate inicial delimita tarefa, escopo e executor. A mudança de escopo, o avanço que requer decisão humana e a homologação dependem da autorização correspondente. O orquestrador aplica o gate e apresenta ao responsável o que está comprovado ou pendente. Mensagens do AI Memory, pareceres e códigos de saída são insumos para a verificação. O responsável humano decide sobre homologação e efeitos que exijam autorização própria.

### Operações Git e GitHub

A capacidade de executar operações Git e GitHub cabe aos agentes e ao orquestrador quando necessária ao desenvolvimento ou à integração. A autorização operacional delimita cada operação, seu escopo, destino, estratégia e gate. O contrato técnico permanece pendente.

- Inspeções Git sem escrita podem ocorrer dentro do escopo autorizado. Criação de branches, staging e commits locais exigem cobertura da delegação.
- Push, criação de PRs, checks, merge e outras operações de integração podem ser automatizados após autorização humana inequívoca que cubra as operações e suas condições. Uma autorização já concedida dispensa reconfirmação por comando dentro desses limites.
- Force push, operações destrutivas, alteração da estratégia de merge e contorno de proteções exigem autorização específica. Diante de conflitos, checks com falha ou alterações inesperadas, interromper a operação afetada. A integração deve excluir trabalho alheio e alterações que ainda não passaram pela revisão aplicável.

## 11. Interrupções e handoffs

Falhas de processo, reinicializações inesperadas e interrupções de contexto, inclusive por limite de tokens, deixam a execução sujeita a verificação. O handoff registra o que foi comprovado, o que ficou incerto, onde estão as versões e evidências e qual é o próximo passo cabível. Na retomada, o orquestrador revalida contexto e escopo e reconcilia o estado com o histórico, os artefatos e os efeitos observáveis. O executor pode conferir o handoff e só prossegue após a validação da retomada pelo orquestrador. Operações potencialmente irreversíveis ficam suspensas se seu efeito anterior não puder ser determinado com segurança. Diante de incerteza material, o orquestrador interrompe o fluxo e solicita intervenção humana.

## 12. Persistência, promoção e limpeza

Uma área de trabalho na raiz do projeto consumidor pode guardar artefatos transitórios segregados por tarefa. O histórico necessário à retomada e as evidências de continuidade devem ter destino durável fora da área temporária. Antes de limpar, o encerramento deve estar autorizado e os registros relevantes precisam estar promovidos aos destinos persistentes. A promoção conserva a ligação entre tarefa, versão, parecer, resultado e evidência. Handoffs, reviews, evidence e documentação técnica servem a finalidades próprias. Destinos concretos, política de retenção e critérios de inclusão em Git ficam para o planejamento.

Uma exclusão Git local e a separação de permissões compatível com o escopo são soluções candidatas, condicionadas à tecnologia escolhida. O planejamento deve buscar o menor mecanismo que impeça inclusão acidental no versionamento e proteja os registros de controle e avaliação.

## 13. Invariantes

- **Preservar** autorização verificável, vínculo com projeto e baseline, escopo do executor, independência da revisão, identidade das versões e associação entre evento, resultado e evidência.
- **Impedir** escrita ou execução fora do escopo, passagem por gate sem autorização, substituição silenciosa de versão revisada, reuso automático de namespace alheio, repetição insegura quando o efeito anterior é incerto, controle baseado apenas em texto livre e uso da área temporária como destino durável único.
- **Manter** o AI Memory independente e as regras de domínio nos projetos consumidores. O orquestrador deve usar apenas o contexto autorizado para a tarefa.

## 14. O que as POCs demonstram e onde a evidência termina

- **Resultado reportado** — as POCs 001–004 têm histórico de comunicação por CLI ou MCP e carecem dos registros primários locais. Na POC-005, o script está preservado. O acionamento do Antigravity e a saída `0` foram reportados na sessão, cuja saída original está indisponível.
- **Resultado demonstrado no ambiente sintético** — nas POCs 006–007, o despachante externo intercalou processos de Codex e Antigravity com `send` e `pop` síncronos. O contexto técnico seguiu principalmente nos prompts CLI. Os pareceres ficaram abaixo dos limites dos scripts. A POC-006 registrou revisão e resposta do Codex. A POC-007 registrou detecção do defeito, RED, correção, GREEN e parecer regressivo. A revisão inicial recebeu o diff, enquanto a injeção e os testes regressivos foram omitidos.
- **Limites de validade** — os experimentos cobriram uma função Python e árvores Git sintéticas. A correlação usa os IDs de mensagem nos registros de envio e reivindicação e nos manifestos. A inbox associada ao IAS era compartilhada. Os campos `from_agent: "other"` e `from_owner_user: null` e o rótulo `--agent` de reivindicação deixam a identidade autenticada do remetente sem comprovação. A permissão gravável em `/tmp` alcançava artefatos fora da árvore verificada na POC-007. O autoteste de timeout e duplicidade teve alcance local. A evidência deixa em aberto a entrega assíncrona confiável, a recuperação após falha real, a concorrência, a generalização, os gates humanos implementados, o suporte simultâneo a múltiplos projetos e os efeitos fora do demo, inclusive sobre o IAS.
- **Inferência técnica** — a coordenação local sequencial é uma base plausível para planejar a primeira versão. A automação segura dos gates e da retomada ainda depende de um desenho verificável. [Seções 6–12 do relatório experimental](../001-relatorio-experimental.md)

## 15. Questões para planejamento técnico

| Tema | Decisões pendentes |
| --- | --- |
| Implementação e interface | Linguagem, framework, banco ou outra persistência, contratos de API e CLI e decisão sobre inclusão de interface web na V1 após avaliação de custo. |
| Mensagens e autorização | Transporte por operação, campos e formatos, versionamento dos protocolos, autenticação, comprovação da autorização inicial e validação de referências. |
| Eventos e estado | Formato dos eventos, nomenclatura dos estados, armazenamento e critérios concretos de transição e reconciliação. |
| Execução e falhas | Estratégia de subprocessos, sandbox, timeouts, limites de recursos, retry automático, tratamento de efeitos externos, limite de execuções ativas e condições mínimas de integração de executores. |
| Artefatos | Identificação lógica, versionamento físico, estrutura de diretórios, isolamento da área temporária, retenção, acesso, promoção e limpeza. |
| Integração Git/GitHub | Contrato das operações, verificação das autorizações, destinos, estratégias e condições de parada. |

**Recomendação para o planejamento** — avaliar primeiro as opções locais de menor complexidade e exigir justificativa vinculada a risco ou requisito aprovado para expandir a solução.

**Proposta recomendada para a V1** — avaliar no planejamento uma interface web local mínima. Se o custo adicional for baixo ou moderado e a inclusão for aprovada, implementá-la ainda na V1 após validar o núcleo operacional via CLI. O escopo candidato é visualizar projetos, tarefas, estado das execuções, executor ativo, histórico de eventos, erros e interrupções, com acesso a relatórios e evidências relevantes. Editor visual de workflows, chat integrado, dashboards avançados, gestão complexa de permissões e funcionalidades comerciais ou multiusuário ficam fora dessa proposta mínima. A estimativa exploratória é de aproximadamente **25–50 horas adicionais**. Ela serve como referência para avaliação. Orçamento e requisitos dependem de aprovação. O planejamento deve validar o custo real antes de recomendar a inclusão ao responsável humano.

## 16. Critérios de suficiência da futura arquitetura mínima

O planejamento deverá demonstrar como a solução mínima:

1. Recebe uma tarefa autorizada, isola o contexto do projeto consumidor e coordena Codex e Antigravity em sequência, com transições verificáveis.
2. Troca referências curtas com o AI Memory como produto auxiliar independente, verifica a autorização humana por fonte própria e fixa a versão de cada artefato. Mantém a revisão independente da elaboração e da implementação e liga achado, correção e verificação regressiva quando aplicável.
3. Preserva o histórico estruturado e permite recuperar a última etapa comprovada após interrupção, encaminhando efeitos incertos ao responsável humano.
4. Respeita os gates, preserva registros antes da limpeza e permite continuidade entre sessões sem recorrer ao histórico da conversa como fonte única.
5. Mantém operação local simples para Codex e Antigravity, admite futura incorporação de executores e justifica mecanismos adicionais por riscos concretos ou requisitos aprovados.

Esses critérios orientam a avaliação do plano futuro. A homologação deste documento permanece no gate humano.
