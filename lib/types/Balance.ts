export interface balanceResponse {
  /** ID of the balance */
  id: number,
  /** ID of the account */
  compte: string | null,
  appli: {
    /** ID of the app */
    id: number,
    /** Original ID of the app */
    idOrig: number,
    /** Library used */
    lib: string,
  }
  hote: {
    /** ID of the hote */
    id: number
  },
  /** Amount of the balance in cents */
  montant: number,
  /** Estimated amount of the balance after pre-reservations */
  montantEstime: number,
  /** Displayed message on MyTurboself */
  montantEstimeMsg: string
}
