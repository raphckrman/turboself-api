import { EtablishmentGetResult } from "../interfaces/Etablishment";
import { Etablishment } from "../parser/Etablishment";
import { SEARCH_ETABLISHMENT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const searchEtablishment = async (city: string, limit: number): Promise<Array<Etablishment>> => {
    const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + SEARCH_ETABLISHMENT(city, limit), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const raw = await response.json() as Array<EtablishmentGetResult>;
    const result = raw.map((data) => {
        return new Etablishment(
            data.code2p5,
            data.nom,
            data.versionTS
        );
    });

    return result;
};