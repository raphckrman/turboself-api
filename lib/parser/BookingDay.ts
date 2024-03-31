import { bookMeal } from "../api/bookDay";
import { BookedMeal } from "./BookedMeal";

export class BookingDay {
    constructor(
        public token: string,
        public hoteId: number,
        public bookId: string,
        public booked: boolean,
        public bookedAtLastSynchronization: boolean,
        public canBook: boolean,
        public message: string,
        public date: Date
    ) {

    }

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