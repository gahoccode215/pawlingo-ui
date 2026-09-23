export type IconName =
  | "activity"
  | "book"
  | "calendar"
  | "chart"
  | "chevron"
  | "close"
  | "download"
  | "flag"
  | "help"
  | "home"
  | "menu"
  | "message"
  | "notification"
  | "search"
  | "settings"
  | "spark"
  | "students"
  | "target"
  | "user"
  | "vocabulary";

type NavigationItem = {
  label: string;
  icon: IconName;
  active?: boolean;
  count?: string;
};

type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigation: NavigationGroup[] = [
  {
    label: "Tổng quan",
    items: [
      { label: "Dashboard", icon: "home" as const, active: true },
      { label: "Học viên", icon: "students" as const, count: "1.2k" },
      { label: "Nội dung học", icon: "book" as const },
      { label: "Từ vựng", icon: "vocabulary" as const, count: "48" },
    ],
  },
  {
    label: "Vận hành",
    items: [
      { label: "Phiên học", icon: "activity" as const },
      { label: "Phản hồi", icon: "message" as const, count: "8" },
      { label: "Báo cáo", icon: "flag" as const },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { label: "Cài đặt", icon: "settings" as const },
      { label: "Trợ giúp", icon: "help" as const },
    ],
  },
];

export const metrics = [
  {
    label: "Học viên hoạt động",
    value: "1,284",
    delta: "+12.8%",
    note: "so với tháng trước",
    icon: "students" as const,
  },
  {
    label: "Từ đã được học",
    value: "38,642",
    delta: "+18.4%",
    note: "so với tháng trước",
    icon: "vocabulary" as const,
  },
  {
    label: "Phiên học hoàn tất",
    value: "4,917",
    delta: "+9.2%",
    note: "so với tháng trước",
    icon: "target" as const,
  },
  {
    label: "Đang học lúc này",
    value: "147",
    delta: "+23",
    note: "trong 60 phút qua",
    icon: "activity" as const,
  },
];

export const chartData = [
  { day: "01", value: 58 },
  { day: "04", value: 72 },
  { day: "07", value: 64 },
  { day: "10", value: 82 },
  { day: "13", value: 48 },
  { day: "16", value: 76 },
  { day: "19", value: 91 },
  { day: "22", value: 69 },
  { day: "25", value: 86 },
  { day: "28", value: 96 },
  { day: "31", value: 88 },
];

export const recentLearners = [
  {
    name: "Minh Anh Trần",
    email: "minhanh.tran@pawlingo.vn",
    lesson: "Travel essentials",
    time: "2 phút trước",
    initials: "MA",
    tone: "bg-[#e6efe8] text-[#31533a]",
  },
  {
    name: "Khánh Linh Võ",
    email: "khanhlinh.vo@pawlingo.vn",
    lesson: "Daily conversation",
    time: "8 phút trước",
    initials: "KL",
    tone: "bg-[#ebe8df] text-[#514936]",
  },
  {
    name: "Bảo Ngọc Nguyễn",
    email: "baongoc.nguyen@pawlingo.vn",
    lesson: "Food & restaurant",
    time: "17 phút trước",
    initials: "BN",
    tone: "bg-[#e5eaef] text-[#334653]",
  },
  {
    name: "Gia Huy Phạm",
    email: "giahuy.pham@pawlingo.vn",
    lesson: "Workplace English",
    time: "31 phút trước",
    initials: "GH",
    tone: "bg-[#eee6e1] text-[#5c4033]",
  },
];

export const activities = [
  { label: "Hoàn thành bài học", value: "2,846", percent: 78, color: "bg-[#183b2c]" },
  { label: "Ôn tập từ vựng", value: "1,639", percent: 56, color: "bg-[#6f927d]" },
  { label: "Làm bài kiểm tra", value: "892", percent: 38, color: "bg-[#b8cabd]" },
];
