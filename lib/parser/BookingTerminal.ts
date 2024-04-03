import { BookingDay } from "./BookingDay";
import { BookingPrice } from "./BookingPrice";

export class BookingTerminal {
    constructor(
        public terminalId: number,
        /** ID associated to book with this terminal */
        public bookId: string,
        /** Booking Year */
        public bookYear: number,
        /** Booking Weak Number */
        public bookWeak: number,
        /** Name of the terminal */
        public name: string,
        public dayAuthorized: number,
        public usage: number,
        /** Prices of the terminal */
        public prices: Array<BookingPrice>,
        /** Days of the terminal */
        public days: Array<BookingDay>
    ) {

    }
}