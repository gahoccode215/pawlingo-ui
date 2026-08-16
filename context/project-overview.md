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

---

## 🗄️ Data Model (Rough Prisma Draft)

> This schema is a starting point and **will evolve**

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String?
  goal          String?  // beginner | test-prep | professional | for-child
  pet           Pet?
  progresses    Progress[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Pet {
  id            String   @id @default(cuid())
  name          String
  stage         Int      @default(1)   // evolution stage
  energy        Int      @default(100)
  listeningXp   Int      @default(0)
  speakingXp    Int      @default(0)
  readingXp     Int      @default(0)
  writingXp     Int      @default(0)
  coins         Int      @default(0)
  outfits       String[] // cosmetic item ids owned

  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  updatedAt     DateTime @updatedAt
}

model VocabWord {
  id          String   @id @default(cuid())
  word        String
  definition  String
  imageUrl    String?
  topic       String

  progresses  Progress[]
}

model Progress {
  id          String   @id @default(cuid())
  correctCount Int     @default(0)
  wrongCount   Int     @default(0)
  lastReviewed DateTime?

  userId      String
  user        User      @relation(fields: [userId], references: [id])

  wordId      String
  word        VocabWord @relation(fields: [wordId], references: [id])

  @@unique([userId, wordId])
}
```

---

## 🧱 Tech Stack

| Category | Choice |
|---|---|
| Framework | **Next.js (App Router)** |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (pet reactions) |
| Database | Postgres + Prisma ORM (added after MVP validated) |
| Auth | NextAuth (email + Google) |
| AI (later) | Pronunciation scoring API |
| Deployment | Vercel |

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
- No backend/DB — local state only

### **MVP (post-validation)**
- Auth + database
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
- Next step: build landing page + static vocabulary demo (this week)

---

🐾 **PawLingo — Learn English, Raise a Friend.**