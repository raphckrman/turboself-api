export interface AuthFlowBody {
    /** Username of the user */
    username: string;
    /** Password of the user */
    password: string;
}

export interface AuthFlowResult {
    /** JWE Access Token, valid for 1 hour */
    access_token: string;
    /** Global identifier of the user */
    userId: number;
    /** Identifier of the user specific to the etablishment */
    hoteId: number;
}

export interface AuthFlowData {
    /** Global identifier of the user */
    userId: number;
    /** Identifier of the user specific to the etablishment */
    hoteId: number;
    /** Username of the user */
    username: string;
    /** Password of the user */
    password: string;
}