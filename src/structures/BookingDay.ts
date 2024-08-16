import { bookMeal } from "../routes/Host";

export class BookingDay {
    constructor(
        private token: string,
        /** Internal identifier of the host on the digital space */
        public hostId: number,
        /** Internal identifier of the booking week in the digital space */
        public id: string,
        /** Whether the day is booked */
        public booked: boolean,
        /** Whether the day is available to book */
        public canBook: boolean,
        /** Day of the week */
        public dayNumber: number,
        /** Message to display */
        public message: string,
        /** Number of reservations this day */
        public reservations: number,
        /** Date of the day */
        public date: Date
    ) {}

    async book(reservations?: number, bookEvening?: boolean): Promise<BookingDay> {
        if (!reservations) {
            reservations = !this.booked ? 1 : 0;
        }
        if (bookEvening === undefined) {
            bookEvening = false;
        }
        this.booked = reservations > 0;
        return bookMeal(this.token, this.hostId, this.id, this.date.getDay(), reservations, bookEvening);
    }
}
