import { EtablishmentGetResult } from "../interfaces/Establishment";
import { Establishment } from "../parser/Establishment";
import { SEARCH_ETABLISHMENT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const searchEstablishment = async (city: string, limit: number): Promise<Array<Establishment>> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + SEARCH_ETABLISHMENT(city, limit), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const raw = await response.json() as Array<EtablishmentGetResult>;
  const result = raw.map((data) => {
    return new Establishment(
      data.code2p5,
      data.nom,
      data.versionTS
    );
  });

  return result;
};
