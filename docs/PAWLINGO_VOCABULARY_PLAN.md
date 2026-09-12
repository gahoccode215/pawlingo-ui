# PawLingo — Kế hoạch tính năng Vocabulary

> Tài liệu định hướng Product + UX + Technical cho module học từ vựng tiếng Anh của PawLingo.
>
> Tech stack hiện tại: **Next.js (Frontend) + Spring Boot (Backend)**.

---

## 1. Mục tiêu của module Vocabulary

Vocabulary không nên chỉ là một danh sách từ + nghĩa + flashcard.

Mục tiêu của PawLingo là tạo một vòng lặp học:

**Khám phá từ → Hiểu trong ngữ cảnh → Ghi nhớ → Chủ động nhớ lại → Sử dụng → Ôn đúng thời điểm → Thành thạo**

Module Vocabulary cần trả lời được:

1. Người học **nên học từ nào tiếp theo?**
2. Từ đó **có nghĩa gì trong ngữ cảnh đang học?**
3. Người học có thực sự **nhớ được từ** hay chỉ nhận ra khi nhìn thấy?
4. Khi nào cần **ôn lại**?
5. Nên dùng **dạng bài tập nào** cho lần ôn tiếp theo?
6. Người học đang yếu ở recognition, recall, listening, pronunciation hay usage?
7. Làm thế nào để chuyển từ “biết nghĩa” sang “dùng được”?

---

# 2. Nguyên tắc thiết kế

## 2.1. Vocabulary Item không chỉ là một từ đơn

Hệ thống phải hỗ trợ:

- WORD — từ đơn
- PHRASE — cụm từ
- PHRASAL_VERB — cụm động từ
- IDIOM — thành ngữ
- COLLOCATION — kết hợp từ thường gặp

Ví dụ:

- decision
- make a decision
- give up
- on the other hand
- heavy rain

Không nên thiết kế database chỉ xoay quanh `Word`.

---

## 2.2. Học theo nghĩa (sense), không chỉ theo spelling

Một từ có thể có nhiều nghĩa và mỗi nghĩa có độ khó khác nhau.

Ví dụ:

```text
bank
├── ngân hàng                     A1
├── bờ sông                       B1
└── bank on somebody              B2
```

Vì vậy cần phân biệt:

```text
VocabularyItem
└── VocabularySense
```

CEFR level nên có khả năng nằm ở `VocabularySense`.

---

## 2.3. Curriculum và trạng thái ghi nhớ là hai hệ thống riêng

### Curriculum progression

```text
A1
Unit 1 → Unit 2 → Unit 3 → ... → A2
```

### Memory progression

```text
New → Learning → Reviewing → Strong/Mastered
```

Người dùng có thể đang học `A2 Unit 5` nhưng hôm nay vẫn cần ôn một số từ A1.

Không lưu hai khái niệm này thành một field `progress`.

---

# 3. Nguồn dữ liệu từ vựng

Không phụ thuộc hoàn toàn vào một nguồn duy nhất.

Các loại nguồn có thể tham khảo:

### Curriculum / Level

- Oxford 3000 / Oxford 5000
- English Vocabulary Profile (EVP)
- CEFR references

Dùng để tham khảo:

- mức độ quan trọng
- CEFR
- sense
- phrase
- collocation

**Lưu ý:** phải kiểm tra license trước khi sao chép definition, example, audio hoặc dataset vào sản phẩm.

### Core vocabulary / Frequency

Có thể nghiên cứu:

- New General Service List (NGSL)
- corpus/frequency lists phù hợp license

Dùng để trả lời:

> Từ nào thực sự đáng ưu tiên cho người học?

### Lexical data

Có thể nghiên cứu:

- Wiktionary
- Wiktextract
- Kaikki

Có thể dùng cho:

- lemma
- POS
- IPA
- inflection
- senses
- translation
- lexical relationships

Cần kiểm tra license và attribution tương ứng trước khi publish.

---

# 4. Vocabulary Content Pipeline

Không nhập tay toàn bộ vài nghìn từ trực tiếp vào production database.

Xây ingestion pipeline:

```text
CSV / JSON / Dataset
        ↓
      Import
        ↓
Normalize lemma
        ↓
Normalize POS
        ↓
Deduplicate
        ↓
Create / merge senses
        ↓
Map CEFR
        ↓
Map topics
        ↓
Generate/enrich content
        ↓
Validation
        ↓
Admin review
        ↓
Publish
```

Mỗi content record nên có trạng thái:

```text
DRAFT
REVIEW_REQUIRED
APPROVED
PUBLISHED
ARCHIVED
```

