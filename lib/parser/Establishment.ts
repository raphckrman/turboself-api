import { EtablishmentConfigurationReservation, EtablishmentConfigurationSelf } from "../interfaces/Establishment";

export class Establishment {
    constructor(
        public code: string,
        public name: string,
        public version: string,
        public id?: number | null,
        public turboselfId?: number,
        
        public currencySymbol?: string,
        public minimumMeal?: number,
        public minimumCreance?: number,
        public minimumCredit?: number,
        
        public welcomeMessage?: string,
        
        public disabled?: boolean,
        public uai?: string,
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
            phoneNumber?: string,
            website?: string,
            email?: string,
        },
        public permissions?: {
            canStudentUseQrCode?: boolean,
            canCompanionUseQrCode?: boolean,
            canInternUseQrCode?: boolean,
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