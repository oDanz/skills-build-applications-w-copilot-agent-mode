# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API requests with:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api`.
