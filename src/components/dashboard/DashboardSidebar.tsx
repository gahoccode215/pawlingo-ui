import { DashboardIcon, type DashboardIconName } from "./DashboardIcon";
import { Button } from "@/components/ui/button";

type DashboardSidebarProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
};

const navigation: Array<{
  label: string;
  icon: DashboardIconName;
  section: string;
}> = [
  { label: "Tổng quan", icon: "home", section: "overview" },
  { label: "Lộ trình học", icon: "target", section: "roadmap" },
  { label: "Từ vựng", icon: "vocabulary", section: "vocabulary" },
  { label: "Luyện nghe", icon: "headphones", section: "listening" },
  { label: "Luyện nói", icon: "mic", section: "speaking" },
];

export function DashboardSidebar({
  open,
  onClose,
  activeSection,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Đóng menu"
        className={`fixed inset-0 z-20 bg-[#172031]/25 backdrop-blur-[2px] transition-opacity lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[252px] flex-col border-r border-[#e1e5eb] bg-[#fbfcfa] px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-11 items-center justify-between px-2">
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#295fc7]"
            onClick={() => onNavigate("overview")}
          >
            <span className="relative grid size-9 place-items-center rounded-[13px] bg-[#295fc7] text-white shadow-[0_8px_20px_-10px_rgba(41,95,199,0.75)]">
              <span className="absolute left-[8px] top-[8px] size-2.5 rounded-full bg-white" />
              <span className="absolute bottom-[8px] right-[8px] size-2.5 rounded-full bg-white/75" />
            </span>
            <span className="text-[21px] font-semibold tracking-[-0.05em] text-[#172033]">PawLingo</span>
          </button>
          <button type="button" aria-label="Đóng menu" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-[#647083] hover:bg-[#edf0f5] lg:hidden">
            <DashboardIcon name="close" />
          </button>
        </div>

        <nav aria-label="Điều hướng học tập" className="mt-9 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9098a6]">Không gian học</p>
          {navigation.map((item) => {
            const active = item.section === activeSection;
            return (
              <button
                type="button"
                key={item.section}
                onClick={() => {
                  onNavigate(item.section);
                  onClose();
                }}
                className={`group flex h-11 w-full items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium transition-[background-color,color,transform] active:scale-[0.98] ${active ? "bg-[#e8eefb] text-[#214f9f]" : "text-[#687385] hover:bg-[#f0f2f5] hover:text-[#263248]"}`}
              >
                <DashboardIcon name={item.icon} className="size-[18px]" />
                {item.label}
                {active ? <span className="ml-auto size-1.5 rounded-full bg-[#295fc7]" /> : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-7 border-t border-[#e5e8ed] pt-5">
          <button type="button" className="flex h-11 w-full items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#687385] hover:bg-[#f0f2f5] hover:text-[#263248]">
            <DashboardIcon name="message" /> Cộng đồng
          </button>
          <button type="button" className="flex h-11 w-full items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#687385] hover:bg-[#f0f2f5] hover:text-[#263248]">
            <DashboardIcon name="settings" /> Cài đặt
          </button>
        </div>

        <div className="mt-auto overflow-hidden rounded-[20px] bg-[#17294f] p-5 text-white shadow-[0_18px_35px_-24px_rgba(23,41,79,0.7)]">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-xl bg-white/10"><DashboardIcon name="spark" className="size-4" /></span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Pro</span>
          </div>
          <p className="mt-5 text-sm font-semibold">Học không giới hạn</p>
          <p className="mt-1.5 text-[11px] leading-5 text-white/60">Mở toàn bộ bài luyện nói và phản hồi phát âm.</p>
          <Button type="button" className="mt-4 h-9 w-full rounded-xl border-white bg-white text-[11px] font-semibold text-[#17294f] hover:bg-white/90">Khám phá PawLingo Pro</Button>
        </div>
      </aside>
    </>
  );
}
