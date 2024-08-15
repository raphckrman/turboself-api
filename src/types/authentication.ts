export interface rawAuthResult {
    /** Bearer token */
    access_token: string;
    /** ID of the account */
    userId: number;
    /** ID of the host */
    hoteId: number;
}

export interface AuthCredentials {
    /** Bearer Token */
    token: string;
    /** ID of the host */
    hostId: number;
    /** ID of the account */
    userId: number;
    /** Username used for authentication */
    username: string | null;
    /** Password used for authentication */
    password: string | null;
    /** Token expiration date */
    token_expiry: number;
}
