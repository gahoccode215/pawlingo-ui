# FE Integration Guide — Vocabulary Content (Vocab MVP, Phase 1)

> Dành cho `pawlingo-ui`. Copy file này vào repo FE (ví dụ `docs/backend-vocab-integration.md`) làm tài liệu tham chiếu khi implement trang `/vocabulary`.
>
> Backend: `pawlingo-api` (Spring Boot). Đang được implement trên branch `feature/vocabulary-content-refactor`, **chưa merge vào `main`** — báo backend team trước khi tích hợp thật để confirm đã deploy chưa.
>
> ⚠️ Đây là bản **thay thế hoàn toàn** cho model Vocab cũ (`Topic` + `VocabWord`, endpoint `/api/v1/vocab/topics...`). Nếu FE đã có code gọi endpoint cũ, cần bỏ đi — endpoint cũ không còn tồn tại sau migration này.

---

## 1. Quy ước chung

- **Base URL**: `{BACKEND_URL}/api/v1`.
- **Response envelope** — giống mọi endpoint khác trong hệ thống:
  ```json
  { "success": true,  "data": { ... }, "error": null }
  { "success": false, "data": null,    "error": { "code": "SOME_CODE", "message": "..." } }
  ```
- **Auth**: bắt buộc JWT — header `Authorization: Bearer <accessToken>`. Cả 2 endpoint dưới đây đều yêu cầu user đã đăng nhập (401 `UNAUTHORIZED` nếu thiếu/sai token). Xem `fe-auth-integration.md` để lấy token.
- Đây là **Phase 1 — chỉ browse nội dung từ vựng**. Chưa có flashcard, quiz, mastery, progress, XP, spaced repetition ở phase này — đừng build UI cho các tính năng đó dựa trên tài liệu này (sẽ có spec riêng cho phase sau).

---

## 2. Các enum

### `topic`

| Value JSON | Hiển thị gợi ý |
|---|---|
| `work` | Work |
| `education` | Education |
| `travel` | Travel |
| `food` | Food |
| `daily-life` | Daily Life |

### `difficulty` (chuẩn CEFR)

`A1`, `A2`, `B1`, `B2`, `C1`, `C2` — trả về đúng dạng viết hoa này, dùng trực tiếp làm label luôn (không cần map).

### `partOfSpeech`

| Value JSON | Hiển thị gợi ý |
|---|---|
| `noun` | Noun |
| `verb` | Verb |
| `adjective` | Adjective |
| `adverb` | Adverb |
| `pronoun` | Pronoun |
| `preposition` | Preposition |
| `conjunction` | Conjunction |
| `interjection` | Interjection |

---

## 3. Danh sách từ vựng — `GET /vocabularies`

Query params (tất cả optional):

| Param | Kiểu | Mặc định | Ghi chú |
|---|---|---|---|
| `page` | int | `0` | 0-indexed |
| `size` | int | `20` | |
| `topic` | string | — | 1 trong 5 value ở mục 2 |
| `difficulty` | string | — | 1 trong 6 value CEFR |
| `search` | string | — | match `word` hoặc `meaning`, case-insensitive, substring (không phải fuzzy) |

Ví dụ:
```
GET /api/v1/vocabularies?topic=work&difficulty=B1&search=deadline&page=0&size=20
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "b3f1...-uuid",
        "word": "deadline",
        "meaning": "hạn chót",
        "partOfSpeech": "noun",
        "ipa": "/ˈdedlaɪn/",
        "definition": "the latest time or date by which something must be completed",
        "exampleSentence": "We have a tight deadline for this project.",
        "difficulty": "B1",
        "topic": "work",
        "pronunciationAudioUrl": null
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 1,
    "totalPages": 1
  },
  "error": null
}
```

Lưu ý:
- `definition` và `pronunciationAudioUrl` có thể là `null` — không phải mọi từ đều có sẵn (đặc biệt audio, hiện **chưa có từ nào có audio thật** ở seed data, field chỉ để dành chỗ cho sau này).
- Filter/search là **server-side** — FE gọi lại API mỗi khi đổi filter/search/page, không tự fetch hết rồi lọc client-side.

---

## 4. Chi tiết 1 từ — `GET /vocabularies/{id}`

`{id}` là UUID lấy từ field `id` ở response danh sách.

Response `200`: cùng shape 1 object như 1 phần tử trong `content` ở mục 3 (không bọc thêm gì khác).

Response `404` nếu id không tồn tại:
```json
{ "success": false, "data": null, "error": { "code": "VOCABULARY_NOT_FOUND", "message": "..." } }
```

---

## 5. Bảng error code

| HTTP | `error.code` | Ý nghĩa |
|---|---|---|
| 404 | `VOCABULARY_NOT_FOUND` | id không tồn tại (detail) |
| 401 | `UNAUTHORIZED` | thiếu/sai/hết hạn token |
| 400 | `VALIDATION_ERROR` | query param sai kiểu (vd `topic=xyz` không match enum) |
| 500 | `INTERNAL_ERROR` | lỗi không mong muốn phía BE |

---

## 6. Đề xuất UI/UX cho trang Vocabulary

Phase 1 chỉ là trang **browse**, nhưng nên làm cho đẹp và dễ dùng ngay từ đầu vì đây là first-impression của tính năng học từ vựng. Một số gợi ý cụ thể:

### 6.1. Layout tổng thể — `/vocabulary`

