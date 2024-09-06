import { Establishment } from "../structures/Establishment";
import { rawEstablishmentResult, rawEstablishmentSearchResult } from "../types/establishment";

function isRawEstablishmentResult(establishment: rawEstablishmentResult | rawEstablishmentSearchResult): establishment is rawEstablishmentResult {
    return (establishment as rawEstablishmentResult).id !== undefined;
}

export function transformToEstablishment(establishment: rawEstablishmentResult | rawEstablishmentSearchResult): Establishment {
    return new Establishment(
        isRawEstablishmentResult(establishment) ? (establishment.id ?? 0) : 0,
        isRawEstablishmentResult(establishment) ? (establishment.nom || "N/A") : establishment.nom,
        isRawEstablishmentResult(establishment) ? (establishment.currencySymbol || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.code2p5 || null) : establishment.code2p5,
        isRawEstablishmentResult(establishment) ? (establishment.logoUrl || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.numEtab || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.pcServeur || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.msgAccueil || "") : "You are not logged in so you can't see all data",
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.nbRepasMini || 0) : null,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.creanceMini || 0) : null,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.montantCreditMini || 0) : null,
        isRawEstablishmentResult(establishment) ? (establishment.desactive || false) : null,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.fermetures?.map(closure => ({
            id:      closure.id,
            canBook: !closure.rsv,
            canPay:  !closure.paiement,
            from:    new Date(closure.du),
            to:      new Date(closure.au)
        })) || []) : [],
        isRawEstablishmentResult(establishment) ? ({
            city:     establishment.ville,
            address:  establishment.adr1 + " " + establishment.adr2,
            postcode: establishment.cp
        }) : {
            city:     null,
            address:  null,
            postcode: null
        },
        isRawEstablishmentResult(establishment) ? ({
            phoneNumber: establishment.tel || null,
            faxNumber:   establishment.fax || null,
            email:       establishment.configuration?.email || null,
            website:     establishment.configuration?.url || null
        }) : {
            phoneNumber: null,
            faxNumber:   null,
            email:       null,
            website:     null
        },
        isRawEstablishmentResult(establishment) ? ({
            maxReservationsStudentMoney:     establishment.configurationSelf?.nbmultiElvArg || null,
            maxReservationsStudentPackage:   establishment.configurationSelf?.nbmultiElvFor || null,
            maxReservationsCommensalMoney:   establishment.configurationSelf?.nbmultiComArg || null,
            maxReservationsCommensalPackage: establishment.configurationSelf?.nbmultiComFor || null,
            maxReservationsTraineeMoney:     establishment.configurationSelf?.nbmultiStgArg || null,
            maxReservationsTraineePackage:   establishment.configurationSelf?.nbmultiStgFor || null,
            qrCodeStudent:                   establishment.configuration?.autoriseQrCodeEleve || null,
            qrCodeCommensal:                 establishment.configuration?.autoriseQrCodeCommensal || null,
            qrCodeTrainee:                   establishment.configuration?.autoriseQrCodeStagiaire || null,
            hideHistory:                     establishment.configuration?.cacherHistorique || null
        }) : {
            maxReservationsStudentMoney:     null,
            maxReservationsStudentPackage:   null,
            maxReservationsCommensalMoney:   null,
            maxReservationsCommensalPackage: null,
            maxReservationsTraineeMoney:     null,
            maxReservationsTraineePackage:   null,
            qrCodeStudent:                   null,
            qrCodeCommensal:                 null,
            qrCodeTrainee:                   null,
            hideHistory:                     null
        },
        isRawEstablishmentResult(establishment) ? ({
            id:         establishment.configuration?.sso?.id || null,
            entCode:    establishment.configuration?.sso?.entCode || null,
            entName:    establishment.configuration?.sso?.entName || null,
            serveurCas: establishment.configuration?.sso?.serveurCas || null,
            service:    establishment.configuration?.sso?.service || null
        }) : {
            id:         null,
            entCode:    null,
            entName:    null,
            serveurCas: null,
            service:    null
        },
        isRawEstablishmentResult(establishment) ? ({
            firstSync: new Date(establishment.datePremSynchro || 0),
            lastSync:  new Date(establishment.dateDernSynchro || 0)
        }) : {
            firstSync: new Date(0),
            lastSync:  new Date(0)
        }
    );
}
