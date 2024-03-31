import { Host } from "./Host";

export class BookedMeal {
    constructor(
        public id: string,
        public booked: boolean,
        public kioskBooked: boolean,
        public bookedAtLastSynchronisation: boolean,
        public bookId: string,
        public message: string,
        public host: Host
    ) {

    }
}