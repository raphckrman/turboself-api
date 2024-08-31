import { RestManager } from "../rest/RESTManager";
import { ESTABLISHMENT_BY_CODE, ESTABLISHMENT_BY_ID, ESTABLISHMENT_SEARCH } from "../rest/endpoints";
import { Establishment } from "../structures/Establishment";
import { rawEstablishmentResult, rawEstablishmentSearchResult } from "../types/establishment";
import { transformToEstablishment } from "../utils/transformers";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const searchEstablishments = async (query: string, code = "", limit = 10, minimalist = false, token?: string): Promise<Array<Establishment>> => {
    const rawEstablishmentSearch = await manager.get<Array<rawEstablishmentSearchResult>>(ESTABLISHMENT_SEARCH(query, code, limit));

    const establishments: Array<Establishment> = [];
    if (token && !minimalist) {
        for (const establishment of rawEstablishmentSearch) {
            establishments.push(await getEstablishmentBy2P5(token, establishment.code2p5));
        }
    } else {
        for (const establishment of rawEstablishmentSearch) {
            establishments.push(transformToEstablishment(establishment));
        }
    }


    return establishments;
};

export const getEstablishmentBy2P5 = async (token: string, code2p5: string): Promise<Establishment> => {
    const rawEstablishmentGet = await manager.get<Array<rawEstablishmentResult>>(ESTABLISHMENT_BY_CODE(code2p5), {
        Authorization: `Bearer ${token}`
    });
    if (rawEstablishmentGet.length === 0) {
        throw new Error("Establishment not found");
    }
    const establishment = rawEstablishmentGet[0];
    return transformToEstablishment(establishment);
};

export const getEstablishment = async (token: string, etabId: number): Promise<Establishment> => {
    const rawEstablishmentGet = await manager.get<rawEstablishmentResult>(ESTABLISHMENT_BY_ID(etabId), {
        Authorization: `Bearer ${token}`
    });
    return transformToEstablishment(rawEstablishmentGet);
};
