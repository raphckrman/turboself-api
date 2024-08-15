export interface rawPaymentResult {
    id: number;
    hote: {
        id: number;
    };
    date: string;
    /** ? Not referenced in API Documentation */
    type: unknown;
    montant: number;
    dateMaj: string;
    statut: "OK" | "INIT" | "ANNULE";
    idTransaction: string | null;
    token: string;
    paiements: Array<{
        id: number;
        compte: unknown;
        appli: unknown;
        montant: number;
    }>;
    msg: string;
}
