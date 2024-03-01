import { SchoolResponse } from "./School";

export interface userResponse {
  /** The hoteId */
  id: number,
  idOrig: number,
  etab: SchoolResponse,
  /** Lastname of the user */
  nom: string,
  /** Firstname of the user */
  prenom: string,
  /** Payment mode of the user */
  mode: string,
  /** User Quality */
  qualite: string,
  /** Division of the user */
  division: string,
  /** Price of a meal */
  prixDej: number,
  type: number,
  nbMulti: number,
  /** User has the right to pay */
  droitPaiement: boolean,
  /** User has the right to book a meal */
  droitReservation: boolean,
  /** User has the right to access to the cafeteria */
  droitCafeteria: boolean,
  /** Last User synchronisation in ISO-8601 */
  dateDernSynchro: string,
  /** If the account is desactivated */
  desactive: boolean,
  /** If the password is private (wtf?) */
  mdpPrive: boolean,
  /** User has the right to book a meal if his balance is negative */
  autoriseReservSoldeIns: boolean,
  profilForfaitModule: number,
  carteCodee: number
}

export interface userInfo {
  /** Lastname of the user */
  nom: string,
  /** Firstname of the user */
  prenom: string,
  /** Payment mode of the user */
  mode: string,
  /** User Quality */
  qualite: string,
  /** Division of the user */
  division: string,
  /** Price of a meal */
  prixDej: number,
  type: number,
  nbMulti: number,
  /** User has the right to pay */
  droitPaiement: boolean,
  /** User has the right to book a meal */
  droitReservation: boolean,
  /** User has the right to access to the cafeteria */
  droitCafeteria: boolean,
  /** Last User synchronisation in ISO-8601 */
  dateDernSynchro: string,
  /** If the account is desactivated */
  desactive: boolean,
  /** If the password is private (wtf?) */
  mdpPrive: boolean,
  /** User has the right to book a meal if his balance is negative */
  autoriseReservSoldeIns: boolean,
  profilForfaitModule: number,
  carteCodee: number
}
