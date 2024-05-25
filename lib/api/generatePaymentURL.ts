import { PaymentInitPOSTResult } from "../interfaces/Payment";
import { POST_INIT_PAYMENT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const generatePaymentURL = async (token: string, id: number, amount: number): Promise<string> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + POST_INIT_PAYMENT(id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify([{
      paiementPayline: {
        hote: {
          id: id
        }
      },
      montant: amount
    }])
  });

  const raw = await response.json() as PaymentInitPOSTResult;
  return raw.redirectURL;
};
