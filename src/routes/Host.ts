import { RestManager } from "../rest/RESTManager";
import { HOST, HOST_BALANCE, HOST_INIT_PAYMENT } from "../rest/endpoints";
import { Host } from "../structures/Host";
import { rawHostBalanceResult, rawHostResult, rawPaymentInitResult } from "../types/host";
import { Balance } from "../structures/Balance";
import { Payment } from "../structures/Payment";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const getHost = async (token: string, hostId: number): Promise<Host> => {
    const rawHostGet = await manager.get<rawHostResult>(HOST(hostId), { Authorization: `Bearer ${token}` });

    return new Host(
        rawHostGet.id,
        rawHostGet.idOrig,
        rawHostGet.etab.id,
        rawHostGet.prenom,
        rawHostGet.nom,
        rawHostGet.mode,
        rawHostGet.qualite,
        rawHostGet.division,
        rawHostGet.prixDej,
        rawHostGet.type,
        rawHostGet.carteCodee,
        rawHostGet.urlCafeteria || null,
        {
            payment:                 rawHostGet.droitPaiement || false,
            reservation:             rawHostGet.droitReservation || false,
            cafeteria:               rawHostGet.droitCafeteria || false,
            bookWithNegativeBalance: rawHostGet.autoriseReservSoldeIns,
            maxPassages:             rawHostGet.nbMulti
        }
    );
};

export const getBalances = async (token: string, hostId: number): Promise<Array<Balance>> => {
    const rawBalanceGet = await manager.get<Array<rawHostBalanceResult>>(HOST_BALANCE(hostId), { Authorization: `Bearer ${token}` });
    const balances: Array<Balance> = [];
    for (const balance of rawBalanceGet) {
        const dateString = balance.montantEstimeMsg.match(/(\d{2})\/(\d{2})\/(\d{4})/)?.slice(1, 4);
        let date = new Date();
        if (dateString) {
            date = new Date(parseInt(dateString[2], 10), parseInt(dateString[1], 10) - 1, parseInt(dateString[0], 10));
        }
        balances.push(new Balance(
            balance.id,
            balance.montant,
            balance.montantEstime,
            date
        ));
    }

    return balances;
};


export const initPayment = async (token: string, hostId: number, amount: number): Promise<Payment> => {
    const rawPaymentInit = await manager.post<rawPaymentInitResult>(HOST_INIT_PAYMENT(hostId), [{
        paiementPayline: {
            hote: {
                id: hostId
            }
        },
        montant: amount
    }], {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return new Payment(
        rawPaymentInit.token,
        rawPaymentInit.redirectURL,
        amount,
        "https://espacenumerique.turbo-self.com/PagePaiementRefuse.aspx?token=" + rawPaymentInit.token,
        "https://espacenumerique.turbo-self.com/PagePaiementValide.aspx?token=" + rawPaymentInit.token,
        hostId,
        new Date()
    );
};