AI có thể hỗ trợ enrich content nhưng không nên tự động publish dữ liệu chưa kiểm duyệt.

---

# 5. Curriculum

## 5.1. Cấu trúc

```text
Course
└── Level
    └── Unit
        └── Lesson
            └── Vocabulary Sense
```

Ví dụ:

```text
General English
│
├── Starter
├── A1
│   ├── Greetings & Introductions
│   ├── Family
│   ├── Numbers & Time
│   ├── Food & Drink
│   ├── Home
│   ├── Daily Routine
│   ├── School
│   ├── Work
│   ├── Shopping
│   └── Travel Basics
│
├── A2
├── B1
├── B2
└── C1
```

Không cần ưu tiên xây C2 thành một danh sách từ cố định.

---

## 5.2. Quy mô tham khảo

Đây là **product target**, không phải quy định chính thức của CEFR.

| Level | Vocabulary cumulative tham khảo |
|---|---:|
| Starter | ~300 |
| A1 | ~700–900 |
| A2 | ~1.500–2.000 |
| B1 | ~2.500–3.500 |
| B2 | ~4.000–5.000+ |
| C1 | mở rộng |
| C2 | personalized/domain-oriented |

Con số cuối cùng phải được điều chỉnh dựa trên dataset thực tế.

---

## 5.3. Unit và Lesson

Một Unit:

- khoảng 10–20 vocabulary items mới
- tập trung vào một chủ đề / communicative goal
- không nhất thiết chỉ chứa word

Một Lesson:

- khoảng 5–8 items mới
- thời lượng ngắn
- có Learn + Practice

Ví dụ:

```text
Unit: Travel Basics

Lesson 1
- airport
- flight
- ticket
- passport
- luggage
- travel

Lesson 2
- arrive
- depart
- departure
- gate
- boarding pass

Lesson 3
- check in
- miss a flight
- book a ticket
- on time
```

Cuối Unit có Checkpoint.

---

# 6. Specialized Tracks

Sau Core Curriculum có thể mở rộng:

```text
General English
├── A1
├── A2
├── B1
├── B2
└── C1

Specialized Tracks
├── IELTS
│   ├── Academic Vocabulary
│   ├── Writing
│   └── Speaking
│
├── Business English
│   ├── Meetings
│   ├── Email
│   ├── Negotiation
│   └── Presentation
│
├── Software Engineering
│   ├── Development
│   ├── Meetings
│   ├── Architecture
│   └── Interviews
│
└── Travel
    ├── Airport
    ├── Hotel
    ├── Restaurant
    └── Emergency
```

Một VocabularySense có thể xuất hiện trong nhiều course/track.

Quan hệ nên là many-to-many.

---

# 7. Vocabulary Learning Object

Một vocabulary sense đầy đủ có thể chứa:

```text
accomplish
/əˈkʌm.plɪʃ/

Type:
WORD

Part of speech:
verb

CEFR:
B1

Definition EN:
to succeed in doing something

Meaning VI:
hoàn thành, đạt được

Example:
She accomplished everything she had planned.

Translation:
Cô ấy đã hoàn thành mọi thứ mình dự định.

Common patterns:
- accomplish a goal
- accomplish a task
- accomplish something difficult

Synonyms:
- achieve
- complete

Word family:
- accomplishment

Audio:
US / UK
```

Không hiển thị toàn bộ thông tin này trong mọi exercise.

UI phải progressive disclosure theo context.

---

# 8. Luồng học tổng quát

```text
Discover
   ↓
Learn
   ↓
Initial Practice
   ↓
Add to User Vocabulary
   ↓
Scheduled Review
   ↓
Recall / Cloze / Listening / Usage
   ↓
┌───────────────┬────────────────┐
│ Correct       │ Incorrect      │
↓               ↓
Longer interval Shorter interval
│               │
└───────→ Review Engine ←────────┘
                ↓
             Strong
```

---

# 9. Learn Session

Khi gặp từ mới, không bắt đầu bằng production khó.

Có thể progressive:

### Stage 1 — Presentation

Hiển thị:

- word
- pronunciation
- audio
- nghĩa chính
- một example rõ ràng

### Stage 2 — Recognition

Ví dụ:

```text
reluctant

She was reluctant to tell him the truth.

Nghĩa phù hợp nhất?

A. háo hức
B. miễn cưỡng
C. tức giận
D. bối rối
```

### Stage 3 — Context Recognition

```text
She was ______ to tell him the truth.

A. reluctant
B. ordinary
C. accurate
D. obvious
```

### Stage 4 — Recall

```text
"miễn cưỡng"

Nhập từ tiếng Anh:
__________
```

