# Mars Explorer

A self-hosted Mars rover photo explorer. Browse thousands of real photos taken by NASA's Curiosity, Perseverance, Opportunity, and Spirit rovers — served from your own infrastructure.

> **Why this fork?** The original [mars-photo-api](https://github.com/corincerami/mars-photo-api) by [Corin Cerami](https://github.com/corincerami) was archived in 2025. I forked it to keep a working version of this API as a learning project and added a React frontend with Docker Compose for easy self-hosting.

## What's Inside

```
mars_explorer/
├── backend/          Rails API serving Mars rover photo data
├── frontend/         React SPA for browsing photos
├── docker-compose.yml        Production setup
└── docker-compose.dev.yml    Development setup
```

**Backend** — Rails 8 API (forked from `corincerami/mars-photo-api`)
- REST API at `/api/v1/` with rovers, photos, cameras, and manifests
- Scrapers that fetch photo metadata directly from NASA/JPL
- PostgreSQL + Redis

**Frontend** — React 18 SPA
- Browse by rover, camera, sol (Martian day), or Earth date
- Photo lightbox, infinite scroll, favorites (local storage)
- Chakra UI, React Query, TypeScript, Vite

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Chakra UI, React Query |
| Backend | Ruby 3.2, Rails 8, Puma |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Proxy | Nginx (serves frontend + proxies `/api/` to backend) |
| Deployment | Docker Compose |

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### 1. Clone and configure

```bash
git clone https://github.com/franpiaggio/mars_explorer.git
cd mars_explorer
cp .env.example .env
```

Edit `.env` with secure values:

```bash
# Generate a secret key
openssl rand -hex 64
```

```env
DB_USERNAME=mars
DB_PASSWORD=your_secure_password
DB_NAME=mars_curiosity_production
SECRET_KEY_BASE=paste_generated_key_here
NASA_API_KEY=DEMO_KEY
```

> Get a free NASA API key at [api.nasa.gov](https://api.nasa.gov/) for higher rate limits. `DEMO_KEY` works but is throttled.

### 2. Build and start

```bash
docker compose up -d --build
```

This starts PostgreSQL, Redis, the Rails API, and the Nginx frontend. The database is created and migrated automatically on first run.

### 3. Seed rover data

```bash
# Seed rovers and cameras (fast, ~5 seconds)
npm run seed
```

### 4. Scrape photos from NASA

Each scraper fetches photo metadata from NASA/JPL. They take a while depending on the rover (Curiosity has 700k+ photos).

```bash
# Run one at a time — each takes minutes to hours
npm run scrape:perseverance
npm run scrape:curiosity
npm run scrape:opportunity
npm run scrape:spirit
```

> You can start using the app after seeding — scrapers can run in the background.

### 5. Open the app

Visit [http://localhost](http://localhost) (or whatever port you configured via `PORT`).

## Development

```bash
# Start in dev mode (frontend with hot reload on port 5174)
npm run dev

# View logs
npm run logs

# Rails console
npm run rails:console

# Database console
npm run db:console
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all services in dev mode |
| `npm run up:build` | Build and start production containers |
| `npm run down` | Stop all services |
| `npm run seed` | Seed rovers and cameras (no photos) |
| `npm run scrape:perseverance` | Scrape Perseverance photos from NASA |
| `npm run scrape:curiosity` | Scrape Curiosity photos from NASA |
| `npm run scrape:opportunity` | Scrape Opportunity photos from NASA |
| `npm run scrape:spirit` | Scrape Spirit photos from NASA |
| `npm run logs` | Follow all container logs |
| `npm run rails:console` | Open Rails console |
| `npm run db:console` | Open PostgreSQL console |
| `npm run clean` | Stop containers and **delete all data** |

## Deploy with Coolify

This project is ready for [Coolify](https://coolify.io/) deployment:

1. Push this repo to GitHub
2. In Coolify, create a new resource > **Docker Compose**
3. Point it to your GitHub repo
4. Add the environment variables from `.env.example` in Coolify's environment settings
5. Deploy

Coolify handles SSL termination automatically. The `PORT` variable lets Coolify map the exposed port — the default (`80`) works out of the box.

After deployment, SSH into your server and seed the data:

```bash
cd /path/to/your/deployment
docker compose exec backend bundle exec rails runner db/seeds_only_rovers.rb
docker compose exec backend bundle exec rake scrape_perseverance
# ... repeat for other rovers
```

## API Endpoints

The backend serves a REST API under `/api/v1/`:

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/rovers` | List all rovers |
| `GET /api/v1/rovers/:name/photos` | Photos by rover (supports `sol`, `earth_date`, `camera`, `page`) |
| `GET /api/v1/rovers/:name/latest_photos` | Latest available photos |
| `GET /api/v1/manifests/:name` | Mission manifest for a rover |
| `GET /api/v1/rovers/:name/available_dates` | Dates with available photos |

## Architecture

```
┌─────────────┐     ┌──────────────────────────┐     ┌────────────┐
│   Browser    │────▶│  Nginx (frontend:80)     │     │            │
│              │     │  - Serves React SPA      │     │ PostgreSQL │
│              │     │  - Proxies /api/ ────────┼────▶│            │
└─────────────┘     └──────────────────────────┘     └────────────┘
                              │                            ▲
                              ▼                            │
                     ┌──────────────────┐           ┌─────┴──────┐
                     │  Rails API :3000 │───────────│   Redis    │
                     │  (backend)       │           └────────────┘
                     └──────────────────┘
```

## Attribution

- **Backend API** forked from [corincerami/mars-photo-api](https://github.com/corincerami/mars-photo-api) by [Corin Cerami](https://github.com/corincerami), originally created in 2014 as part of the [Flatiron School](https://flatironschool.com/) curriculum and later featured on [NASA's Open Data Portal](https://data.nasa.gov/).
- **Mars rover photo data** courtesy of [NASA/JPL-Caltech](https://www.jpl.nasa.gov/).

## License

This project is licensed under the **GNU General Public License v3.0** — the same license as the original [mars-photo-api](https://github.com/corincerami/mars-photo-api).

You are free to use, modify, and distribute this software under the terms of the GPL-3.0. See the [LICENSE](LICENSE) file for details.
