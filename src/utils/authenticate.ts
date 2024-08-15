import { RestManager } from "../rest/RESTManager";
import { AUTH_LOGIN } from "../rest/endpoints";
import { getEstablishment } from "../routes/Establishment";
import { getBalances, getHost } from "../routes/Host";
import { Client } from "../structures/Client";
import { rawAuthResult } from "../types/authentication";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const authenticateWithCredentials = async (
    username: string,
    password: string,
    remember = true,
    minimalist = false
): Promise<Client> => {
    const data = await manager.post<rawAuthResult>(AUTH_LOGIN(), {
        username,
        password
    });

    if (minimalist) {
        return new Client({
            token:        data.access_token,
            hostId:       data.hoteId,
            userId:       data.userId,
            username:     remember ? username : null,
            password:     remember ? password : null,
            token_expiry: Date.now() + 3300000
        });
    }

    const host = await getHost(data.access_token, data.hoteId);

    const [balance, establishment] = await Promise.all([
        getBalances(data.access_token, data.hoteId),
        getEstablishment(data.access_token, host.etabId)
    ]);

    return new Client({
        token:        data.access_token,
        hostId:       data.hoteId,
        userId:       data.userId,
        username:     remember ? username : null,
        password:     remember ? password : null,
        token_expiry: Date.now() + 3300000
    }, establishment, host, balance);
};
