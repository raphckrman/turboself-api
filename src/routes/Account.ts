import { RestManager } from "../rest/RESTManager";
import { rawPasswordChangeResult, rawRequestPasswordResetResult } from "../types/account";
import { AUTH_PASSWORD_CHANGE, AUTH_PASSWORD_RESET } from "../rest/endpoints";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const requestPasswordReset = async (email: string): Promise<boolean> => {
    const rawRequestPasswordReset = await manager.get<rawRequestPasswordResetResult>(AUTH_PASSWORD_RESET(email));
    if (rawRequestPasswordReset.rejected.length !== 0) {
        throw new Error(`Failed to send password reset email to ${rawRequestPasswordReset.rejected.join(", ")}`);
    }
    return true;
};

export const editPassword = async (user: number, actualPassword: string, password: string, token: string): Promise<string> => {
    const rawPasswordChange = await manager.put<rawPasswordChangeResult>(AUTH_PASSWORD_CHANGE(), {
        id:          user,
        password:    actualPassword,
        newPassword: password
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return rawPasswordChange.token;
};
