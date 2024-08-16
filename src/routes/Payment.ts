import { RestManager } from "../rest/RESTManager";
import { Payment } from "../structures/Payment";
import { rawPaymentResult } from "../types/payment";
import { PAYMENTS_SPECIFIC } from "../rest/endpoints";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const getPayment = async (token: string, paymentToken: string): Promise<Payment> => {
    const rawPaymentGet = await manager.get<rawPaymentResult>(PAYMENTS_SPECIFIC(paymentToken), { Authorization: `Bearer ${token}` });
    return new Payment(
        rawPaymentGet.id,
        rawPaymentGet.hote.id,
        rawPaymentGet.montant,
        paymentToken,
        null,
        "https://espacenumerique.turbo-self.com/PagePaiementRefuse.aspx?token=" + paymentToken,
        "https://espacenumerique.turbo-self.com/PagePaiementValide.aspx?token=" + paymentToken,
        new Date(rawPaymentGet.date)
    );
};
