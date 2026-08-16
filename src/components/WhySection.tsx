const OTHER_APPS = [
  { icon: "🔥", text: `"Don't break your 47-day streak!" (pure guilt)` },
  { icon: "🏆", text: "Leaderboards that make beginners feel behind" },
  { icon: "🪙", text: "Pets/skins bought with coins — cosmetic only" },
  { icon: "📉", text: "XP that means nothing once the app closes" },
];

const PAWLINGO = [
  { icon: "❤️", text: "Your pet's energy dips when you're away — it misses you, not a number" },
  { icon: "📊", text: "A private progress dashboard, not a public ranking" },
  { icon: "🌱", text: "Evolution tied to real Listening/Speaking/Reading/Writing skill" },
  { icon: "🎩", text: "Coins still exist — but only for hats and outfits, never growth" },
];

export default function WhySection() {
  return (
    <section id="why" className="bg-white border-y border-ink/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            The Problem
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
            Streaks guilt you. Leaderboards stress you out.
          </h2>
          <p className="mt-4 text-ink/60 text-lg">
            Most apps motivate with numbers that reset your anxiety every morning. We
            think you&apos;ll show up for something you actually care about — like a pet
            who&apos;s counting on you.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-ink/10 p-7 bg-cream/60">
            <p className="font-display font-bold text-ink/50 text-sm uppercase tracking-wide mb-4">
              😰 Other apps
            </p>
            <ul className="space-y-3 text-ink/60">
              {OTHER_APPS.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-coral-300 p-7 bg-coral-50 relative">
            <p className="font-display font-bold text-coral-600 text-sm uppercase tracking-wide mb-4">
              🐾 PawLingo
            </p>
            <ul className="space-y-3 text-ink/80">
              {PAWLINGO.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
