const PERSONAS = [
  {
    icon: "🌱",
    title: "The Beginner",
    quote:
      "I just want a low-pressure daily habit — one that doesn't yell at me for missing a day.",
  },
  {
    icon: "👨‍👧",
    title: "The Parent",
    quote:
      "I got it for my kid. Safe content, and I can actually see what she's learning — not just a streak count.",
  },
  {
    icon: "💼",
    title: "The Working Adult",
    quote:
      "Cute pet, sure — but I need real skill measurement. This doesn't feel like it's made for kids.",
  },
  {
    icon: "🎯",
    title: "The Test-Prep Learner",
    quote:
      "Structured vocab sets and clear goals — my pet's stats basically double as a study plan.",
  },
];

export default function Personas() {
  return (
    <section id="for-you" className="bg-white border-y border-ink/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Made for anyone learning
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
            Friendly enough for beginners. Serious enough for adults.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((persona) => (
            <div
              key={persona.title}
              className="rounded-3xl bg-cream p-6 border border-ink/5"
            >
              <div className="text-3xl mb-3">{persona.icon}</div>
              <p className="font-display font-bold">{persona.title}</p>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                &ldquo;{persona.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
