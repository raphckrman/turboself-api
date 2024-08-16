/** @class Establishment */

import {
    Closure,
    Contact,
    Location,
    Permissions,
    SSOConfiguration,
    Synchronisation
} from "../types/establishment";

export class Establishment {
    constructor(
    /** Internal identifier of the establishment on the digital space */
        public id: number,
        /** Name of establishment (max length: 50) */
        public name: string,
        /** Currency symbol */
        public currencySymbol: string,
        /** 2p5 code */
        public code: string | null,
        /** URL of the establishment logo */
        public logoUrl: string | null,
        /** UAI (Unité Administrative Immatriculée) code, unique to each establishment */
        public uai: string | null,
        /** Server MAC Adress */
        public macAddress: string | null,
        /** Digital space greeting */
        public motd: string,
        /** Minimum number of meals to credit the Self account */
        public minMealsToCredit: number,
        /** Minimum debt to credit the Forfait account */
        public minDebtToCredit: number,
        /** Minimum amount to credit the Self account */
        public minAmountToCredit: number,
        public closures: Array<Closure>,
        public location: Location,
        public contact: Contact,
        public permissions: Permissions,
        public sso: SSOConfiguration | null,
        public synchronisation: Synchronisation
    ) {}

}
