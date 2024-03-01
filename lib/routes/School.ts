import { RESTManager } from "../rest/RESTManager";
import * as endpoints from "../rest/endpoints";
import { SchoolResponse } from "../types/School";
import { userResponse } from "../types/User";

export class School {
  #manager: RESTManager;

  constructor() {
    this.#manager = new RESTManager();
  }

  /** This method is used to get the user school informations.
     * @param hoteId The ID of the hote.
     */
  async getUserSchool(hoteId: number, token: string): Promise<SchoolResponse> {
    return this.#manager.makeAuthRequest<userResponse>({
      method: "GET",
      url: endpoints.USER(hoteId),
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((data: unknown) => {
      let typedData = data as userResponse;
      return typedData.etab;
    });
  }

  /** This method is used to get the school informations.
     * @param etabId The ID of the school.
     */
  async getSchool(etabId: number): Promise<SchoolResponse> {
    return this.#manager.makeAuthRequest<SchoolResponse>({
      method: "GET",
      url: endpoints.SCHOOL(etabId)
    }).then((data: unknown) => {
      let typedData = data as SchoolResponse;
      return typedData;
    });
  }
}
