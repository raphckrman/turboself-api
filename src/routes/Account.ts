import {RestManager} from "../rest/RESTManager";
import {rawRequestPasswordResetResult} from "../types/account";
import {AUTH_PASSWORD_RESET} from "../rest/endpoints";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const requestPasswordReset = async (email: string): Promise<boolean> => {
  const rawRequestPasswordReset = await manager.get<rawRequestPasswordResetResult>(AUTH_PASSWORD_RESET(email));
  if (rawRequestPasswordReset.rejected.length) {
    throw new Error(`Failed to send password reset email to ${rawRequestPasswordReset.rejected.join(", ")}`);
  }
  return true;
};
