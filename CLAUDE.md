# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Local development (no Docker)
```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

### Docker-based development (preferred)
```bash
./dev.sh           # Start dev environment (Docker), attach logs, Ctrl+C stops
./dev.sh up:d      # Start in background
./dev.sh down      # Stop
./dev.sh logs      # Tail logs
./dev.sh lint      # Run ESLint inside container
./dev.sh shell     # Shell inside container
./dev.sh install   # npm install inside container
./dev.sh clean     # Remove container + volumes
```

### Build & deploy to production
```bash
./build.sh                  # Build Docker image, push to witrocha/witdev-site:latest, and force-update Swarm
./build.sh v1.2.3           # Build and push with a versioned tag too
./build.sh --no-deploy      # Build + push only, no Portainer force-update
```
Requires `PORTAINER_URL`, `PORTAINER_API_KEY` (and optionally `PORTAINER_ENDPOINT_ID`) in `.env.local` for auto-deploy.

## Architecture

This is the **WitDev corporate website** — a Next.js 16 App Router application that doubles as a **self-hosted web analytics platform**.

### Two distinct responsibilities

**1. Public marketing site** (`app/page.tsx`, `app/politica-*`, `app/termos-de-uso`):
- Single-page landing for the WitDev ecosystem (products, tech stack, legal pages).
- Forced dark theme only (`themes: ["dark"]` in `app/layout.tsx`).

**2. Self-hosted analytics backend + admin panel** (`app/api/`, `app/admin/`, `lib/`, `public/tracker.js`):
- `public/tracker.js` — a lightweight (~3KB) vanilla-JS snippet embedded on any site via `<script src="…/tracker.js" data-site="my-site">`. It collects pageviews, clicks, scroll depth, and time-on-page via `sendBeacon` / `fetch`.
- `app/api/track/route.ts` — public POST endpoint that receives tracker events, geolocates the IP via `ip-api.com` (in-memory cache, 24h TTL), and writes to PostgreSQL.
- `app/api/admin/` — protected REST endpoints for the admin panel (stats, events, locations, auth).
- `app/admin/` — client-side admin SPA (Dashboard, Mapa, Eventos, Tempo Real TODO, Logs TODO). Auth guard lives in `app/admin/layout.tsx` using `/api/admin/auth/me`.

### Data layer (`lib/`)

- `lib/db.ts` — singleton `pg.Pool`, `query()` helper, and `initDatabase()` which creates the `analytics` schema with `page_views` and `admins` tables if they don't exist.
- `lib/auth.ts` — JWT (jose/HS256, 7-day expiry) + bcrypt. Auth cookie: `witdev_admin_token` (httpOnly).
- `lib/geo.ts` — IP → lat/lon via `ip-api.com` (free tier, 45 req/min), in-process LRU cache.

### Database

PostgreSQL via `DATABASE_URL` env var. Schema: `analytics`. Tables: `analytics.page_views`, `analytics.admins`.

`scripts/db-prepare.js` runs at container startup (production) to ensure the database and schema exist before the app starts.

Default dev connection (from `lib/db.ts`): `postgresql://witdev_analytics:witdev_analytics_2026@witdev_postgres:5432/witdev_analytics`

### Production deployment

Docker Swarm managed via Portainer. The stack is defined in `docker-compose-producao.yaml`. The image `witrocha/witdev-site:latest` is built locally with `Dockerfile.prod` (multi-stage, Node 22 Alpine, Next.js standalone output) and pushed to Docker Hub before Portainer force-updates the running service.

Traefik handles TLS termination and HTTP→HTTPS redirect for `witdev.com.br`.

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `PORTAINER_URL` | For `build.sh` auto-deploy |
| `PORTAINER_API_KEY` | For `build.sh` auto-deploy |
| `PORTAINER_ENDPOINT_ID` | Portainer endpoint (default: `1`) |

Copy `.env.example` → `.env.local` to start. The `dev.sh` script does this automatically if `.env.local` is missing.

### Key conventions

- Path alias `@/` maps to the project root (configured in `tsconfig.json`).
- Tailwind v4 with `tw-animate-css`; shadcn/ui components in `components/ui/`.
- Admin pages marked `todo: true` in the nav items array ([app/admin/layout.tsx](app/admin/layout.tsx)) render as disabled links — this is intentional scaffolding.