### Stage 5 — Production

Khi từ đã đủ quen:

```text
Complete the sentence:

I was reluctant to ______ because ______.
```

Không bắt mọi từ phải trải qua tất cả stage ngay trong lần học đầu tiên.

---

# 10. Exercise Types

## P0

### Multiple Choice — EN → VI

Kiểm tra recognition.

### Multiple Choice — Context

Chọn từ phù hợp với câu.

### Cloze

Điền từ còn thiếu.

### Recall — VI → EN

Người dùng phải chủ động nhớ từ.

### Recall — EN → Meaning

Có thể text hoặc lựa chọn tùy difficulty.

---

## P1

### Listening → Word

Nghe audio và nhập/chọn từ.

### Word → Listening discrimination

Phân biệt pronunciation.

### Collocation

```text
___ a decision

A. do
B. make
C. build
D. create
```

### Phrase reconstruction

Sắp xếp từ thành phrase/câu.

### Word family

```text
decide → decision
```

---

## P2

### Sentence production

Yêu cầu user sử dụng từ trong câu.

### Error correction

```text
I accomplished to finish the project.
```

Tìm/sửa lỗi.

### AI Usage Evaluation

AI đánh giá:

- đúng ngữ pháp?
- đúng nghĩa?
- tự nhiên?
- collocation đúng?
- giải thích lỗi?

### Pronunciation

User ghi âm → pronunciation evaluation.

---

# 11. Difficulty Progression

Không hỏi mãi multiple choice nếu user luôn đúng.

Ví dụ:

```text
EN → VI Multiple Choice
        ↓
Context Multiple Choice
        ↓
Cloze
        ↓
VI → EN Recall
        ↓
Listening Recall
        ↓
Use in Context
```

Nếu user gặp khó khăn:

```text
Production
    ↓ fail
Recall
    ↓ fail
Cloze + hint
    ↓ fail
Recognition + context
```

Difficulty cần adaptive.

---

# 12. Recognition và Recall

Không dùng duy nhất:

```text
mastered = true
```

Có thể theo dõi các dimension:

```text
recognitionStrength
recallStrength
listeningStrength
usageStrength
pronunciationStrength
```

MVP không nhất thiết cần tất cả.

Ưu tiên:

```text
recognitionStrength
recallStrength
```

UI không nhất thiết hiển thị raw score cho user.

Engine dùng chúng để quyết định exercise tiếp theo.

---

# 13. Spaced Repetition System (SRS)

Review queue là trung tâm của module.

Homepage/Vocabulary dashboard nên ưu tiên:

```text
18 từ cần ôn hôm nay

[Ôn ngay]
```

thay vì:

```text
Bạn đã học 1.382 từ
```

---

## 13.1. Trạng thái

Product-level states:

```text
NEW
LEARNING
REVIEWING
STRONG
```

Có thể thêm:

```text
SUSPENDED
```

Không nhất thiết map trực tiếp 1:1 với internal SRS state.

---

## 13.2. Scheduling

Không hardcode:

```text
if correct:
  +3 days
else:
  tomorrow
```

Nghiên cứu thuật toán SRS như FSRS.

Review record cần lưu đủ lịch sử để thuật toán có thể thay đổi về sau.

---

# 14. Review Session

User mở:

```text
Vocabulary
→ Review
```

Hệ thống lấy các item:

```text
dueAt <= now
```

Sau đó chọn exercise dựa trên:

- learning state
- review history
- recognition strength
- recall strength
- số lần sai
- exercise gần nhất
- difficulty
- vocabulary type

Ví dụ:

```text
Word: reluctant

Recognition mạnh
Recall yếu

→ Không hỏi multiple choice nữa.
→ Cho VI → EN recall hoặc cloze.
```

---

# 15. Review Feedback

Sau mỗi câu:

### Correct

Hiển thị ngắn:

```text
✓ Chính xác

reluctant
= miễn cưỡng

She was reluctant to leave.
```

Không interrupt quá lâu.

### Incorrect

Feedback có giá trị học:

```text
✕ Chưa đúng

Đáp án:
reluctant

She was reluctant to leave.

reluctant to + verb
```

Có thể cho:

```text
[Nghe lại 🔊]
[Giải thích]
```

---

# 16. Difficult Words

Nếu một vocabulary item:

- sai nhiều lần
- lapse liên tục
- recall thấp
- response time bất thường

đưa vào:

```text
Difficult Words
```

Engine có thể:

- review thường xuyên hơn
- dùng nhiều context hơn
- đổi exercise
- hiển thị mnemonic
- đưa contrast word
- cho AI explanation

