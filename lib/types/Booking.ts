import { userResponse } from "./User";

export interface bookingResponse {
  rsvWebDto: Array<bookings>,
  /** Number of weeks available */
  numSemaines: Array<number>,
  /** Is evening book are allowed */
  isResaSoirActive: boolean,
  /** Actual Week start in ISO-8601 */
  dateSemaine: string
}

export interface bookings {
  /** ID of the booking */
  id: string,
  hote: {
    /** ID of the hote */
    id: number
  },
  /**  Year of the current booking session */
  annee: number,
  /** Week of the current booking session */
  semaine: number,
  borne: {
    /** ID of the borne */
    id: number,
    /** 2p5 School Code */
    code2p5: number,
    /** Original ID of the borne */
    idOrig: number,
    /** Library used */
    lib: string,
    /** Prices of the borne */
    prix: Array<number>
  },
  /** Number of days allowed */
  joursAutorises: number,
  /** Days allowed */
  jours: Array<bookDay>
  usage: number
}

export interface bookDay {
  /** Is reserved ? 0 == false & 1 == true */
  dayReserv: number,
  /** Last synchronisation of this booking */
  reservDernSynchro: number,
  /** Day of the week */
  dayOfWeek: number,
  web: {
    /** ID of the day */
    id: number,
  },
  /** Is allowed ? */
  autorise: boolean,
  /** Day label displayed on MyTurboself */
  dayLabel: string,
}


export interface bookMealResponse {
  dayReserv: number,
  reservHorsKiosk: boolean,
  reservDernSynchro: number,
  web: {
    id: string,
    annee: number,
    semaine: number,
    borneId: number,
    joursAutorises: number,
    usage: number,
    hote: userResponse
  },
  rsvwebid: string,
  dayOfWeek: number,
  msg: string | null,
  id: string
}
