# Backend Architecture

## Purpose

`apps/api` is the local application service for tinyclaw.

It is responsible for:

- business logic
- agent orchestration
- local persistence
- scheduling
- health checks
- secure local configuration handling

## Technology

- `Python`
- `FastAPI`
- `Pydantic`
- `SQLite`
- `APScheduler`
- `httpx`

## Backend Layer Model

The backend should be split into clear layers so the local service stays maintainable as features grow.

### 1. Transport layer

Location:

- `app/api/routes`
- `app/schemas`

Responsibilities:

- expose HTTP endpoints
- validate request and response models
- map transport errors into stable API responses

This layer should stay thin.

### 2. Application service layer

Location:

- `app/services`

Responsibilities:

- orchestrate use cases
- coordinate repositories and infrastructure
- enforce application workflows

Examples:

- create task
- run health check
- open session
- update settings
- call provider

### 3. Domain module layer

Location:

- `app/services`
- `app/models`
- `app/core`

Responsibilities:

- define the core concepts of the app
- isolate business rules by module

Core backend modules:

- configuration
- secrets
- sessions
- tasks
- agents
- skills
- health
- files
- providers

### 4. Persistence layer

Location:

- `app/repositories`

Responsibilities:

- read and write local storage
- isolate SQL and database concerns
- support future schema evolution

Primary storage choices:

- `SQLite` for structured local data
- local filesystem for assets, exports, and logs
- OS-backed secret storage for provider credentials when possible

### 5. Infrastructure layer

Location:

- `app/core`
- `app/workers`

Responsibilities:

- app configuration bootstrap
- logging
- scheduler startup
- provider HTTP clients
- system integration

## Backend Module Breakdown

### `config`

Handles:

- app config
- workspace config
- feature flags
- environment resolution

### `secrets`

Handles:

- provider API keys
- encrypted or OS-managed credential access

### `sessions`

Handles:

- session lifecycle
- conversation history
- search and retrieval

### `tasks`

Handles:

- task definitions
- task execution state
- task results
- retries and history

### `agents`

Handles:

- agent runtime state
- prompt assembly
- orchestration with tools and providers

### `providers`

Handles:

- model provider abstraction
- request formatting
- retries and provider error mapping

### `skills`

Handles:

- bundled skills
- local skill metadata
- enable or disable behavior packs

### `health`

Handles:

- local doctor checks
- backend readiness
- provider connectivity checks
- diagnostics for user-facing troubleshooting

### `files`

Handles:

- attachments
- exports
- temp workspace files

## API Design Direction

### Request style

- use REST endpoints for standard CRUD and settings flows
- use streaming endpoints for long-running agent responses and task updates

### Initial route groups

- `/health`
- `/settings`
- `/providers`
- `/sessions`
- `/tasks`
- `/agents`
- `/skills`
- `/files`

## Background Processing

The backend should support lightweight local background execution.

Main workers:

- scheduler worker
- task execution worker
- health check worker

The MVP should avoid distributed infrastructure such as Redis, message brokers, or multi-node processing.

## Backend Boundaries

The backend should not own:

- complex remote multi-tenant services
- team collaboration state
- container-based execution requirements for normal users

tinyclaw should remain easy to install and run on a single machine.
