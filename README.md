# WitDev Site

Site corporativo da WitDev com analytics próprio integrado — built with Next.js 16 App Router, PostgreSQL e Docker.

## O que é

- **Landing page** do ecossistema WitDev (produtos, stack, páginas legais)
- **Plataforma de analytics self-hosted**: coleta pageviews, cliques, scroll e tempo de permanência de qualquer site via snippet JS, armazena no PostgreSQL e exibe em painel admin protegido por JWT

## Stack

- Next.js 16 (App Router, standalone output)
- React 19 + Tailwind v4 + shadcn/ui
- PostgreSQL 17 (schema `analytics`)
- Docker Swarm + Traefik (produção)
- Portainer para gerenciamento

## Desenvolvimento

### Pré-requisitos

- Docker e Docker Compose

### Subir ambiente

```bash
cp .env.example .env.local   # configure DATABASE_URL e JWT_SECRET
./dev.sh                     # sobe, exibe logs; Ctrl+C para parar
```

Acesse: http://localhost:3000 · Admin: http://localhost:3000/admin

### Outros comandos

```bash
./dev.sh up:d      # background
./dev.sh down      # parar
./dev.sh logs      # ver logs
./dev.sh lint      # ESLint
./dev.sh shell     # shell no container
./dev.sh install   # npm install
./dev.sh clean     # remove container + volumes
```

Sem Docker:

```bash
npm run dev
npm run build
npm run lint
```

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://witdev_analytics:witdev_analytics_2026@witdev_postgres:5432/witdev_analytics` |
| `JWT_SECRET` | Segredo para assinar tokens JWT | fallback inseguro (trocar em produção) |
| `PORTAINER_URL` | URL do Portainer (build.sh) | — |
| `PORTAINER_API_KEY` | API Key do Portainer (build.sh) | — |
| `PORTAINER_ENDPOINT_ID` | ID do endpoint no Portainer | `1` |

## Analytics Tracker

Para rastrear qualquer site, adicione o snippet:

```html
<script src="https://witdev.com.br/tracker.js" data-site="meu-site" async></script>
```

Eventos coletados automaticamente: `pageview`, `leave` (com tempo de permanência), `scroll` (depth), `click` (em elementos com `data-track="nome"`).

## Build e deploy

```bash
./build.sh                  # build + push + force-update Swarm (requer PORTAINER_* no .env.local)
./build.sh v1.2.3           # com tag versionada
./build.sh --no-deploy      # só build + push
```

A imagem `witrocha/witdev-site:latest` é construída via `Dockerfile.prod` (multi-stage, Node 22 Alpine) e deployada no Docker Swarm gerenciado pelo Portainer em `witdev.com.br`.

## Banco de dados

O script `scripts/db-prepare.js` roda automaticamente no startup do container de produção e garante que o banco e as tabelas existam. Em desenvolvimento, o banco é inicializado no primeiro request de tracking.

Schema: `analytics`
Tabelas: `analytics.page_views`, `analytics.admins`
