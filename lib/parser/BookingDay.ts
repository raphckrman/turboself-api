import { bookMeal } from "../api/bookDay";
import { BookedMeal } from "./BookedMeal";

export class BookingDay {
    constructor(
        public token: string,
        public hoteId: number,
        /** ID for book a Meal */
        public bookId: string,
        /** If this day is booked */
        public booked: boolean,
        /** If this day is booked at the last synchronization */
        public bookedAtLastSynchronization: boolean,
        /** If the host has the right to book this meal */
        public canBook: boolean,
        public message: string,
        /** Date of the day */
        public date: Date
    ) {

    }

    /** This method is used to book this day.
     * @param book If the meal should be booked.
     * @param bookEvening If the meal should be booked evening.
    */
    public async book(book?: boolean, bookEvening?: boolean): Promise<BookedMeal> {
        if (!book) book = !this.booked;
        if (!bookEvening) bookEvening = false;
        return await bookMeal(this.token, 
            this.hoteId,
            this.bookId, 
            book === false ? 0: 1,
            book === false ? 0: 1, 
            ((this.date.getDay())-1))
    }
}