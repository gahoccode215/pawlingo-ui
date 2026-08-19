import type { Topic, VocabWord } from "@/types/vocab";

// imageUrl holds an emoji placeholder for MVP — no image asset pipeline yet,
// swap for real image URLs once the backend/CMS owns this data.
const foodWords: VocabWord[] = [
  {
    id: "apple",
    word: "Apple",
    definition: "Một loại quả tròn, vỏ đỏ hoặc xanh, cắn vào giòn tan.",
    imageUrl: "🍎",
    exampleSentence: "She packed an apple in her lunch bag.",
    topic: "food",
  },
  {
    id: "bread",
    word: "Bread",
    definition: "Một loại thực phẩm nướng từ bột mì, thường ăn theo lát.",
    imageUrl: "🍞",
    exampleSentence: "He toasted a slice of bread for breakfast.",
    topic: "food",
  },
  {
    id: "egg",
    word: "Egg",
    definition: "Một loại thực phẩm hình bầu dục do gà đẻ ra, thường chiên hoặc luộc.",
    imageUrl: "🥚",
    exampleSentence: "I like my egg fried with a runny yolk.",
    topic: "food",
  },
  {
    id: "rice",
    word: "Rice",
    definition: "Những hạt nhỏ màu trắng hoặc nâu, được nấu chín và ăn như món chính.",
    imageUrl: "🍚",
    exampleSentence: "We had steamed rice with dinner.",
    topic: "food",
  },
  {
    id: "milk",
    word: "Milk",
    definition: "Một loại đồ uống màu trắng từ bò, thường dùng với ngũ cốc hoặc cà phê.",
    imageUrl: "🥛",
    exampleSentence: "She poured milk over her cereal.",
    topic: "food",
  },
  {
    id: "cheese",
    word: "Cheese",
    definition: "Một loại thực phẩm rắn làm từ sữa, thường có màu vàng và dùng kẹp bánh mì.",
    imageUrl: "🧀",
    exampleSentence: "He melted cheese on top of the pasta.",
    topic: "food",
  },
  {
    id: "banana",
    word: "Banana",
    definition: "Một loại quả dài, cong, ruột vàng mềm bên trong lớp vỏ.",
    imageUrl: "🍌",
    exampleSentence: "She peeled a banana for a quick snack.",
    topic: "food",
  },
  {
    id: "soup",
    word: "Soup",
    definition: "Một món ăn dạng lỏng, nóng, thường nấu với rau củ hoặc thịt.",
    imageUrl: "🍲",
    exampleSentence: "We ate hot soup on the cold evening.",
    topic: "food",
  },
  {
    id: "noodle",
    word: "Noodle",
    definition: "Một loại thực phẩm dạng sợi dài mỏng làm từ bột, ăn trong các món hoặc nước dùng.",
    imageUrl: "🍜",
    exampleSentence: "He slurped the noodle soup happily.",
    topic: "food",
  },
  {
    id: "cake",
    word: "Cake",
    definition: "Một món tráng miệng ngọt được nướng, thường ăn vào dịp sinh nhật.",
    imageUrl: "🍰",
    exampleSentence: "They lit candles on the birthday cake.",
    topic: "food",
  },
];

export const foodTopic: Topic = {
  id: "food",
  label: "Món ăn hằng ngày",
  icon: "🍽️",
  words: foodWords,
};
