# Relatório experimental de integração entre AI Memory, Codex e Antigravity

**Origem e autoria** — consolidação experimental e saneamento documental R1 pelo Codex, com insumos das revisões do GPT e do Antigravity.

**Data e status** — edição de 2026-11-19, sujeita à revisão regressiva e à homologação humana.

## 1. Resumo executivo

As POCs 006 e 007 registram ciclos completos em repositórios Git sintéticos. Na 006, o Codex implementou uma função Python, o Antigravity emitiu um parecer e o Codex documentou sua resposta. Na 007, uma revisão identificou quatro categorias de falhas de whitespace em uma versão deliberadamente defeituosa que ainda passava nos testes públicos. Os logs registram quatro falhas nos testes regressivos antes da correção, cinco testes aprovados depois dela e um parecer regressivo favorável.

A POC-005 tem código-fonte disponível e PASS reportado na sessão experimental. A cronologia das POCs 001 a 004 foi reconstituída a partir do relato dessa sessão. O material sustenta planejar uma coordenação de agentes que preserve autorização humana e evidências por etapa. A arquitetura e a tecnologia permanecem em aberto.

## 2. Motivação e problema original

O trabalho entre agentes envolve transferir contexto, acionar o executor certo, encaminhar alterações para revisão e preservar as evidências necessárias à decisão humana. Um mecanismo de comunicação cobre a troca de informações. O controle da sequência, dos efeitos de cada execução e das autorizações precisa ser explicitado para que esse fluxo possa ser usado em diferentes projetos.

**Decisão estratégica humana** — concentrar o desenvolvimento futuro no AI Agent Orchestrator em parceria com o AI Memory. O AI Orchestration Lab será preservado como referência histórica, sem continuidade ativa de desenvolvimento prevista. Eventual migração de seus artefatos ou contratos e qualquer decisão sobre incorporação de capacidades planejadas dependem de deliberação específica.

## 3. Objetivo da integração multiagente

O objetivo experimental foi investigar se Codex e Antigravity podem participar, em modo não interativo, de um fluxo coordenado com solicitações e pareceres correlacionados pelo AI Memory.

A independência em relação às regras de domínio de IAS, Jungle e outros repositórios orienta o produto futuro. A proposta de coordenação, sujeita a deliberação, cobre designação de executores, execução, validação, revisão, correção e gates humanos.

## 4. Ambiente e ferramentas

| Componente | Registro disponível |
| --- | --- |
| Ubuntu no WSL2 | Ambiente experimental informado na descrição da tarefa. |
| AI Memory 3.4.7 | Versão informada na descrição da tarefa. O histórico da sessão reporta uso da CLI na POC-001 e integração MCP nas etapas seguintes de comunicação. Nas POCs 005 a 007, os scripts consultados usam a CLI do AI Memory para as operações da inbox. |
| Codex CLI | Os logs das POCs 006 e 007 identificam a versão 0.170.0, o modelo `gpt-6.2-sol`, `approval: never` e `sandbox: workspace-write [workdir, /tmp, $TMPDIR]`. Os scripts acionam o Codex em modo não interativo. |
| Antigravity CLI | A POC-005 prevê invocação via wrapper `ai-memory run --require-server --no-autowire --no-exit-prompt antigravity --mode plan --print`. As POCs 006 e 007 invocam diretamente `agy --mode plan --print`. A versão precisa não foi obtida das fontes consultadas. |
| Python 3 | Linguagem dos despachantes e ambiente dos testes com `unittest`. A versão de patch experimental não foi estabelecida. |
| Git | Usado para criar repositórios de demonstração e, nas POCs 006 e 007, para manter a referência inicial no índice. A leitura atual das duas árvores confirma ausência de commits. |

A preparação examinou as fontes por leitura. Nenhuma POC, teste experimental ou sessão dos executores foi iniciada durante a consolidação.

## 5. Papel do AI Memory

O AI Memory, criado por Fábio Akita, permanece um produto independente de memória persistente e comunicação. Os scripts das POCs 005 a 007 apontam para a mesma inbox, `default/luishenriqs-identity-and-access-server`, associada ao IAS. Os registros das POCs 006 e 007 confirmam o uso desse namespace tanto na origem quanto no destino, embora os arquivos de código dessas execuções estivessem em repositórios Git temporários separados.

