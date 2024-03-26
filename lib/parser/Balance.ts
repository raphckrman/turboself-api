export class Balance {
    constructor(
        public token: string,
        public hoteId: number,
        public amount: number,
        public estimatedAmount: number,
        public estimatedAt: Date
    ) {
    }
}