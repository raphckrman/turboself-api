import { HomeGetResult } from "../interfaces/Home";
import { History } from "../parser/History";
import { GET_HOST_HOME } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getHistory = async (token: string, id: number): Promise<History[]> => {
    const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_HOST_HOME(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const raw = await response.json() as HomeGetResult;
    const result = raw.historiques?.map((data) => {
        let date: Date = new Date(data.date);
        return new History(
            data.id,
            date,
            data.detail,
            data.debit ?? 0,
            data.credit ?? 0
        );
    });

    if (result) {
        return result;
    }

    return [];
}