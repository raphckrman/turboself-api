import { AuthFlowData } from "../interfaces/AuthFlow";

export default class Turboself {
    constructor(
        public token: string,
        private loginData: AuthFlowData
    ) {
        this.token = token;
    }
}