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
    /** Firstname of the Host */
    public firstname: string,
    /** Lastname of the Host */
    public lastname: string,
    /** Quality of the Host */
    public quality: string,
    /** Division of the Host */
    public division: string,
    /** Meal price of the Host in cents */
    public mealPrice: number,
    public etablishment: Establishment,
    public permissions?: {
      /** If the host can add funds */
      canPay: boolean,
      /** If the host can book a meal */
      canBookMeal: boolean,
      /** If the host can book a meal at cafeteria */
      canBookCafeteria: boolean,
      /** If the host can book a meal even if its balance is insufficient */
      canBookIfBalanceInsufficient: boolean
    },
    public SynchronizationDate?: {
      lastSync: string
    },
    /** Code used to identify the card, not null if QRCode is enabled */
    public cardCode?: number,
    public token?: string
  ) {
    this.token = token;
    if (cardCode && cardCode<0) delete this.cardCode;
  }

  /** This method is used to get the balance of the host.
     */
  public async getBalance(): Promise<Balance> {
    if (this.token) return await getBalance(this.token, this.id);
    throw new Error("You need to login to this account first");
  }

  /** This method is used to get the siblings of the host.
    */
  public async getSiblings(): Promise<Host[]> {
    if (this.token) return await getSiblings(this.token, this.id);
    throw new Error("You need to login to this account first");
  }

  /** This method is used to get the history of the host.
    */
  public async getHistory(): Promise<History[]> {
    if (this.token) return await getHistory(this.token, this.id);
    throw new Error("You need to login to this account first");
  }

  /** This method is used to get the latest payment of the host.
    */
  public async getLatestPayment(): Promise<LatestPayment> {
    if (this.token) return await getLatestPayment(this.token, this.id);
    throw new Error("You need to login to this account first");
  }
}
