import { RESTManager } from "../rest/RESTManager";
import * as endpoints from "../rest/endpoints";
import { Turboself } from "../structures/Client";
import { TurboselfLoginBody, TurboselfLoginResponse } from "../types/Login";

const manager = new RESTManager();

/** This method is used to authenticate into the Turboself account.
 * @param email Email of the user.
 * @param password Password of the user.
 * @param refreshToken If the token should be refreshed.
 */
export const authTurboselfWithCredentials = async (email: string, password: string, refreshToken: boolean | false): Promise<Turboself> => {
  return manager.makeAuthRequest<TurboselfLoginResponse>({
    method: "POST",
    url: endpoints.LOGIN(),
    data: {
      username: email,
      password: password
    } as TurboselfLoginBody
  }).then((data: unknown) => {
    let typedData = data as TurboselfLoginResponse;
    if (refreshToken) {
      return new Turboself(email, password, typedData.access_token, typedData.hoteId, typedData.userId);
    }
    else {
      return new Turboself(null, null, typedData.access_token, typedData.hoteId, typedData.userId);
    }
  }).catch((error: unknown) => {
    throw error;
  });
};
