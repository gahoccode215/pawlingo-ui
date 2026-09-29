export default function DashboardLoading() {
  return (
    <div className="min-h-[100dvh] bg-[#f6f7f4] lg:pl-[252px]">
      <div className="h-[70px] border-b border-[#e1e5eb] bg-[#f6f7f4]" />
      <main className="mx-auto max-w-[1560px] animate-pulse px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
        <div className="h-[312px] rounded-[28px] bg-[#e7ebf0]" />
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.55fr)]">
          <div className="h-[340px] rounded-[24px] bg-[#e9edf1]" />
          <div className="h-[340px] rounded-[24px] bg-[#e9edf1]" />
        </div>
      </main>
    </div>
  );
}
