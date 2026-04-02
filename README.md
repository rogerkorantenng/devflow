# DevFlow — AI DevOps Command Center

AI-powered developer operations platform that connects to GitHub, Slack, Linear, Google Calendar, and Vercel via Auth0 Token Vault.

## Features

- **Workflow Builder** — Drag-and-drop automation pipelines with React Flow
- **Command Palette** — Cmd+K for instant actions across all services
- **Token Vault Security** — Auth0 manages all OAuth tokens, agents never store credentials
- **Step-Up Auth** — MFA required for destructive operations (CIBA)
- **Permission Manager** — Full visibility and control over agent access per service
- **Audit Trail** — Every action logged with service, scope, timestamp, and approval status

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, shadcn/ui, React Flow, cmdk
- **Backend:** FastAPI, SQLite, SQLAlchemy, aiosqlite
- **Auth:** Auth0 for AI Agents (Token Vault, CIBA step-up auth)
- **AI:** Vercel AI SDK, OpenAI

## Setup

### Prerequisites
- Node.js 20+
- Python 3.11+
- Auth0 account with Token Vault enabled

### Frontend
```bash
cd frontend
cp .env.local.example .env.local  # fill in Auth0 credentials
npm install
npm run dev
```

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
cp .env.example .env  # fill in Auth0 credentials
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Auth0 Configuration

See [AUTH0_SETUP.md](./AUTH0_SETUP.md) for detailed Auth0 tenant setup instructions.

## Architecture

```
Next.js Frontend (Auth0 sessions, Token Vault, AI SDK tools)
    ↓ REST + SSE
FastAPI Backend (Workflow engine, CRUD APIs, SQLite)
    ↓ OAuth Token Exchange
Auth0 Token Vault (GitHub, Slack, Linear, Calendar, Vercel)
```

## Connected Services

| Service | Read | Write | Step-Up |
|---------|------|-------|---------|
| GitHub | Issues, PRs | Labels, Comments | Force merge |
| Slack | Channels | Messages | Public channels |
| Linear | Issues | Create/Update | Bulk operations |
| Calendar | Events | Create events | Modify others' |
| Vercel | Deployments | Preview deploy | Promote to prod |

## License

MIT
