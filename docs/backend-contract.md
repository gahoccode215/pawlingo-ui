# PawLingo Backend API Contract

Confirmed against `pawlingo-api` source (`AuthController.java`, DTOs under
`auth/dto/`, `ErrorCode.java`, `ApiResponseDTO`/`ErrorDetail`) as of
2026-08-23. Update this file when `pawlingo-api/docs/api-changelog.md` records
a change affecting these shapes.

## Envelope

Every response, success or error, is wrapped:

```json
{ "success": true, "data": { }, "error": null }
{ "success": false, "data": null, "error": { "code": "STRING_CODE", "message": "..." } }
```

## Authentication

Base path: `/api/v1/auth`

### Register

`POST /api/v1/auth/register` → `201 Created`

Request:

```json
{ "email": "string, required, valid email", "password": "string, required, min 8 chars" }
```

Response (`data`):

```json
{
  "id": "uuid",
  "email": "string",
  "goal": "beginner | test-prep | professional | for-child",
  "accessToken": "string",
  "refreshToken": "string",
  "expiresIn": "number (seconds)"
}
```

`goal` always defaults to `"beginner"` on register.

Errors: `DUPLICATE_EMAIL` (409), `VALIDATION_ERROR` (400).

### Login

`POST /api/v1/auth/login` → `200 OK`

Request:

```json
{ "email": "string, required, valid email", "password": "string, required" }
```

Response (`data`) — **no user fields**, follow with `GET /auth/me`:

```json
{ "accessToken": "string", "refreshToken": "string", "expiresIn": "number (seconds)" }
```

Errors: `INVALID_CREDENTIALS` (401 — same code for wrong email or wrong password, by design), `VALIDATION_ERROR` (400).

### Google

`POST /api/v1/auth/google` → `201 Created` if the account is new, else `200 OK`

Expects a Google ID token (JWT credential from Google Identity Services), verified server-side against `app.google.client-id` — not an OAuth authorization code.

Request:

```json
{ "idToken": "string, required" }
```

Response (`data`):

```json
{
  "id": "uuid",
  "email": "string",
  "goal": "beginner | test-prep | professional | for-child",
  "accessToken": "string",
  "refreshToken": "string",
  "expiresIn": "number (seconds)",
  "isNewUser": "boolean"
}
```

Errors: `GOOGLE_TOKEN_INVALID` (401), `GOOGLE_EMAIL_NOT_VERIFIED` (403), `ACCOUNT_EXISTS_WITH_PASSWORD` (409 — an existing password-provider account already uses this email), `VALIDATION_ERROR` (400).

### Refresh

`POST /api/v1/auth/refresh` → `200 OK`

Request:

```json
{ "refreshToken": "string, required" }
```

Response (`data`) — refresh token **rotates every call**, the old one is invalidated:

```json
{ "accessToken": "string", "refreshToken": "string", "expiresIn": "number (seconds)" }
```

Reusing an already-rotated (previously-used) refresh token is treated as theft/replay and revokes **all** active refresh tokens for that user — forces re-login on every device.

Errors: `INVALID_REFRESH_TOKEN` (401 — deliberately generic across not-found/expired/revoked/reused, so a client can't distinguish the reason), `VALIDATION_ERROR` (400).

### Logout

`POST /api/v1/auth/logout` → `200 OK`, `data: null`

**Public endpoint** — no `Authorization` header required or checked, safe to call even with an expired access token.

Request:

```json
{ "refreshToken": "string, required" }
```

An unknown or already-revoked refresh token silently no-ops and still returns `success: true`.

Errors: `VALIDATION_ERROR` (400) only.

### Current User

`GET /api/v1/auth/me` → `200 OK`

Requires `Authorization: Bearer <accessToken>`.

Response (`data`):

```json
{ "id": "uuid", "email": "string", "goal": "beginner | test-prep | professional | for-child" }
```

Errors: `UNAUTHORIZED` (401). Known backend quirk: if the access token is valid but the user row no longer exists, the backend returns `500 INTERNAL_ERROR` rather than a 404 — treat as a generic failure, don't special-case it.

## Token lifetimes

- Access token: 15 minutes (`JWT_EXPIRATION_SECONDS`, env-overridable).
- Refresh token: opaque (not a JWT), 30-day default (`JWT_REFRESH_EXPIRATION_SECONDS`), stored server-side only as a SHA-256 hash — treat as an opaque string on the frontend, never decode it.

## Error codes

| Code | HTTP status |
|---|---|
| `DUPLICATE_EMAIL` | 409 |
| `INVALID_CREDENTIALS` | 401 |
| `VALIDATION_ERROR` | 400 |
| `UNAUTHORIZED` | 401 |
| `INTERNAL_ERROR` | 500 |
| `GOOGLE_TOKEN_INVALID` | 401 |
| `GOOGLE_EMAIL_NOT_VERIFIED` | 403 |
| `ACCOUNT_EXISTS_WITH_PASSWORD` | 409 |
| `INVALID_REFRESH_TOKEN` | 401 |
