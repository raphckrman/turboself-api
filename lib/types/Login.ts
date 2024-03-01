export interface TurboselfLoginBody {
  /** E-Mail address used to access to the Turboself account */
  username: string;
  /** Password used to access to the Turboself account */
  password: string;
}

export interface TurboselfLoginResponse {
  /** Access token used to authenticate the user */
  access_token: string;
  /** ID of the user */
  userId: number;
  /** ID of the hotel */
  hoteId: number;
}
