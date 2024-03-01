/** @module RESTManager */

import { AxiosRequestConfig } from "axios";
import { RequestHandler } from "./RequestHandler";

export class RESTManager {
  private requestHandler: RequestHandler;

  constructor() {
    this.requestHandler = new RequestHandler();
  }

  public async makeAuthRequest<T = unknown>(options?: AxiosRequestConfig) {
    return this.requestHandler.makeRequest(options);
  }
}
