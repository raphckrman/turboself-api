export interface BalanceGetResult {
  id?: string,
  compte?: unknown | null,
  appli: {
    id: number,
    idOrig: number,
    lib: string
  },
  hote: {
    /** Host ID */
    id: number
  },
  montant: number,
  montantEstime: number,
  montantEstimeMsg: string
}
