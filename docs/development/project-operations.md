# Project Operations

`tinyclaw` uses a local-only `project/` workspace to manage execution details that should not be committed into the public repository.

## Why `project/` is Local Only

- it can hold working notes, live state, and short-lived planning data
- it keeps public commits focused on product code and stable documentation
- it allows fast iteration without polluting the repository history

The folder is ignored by git through [`.gitignore`](D:\tiny-claude\tinyclaw\.gitignore).

## `project/` Layout

```text
project/
  rules.md      operating rules for task execution
  context.md    current product and technical context
  state.md      current delivery status and near-term focus
  risk.md       active risk register and mitigation notes
  tasks/
    TASK_TEMPLATE.md
    TASK-*.md
```

## Task Lifecycle

Every meaningful change should start with a task file.

Each task must contain:

- goal
- scope
- implementation tasks
- risks
- expected result
- outcome summary

Each task must also pass all required verification stages:

1. Static review
2. Automated verification
3. Manual validation
4. Regression check
5. Result sign-off

If one stage cannot run, the task must record the blocker and residual risk before it can be treated as complete.

Each task also owns its git execution flow:

1. create or switch to a dedicated branch
2. implement only the scoped task on that branch
3. finish with a clean project-standard commit message
4. record branch and commit details in the task outcome

Branch names should stay short and feature-based, such as `feature/sidebar-navigation` or `fix/dropdown-trigger`. Do not encode roadmap or phase IDs like `p1` or `p2` into branch names.

## Delivery Standards

- keep code clean and easy to reuse
- for frontend work, use Tailwind utilities and shared Tailwind-based tokens only
- do not hardcode user-facing text in components; use i18n everywhere
- keep hover behavior restrained and avoid decorative color effects
- do not add captions under buttons or components unless the product explicitly needs them
- avoid all-caps UI text by default

## Update Rules

- update `context.md` when the product or architecture direction changes
- update `state.md` when milestones move or active focus changes
- update `risk.md` when major delivery or technical risks appear, change, or are resolved
- create a new task file for every meaningful piece of implementation work

## Contributor Guidance

Public contributors do not need to commit `project/` contents. Stable process guidance belongs in `docs/`, while live execution tracking can stay local.
