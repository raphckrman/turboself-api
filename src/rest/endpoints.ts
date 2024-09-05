/** REST/Endpoints */
export const BASE_URL = () => "https://api-rest-prod.incb.fr/api";

export const AUTH_LOGIN = () => "v1/auth/login";
export const AUTH_SIGNUP = () => "v1/creation-comptes";
export const AUTH_PASSWORD_RESET = (email: string) => `v1/utilisateurs/password?email=${email}`;
export const AUTH_PASSWORD_CHANGE = () => "v1/utilisateurs/password";

export const USER_BY_ID = (userId: number) => `v1/utilisateurs/${userId}`;
export const USER_BY_HOTE = (hostId: number) => `v1/utilisateurs/hotes/${hostId}`;

export const HOST = (hostId: number) => `v1/hotes/${hostId}`;
export const HOST_BALANCE = (hostId: number) => `v1/comptes/hotes/${hostId}/3`;
export const HOST_ACCOUNTS = (hostId: number) => `v2/hotes/${hostId}/comptes`;
export const HOST_SIBLINGS = (hostId: number) => `v1/hotes/${hostId}/freres-soeurs`;
export const HOST_BOOK_EVENING = (hostId: number) => `v1/hotes/${hostId}/resa-soir`;
export const HOST_HISTORY_GLOBAL = (hostId: number) => `v1/historiques/hotes/${hostId}`;
export const HOST_INIT_PAYMENT = (hostId: number) => `v2/hotes/${hostId}/paiements/init`;
export const HOST_PAYMENTS_LATEST = (hostId: number) => `v2/hotes/${hostId}/paiements-payline/latest`;
export const HOST_HISTORY_SPECIFIC = (hostId: number, eventId: number) => `v2/hotes/${hostId}/historiques/${eventId}`;
export const HOST_RESERVATIONS = (hostId: number, week?: number) => `v1/reservations/hotes/${hostId}/semaines${"?num=" + week || ""}`;
export const HOST_RESERVATIONS_SPECIFIC = (hostId: number, reservationId: string) => `v2/hotes/${hostId}/reservations/${reservationId}`;
export const HOST_BOOK_MEAL = (hostId: number) => `v2/hotes/${hostId}/reservations-jours`;

export const ESTABLISHMENT_BY_CODE = (code: string) => `v2/etablissements?code2p5=${code}`;
export const ESTABLISHMENT_BY_ID = (establishmentId: number) => `v1/etablissements/etabId/${establishmentId}`;
export const ESTABLISHMENT_SEARCH = (query: string, code: string, limit: number) => `v1/etablissements?q=${query}&code2p5=${code}&limit=${limit}`;

export const TERMINALS_BY_ID = (terminalId: number) => `v1/bornes/${terminalId}`;

export const PAYMENTS_SPECIFIC = (paymentToken: string) => `v1/paiements-payline/${paymentToken}`;
