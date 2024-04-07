export class History {
  constructor(
    public id: number,
    /** Date of the history element */
    public date: Date,
    public label: string,
    /** 0 if it's not a debit */
    public debit: number,
    /** 0 if it's not a credit */
    public credit: number
  ) {
  }
}
