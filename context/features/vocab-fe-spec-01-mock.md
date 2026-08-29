# Vocabulary Feature — FE Spec 01: Mock-First UI (No Backend Call)

## 1. Mục tiêu

Dựng giao diện & flow tương tác cho 3 màn hình vocabulary (List, Detail, My Vocabulary) dựa trên **BE Spec 01**, nhưng dùng **mock data + mock service layer** để có thể chạy độc lập, không cần backend sẵn sàng.

Yêu cầu bắt buộc: khi backend sẵn sàng, chỉ cần đổi **1 flag / 1 file config**, không sửa component nào khác.

## 2. Nguyên tắc kiến trúc (bắt buộc)

- Toàn bộ gọi dữ liệu đi qua 1 **service layer** (ví dụ `vocabularyService.ts`), component **không** được gọi mock data trực tiếp.
- Service layer implement đúng **interface** giống hệt API thật (tên hàm, tham số, shape response) đã mô tả ở §4 của BE spec — kể cả field lồng nhau, `meta` pagination, error envelope.
- Có 1 file `config.ts` (hoặc `.env`) với `USE_MOCK = true/false`. Khi `false`, service layer gọi `fetch`/axios thật tới `/api/v1/...`.
- Mock service phải **giả lập độ trễ mạng** (ví dụ `await delay(300–600ms)`) để UI loading state được test thật, không bị "chạy tức thì" gây ảo giác là đã xong.
- Mock service phải **giả lập lỗi** có kiểm soát được (ví dụ query param `?__mockError=404` hoặc 1 toggle trong dev tool) để test được các trạng thái lỗi ở §5 BE spec, không chỉ happy path.

## 3. Mock Data

### 3.1 Bộ dữ liệu Word (seed cứng trong FE, ví dụ 40–60 từ)

Field khớp `WordDetailResponse` / `WordSummaryResponse`:
```ts
{
  id: string;            // uuid giả, ví dụ "word-001"
  word: string;
  phonetic: string | null;
  audioUrl: string | null;   // để trống hoặc trỏ 1 file mp3 mẫu để test nút play
  difficultyLevel: "A1"|"A2"|"B1"|"B2"|"C1"|"C2" | null;
  partOfSpeech: "NOUN"|"VERB"|"ADJECTIVE"|"ADVERB"|"PRONOUN"|"PREPOSITION"|"CONJUNCTION"|"INTERJECTION"|"OTHER";
  primaryMeaning: string;
  examples: { id, sentence, translation, source, orderIndex }[];
}
```
- Cố tình seed vài case đặc biệt để test UI:
  - 1 từ có `audioUrl = null` (ẩn nút play).
  - 1 từ có 0 example (test empty state).
  - 1 từ có `difficultyLevel = null` (test hiển thị "Chưa xác định" thay vì crash).
  - "book" xuất hiện 2 lần — `NOUN` và `VERB` (đúng note §2.1 BE spec: 2 senses = 2 row riêng).

### 3.2 Mock user vocabulary (in-memory, per session)

- Lưu trong 1 mảng `UserVocabulary[]` giữ trong bộ nhớ (state/store), **reset khi F5** — chấp nhận được ở phase này, ghi rõ trong README của mock.
- Không cần login thật: giả định `userId = "mock-user-1"` cố định.

## 4. Service Layer — API giả lập (map đúng BE §4)

| Hàm | Tương ứng | Input | Output | Ghi chú hành vi cần mô phỏng đúng |
|---|---|---|---|---|
| `listVocabularies(params)` | `GET /vocabularies` | `q, difficultyLevel, partOfSpeech, page, size, sort` | `{ data: WordSummaryResponse[], meta }` | prefix-match case-insensitive trên `word`; `q` < 2 ký tự → trả lỗi 400 mock |
| `getVocabularyDetail(id)` | `GET /vocabularies/{id}` | id | `WordDetailResponse` | không tìm thấy → 404 mock |
| `addToMyVocabulary(wordId)` | `POST /users/me/vocabularies` | wordId | `UserVocabularyResponse` | **idempotent**: gọi lại với word đã lưu → trả 200 với record cũ, không tạo trùng |
| `removeFromMyVocabulary(wordId)` | `DELETE /users/me/vocabularies/{wordId}` | wordId | 204 | chưa lưu → 404 mock |
| `setFavorite(wordId, isFavorite)` | `PATCH .../favorite` | wordId, bool | `UserVocabularyResponse` | nếu chưa có `UserVocabulary` → **tự tạo mới** (status NEW) rồi set favorite, đúng rule BE §3.1 |
| `listMyVocabularies(params)` | `GET /users/me/vocabularies` | `isFavorite?, status?, page, size` | `{ data: UserVocabularyResponse[] (nested word), meta }` | |

