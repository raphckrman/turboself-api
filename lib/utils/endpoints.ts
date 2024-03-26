export const LOGIN = () => "/api/v1/auth/login";

export const SEARCH_ETABLISHMENT = (city: string, limit: number) => `/api/v1/etablissements?q=${city}&limit=${limit}`;
export const GET_ETABLISHMENT = (id: number) => `/api/v1/etablissements/etabId/${id}`;

export const GET_HOST = (id: number) => `/api/v1/hotes/${id}`
export const GET_HOST_BALANCE = (id: number) => `/api/v1/comptes/hotes/${id}/1`