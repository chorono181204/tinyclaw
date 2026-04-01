# Architecture Overview

tinyclaw is a local-first desktop application built for non-technical users.

The product is designed around one installable Windows app:

- `apps/desktop` provides the desktop shell, UI, and installer entry point
- `apps/api` runs the local application services, agent orchestration, and persistence
- the installer bundles the desktop app, backend runtime, and required assets for one-click setup

## Product Direction

tinyclaw keeps the core value of an agent workspace while removing the operational complexity that usually comes with developer-focused tools.

The architecture should therefore optimize for:

- local-first execution
- simple installation and update flow
- clear separation between UI, application logic, and infrastructure
- reusable modules instead of feature-specific glue code
- safe defaults for non-technical users

## Technology Stack

### Desktop

- `Tauri`
- `React`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `Radix UI` primitives for core interactions such as dialog and dropdown

### Backend

- `Python`
- `FastAPI`
- `Pydantic`
- `SQLite`
- `APScheduler` for local scheduled tasks
- `httpx` for provider integrations

### Packaging

- `Tauri bundler` for the Windows desktop app
- `PyInstaller` for packaging the local Python runtime and FastAPI service

## Runtime Topology

1. The user launches the tinyclaw desktop app.
2. The desktop shell ensures the local backend service is available.
3. The frontend talks to the backend over local HTTP on `localhost`.
4. The backend manages configuration, sessions, tasks, tools, and persistence.
5. Data stays on the local machine unless the user explicitly connects an external provider.

## Top-Level Modules

### Repository modules

- `apps/desktop`: desktop shell and user-facing interface
- `apps/api`: local backend service and orchestration runtime
- `packages/ui`: reusable UI building blocks
- `packages/shared-types`: shared type contracts for the frontend
- `scripts`: development, build, and release scripts
- `installer`: packaging assets and installer-specific concerns
- `docs`: architecture, product, and contributor documentation

### Functional modules

- shell
- workspace
- tasks
- agents
- settings
- health checks
- local persistence
- provider integration

## Layered Architecture

tinyclaw uses a layered structure to keep responsibilities clear.

### Desktop layers

- presentation layer
- application state layer
- desktop integration layer
- API client layer

### Backend layers

- transport layer
- application service layer
- domain module layer
- persistence layer
- infrastructure layer

## Primary Architecture Documents

- [desktop.md](/D:/tiny-claude/tinyclaw/docs/architecture/desktop.md)
- [backend.md](/D:/tiny-claude/tinyclaw/docs/architecture/backend.md)

## Near-Term Scope

The first implementation should focus on:

- desktop shell
- i18n-ready UI
- local config and secrets handling
- sessions and task execution
- health check flow
- installer-ready local runtime

Advanced features such as multi-agent delegation, plugin marketplaces, and external channel integrations should stay out of the initial architecture.
