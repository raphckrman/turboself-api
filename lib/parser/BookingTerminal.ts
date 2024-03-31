import { BookingDay } from "./BookingDay";
import { BookingPrice } from "./BookingPrice";

export class BookingTerminal {
    constructor(
        public terminalId: number,
        public bookId: string,
        public bookYear: number,
        public bookWeak: number,
        public name: string,
        public dayAuthorized: number,
        public usage: number,
        public prices: Array<BookingPrice>,
        public days: Array<BookingDay>
    ) {

    }
}