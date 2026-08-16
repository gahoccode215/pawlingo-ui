# Current Feature

Landing Page Prototype

## Status

In Progress

## Goals

- Hero section communicating "Learn English, Raise a Pet" and the core differentiator: pet growth is driven by real Listening/Speaking/Reading/Writing progress, not coins
- Problem section contrasting streak/XP/leaderboard-driven apps with PawLingo's emotional pet-bond approach
- Feature section covering Pet System, Vocabulary Learning (flashcard + spaced repetition), Pronunciation Practice (marked "coming soon"), and Progress Dashboard
- Persona/social-proof cards for beginner, parent buying for a child, working adult, and test-prep learner
- End-of-page "Join Waitlist" CTA (static form, no backend — matches Week 1 roadmap scope)
- Warm, friendly, lightly humorous copywriting (pet has personality); mobile-first; Tailwind CSS

## Notes

- File created at `docs/pawlingo-landing/index.html` — single self-contained static HTML file (Tailwind via CDN + config, since this is a standalone prototype outside the Next.js App Router build pipeline, not a route under `app/`)
- Fonts: "Baloo 2" (display/headings, playful but not childish) + "Inter" (body) via Google Fonts
- Warm palette: cream background, coral/honey/teal accents; custom Tailwind theme extension for colors, shadows (`shadow-pop` = pressable button effect), and float/wiggle keyframe animations
- Hero includes a mock pet stat card (Mochi, Stage 2) with animated XP bars for the four core skills, plus a floating "+12 XP earned today" badge, to visualize the core differentiator immediately
- Problem section uses a side-by-side "Other apps" vs "PawLingo" comparison card layout
- Waitlist form is non-functional by design (`onsubmit="return false;"`, disclaimer text below it) — no backend per Week 1 roadmap
- Not yet done: static vocabulary lesson demo and basic pet/energy prototype (also Week 1 roadmap items, out of scope for this pass)

## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
