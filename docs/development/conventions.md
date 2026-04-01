# Development Conventions

## Code

- write clean code that is easy to reuse
- prefer shared modules and primitives over duplicated implementation
- keep responsibilities narrow and names explicit

## Frontend

- use Tailwind for all styling decisions
- keep design tokens centralized through Tailwind-based patterns
- do not hardcode colors, button sizes, border radii, or similar UI values ad hoc
- do not add flashy hover color changes or decorative interaction effects
- do not place explanatory captions under buttons or components unless a product requirement calls for them
- avoid all-caps UI text

## i18n

- all user-facing text must come from translation keys
- do not hardcode labels, messages, headings, or button text in components
- if a string is shown to a user, it belongs in i18n

## Task Execution

- create a task file before meaningful implementation
- create or switch to a dedicated git branch for that task
- complete all required test stages before calling the task done
- finish with a clean project-standard commit message
