"use client";

import Image from "next/image";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApiResponse } from "@/types/api-response";
import { DashboardIcon, type DashboardIconName } from "./DashboardIcon";
import { DashboardSidebar } from "./DashboardSidebar";

type DashboardUser = {
  id: string;
  email: string;
  goal: string | null;
  authProvider: "LOCAL" | "GOOGLE";
  createdAt: string;
};

type ProfileState =
  | { status: "loading" }
  | { status: "success"; user: DashboardUser }
  | { status: "error" };

const DASHBOARD_LOGIN_URL = "/login?callbackUrl=%2Fdashboard";

type Lesson = {
  title: string;
  detail: string;
  duration: string;
  icon: DashboardIconName;
  tone: string;
};

const lessons: Lesson[] = [
  { title: "Chào hỏi tự nhiên", detail: "12 cụm từ trong hội thoại", duration: "8 phút", icon: "message", tone: "bg-[#e9effc] text-[#295fc7]" },
  { title: "Nghe: At the café", detail: "Hội thoại tốc độ chậm", duration: "6 phút", icon: "headphones", tone: "bg-[#edf3e8] text-[#587447]" },
  { title: "Phát âm /θ/ và /ð/", detail: "Luyện cùng phản hồi tức thì", duration: "5 phút", icon: "mic", tone: "bg-[#f4ece7] text-[#925c42]" },
];

const units = [
  { number: "01", title: "Gặp gỡ", detail: "Chào hỏi và giới thiệu", status: "active" },
  { number: "02", title: "Thói quen", detail: "Một ngày của bạn", status: "next" },
  { number: "03", title: "Quanh thành phố", detail: "Hỏi đường và di chuyển", status: "locked" },
  { number: "04", title: "Bữa ăn", detail: "Gọi món và trò chuyện", status: "locked" },
];

const week = [
  { day: "T2", done: true },
  { day: "T3", done: true },
  { day: "T4", done: true },
  { day: "T5", done: false },
  { day: "T6", done: false },
  { day: "T7", done: false },
  { day: "CN", done: false },
];

