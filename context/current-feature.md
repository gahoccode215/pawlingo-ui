# Current Feature: FE Auth Integration (Email/Password + Google)

## Status

In Progress

## Goals

- Implement an auth API client (e.g. `src/lib/api.ts`) wrapping `POST /auth/register`, `POST /auth/login`, `POST /auth/google`, `GET /auth/me` against `{BACKEND_URL}/api/v1`, unwrapping the `{ success, data, error }` envelope on every call
- Register screen: email + password only (min 8 chars) — no `goal` field on FE (2026-08-19: user will update backend separately to make `goal` fully optional/defaulted server-side; `AuthUser.goal` stays in types since login/`/auth/me`/Google responses still return it)
- Login screen: email + password; store returned `accessToken` (no refresh token — expired/401 means re-login, not silent refresh)
- Google Sign-In via Google Identity Services (GSI): load the GSI script, get an ID token client-side, POST `{ idToken }` to `/auth/google`; use `isNewUser` to decide onboarding, and handle `ACCOUNT_EXISTS_WITH_PASSWORD` (409) by telling the user to log in with email/password instead of auto-linking accounts
- Central `error.code` → user-facing (Vietnamese) message mapping for `DUPLICATE_EMAIL`, `INVALID_CREDENTIALS`, `VALIDATION_ERROR`, `UNAUTHORIZED`, `GOOGLE_TOKEN_INVALID`, `GOOGLE_EMAIL_NOT_VERIFIED`, `ACCOUNT_EXISTS_WITH_PASSWORD`, `INTERNAL_ERROR` — never render raw `error.message` to the user
- Shared fetch layer that catches `UNAUTHORIZED`, clears the stored token, and redirects to login
- Call `GET /auth/me` on app start (or after login) to hydrate the user profile / validate a stored token, since login's response has no `id`/`email`/`goal`

## Notes