Không đơn giản spam cùng một câu hỏi.

---

# 17. My Vocabulary

Các tab/filter:

```text
All
Learning
Due
Strong
Difficult
Favorites
```

Filter:

- CEFR
- Topic
- Part of Speech
- Vocabulary Type
- Course
- Status

Search theo:

- English
- Vietnamese meaning

---

# 18. Vocabulary Detail Page

Route ví dụ:

```text
/vocabulary/accomplish
```

Hiển thị:

### Header

- lemma
- IPA
- audio
- POS
- CEFR
- learning status

### Meanings

Từng sense riêng.

### Examples

Context + translation.

### Collocations

Ví dụ:

```text
accomplish a goal
accomplish a task
```

### Word family

```text
accomplish
accomplishment
```

### Related vocabulary

- synonym
- antonym
- topic-related

### Personal learning info

- lần học gần nhất
- trạng thái
- next review
- số lần review

Không cần show raw SRS internals nếu gây rối.

---

# 19. Collections

User có thể tạo:

```text
IELTS Writing
Software Engineering
Travel Japan
Words from Netflix
Work
```

Collection chỉ là cách tổ chức.

Một item vẫn có **một memory state chính của user**, không tạo SRS state mới cho mỗi collection.

---

# 20. Favorites

User có thể favorite vocabulary.

Favorite không đồng nghĩa với:

```text
learn this
```

Tách:

```text
Favorite
```

và:

```text
UserVocabulary
```

---

# 21. Learn From Content

P2 feature.

User paste:

```text
I was exhausted after working all day.
```

PawLingo:

1. tokenize/analyze
2. detect vocabulary
3. map về VocabularySense
4. kiểm tra user đã biết chưa
5. highlight candidate

Ví dụ:

```text
exhausted
B1
Bạn chưa học từ này.

[Thêm vào Vocabulary]
```

Sau này mở rộng:

- article
- subtitle
- transcript
- YouTube transcript
- imported text

---

# 22. Placement / Vocabulary Assessment

Không bắt user mới luôn bắt đầu A1.

Có thể có placement test:

```text
A1 → A2 → B1 → B2
```

Adaptive testing:

- đúng liên tục → tăng level
- sai → giảm level
- dừng khi confidence đủ

Kết quả:

```text
Estimated Vocabulary Level: B1

Recommended:
Start B1 Unit 3

A1: mostly known
A2: strong
B1: developing
B2: limited
```

Không tự động mark hàng nghìn từ là mastered chỉ dựa trên một placement test.

Có thể đánh dấu:

```text
assumedKnown
```

và xác nhận dần qua review/usage.

---

# 23. Audio và Pronunciation

Mỗi item nên có:

- IPA
- US audio
- UK audio (nếu có)
- stress

MVP:

```text
🔊 Listen
↻ Repeat
```

P2:

```text
🎙 Hold to speak
```

Sau đó đánh giá:

- phoneme
- stress
- pronunciation similarity
- intelligibility

Pronunciation score nên tách khỏi vocabulary recall.

---

# 24. Gamification

Gamification phải hỗ trợ việc học.

P0/P1:

```text
🔥 7 day streak

Today
16 / 20 reviews

Recall accuracy: 87%
```

Có thể thêm:

- XP
- daily goal
- achievements

Không ưu tiên sớm:

- gems
- coins
- energy
- loot box
- league
- hàng chục currency

Core loop phải tốt trước gamification.

---

# 25. Statistics

Dashboard vocabulary:

### Today

- reviews completed
- words learned
- recall accuracy
- review remaining

### Progress

- vocabulary by CEFR
- learning vs strong
- difficult words

### Retention

Có thể hiển thị đơn giản:

```text
7-day recall
30-day recall
```

Không expose thuật toán khó hiểu cho user.

---

# 26. Notifications / Daily Review

Có thể hỗ trợ:

```text
Bạn có 18 từ cần ôn hôm nay.
```

User config:

- enable/disable
- preferred review time
- daily goal

Không gửi notification chỉ để tăng engagement nếu không có learning value.

---

# 27. AI trong Vocabulary

AI là layer hỗ trợ, không phải learning engine.

## AI phù hợp cho

- giải thích từ
- giải thích lỗi
- generate examples
- generate contextual cloze
- compare similar words
- evaluate sentence production
- tạo mnemonic
- contextualize theo sở thích/ngành nghề
- explain collocation

Ví dụ:

```text
affect vs effect
```

AI có thể giải thích theo level của user.

---

## AI không nên quyết định độc quyền

