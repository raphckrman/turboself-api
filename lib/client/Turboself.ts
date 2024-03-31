import { getBalance } from "../api/balanceGet";
import { bookMeal } from "../api/bookDay";
import { getBookingWeek } from "../api/bookingGet";
import { getCanBookEvening } from "../api/canBookEveningGet";
import { searchEstablishment } from "../api/establishmentSearch";
import { getHistory } from "../api/historyGet";
import { getHost } from "../api/hostGet";
import { getLatestPayment } from "../api/lastPaymentGet";
import { getSiblings } from "../api/siblingsGet";
import { authenticateWithCredentials } from "../authenticate";
import { AuthFlowData } from "../interfaces/AuthFlow";
import { Balance } from "../parser/Balance";
import { BookedMeal } from "../parser/BookedMeal";
import { BookingWeek } from "../parser/BookingWeek";
import { Establishment } from "../parser/Establishment";
import { History } from "../parser/History";
import { Host } from "../parser/Host";
import { LatestPayment } from "../parser/LatestPayment";

export default class Turboself {
    tokenExpires: number = 0;
    constructor(
        public token: string,
        private loginData: {
            username: string;
            password: string;
            extra: AuthFlowData;
        }
    ) {
        this.token = token;
        this.tokenExpires = Date.now() + 55 * 60 * 1000;
    }

    private async refreshToken(): Promise<boolean> {
        await authenticateWithCredentials({
            username: this.loginData.username, 
            password: this.loginData.password
        }).then((data) => {
            this.token = data.token;
            this.tokenExpires = Date.now() + 55 * 60 * 1000;
        });

        return true
    }

    public async searchEstablishments(city: string, limit: number): Promise<Establishment[]> {
        return await searchEstablishment(city, limit);
    }

    public async getEstablishment(code: string): Promise<Establishment> {
        return await this.getEstablishment(code);
    }

    public async getHost(): Promise<Host> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getHost(this.token, this.loginData.extra.hoteId);
    }
    
    public async getBalance(): Promise<Balance> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getBalance(this.token, this.loginData.extra.hoteId);
    }

    public async getSiblings(): Promise<Host[]> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getSiblings(this.token, this.loginData.extra.hoteId);
    }

    public async getHistory(): Promise<History[]> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getHistory(this.token, this.loginData.extra.hoteId);
    }

    public async getLatestPayment(): Promise<LatestPayment> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getLatestPayment(this.token, this.loginData.extra.hoteId);
    }

    public async canBookEvening(): Promise<boolean> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getCanBookEvening(this.token, this.loginData.extra.hoteId);
    }

    public async getBookingWeek(weekNumber?: number): Promise<BookingWeek> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        return await getBookingWeek(this.token, this.loginData.extra.hoteId, weekNumber);
    }

    public async bookDay(id: string, book: boolean, bookEvening?: boolean, dayOfWeek?: number): Promise<BookedMeal> {
        if (Date.now() > this.tokenExpires) {
            await this.refreshToken();
        }
        if (!dayOfWeek) dayOfWeek = ((new Date()).getDay()) - 1
        if (!bookEvening) bookEvening = false
        return await bookMeal(this.token, this.loginData.extra.hoteId, id, book === false ? 0 : 1, bookEvening === false ? 0 : 1, dayOfWeek);
    }
}