- 2026-08-19: Out-of-scope side task done on this branch at user request — translated the entire site UI to Vietnamese (site targets Vietnamese English-learners; an EN/VI toggle may come later, hardcoded Vietnamese for now). Touched: `Header.tsx`, all landing sections (`Hero`, `WhySection`, `Features`, `Personas`, `WaitlistCta`, `Footer`), all vocab UI (`TopicIntro`, `Flashcard`, `QuizCard`, `SessionSummary`, `TopicPicker`), `layout.tsx` metadata + `lang="vi"`, `/learn` and `/learn/[topicId]` metadata, and vocab data content (`animals.ts`/`food.ts` `definition` fields + topic `label`s — `word`/`exampleSentence` intentionally kept in English since that's the term being taught). Auth forms (`RegisterForm`/`LoginForm`/error messages) were already in Vietnamese from earlier work. Google Sign-In button localized via `?hl=vi` on the GSI script. Build + lint verified.
- Implemented so far:
  - `src/types/auth.ts` — `Goal`, `AuthUser`, register/login/google request+response types, `ApiErrorCode`, `ApiEnvelope<T>`
  - `src/lib/api.ts` — `apiRequest<T>` generic client: unwraps `{success,data,error}`, attaches `Authorization` header when `auth: true`, throws typed `ApiError`, clears token + dispatches `pawlingo:unauthorized` window event on any 401
  - `src/lib/auth/token.ts` — SSR-safe localStorage get/set/clear (`pawlingo:auth-token`)
  - `src/lib/auth/errors.ts` — `getAuthErrorMessage(code)`, Vietnamese copy per `error.code`, falls back to a generic message for unknown codes
  - `src/lib/auth/api.ts` — `registerUser`/`loginUser`/`loginWithGoogle`/`getCurrentUser` thin wrappers over `apiRequest`
  - `src/lib/validation/auth.ts` — zod `registerSchema`/`loginSchema` (added `zod` dependency)
  - `src/lib/auth/AuthContext.tsx` — `AuthProvider`/`useAuth`; hydrates via `/auth/me` on mount when a token exists, exposes `register`/`login`/`loginWithGoogleIdToken`/`logout`, listens for the unauthorized event and redirects to `/login`; mounted in `src/app/layout.tsx`
  - `src/components/auth/GoogleSignInButton.tsx` — loads the GSI script via `next/script`, renders Google's own button, posts the ID token through `loginWithGoogleIdToken`; renders nothing if `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is unset
  - `src/components/auth/RegisterForm.tsx` / `LoginForm.tsx` + `src/app/register/page.tsx` / `src/app/login/page.tsx` — client forms, zod-validated, inline field + form-level error display, redirect to `/learn` on success
  - `src/components/Header.tsx` — "Log in"/"Sign Up Free" (desktop + mobile) now link to `/login`/`/register` instead of `#waitlist`
  - `.env.example` — documents `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- Deliberately out of scope / deferred: no toast library added (inline error banners in forms instead, per coding-standards' "user-friendly error messages" without adding a new dependency); no onboarding flow for Google `isNewUser` (no update-`goal` endpoint exists yet, so new Google users just land on `/learn` with default `beginner` goal like everyone else)
- Build (`next build`) and lint (`eslint`) both pass; UI not yet visually verified in-browser (user tests UI themselves) — in particular the Google button needs a real `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from the backend team to test end-to-end
- Reviewed 2026-08-19: fixed a bug in `src/lib/api.ts` where any 401 (including public-endpoint `INVALID_CREDENTIALS`/`GOOGLE_TOKEN_INVALID` on login/google) triggered the session-expired redirect flow; now gated on `auth === true` so only 401s from authenticated requests (e.g. `/auth/me`) do that. `isNewUser` from Google login remains unused (documented, intentional — no onboarding endpoint to route into yet). Verdict: ready to complete.
- Spec: `context/features/fe-auth-integration.md` — integration guide written against `pawlingo-api` (Spring Boot); register/login/Google login are already implemented, tested, and merged on BE `main`. This is FE-only work.
- Auth is JWT-in-header only (`Authorization: Bearer <token>`), no cookies — FE picks storage (localStorage/memory/etc), BE sets nothing
- No refresh token (24h expiry via `JWT_EXPIRATION_SECONDS`, hard re-login after), no password reset, no update-`goal`-after-signup endpoint, no server-side logout, no manual account linking, no login rate limiting — don't build UI/flows assuming any of these exist yet
- Need `GOOGLE_CLIENT_ID` from backend team (must reuse BE's Google Cloud OAuth client so `aud` verifies — do not create a new one) and get FE origins added to that client's Authorized JavaScript origins
- CORS is allow-listed via `CORS_ALLOWED_ORIGINS` on BE (default `http://localhost:3000`) — flag backend team if FE dev origin differs
- Vocabulary Learning Phase 2 (localStorage persistence, multi-topic, topic picker) was left "In Progress" on this branch when this spec was loaded — build/lint passed but it wasn't reviewed/completed; resume or complete it separately before this history entry is superseded further
- References: `context/project-overview.md`, `context/coding-standards.md`, `context/features/fe-auth-integration.md`

## History

- 2026-08-16: Created static landing page prototype at `docs/pawlingo-landing/index.html` per Week 1 waitlist roadmap — hero, problem/why, features, personas, and waitlist CTA sections, styled with Tailwind (CDN) per project-overview.md.
- 2026-08-16: Reworked header to logo-left/centered-nav/login-register-right layout with mobile menu, and rebuilt footer into a 4-column layout (brand+social, Product, Support, copyright bar) with dynamic year.
- 2026-08-16: Landing Page Implementation feature left "In Progress" (branch `feature/landing-page-implementation`) — app/ moved to src/app/, all sections rebuilt as React/Tailwind v4 components, build+lint verified — when Vocabulary Learning spec was loaded on top of it. Resume/complete that feature separately before this history entry is superseded further.
- 2026-08-17: Completed Vocabulary Learning (Week 1 MVP) — topic intro, flashcard, mandatory 4-option quiz, Leitner-style 3-box repetition (wrong answers reset to box 1, capped at 5 repeats), and session summary screens, all wired via `VocabSession` at route `src/app/learn/page.tsx`. Local in-memory state only, no backend/DB. Added `src/types/vocab.ts`, `src/data/vocab/animals.ts`, `src/lib/vocab/{leitner,quiz}.ts`, `src/components/vocab/{TopicIntro,Flashcard,QuizCard,SessionSummary,VocabSession}.tsx`. Build and lint verified; UI not visually tested in-browser by Claude (user tests UI themselves).
