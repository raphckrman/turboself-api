/** REST/Endpoints */

export const LOGIN = () => "/api/v1/auth/login";

export const USER = (hoteId: number) => `/api/v1/hotes/${hoteId}`;
export const USER_BALANCES = (hoteId: number) => `/api/v1/comptes/hotes/${hoteId}/3`;
export const USER_HOME = (hoteId: number) => `/api/v2/hotes/${hoteId}/accueil`;

export const SCHOOL = (etabId: number) => `/api/v1/etablissements/etabId/${etabId}`;

export const BOOKINGS = (hoteId: number) => `/api/v1/reservations/hotes/${hoteId}/semaines`;
export const BOOK_DAY = (hoteId: number) => `/api/v2/hotes/${hoteId}/reservations-jours`;

export const EVENING = (hoteId: number) => `/api/v1/hotes/${hoteId}/resa-soir`;

export const SEARCHSCHOOL = (q: string, limit: number) => `/api/v1/etablissements?q=${q}&limit=${limit}`;
