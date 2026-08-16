"use client";

export default function WaitlistCta() {
  return (
    <section id="waitlist" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-coral-500 to-honey-500" />
      <div className="absolute -bottom-10 -left-10 text-[10rem] opacity-15 select-none rotate-[-12deg]">
        🐾
      </div>
      <div className="absolute -top-10 -right-6 text-[9rem] opacity-15 select-none rotate-12">
        🐾
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center text-white">
        <div className="text-6xl animate-wiggle inline-block mb-4">🐶</div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl">
          Your future pet is waiting to meet you.
        </h2>
        <p className="mt-4 text-white/90 text-lg">
          Join the waitlist and be first to raise it — one real lesson at a time.
        </p>

        <form
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full px-5 py-3.5 text-ink placeholder:text-ink/40 font-medium focus:outline-none focus:ring-4 focus:ring-white/40"
          />
          <button
            type="submit"
            className="bg-ink hover:bg-ink/90 text-white font-display font-semibold px-6 py-3.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
          >
            Join Waitlist 🐾
          </button>
        </form>
        <p className="mt-4 text-xs text-white/75">
          Prototype only — this form doesn&apos;t submit anywhere yet. No spam, ever.
        </p>
      </div>
    </section>
  );
}
