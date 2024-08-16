export class HistoryEvent {
    constructor(
        /** Internal identifier of a host's history in digital space */
        public id: number,
        /** Date of the operation */
        public date: Date,
        /** Operation details */
        public label: string,
        /** Amount of the operation */
        public amount: number
    ) {}

}
