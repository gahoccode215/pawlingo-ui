const SKILLS = [
  { icon: "👂", label: "Listening", level: "Lv.4", width: "70%", color: "bg-teal-400" },
  { icon: "🗣️", label: "Speaking", level: "Lv.2", width: "35%", color: "bg-coral-400" },
  { icon: "📖", label: "Reading", level: "Lv.5", width: "85%", color: "bg-honey-500" },
  { icon: "✍️", label: "Writing", level: "Lv.1", width: "18%", color: "bg-ink/40" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute -top-16 -right-24 w-80 h-80 bg-honey-300/50 blob blur-2xl" />
      <div className="absolute top-40 -left-24 w-72 h-72 bg-teal-300/40 blob blur-2xl" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-white/70 border border-ink/10 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink/70 shadow-sm">
            🐣 Week 1 build · Validation MVP
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mt-5">
            Learn English.
            <span className="block text-coral-600">Raise a Pet.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-md leading-relaxed">
            Your pet doesn&apos;t level up because you bought it a coin. It levels up
            because <span className="font-semibold text-ink">you actually practiced</span> —
            Listening, Speaking, Reading, Writing. Real progress, real growth.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#waitlist"
              className="bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold px-7 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all"
            >
              Join the Waitlist 🐾
            </a>
            <a
              href="#why"
              className="font-semibold text-ink/70 hover:text-ink px-2 py-3.5 transition-colors"
            >
              Why not just streaks? →
            </a>
          </div>
          <p className="mt-6 text-sm text-ink/50">
            No spam. Just paw-some updates when we launch.
          </p>
        </div>

        {/* Pet stat card mockup */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-card p-6 border border-ink/5 relative">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="font-display font-bold text-lg">Mochi</p>
                <p className="text-xs text-ink/50 font-medium">Stage 2 · Curious Pup</p>
              </div>
              <span className="bg-honey-100 text-honey-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                ⚡ 82%
              </span>
            </div>

            <div className="flex justify-center my-5">
              <div className="text-8xl animate-float select-none">🐶</div>
            </div>

            <div className="space-y-3">
              {SKILLS.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between text-xs font-semibold text-ink/60 mb-1">
                    <span>
                      {skill.icon} {skill.label}
                    </span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink/5 overflow-hidden">
                    <div
                      className={`bar-fill h-full rounded-full ${skill.color}`}
                      style={{ width: skill.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-cream rounded-xl px-3.5 py-2.5 text-xs text-ink/60 font-medium flex items-center gap-2">
              💬 &ldquo;10 more words and I evolve. No pressure... okay, a little
              pressure.&rdquo;
            </div>
          </div>
          <div className="hidden sm:block absolute -bottom-5 -left-5 bg-teal-500 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-pop rotate-[-6deg] animate-floatSlow">
            +12 XP earned today 🎉
          </div>
        </div>
      </div>
    </section>
  );
}
