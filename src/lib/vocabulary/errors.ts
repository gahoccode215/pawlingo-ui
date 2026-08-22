const VOCABULARY_ERROR_MESSAGES: Record<string, string> = {
  VOCABULARY_NOT_FOUND: "Không tìm thấy từ vựng này.",
  UNAUTHORIZED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  VALIDATION_ERROR: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
  INTERNAL_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau.",
  NETWORK_ERROR: "Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.",
};

const DEFAULT_MESSAGE = VOCABULARY_ERROR_MESSAGES.INTERNAL_ERROR;

export function getVocabularyErrorMessage(code: string): string {
  return VOCABULARY_ERROR_MESSAGES[code] ?? DEFAULT_MESSAGE;
}
