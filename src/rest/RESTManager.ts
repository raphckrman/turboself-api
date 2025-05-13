/** @module RESTManager */
import { RequestOptions } from "../types/request-handler";

type QueuedRequest<T> = {
  options: RequestOptions;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

export class RestManager {
  private readonly baseURL: string;
  private queue: QueuedRequest<any>[] = [];
  private requestsSent = 0;
  private readonly MAX_REQUESTS_PER_MINUTE = 100;
  private readonly INTERVAL_MS = 60000;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    setInterval(() => {
      this.requestsSent = 0;
      this.processQueue();
    }, this.INTERVAL_MS);
  }

  private async sendRequest<T>(options: RequestOptions): Promise<T> {
    const { method, path, body, headers } = options;
    const url = `${this.baseURL}/${path}`;

    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        "User-Agent": "@raphckrman/turboself-api"
      }
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(`${response.status}: ${JSON.stringify(responseData)}`);
    }

    const responseData = await response.json();
    return responseData as T;
  }

  private enqueueRequest<T>(options: RequestOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ options, resolve, reject });
      this.processQueue();
    });
  }

  private processQueue() {
    while (this.requestsSent < this.MAX_REQUESTS_PER_MINUTE && this.queue.length > 0) {
      const { options, resolve, reject } = this.queue.shift()!;
      this.requestsSent++;
      this.sendRequest<any>(options).then(resolve).catch(reject);
    }
  }

  async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.enqueueRequest<T>({
      method: "GET",
      path,
      headers
    });
  }

  async post<T>(path: string, body: any, options?: RequestOptions): Promise<T> {
    return this.enqueueRequest<T>({
      method: "POST",
      path,
      body,
      headers: options?.headers
    });
  }

  async put<T>(path: string, body: any, options?: RequestOptions): Promise<T> {
    return this.enqueueRequest<T>({
      method: "PUT",
      path,
      body,
      headers: options?.headers
    });
  }

  async delete<T>(path: string, params?: Record<string, any>, options?: RequestOptions): Promise<T> {
    const urlParams = new URLSearchParams(params).toString();
    const urlPath = urlParams ? `${path}?${urlParams}` : path;
    return this.enqueueRequest<T>({
      method: "DELETE",
      path: urlPath,
      headers: options?.headers
    });
  }
}
