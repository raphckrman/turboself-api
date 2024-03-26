import { getBalance } from "../api/balanceGet";
import { Balance } from "./Balance";
import { Establishment } from "./Establishment";

export class Host {
    constructor(
        public token: string,
        public id: number,
        public firstname: string,
        public lastname: string,
        public quality: string,
        public division: string,
        public mealPrice: number,
        public etablishment: Establishment,
        public permissions: {
            canPay: boolean,
            canBookMeal: boolean,
            canBookCafeteria: boolean,
            canBookIfBalanceInsufficient: boolean
        },
        public SynchronizationDate: {
            lastSync: string
        },
        public cardCode?: number
    ) {
        this.token = token;
        if (cardCode && cardCode<0) delete this.cardCode;
    }

    public async getBalance(): Promise<Balance> {
        return await getBalance(this.token, this.id);
    }
}