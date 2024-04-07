import { GET_HOST_CAN_BOOK_EVENING } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getCanBookEvening = async (token: string, id: number): Promise<boolean> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_HOST_CAN_BOOK_EVENING(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const raw = await response.json() as boolean;
  return raw;
};
