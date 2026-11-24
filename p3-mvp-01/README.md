# P3-MVP-01 · fatia local offline

Em uma instalação de teste, registre uma tarefa, confira a especificação canônica e aprove seu digest pela CLI. O coordenador prepara uma worktree a partir da fixture local, executa um substituto confinado, captura o arquivo autorizado, executa a verificação sobre o snapshot e oferece o handoff pinado. O leitor da verificação usa o snapshot em modo somente leitura e tem scratch separado. A atribuição de revisão independente de código e a decisão humana de homologação continuam fora da CLI.

A raiz privada de cada instalação deve ser nova, em ext4, sob um caminho canônico com basename `p3-mvp-01-*`. Ela abriga a fixture sem remoto e áreas distintas de controle, tentativas e evidências. O Bubblewrap só recebe montagens explícitas. O estado SQLite, o segredo de autenticação sintética, a árvore principal da fixture, a instalação do coordenador e os logs autoritativos ficam fora das montagens do substituto. A autoridade sintética assume que a CLI no host e o proprietário da raiz são confiáveis. Ela serve à verificação do fluxo offline.

## Reprodução

Na worktree dedicada, com o Node 24.22.2, Git 2.34.1, Bubblewrap 0.6.1 e prlimit 2.37.2 do ambiente validado:

```sh
node --test --test-concurrency=1 p3-mvp-01/test/offline.test.ts
```

Execute sob UID comum no contexto que permite ao Bubblewrap criar os namespaces explícitos. Um filtro externo que negue NETLINK_ROUTE torna a prova de isolamento inconclusiva. O teste faz uso de instâncias descartáveis separadas e preserva seus artefatos. Nenhum script depende de npm.

Exemplo de uso manual em uma instalação descartável:

```sh
root="/tmp/p3-mvp-01-$(node -p 'require("node:crypto").randomUUID()')"
cli=p3-mvp-01/cli.ts
node "$cli" init "$root" project
baseline=$(git -C "$root/fixture" rev-parse HEAD)
node -e 'console.log(JSON.stringify({project:"project",task:"task",baseline:process.argv[1],executor:"offline-substitute",reviewer:"independent-reader",files:["task.txt"],output:"verified offline result\n",test:"exact-output",timeoutMs:2500}))' "$baseline" > "$root/submission.json"
node "$cli" register "$root" "$root/submission.json"
# Confira canonical e use o digest exibido pelo registro.
node "$cli" approve "$root" DIGEST 30000
node "$cli" run "$root"
node "$cli" handoff "$root"
```

`status` retorna histórico e disposição da última tentativa, inclusive em falha. `revoke` e `cancel` invalidam a autorização em vigor. `recover` inspeciona estado, efeitos locais e custódia ao reabrir. Um registro de spawn sem observação do kernel ou uma entrega cujo efeito continua incerto retém a reserva. Retomar trabalho a partir de uma nova autorização permanece uma decisão separada. Esta instalação offline administra uma única especificação e uma tentativa autorizada, sem reciclar a reserva para uma nova tarefa. `P3_TEST_CASE` e `P3_TEST_FAULT` são entradas de teste do coordenador confiável, excluídas do ambiente arbitrário do processo confinado.

## Estado e fronteiras

SQLite usa journal DELETE e `synchronous=EXTRA`. A reserva é persistida antes de preparar Git. O identificador de tentativa é gravado antes do spawn. O supervisor observa PID, identidade de nascimento e namespace antes de publicar o sinal de liberação em um diretório visível somente em leitura ao processo confinado. A liberação é ordenada contra a revogação sob a transação de controle. A confirmação do subprocesso é verificada separadamente. Uma queda entre o efeito e seu registro conserva informações de recuperação e impede novo despacho. A observação de saída, prazo e cessação pertence ao supervisor.

A cadeia é Node → Bubblewrap → prlimit → Node. `RLIMIT_NPROC` limita tarefas e threads na contabilidade do UID, com 24 como teto soft e hard neste perfil. `RLIMIT_FSIZE` limita cada arquivo a 65.536 bytes. O coordenador aplica 8 KiB ao total capturado, e os artefatos se restringem à lista autorizada com tamanho validado. Os limites de UID e de arquivo não representam uma quota exclusiva da instalação nem quota agregada de ext4. As provas valem para a carga e o perfil offline, com fonte em leitura durante teste e verificação.

A separação física de Git protege a fixture-base e seus refs. O ponto de montagem do gitfile na worktree é somente leitura e o gitdir comum está fora da visão do processo. A CLI não oferece efeitos remotos, integração, homologação, limpeza ou execução de agentes reais. O resultado `verified` abrange o candidato e suas provas offline. Ele mantém pendentes a revisão independente e a decisão humana aplicável.
