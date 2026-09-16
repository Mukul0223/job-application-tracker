# Job Application Tracker

A personal job-search command center. Track every application you submit, move it through a visual pipeline, log interviews, manage resume versions, and see analytics on how your search is actually performing — all in one place.

**Live demo:** [https://jobapplicationtracker-one.vercel.app](https://jobapplicationtracker-one.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Testing](#testing)
- [Deployment](#deployment)
- [Code Style & Formatting](#code-style--formatting)
- [License](#license)

---

## Features

- **Secure authentication** via Clerk (sign up, sign in, session management)
- **Application tracking** — full CRUD with company, role, location, salary range, job URL, recruiter details, and notes
- **Status pipeline** — Wishlist → Applied → Screening → Interview → Offer → Rejected
- **Kanban board** — drag-and-drop applications between statuses, backed by optimistic updates that persist instantly
- **Search, filter, and sort** — debounced search by company or title, status filtering, sorting by date or company
- **Interview tracking** — log interview rounds (type, interviewer, outcome, notes) against each application
- **Calendar view** — every upcoming interview laid out on a real month grid, linked back to its application
- **Resume management** — upload PDF/DOCX resumes to Cloudinary with automatic version history, and attach a specific version to each application
- **Analytics dashboard** — application trend over time, response rate, and a conversion funnel from Applied through to Offer
- **Responsive design** — a dedicated card layout below the `md` breakpoint, alongside the full table on larger screens

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS v4
- shadcn/ui components on [Base UI](https://base-ui.com) primitives
- [TanStack Query](https://tanstack.com/query) for all server/cache state
- Zustand for UI-only state (sidebar, modals)
- React Hook Form + Zod for form validation
- [dnd-kit](https://dndkit.com) for the Kanban board
- [date-fns](https://date-fns.org) for the calendar's date math
- Recharts for analytics visualizations

**Backend**
- Node.js + Express.js
- Mongoose (MongoDB Atlas)
- Clerk (backend SDK) for session verification
- Cloudinary for resume storage

**Testing**
- Vitest (backend and frontend)
- React Testing Library
- Supertest + mongodb-memory-server for backend integration tests

**Deployment**
- Vercel (frontend) · Render (backend) · MongoDB Atlas · Cloudinary

## Project Structure

```
job-application-tracker/
├── client/                      # React + Vite frontend
│   └── src/
│       ├── api/                 # Axios call definitions, one file per resource
│       ├── components/
│       │   ├── ui/              # shadcn/ui primitives
│       │   ├── layout/          # AppShell, Sidebar, Topbar
│       │   ├── applications/    # ApplicationTable, ApplicationCard, ApplicationForm, ApplicationFilters
│       │   ├── kanban/          # KanbanBoard, KanbanColumn, KanbanCard
│       │   ├── interviews/      # InterviewForm, InterviewList
│       │   ├── calendar/        # CalendarView, CalendarEventCard
│       │   ├── resumes/         # ResumeUploader, ResumeList
│       │   └── analytics/       # TrendChart, ResponseRateChart, ConversionFunnelChart
│       ├── pages/                # One component per route
│       ├── hooks/                # TanStack Query hooks, one file per resource
│       ├── schemas/               # Zod validation schemas (mirrors backend validators)
│       ├── store/                 # Zustand (uiStore only — server state lives in TanStack Query)
│       └── routes/                # AppRoutes.jsx
└── server/                      # Express backend
    └── src/
        ├── config/               # MongoDB and Cloudinary setup
        ├── models/               # Mongoose schemas
        ├── routes/               # Route definitions, versioned under /api/v1
        ├── controllers/          # Thin request/response handlers
        ├── services/             # Business logic and Mongoose queries
        ├── middleware/           # Auth, validation, error handling
        ├── validators/           # Zod schemas for request validation
        └── tests/                # Vitest integration tests
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster
- A Clerk application (publishable + secret key)
- A Cloudinary account

### Installation

```bash
git clone <your-repo-url>
cd job-application-tracker

cd server && npm install
cd ../client && npm install
```

Create `.env` files in both `server/` and `client/` (see [Environment Variables](#environment-variables) below), then run both dev servers:

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

The frontend runs at `http://localhost:5173`, the backend at whatever `PORT` you've set.

## Environment Variables

**`server/.env`**

| Variable | Purpose |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLERK_SECRET_KEY` | Backend Clerk SDK — verifies session tokens |
| `CLERK_PUBLISHABLE_KEY` | Backend Clerk SDK initialization |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account identifier |
| `CLOUDINARY_API_KEY` | Cloudinary auth |
| `CLOUDINARY_API_SECRET` | Cloudinary auth |
| `CLIENT_ORIGIN` | Allowed CORS origin — your frontend's URL |

**`client/.env`**

| Variable | Purpose |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Initializes Clerk's React SDK |
| `VITE_API_BASE_URL` | Backend API base URL, **including the `/api/v1` prefix** (e.g. `http://localhost:5000/api/v1`) |

No secret values are committed to this repository — see `.env.example` in each folder for the variable names.

## Available Scripts

**Backend (`server/`)**

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with nodemon |
| `npm start` | Start the production server |
| `npm test` | Run the Vitest test suite |
| `npm run lint` | Run ESLint |

**Frontend (`client/`)**

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest test suite |
| `npm run lint` | Run ESLint |

## API Overview

All routes are prefixed `/api/v1` and require a valid Clerk session unless noted.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check (public) |
| `POST` | `/users/sync` | Create/update the local user record after sign-in |
| `GET` | `/applications` | List applications (search, status, sort, pagination) |
| `POST` | `/applications` | Create an application |
| `GET` | `/applications/board` | Lean list for the Kanban view |
| `GET` \| `PATCH` \| `DELETE` | `/applications/:id` | Fetch, update, or delete a single application |
| `PATCH` | `/applications/:id/status` | Update status only (Kanban drag) |
| `GET` | `/interviews` | List interviews (`?upcoming=true`, `?applicationId=`) |
| `POST` \| `PATCH` \| `DELETE` | `/interviews`, `/interviews/:id` | Interview CRUD |
| `POST` \| `GET` | `/resumes` | Upload a resume, or list version history |
| `DELETE` | `/resumes/:id` | Delete a resume |
| `GET` | `/analytics/summary` | Aggregate stats (`?range=30d\|90d\|all`) |

## Testing

Both the frontend and backend have a Vitest suite covering the areas most likely to regress silently — application sort/filter logic, per-application interview scoping, and search-input debouncing. Run `npm test` in either folder. Backend integration tests spin up an in-memory MongoDB instance via `mongodb-memory-server`, so no real database connection is needed to run them.

## Deployment

The frontend deploys to Vercel and the backend to Render. Two things worth knowing if you're redeploying this yourself:

- **`VITE_API_BASE_URL` must include the `/api/v1` prefix** — no call site in this codebase adds it, so it has to come from this variable.
- Vite environment variables are baked in at **build time**. Changing one in Vercel's dashboard has no effect until you trigger a new deployment.
- `client/vercel.json` rewrites every path to `index.html`, which is required for direct navigation to any client-side route (e.g. `/dashboard`) to work — without it, only the root path resolves correctly.

## Code Style & Formatting

This project enforces consistent formatting using **ESLint** and **Prettier**:

- **Semicolons**: Always enabled (`"semi": true`)
- **Quotes**: Single quotes preferred (`"singleQuote": true`)
- **Indentation**: 2 spaces (`"tabWidth": 2`)
- **Trailing Commas**: ES5 compatible (`"trailingComma": "es5"`)

Format code across either workspace with:
```bash
npm run format
```

## License

This project is available under the MIT License.
