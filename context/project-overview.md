## PawLingo Project Specifications

🐾 **Learn English, Raise a Pet**

---

## 📌 Problem (Core Idea)

Most English learning apps rely on abstract motivators — streaks, XP, leaderboards — that feel like obligations rather than something to care about. Pet-raising mechanics exist in some apps (e.g. Monkey Junior), but pets are usually just cosmetic rewards bought with coins, disconnected from actual learning progress.

➡️ **PawLingo makes the pet's growth a direct reflection of real language progress** — the pet levels up, learns new tricks, or evolves based on vocabulary mastered, lessons completed, and skills improved, not just coins spent.

---

## 🧑‍💻 Users

| Persona | Needs |
|---|---|
| Beginner (any age) | Simple, low-pressure way to build a daily English habit |
| Parent buying for child | Progress visibility, safe content, fun engagement |
| Working adult | Real skill measurement without feeling "childish" |
| Test-prep learner | Structured vocabulary/pronunciation practice with clear goals |

---

## ✨ Core Features

### A) Pet System (core differentiator)

- Pet has stats tied to real skills: Listening / Speaking / Reading / Writing
- Pet's energy decreases over time without practice (replaces plain streak anxiety with an emotional one)
- Pet evolves/unlocks new forms at vocabulary/skill milestones (not just coin purchases)
- Cosmetic items (hats, outfits) still exist as secondary rewards, earned through coins

### B) Vocabulary Learning

- Flashcard-style lessons (word/image/definition → quiz)
- Lightweight spaced repetition (wrong answers repeat more often)
- Small topic sets (10–20 words) to start, expandable later

### C) Pronunciation Practice (later phase)

- AI-based pronunciation scoring (reference: ELSA Speak)
- Compare user's voice to native speaker, phoneme-level feedback

### D) Progress & Motivation

- Daily reminders (push/email)
- Personal progress dashboard (not competitive leaderboard, at least at MVP stage)
- Optional parent-view dashboard for child accounts

### E) Authentication

- Email + Password
- Google OAuth
- Authentication is handled by the **Spring Boot backend** (issues session/JWT). The Next.js frontend does not own user credentials or sessions directly — see Tech Stack & Architecture below.

---

## 🗄️ Data Model (Reference Only — Owned by Backend)

> ⚠️ **This is a conceptual data shape for alignment between frontend and backend.**
> It does **not** represent Prisma models in the Next.js app. The Next.js app (`pawlingo-ui`) has no direct database access. The actual schema is owned and implemented by the **Spring Boot backend** (e.g. JPA entities + Flyway/Liquibase migrations). This section exists so frontend devs know what shape of data to expect from the API.

```
User
- id
- email
- goal            // beginner | test-prep | professional | for-child
- pet             (1:1)
- progresses      (1:N)
- createdAt / updatedAt

Pet
- id
- name
- stage           // evolution stage
- energy
- listeningXp / speakingXp / readingXp / writingXp
- coins
- outfits[]       // cosmetic item ids owned
- userId
- updatedAt

VocabWord
- id
- word
- definition
- imageUrl
- topic

Progress
- id
- correctCount / wrongCount
- lastReviewed
- userId
- wordId
- (unique per userId + wordId)
```

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
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (pet reactions) |
| Backend | **Spring Boot REST API** (separate repo) — owns all business logic and database access |
| Database | Postgres (owned by Spring Boot, via JPA/Hibernate — not accessed from Next.js) |
| Auth | Handled by Spring Boot (Email + Password, Google OAuth); Next.js consumes auth via API/session, not NextAuth+Prisma adapter |
| AI (later) | Pronunciation scoring API |
| Deployment | Frontend: Vercel · Backend: TBD |

---

## 💰 Monetization (future consideration)

| Plan | Price | Limits | Features |
|---|---|---|---|
| Free | $0 | Limited topics, basic pet | Core vocab learning + pet |
| Premium | TBD | Unlimited topics | Pronunciation AI, cosmetic sets, parent dashboard |

---

## 🎨 UI / UX

- Warm, friendly visual style — approachable for kids but not "babyish" for adults
- Pet screen as home/landing screen after login
- Copywriting with light humor (pet has personality, not just decoration)

### Layout

- Bottom nav (mobile-first): Pet · Learn · Progress · Profile
- Full-screen lesson/quiz view

### Responsive

- Mobile-first, since most target users will use this on phone

---

## 🧭 Roadmap

### **Week 1 — Validation MVP**
- Landing page (waitlist)
- Static vocabulary lessons (10–20 words, one topic)
- Basic pet with energy stat + simple reactions
- No backend/DB — local state only (`pawlingo-ui` standalone, Spring Boot not yet integrated)

### **MVP (post-validation)**
- Spring Boot backend stood up: auth + database
- Next.js integrates with Spring Boot API (server-side fetch + `src/lib/api.ts`)
- Multiple vocab topics
- Spaced repetition logic
- Daily reminder notifications

### **Phase 2**
- AI pronunciation scoring
- Parent dashboard
- Premium tier + billing

### **Future Enhancements**
- Social features (visit friends' pets)
- Seasonal events / limited cosmetics
- Leaderboards
- Multi-language support (beyond English)

---

## 📌 Status

- In planning
- Frontend project: `pawlingo-ui` (Next.js)
- Backend: Spring Boot (separate repo, not yet started)
- Next step: build landing page + static vocabulary demo (this week) — no backend integration yet

---

🐾 **PawLingo — Learn English, Raise a Friend.**