O orquestrador proposto poderá usar esse canal e manter a autorização e a situação do trabalho sob controle próprio. Reivindicação confirma a transição da mensagem na inbox. A conclusão de uma etapa depende das evidências e dos critérios do trabalho autorizado.

## 6. Cronologia das POCs 001 a 007

| Etapa | Registro cronológico | Base e limite |
| --- | --- | --- |
| POC-001 | Verificar envio, listagem e reivindicação de mensagens pela CLI do AI Memory. | Histórico reportado na sessão experimental. |
| POC-002 | Verificar a consulta da inbox pelo Antigravity via MCP, incluindo a dificuldade inicial de permissões em execução não interativa. | Histórico reportado na sessão experimental. |
| POC-003 | Verificar o envio de uma mensagem pelo Antigravity por meio da ferramenta MCP `memory_message_send`. | Histórico reportado na sessão experimental. |
| POC-004 | Verificar o recebimento e a leitura pelo Codex da mensagem enviada pelo Antigravity. | Histórico reportado na sessão experimental. |
| POC-005 | Acionamento do Antigravity a partir de uma mensagem-alvo. | Script inspecionado. PASS e saída `0` reportados na sessão experimental. |
| POC-006 | Implementação, solicitação de revisão, parecer e tratamento da resposta. | Script, manifesto, logs, teste, código e resposta textual disponíveis. |
| POC-007 | Injeção de defeito, revisão adversarial, RED, correção, GREEN e revisão regressiva. | Script, manifesto, logs, registro da injeção, testes e código final disponíveis. |

### POCs 001 a 004 — Comunicação

Os resultados dessas etapas foram apresentados na sessão experimental acompanhada pelo GPT. A sequência reportada vai da verificação das operações da inbox pela CLI até a leitura, pelo Codex, da mensagem enviada pelo Antigravity. A cronologia individualizada deriva desse relato. O conjunto local examinado carece dos registros primários necessários para verificar independentemente essas quatro execuções.

### POC-005 — Acionamento automático

O despachante em Python consulta a inbox do IAS indicada na seção 5 e procura uma mensagem pendente pelo assunto e pelo corpo da solicitação experimental. Trata múltiplas correspondências como ambiguidade, reivindica pelo ID, verifica ID e estado retornados e grava o ID antes de acionar o Antigravity. O código prevê captura de stdout, stderr e código de saída, exige a confirmação textual esperada e encerra sem retry em caso de falha.

Segundo o relato da sessão experimental, a saída dos terminais exibida aos participantes confirmou o acionamento automático do Antigravity a partir dessa inbox e o código de saída `0`. O conjunto local contém o script, e a saída original da execução permanece indisponível para conferência. O PASS tem, portanto, a sessão como fonte.

### POC-006 — Implementação e revisão

O Codex implementou `normalize_label` em uma árvore sintética. O despachante enviou e reivindicou a solicitação pelo AI Memory e encaminhou a especificação, os testes e o diff ao Antigravity. O parecer aprovou a implementação. O despachante registrou o retorno na inbox, reivindicou pelo ID e incluiu o parecer no contexto enviado ao Codex, que produziu `demo/REVIEW_RESPONSE.md`.

O manifesto registra PASS. Os logs registram cinco testes aprovados antes da revisão e cinco no fim, ambos com saída 0. A solicitação e a resposta têm logs de envio e reivindicação com saída 0 e IDs coincidentes com o manifesto. O parecer foi textual, com base no material fornecido. A checagem da árvore cobria caminhos de arquivo e links simbólicos, sem comprovar a imutabilidade de cada arquivo permitido ou efeitos fora do diretório experimental.

### POC-007 — Revisão adversarial

1. O Codex produziu a implementação inicial e os três testes públicos passaram.
2. O despachante substituiu o conteúdo de `labels.py` por uma versão de teste com `split(" ")` e registrou os hashes anterior e defeituoso. Os três testes públicos continuaram passando.
3. A revisão inicial do Antigravity foi cega quanto à injeção deliberada e aos testes regressivos ocultos. O revisor recebeu a especificação, a fonte, o diff e os testes públicos. Em seu parecer `AJUSTES`, apresentou contraprovas para espaços nas extremidades, espaços repetidos, tabulações e quebras de linha, e entradas compostas apenas de whitespace.
4. O RED registrou cinco testes, quatro falhas e saída 1. O caso de string vazia passou nessa etapa.
5. O Codex corrigiu a função usando `split()` sem argumento. O GREEN registrou cinco testes regressivos aprovados, e os três testes públicos continuaram passando, ambos com saída 0.
6. O Antigravity emitiu parecer regressivo `APROVADO` após examinar as versões e os casos. O despachante registrou o parecer e reivindicou a resposta na inbox sob o rótulo do Codex. O fluxo termina nessa entrega. O artefato não registra outra sessão do Codex depois do parecer final.

