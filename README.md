# tinyclaw

`tinyclaw` is an open-source desktop app that makes the core OpenClaw experience approachable for non-technical users.

## Vision

- Keep the useful core workflows from OpenClaw.
- Remove setup friction for non-technical users.
- Ship a one-click Windows installer with a local-first experience.
- Prefer clear UI and safe defaults over power-user complexity.

## Planned Stack

- Desktop: Tauri + TypeScript
- Backend: Python + FastAPI
- Packaging: Windows installer with bundled local services

## Repository Layout

```text
apps/
  desktop/   Tauri desktop application
  api/       FastAPI local backend
docs/        Product, architecture, and contributor docs
scripts/     Development and release helpers
tests/       End-to-end and shared test fixtures
```

## Getting Started

The project scaffold is in place. Application bootstrapping, developer scripts, and release automation will be added incrementally.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
