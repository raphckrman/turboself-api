
export interface EtablishmentGetResult {
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
}

export interface EtablishmentConfiguration {
    id: number,
    /** URL of the website */
    url: string,
    /** E-Mail of the etablishment */
    email: string,
    /** Minium Meal to pay to add credits to an account */
    nbRepasMini: number,
    creanceMini: number
    /** Minimum amount of credits required to add credits on an account */
    montantCreditMini: number,
    nbSemaineReserv: number
    /** HTML Welcome Message */
    msgAccueil: string
    /** If a Student can use QRCode */
    autoriseQrCodeEleve: boolean,
    /** If a dinner companion can use QRCode */
    autoriseQrCodeCommensal: boolean,
    /** If an intern can use QRCode */
    autoriseQrCodeStagiaire: boolean,
    /** If the history is hidden */
    cacherHistorique: boolean,
    /** List of closed dates */
    fermetures: Array<ClosedElement>
}

export interface EtablishmentConfigurationReservation {
    id: number,
    usage: number,
    elecom: number,
    finReserv: string 
}

export interface EtablishmentConfigurationSelf {
    id: number,
    nbmultiElvArg: number,
    nbmultiElvFor: number,
    nbmultiComArg: number,
    nbmultiComFor: number,
    nbmultiStgArg: number,
    nbmultiStgFor: number,
    dateDernSynchro: string
}

export interface ClosedElement {
    id: number,
    /** Can Book ? */
    rsv: boolean,
    /** Can Pay ? */
    paiement: boolean,
    /** From */
    du: string,
    /** To */
    au: string
    /** Synchronisation Date */
    synchro: string
}