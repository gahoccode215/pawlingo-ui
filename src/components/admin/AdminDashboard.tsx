"use client";

import { useMemo, useState } from "react";
import { AdminIcon } from "./AdminIcon";
import { AdminSidebar } from "./AdminSidebar";
import { activities, chartData, metrics, recentLearners } from "./admin-data";

type DashboardView = "overview" | "analytics" | "reports";
type DataMode = "ready" | "loading" | "empty" | "error";

const periods = ["7 ngày", "30 ngày", "90 ngày"];

function OverviewChart() {
  const points = chartData.map((item, index) => {
    const x = 18 + index * 46.4;
    const y = 172 - item.value * 1.38;
    return `${x},${y}`;
  });
  const line = points.join(" ");
  const area = `${points[0]} ${line} ${points.at(-1)?.split(",")[0]},184 18,184`;

  return (
    <div className="mt-6 min-h-[245px] w-full" aria-label="Biểu đồ số phiên học trong 30 ngày">
      <svg viewBox="0 0 510 220" role="img" className="h-auto w-full overflow-visible">
        <title>Số phiên học tăng dần trong 30 ngày gần nhất</title>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6f927d" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#6f927d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[46, 92, 138, 184].map((y) => (
          <line key={y} x1="18" x2="482" y1={y} y2={y} stroke="#e7ece8" strokeWidth="1" strokeDasharray="3 6" />
        ))}
        <polygon points={area} fill="url(#chartFill)" className="animate-[admin-fade_700ms_ease-out_both]" />
        <polyline points={line} fill="none" stroke="#315f49" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="animate-[admin-draw_1s_cubic-bezier(0.16,1,0.3,1)_both]" />
        {chartData.map((item, index) => {
          const [cx, cy] = points[index].split(",");
          return <circle key={item.day} cx={cx} cy={cy} r="3.8" fill="#fbfcfb" stroke="#315f49" strokeWidth="2.3" />;
        })}
        {chartData.filter((_, index) => index % 2 === 0).map((item, index) => (
          <text key={item.day} x={18 + index * 92.8} y="211" fill="#8b958e" fontSize="10" textAnchor="middle">{item.day}/09</text>
        ))}
      </svg>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-label="Đang tải dữ liệu" aria-busy="true">
      <div className="grid gap-px overflow-hidden rounded-[22px] border border-[#e1e7e2] bg-[#e1e7e2] sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white p-6">
            <div className="h-3 w-28 animate-pulse rounded bg-[#edf1ee]" />
            <div className="mt-7 h-8 w-24 animate-pulse rounded bg-[#e8ede9]" />
            <div className="mt-3 h-3 w-36 animate-pulse rounded bg-[#f0f3f1]" />
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
        <div className="h-[430px] animate-pulse rounded-[24px] border border-[#e1e7e2] bg-white" />
        <div className="h-[430px] animate-pulse rounded-[24px] border border-[#e1e7e2] bg-white" />
      </div>
    </div>
  );
}

