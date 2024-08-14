export interface Location {
  /** City of the establishment */
  city: string;
  /** Address of the establishment */
  address: string;
  /** Postcode of the establishment */
  postcode: string;
}

export interface Permissions {
  /** Maximum number of reservations per service for students in money mode */
  maxReservationsStudentMoney: number;
  /** Maximum number of reservations per service for students in package mode */
  maxReservationsStudentPackage: number;
  /** Maximum number of reservations per service for commensals in money mode */
  maxReservationsCommensalMoney: number;
  /** Maximum number of reservations per service for commensals in package mode */
  maxReservationsCommensalPackage: number;
  /** Maximum number of reservations per service for trainees in money mode */
  maxReservationsTraineeMoney: number;
  /** Maximum number of reservations per service for trainees in package mode */
  maxReservationsTraineePackage: number;
  /** Right for the QR Code for students */
  qrCodeStudent: boolean;
  /** Right for the QR Code for commensals */
  qrCodeCommensal: boolean;
  /** Right for the QR Code for trainees */
  qrCodeTrainee: boolean;
  /** Should we hide student history on the home page? */
  hideHistory: boolean;
}

export interface Contact {
  /** Phone number of the establishment */
  phoneNumber: string | null;
  /** Fax number of the establishment */
  faxNumber: string | null;
  /** Email of the establishment */
  email: string | null;
  /** Website of the establishment */
  website: string | null;
}

export interface Synchronisation {
  /** Date of the last synchronisation */
  firstSync: Date;
  /** Date of the next synchronisation */
  lastSync: Date;
}

export interface rawEstablishmentResult {
  /** Internal identifier of the establishment on the digital space */
  id: number;
  /** Address 1 of the establishment */
  adr1: string;
  /** Address 2 of the establishment */
  adr2: string;
  /** Postcode of the establishment */
  cp: string;
  /** City of the establishment */
  ville: string;
  /** Phone number of the establishment */
  tel?: string;
  /** Fax number of the establishment */
  fax?: string;
  /** Logo of the establishment */
  logoUrl?: string;
  /** Date of first sync of the establishment */
  datePremSynchro?: string;
  /** Date of last sync of the establishment */
  dateDernSynchro?: string;
  /** Public IP address of the Teambox */
  ipTeamBox?: string;
  /** Currency Symbol (eg. €) */
  currencySymbol?: string;
  configuration?: rawEstablishmentConfiguration;
  configurationsReservation?: rawEstablishmentReservationConfiguration[];
  configurationSelf?: rawEstablishmentConfigurationSelf;
  /** Establishment number */
  numEtab?: string;
  /** Is the establishment disabled in the digital space? */
  desactive?: boolean;
  /** MAC address of the TeamBox */
  pcServeur?: string;
  /** Number of authorized transactions */
  nbTransactionAutorise?: number;
  /** Total number of reservations */
  nbReservationsTotal?: number;
  /** Code2p5 of the establishment */
  code2p5?: string;
  /** Name of the establishment */
  nom?: string;
  /** Version of Turboself used by the establishment */
  versionTS?: string;
}

export interface rawEstablishmentSearchResult {
  /** Code2p5 of the establishment */
  code2p5: string;
  /** Name of the establishment */
  nom: string;
  /** Version of Turboself used by the establishment */
  versionTS: string;
}

export interface rawEstablishmentConfigurationSelf {
  /** Internal identifier of the configuration of an establishment on the digital space */
  id?: number;
  /** Maximum number of reservations per service for students in money mode */
  nbmultiElvArg?: number;
  /** Maximum number of reservations per service for students in plan mode */
  nbmultiElvFor?: number;
  /** Maximum number of reservations per service for commensals in money mode */
  nbmultiComArg?: number;
  /** Maximum number of reservations per service for commensals in plan mode */
  nbmultiComFor?: number;
  /** Maximum number of reservations per service for trainees in money mode */
  nbmultiStgArg?: number;
  /** Maximum number of reservations per service for trainees in plan mode */
  nbmultiStgFor?: number;
  /** Date of last sync of the configuration */
  dateDernSynchro?: string;
  /** Number of negative meals authorized for students */
  nbrepasnegElv?: number;
  /** Number of negative meals authorized for commensals */
  nbrepasnegCom?: number;
  /** Number of negative meals authorized for trainees */
  nbrepasnegStg?: number;
}

export interface rawEstablishmentConfiguration {
  /** Internal identifier of the configuration of an establishment on the digital space */
  id?: number;
  /** Url of the establishment's website*/
  url?: string;
  /** Email address for creating an account */
  emailCreationCompte?: string;
  /** Email of the establishment */
  email?: string;
  /** Minimum number of meals to credit the Self account */
  nbRepasMini?: number;
  /** Minimum claim to credit the plan account */
  creanceMini?: number;
  /** Minimum amount to credit the Self account */
  montantCreditMini?: number;
  /** Number of weeks of reservations displayed on the site or app */
  nbSemaineReserv?: number;
  jPlusN?: number;
  /** Greeting message on the home page */
  msgAccueil?: string;
  sso?: SSOConfiguration;
  /** Does the commensals have the right to use the QR Code? */
  autoriseQrCodeCommensal?: boolean;
  /** Does the students have the right to use the QR Code? */
  autoriseQrCodeEleve?: boolean;
  /** Does the trainees have the right to use the QR Code? */
  autoriseQrCodeStagiaire?: boolean;
  /** Should we hide student history on the home page? */
  cacherHistorique?: boolean;
  fermetures?: CloseConfiguration[];
}

export interface CloseConfiguration {
  /** Internal identifier of the reservation or payment closure configuration */
  id: number;
  /** Does the closure concern the reservation? */
  rsv?: boolean;
  /** Does the closure concern the payment? */
  paiement?: boolean;
  /** Closure start date */
  du: string;
  /*ù Closure end date */
  au: string;
  synchro?: boolean;
}

export interface SSOConfiguration {
  /** Internal identifier of Sso in the digital space */
  id?: number | null;
  /** ENT Code */
  entCode: string | null;
  /** ENT Name */
  entName: string | null;
  /** CAS Server URL */
  serveurCas: string | null;
  /** Service URL */
  service: string | null;
}

export interface rawEstablishmentReservationConfiguration {
  id?: number;
  usage?: number
  elecom?: number;
  finReserv?: string;
}

export interface Closure {
  /** Identifiant interne de la configuration de fermeture de la réservation ou du paiement */
  id: number;
  /** Does the closure concern the reservation? */
  canBook: boolean;
  /** Does the closure concern the payment? */
  canPay: boolean;
  /** Closure start date */
  from: Date;
  /** Closure end date */
  to: Date;
}
