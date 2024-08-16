import { rawEstablishmentResult } from "./establishment";
import { rawTerminalResult } from "./terminal";

export interface rawHostResult {
    /** Internal identifier of the host on the digital space */
    id: number;
    /** Internal identifier of the host in the TurboSelf local database */
    idOrig: number;
    /** Establishment attached to the host */
    etab: rawEstablishmentResult;
    /** Host's first name */
    nom: string;
    /** Host's last name */
    prenom: string;
    /** Host mode */
    mode: "Argent" | "Forfait";
    /** Host quality */
    qualite: string;
    /** Host's Class */
    division: string;
    /** Lunch Price */
    prixDej: number;
    /** Type of host (Student or Commensal or Trainee) */
    type: number;
    /** Number of passages or reservations authorized at the Self for a service */
    nbMulti: number;
    /** Does the student have the right to payment in the digital space? */
    droitPaiement: boolean;
    /** Does the student have the right to reservation on the digital space? */
    droitReservation: boolean;
    /** Is the student entitled to pre-order Cafeteria on the digital space? */
    droitCafeteria: boolean;
    /** Access URL for Cafeteria pre-order */
    urlCafeteria?: string;
    /** Host last sync date on digital space */
    dateDernSynchro: string;
    /** Is the host disabled? */
    desactive: boolean;
    /** Does the host have a private password? */
    mdpPrive: boolean;
    /** Is the host allowed to book if their balance is insufficient? */
    autoriseReservSoldeIns: boolean;
    /** Modulated package profile (bit fields) */
    profilForfaitModule: number;
    /** Host coded card number */
    carteCodee: number;
}

export interface rawHostBalanceResult {
    /** Internal identifier of a host's accounting in the digital space */
    id: number;
    /** Internal identifier of the accounting account in the digital space */
    compte: number;
    appli: {
    /** Internal identifier of the app in the digital space */
        id: number;
        /** TurboSelf identifier of the app in the local TurboSelf database */
        idOrig: number;
        /** App Label */
        lib: string;
    };
    hote: {
    /** Internal identifier of the host on the digital space */
        id: number;
    };
    /** Host account balance */
    montant: number;
    /** Estimated host account balance (taking into account future reservations and OK payments) */
    montantEstime: number;
    /** Estimated host account balance as a string */
    montantEstimeMsg: string;
}

export interface rawPaymentInitResult {
    result: {
        code: string;
        shortMessage: string;
        longMessage: string;
    };
    /** Payment Token */
    token: string;
    /** URL of the payment page */
    redirectURL: string;
    _rawResponse: string;
}

export interface rawHistoryGet {
    /** Internal identifier of a host's history in digital space */
    id: number;
    /** History date */
    date: string;
    /** Operation details */
    detail: string;
    /** Debit amount */
    debit: number | null;
    /** Credit amount */
    credit: number | null;
}

export interface rawBookingResult {
    rsvWebDto: Array<RsvWebWeekDto>;
    numSemaines: Array<number>;
    isResaSoirActive: boolean;
    dateSemaine: string;
}

export interface RsvWebWeekDto {
    id: string;
    hote: {
        id: number;
    };
    annee: number;
    semaine: number;
    borne: rawTerminalResult;
    joursAutorises: number;
    jours: Array<rawBookingDay>;
    usage: number;
}

export interface rawBookingDay {
    dayReserv: number;
    reservDernSynchro: number;
    dayOfWeek: number;
    web: {
        id: string;
    };
    autorise: boolean;
    msg?: string;
    dayLabel: string;
}

export interface rawBookResult {
    dayReserv: number;
    reservHorsKiosk: number;
    reservDernSynchro: number;
    web: {
        id: string;
        annee: number;
        semaine: number;
        borneId: number;
        joursAutorises: number;
        usage: number;
        hote: rawHostResult;
    };
    rsvwebid: string;
    dayOfWeek: number;
    msg: string;
    id: string;
}
