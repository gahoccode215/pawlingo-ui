import type { ApiErrorCode } from "@/types/auth";

const AUTH_ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  DUPLICATE_EMAIL: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.",
  INVALID_CREDENTIALS: "Email hoặc mật khẩu không đúng.",
  VALIDATION_ERROR: "Thông tin nhập chưa hợp lệ. Vui lòng kiểm tra lại.",
  UNAUTHORIZED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  INTERNAL_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau.",
  GOOGLE_TOKEN_INVALID: "Đăng nhập Google thất bại. Vui lòng thử lại.",
  GOOGLE_EMAIL_NOT_VERIFIED: "Email Google của bạn chưa được xác thực.",
  ACCOUNT_EXISTS_WITH_PASSWORD:
    "Email này đã đăng ký bằng mật khẩu. Vui lòng đăng nhập bằng email/mật khẩu.",
  INVALID_REFRESH_TOKEN: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  NETWORK_ERROR: "Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.",
};

const DEFAULT_MESSAGE = AUTH_ERROR_MESSAGES.INTERNAL_ERROR;

export function getAuthErrorMessage(code: string): string {
  return code in AUTH_ERROR_MESSAGES
    ? AUTH_ERROR_MESSAGES[code as ApiErrorCode]
    : DEFAULT_MESSAGE;
}
