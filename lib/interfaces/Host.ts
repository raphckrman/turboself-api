import { EtablishmentGetResult } from "./Establishment";

export interface HostGetResult {
  /** Host ID */
  id: number
  idOrig: number,
  etab: EtablishmentGetResult,
  /** Host Surname */
  nom: string,
  /** Host First Name */
  prenom: string,
  /** Host Payment Mode */
  mode: string,
  /** Quality of the host in the establishment */
  qualite: string
  /** Division of the host in the establishment */
  division: string,
  /** Price of a meal in cent */
  prixDej: number
  type: number,
  nbMulti: number
  /** If the host has the right to pay */
  droitPaiement: boolean,
  /** If the host has the right to book a meal */
  droitReservation: boolean,
  /** If the host has the right to access to the cafeteria */
  droitCafeteria: boolean,
  /** Last Synchronisation to Turboself */
  dateDernSynchro: string
  /** If the host account is disabled */
  desactive: boolean,
  /** If the password is private (wtf?) */
  mdpPrive: boolean,
  /** If the host has the right to book a meal even if its balance is insufficient */
  autoriseReservSoldeIns: boolean,
  profilForfaitModule: number,
  /** QRCode */
  carteCodee: number | null
}
