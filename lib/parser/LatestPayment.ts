export class LatestPayment {
    constructor(
        public id: number,
        public date: Date,
        public updateDate: Date | null,
        public type: string | null,
        public amount: number,
        public status: string,
        public transactionId: string,
        public token: string
    ) { 
    }
}