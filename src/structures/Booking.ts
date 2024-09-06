import { BookingDay } from "./BookingDay";
import { Terminal } from "./Terminal";

export class Booking {
    constructor(
        /** Internal identifier of a host's accounting in the digital space */
        public id: string,
        /** Calendar week number */
        public week: number,
        /** Internal identifier of the host on the digital space */
        public hostId: number,
        /** Week Start Date */
        public from: Date,
        /** Week End Date */
        public to: Date,
        /** Terminal information */
        public terminal: Terminal,
        /** Days of the week available to book */
        public days: Array<BookingDay>
    ) {}
}
