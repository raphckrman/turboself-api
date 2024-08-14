import { AuthCredentials } from "../types/authentication";
import { Establishment } from "./Establishment";
import { Host } from "./Host";
import {Balance} from "./Balance";
import {getBalances, getHost, initPayment} from "../routes/Host";
import {getEstablishment, searchEstablishments} from "../routes/Establishment";
import {authenticateWithCredentials} from "../utils/authenticate";
import {Payment} from "./Payment";

export class Client {
  constructor(
    private credentials: AuthCredentials,
    public establishment?: Establishment,
    public host?: Host,
    public balances?: Array<Balance>
  ) {

  }
  private async refreshBearerToken(): Promise<boolean> {
    if (this.credentials.token_expiry > Date.now()) {
      return false;
    }

    if (!this.credentials.password || !this.credentials.username) {
      throw new Error("You need to provide a username and password to refresh the bearer token.");
    }
    let client = await authenticateWithCredentials(this.credentials.username, this.credentials.password, true, false);
    this.credentials = client.credentials;
    return true;
  }

  /** This method is used to get the host of the client.
   */
  public async getHost(): Promise<Host> {
    await this.refreshBearerToken();
    return await getHost(this.credentials.token, this.credentials.hostId);
  }

  /** This method is used to get the balances of the client.
   */
  public async getBalances(): Promise<Array<Balance>> {
    await this.refreshBearerToken();
    return await getBalances(this.credentials.token, this.credentials.hostId);
  }

  /** This method is used to get the establishment of the client.
     * @param establishmentId The establishment ID to get. If not provided, the establishment of the host will be returned.
     */
  public async getEstablishment(establishmentId?: number): Promise<Establishment> {
    await this.refreshBearerToken();
    if (!this.host && !establishmentId) {
      throw new Error("You need to provide an establishment ID to get the establishment. You can also disable the minimalist mode on authentication.");
    }
    return getEstablishment(this.credentials.token, establishmentId || this.host?.etabId!);
  }

  /** This method is used to search for establishments.
     * @param query The query to search for.
     * @param code The establishment code to search for.
     * @param limit The maximum number of establishments to return.
     * @param minimalist Whether to return only minimalist data or the full establishment data (more requests).
     */
  public async searchEstablishments(query: string, code: string, limit: number, minimalist: boolean = false): Promise<Array<Establishment>> {
    await this.refreshBearerToken();
    return await searchEstablishments(query, code, limit, minimalist, this.credentials.token);
  }

  /** This method is used to initialize a payment.
   * @param amount The amount
   */
  public async initPayment(amount: number): Promise<Payment> {
    await this.refreshBearerToken();
    return await initPayment(this.credentials.token, this.credentials.hostId, amount);
  }
}
