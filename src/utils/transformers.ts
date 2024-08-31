import { Establishment } from "../structures/Establishment";
import { rawEstablishmentResult, rawEstablishmentSearchResult } from "../types/establishment";

function isRawEstablishmentResult(establishment: rawEstablishmentResult | rawEstablishmentSearchResult): establishment is rawEstablishmentResult {
    return (establishment as rawEstablishmentResult).id !== undefined;
}

export function transformToEstablishment(establishment: rawEstablishmentResult | rawEstablishmentSearchResult): Establishment {
    return new Establishment(
        isRawEstablishmentResult(establishment) ? (establishment.id ?? 0) : 0,
        isRawEstablishmentResult(establishment) ? (establishment.nom || "N/A") : "N/A",
        isRawEstablishmentResult(establishment) ? (establishment.currencySymbol || "€") : "€",
        isRawEstablishmentResult(establishment) ? (establishment.code2p5 || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.logoUrl || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.numEtab || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.pcServeur || null) : null,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.msgAccueil || "") : "",
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.nbRepasMini || 0) : 0,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.creanceMini || 0) : 0,
        isRawEstablishmentResult(establishment) ? (establishment.configuration?.montantCreditMini || 0) : 0,
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
            city:     "N/A",
            address:  "N/A",
            postcode: "N/A"
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
            maxReservationsStudentMoney:     establishment.configurationSelf?.nbmultiElvArg || 0,
            maxReservationsStudentPackage:   establishment.configurationSelf?.nbmultiElvFor || 0,
            maxReservationsCommensalMoney:   establishment.configurationSelf?.nbmultiComArg || 0,
            maxReservationsCommensalPackage: establishment.configurationSelf?.nbmultiComFor || 0,
            maxReservationsTraineeMoney:     establishment.configurationSelf?.nbmultiStgArg || 0,
            maxReservationsTraineePackage:   establishment.configurationSelf?.nbmultiStgFor || 0,
            qrCodeStudent:                   establishment.configuration?.autoriseQrCodeEleve || false,
            qrCodeCommensal:                 establishment.configuration?.autoriseQrCodeCommensal || false,
            qrCodeTrainee:                   establishment.configuration?.autoriseQrCodeStagiaire || false,
            hideHistory:                     establishment.configuration?.cacherHistorique || false
        }) : {
            maxReservationsStudentMoney:     0,
            maxReservationsStudentPackage:   0,
            maxReservationsCommensalMoney:   0,
            maxReservationsCommensalPackage: 0,
            maxReservationsTraineeMoney:     0,
            maxReservationsTraineePackage:   0,
            qrCodeStudent:                   false,
            qrCodeCommensal:                 false,
            qrCodeTrainee:                   false,
            hideHistory:                     false
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