- vocabulary due
- review schedule
- correctness của deterministic questions
- learning state
- curriculum ordering
- core SRS

Spring Boot/business logic xử lý các phần này.

---

# 28. AI Cost Strategy

Không gọi LLM cho mọi review.

### Pre-generated

- definitions
- examples
- distractors
- cloze
- common explanations

### Runtime deterministic

- multiple choice
- answer checking
- scheduling
- review selection

### Runtime AI

Chỉ dùng khi cần:

- free-form sentence
- explanation
- mistake analysis
- personalized context

Có cache khi phù hợp.

---

# 29. Kiến trúc khái quát

```text
                  ┌──────────────────┐
                  │ Vocabulary Data  │
                  └────────┬─────────┘
                           │
                           ↓
                  ┌──────────────────┐
                  │    Curriculum    │
                  └────────┬─────────┘
                           │
                           ↓
                  ┌──────────────────┐
                  │ Learning Engine  │
                  └────────┬─────────┘
                           │
              ┌────────────┼─────────────┐
              ↓            ↓             ↓
          Recognition    Recall        Listening
              │            │             │
              └────────────┼─────────────┘
                           ↓
                  ┌──────────────────┐
                  │   Review / SRS   │
                  └────────┬─────────┘
                           ↓
                  ┌──────────────────┐
                  │ User Vocabulary  │
                  └──────────────────┘
```

AI là service phụ trợ bên cạnh Learning Engine.

---

# 30. Backend Domain Model

Tên/entity cụ thể có thể thay đổi trong implementation.

## VocabularyItem

```text
id
lemma
type
language
createdAt
updatedAt
```

`type`:

```text
WORD
PHRASE
PHRASAL_VERB
IDIOM
COLLOCATION
```

---

## VocabularySense

```text
id
vocabularyItemId

partOfSpeech
definitionEn
definitionVi
cefrLevel

status
```

---

## Pronunciation

```text
id
vocabularyItemId

dialect
ipa
audioUrl
```

Dialect:

```text
US
UK
```

---

## VocabularyExample

```text
id
senseId

sentence
translation
difficulty
source
status
```

---

## VocabularyExpression

Cho collocation/pattern.

```text
id
senseId

expression
type
example
```

---

## VocabularyRelation

```text
id

sourceSenseId
targetSenseId
type
```

Type:

```text
SYNONYM
ANTONYM
RELATED
CONFUSABLE
WORD_FAMILY
```

---

# 31. Curriculum Domain Model

## Course

```text
id
slug
title
description
type
status
```

## CourseLevel

```text
id
courseId
cefrLevel
order
```

## Unit

```text
id
courseLevelId
slug
title
description
order
```

## Lesson

```text
id
unitId
slug
title
order
```

## LessonVocabulary

```text
lessonId
senseId

order
isPrimary
```

Không đặt trực tiếp:

```text
VocabularyItem.courseId
```

vì vocabulary có thể thuộc nhiều course.

---

# 32. User Vocabulary Domain Model

## UserVocabulary

```text
id
userId
senseId

state

recognitionStrength
recallStrength

firstLearnedAt
lastReviewedAt
nextReviewAt

favorite
suspended
```

Nếu dùng FSRS hoặc thuật toán tương tự, bổ sung internal scheduling fields theo implementation thực tế.

Ví dụ:

```text
stability
difficulty
due
lastReview
reviewCount
lapseCount
```

Không nên đóng cứng schema trước khi chọn SRS library/implementation.

---

# 33. Review History

Không chỉ lưu trạng thái cuối cùng.

## VocabularyReview

```text
id

userId
senseId

exerciseType

answer
correct
responseTimeMs

rating

reviewedAt

previousState
newState

schedulingMetadata
```

Review history giúp:

- analytics
- debug
- SRS migration
- personalization
- difficulty adaptation

---

# 34. Exercise Model

Không nhất thiết mọi exercise phải persist lâu dài.

Có thể model:

```text
Exercise
--------
id
type
senseId
prompt
answer
metadata
difficulty
```

Type:

```text
EN_TO_VI_MC
CONTEXT_MC
CLOZE
VI_TO_EN_RECALL
EN_TO_VI_RECALL
LISTENING
COLLOCATION
WORD_FAMILY
SENTENCE_PRODUCTION
PRONUNCIATION
```

---

# 35. API sơ bộ

Không phải API contract cuối cùng.

## Curriculum

```text
GET /api/v1/vocabulary/courses
GET /api/v1/vocabulary/courses/{courseSlug}
GET /api/v1/vocabulary/units/{unitId}
GET /api/v1/vocabulary/lessons/{lessonId}
```

## Vocabulary

