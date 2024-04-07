export class Balance {
  constructor(
    public token: string,
    public hoteId: number,
    /** Account balance in cents */
    public amount: number,
    /** Estimated account balance in cents after books */
    public estimatedAmount: number,
    /** Estimated account balance calculation date */
    public estimatedAt: Date
  ) {
  }
}
