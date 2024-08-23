export class Payment {
    constructor(
        /** Internal identifier of Payline payment in the digital space */
        public id: number | null,
        /** Host ID of the buyer */
        public hostId: number,
        /** Amount of the payment */
        public amount: number,
        /** Status of the payment */
        public status: string,
        /** Payment token */
        public token: string,
        /** URL of the payment page */
        public url: string | null,
        /** URL to redirect to if the payment is cancelled */
        public cancelURL: string,
        /** URL to redirect to if the payment is successful */
        public returnURL: string,
        /** Date of the payment */
        public date: Date
    ) {}

}
