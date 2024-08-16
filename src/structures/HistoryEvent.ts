export class HistoryEvent {
    constructor(
        public id: number,
        public date: Date,
        public label: string,
        public amount: number
    ) {}

}
