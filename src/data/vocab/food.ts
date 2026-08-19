import type { Topic, VocabWord } from "@/types/vocab";

// imageUrl holds an emoji placeholder for MVP — no image asset pipeline yet,
// swap for real image URLs once the backend/CMS owns this data.
const foodWords: VocabWord[] = [
  {
    id: "apple",
    word: "Apple",
    definition: "A round fruit with red or green skin and a crisp bite.",
    imageUrl: "🍎",
    exampleSentence: "She packed an apple in her lunch bag.",
    topic: "food",
  },
  {
    id: "bread",
    word: "Bread",
    definition: "A baked food made from flour, usually eaten in slices.",
    imageUrl: "🍞",
    exampleSentence: "He toasted a slice of bread for breakfast.",
    topic: "food",
  },
  {
    id: "egg",
    word: "Egg",
    definition: "An oval food laid by hens, often fried or boiled.",
    imageUrl: "🥚",
    exampleSentence: "I like my egg fried with a runny yolk.",
    topic: "food",
  },
  {
    id: "rice",
    word: "Rice",
    definition: "Small white or brown grains that are boiled and eaten as a staple food.",
    imageUrl: "🍚",
    exampleSentence: "We had steamed rice with dinner.",
    topic: "food",
  },
  {
    id: "milk",
    word: "Milk",
    definition: "A white drink from cows, often had with cereal or coffee.",
    imageUrl: "🥛",
    exampleSentence: "She poured milk over her cereal.",
    topic: "food",
  },
  {
    id: "cheese",
    word: "Cheese",
    definition: "A solid food made from milk, often yellow and used on sandwiches.",
    imageUrl: "🧀",
    exampleSentence: "He melted cheese on top of the pasta.",
    topic: "food",
  },
  {
    id: "banana",
    word: "Banana",
    definition: "A long curved fruit with soft yellow flesh inside a peel.",
    imageUrl: "🍌",
    exampleSentence: "She peeled a banana for a quick snack.",
    topic: "food",
  },
  {
    id: "soup",
    word: "Soup",
    definition: "A warm liquid dish, often made with vegetables or meat.",
    imageUrl: "🍲",
    exampleSentence: "We ate hot soup on the cold evening.",
    topic: "food",
  },
  {
    id: "noodle",
    word: "Noodle",
    definition: "A long thin strip of food made from dough, served in dishes or broth.",
    imageUrl: "🍜",
    exampleSentence: "He slurped the noodle soup happily.",
    topic: "food",
  },
  {
    id: "cake",
    word: "Cake",
    definition: "A sweet baked dessert, often eaten on birthdays.",
    imageUrl: "🍰",
    exampleSentence: "They lit candles on the birthday cake.",
    topic: "food",
  },
];

export const foodTopic: Topic = {
  id: "food",
  label: "Everyday Food",
  icon: "🍽️",
  words: foodWords,
};