function displayName(email: string) {
  const localPart = email.split("@")[0] ?? "bạn";
  const firstPart = localPart.split(/[._-]/)[0] || "bạn";
  return firstPart.charAt(0).toLocaleUpperCase("vi") + firstPart.slice(1);
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Đang tải không gian học">
      <div className="h-[312px] animate-pulse rounded-[28px] bg-[#e9edf3]" />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <div className="h-[350px] animate-pulse rounded-[24px] bg-[#edf0f4]" />
        <div className="h-[350px] animate-pulse rounded-[24px] bg-[#edf0f4]" />
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileRetry, setProfileRetry] = useState(0);
  const [profileState, setProfileState] = useState<ProfileState>({ status: "loading" });
  const email = profileState.status === "success" ? profileState.user.email : null;
  const name = email ? displayName(email) : "Bạn";

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      setProfileState({ status: "loading" });

      try {
        // Gọi session trước để Auth.js refresh access token khi cần và cập nhật cookie.
        const session = await getSession();
        if (cancelled) return;

        if (!session) {
          router.replace(DASHBOARD_LOGIN_URL);
          return;
        }

        if (session.error === "RefreshTemporaryError") {
          setProfileState({ status: "error" });
          return;
        }

        if (session.error === "RefreshTokenError" || !session.accessToken) {
          router.replace(`${DASHBOARD_LOGIN_URL}&reason=session_expired`);
          return;
        }

        const response = await fetch("/api/profile", { cache: "no-store" });
        if (cancelled) return;

        if (response.status === 401) {
          router.replace(`${DASHBOARD_LOGIN_URL}&reason=session_expired`);
          return;
        }

        if (!response.ok) {
          throw new Error("Profile request failed");
        }

        const result: ApiResponse<DashboardUser> = await response.json();
        if (!result.success || !result.data) {
          throw new Error("Profile response is invalid");
        }

        if (!cancelled) setProfileState({ status: "success", user: result.data });
      } catch {
        if (!cancelled) setProfileState({ status: "error" });
      }
    }

    void loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, [profileRetry, router]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    if (!query) return [];
    return lessons.filter((lesson) => `${lesson.title} ${lesson.detail}`.toLocaleLowerCase("vi").includes(query));
  }, [search]);

  function navigate(section: string) {
    setActiveSection(section);
    if (section !== "overview") {
      document.getElementById(section === "roadmap" ? "roadmap" : "practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function startLesson() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  }

  return (
    <div className="min-h-[100dvh] bg-[#f6f7f4] text-[#172033]">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeSection={activeSection} onNavigate={navigate} />

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-10 border-b border-[#e1e5eb]/90 bg-[#f6f7f4]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[70px] max-w-[1560px] items-center gap-3 px-4 sm:px-6 xl:px-8">
            <Button type="button" variant="outline" aria-label="Mở menu" onClick={() => setSidebarOpen(true)} className="grid size-10 h-10 place-items-center rounded-xl border-[#dde2e9] bg-white p-0 text-[#526075] active:scale-[0.98] lg:hidden"><DashboardIcon name="menu" /></Button>
            <div className="relative w-full max-w-[460px] lg:ml-1">
              <DashboardIcon name="search" className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#8993a2]" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Tìm bài học" placeholder="Tìm bài học, chủ đề, kỹ năng..." className="h-11 rounded-[14px] border-[#dde2e9] bg-white/85 pl-10 pr-4 text-[13px] placeholder:text-[#9ca4b1] focus:border-[#8ca9e1] focus:ring-4 focus:ring-[#dfe8fa]" />
              {search ? (
                <div className="absolute left-0 right-0 top-[51px] overflow-hidden rounded-[16px] border border-[#dde2e9] bg-white p-2 shadow-[0_22px_55px_-32px_rgba(30,49,82,0.5)]">
                  {searchResults.length ? searchResults.map((lesson) => (
                    <button type="button" key={lesson.title} onClick={() => { setSearch(""); document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" }); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-[#f4f6f8]">
                      <DashboardIcon name={lesson.icon} className="size-4 text-[#295fc7]" /><span><span className="block text-xs font-semibold">{lesson.title}</span><span className="mt-0.5 block text-[10px] text-[#818b9a]">{lesson.duration}</span></span>
                    </button>
                  )) : <div className="px-4 py-7 text-center"><p className="text-xs font-semibold">Chưa tìm thấy bài phù hợp</p><p className="mt-1 text-[11px] text-[#87909d]">Thử tìm “nghe” hoặc “phát âm”.</p></div>}
                </div>
              ) : null}
            </div>

            <div className="ml-auto hidden items-center gap-6 md:flex">
              <div className="flex items-center gap-2 text-[12px]"><span className="grid size-8 place-items-center rounded-xl bg-[#fff0e6] text-[#b45b2f]"><DashboardIcon name="flame" className="size-4" /></span><span><strong className="block font-semibold tabular-nums">3 ngày</strong><span className="text-[10px] text-[#8a93a1]">Chuỗi học</span></span></div>
              <div className="h-7 w-px bg-[#dfe3e9]" />
              <div className="flex items-center gap-2 text-[12px]"><span className="grid size-8 place-items-center rounded-xl bg-[#e9effc] text-[#295fc7]"><DashboardIcon name="trophy" className="size-4" /></span><span><strong className="block font-semibold tabular-nums">740</strong><span className="text-[10px] text-[#8a93a1]">Điểm XP</span></span></div>
            </div>

            <div className="relative">
              <button type="button" aria-label="Thông báo" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((value) => !value); setProfileOpen(false); }} className="relative grid size-10 place-items-center rounded-xl text-[#526075] hover:bg-white active:scale-[0.98]"><DashboardIcon name="bell" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#295fc7] ring-2 ring-[#f6f7f4]" /></button>
              {notificationsOpen ? <div className="absolute right-0 top-12 w-[min(330px,calc(100vw-32px))] rounded-[18px] border border-[#dde2e9] bg-white p-2 shadow-[0_24px_60px_-32px_rgba(24,39,68,0.5)]"><p className="px-3 py-2 text-xs font-semibold">Nhắc học hôm nay</p><div className="rounded-xl bg-[#f3f6fc] px-3 py-3"><p className="text-xs font-medium">Bạn còn 8 phút để đạt mục tiêu ngày.</p><p className="mt-1 text-[10px] leading-4 text-[#778396]">Hoàn thành bài “Chào hỏi tự nhiên” để duy trì chuỗi học.</p></div></div> : null}
            </div>
            <div className="relative">
              <button type="button" aria-label="Mở tài khoản" aria-expanded={profileOpen} onClick={() => { setProfileOpen((value) => !value); setNotificationsOpen(false); }} className="flex items-center gap-2 rounded-[13px] p-1.5 pr-2 text-left hover:bg-white active:scale-[0.98]">
                <span className={`grid size-8 place-items-center rounded-[11px] text-[11px] font-semibold text-white ${profileState.status === "error" ? "bg-[#a84f42]" : "bg-[#17294f]"}`}>
                  {profileState.status === "loading" ? <span className="size-3.5 animate-pulse rounded-full bg-white/70" /> : name.slice(0, 2).toLocaleUpperCase("vi")}
                </span>
                <span className="hidden min-w-0 sm:block">
                  <span className="block max-w-40 truncate text-[11px] font-semibold">
                    {profileState.status === "loading" ? "Đang tải tài khoản..." : profileState.status === "error" ? "Không tải được tài khoản" : name}
                  </span>
                  {email ? <span className="block max-w-40 truncate text-[9px] font-medium text-[#7d8796]">{email}</span> : null}
                </span>
                <DashboardIcon name="chevron" className="hidden size-3.5 rotate-90 text-[#7c8796] sm:block" />
              </button>
              {profileOpen ? (
                <div className="absolute right-0 top-14 w-64 rounded-[16px] border border-[#dde2e9] bg-white p-2 shadow-[0_24px_60px_-32px_rgba(24,39,68,0.5)]">
                  {profileState.status === "success" ? (
                    <div className="border-b border-[#edf0f3] px-3 py-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-[#4e7656]">
                        <span className="size-1.5 rounded-full bg-[#5d9468]" /> Đã xác thực
                      </div>
                      <p className="mt-2 truncate text-xs font-semibold">{name}</p>
                      <p className="mt-1 truncate text-[10px] text-[#7d8796]">{profileState.user.email}</p>
                      <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#9aa2ae]">
                        {profileState.user.authProvider === "GOOGLE" ? "Tài khoản Google" : "Tài khoản email"}
                      </p>
                    </div>
                  ) : profileState.status === "loading" ? (
                    <div className="px-3 py-4" role="status">
                      <div className="h-3 w-24 animate-pulse rounded-full bg-[#e8ebef]" />
                      <div className="mt-3 h-2.5 w-44 animate-pulse rounded-full bg-[#eef0f3]" />
                    </div>
                  ) : (
                    <div className="px-3 py-3" role="alert">
                      <p className="text-xs font-semibold text-[#87483e]">Không thể tải thông tin tài khoản.</p>
                      <button type="button" onClick={() => setProfileRetry((value) => value + 1)} className="mt-2 text-[11px] font-semibold text-[#295fc7] hover:underline">
                        Thử lại
                      </button>
                    </div>
                  )}
                  <button type="button" onClick={() => router.push("/")} className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#7e4235] hover:bg-[#f8efec]">Về trang chủ</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1560px] px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
          {loading ? <DashboardSkeleton /> : (
            <div className="space-y-6 animate-[dashboard-fade_450ms_ease-out_both]">
              <section className="grid overflow-hidden rounded-[28px] bg-[#17294f] text-white shadow-[0_24px_55px_-38px_rgba(23,41,79,0.75)] xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
                <div className="relative flex min-h-[310px] flex-col justify-between p-7 sm:p-9 xl:p-10">
                  <div className="absolute right-8 top-6 size-28 rounded-full border border-white/5" />
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#aebfe5]"><span className="h-px w-6 bg-[#7594d7]" /> Bài học tiếp theo</div>
                    <h1 className="mt-5 max-w-[600px] text-[31px] font-semibold leading-[1.06] tracking-[-0.05em] sm:text-[39px]">Chào buổi sáng, {name}.<br /><span className="text-[#aebfe5]">Hôm nay mình nói tự nhiên hơn.</span></h1>
                    <p className="mt-4 max-w-[50ch] text-[13px] leading-6 text-white/60">Tiếp tục Unit 1 với những cách chào hỏi người bản xứ dùng trong cuộc trò chuyện hằng ngày.</p>
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button type="button" onClick={startLesson} className="flex h-11 items-center gap-2 rounded-[13px] border-white bg-white px-5 text-[12px] font-semibold text-[#17294f] transition-transform hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"><DashboardIcon name="play" className="size-4" /> Học tiếp</Button>
                    <div className="flex items-center gap-2 text-[11px] text-white/55"><DashboardIcon name="clock" className="size-4" /> 8 phút · Trình độ A1</div>
                  </div>
                </div>
                <div className="relative min-h-[250px] overflow-hidden border-t border-white/10 xl:min-h-[310px] xl:border-l xl:border-t-0">
                  <Image src="/images/pawlingo-study.png" alt="Bàn học tiếng Anh với sổ tay và tai nghe" fill priority sizes="(min-width: 1280px) 42vw, 100vw" className="object-cover object-[52%_54%] opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,#17294f_0%,rgba(23,41,79,0.12)_45%,rgba(23,41,79,0.02)_100%)]" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[18px] border border-white/15 bg-[#17294f]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:left-auto sm:w-[250px]">
                    <div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.14em] text-white/50">Tiến độ bài</span><span className="text-xs font-semibold tabular-nums">64%</span></div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[64%] origin-left animate-[dashboard-progress_900ms_cubic-bezier(0.16,1,0.3,1)_both] rounded-full bg-white" /></div>
                  </div>
                </div>
              </section>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.55fr)]">
                <section id="roadmap" className="rounded-[24px] border border-[#e0e5eb] bg-white p-5 scroll-mt-24 sm:p-7">
                  <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#7e8998]">Lộ trình của bạn</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em]">English Foundations</h2></div><button type="button" className="hidden items-center gap-1.5 text-[11px] font-semibold text-[#295fc7] sm:flex">Xem lộ trình <DashboardIcon name="arrow" className="size-4" /></button></div>
                  <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-[#e4e8ed] bg-[#e4e8ed] sm:grid-cols-2">
                    {units.map((unit, index) => (
                      <button type="button" key={unit.number} disabled={unit.status === "locked"} style={{ animationDelay: `${index * 80}ms` }} className={`group relative flex min-h-[112px] items-start gap-4 bg-white p-5 text-left opacity-0 animate-[dashboard-rise_500ms_cubic-bezier(0.16,1,0.3,1)_forwards] transition-colors ${unit.status === "active" ? "bg-[#f1f5fd]" : "hover:bg-[#f8f9fa] disabled:hover:bg-white"}`}>
                        <span className={`grid size-10 shrink-0 place-items-center rounded-[13px] text-[11px] font-semibold tabular-nums ${unit.status === "active" ? "bg-[#295fc7] text-white" : "bg-[#f0f2f5] text-[#7b8696]"}`}>{unit.status === "locked" ? <DashboardIcon name="lock" className="size-3.5" /> : unit.number}</span>
                        <span><span className="block text-[13px] font-semibold">{unit.title}</span><span className="mt-1 block text-[11px] leading-5 text-[#7f8998]">{unit.detail}</span>{unit.status === "active" ? <span className="mt-2 block text-[10px] font-semibold text-[#295fc7]">3/5 bài hoàn thành</span> : null}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-[24px] border border-[#e0e5eb] bg-white p-5 sm:p-7">
                  <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#7e8998]">Nhịp học tuần này</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em]">3 ngày liên tiếp</h2></div><span className="grid size-11 place-items-center rounded-[15px] bg-[#fff0e6] text-[#b45b2f]"><DashboardIcon name="flame" className="size-5 animate-[dashboard-breathe_2.6s_ease-in-out_infinite]" /></span></div>
                  <div className="mt-7 grid grid-cols-7 gap-2">{week.map((item) => <div key={item.day} className="text-center"><span className={`mx-auto grid size-7 place-items-center rounded-full border text-[10px] ${item.done ? "border-[#295fc7] bg-[#295fc7] text-white" : "border-[#dfe3e9] bg-[#f7f8f9] text-[#929ba8]"}`}>{item.done ? <DashboardIcon name="check" className="size-3.5" /> : null}</span><span className="mt-2 block text-[9px] font-medium text-[#8a94a2]">{item.day}</span></div>)}</div>
                  <div className="mt-7 border-t border-[#e9ecf0] pt-5"><div className="flex justify-between text-[11px]"><span className="text-[#7e8998]">Mục tiêu tuần</span><strong className="font-semibold tabular-nums">3/5 ngày</strong></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf0f3]"><div className="h-full w-3/5 rounded-full bg-[#295fc7]" /></div><p className="mt-3 text-[10px] leading-5 text-[#8a93a1]">Học thêm 2 ngày để hoàn thành mục tiêu tuần.</p></div>
                </section>
              </div>

              <section id="practice" className="scroll-mt-24 border-t border-[#dde2e8] pt-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#7e8998]">Luyện tập nhanh</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.035em]">Chọn một kỹ năng để bắt đầu</h2></div><p className="max-w-[42ch] text-[11px] leading-5 text-[#7e8998]">Mỗi bài được thiết kế ngắn để bạn có thể duy trì thói quen mỗi ngày.</p></div>
                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {lessons.map((lesson) => {
                    const isDone = completed.includes(lesson.title);
                    return (
                      <article key={lesson.title} className="group flex items-center gap-4 rounded-[18px] border border-[#e0e5eb] bg-white p-4 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#c8d5ed] hover:shadow-[0_16px_35px_-28px_rgba(27,50,92,0.55)]">
                        <span className={`grid size-11 shrink-0 place-items-center rounded-[14px] ${lesson.tone}`}><DashboardIcon name={isDone ? "check" : lesson.icon} className="size-[19px]" /></span>
                        <div className="min-w-0 flex-1"><h3 className="truncate text-[13px] font-semibold">{lesson.title}</h3><p className="mt-1 truncate text-[10px] text-[#7e8998]">{isDone ? "Đã hoàn thành hôm nay" : lesson.detail}</p></div>
                        <button type="button" aria-label={isDone ? `Làm lại ${lesson.title}` : `Bắt đầu ${lesson.title}`} onClick={() => setCompleted((current) => current.includes(lesson.title) ? current.filter((title) => title !== lesson.title) : [...current, lesson.title])} className="grid size-9 shrink-0 place-items-center rounded-xl border border-[#dce2ea] text-[#295fc7] transition-[background-color,transform] hover:bg-[#edf3fd] active:scale-[0.96]"><DashboardIcon name={isDone ? "check" : "arrow"} className="size-4" /></button>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @keyframes dashboard-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dashboard-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dashboard-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes dashboard-breathe { 0%, 100% { transform: scale(1); opacity: .82; } 50% { transform: scale(1.08); opacity: 1; } }
      `}</style>
    </div>
  );
}
