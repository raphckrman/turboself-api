export class History {
    constructor(
        public id: number,
        public date: Date,
        public label: string,
        public debit: number,
        public credit: number
    ) { 
    }
}