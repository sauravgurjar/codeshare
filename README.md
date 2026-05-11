# CodeShare Frontend (React + Vite + Tailwind)

A modern, developer-friendly CodeShare UI inspired by **VS Code + Pastebin**:

- Auth pages: Login / Register / Forgot Password (mock)
- Snippets: create, edit, delete, search, filter by language, recent section
- Syntax highlighting & editing via Monaco Editor
- Public/Private visibility + unique share URLs
- Copy code button, share panel, loading skeletons, error states
- Dark/Light mode toggle
- Glassmorphism cards, gradients, smooth page transitions (Framer Motion)

This repo ships with a **localStorage-backed mock DB** so you can run the full UX without a backend.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Monaco Editor (`@monaco-editor/react`)
- Axios (API integration scaffold)
- Framer Motion
- React Icons
- Toasts (`react-hot-toast`)

## Folder Structure

`src/`

- `components/` – reusable UI & feature components
- `pages/` – route pages (Home, Dashboard, Snippet, Auth, etc.)
- `layouts/` – Public/Auth/App layouts
- `services/` – API layer + mock services
- `context/` – Auth/Theme/Snippets providers
- `hooks/` – `useAuth`, `useTheme`, `useSnippets`
- `utils/` – constants, mock DB, helpers

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run dev server

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

### Demo Credentials

- Email: `demo@codeshare.dev`
- Password: `demo1234`

## Environment Variables

Create a `.env` file at the project root (optional):

```bash
VITE_API_BASE_URL=
```

- If you later add a backend, set `VITE_API_BASE_URL` and replace mock services in `src/services/`.

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Notes

- Mock data is seeded on first load in `src/utils/mockDb.js`.
- Protected routes wrap `/dashboard`, `/snippets/new`, `/snippets/:id/edit`, `/profile`, `/settings`.
