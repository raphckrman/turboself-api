export const LOGIN = () => "/api/v1/auth/login";

export const SEARCH_ETABLISHMENT = (city: string, limit: number) => `/api/v1/etablissements?q=${city}&limit=${limit}`;
export const GET_ETABLISHMENT = (id: string) => `/api/v1/etablissements/etabId/${id}`;