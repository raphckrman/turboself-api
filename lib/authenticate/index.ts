import Turboself from "../client/Turboself";
import { AuthFlowBody, AuthFlowResult, AuthFlowData } from "../interfaces/AuthFlow";
import { LOGIN } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const authenticateWithCredentials = async (options: AuthFlowBody): Promise<Turboself> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + LOGIN(), {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const raw = await response.json() as AuthFlowResult;

  return new Turboself(raw.access_token, {
    hoteId: raw.hoteId,
    userId: raw.userId,
    username: options.username,
    password: options.password
  });
};
