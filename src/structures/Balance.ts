export class Balance {
    constructor(
    /** Internal identifier of a host's accounting in the digital space */
        public id: number,
        /** Amount of the balance */
        public amount: number,
        /** Estimated host account balance (taking into account future reservations and OK payments) */
        public estimatedAmount: number,
        /** Date of the estimated balance */
        public estimatedDate: Date
    ) {}
}
