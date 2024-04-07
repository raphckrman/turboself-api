import { BookingTerminal } from "./BookingTerminal";

export class BookingWeek {
  constructor(
    public terminals: Array<BookingTerminal>,
    /** Available weeks number */
    public weeksNumber: Array<number>,
    /** If a user can book evening this week */
    public canBookEvening: boolean,
    /** Date of the week */
    public weekDate: Date
  ) {

  }
}
