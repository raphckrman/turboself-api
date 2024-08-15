export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    path?: string;
    body?: unknown;
    headers?: Record<string, string>;
}