```text
GET /api/v1/vocabulary/{id}
GET /api/v1/vocabulary/search
```

## User Vocabulary

```text
GET  /api/v1/me/vocabulary
POST /api/v1/me/vocabulary/{senseId}
DELETE /api/v1/me/vocabulary/{senseId}

POST /api/v1/me/vocabulary/{senseId}/favorite
POST /api/v1/me/vocabulary/{senseId}/suspend
```

## Learning

```text
POST /api/v1/vocabulary/lessons/{lessonId}/session
POST /api/v1/vocabulary/learning/{sessionId}/answer
```

## Review

```text
POST /api/v1/vocabulary/reviews/session
POST /api/v1/vocabulary/reviews/{sessionId}/answer
```

Backend quyết định item/exercise tiếp theo thay vì frontend tự chọn.

## Stats

```text
GET /api/v1/me/vocabulary/stats
GET /api/v1/me/vocabulary/due-count
```

---

# 36. Frontend Pages

Route cuối cùng tùy Next.js architecture hiện tại.

Gợi ý:

```text
/vocabulary
/vocabulary/learn
/vocabulary/review
/vocabulary/library
/vocabulary/difficult
/vocabulary/collections
/vocabulary/[slug]

/courses
/courses/[course]
/courses/[course]/[level]
/courses/[course]/[level]/[unit]
```

Không nhất thiết expose toàn bộ hierarchy trong URL nếu UX hiện tại có hướng khác.

---

# 37. Vocabulary Home

Mục tiêu:

User biết ngay **hôm nay cần làm gì**.

Ưu tiên:

```text
Good evening

18 từ cần ôn hôm nay
[Ôn ngay]

Continue learning
A2 · Travel
Lesson 3
[Tiếp tục]

Daily progress
16 / 20 reviews
```

Sau đó mới tới:

- Difficult words
- Browse course
- Collections
- Statistics

Tránh dashboard chứa quá nhiều cards ngang hàng.

---

# 38. Review Screen

Tập trung tuyệt đối vào exercise.

```text
Review                  8 / 18

          reluctant
        /rɪˈlʌk.tənt/

"miễn cưỡng"

        [________]

        [Kiểm tra]
```

Sau submit:

```text
✓ Chính xác

She was reluctant to leave.

reluctant to + verb

        [Tiếp tục]
```

Không để sidebar/dashboard noise cạnh exercise nếu không cần.

---

# 39. Learn Screen

Một lesson:

```text
Lesson intro
    ↓
Vocabulary presentation
    ↓
Recognition
    ↓
Context
    ↓
Recall
    ↓
Lesson summary
```

Summary:

```text
Lesson complete

6 từ mới

4 strong initial responses
2 cần luyện thêm

[Continue]
```

Không tuyên bố `Mastered` sau một lesson.

---

# 40. Empty / Error / Edge States

Phải thiết kế:

### No reviews due

```text
Bạn đã hoàn thành review hôm nay.

Review tiếp ngày mai hoặc học từ mới.
```

### Offline/network error

Không mất answer/session state nếu có thể.

### Audio unavailable

Exercise vẫn hoạt động.

### Vocabulary archived

User history vẫn giữ.

### Course content updated

Không reset user learning state.

---

# 41. Accessibility

Vocabulary UI phải hỗ trợ:

- keyboard navigation
- visible focus
- screen reader labels
- không dùng màu làm tín hiệu đúng/sai duy nhất
- audio có text equivalent
- sufficient contrast
- reduced motion
- input autocomplete behavior phù hợp
- mobile tap target đủ lớn

Correct/incorrect:

```text
✓ Correct
✕ Incorrect
```

không chỉ xanh/đỏ.

---

# 42. Mobile UX

Vocabulary rất phù hợp học nhanh trên mobile.

Ưu tiên:

- one-handed interaction
- CTA dễ chạm
- input không bị keyboard che
- audio accessible
- progress compact
- review có thể hoàn thành trong vài phút

Không copy nguyên desktop layout xuống mobile.

---

# 43. Performance

Preload hợp lý:

- exercise tiếp theo
- audio tiếp theo

Không load:

- toàn bộ course
- toàn bộ dictionary
- hàng trăm audio

Review session nên phản hồi gần như tức thì đối với deterministic exercise.

---

# 44. Analytics Events

Có thể track:

```text
vocab_lesson_started
vocab_item_presented
vocab_exercise_answered
vocab_exercise_correct
vocab_exercise_incorrect
vocab_hint_used
vocab_audio_played

vocab_review_started
vocab_review_completed

vocab_added
vocab_favorited
vocab_suspended

vocab_detail_opened
```

