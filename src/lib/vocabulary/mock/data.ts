import type {
  DifficultyLevel,
  PartOfSpeech,
  VocabularyTopic,
  WordDetailResponse,
  WordExampleResponse,
} from "@/types/vocabulary";

// A single sample audio file shared by every word that has one — good enough
// to exercise the Play button in the UI; not meant to be a real per-word
// pronunciation asset in this mock phase.
const SAMPLE_AUDIO_URL = "/mock-audio/sample.mp3";

interface ExampleSeed {
  sentence: string;
  translation: string | null;
  source?: string;
}

interface WordSeed {
  word: string;
  phonetic: string | null;
  audioUrl: string | null;
  difficultyLevel: DifficultyLevel | null;
  partOfSpeech: PartOfSpeech;
  // Mock-only — see VocabularyTopic in src/types/vocabulary.ts.
  topic: VocabularyTopic;
  primaryMeaning: string;
  examples: ExampleSeed[];
}

function buildExamples(wordId: string, seeds: ExampleSeed[]): WordExampleResponse[] {
  return seeds.map((seed, index) => ({
    id: `${wordId}-ex-${index + 1}`,
    sentence: seed.sentence,
    translation: seed.translation,
    source: seed.source ?? null,
    orderIndex: index,
  }));
}

const WORD_SEEDS: WordSeed[] = [
  {
    word: "environment",
    phonetic: "/ɪnˈvaɪrənmənt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "NOUN",
    topic: "EDUCATION",
    primaryMeaning: "môi trường",
    examples: [
      {
        sentence: "We must protect the environment for future generations.",
        translation: "Chúng ta phải bảo vệ môi trường cho các thế hệ tương lai.",
        source: "Oxford Dictionary",
      },
      {
        sentence: "Plastic waste is harmful to the environment.",
        translation: "Rác thải nhựa gây hại cho môi trường.",
      },
    ],
  },
  {
    word: "book",
    phonetic: "/bʊk/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "NOUN",
    topic: "EDUCATION",
    primaryMeaning: "quyển sách",
    examples: [
      {
        sentence: "She is reading a book about history.",
        translation: "Cô ấy đang đọc một quyển sách về lịch sử.",
      },
    ],
  },
  {
    // Same word, different sense — mirrors BE §2.1: two Word rows, same
    // word/normalizedWord, different partOfSpeech.
    word: "book",
    phonetic: "/bʊk/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "VERB",
    topic: "TRAVEL",
    primaryMeaning: "đặt trước, đặt chỗ",
    examples: [
      {
        sentence: "I booked a table at the restaurant for two people.",
        translation: "Tôi đã đặt một bàn ở nhà hàng cho hai người.",
      },
      {
        sentence: "You should book your flight early to get a better price.",
        translation: "Bạn nên đặt vé máy bay sớm để có giá tốt hơn.",
      },
    ],
  },
  {
    word: "beautiful",
    phonetic: "/ˈbjuːtɪfl/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "ADJECTIVE",
    topic: "TRAVEL",
    primaryMeaning: "đẹp",
    examples: [
      {
        sentence: "The sunset over the ocean was beautiful.",
        translation: "Hoàng hôn trên biển thật đẹp.",
      },
    ],
  },
  {
    word: "quickly",
    phonetic: "/ˈkwɪkli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "ADVERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "nhanh chóng",
    examples: [
      {
        sentence: "He quickly finished his homework.",
        translation: "Anh ấy nhanh chóng hoàn thành bài tập về nhà.",
      },
    ],
  },
  {
    word: "achievement",
    phonetic: "/əˈtʃiːvmənt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "NOUN",
    topic: "EDUCATION",
    primaryMeaning: "thành tựu",
    examples: [
      {
        sentence: "Winning the award was a great achievement for the team.",
        translation: "Giành được giải thưởng là một thành tựu lớn của cả đội.",
      },
    ],
  },
  {
    word: "negotiate",
    phonetic: "/nɪˈɡəʊʃieɪt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C1",
    partOfSpeech: "VERB",
    topic: "WORK",
    primaryMeaning: "đàm phán, thương lượng",
    examples: [
      {
        sentence: "The two companies are negotiating a new contract.",
        translation: "Hai công ty đang đàm phán một hợp đồng mới.",
      },
    ],
  },
  {
    word: "ubiquitous",
    phonetic: "/juːˈbɪkwɪtəs/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C2",
    partOfSpeech: "ADJECTIVE",
    topic: "EDUCATION",
    primaryMeaning: "có mặt khắp nơi",
    examples: [
      {
        sentence: "Smartphones have become ubiquitous in modern life.",
        translation: "Điện thoại thông minh đã trở nên phổ biến khắp nơi trong đời sống hiện đại.",
      },
    ],
  },
  {
    word: "cat",
    phonetic: "/kæt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "NOUN",
    topic: "DAILY_LIFE",
    primaryMeaning: "con mèo",
    examples: [
      { sentence: "The cat is sleeping on the sofa.", translation: "Con mèo đang ngủ trên ghế sofa." },
    ],
  },
  {
    word: "run",
    phonetic: "/rʌn/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "VERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "chạy",
    examples: [
      { sentence: "They run in the park every morning.", translation: "Họ chạy trong công viên mỗi sáng." },
    ],
  },
  {
    word: "happy",
    phonetic: "/ˈhæpi/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "ADJECTIVE",
    topic: "HOLIDAY",
    primaryMeaning: "hạnh phúc, vui vẻ",
    examples: [
      { sentence: "She felt happy after passing the exam.", translation: "Cô ấy cảm thấy vui khi thi đỗ." },
    ],
  },
  {
    word: "always",
    phonetic: "/ˈɔːlweɪz/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "ADVERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "luôn luôn",
    examples: [
      { sentence: "He always arrives on time.", translation: "Anh ấy luôn đến đúng giờ." },
    ],
  },
  {
    word: "they",
    phonetic: "/ðeɪ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "PRONOUN",
    topic: "DAILY_LIFE",
    primaryMeaning: "họ",
    examples: [
      { sentence: "They are my classmates.", translation: "Họ là bạn cùng lớp của tôi." },
    ],
  },
  {
    word: "under",
    phonetic: "/ˈʌndər/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "PREPOSITION",
    topic: "DAILY_LIFE",
    primaryMeaning: "ở dưới",
    examples: [
      { sentence: "The keys are under the table.", translation: "Chìa khóa ở dưới bàn." },
    ],
  },
  {
    word: "because",
    phonetic: "/bɪˈkɒz/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "CONJUNCTION",
    topic: "EDUCATION",
    primaryMeaning: "bởi vì",
    examples: [
      { sentence: "I stayed home because it was raining.", translation: "Tôi ở nhà vì trời mưa." },
    ],
  },
  {
    word: "wow",
    phonetic: "/waʊ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "INTERJECTION",
    topic: "HOLIDAY",
    primaryMeaning: "ồ, wow (thể hiện sự ngạc nhiên)",
    examples: [
      { sentence: "Wow, this view is amazing!", translation: "Ồ, khung cảnh này thật tuyệt vời!" },
    ],
  },
  {
    word: "etc",
    phonetic: null,
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "OTHER",
    topic: "DAILY_LIFE",
    primaryMeaning: "vân vân",
    examples: [
      {
        sentence: "We need to buy fruit, vegetables, milk, etc.",
        translation: "Chúng ta cần mua trái cây, rau, sữa, vân vân.",
      },
    ],
  },
  {
    word: "journey",
    phonetic: "/ˈdʒɜːni/",
    // No audio for this one — verifies the UI hides the Play button.
    audioUrl: null,
    difficultyLevel: "B1",
    partOfSpeech: "NOUN",
    topic: "TRAVEL",
    primaryMeaning: "hành trình, chuyến đi",
    examples: [
      { sentence: "Our journey to the mountains took six hours.", translation: "Hành trình đến núi của chúng tôi mất sáu tiếng." },
    ],
  },
  {
    word: "silence",
    phonetic: "/ˈsaɪləns/",
    audioUrl: SAMPLE_AUDIO_URL,
    // Unrated word — verifies the UI shows "Chưa xác định" instead of crashing.
    difficultyLevel: null,
    partOfSpeech: "NOUN",
    topic: "DAILY_LIFE",
    primaryMeaning: "sự im lặng",
    examples: [
      { sentence: "There was complete silence in the room.", translation: "Căn phòng hoàn toàn im lặng." },
    ],
  },
  {
    word: "curiosity",
    phonetic: "/ˌkjʊəriˈɒsəti/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "NOUN",
    topic: "EDUCATION",
    // No examples seeded — verifies the detail page's empty-examples state.
    examples: [],
    primaryMeaning: "sự tò mò",
  },
  {
    word: "improve",
    phonetic: "/ɪmˈpruːv/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "VERB",
    topic: "EDUCATION",
    primaryMeaning: "cải thiện",
    examples: [
      { sentence: "You can improve your English by reading every day.", translation: "Bạn có thể cải thiện tiếng Anh bằng cách đọc mỗi ngày." },
    ],
  },
  {
    word: "generous",
    phonetic: "/ˈdʒenərəs/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "ADJECTIVE",
    topic: "HOLIDAY",
    primaryMeaning: "hào phóng, rộng lượng",
    examples: [
      { sentence: "It was very generous of him to donate the money.", translation: "Anh ấy đã rất hào phóng khi quyên góp số tiền đó." },
    ],
  },
  {
    word: "carefully",
    phonetic: "/ˈkeəfəli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "ADVERB",
    topic: "WORK",
    primaryMeaning: "một cách cẩn thận",
    examples: [
      { sentence: "Please read the instructions carefully.", translation: "Vui lòng đọc kỹ hướng dẫn." },
    ],
  },
  {
    word: "decision",
    phonetic: "/dɪˈsɪʒn/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "NOUN",
    topic: "WORK",
    primaryMeaning: "quyết định",
    examples: [
      { sentence: "Making that decision was not easy.", translation: "Đưa ra quyết định đó không hề dễ dàng." },
    ],
  },
  {
    word: "explore",
    phonetic: "/ɪkˈsplɔːr/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "VERB",
    topic: "TRAVEL",
    primaryMeaning: "khám phá",
    examples: [
      { sentence: "We spent the weekend exploring the old city.", translation: "Chúng tôi dành cả cuối tuần để khám phá thành phố cổ." },
    ],
  },
  {
    word: "confident",
    phonetic: "/ˈkɒnfɪdənt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "ADJECTIVE",
    topic: "WORK",
    primaryMeaning: "tự tin",
    examples: [
      { sentence: "She felt confident before the interview.", translation: "Cô ấy cảm thấy tự tin trước buổi phỏng vấn." },
    ],
  },
  {
    word: "recently",
    phonetic: "/ˈriːsntli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "ADVERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "gần đây",
    examples: [
      { sentence: "I recently started learning to play the guitar.", translation: "Gần đây tôi bắt đầu học chơi guitar." },
    ],
  },
  {
    word: "opportunity",
    phonetic: "/ˌɒpəˈtjuːnəti/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "NOUN",
    topic: "WORK",
    primaryMeaning: "cơ hội",
    examples: [
      { sentence: "Studying abroad was a great opportunity for her.", translation: "Du học là một cơ hội tuyệt vời đối với cô ấy." },
    ],
  },
  {
    word: "achieve",
    phonetic: "/əˈtʃiːv/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "VERB",
    topic: "EDUCATION",
    primaryMeaning: "đạt được",
    examples: [
      { sentence: "It takes hard work to achieve your goals.", translation: "Cần phải nỗ lực để đạt được mục tiêu của bạn." },
    ],
  },
  {
    word: "flexible",
    phonetic: "/ˈfleksəbl/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "ADJECTIVE",
    topic: "WORK",
    primaryMeaning: "linh hoạt",
    examples: [
      { sentence: "Our working hours are flexible.", translation: "Giờ làm việc của chúng tôi linh hoạt." },
    ],
  },
  {
    word: "eventually",
    phonetic: "/ɪˈventʃuəli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "ADVERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "cuối cùng",
    examples: [
      { sentence: "Eventually, they found a solution to the problem.", translation: "Cuối cùng, họ đã tìm ra giải pháp cho vấn đề." },
    ],
  },
  {
    word: "himself",
    phonetic: "/hɪmˈself/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A2",
    partOfSpeech: "PRONOUN",
    topic: "DAILY_LIFE",
    primaryMeaning: "chính anh ấy, tự anh ấy",
    examples: [
      { sentence: "He taught himself how to code.", translation: "Anh ấy tự học cách lập trình." },
    ],
  },
  {
    word: "although",
    phonetic: "/ɔːlˈðəʊ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "CONJUNCTION",
    topic: "EDUCATION",
    primaryMeaning: "mặc dù",
    examples: [
      { sentence: "Although it was raining, we went for a walk.", translation: "Mặc dù trời mưa, chúng tôi vẫn đi dạo." },
    ],
  },
  {
    word: "between",
    phonetic: "/bɪˈtwiːn/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "PREPOSITION",
    topic: "DAILY_LIFE",
    primaryMeaning: "giữa",
    examples: [
      { sentence: "The bank is between the bakery and the pharmacy.", translation: "Ngân hàng nằm giữa tiệm bánh và hiệu thuốc." },
    ],
  },
  {
    word: "ouch",
    phonetic: "/aʊtʃ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "A1",
    partOfSpeech: "INTERJECTION",
    topic: "DAILY_LIFE",
    primaryMeaning: "ối, á (thể hiện đau)",
    examples: [
      { sentence: "Ouch! That really hurt.", translation: "Ối! Đau quá." },
    ],
  },
  {
    word: "sustainable",
    phonetic: "/səˈsteɪnəbl/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C1",
    partOfSpeech: "ADJECTIVE",
    topic: "EDUCATION",
    primaryMeaning: "bền vững",
    examples: [
      { sentence: "The company invests in sustainable energy sources.", translation: "Công ty đầu tư vào các nguồn năng lượng bền vững." },
    ],
  },
  {
    word: "resilience",
    phonetic: "/rɪˈzɪliəns/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C1",
    partOfSpeech: "NOUN",
    topic: "WORK",
    primaryMeaning: "khả năng phục hồi, sự kiên cường",
    examples: [
      { sentence: "Her resilience helped her recover from the setback.", translation: "Sự kiên cường của cô ấy đã giúp cô vượt qua thất bại." },
    ],
  },
  {
    word: "acknowledge",
    phonetic: "/əkˈnɒlɪdʒ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "VERB",
    topic: "WORK",
    primaryMeaning: "thừa nhận, công nhận",
    examples: [
      { sentence: "He acknowledged his mistake and apologized.", translation: "Anh ấy đã thừa nhận sai lầm và xin lỗi." },
    ],
  },
  {
    word: "profound",
    phonetic: "/prəˈfaʊnd/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C1",
    partOfSpeech: "ADJECTIVE",
    topic: "EDUCATION",
    primaryMeaning: "sâu sắc",
    examples: [
      { sentence: "The book had a profound effect on her thinking.", translation: "Cuốn sách đã có ảnh hưởng sâu sắc đến tư duy của cô ấy." },
    ],
  },
  {
    word: "arguably",
    phonetic: "/ˈɑːɡjuəbli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "C1",
    partOfSpeech: "ADVERB",
    topic: "EDUCATION",
    primaryMeaning: "có thể nói là",
    examples: [
      { sentence: "This is arguably the best restaurant in town.", translation: "Có thể nói đây là nhà hàng ngon nhất trong thị trấn." },
    ],
  },
  {
    word: "whichever",
    phonetic: "/wɪtʃˈevər/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "PRONOUN",
    topic: "DAILY_LIFE",
    primaryMeaning: "bất cứ cái nào",
    examples: [
      { sentence: "Take whichever seat you like.", translation: "Hãy ngồi bất cứ chỗ nào bạn thích." },
    ],
  },
  {
    word: "despite",
    phonetic: "/dɪˈspaɪt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "PREPOSITION",
    topic: "EDUCATION",
    primaryMeaning: "mặc dù",
    examples: [
      { sentence: "Despite the heavy rain, the match continued.", translation: "Mặc dù mưa to, trận đấu vẫn tiếp tục." },
    ],
  },
  {
    word: "whereas",
    phonetic: "/weərˈæz/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "CONJUNCTION",
    topic: "EDUCATION",
    primaryMeaning: "trong khi đó",
    examples: [
      { sentence: "She loves tea, whereas her brother prefers coffee.", translation: "Cô ấy thích trà, trong khi anh trai cô ấy lại thích cà phê." },
    ],
  },
  {
    word: "bravo",
    phonetic: "/ˈbrɑːvəʊ/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "INTERJECTION",
    topic: "HOLIDAY",
    primaryMeaning: "hoan hô, tuyệt vời",
    examples: [
      { sentence: "Bravo! That was an excellent performance.", translation: "Hoan hô! Đó là một màn trình diễn xuất sắc." },
    ],
  },
  {
    word: "innovation",
    phonetic: "/ˌɪnəˈveɪʃn/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "NOUN",
    topic: "WORK",
    primaryMeaning: "sự đổi mới, cải tiến",
    examples: [
      { sentence: "The company is known for its innovation in technology.", translation: "Công ty này nổi tiếng với sự đổi mới trong công nghệ." },
    ],
  },
  {
    word: "collaborate",
    phonetic: "/kəˈlæbəreɪt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "VERB",
    topic: "WORK",
    primaryMeaning: "hợp tác",
    examples: [
      { sentence: "The two teams collaborated on the new project.", translation: "Hai nhóm đã hợp tác trong dự án mới." },
    ],
  },
  {
    word: "diligent",
    phonetic: "/ˈdɪlɪdʒənt/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B2",
    partOfSpeech: "ADJECTIVE",
    topic: "WORK",
    primaryMeaning: "chăm chỉ, siêng năng",
    examples: [
      { sentence: "She is a diligent student who never misses class.", translation: "Cô ấy là một học sinh chăm chỉ, không bao giờ nghỉ học." },
    ],
  },
  {
    word: "gradually",
    phonetic: "/ˈɡrædʒuəli/",
    audioUrl: SAMPLE_AUDIO_URL,
    difficultyLevel: "B1",
    partOfSpeech: "ADVERB",
    topic: "DAILY_LIFE",
    primaryMeaning: "dần dần",
    examples: [
      { sentence: "The weather gradually improved throughout the day.", translation: "Thời tiết dần dần tốt hơn trong suốt cả ngày." },
    ],
  },
];

const MOCK_WORDS: WordDetailResponse[] = WORD_SEEDS.map((seed, index) => {
  const id = `word-${String(index + 1).padStart(3, "0")}`;
  return {
    id,
    word: seed.word,
    phonetic: seed.phonetic,
    audioUrl: seed.audioUrl,
    difficultyLevel: seed.difficultyLevel,
    partOfSpeech: seed.partOfSpeech,
    topic: seed.topic,
    primaryMeaning: seed.primaryMeaning,
    examples: buildExamples(id, seed.examples),
  };
});

export function getMockWords(): WordDetailResponse[] {
  return MOCK_WORDS;
}
