import { HostGetResult } from "../interfaces/Host";
import { Establishment } from "../parser/Establishment";
import { Host } from "../parser/Host";
import { GET_HOST, SEARCH_ETABLISHMENT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getHost = async (token: string, id: number): Promise<Host> => {
    const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_HOST(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const raw = await response.json() as HostGetResult
    const etablishment = new Establishment(
        raw.etab.code2p5,
        raw.etab.nom,
        raw.etab.versionTS,
        raw.etab.id,
        raw.etab.idTurboself,

        raw.etab.currencySymbol,
        raw.etab.configuration?.nbRepasMini ?? 0,
        raw.etab.configuration?.creanceMini?? 0,
        raw.etab.configuration?.montantCreditMini?? 0,

        raw.etab.configuration?.msgAccueil ?? '',

        raw.etab.desactive,
        raw.etab.numEtab,
        raw.etab.pcServeur,
        raw.etab.configurationsReservation?.map((data) => {
            return {
                id: data.id,
                usage: data.usage,
                elecom: data.elecom,
                endReservation: data.finReserv
            }
        }),
        {
            address1: raw.etab.adr1 ?? '',
            address2: raw.etab.adr2 ?? '',
            zipCode: raw.etab.cp ?? '',
            city: raw.etab.ville ?? ''
        },
        {
            phoneNumber: raw.etab.tel ?? '',
            website: raw.etab.configuration?.url ?? '',
            email: raw.etab.configuration?.email ?? ''
        },
        {
            canStudentUseQrCode: raw.etab.configuration?.autoriseQrCodeEleve?? false,
            canCompanionUseQrCode: raw.etab.configuration?.autoriseQrCodeCommensal?? false,
            canInternUseQrCode: raw.etab.configuration?.autoriseQrCodeStagiaire?? false,
            canStudentSeeHistory: raw.etab.configuration?.cacherHistorique?? false
        },
        {
            firstSync: raw.etab.datePremSynchro ?? '',
            lastSync: raw.etab.dateDernSynchro ?? '',
            lastSelfSync: raw.etab.configurationSelf?.dateDernSynchro ?? ''
        }
    );
    return new Host( 
        raw.id, 
        raw.prenom, 
        raw.nom, 
        raw.qualite, 
        raw.division, 
        raw.prixDej,
        etablishment,
        {
            canPay: raw.droitPaiement ?? false,
            canBookMeal: raw.droitReservation ?? false,
            canBookCafeteria: raw.droitCafeteria ?? false,
            canBookIfBalanceInsufficient: raw.autoriseReservSoldeIns?? false
        },
        {
            lastSync: raw.dateDernSynchro ?? ''
        },
        raw.carteCodee ?? -1,
        token
    )
};