- Header ngắn: tiêu đề "Vocabulary" + subtitle 1 dòng ("Learn useful English words").
- Thanh search nổi bật ngay dưới header, full-width trên mobile.
- Filter bằng **pill/chip tabs** ngang cho topic (`All`, `Work`, `Education`, `Travel`, `Food`, `Daily Life`) — chip đang active có màu nền khác biệt rõ, không chỉ đổi màu chữ (để đủ contrast, dễ nhận biết trạng thái). Difficulty filter có thể là dropdown/select riêng bên cạnh, tránh làm rối hàng chip topic.
- Grid card responsive: 1 cột trên mobile, 2 cột tablet, 3 cột desktop. Card cao đều nhau trong 1 hàng (dùng flex/grid với `align-items: stretch`, đừng để card lệch cao thấp do độ dài example sentence khác nhau).

### 6.2. Vocabulary Card

Hiển thị theo đúng độ ưu tiên thị giác (font-size/weight giảm dần):
1. **Word** — to nhất, đậm.
2. **Part of speech + Difficulty** cùng 1 dòng, dạng badge nhỏ (vd `VERB` badge xám, `B1` badge màu theo mức độ — có thể dùng thang màu xanh lá (A1/A2, dễ) → vàng (B1/B2, trung bình) → đỏ/tím (C1/C2, khó) để user quét nhanh bằng mắt mà không cần đọc chữ).
3. **Meaning** (tiếng Việt) — cỡ vừa, màu nhạt hơn word một chút để phân cấp.
4. **Example sentence** — cỡ nhỏ nhất, style italic hoặc màu xám, có thể truncate 2 dòng (`line-clamp: 2`) nếu quá dài, không để card bị vỡ layout.
5. IPA (nếu có) hiện nhỏ cạnh word, dạng `/ˈdedlaɪn/`. Icon loa (audio) **chỉ hiện khi `pronunciationAudioUrl` khác null** — ẩn hoàn toàn nếu null, đừng hiện icon disabled/xám (theo đúng spec gốc: không giả lập audio generation ở phase này).
6. Toàn bộ card là 1 link/clickable area dẫn tới `/vocabulary/[id]`, có hover state rõ ràng (shadow nhẹ nhấc lên hoặc border đổi màu) để báo hiệu "click được".

### 6.3. Trang chi tiết — `/vocabulary/[id]`

- Nút "← Back to vocabulary" ở đầu trang, quay lại đúng list kèm filter/search/page đang có trước đó (xem mục 6.5 về URL state) — tránh mất context khi user back.
- Word là tiêu đề lớn nhất trang, IPA ngay dưới dạng monospace/italic.
- Part of speech + difficulty badge cùng style với ở card.
- Section rõ ràng, có heading nhỏ: **Meaning**, **Definition** (ẩn cả section nếu `definition` null, đừng hiện "Definition" trống), **Example**, **Topic**.
- **Không** thêm nút "Practice this word" / "Mark as learned" / "I know this" — Phase 1 chưa có progress tracking, để dành cho phase sau.

### 6.4. Loading / Empty / Error state

- **Loading**: skeleton card (khối xám bo góc, shimmer animation nhẹ) đúng số lượng/kích thước card thật sẽ hiện ra — tránh layout shift khi data load xong. Không dùng spinner to giữa màn hình che hết trang.
- **Empty** (search/filter không ra kết quả): icon minh hoạ nhẹ nhàng (không phải lỗi) + text "No vocabulary found." + gợi ý hành động "Try changing your search or filters." + nút/link "Clear filters" để reset nhanh.
- **Error** (API fail, network lỗi): text "Something went wrong." + "Please try again." + nút **Retry** gọi lại request vừa fail, không bắt user reload cả trang.
- 3 state này loại trừ lẫn nhau và loại trừ với state "có data" — không bao giờ để trang trắng không rõ đang ở trạng thái nào.

### 6.5. Search, filter & URL state

- Debounce ô search (~300-400ms) trước khi gọi API, tránh spam request mỗi keystroke.
- Đồng bộ `search`, `topic`, `difficulty`, `page` vào **query string của URL** (vd `/vocabulary?topic=work&search=dead`) — giúp user bookmark/share/back-forward mà không mất filter đang chọn. Đây cũng là điều kiện để nút "Back" ở trang detail (mục 6.3) hoạt động đúng.
- Khi đổi filter/search, reset `page` về `0`.

### 6.6. Pagination

- Nếu tổng số trang nhỏ (~vài trang với 30 từ seed ban đầu): dùng pagination control đơn giản (Previous/Next + số trang hiện tại/tổng).
- Disable nút Previous ở trang đầu, Next ở trang cuối (dựa vào `totalPages` trong response) thay vì để user bấm ra lỗi.

### 6.7. Responsive & accessibility

- Mobile-first: test kỹ ở viewport ~375px trước, filter chips phải scroll ngang được nếu không đủ chỗ, đừng để wrap vỡ layout.
- Đảm bảo contrast đủ chuẩn AA cho text trên difficulty badge màu (đặc biệt badge vàng — chữ trắng trên vàng nhạt thường không đủ contrast, cân nhắc chữ tối màu).
- Toàn bộ interactive element (card, chip, nút retry/clear) phải focus-able bằng keyboard và có focus ring rõ ràng, không chỉ hoạt động bằng chuột.
- `alt`/`aria-label` phù hợp cho icon audio (vd `aria-label="Play pronunciation"`).

---

## 7. Những gì **chưa có**, đừng dựa vào

- Flashcard, quiz, multiple-choice, fill-in-the-blank, listening/speaking exercise.
- User progress, correct/wrong tracking, mastery score, spaced repetition, daily review.
- XP, streak, leaderboard, gamification, social features.
- AI-generated example/evaluation.
- Audio thật (field `pronunciationAudioUrl` tồn tại trong response nhưng hiện toàn bộ seed data đều `null`).
- Endpoint cũ `GET /vocab/topics`, `GET /vocab/topics/{topicCode}` — đã bị xoá, không còn hoạt động.

Các mục trên đều thuộc phase sau, sẽ có spec riêng khi tới lượt.
