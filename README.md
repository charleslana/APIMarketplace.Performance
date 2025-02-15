# Teste de Carga APIMarketplace.Performance [k6+Javascript]

Necessário instalar o k6

[Link para instalação](https://grafana.com/docs/k6/latest/set-up/install-k6/)

Necessário instalar o node e npm

[Link para instalação](https://nodejs.org/pt/download)

Instalar dependências de dev dentro da pasta do projeto

```bash
npm i
```

Executar teste padrão

```bash
k6 run src/index.js
```

Executar teste com logs [true ou false]

```bash
k6 run src/index.js --env HAS_LOG=true
```

Executar teste com direcionamento de url de ambiente [dev ou prod]

```bash
k6 run src/index.js --env ENV=dev 
```

Executar teste com limites de thresholds [true ou false]

```bash
k6 run src/index.js --env ABORT_FAIL=true
```

## Rodar os testes escalados

```bash
k6 run src/index.js --env STAGES_SET='[{"duration":"5s","target":500},{"duration":"10s","target":500},{"duration":"15s","target":1000},{"duration":"4s","target":0}]'
```

Aqui está o padrão de estágios utilizados em execuções dev e prod

Dev

```
'[{"duration":"5s","target":500},{"duration":"10s","target":500},{"duration":"15s","target":1000},{"duration":"4s","target":0}]'
```
Prod

```
'[{"duration":"10m","target":5000},{"duration":"20m","target":5000},{"duration":"20m","target":20000},{"duration":"10m","target":0}]'
```

## Executar com prometheus

O prometheus permite salvar as metricas enquanto o teste de performance é executado.

```bash
k6 run src/index.js --out experimental-prometheus-rw=http://prometheus:9090/api/v1/write
```

## Docker compose

```bash
docker-compose -f Docker/docker-compose.yml up
```

## Acesso ao grafana

```
http://localhost:3000/
```

Acesso: admin

Password: admin