Không gửi PII không cần thiết.

---

# 45. Product Metrics

Không chỉ đo:

```text
total_words
```

Quan trọng hơn:

### Learning

- daily reviews completed
- due completion rate
- recall accuracy
- retention
- lapse rate

### Engagement có ý nghĩa

- active learning days
- lessons completed
- review sessions completed

### Curriculum

- level progression
- unit completion

### Quality

- từ có tỷ lệ sai bất thường
- distractor lỗi
- example gây nhầm
- content report rate

---

# 46. Admin / Content Management

Sớm hay muộn sẽ cần internal admin.

Các chức năng:

- search vocabulary
- edit item
- edit sense
- edit definition
- edit translation
- edit CEFR
- edit example
- manage audio
- map topic
- map lesson
- publish/unpublish
- bulk import
- validation warnings
- duplicate detection

Không nên sửa production vocabulary bằng SQL thủ công lâu dài.

---

# 47. Content Quality Rules

Mỗi primary sense trước khi publish nên có tối thiểu:

- lemma
- type
- POS nếu phù hợp
- CEFR
- English learner-friendly definition
- Vietnamese meaning
- ít nhất 1 example
- example translation
- pronunciation nếu phù hợp

Nên có:

- collocation
- usage pattern
- common mistake
- related words

---

# 48. Content Versioning

Vocabulary content có thể thay đổi nhưng user history không được mất.

Nghiên cứu versioning cho:

- definitions
- examples
- exercise content

Không dùng text của definition làm identifier.

Identifier phải stable.

---

# 49. Feature Priority

## P0 — Vocabulary Core

- VocabularyItem
- VocabularySense
- pronunciation/audio
- definitions EN/VI
- examples
- CEFR
- vocabulary detail
- search
- add to My Vocabulary

## P0 — Curriculum

- Course
- Level
- Unit
- Lesson
- LessonVocabulary
- A1/A2 seed curriculum

## P0 — Learning

- Learn session
- presentation
- multiple choice
- context question
- cloze
- recall

## P0 — Review

- SRS
- due queue
- review session
- answer history
- correct/incorrect feedback

---

## P1

- B1/B2 curriculum
- collocations
- phrases/phrasal verbs
- difficult words
- favorites
- collections
- adaptive exercise difficulty
- statistics
- daily goal
- streak
- listening exercises

---

## P2

- placement test
- AI explanation
- AI sentence evaluation
- pronunciation scoring
- learn from pasted content
- personalized examples
- IELTS track
- Business English
- Software Engineering English
- advanced analytics

---

# 50. Roadmap triển khai đề xuất

## Phase 0 — Foundation

Mục tiêu:

Chốt domain trước khi làm UI phức tạp.

Làm:

- vocabulary domain model
- sense model
- curriculum model
- user vocabulary model
- review history
- content status
- migration strategy

Output:

```text
DB schema
Spring Boot entities/domain
API contract draft
```

---

## Phase 1 — Content Pipeline

Làm:

- importer CSV/JSON
- normalization
- duplicate detection
- CEFR mapping
- topic mapping
- validation
- seed A1

Không cần 5.000 từ ngay.

Mục tiêu ban đầu:

```text
100–300 high-quality items
```

để kiểm chứng hệ thống.

Sau đó scale lên A1/A2.

---

## Phase 2 — Vocabulary Browser

Frontend:

- Vocabulary Home
- search
- detail
- My Vocabulary
- add/remove
- favorite

Backend:

- vocabulary query API
- user vocabulary API

---

## Phase 3 — Curriculum

Làm:

```text
General English
└── A1
    ├── Units
    └── Lessons
```

Cho user:

```text
Start lesson
Continue lesson
View progress
```

---

## Phase 4 — Learning Engine

Implement:

- learning session
- exercise generation
- MC
- context
- cloze
- recall
- answer checking
- lesson completion

Bắt đầu deterministic.

---

## Phase 5 — SRS

Implement:

- scheduler
- due queue
- review history
- next review
- lapse handling
- review session

Đây là milestone quan trọng nhất.

---

## Phase 6 — Adaptive Learning

Dùng lịch sử để chọn:

- exercise type
- difficulty
- hint
- recognition vs recall

---

## Phase 7 — Content Enrichment

Thêm:

- collocation
- word family
- synonym
- antonym
- confusable
- usage pattern
- richer examples

---

## Phase 8 — Gamification & Analytics

Sau khi learning loop đã tốt:

- streak
- daily goal
- stats
- retention
- achievements nhẹ

---

## Phase 9 — AI

