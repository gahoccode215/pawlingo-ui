# Vocabulary Learning (Week 1 MVP)

## 1. Mục tiêu tính năng

Cho phép người dùng học một chủ đề từ vựng theo luồng: giới thiệu → flashcard →
quiz bắt buộc → lặp lại theo cơ chế Leitner 3-box → tổng kết session. Không có
backend, toàn bộ state chạy in-memory trên client.

## 2. Luồng người dùng (user flow)

1. **Topic Intro** — giới thiệu chủ đề (ví dụ: `animals`).
2. **Flashcard** — hiển thị từng từ để người dùng làm quen trước khi kiểm tra.
3. **Quiz 4 đáp án (bắt buộc)** — người dùng phải chọn 1 trong 4 đáp án, không
   thể bỏ qua bước này.
4. **Rẽ nhánh theo kết quả quiz**:
   - **Trả lời sai** → từ bị **reset về box 1**, sẽ được hỏi lại. Số lần lặp lại
     cho một từ bị **giới hạn tối đa 5 lần** để tránh vòng lặp vô hạn.
   - **Trả lời đúng** → từ được đẩy **lên box tiếp theo** (box 1 → 2 → 3).
     Khi một từ đạt **box 3**, từ đó được coi là **đã thuộc** và không xuất
     hiện lại trong phần ôn tập của session.
5. Khi tất cả từ trong topic đã qua vòng lặp (thuộc hoặc hết lượt), chuyển sang
   **Session Summary** — tổng kết kết quả của phiên học.

## 3. Cơ chế Leitner 3-box (chi tiết logic)

- Mỗi từ vựng có 1 thuộc tính `box` (giá trị 1–3) và 1 bộ đếm `repeatCount`.
- Trạng thái khởi tạo: mọi từ bắt đầu ở **box 1**.
- **Đúng**: `box = min(box + 1, 3)`.
- **Sai**: `box = 1`, `repeatCount += 1`.
- Nếu `repeatCount` đạt **5** mà vẫn chưa lên được box 3 → từ được coi là
  "dừng lặp" (không hỏi vô hạn), tránh làm người dùng bị kẹt ở một từ khó.
- Từ đạt **box 3** → loại khỏi hàng đợi ôn tập của session hiện tại (coi như
  đã thuộc).
- Việc chọn từ tiếp theo để hỏi lấy từ hàng đợi các từ **chưa đạt box 3 và
  chưa vượt cap 5 lần** — ưu tiên xen kẽ để không hỏi liên tiếp cùng 1 từ.

## 4. Kiến trúc file (mapping)

| Thành phần | Đường dẫn | Vai trò |
|---|---|---|
| Kiểu dữ liệu | `src/types/vocab.ts` | Định nghĩa `Word`, `Box`, `QuizQuestion`, trạng thái session |
| Dữ liệu từ vựng | `src/data/vocab/animals.ts` | Nội dung topic đầu tiên (chủ đề động vật) |
| Logic Leitner | `src/lib/vocab/leitner.ts` | Tính chuyển box, reset khi sai, áp cap 5 lần |
| Logic quiz | `src/lib/vocab/quiz.ts` | Sinh câu hỏi 4 đáp án, chấm điểm đúng/sai |
| UI — Topic Intro | `src/components/vocab/TopicIntro.tsx` | Màn hình giới thiệu chủ đề |
| UI — Flashcard | `src/components/vocab/Flashcard.tsx` | Hiển thị thẻ từ vựng |
| UI — Quiz | `src/components/vocab/QuizCard.tsx` | Câu hỏi trắc nghiệm 4 đáp án |
| UI — Summary | `src/components/vocab/SessionSummary.tsx` | Màn hình tổng kết session |
| Điều phối session | `src/components/vocab/VocabSession.tsx` | Quản lý state toàn phiên, chuyển màn hình theo luồng ở mục 2 |
| Route | `src/app/learn/page.tsx` | Entry point trên web app (`/learn`) |

## 5. Giới hạn hiện tại / nợ kỹ thuật (đã biết)

- **Không persist** — state chỉ tồn tại trong bộ nhớ React; refresh trang là
  mất toàn bộ tiến trình (box, repeatCount, kết quả quiz).
- **Chỉ có 1 topic** (`animals`) — kiến trúc chưa được test với nhiều topic
  song song.
- **Không có backend/DB** — không lưu lịch sử học qua nhiều session, không có
  tài khoản người dùng gắn với tiến trình.
- Build và lint đã pass, nhưng **UI chưa được kiểm tra trực quan trong
  browser** bởi agent — cần người dùng tự test bằng mắt trước khi coi là
  hoàn thiện UI/UX.

## 6. Gợi ý bước tiếp theo (chưa triển khai)

- Thêm `localStorage` persistence cho state session (ưu tiên cao — sửa lỗ
  hổng lớn nhất hiện tại).
- Thêm topic thứ 2 để kiểm chứng khả năng tái sử dụng của
  `VocabSession` / `leitner.ts` / `quiz.ts`.
- Cân nhắc lưu lịch sử học dài hạn (streak, tổng số từ đã thuộc) một khi có
  backend.