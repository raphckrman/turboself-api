import { EtablishmentConfiguration, EtablishmentConfigurationReservation, EtablishmentConfigurationSelf } from "./Establishment";

export interface BookingWeekGetResult {
  rsvWebDto: Array<WeekBooking>,
  numSemaines: Array<number>,
  isResaSoirActive: boolean,
  dateSemaine: string
}

export interface WeekBooking {
  id: string,
  hote: {
    id: number
  },
  annee: number,
  semaine: number,
  borne: {
    id: number,
    code2p5: number,
    idOrig: number,
    lib: string
    prix: Array<BookingPrice>
  },
  joursAutorises: number,
  jours: DayBooking[]
  usage: number
}

export interface DayBooking {
  dayReserv: number,
  reservDernSynchro: number,
  dayOfWeek: number,
  web: {
    id: number
  },
  autorise: boolean,
  msg: string,
  dayLabel: string
}

export interface BookingPrice {
  id: number,
  borneId: number,
  usage: number,
  prix: number,
  idOrig: number
}

export interface BookMealPut {
  dayReserv: number,
  reservHorsKiosk: number,
  reservDernSynchro: number,
  web: {
    id: string,
    annee: number,
    semaine: number,
    borneId: number,
    jourAutorises: number,
    usage: number,
    hote:{
      id: number
      idOrig: number,
      /** Host Surname */
      nom: string,
      /** Host First Name */
      prenom: string,
      /** Host Payment Mode */
      mode: string,
      /** Quality of the host in the establishment */
      qualite: string
      /** Division of the host in the establishment */
      division: string,
      /** Price of a meal in cent */
      prixDej: number
      type: number,
      /** Last Synchronisation to Turboself */
      dateDernSynchro: string
      /** If the host account is disabled */
      desactive: boolean,
      /** If the password is private (wtf?) */
      mdpPrive: boolean,
      /** If the host has the right to book a meal even if its balance is insufficient */
      autoriseReservSoldeIns: boolean,
      profilForfaitModule: number,
      oldLogin: unknown,
      /** QRCode */
      carteCodee: number | null
      etab: {
        /** 2P5 Code */
        code2p5: string;
        /** Establishment Name */
        nom: string;
        /** TurboSelf etablishment Version */
        versionTS: string;
        /** Etablishment Identifier */
        id?: number;
        /** Etablishment Address 1 */
        adr1?: string;
        /** Etablishment Address 2 */
        adr2?: string;
        /** Postal Code of the etablishment */
        cp?: string;
        /** City of the etablishment */
        ville?: string;
        /** Phone Number of the etablishment */
        tel?: string;
        fax?: string;
        /** First etablishment synchronisation to Turboself */
        datePremSynchro?: string;
        /** Last etablishment synchronisation to Turboself */
        dateDernSynchro?: string;
        /** Turboself Identifier */
        idTurboself?: number;
        /** Currency symbol used by the etablishment */
        currencySymbol?: string;
        configuration?: EtablishmentConfiguration;
        configurationsReservation?: Array<EtablishmentConfigurationReservation>
        configurationSelf?: EtablishmentConfigurationSelf
        /** UAI (Unité Administrative Immatriculée) of the etablishment*/
        numEtab?: string;
        /** Etablishment is desactivated ? */
        desactive?: boolean;
        /** MAC Address of the etablishment's server */
        pcServeur?: string;
        /** Max authorized transactions */
        nbTransactionAutorise?: number;
        /** Total Reservations */
        nbReservationsTotal?: number;
        /** URL of the logo */
        logoUrl?: string;
        /** Teambox server IP */
        ipTeamBox?: string;
        /** Maybe VAD identifier (Vente à Distance) */
        numCtraVAD?: string;
        customIDPayment?: string;
        etatAlerteTransaction: string;
        /** Number of meal booked */
        nbReservationRealise?: number;
        timeZone?: string;
        joursOuvres?: number;
        emailCreationCompte?: string;
      }
    }
  }
  rsvwebid: string;
  dayOfWeek: number;
  msg: string;
  id: string;
}
