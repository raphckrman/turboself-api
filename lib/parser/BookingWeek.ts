import { BookingTerminal } from "./BookingTerminal";

export class BookingWeek {
    constructor(
        public terminals: Array<BookingTerminal>,
        public weeksNumber: Array<number>,
        public canBookEvening: boolean,
        public weekDate: Date
    ) {

    }
}