export interface rawPaymentResult {
    id: number;
    hote: {
        id: number;
    };
    date: string;
    /** ? Not referenced in API Documentation */
    type: unknown;
    /** Amount of the payment */
    montant: number;
    /** Payline payment synchronization date */
    dateMaj: string;
    /** Payment status */
    statut: "OK" | "INIT" | "ANNULE" | "ERREUR";
    /** Payline payment transaction ID */
    idTransaction: string | null;
    /** Payline payment token */
    token: string;
    paiements?: Array<{
        id: number;
        compte: unknown;
        appli: unknown;
        montant: number;
    }>;
    /** Status message (eg. Paiement refusé) */
    msg: string;
}