function DataMessage({ mode, onRetry }: { mode: "empty" | "error"; onRetry: () => void }) {
  const error = mode === "error";
  return (
    <div className="grid min-h-[470px] place-items-center rounded-[24px] border border-[#e1e7e2] bg-white px-6 text-center">
      <div className="max-w-sm">
        <span className={`mx-auto grid size-12 place-items-center rounded-2xl ${error ? "bg-[#f4e8e4] text-[#875542]" : "bg-[#e8efe9] text-[#315f49]"}`}>
          <AdminIcon name={error ? "activity" : "search"} className="size-5" />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#142019]">{error ? "Chưa thể tải dữ liệu" : "Chưa có kết quả phù hợp"}</h2>
        <p className="mt-2 text-sm leading-6 text-[#758078]">{error ? "Kết nối analytics đang gián đoạn. Hãy thử tải lại dữ liệu." : "Thử thay đổi khoảng thời gian hoặc xoá từ khóa tìm kiếm."}</p>
        <button type="button" onClick={onRetry} className="mt-5 rounded-xl bg-[#183b2c] px-4 py-2.5 text-sm font-medium text-white transition-transform active:scale-[0.98]">
          {error ? "Thử lại" : "Xem tất cả dữ liệu"}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<DashboardView>("overview");
  const [period, setPeriod] = useState("30 ngày");
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mode, setMode] = useState<DataMode>("ready");

  const learners = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    if (!query) return recentLearners;
    return recentLearners.filter((learner) => `${learner.name} ${learner.email} ${learner.lesson}`.toLocaleLowerCase("vi").includes(query));
  }, [search]);

  function showReady() {
    setSearch("");
    setMode("loading");
    window.setTimeout(() => setMode("ready"), 650);
  }

  function exportCsv() {
    const rows = [
      ["Chỉ số", "Giá trị", "Thay đổi"],
      ...metrics.map((metric) => [metric.label, metric.value, metric.delta]),
    ];
    const content = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pawlingo-dashboard.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-[100dvh] bg-[#f7f9f7] text-[#142019]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-10 border-b border-[#e2e7e3]/90 bg-[#f7f9f7]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-3 px-4 sm:px-6 xl:px-9">
            <button type="button" aria-label="Mở menu" className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#dde4df] bg-white text-[#4f5e55] active:scale-[0.98] lg:hidden" onClick={() => setSidebarOpen(true)}>
              <AdminIcon name="menu" />
            </button>
            <div className="relative max-w-[420px] flex-1 lg:ml-auto">
              <AdminIcon name="search" className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#8c9690]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Tìm kiếm học viên hoặc bài học"
                placeholder="Tìm học viên, bài học..."
                className="h-11 w-full rounded-[13px] border border-[#dce4de] bg-white pl-10 pr-14 text-[13px] outline-none transition-shadow placeholder:text-[#9aa39d] focus:border-[#769080] focus:ring-4 focus:ring-[#dfe9e2]"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-[#e0e6e1] bg-[#f7f9f7] px-1.5 py-0.5 text-[10px] text-[#839087] sm:block">⌘ K</kbd>
            </div>
            <button type="button" aria-label="Thông báo" aria-expanded={notificationsOpen} className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-transparent text-[#4d5a52] transition-colors hover:border-[#dce4de] hover:bg-white active:scale-[0.98]" onClick={() => setNotificationsOpen((current) => !current)}>
              <AdminIcon name="notification" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#a56345] ring-2 ring-[#f7f9f7]" />
            </button>
            <button type="button" aria-label="Tài khoản quản trị" className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-[#183b2c] text-xs font-semibold text-white active:scale-[0.98]">TA</button>
          </div>
          {notificationsOpen ? (
            <div className="absolute right-4 top-[64px] w-[min(360px,calc(100vw-32px))] rounded-[18px] border border-[#dce4de] bg-white p-2 shadow-[0_24px_60px_-30px_rgba(20,50,36,0.45)] sm:right-6 xl:right-9">
              <div className="flex items-center justify-between px-3 py-2"><p className="text-sm font-semibold">Thông báo</p><span className="text-[11px] text-[#77837b]">3 mới</span></div>
              {["8 phản hồi học viên đang chờ xem", "Bộ từ vựng Travel đã được cập nhật", "Báo cáo tuần đã sẵn sàng"].map((item, index) => (
                <button type="button" key={item} className="flex w-full gap-3 rounded-xl px-3 py-3 text-left hover:bg-[#f3f6f3]">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${index === 0 ? "bg-[#a56345]" : "bg-[#89a294]"}`} />
                  <span className="text-[13px] leading-5 text-[#455149]">{item}</span>
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 xl:px-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77857c]">Thứ tư, 23 tháng 9</p>
              <h1 className="text-[30px] font-semibold tracking-[-0.045em] sm:text-[36px]">Chào buổi sáng, Tuấn Anh</h1>
              <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[#6c776f]">Đây là nhịp học tập của cộng đồng PawLingo hôm nay.</p>
            </div>
            <button type="button" onClick={exportCsv} className="inline-flex h-11 w-fit items-center gap-2 rounded-[13px] bg-[#183b2c] px-4 text-[13px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
              <AdminIcon name="download" className="size-4" /> Xuất báo cáo
            </button>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-b border-[#dce3de] sm:flex-row sm:items-center">
            <div className="flex gap-6 overflow-x-auto">
              {(["overview", "analytics", "reports"] as DashboardView[]).map((item) => (
                <button type="button" key={item} onClick={() => setView(item)} className={`relative pb-3 text-[13px] font-medium transition-colors ${view === item ? "text-[#183b2c]" : "text-[#89938c] hover:text-[#4f5c54]"}`}>
                  {{ overview: "Tổng quan", analytics: "Phân tích", reports: "Báo cáo" }[item]}
                  {view === item ? <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-[#315f49]" /> : null}
                </button>
              ))}
            </div>
            <div className="mb-3 flex items-center gap-1 rounded-xl border border-[#dce4de] bg-white p-1">
              {periods.map((item) => <button type="button" key={item} onClick={() => setPeriod(item)} className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${period === item ? "bg-[#e7eee9] text-[#244a37]" : "text-[#7e8981] hover:text-[#334139]"}`}>{item}</button>)}
            </div>
          </div>

          <div className="mt-6">
            {mode === "loading" ? <DashboardSkeleton /> : null}
            {mode === "empty" || mode === "error" ? <DataMessage mode={mode} onRetry={showReady} /> : null}
            {mode === "ready" ? (
              <div className="space-y-5 animate-[admin-fade_500ms_ease-out_both]">
                <section aria-label="Các chỉ số chính" className="grid gap-px overflow-hidden rounded-[22px] border border-[#e1e7e2] bg-[#e1e7e2] sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric, index) => (
                    <article key={metric.label} style={{ animationDelay: `${index * 70}ms` }} className="group bg-white p-5 opacity-0 animate-[admin-rise_500ms_cubic-bezier(0.16,1,0.3,1)_forwards] sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[12px] font-medium text-[#647068]">{metric.label}</p>
                        <span className="grid size-8 place-items-center rounded-xl bg-[#f1f4f2] text-[#6f7e75] transition-transform duration-300 group-hover:-translate-y-0.5"><AdminIcon name={metric.icon} className="size-4" /></span>
                      </div>
                      <p className="mt-5 text-[28px] font-semibold tracking-[-0.05em] tabular-nums text-[#142019]">{metric.value}</p>
                      <p className="mt-1.5 text-[11px] text-[#8a948e]"><span className="font-semibold text-[#467158]">{metric.delta}</span> {metric.note}</p>
                    </article>
                  ))}
                </section>

                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
                  <section className="rounded-[24px] border border-[#e1e7e2] bg-white p-5 sm:p-7">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div><p className="text-base font-semibold tracking-[-0.025em]">Nhịp học tập</p><p className="mt-1 text-[12px] text-[#7d8881]">Số phiên học mỗi ngày trong {period.toLocaleLowerCase("vi")}</p></div>
                      <div className="flex items-center gap-2 text-[11px] text-[#748078]"><span className="size-2 rounded-full bg-[#315f49]" /> Phiên hoàn tất</div>
                    </div>
                    <OverviewChart />
                    <div className="mt-1 grid grid-cols-2 gap-4 border-t border-[#edf0ee] pt-5 sm:grid-cols-3">
                      <div><p className="text-[10px] uppercase tracking-[0.14em] text-[#909a93]">Trung bình/ngày</p><p className="mt-1 text-lg font-semibold tabular-nums">164.3</p></div>
                      <div><p className="text-[10px] uppercase tracking-[0.14em] text-[#909a93]">Tỷ lệ hoàn tất</p><p className="mt-1 text-lg font-semibold tabular-nums">74.6%</p></div>
                      <div className="hidden sm:block"><p className="text-[10px] uppercase tracking-[0.14em] text-[#909a93]">Cao nhất</p><p className="mt-1 text-lg font-semibold tabular-nums">218</p></div>
                    </div>
                  </section>

                  <section className="rounded-[24px] border border-[#e1e7e2] bg-white p-5 sm:p-7">
                    <div className="flex items-start justify-between"><div><p className="text-base font-semibold tracking-[-0.025em]">Hoạt động học</p><p className="mt-1 text-[12px] text-[#7d8881]">Phân bổ trong tháng này</p></div><AdminIcon name="chart" className="size-5 text-[#839087]" /></div>
                    <div className="mt-8 space-y-6">
                      {activities.map((activity) => (
                        <div key={activity.label}>
                          <div className="mb-2 flex items-center justify-between gap-4"><p className="text-[12px] font-medium text-[#4f5c54]">{activity.label}</p><p className="text-[12px] font-semibold tabular-nums">{activity.value}</p></div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-[#edf1ee]"><div className={`h-full origin-left rounded-full ${activity.color} animate-[admin-scale-x_700ms_cubic-bezier(0.16,1,0.3,1)_both]`} style={{ width: `${activity.percent}%` }} /></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 rounded-[17px] bg-[#edf3ee] p-4">
                      <div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-[#315f49]"><AdminIcon name="spark" className="size-4" /></span><div><p className="text-[12px] font-semibold">Tín hiệu tích cực</p><p className="mt-1 text-[11px] leading-5 text-[#6f7c73]">Số lượt ôn tập tăng 21.7% vào khung giờ 20:00–22:00.</p></div></div>
                    </div>
                  </section>
                </div>

                <section className="overflow-hidden rounded-[24px] border border-[#e1e7e2] bg-white">
                  <div className="flex flex-col justify-between gap-3 border-b border-[#e8ece9] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                    <div><p className="text-base font-semibold tracking-[-0.025em]">Học viên gần đây</p><p className="mt-1 text-[12px] text-[#7d8881]">Những phiên học vừa được hoàn tất</p></div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setMode("empty")} className="rounded-lg px-3 py-2 text-[11px] font-medium text-[#768179] hover:bg-[#f3f6f4]">Xem trạng thái trống</button>
                      <button type="button" onClick={() => setMode("error")} className="rounded-lg px-3 py-2 text-[11px] font-medium text-[#8a5a48] hover:bg-[#f7f0ed]">Mô phỏng lỗi</button>
                    </div>
                  </div>
                  {learners.length ? (
                    <div className="divide-y divide-[#edf0ee]">
                      {learners.map((learner) => (
                        <div key={learner.email} className="grid gap-3 px-5 py-4 transition-colors hover:bg-[#fafbfa] sm:grid-cols-[minmax(220px,1.2fr)_minmax(160px,0.8fr)_auto] sm:items-center sm:px-7">
                          <div className="flex min-w-0 items-center gap-3"><span className={`grid size-9 shrink-0 place-items-center rounded-[12px] text-[10px] font-semibold ${learner.tone}`}>{learner.initials}</span><div className="min-w-0"><p className="truncate text-[13px] font-semibold">{learner.name}</p><p className="truncate text-[11px] text-[#8a948e]">{learner.email}</p></div></div>
                          <div><p className="text-[12px] font-medium text-[#4c5951]">{learner.lesson}</p><p className="mt-0.5 text-[10px] text-[#95a098]">Bài học vừa hoàn tất</p></div>
                          <p className="text-[11px] tabular-nums text-[#7c8880] sm:text-right">{learner.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-14 text-center"><AdminIcon name="search" className="mx-auto size-5 text-[#8d9891]" /><p className="mt-3 text-sm font-medium">Không tìm thấy học viên</p><button type="button" onClick={() => setSearch("")} className="mt-2 text-xs font-medium text-[#467158] hover:underline">Xoá tìm kiếm</button></div>
                  )}
                </section>
              </div>
            ) : null}
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes admin-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes admin-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes admin-draw { from { stroke-dasharray: 1; stroke-dashoffset: 1; } to { stroke-dasharray: 1; stroke-dashoffset: 0; } }
        @keyframes admin-scale-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}
