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

    return response.json() as Promise<IApiResponse<TResponse>>;
}