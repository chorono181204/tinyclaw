# Desktop Architecture

## Purpose

`apps/desktop` is the installable user-facing application.

Its job is to:

- render the interface
- manage local UI state
- expose desktop capabilities through Tauri
- connect safely to the local backend

## Technology

- `Tauri`
- `React`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `Radix UI`

## Desktop Module Structure

The desktop app should be organized by product responsibility, not by page-only grouping.

### Core modules

- `app`: app bootstrap and providers
- `components`: reusable UI and shell components
- `features`: product features such as tasks, workspace, settings, and agents
- `hooks`: reusable frontend hooks
- `lib`: utilities, API client helpers, and shared frontend helpers
- `styles`: tokens, global styles, and Tailwind-driven theme setup
- `types`: frontend-only type definitions
- `i18n`: locale dictionaries, provider, and translation helpers

## Desktop Layers

### 1. Presentation layer

This layer renders the interface.

Examples:

- pages
- panels
- dialogs
- sidebar
- header
- form controls

Rules:

- all styling comes from Tailwind utilities and shared tokens
- no hardcoded UI text
- visual behavior stays restrained and stable

### 2. Feature layer

This layer coordinates UI flows.

Examples:

- create task flow
- workspace selection flow
- settings update flow
- health check flow

Responsibilities:

- connect UI to backend calls
- handle loading, empty, and error states
- keep feature logic out of primitive UI components

### 3. Application state layer

This layer stores frontend application state.

Examples:

- current locale
- current theme
- sidebar open state
- selected workspace
- selected task or session

Preferred scope:

- local UI state stays near the feature
- shared app state lives in providers or dedicated state modules

### 4. API client layer

This layer speaks to the FastAPI backend.

Responsibilities:

- request construction
- response typing
- error normalization
- streaming helpers for long-running actions

The desktop app should not embed backend business rules in this layer.

### 5. Desktop integration layer

This layer handles Tauri-specific concerns.

Examples:

- window controls
- launching or checking the local backend
- file dialogs
- updater integration
- OS-specific hooks

This layer must stay thin so the product logic remains portable and testable.

## Frontend Design Rules

- use reusable components first
- prefer composition over one-off page markup
- keep the shell stable and predictable
- avoid decorative hover effects
- use semantic colors through shared tokens
- route all user-facing text through i18n

## Suggested Feature Modules

### `features/workspace`

- workspace dashboard
- local file access entry points
- recent activity

### `features/tasks`

- task list
- task detail
- create task dialog
- run history

### `features/agents`

- current agent state
- provider status
- session controls

### `features/settings`

- locale
- theme
- provider setup
- workspace path
- update preferences

### `features/health`

- local service health
- provider connectivity checks
- user-friendly diagnosis results

## Desktop Boundaries

The desktop app should not own:

- persistence logic
- task scheduling logic
- provider orchestration logic
- secrets storage implementation

Those responsibilities belong to the backend.
