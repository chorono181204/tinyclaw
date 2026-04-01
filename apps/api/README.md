# tinyclaw api

FastAPI backend that powers the local desktop app.

## Architecture

The backend follows a layered local-first structure:

- `app/api`: transport layer and route registration
- `app/core`: configuration and infrastructure bootstrapping
- `app/models`: core backend records
- `app/schemas`: request and response contracts
- `app/services`: application services and use-case orchestration
- `app/repositories`: persistence abstractions
- `app/workers`: local background workers

## Initial route groups

- `/health`
- `/settings`
- `/providers`
- `/sessions`
- `/tasks`
- `/agents`
- `/skills`
- `/files`
