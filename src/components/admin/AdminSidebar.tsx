import { AdminIcon } from "./AdminIcon";
import { navigation } from "./admin-data";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Đóng thanh điều hướng"
        className={`fixed inset-0 bg-[#101b16]/35 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-[272px] flex-col border-r border-[#e2e7e3] bg-[#f7f9f7] px-4 py-5 transition-transform duration-300 ease-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <a href="/admin" className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#315f49] focus-visible:ring-offset-4">
            <span className="grid size-10 place-items-center rounded-[13px] bg-[#183b2c] text-[13px] font-semibold tracking-[-0.03em] text-white transition-transform duration-300 group-hover:-rotate-3">
              PL
            </span>
            <span>
              <span className="block text-[17px] font-semibold tracking-[-0.03em] text-[#142019]">PawLingo</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#77837b]">Admin space</span>
            </span>
          </a>
          <button type="button" aria-label="Đóng menu" className="grid size-9 place-items-center rounded-lg text-[#5f6e65] hover:bg-[#e9eeea] lg:hidden" onClick={onClose}>
            <AdminIcon name="close" />
          </button>
        </div>

        <nav aria-label="Điều hướng quản trị" className="mt-10 flex-1 space-y-7 overflow-y-auto pb-6">
          {navigation.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#98a29b]">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={onClose}
                    className={`group flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-300 active:scale-[0.98] ${item.active ? "bg-white text-[#142019] shadow-[0_8px_24px_-18px_rgba(23,59,44,0.45)] ring-1 ring-[#dce4de]" : "text-[#637068] hover:bg-[#edf1ee] hover:text-[#142019]"}`}
                  >
                    <AdminIcon name={item.icon} className={`size-[17px] ${item.active ? "text-[#315f49]" : "text-[#89938c] group-hover:text-[#315f49]"}`} />
                    <span className="flex-1">{item.label}</span>
                    {item.count ? <span className="rounded-md bg-[#e8ede9] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#647168]">{item.count}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="rounded-[18px] border border-[#dce4de] bg-white p-3.5 shadow-[0_18px_35px_-28px_rgba(23,59,44,0.45)]">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-[#e5ece7] text-xs font-semibold text-[#315f49]">TA</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#142019]">Tuấn Anh</p>
              <p className="truncate text-[11px] text-[#7b867e]">Product admin</p>
            </div>
            <AdminIcon name="chevron" className="size-4 text-[#9aa39d]" />
          </div>
        </div>
      </aside>
    </>
  );
}
