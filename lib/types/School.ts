export interface SchoolResponse {
  /** School 2p5 identifier */
  code2p5: number,
  /** School Name */
  nom: string,
  /** Turboself version used by the School */
  versionTS: string,
  /** School ID */
  id: number,
  /** School Address 1 */
  adr1: string,
  /** School Address 2 */
  adr2: string,
  /** School Postal Code */
  cp: string,
  /** School City */
  ville: string,
  /** School Phone Number */
  tel: string,
  /** School First Synchronisation Date in ISO-8601 */
  datePremSynchro: string,
  /** School Last Synchronisation Date in ISO-8601 */
  dateDernSynchro: string,
  /** Turboself ID */
  idTurboSelf: number,
  /** School Currency Symbol */
  currencySymbol: string,
  configuration: SchoolConfiguration
  configurationsReserv: Array<SchoolReservation>
  configurationSelf: {
    id: number,
    nbmultiElvArg: number,
    nbmultiElvFor: number,
    nbmultiComArg: number,
    nbmultiComFor: number,
    nbmultiStgArg: number,
    nbmultiStgFor: number,
    dateDernSynchro: string
  },
  /** National Identification Number of the School */
  numEtab: string,
  /** If the School is desactivated */
  desactive: boolean,
  /** MAC Address of the School server */
  pcServeur: string,
  /** Autorised School Transactions */
  nbTransactionAutorise: number,
  /** School Books Total */
  nbReservationsTotal: number | null
}

export interface SchoolReservation {
  id: number,
  usage: number,
  elecom: number,
  /** End of reservation */
  finReserv: string,
}

export interface SchoolConfiguration {
  /** School Configuration ID */
  id: number,
  /** School Website URL */
  url: string,
  /** School E-Mail */
  email: string,
  /** Minimum Meal to Pay */
  nbRepasMini: number,
  creanceMini: number,
  montantCreditMini: number | null,
  /** Actual Reservation Week */
  nbSemaineReserv: number,
  /** School Message */
  msgAccueil: string,
  /** Students has the right to use QRCode */
  autoriseQrCodeEleve: boolean,
  /** Commensals has the right to use QRCode */
  autoriseQrCodeCommensal: boolean,
  /** Trainees has the right to use QRCode */
  autoriseQrCodeStagiaire: boolean,
  /** If the account history of users is hidden */
  cacherHistorique:  boolean,
  fermetures: Array<SchoolClosure>
}

export interface SchoolClosure {
  /** School Closure ID */
  id: number,
  /** User has the right to book a meal */
  rsv: boolean,
  /** User has the right to pay */
  paiement: boolean
  /** From */
  du: string,
  /** To */
  au: string
  synchro: unknown | null
}
