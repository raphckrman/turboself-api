/** @class Host */

import { AccountTypes } from "../constants";

export class Host {
  constructor(
    /** Internal identifier of the host on the digital space */
    public id: number,
    /** Internal identifier of the host in the TurboSelf local database */
    public localId: number,
    public etabId: number,
    /** First name of the host */
    public firstName: string,
    /** Last name of the host */
    public lastName: string,
    /** Host mode */
    public mode: "Argent" | "Forfait",
    /** Host quality */
    public quality: string,
    /** Host's Class */
    public division: string,
    /** Lunch Price */
    public lunchPrice: number,
    /** Type of host (Student or Commensal or Trainee) */
    public type: AccountTypes,
    /** Host coded card number */
    public cardNumber: number,
    /** Access URL for Cafeteria pre-order */
    public cafeteriaUrl: string | null,
    public permissions: {
      /** Does the student have the right to payment in the digital space? */
      payment?: boolean;
      /** Does the student have the right to reservation on the digital space? */
      reservation?: boolean;
      /** Is the student entitled to pre-order Cafeteria on the digital space? */
      cafeteria?: boolean;
      /** Is the host allowed to book if their balance is insufficient? */
      bookWithNegativeBalance?: boolean;
      /** Number of passages or reservations authorized at the Self for a service */
      maxPassages?: number;
    }
  ) {

  }


}
