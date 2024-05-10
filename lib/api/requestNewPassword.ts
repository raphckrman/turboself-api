import { RequestNewPasswordResult } from "../interfaces/Account";
import { SEND_PASSWORD_RESET_REQUEST } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const requestNewPassword = async (email: string): Promise<RequestNewPasswordResult> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + SEND_PASSWORD_RESET_REQUEST(email), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return await response.json() as RequestNewPasswordResult;
};
