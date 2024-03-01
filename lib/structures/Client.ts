import { RESTManager } from "../rest/RESTManager";
import * as endpoints from "../rest/endpoints";
import { TurboselfLoginBody, TurboselfLoginResponse } from "../types/Login";
import { User } from "../routes/User";
import { School } from "../routes/School";

export class Turboself {
  #manager: RESTManager;
  #user: User;
  #school: School;
  mail: string | null;
  password: string | null;
  token: string;
  token_expire: number;
  hoteId: number;
  userId: number;
  constructor(mail: string | null, password: string | null, token: string, hoteId: number, userId: number) {
    this.#manager = new RESTManager();
    this.#user = new User();
    this.#school = new School();
    this.mail = mail;
    this.password = password;
    this.token = token;
    this.token_expire = Date.now() + 3600000;
    this.hoteId = hoteId;
    this.userId = userId;
  }

  private async isExpire() {
    return Date.now() > this.token_expire;
  }

  private async refreshToken() {
    this.#manager.makeAuthRequest({
      method: "POST",
      url: endpoints.LOGIN(),
      data: {
        username: this.mail,
        password: this.password
      } as TurboselfLoginBody
    }).then((data: unknown) => {
      this.token = (data as TurboselfLoginResponse).access_token;
    });
  }

  public async getUser() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getUser(this.hoteId, this.token);
  }

  public async getHistory() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getHistory(this.hoteId, this.token);
  }

  public async getLastPayment() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getLastPayment(this.hoteId, this.token);
  }

  public async getSolds() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getSolds(this.hoteId, this.token);
  }

  public async getUserSchool() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#school.getUserSchool(this.hoteId, this.token);
  }

  public async getSchool(etabId: number) {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#school.getSchool(etabId);
  }

  public async getCurrentBookingWeek() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getCurrentBookingWeek(this.hoteId, this.token);
  }

  public async getCurrentBookingWeekNumber() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getCurrentBookingWeekNumber(this.hoteId, this.token);
  }

  public async getBookings(week?: number) {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getBookings(this.hoteId, this.token, week);
  }

  public async getBooksWeeksAvailable() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getBooksWeeksAvailable(this.hoteId, this.token);
  }

  public async getEveningBookingState() {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.getEveningBookingState(this.hoteId, this.token);
  }

  public async bookDay(state: number, weekNumber?: number, dayOfWeek?: number, bookEvening?: boolean) {
    if (await this.isExpire()) {
      if (this.mail && this.password) {
        await this.refreshToken();
      }
      else {
        throw new Error("Token Expired");
      }
    }

    return this.#user.bookDay(this.hoteId, this.token, state, weekNumber, dayOfWeek, bookEvening);
  }
}
