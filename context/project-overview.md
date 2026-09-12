## PawLingo Project Specifications

🐾 **Learn English, Raise a Pet**

---

## 📌 Problem (Core Idea)

PawLingo's core goal is simple: help users learn English effectively. The pet-raising mechanic exists to support that goal — the pet's growth reflects real learning progress (lessons completed, skills improved), keeping motivation tied to actual learning rather than abstract motivators like streaks or coin-bought rewards.

---

## 🧑‍💻 Users

Everyone who wants to learn English — no age or skill-level restriction.

---

## 🔌 API Contract (Frontend ↔ Backend)

> ⚠️ **Placeholder — to be filled in as the Spring Boot API takes shape.**

- Base URL: TBD (e.g. `NEXT_PUBLIC_API_URL` / server-only env var for internal calls)
- Auth flow: TBD — likely JWT issued by Spring Boot, stored via httpOnly cookie or NextAuth session bridging to the backend token
- Response shape convention: TBD (recommend a consistent `{ success, data, error }` envelope — matches `src/lib/api.ts` error handling in coding standards)
- Key endpoints to define first (MVP): `POST /auth/login`, `POST /auth/register`, `GET /pet`, `GET /vocab/topics/:topic`, `POST /progress`

This section should be updated as soon as the Spring Boot team/repo defines real endpoints, so `src/lib/api.ts` in `pawlingo-ui` can be built against it.

---

## 🧱 Tech Stack

| Category | Choice |
|---|---|
| Frontend framework | **Next.js (App Router)** — project name: `pawlingo-ui` |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (adopted 2026-08-24 — see below); dark mode via `next-themes` |
| Animation | Framer Motion (pet reactions) |
| Backend | **Spring Boot REST API** (separate repo) — owns all business logic and database access |
| Database | Postgres (owned by Spring Boot, via JPA/Hibernate — not accessed from Next.js) |
| Auth | Handled by Spring Boot (Email + Password, Google OAuth); Next.js consumes auth via API/session, not NextAuth+Prisma adapter |
| AI (later) | Pronunciation scoring API |
| Deployment | Frontend: Vercel · Backend: TBD |

---

🐾 **PawLingo — Learn English, Raise a Friend.**