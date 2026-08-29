import type { VocabularyErrorCode, VocabularyServiceError } from "@/types/vocabulary";

const VOCABULARY_ERROR_MESSAGES: Record<VocabularyErrorCode, string> = {
  VALIDATION_ERROR: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
  WORD_NOT_FOUND: "Không tìm thấy từ vựng này.",
  VOCABULARY_NOT_FOUND: "Từ này chưa có trong danh sách của bạn.",
  UNAUTHORIZED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  INTERNAL_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau.",
  NETWORK_ERROR: "Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.",
};

const DEFAULT_MESSAGE = VOCABULARY_ERROR_MESSAGES.INTERNAL_ERROR;

export function getVocabularyErrorMessage(code: string): string {
  return code in VOCABULARY_ERROR_MESSAGES
    ? VOCABULARY_ERROR_MESSAGES[code as VocabularyErrorCode]
    : DEFAULT_MESSAGE;
}

export function isVocabularyServiceError(error: unknown): error is VocabularyServiceError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "status" in error
  );
}
