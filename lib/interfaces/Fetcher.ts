export interface FetcherOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  /** Headers that should be used in the request */
  headers?: Record<string, string>;
  /** Body that should be sent in the request */
  body?: string;
  /** How that should handle the redirections*/
  redirect?: "follow" | "error" | "manual";
}
