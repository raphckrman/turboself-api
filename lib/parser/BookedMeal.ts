import { Host } from "./Host";

export class BookedMeal {
    constructor(
        public id: string,
        /** If the meal is booked ? */
        public booked: boolean,
        /** If the meal is booked from the kiosk */
        public kioskBooked: boolean,
        /** If the meal is booked at the last synchronization */
        public bookedAtLastSynchronisation: boolean,
        /** Id of the meal */
        public bookId: string,
        /** Message of the meal */
        public message: string,
        /** Host */
        public host: Host
    ) {

    }
}