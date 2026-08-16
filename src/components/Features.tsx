const FEATURES = [
  {
    icon: "🐾",
    iconBg: "bg-coral-100",
    title: "Pet System",
    description:
      "Stats for Listening, Speaking, Reading and Writing. Skip practice and energy quietly drops — no shame, just a nudge to come back.",
  },
  {
    icon: "🗂️",
    iconBg: "bg-teal-100",
    title: "Vocabulary Learning",
    description:
      "Bite-sized flashcard lessons (10–20 words) with lightweight spaced repetition — words you get wrong simply show up more.",
  },
  {
    icon: "🎙️",
    iconBg: "bg-honey-100",
    title: "Pronunciation Practice",
    description:
      "AI scoring compares your voice to a native speaker, phoneme by phoneme. Coming in a later phase.",
    badge: "SOON",
  },
  {
    icon: "📈",
    iconBg: "bg-ink/5",
    title: "Progress Dashboard",
    description:
      "A personal, private view of what you've learned — plus an optional parent view for child accounts. No public rankings.",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-sm font-bold text-teal-600 uppercase tracking-wide">
          What you get
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
          Built around one loop: learn, and watch them grow.
        </h2>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl bg-white shadow-card border border-ink/5 p-6 hover:-translate-y-1.5 transition-transform relative"
          >
            {feature.badge && (
              <span className="absolute top-4 right-4 text-[10px] font-bold bg-honey-300 text-ink px-2 py-1 rounded-full">
                {feature.badge}
              </span>
            )}
            <div
              className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center text-3xl mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="font-display font-bold text-lg">{feature.title}</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
