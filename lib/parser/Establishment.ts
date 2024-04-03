import { EtablishmentConfigurationReservation, EtablishmentConfigurationSelf } from "../interfaces/Establishment";

export class Establishment {
    constructor(
        public code: string,
        /** Name of the establishment */
        public name: string,
        /** Turboself Version used by the establishment */
        public version: string,
        /** Etablishment Identifier */
        public id?: number | null,
        /** TurboSelf etablishment Identifier */
        public turboselfId?: number,
        
        /** Currency symbol used by the establishment */
        public currencySymbol?: string,
        /** Minimum amount of meal for the establishment */
        public minimumMeal?: number,
        /** Minimum amount of creance for the establishment */
        public minimumCreance?: number,
        /** Minimum amount of credit for the establishment */
        public minimumCredit?: number,
        
        /** HTML Welcome Message */
        public welcomeMessage?: string,
        
        /** If the establishment is disabled */
        public disabled?: boolean,
        /** UAI Code (Unité Administrative Immatriculée) */
        public uai?: string,
        /** MAC Address of the establishment's TurboSelf server */
        public macServerAddress?: string,
        public reservations?: Array<{
            id: number,
            usage: number,
            elecom: number,
            endReservation: string
        }>,
        public geolocation?: {
            address1?: string,
            address2?: string,
            zipCode?: string,
            city?: string,
        },
        public contact?: {
            /** Establishment phone number */
            phoneNumber?: string,
            /** Establishment website */
            website?: string,
            /** Establishment email */
            email?: string,
        },
        public permissions?: {
            /** If the student can use the QR code for the establishment */
            canStudentUseQrCode?: boolean,
            /** If the dinner companion can use the QR code for the establishment */
            canCompanionUseQrCode?: boolean,
            /** If the intern can use the QR code for the establishment */
            canInternUseQrCode?: boolean,
            /** If the student can see the history of the establishment */
            canStudentSeeHistory?: boolean
        },
        public SynchronizationDate?: {
            firstSync: string,
            lastSync: string,
            lastSelfSync: string
        },
    ) {
        if(this.permissions?.canStudentSeeHistory !== undefined) {
            this.permissions.canStudentSeeHistory =!this.permissions.canStudentSeeHistory;
        }

        if (!id) delete this.id;
        if (!turboselfId) delete this.turboselfId;
        if (!currencySymbol) delete this.currencySymbol;
        if (!minimumMeal && minimumMeal !==0) delete this.minimumMeal;
        if (!minimumCreance && minimumCreance !==0) delete this.minimumCreance;
        if (!minimumCredit && minimumCredit !==0) delete this.minimumCredit;
        if (!welcomeMessage) delete this.welcomeMessage;
        if (!disabled) delete this.disabled;
        if (!uai) delete this.uai;
        if (!macServerAddress) delete this.macServerAddress;
        if (!reservations) delete this.reservations;
        if (!geolocation) delete this.geolocation;
        if (!contact) delete this.contact;
        if (!permissions) delete this.permissions;
        if (!SynchronizationDate) delete this.SynchronizationDate;
    }
}