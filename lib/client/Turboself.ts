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

    return true;
  }


  /** This method is used to search schools from all schools using Turboself.
     * @param query The query to search for.
     * @param limit The maximum number of results to return.
   */
  public async searchEstablishments(query: string, limit: number): Promise<Establishment[]> {
    return await searchEstablishment(query, limit);
  }

  /** This method is used to get an Establishment from Turboself.
     * @param code The code of the establishment.
    */
  public async getEstablishment(code: string): Promise<Establishment> {
    return await this.getEstablishment(code);
  }

  /** This method is used to get the host of a Turboself user.
    */
  public async getHost(): Promise<Host> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getHost(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get the balance of a Turboself user.
    */
  public async getBalance(): Promise<Balance> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getBalance(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get the siblings of a Turboself user.
    */
  public async getSiblings(): Promise<Host[]> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getSiblings(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get the latest payment of a Turboself user.
    */
  public async getHistory(): Promise<History[]> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getHistory(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get the latest payment of a Turboself user.
    */
  public async getLatestPayment(): Promise<LatestPayment> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getLatestPayment(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get if the user can book evening.
     */
  public async canBookEvening(): Promise<boolean> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getCanBookEvening(this.token, this.loginData.extra.hoteId);
  }

  /** This method is used to get a booking week.
     * @param weekNumber The number of the week.
    */
  public async getBookingWeek(weekNumber?: number): Promise<BookingWeek> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    return await getBookingWeek(this.token, this.loginData.extra.hoteId, weekNumber);
  }

  /** This method is used to book a meal.
     * @param id The id of the associated to the terminal.
     * @param book If the meal should be booked.
     * @param bookEvening If the meal should be booked evening.
     * @param dayOfWeek The day of the week the meal should be booked.
    */
  public async bookDay(id: string, book: boolean, bookEvening?: boolean, dayOfWeek?: number): Promise<BookedMeal> {
    if (Date.now() > this.tokenExpires) {
      await this.refreshToken();
    }
    if (!dayOfWeek) dayOfWeek = ((new Date()).getDay()) - 1;
    if (!bookEvening) bookEvening = false;
    return await bookMeal(this.token, this.loginData.extra.hoteId, id, book === false ? 0 : 1, bookEvening === false ? 0 : 1, dayOfWeek);
  }
}
