/** @module RequestHandler */

import axios, { AxiosRequestConfig } from "axios";

export class RequestHandler {
  public async makeRequest<T = unknown>(options: AxiosRequestConfig = {}) {
    if (!options.method) {
      throw new Error("Invalid method " + options.method);
    }

    options.baseURL = "https://api-rest-prod.incb.fr";
    options.headers = {
      ...options.headers,
      "User-Agent": "MyTurboself/66 CFNetwork/1492.0.1 Darwin/23.3.0"
    };

    try {
      const response = await axios.request<T>(options);
      return response.data;
    }
    catch (error) {
      throw new Error(String(error));
    }
  }
}
