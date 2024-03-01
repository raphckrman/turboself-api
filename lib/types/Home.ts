import { balanceResponse } from "./Balance";

export interface homeResponse {
  latestPaiement: latestPayment,
  historiques: Array<historyElement>
  comptesHote: Array<balanceResponse>
}

export interface historyElement {
  /** ID of the history element */
  id: number,
  /** Date of the history element in ISO-8601 */
  date: string,
  /** Type of the history element */
  detail: string,
  /** Amount of the history element who are debited on balance in cents */
  debit: number,
  /** Amount of the credit in cents */
  credit: number | null,
}

export interface latestPayment {
  /** ID of the payment */
  id: number,
  hote: {
    /** ID of the hote */
    id: number
  },
  /** Date of the payment in ISO-8601 */
  date: string,
  /** Type of the payment (ex: CB)*/
  type: string,
  /** Amount of the payment in cents */
  montant: number,
  /** Date of the balance update in ISO-8601 */
  dateMaj: string,
  /** Status of the payment */
  statut: string,
  /** ID of the transaction */
  idTransaction: string,
  /** Token of the payment */
  token: string,
  /** Displayed message on MyTurboself */
  msg: string
}
