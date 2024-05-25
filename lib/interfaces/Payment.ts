export interface PaymentInitPOSTResult {
  result: {
    code: string;
    shortMessage: string;
    longMessage: string;
  };
  token: string;
  redirectURL: string;
  _rawResponse: string;
}
