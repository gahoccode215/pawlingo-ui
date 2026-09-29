export default function AdminLoading() {
  return (
    <div className="min-h-[100dvh] bg-[#f7f9f7] lg:pl-[272px]">
      <div className="h-[72px] border-b border-[#e2e7e3] bg-[#f7f9f7]" />
      <main className="mx-auto max-w-[1600px] animate-pulse px-4 py-9 sm:px-6 xl:px-9">
        <div className="h-4 w-40 rounded bg-[#e7ece8]" />
        <div className="mt-4 h-9 w-72 rounded bg-[#e1e7e2]" />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-[#e1e7e2] bg-[#e1e7e2] sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-40 bg-white" />)}
        </div>
        <div className="mt-5 h-[420px] rounded-[24px] border border-[#e1e7e2] bg-white" />
      </main>
    </div>
  );
}
