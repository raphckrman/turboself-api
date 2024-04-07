export class LatestPayment {
  constructor(
    public id: number,
    /** Date of the payment */
    public date: Date,
    /** Date of the last update */
    public updateDate: Date | null,
    public type: string | null,
    /** Amount of the payment in cents */
    public amount: number,
    /** Actual Payment Status */
    public status: string,
    /** Transaction ID of the payment */
    public transactionId: string,
    public token: string
  ) {
  }
}
