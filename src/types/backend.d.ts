// src/types/backend.d.ts
export { };

declare global {
    type QueryParamValue =
        | string
        | number
        | boolean
        | null
        | undefined;

    interface IRequest<
        TBody = unknown,
        TQuery extends Record<string, QueryParamValue> =
        Record<string, QueryParamValue>,
    > {
        url: string;
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        body?: TBody;
        queryParams?: TQuery;
        credentials?: RequestCredentials;
        headers?: HeadersInit;
        cache?: RequestCache;
        next?: {
            revalidate?: number | false;
            tags?: string[];
        };
        signal?: AbortSignal;
    }

    interface IApiError {
        code: string;
        message: string;
    }

    interface IPageMeta {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    }

    interface IApiResponse<T> {
        success: boolean;
        data: T | null;
        error: IApiError | null;
        meta: IPageMeta | null;
    }
}