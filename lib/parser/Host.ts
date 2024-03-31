import { getBalance } from "../api/balanceGet";
import { getHistory } from "../api/historyGet";
import { getLatestPayment } from "../api/lastPaymentGet";
import { getSiblings } from "../api/siblingsGet";
import { Balance } from "./Balance";
import { Establishment } from "./Establishment";
import { History } from "./History";
import { LatestPayment } from "./LatestPayment";

export class Host {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public quality: string,
        public division: string,
        public mealPrice: number,
        public etablishment: Establishment,
        public permissions?: {
            canPay: boolean,
            canBookMeal: boolean,
            canBookCafeteria: boolean,
            canBookIfBalanceInsufficient: boolean
        },
        public SynchronizationDate?: {
            lastSync: string
        },
        public cardCode?: number,
        public token?: string
    ) {
        this.token = token;
        if (cardCode && cardCode<0) delete this.cardCode;
    }

    public async getBalance(): Promise<Balance> {
        if (this.token) return await getBalance(this.token, this.id);
        throw new Error("You need to login to this account first");
    }
    public async getSiblings(): Promise<Host[]> {
        if (this.token) return await getSiblings(this.token, this.id);
        throw new Error("You need to login to this account first");
    }

    public async getHistory(): Promise<History[]> {
        if (this.token) return await getHistory(this.token, this.id);
        throw new Error("You need to login to this account first");
    }

    public async getLatestPayment(): Promise<LatestPayment> {
        if (this.token) return await getLatestPayment(this.token, this.id);
        throw new Error("You need to login to this account first");
    }
}