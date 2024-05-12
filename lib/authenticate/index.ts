import Turboself from "../client/Turboself";
import { AuthFlowBody, AuthFlowResult, AuthFlowData } from "../interfaces/AuthFlow";
import { LOGIN } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const authenticateWithCredentials = async (options: AuthFlowBody, useTicket?: boolean | false): Promise<Turboself> => {
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
  }, useTicket ?? false);
};

export const authenticateWithTicket = async (ent: "PRONOTE" | string, ticket: string): Promise<Turboself> => {
  const response = await TurboselfFetcher(`https://espacenumerique.turbo-self.com/Connexion.aspx?ent=${ent}&ticket=${ticket}`, {
    method: "GET"
  });

  const tempUsername = response.headers.get("set-cookie")?.split(";")[0].split("=")[1];
  const tempPassword = response.headers.get("set-cookie")?.split(";")[0].split("=")[1];

  const TS = authenticateWithCredentials({
    username: tempUsername ?? "",
    password: tempPassword ?? ""
  }, true);

  return TS;
};
