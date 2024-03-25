import { EtablishmentConfigurationReservation, EtablishmentConfigurationSelf } from "../interfaces/Etablishment";

export class Etablishment {
    constructor(
        public code: string,
        public name: string,
        public version: string,
        public id?: number,
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
    }
}