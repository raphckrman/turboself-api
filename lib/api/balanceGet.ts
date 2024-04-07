import { BalanceGetResult } from "../interfaces/Balance";
import { Balance } from "../parser/Balance";
import { GET_HOST_BALANCE } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getBalance = async (token: string, id: number): Promise<Balance> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_HOST_BALANCE(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const raw = await response.json() as Array<BalanceGetResult>;
  const estimatedAt: Date = new Date();
  estimatedAt.setFullYear(parseInt(raw[0].montantEstimeMsg.replace("Montant estimé au ", "").split("/")[2]));
  estimatedAt.setMonth(parseInt(raw[0].montantEstimeMsg.replace("Montant estimé au ", "").split("/")[1])-1);
  estimatedAt.setDate(parseInt(raw[0].montantEstimeMsg.replace("Montant estimé au ", "").split("/")[0]));
  estimatedAt.setHours(12);
  estimatedAt.setMinutes(0);
  estimatedAt.setSeconds(0);
  estimatedAt.setMilliseconds(0);

  return new Balance(token, id, raw[0].montant, raw[0].montantEstime, estimatedAt);
};
