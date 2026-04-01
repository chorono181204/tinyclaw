# tinyclaw roadmap

## Structure

The delivery roadmap is split into phases.

- each phase contains around 20 tasks
- each task is completed on its own typed branch such as `feature/`, `update/`, `fix/`, `chore/`, or `docs/`
- each task must pass the project test flow before merge
- after a task is accepted, it should be merged and pushed before the next dependent task starts

## Phase 1: foundation

Goal:
Build the local-first foundation for desktop shell, backend structure, design system, and development workflow.

Focus:

- desktop shell and navigation
- backend layer scaffolding
- local config and persistence foundations
- design tokens and i18n foundations
- task workflow and contributor rules

Planned task count:

- 20 tasks

## Phase 2: core workflows

Goal:
Ship the first real end-user workflows for workspace, sessions, tasks, agents, and provider setup.

Focus:

- onboarding
- provider connection
- workspace flows
- task lifecycle
- session history
- health and recovery

Planned task count:

- 20 tasks

## Phase 3: release readiness

Goal:
Make tinyclaw installable, testable, stable, and ready for early public use.

Focus:

- Windows packaging
- auto-start backend runtime
- release workflow
- updater preparation
- performance and QA
- documentation polish

Planned task count:

- 20 tasks

## Delivery rule

Every task should follow this sequence:

1. create or switch to the task branch
2. complete implementation on that branch
3. run the required test flow
4. commit with the project commit style
5. merge the task branch
6. push the merged result
