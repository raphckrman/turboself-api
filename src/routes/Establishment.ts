import { RestManager } from "../rest/RESTManager";
import { ESTABLISHMENT_BY_CODE, ESTABLISHMENT_BY_ID, ESTABLISHMENT_SEARCH } from "../rest/endpoints";
import { Establishment } from "../structures/Establishment";
import { rawEstablishmentResult, rawEstablishmentSearchResult } from "../types/establishment";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const searchEstablishments = async (query: string, code = "", limit = 10, minimalist = false, token?: string): Promise<Array<Establishment>> => {
    const rawEstablishmentSearch = await manager.get<Array<rawEstablishmentSearchResult>>(ESTABLISHMENT_SEARCH(query, code, limit));

    const establishments: Array<Establishment> = [];
    if (token && !minimalist) {
        for (const establishment of rawEstablishmentSearch) {
            establishments.push(await getEstablishmentBy2P5(token, establishment.code2p5));
        }
    } else {
        for (const establishment of rawEstablishmentSearch) {
            establishments.push(new Establishment(
                0,
                establishment.nom || "N/A",
                "€",
                establishment.code2p5 || null,
                null,
                null,
                "You're not logged in, so you can't access this establishment's full data.",
                0,
                0,
                0,
                [],
                {
                    city:     "N/A",
                    address:  "N/A",
                    postcode: "N/A"
                },
                {
                    phoneNumber: null,
                    faxNumber:   null,
                    email:       null,
                    website:     null
                },
                {
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
                {
                    id:         null,
                    entCode:    null,
                    entName:    null,
                    serveurCas: null,
                    service:    null
                },
                {
                    firstSync: new Date(0),
                    lastSync:  new Date(0)
                }
            ));
        }
    }


    return establishments;
};

export const getEstablishmentBy2P5 = async (token: string, code2p5: string): Promise<Establishment> => {
    const rawEstablishmentGet = await manager.get<Array<rawEstablishmentResult>>(ESTABLISHMENT_BY_CODE(code2p5), {
        Authorization: `Bearer ${token}`
    });
    if (rawEstablishmentGet.length === 0) {
        throw new Error("Establishment not found");
    }
    const establishment = rawEstablishmentGet[0];
    return new Establishment(
        establishment.id,
        establishment.nom || "N/A",
        establishment.currencySymbol || "€",
        establishment.code2p5 || null,
        establishment.logoUrl || null,
        establishment.numEtab || null,
        establishment.configuration?.msgAccueil || "",
        establishment.configuration?.nbRepasMini || 0,
        establishment.configuration?.creanceMini || 0,
        establishment.configuration?.montantCreditMini || 0,
        establishment.configuration?.fermetures?.map(closure => ({
            id:      closure.id,
            canBook: !closure.rsv,
            canPay:  !closure.paiement,
            from:    new Date(closure.du),
            to:      new Date(closure.au)
        })) || [],
        {
            city:     establishment.ville,
            address:  establishment.adr1 + " " + rawEstablishmentGet[0].adr2,
            postcode: establishment.cp
        },
        {
            phoneNumber: establishment.tel || null,
            faxNumber:   establishment.fax || null,
            email:       establishment.configuration?.email || null,
            website:     establishment.configuration?.url || null
        },
        {
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
        },
        {
            id:         establishment.configuration?.sso?.id || null,
            entCode:    establishment.configuration?.sso?.entCode || null,
            entName:    establishment.configuration?.sso?.entName || null,
            serveurCas: establishment.configuration?.sso?.serveurCas || null,
            service:    establishment.configuration?.sso?.service || null
        },
        {
            firstSync: new Date(establishment.datePremSynchro || 0),
            lastSync:  new Date(establishment.dateDernSynchro || 0)
        }
    );
};

export const getEstablishment = async (token: string, etabId: number): Promise<Establishment> => {
    const rawEstablishmentGet = await manager.get<rawEstablishmentResult>(ESTABLISHMENT_BY_ID(etabId), {
        Authorization: `Bearer ${token}`
    });
    return new Establishment(
        rawEstablishmentGet.id,
        rawEstablishmentGet.nom || "N/A",
        rawEstablishmentGet.currencySymbol || "€",
        rawEstablishmentGet.code2p5 || null,
        rawEstablishmentGet.logoUrl || null,
        rawEstablishmentGet.numEtab || null,
        rawEstablishmentGet.configuration?.msgAccueil || "",
        rawEstablishmentGet.configuration?.nbRepasMini || 0,
        rawEstablishmentGet.configuration?.creanceMini || 0,
        rawEstablishmentGet.configuration?.montantCreditMini || 0,
        rawEstablishmentGet.configuration?.fermetures?.map(closure => ({
            id:      closure.id,
            canBook: !closure.rsv,
            canPay:  !closure.paiement,
            from:    new Date(closure.du),
            to:      new Date(closure.au)
        })) || [],
        {
            city:     rawEstablishmentGet.ville,
            address:  rawEstablishmentGet.adr1 + " " + rawEstablishmentGet.adr2,
            postcode: rawEstablishmentGet.cp
        },
        {
            phoneNumber: rawEstablishmentGet.tel || null,
            faxNumber:   rawEstablishmentGet.fax || null,
            email:       rawEstablishmentGet.configuration?.email || null,
            website:     rawEstablishmentGet.configuration?.url || null
        },
        {
            maxReservationsStudentMoney:     rawEstablishmentGet.configurationSelf?.nbmultiElvArg || 0,
            maxReservationsStudentPackage:   rawEstablishmentGet.configurationSelf?.nbmultiElvFor || 0,
            maxReservationsCommensalMoney:   rawEstablishmentGet.configurationSelf?.nbmultiComArg || 0,
            maxReservationsCommensalPackage: rawEstablishmentGet.configurationSelf?.nbmultiComFor || 0,
            maxReservationsTraineeMoney:     rawEstablishmentGet.configurationSelf?.nbmultiStgArg || 0,
            maxReservationsTraineePackage:   rawEstablishmentGet.configurationSelf?.nbmultiStgFor || 0,
            qrCodeStudent:                   rawEstablishmentGet.configuration?.autoriseQrCodeEleve || false,
            qrCodeCommensal:                 rawEstablishmentGet.configuration?.autoriseQrCodeCommensal || false,
            qrCodeTrainee:                   rawEstablishmentGet.configuration?.autoriseQrCodeStagiaire || false,
            hideHistory:                     rawEstablishmentGet.configuration?.cacherHistorique || false
        },
        {
            id:         rawEstablishmentGet.configuration?.sso?.id || null,
            entCode:    rawEstablishmentGet.configuration?.sso?.entCode || null,
            entName:    rawEstablishmentGet.configuration?.sso?.entName || null,
            serveurCas: rawEstablishmentGet.configuration?.sso?.serveurCas || null,
            service:    rawEstablishmentGet.configuration?.sso?.service || null
        },
        {
            firstSync: new Date(rawEstablishmentGet.datePremSynchro || 0),
            lastSync:  new Date(rawEstablishmentGet.dateDernSynchro || 0)
        }
    );
};
