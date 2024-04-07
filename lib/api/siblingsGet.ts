import { HostGetResult } from "../interfaces/Host";
import { Establishment } from "../parser/Establishment";
import { Host } from "../parser/Host";
import { GET_SIBLINGS } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getSiblings = async (token: string, id: number): Promise<Host[]> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_SIBLINGS(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const raw = await response.json() as HostGetResult[];

  const result = raw.map((data) => {
    let establishment = new Establishment(
      data.etab.code2p5,
      data.etab.nom,
      data.etab.versionTS,
      data.etab.id,
      data.etab.idTurboself,

      data.etab.currencySymbol,
      data.etab.configuration?.nbRepasMini ?? 0,
      data.etab.configuration?.creanceMini?? 0,
      data.etab.configuration?.montantCreditMini?? 0,

      data.etab.configuration?.msgAccueil ?? "",

      data.etab.desactive,
      data.etab.numEtab,
      data.etab.pcServeur,
      data.etab.configurationsReservation?.map((data) => {
        return {
          id: data.id,
          usage: data.usage,
          elecom: data.elecom,
          endReservation: data.finReserv
        };
      }),
      {
        address1: data.etab.adr1 ?? "",
        address2: data.etab.adr2 ?? "",
        zipCode: data.etab.cp ?? "",
        city: data.etab.ville ?? ""
      },
      {
        phoneNumber: data.etab.tel ?? "",
        website: data.etab.configuration?.url ?? "",
        email: data.etab.configuration?.email ?? ""
      },
      {
        canStudentUseQrCode: data.etab.configuration?.autoriseQrCodeEleve?? false,
        canCompanionUseQrCode: data.etab.configuration?.autoriseQrCodeCommensal?? false,
        canInternUseQrCode: data.etab.configuration?.autoriseQrCodeStagiaire?? false,
        canStudentSeeHistory: data.etab.configuration?.cacherHistorique?? false
      },
      {
        firstSync: data.etab.datePremSynchro ?? "",
        lastSync: data.etab.dateDernSynchro ?? "",
        lastSelfSync: data.etab.configurationSelf?.dateDernSynchro ?? ""
      }
    );

    return new Host(
      data.id,
      data.prenom,
      data.nom,
      data.qualite,
      data.division,
      data.prixDej,
      establishment,
      {
        canPay: data.droitPaiement ?? false,
        canBookMeal: data.droitReservation ?? false,
        canBookCafeteria: data.droitCafeteria ?? false,
        canBookIfBalanceInsufficient: data.autoriseReservSoldeIns?? false
      },
      {
        lastSync: data.dateDernSynchro ?? ""
      },
      data.carteCodee ?? -1
    );
  });

  return result;
};
