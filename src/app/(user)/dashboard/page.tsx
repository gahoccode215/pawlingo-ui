import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | PawLingo",
  description: "Your PawLingo learning space.",
};

export default function DashboardPage() {
  return (
    <section aria-labelledby="dashboard-title" className="max-w-3xl">
      <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-accent" />
      <h1
        id="dashboard-title"
        className="mt-6 text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-balance"
      >
        Your learning space
      </h1>
      <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-muted-foreground text-pretty sm:text-base">
        This dashboard will bring your lessons, vocabulary, and learning progress
        together as PawLingo grows.
      </p>
    </section>
  );
}