O manifesto registra PASS e quatro mensagens correlacionadas, compondo dois ciclos de solicitação e resposta. Os quatro IDs coincidem com os logs de envio e reivindicação, todos com saída 0. O hash da fonte final coincide com o hash corrigido do manifesto. O manifesto também registra um autoteste local de duplicidade, timeout e ausência de retry. O script mostra que ele usa um conjunto em memória e um subprocesso de teste separado. Isso limita a evidência sobre concorrência real e recuperação após queda.

### Mediação das mensagens nas POCs 006 e 007

O mesmo despachante executou `send` e `pop` por ID em sequência síncrona via CLI. Nos seis registros de reivindicação, os intervalos entre `created_at` e `claimed_at` ficaram entre cerca de 19 e 22 ms. Os agentes receberam o contexto do despachante nos prompts CLI. As requisições na inbox continham resumos curtos e os prompts de revisão levavam a especificação e, conforme a etapa, código-fonte, diff e testes.

Os scripts limitavam o texto dos pareceres enviado à inbox aos primeiros 25.000 caracteres na POC-006 e aos primeiros 20.000 na POC-007. Nas etapas em que o Codex tratou o parecer, o despachante inseriu no prompt o texto da saída do revisor sujeito ao mesmo limite. O truncamento citado no achado R1-003 do [parecer independente](reviews/001-revisao-independente-r1.md) corresponde à regra dos scripts. Os três pareceres registrados ficaram abaixo dos limites e seus textos constam integralmente nos registros da inbox.

## 7. Resultados efetivamente demonstrados

- Os artefatos das POCs 006 e 007 registram que um despachante externo conseguiu intercalar execuções de Codex e Antigravity com operações de envio e reivindicação via CLI do AI Memory em um fluxo sintético.
- A POC-006 registra o processamento do parecer pelo Codex e duas execuções da suíte de cinco testes com saída 0.
- A POC-007 registra que uma revisão baseada na especificação detectou defeitos ausentes da suíte pública. Os mesmos cinco testes regressivos registraram quatro falhas no RED e nenhuma no GREEN. O parecer regressivo confirmou a correção no caso estudado.
- O acionamento automático pela observação da inbox na POC-005 é sustentado pela lógica do script e pelo relato da sessão. As operações de comunicação das POCs 001 a 004, incluindo o uso de CLI e MCP, permanecem resultados reportados.

## 8. Evidências e limitações

**Verificação direta** significa que o arquivo, seu conteúdo ou a concordância entre artefatos foi conferida nesta preparação. **Resultado reportado** atribui uma afirmação à sessão experimental, à descrição da tarefa ou ao registro do executor ou despachante. **Inferência técnica** é uma conclusão extraída do conjunto, limitada aos casos e às condições que ele representa. **Hipótese** é uma explicação ou expectativa ainda sujeita a verificação. **Proposta futura** é uma opção técnica ainda sujeita a deliberação e homologação. **Decisão humana estabelecida** é uma orientação já definida pelo responsável humano, como o direcionamento estratégico da seção 2.

| Fonte consultada | Evidência usada |
| --- | --- |
| Relato da sessão experimental acompanhado pelo GPT, fornecido na revisão documental | Histórico individualizado das POCs 001 a 004 e relato de acionamento automático e saída `0` da POC-005. |
| Descrição da tarefa | Contexto e ambiente informados e orientação estratégica humana. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_005.py` | Seleção, reivindicação, registro local, acionamento e condição de sucesso. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_006.py` | Fluxo entre executores, critérios de parada, limites do repositório sintético e geração dos artefatos. |
| `/tmp/ias-ai-memory-poc-006-3nvadl13/` | `result.json`, logs de agentes, mensagem e testes em `_poc_logs/`, `demo/labels.py`, testes públicos, `demo/REVIEW_RESPONSE.md` e estado Git do demo. |
| `/mnt/c/Users/<perfil-windows>/Downloads/poc_ai_memory_007.py` | Injeção, verificação da árvore, roteamento de mensagens, critérios RED/GREEN e autoteste local. |
| `/tmp/ias-ai-memory-poc-007-c5_hla_j/` | `result.json`, `_poc_logs/fault-injection.json`, logs de agentes, mensagens, pareceres e testes, `regression_tests.py`, fonte, testes públicos e estado Git do demo. |

