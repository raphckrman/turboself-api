import { HomeGetResult } from "../interfaces/Home";
import { History } from "../parser/History";
import { LatestPayment } from "../parser/LatestPayment";
import { GET_HOST_HOME } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getLatestPayment = async (token: string, id: number): Promise<LatestPayment> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_HOST_HOME(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const raw = await response.json() as HomeGetResult;
  let date = new Date(raw.latestPaiement?.date ?? "");
  let updateDate = new Date(raw.latestPaiement?.dateMaj ?? "");
  return new LatestPayment(
    raw.latestPaiement?.id ?? 0,
    date,
    updateDate,
    raw.latestPaiement?.type ?? null,
    raw.latestPaiement?.montant ?? 0,
    raw.latestPaiement?.statut ?? "",
    raw.latestPaiement?.idTransaction ?? "",
    raw.latestPaiement?.token ?? ""
  );
};
