import { RESTManager } from "../rest/RESTManager";
import * as endpoints from "../rest/endpoints";
import { balanceResponse } from "../types/Balance";
import { bookMealResponse, bookingResponse, bookings } from "../types/Booking";
import { historyElement, homeResponse, latestPayment } from "../types/Home";
import { userInfo, userResponse } from "../types/User";

export class User {
  #manager: RESTManager;

  constructor() {
    this.#manager = new RESTManager();
  }

  /** This method is used to get the user information.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getUser(hoteId: number, token: string): Promise<userInfo> {
    return this.#manager.makeAuthRequest<userResponse>({
      method: "GET",
      url: endpoints.USER(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as userResponse;
      return {
        nom: typedData.nom,
        prenom: typedData.prenom,
        mode: typedData.mode,
        qualite: typedData.qualite,
        division: typedData.division,
        prixDej: typedData.prixDej,
        type: typedData.type,
        nbMulti: typedData.nbMulti,
        droitPaiement: typedData.droitPaiement,
        droitReservation: typedData.droitReservation,
        droitCafeteria: typedData.droitCafeteria,
        dateDernSynchro: typedData.dateDernSynchro,
        desactive: typedData.desactive,
        mdpPrive: typedData.mdpPrive,
        autoriseReservSoldeIns: typedData.autoriseReservSoldeIns,
        profilForfaitModule: typedData.profilForfaitModule,
        carteCodee: typedData.carteCodee
      } as userInfo;
    });
  }

  /** This method is used to get the user history.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getHistory(hoteId: number, token: string): Promise<Array<historyElement>> {
    return this.#manager.makeAuthRequest<homeResponse>({
      method: "GET",
      url: endpoints.USER_HOME(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as homeResponse;
      return typedData.historiques;
    });
  }

  /** This method is used to get the last payment of the user.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getLastPayment(hoteId: number, token: string): Promise<latestPayment> {
    return this.#manager.makeAuthRequest<homeResponse>({
      method: "GET",
      url: endpoints.USER_HOME(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as homeResponse;
      return typedData.latestPaiement;
    });
  }

  /** This method is used to get the balances of his accounts.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getBalances(hoteId: number, token: string): Promise<balanceResponse[]> {
    return this.#manager.makeAuthRequest<balanceResponse[]>({
      method: "GET",
      url: endpoints.USER_BALANCES(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      return data as balanceResponse[];
    });
  }

  /** This method is used to get the current week of booking.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getCurrentBookingWeek(hoteId: number, token: string): Promise<string> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as bookingResponse;
      return typedData.dateSemaine;
    });
  }

  /** This method is used to get the current week of booking.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getCurrentBookingWeekNumber(hoteId: number, token: string): Promise<number> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as bookingResponse;
      return typedData.rsvWebDto[0].semaine ?? 0;
    });
  }

  /** This method is used to get the bookings of the user for a week.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     * @param week The week number to get.
     */
  async getBookings(hoteId: number, token: string, week?: number): Promise<bookingResponse> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId) + (week ? `?num=${week}` : ""),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      return data as bookingResponse;
    });
  }

  /** This method is used to get the weeks available for booking.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getBooksWeeksAvailable(hoteId: number, token: string): Promise<number[]> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as bookingResponse;
      return typedData.numSemaines;
    });
  }

  /** This method is used to get the state of evening reservation.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     */
  async getEveningBookingState(hoteId: number, token: string): Promise<boolean> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as bookingResponse;
      return typedData.isResaSoirActive;
    });
  }

  /** This method is used to get the bookings of the user for a week.
     * @param hoteId The ID of the hote to get.
     * @param token The token of the user.
     * @param state The state of the booking (1==true, 0==false).
     * @param weekNumber The week number to get.
     * @param dayOfWeek The ID of the borne to get.
     * @param bookEvening If the evening should be booked.
     */
  async bookDay(hoteId: number, token: string, state: number, weekNumber?: number, dayOfWeek?: number, bookEvening?: boolean ): Promise<bookMealResponse> {
    const weekId: string =  await this.getBookings(hoteId, token, weekNumber).then((data) => data.rsvWebDto[0]?.id) ?? await this.getBookings(hoteId, token).then((data) => data.rsvWebDto[0]?.id);
    return this.#manager.makeAuthRequest<bookMealResponse>({
      method: "PUT",
      url: endpoints.BOOK_DAY(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      },
      data: {
        dayOfWeek: dayOfWeek ?? new Date().getDay(),
        dayReserv: state,
        web: {
          id: weekId
        },
        hasHoteResaSoirActive: bookEvening ?? false
      }
    }).then((data: unknown) => {
      let typedData = data as bookMealResponse;
      return typedData;
    });
  }

  /** This method is used to get the week for a weekNumber.
   * @param hoteId The ID of the hote to get.
   * @param week The week number to get.
   * @param token The token of the user.
   */
  async getBookingWeek(hoteId: number, week: number, token: string): Promise<string> {
    return this.#manager.makeAuthRequest<bookingResponse>({
      method: "GET",
      url: endpoints.BOOKINGS(hoteId) + (week ? `?num=${week}` : ""),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as bookingResponse;
      return typedData.dateSemaine;
    });
  }
}