Para identificar os manifestos inspecionados caso permaneçam disponíveis, o SHA-256 do `result.json` da POC-006 é `9a3a37ce1dce4162aa1371e50653599aefb555531220ca9784494f29001374bd` e o da POC-007 é `4e6646242b523f1eed43f6c5f0734117c779dabfa908267bdbdbd020ef2aecf1`. As referências em `/tmp` são voláteis. Os artefatos originais permanecem em seus locais de origem.

A POC-006 registra `ias_touched: false` no manifesto. O registro é uma afirmação do despachante. A POC-007 registra explicitamente a ausência de verificação independente desse ponto. As verificações das árvores sintéticas não oferecem uma auditoria de efeitos no IAS histórico. Também ficaram indisponíveis no conjunto indicado os registros primários das POCs 001 a 004 e o resultado de execução da POC-005.

Nos envios via CLI das POCs 006 e 007, a saída de `send` identifica o ID e o namespace de origem e destino. O JSON obtido no `pop` registra `"from_agent": "other"` e `"from_owner_user": null`. O parâmetro `--agent` de `pop` informa o rótulo do reivindicante escolhido pelo despachante. Esses registros sustentam a correlação das mensagens por ID e deixam a identidade autenticada do remetente sem comprovação.

## 9. Problemas encontrados e soluções aplicadas

- **Ambiguidade e duplicidade de mensagem.** A POC-005 interrompe diante de múltiplas correspondências e registra localmente o ID reivindicado. As POCs 006 e 007 verificam o ID recém-enviado e o estado retornado. A POC-007 confere também assunto, corpo e repetição dentro da execução. Uma interrupção entre reivindicação e registro durável pode exigir conciliação.
- **Interpretação de falhas do processo.** Os scripts tratam códigos de saída e timeouts e interrompem o fluxo nos erros previstos, sem nova tentativa automática. Nas POCs 006 e 007, logs por etapa preservam a saída e os códigos observados. O autoteste local da POC-007 oferece evidência limitada sobre o mecanismo, sem teste de falha distribuída.
- **Cobertura insuficiente.** O defeito de separação por espaço literal escapou da suíte pública da POC-007. Parecer com contraprovas e testes regressivos reduziram essa lacuna. A correção passou a separar sequências de whitespace e ignorar whitespace nas extremidades.
- **Escopo e independência.** As POCs 006 e 007 usaram repositórios sintéticos e revisões textuais. A POC-007 acrescentou hashes para arquivos protegidos e conferiu que a fonte permaneceu igual durante as revisões. A evidência cobre a árvore e os arquivos observados.

## 10. Arquitetura conceitual resultante

A sequência de trabalho candidata começa com a autorização humana de uma tarefa. O orquestrador vincula escopo, repositório e referência de trabalho, aciona um executor e coleta os resultados e evidências de validação. Uma solicitação de revisão pode trafegar pelo AI Memory com referência à tarefa e à versão examinada. O orquestrador recebe o parecer, prepara correção e nova revisão quando aplicável e apresenta as evidências para decisão humana.

A inferência dos experimentos é que comunicação, execução e verificação podem ser coordenadas por uma camada externa. Permanecem em aberto o mecanismo de persistência, o transporte, o isolamento de execução e o modelo operacional de cada gate.

## 11. Responsabilidades propostas

| Ator | Responsabilidade candidata |
| --- | --- |
| AI Memory | Memória persistente, contexto e comunicação entre agentes, incluindo solicitações e pareceres correlacionáveis. |
| Orquestrador | Controlar sequência, processos, estados, limites autorizados, vínculos entre versões e evidências, tratamento de falhas e encaminhamento aos gates. |
| Executores e revisores | Implementar, testar ou revisar conforme designação e permissões. Registrar resultado, evidência e limitações. O revisor examina a versão indicada e explicita os motivos do parecer. |
| Responsável humano | Aprovar escopo e mudanças, resolver exceções, homologar decisões e autorizar integração. Mensagens dos agentes entram como insumo técnico. |

## 12. Riscos técnicos ainda não resolvidos

