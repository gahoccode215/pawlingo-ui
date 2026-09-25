export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: ApiError | null;
    meta: PageMeta | null;
}

export interface ApiError {
    code: string;
    message: string;
}

export interface PageMeta {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}