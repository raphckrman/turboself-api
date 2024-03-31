import { BalanceGetResult } from "./Balance"

export interface HomeGetResult {
    latestPaiement?: LatestPayment,
    historiques?: Array<History>,
    comptesHote: Array<BalanceGetResult>
}

export interface History {
    id: number,
    date: string,
    detail: string,
    debit: number | null,
    credit: number | null
}

export interface LatestPayment {
    id: number,
    hote: {
        id: number
    },
    date: string,
    type: string | null,
    montant: number,
    dateMaj: string | null,
    statut: string,
    idTransaction: string,
    token: string,
    msg: string
}