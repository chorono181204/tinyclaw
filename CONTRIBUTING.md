# Contributing to tinyclaw

Thanks for helping build a simpler OpenClaw experience.

## Ground Rules

- Keep the product friendly for non-technical users.
- Prefer small, reviewable pull requests.
- Document behavior changes that affect setup, packaging, or UX.
- Add or update tests when changing core flows.

## Development Areas

- `apps/desktop` for the desktop shell and user-facing UI
- `apps/api` for local backend services
- `docs` for architecture, roadmap, and contributor guidance

## Pull Requests

1. Open an issue when the change is substantial.
2. Keep PR descriptions clear and outcome-focused.
3. Note any packaging or platform implications.
4. Include screenshots for visible UI changes when relevant.

## Code Style

- TypeScript uses workspace formatting and lint rules.
- Python uses the project formatter and linter configuration.
- Favor readable names and small modules over clever abstractions.
- Keep code reusable and avoid one-off component logic when shared primitives make sense.
- Frontend styling should come from Tailwind utilities and shared Tailwind-based tokens.
- Route all user-facing UI text through the i18n layer instead of hardcoding strings in components.
- Keep hover states quiet and functional, not decorative.
- Avoid captions under buttons and components unless the UX explicitly needs them.
- Avoid all-caps UI text unless there is a documented product reason.

## Git Workflow

- Use a dedicated branch for each task or pull request.
- Keep each branch tightly scoped to one outcome.
- Use clean, conventional commit messages that read well in a large project history.
