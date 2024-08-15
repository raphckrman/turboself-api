export class Payment {
    constructor(
    /** Payment token */
        public token: string,
        /** URL of the payment page */
        public url: string,
        /** Amount of the payment */
        public amount: number,
        /** URL to redirect to if the payment is cancelled */
        public cancelURL: string,
        /** URL to redirect to if the payment is successful */
        public returnURL: string,
        /** Host ID of the buyer */
        public hostId: number,
        /** Date of the payment */
        public date: Date
    ) {}

}
