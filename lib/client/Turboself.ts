import { getHost } from "../api/hostGet";
import { AuthFlowData } from "../interfaces/AuthFlow";
import { Host } from "../parser/Host";

export default class Turboself {
    constructor(
        public token: string,
        private loginData: AuthFlowData
    ) {
        this.token = token;
    }

    public async getHost(): Promise<Host> {
        return await getHost(this.token, this.loginData.hoteId);
    }
}