export default function HeroSection() {
  return (
    <section id="top" className="bg-canvas">
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1240px] items-center gap-12 px-5 py-10 sm:px-8 md:grid-cols-[0.92fr_1.08fr] md:py-14 lg:gap-20">
        <div className="max-w-[590px]">
          <h1 className="text-[clamp(3.25rem,6.4vw,5.8rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            Học từ vựng có lộ trình.
          </h1>
          <p className="mt-6 max-w-[500px] text-[18px] leading-7 tracking-[-0.2px] text-muted">
            Biết nên học gì, ôn khi nào và tiến bộ theo từng buổi học.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#hoc-thu" className="button button-primary whitespace-nowrap">
              Học thử
            </a>
            <a href="#cach-hoc" className="button button-ghost whitespace-nowrap">
              Xem cách học
            </a>
          </div>
        </div>

        <div className="rounded-[16px] border border-line bg-surface p-4 sm:p-6">
          <div className="flex items-start justify-between gap-6 border-b border-line pb-5">
            <div>
              <p className="text-[14px] text-muted">Buổi học hôm nay</p>
              <h2 className="mt-1 text-[25px] font-semibold tracking-[-0.6px]">Tiếp tục lộ trình B1</h2>
            </div>
            <p className="shrink-0 text-[14px] font-medium text-cobalt">Đang học</p>
          </div>

          <div className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-[13px] font-medium text-muted">TỪ TIẾP THEO</p>
              <p className="mt-3 text-[44px] font-semibold leading-none tracking-[-1.8px]">reliable</p>
              <p className="mt-3 text-[16px] text-muted">/rɪˈlaɪəbəl/ / tính từ</p>
            </div>
            <a href="#hoc-thu" className="button button-dark w-full whitespace-nowrap sm:w-auto">
              Học từ này
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-3">
            <div className="bg-canvas p-4">
              <p className="text-[13px] text-muted">Đã học</p>
              <p className="mt-1 font-medium">Có thể xem lại</p>
            </div>
            <div className="bg-canvas p-4">
              <p className="text-[13px] text-muted">Cần ôn</p>
              <p className="mt-1 font-medium">Được ưu tiên</p>
            </div>
            <div className="col-span-2 bg-canvas p-4 sm:col-span-1">
              <p className="text-[13px] text-muted">Tiếp theo</p>
              <p className="mt-1 font-medium">Theo lộ trình</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
