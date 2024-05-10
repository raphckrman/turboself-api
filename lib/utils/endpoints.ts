export const LOGIN = () => "/api/v1/auth/login";
export const SEND_PASSWORD_RESET_REQUEST = (email: string) => `/api/v1/utilisateurs/password?email=${email}`;

export const SEARCH_ETABLISHMENT = (city: string, limit: number) => `/api/v1/etablissements?q=${city}&limit=${limit}`;
export const GET_ETABLISHMENT = (id: number) => `/api/v1/etablissements/etabId/${id}`;

export const GET_HOST = (id: number) => `/api/v1/hotes/${id}`;
export const GET_HOST_BALANCE = (id: number) => `/api/v1/comptes/hotes/${id}/1`;
export const GET_HOST_HOME = (id: number) => `/api/v2/hotes/${id}/accueil`;
export const GET_HOST_CAN_BOOK_EVENING = (id: number) => `/api/v1/hotes/${id}/resa-soir`;

export const GET_SIBLINGS = (id: number) => `/api/v1/hotes/${id}/freres-soeurs`;

export const GET_BOOKING_WEEK = (id: number, weekNumber: number) => `/api/v1/reservations/hotes/${id}/semaines?num=${weekNumber}`;
export const PUT_BOOK_MEAL = (id: number) => `/api/v2/hotes/${id}/reservations-jours`;