AI chỉ thêm khi core deterministic system ổn.

- explain mistake
- explain vocabulary
- compare words
- evaluate production
- personalized examples

---

## Phase 10 — Expansion

- A2/B1/B2/C1
- placement
- IELTS
- Business
- Tech English
- Learn From Content
- pronunciation evaluation

---

# 51. MVP thực tế nên build

Không build tất cả ngay.

Một MVP đủ mạnh:

```text
A1 curriculum
    ↓
Lesson
    ↓
Learn 5–8 vocabulary items
    ↓
Practice
    ↓
Save learning state
    ↓
Daily Review
    ↓
SRS scheduling
    ↓
Progress
```

Feature MVP:

- 100–300 vocabulary items chất lượng cao để thử nghiệm
- sau đó mở rộng A1
- word + phrase support
- sense support
- EN/VI meaning
- IPA/audio
- example
- course/unit/lesson
- learn session
- multiple choice
- cloze
- recall
- SRS
- review
- My Vocabulary
- basic stats

Không cần trong MVP:

- AI tutor
- speaking score
- IELTS
- league
- social
- complex achievements
- thousands of generated examples

---

# 52. Luồng user MVP

## User mới

```text
Sign up
  ↓
Choose level
  ↓
A1 recommended
  ↓
Start Unit 1
  ↓
Learn Lesson 1
  ↓
Practice
  ↓
Complete
```

Sau đó:

```text
Ngày tiếp theo
    ↓
Home
    ↓
"8 từ cần ôn"
    ↓
Review
    ↓
Continue curriculum
```

---

# 53. Daily Loop mục tiêu

PawLingo nên tạo habit:

```text
Open PawLingo
      ↓
Review due vocabulary
      ↓
5–10 phút
      ↓
Learn one small lesson
      ↓
Done
```

Không bắt user quyết định giữa 20 feature mỗi lần mở app.

---

# 54. Nguyên tắc UI cho Vocabulary

UI phục vụ việc học, không phục vụ việc “trông nhiều tính năng”.

Ưu tiên:

- typography
- whitespace
- focus
- context
- immediate feedback
- progress rõ
- mobile-first interaction

Tránh:

- card cho mọi section
- dashboard SaaS
- gradient vô nghĩa
- glassmorphism
- animation trang trí
- quá nhiều icon
- quá nhiều metric
- gamification lấn át content

Review screen đặc biệt phải tối giản.

---

# 55. Các quyết định cần chốt trước khi code sâu

Trước khi implementation production, cần quyết định:

### Content

- dataset/license nào?
- definition lấy từ đâu?
- Vietnamese translation lấy từ đâu?
- audio provider nào?
- CEFR mapping strategy?

### Curriculum

- Starter có tồn tại không?
- A1 có bao nhiêu items?
- Unit taxonomy?
- số items/lesson?

### SRS

- FSRS hay scheduler khác?
- rating model?
- learning steps?
- timezone handling?

### Backend

- domain model
- review transaction
- session persistence
- caching
- content versioning

### Frontend

- URL structure
- lesson state
- optimistic UI
- offline/session recovery
- audio preload

---

# 56. Definition of Done cho Vocabulary v1

Vocabulary v1 có thể coi là usable khi user có thể:

1. Vào một curriculum.
2. Chọn/bắt đầu level.
3. Học một lesson.
4. Nghe pronunciation.
5. Hiểu từ qua meaning + context.
6. Làm nhiều dạng exercise.
7. Hoàn thành lesson.
8. Vocabulary được đưa vào personal learning state.
9. Hệ thống tự tính lần review tiếp theo.
10. Ngày sau user thấy review due.
11. Review bằng recall/context thay vì chỉ flashcard.
12. Sai → scheduling và difficulty được điều chỉnh.
13. Đúng nhiều → khoảng cách review tăng.
14. Xem lại vocabulary đã học.
15. Theo dõi progress cơ bản.

Nếu 15 điểm này hoạt động tốt, PawLingo đã có một **Vocabulary Learning System**, không chỉ là một vocabulary dictionary.

---

# 57. North Star

Khi phải lựa chọn giữa hai feature, ưu tiên feature giúp cải thiện vòng lặp:

```text
Learn
  ↓
Recall
  ↓
Review
  ↓
Retain
  ↓
Use
```

Câu hỏi quan trọng không phải:

> “PawLingo có bao nhiêu tính năng?”

Mà là:

> “Sau 30 ngày sử dụng PawLingo, người học có nhớ và sử dụng được nhiều từ hơn không?”

Đó nên là tiêu chuẩn quyết định product cho toàn bộ module Vocabulary.
