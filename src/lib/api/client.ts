export async function sendRequest<
    TResponse,
    TBody = unknown,
    TQuery extends Record<string, QueryParamValue> =
    Record<string, QueryParamValue>,
>({
    url,
    method = "GET",
    body,
    queryParams,
    headers,
    credentials,
    cache,
    next,
    signal,
}: IRequest<TBody, TQuery>): Promise<IApiResponse<TResponse>> {
    const searchParams = new URLSearchParams();

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                searchParams.set(key, String(value));
            }
        });
    }

    const queryString = searchParams.toString();
    const requestUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(requestUrl, {
        method,
        headers: {
            ...(body !== undefined && {
                "Content-Type": "application/json",
            }),
            ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials,
        cache,
        next,
        signal,
    });

    // 1. Kiểm tra response có phải JSON không
    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        throw new Error(
            `Invalid API response: HTTP ${response.status}`
        );
    }

    // 2. Chuyển JSON thành object
    const result =
        (await response.json()) as IApiResponse<TResponse>;

    // 3. Kiểm tra HTTP status có khớp với kết quả không
    if (!response.ok && result.success) {
        throw new Error(
            `Unexpected API response: HTTP ${response.status}`
        );
    }

    // 4. Trả kết quả về cho nơi gọi
    return result;
}