Toàn bộ hàm trên trả `Promise` và có thể reject với object `{ status, code, message }` giống error envelope thật, để component xử lý y hệt lúc nối BE thật.

## 5. Màn hình & Flow

### 5.1 Vocabulary List (`/vocabularies`)
- Ô search (debounce ~400ms), disable submit nếu `q.length === 1` và show hint "Nhập tối thiểu 2 ký tự".
- Filter dropdown: `difficultyLevel`, `partOfSpeech` (đều optional, combinable với `q`).
- Danh sách dạng card/row: word, phonetic, difficulty badge, part of speech badge, primaryMeaning (rút gọn).
- Pagination (dựa vào `meta.page/size/totalPages`).
- States cần dựng: loading (skeleton), empty (không có kết quả), error (lỗi mock), có data.
- Click 1 item → sang Detail.

### 5.2 Vocabulary Detail (`/vocabularies/:id`)
- Hiển thị: word, phonetic, part of speech, difficulty, primaryMeaning, danh sách examples (sort theo `orderIndex`).
- Nút Play audio — chỉ hiện nếu `audioUrl` khác null.
- Nút **Add / Đã lưu** (toggle theo trạng thái có `UserVocabulary` hay chưa):
  - Nếu chưa lưu: bấm "Add" → gọi `addToMyVocabulary` → optimistic UI chuyển sang "Đã lưu".
  - Nếu đã lưu: hiện nút "Remove" → gọi `removeFromMyVocabulary` → xoá luôn favorite (vì record bị xoá).
- Nút Favorite (icon tim), bấm được **kể cả khi chưa Add**:
  - Nếu chưa có `UserVocabulary`: bấm favorite → tự tạo record + set favorite = true, đồng thời UI nút "Add" cũng phải tự chuyển thành "Đã lưu" (vì record vừa được tạo ngầm).
  - Nếu đã có: chỉ toggle `isFavorite`, record không bị xoá khi unfavorite.
- States: loading, not-found (404 mock), error khi thao tác add/remove/favorite (hiện toast, rollback optimistic UI).

### 5.3 My Vocabulary (`/me/vocabularies`)
- Filter: `isFavorite` (toggle), `status` (dropdown, dù phase này status luôn `NEW` — vẫn dựng UI filter để không phải sửa lại sau).
- List item hiển thị nested `word` (word, phonetic, difficulty, part of speech) + trạng thái favorite + action Remove nhanh ngay trên list.
- Pagination giống List.
- Empty state riêng: "Bạn chưa lưu từ nào" kèm CTA quay lại trang list.

## 6. Ngoài phạm vi (giữ nguyên theo BE spec)

- Không có SRS/quiz/gamification.
- Không có màn hình admin tạo/sửa Word.
- Không sửa `status` (NEW/LEARNING/MASTERED) qua UI.
- Không cần i18n đa ngôn ngữ nội dung từ vựng.

## 7. Bàn giao mock phase

- README ngắn trong thư mục mock: cách bật/tắt `USE_MOCK`, cách seed thêm data, cách giả lập lỗi.
- Danh sách case đã test thủ công (checklist) đính kèm PR: idempotent add, implicit favorite-create, remove xoá luôn favorite, search < 2 ký tự, filter kết hợp search, phân trang, audio null, examples rỗng.
- Khi BE thật xong: chỉ đổi `USE_MOCK = false` + base URL, chạy lại checklist trên với API thật, không sửa component.
