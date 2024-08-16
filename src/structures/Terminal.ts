export class Terminal {
    constructor(
        /** Internal identifier of the Self terminal in the digital space */
        public id: number,
        /** Internal identfeir of the Self terminal in the local database */
        public localId: number,
        /** 2P5 Code of the establishment */
        public code: number,
        /** Terminal Name (eg. Self) */
        public name: string,
        public prices: Array<{
            /** Internal identifier of the price in the digital space */
            id: number;
            /** Internal identifier of the price in the local database */
            localId: number;
            /** Name of the price */
            name: string;
            /** Price in cents */
            price: number;
        }>
    ) {}
}