- Falhas e concorrência entre reivindicação, persistência, início do processo e gravação da saída podem deixar tarefa ou mensagem em estado incerto.
- Processos filhos, limites de tempo, cancelamento e recuperação de execução parcial precisam de investigação no ambiente alvo.
- Mensagens e pareceres podem conter instruções indevidas ou referências manipuladas. Autorização e identidade do agente precisam de verificação independente do conteúdo recebido.
- A seleção de workspace e as verificações posteriores de árvore não garantem, por si só, contenção de acesso a outros projetos, configurações, credenciais ou rede.
- Na POC-007, a área gravável `/tmp` incluía o diretório pai de `demo/`, onde ficavam `regression_tests.py`, `_poc_logs/` e `result.json`. Esses artefatos estavam fora da árvore verificada por `guard_tree`. Os logs da correção não mostram acesso do Codex a `regression_tests.py`. A configuração registrada permitia escrita nesse local.
- Pareceres em texto livre podem ser ambíguos. Os scripts usam padrões textuais simples em alguns critérios, sujeitos a negociação de formato e validação.
- Retenção em `/tmp`, exposição de dados em logs e divergência entre fonte testada e fonte revisada afetam a rastreabilidade. As POCs cobrem uma função pequena e execuções controladas, com generalização e escala por avaliar.

## 13. Requisitos candidatos ao planejamento

1. Vincular cada execução a um ID de tarefa, projeto autorizado, versão de referência, escopo, papel e autorização humana verificável.
2. Registrar transições de estado e IDs de mensagens com evidências de processo, testes, revisão e decisão humana vinculadas à versão avaliada.
3. Validar origem, destino, tipo e correlação da mensagem antes de usá-la como contexto. Preservar a distinção entre reivindicação e conclusão.
4. Prever isolamento da execução, orçamento de arquivos e permissões proporcionais ao papel. Delimitar alterações em Git e acessos externos conforme autorização.
5. Definir semântica para duplicidade, concorrência, timeout, cancelamento, retomada e conciliação manual, com efeitos verificáveis.
6. Vincular revisão ao conteúdo exato, preservar independência e exigir contraprovas para achados reproduzíveis quando aplicável.
7. Guardar evidências suficientes para auditoria com controle de acesso, retenção definida e redução de dados sensíveis.
8. Submeter mudanças de escopo, homologação e integração ao gate humano aplicável.

## 14. Questões arquiteturais pendentes

- Qual componente mantém o estado de execução e como concilia divergências com estados e IDs da inbox?
- Quais operações usarão CLI, MCP ou outro contrato suportado e qual será o formato versionado das mensagens?
- Onde os agentes executarão e como limites de leitura, escrita, subprocessos e rede serão verificados?
- Qual modelo de concorrência, propriedade da execução e retomada cobre falhas entre reivindicação e acionamento?
- Qual artefato identifica a versão analisada, principalmente antes de um commit, e como a revisão vinculará essa versão aos resultados dos testes?
- Como registrar identidades, aprovações humanas, retenção e acesso a evidências em diferentes projetos?
- Quais são os critérios mínimos para adotar a solução em um repositório real e quais operações de integração exigirão autorização específica?

## 15. Recomendações para a próxima fase

Iniciar o planejamento técnico com aprovação humana de um escopo pequeno e verificável. Priorizar a modelagem de estados, do vínculo entre versão e evidência, da fronteira de autorização e dos cenários de falha entre reivindicação e início do processo. Comparar opções de integração com o AI Memory e de isolamento com base nesses requisitos. Definir critérios mensuráveis para duplicidade, timeout, retomada e contenção antes de pedir autorização para novos experimentos ou implementação.

Recomenda-se preservar em armazenamento persistente os artefatos essenciais disponíveis das POCs 005 a 007. O caminho `evidence/pocs/` é uma estrutura candidata, sujeita a aprovação como contrato de armazenamento. O conjunto deve reunir logs de execução e códigos de saída, manifestos, pareceres, versões do código avaliado, testes e resultados RED/GREEN quando aplicáveis. Registrar a origem, a execução e a versão associada a cada artefato e verificar sua integridade com hashes SHA-256. Definir acesso e retenção e reduzir dados sensíveis nas cópias compartilhadas, registrando as supressões e a relação com os originais sob acesso restrito.

A autorização desta etapa cobre a preparação local e documental. Arquitetura, stack, implementação e integração Git dependem de deliberação própria.
