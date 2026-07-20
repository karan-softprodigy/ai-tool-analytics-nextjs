# Lumen — Next.js AI Analytics Dashboard

A usage, cost, and reliability analytics dashboard for AI model traffic, built on the
Next.js 14 App Router with TypeScript, Tailwind CSS, and Recharts. Demonstrates App
Router route handlers as a mock backend, a mix of server and client components used
where each fits, and a shared client-side data-fetching hook.

## Tech stack

| Layer     | Choice                                                          | Why                                                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Framework | Next.js 14 (App Router)                                         | File-based routing, built-in API route handlers, RSC support                               |
| Language  | TypeScript                                                      | Typed API responses shared between route handlers and components (`types/index.ts`)        |
| Styling   | Tailwind CSS                                                    | Consistent design tokens via `tailwind.config.js`                                          |
| Charts    | Recharts                                                        | Rendered client-side; charts are marked `'use client'`                                     |
| Data      | Route handlers (`app/api/**/route.ts`) over in-memory mock data | Simulated latency and an occasional 503, so loading/error states are real, not just styled |

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — the root route redirects to `/dashboard`.

```bash
npm run build
npm run start
npm run lint
```

## Project structure

```
app/
├── api/
│   ├── metrics/route.ts         # Summary stats + usage-over-time + model breakdown
│   ├── insights/route.ts         # AI-generated insight cards
│   └── query-volume/route.ts      # Filterable request log
├── dashboard/
│   ├── layout.tsx                  # Sidebar + mobile nav shell shared by all dashboard pages
│   ├── page.tsx                     # Overview — client component, fetches /api/metrics + /api/insights
│   ├── reports/page.tsx              # Query logs — client component with model/status filters
│   └── models/page.tsx                # Model comparison — server component, reads mock data directly
├── layout.tsx                          # Root HTML shell
└── page.tsx                             # Redirects "/" → "/dashboard"

components/
├── layout/        # Sidebar, MobileNav, Topbar
├── dashboard/       # KpiCard, UsageChart, ModelBreakdownChart, InsightsList, QueryLogTable
└── ui/                # Card, Badge, Spinner, EmptyState, ErrorState


## Features

- **Overview dashboard** — four KPI cards, a request-volume area chart with a 7d/30d
  toggle, a per-model request breakdown, and an AI-insights feed.
- **Query logs** — filterable by model and status, backed by a real (mocked) API call
  per filter change rather than client-side array filtering, so the network states are
  genuine.
- **Model comparison** — a server-rendered page with no client JS needed, since it has
  no interactivity; included deliberately to show the App Router pattern where it fits,
  rather than making every page a client component by default.
- **Loading / empty / error states** — every fetch-backed view has all three; the
  metrics endpoint fails ~3% of the time on purpose to exercise the retry path.
- **Responsive layout** — a fixed sidebar on desktop, a horizontal scrollable nav bar on
  mobile/tablet, and charts that reflow via `ResponsiveContainer`.
- **Design system** — a dark, warm-charcoal palette (not pure black) with an amber
  primary accent and teal secondary, `Space Grotesk` for display type and `JetBrains
  Mono` for numeric data, and a signature "pulse line" motif on KPI cards representing
  live signal.

## Architecture notes

- **Server vs. client components**: `app/dashboard/models/page.tsx` is an async server
  component reading `lib/mockData.ts` directly — no client fetch needed since it's not
  interactive. `app/dashboard/page.tsx` and `app/dashboard/reports/page.tsx` are client
  components because they hold interactive filter state that has to refetch on change.
  This split is intentional, not incidental — it's the main thing worth noticing about
  how this app uses the App Router.
- **`useApiData`** is the client-side equivalent of the `useAsync`/`useFetch` hooks in
  the other two demo projects, adapted to call same-origin API routes with `fetch`
  instead of an imported mock-API module. Same race-condition guard via a request-id ref.
- **Route handlers as the "backend"**: `app/api/*/route.ts` files hold the mock data
  logic server-side, so the client hook and the data model are already shaped the way
  they'd be against a real backend — swapping in a real database is a change inside the
  route handlers only.

## Screenshots

Screenshots live in `/screenshots`. Regenerate them after `npm run dev` by capturing:
`overview.png`, `query-logs.png`, `models.png`, `mobile-overview.png`.

## Known limitations (by design, for a demo)

- Mock data is regenerated from a fixed seed date rather than pulling
  from a real time-series database.
- No auth layer — every dashboard route is open, since the focus of this project is the
  analytics UI and App Router data patterns, not access control (covered instead in the
  companion admin-dashboard project).
- No automated test suite included, to keep the deliverable focused; `useApiData` and
  the route handlers' query-param filtering are the pieces most worth covering first if
  this were extended.
```
