import { EtablishmentGetResult } from "../interfaces/Establishment";
import { Establishment } from "../parser/Establishment";
import { GET_ETABLISHMENT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getEtablishment = async (id: number): Promise<Establishment> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_ETABLISHMENT(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const raw = await response.json() as EtablishmentGetResult;

  return new Establishment(
    raw.code2p5,
    raw.nom,
    raw.versionTS,
    raw.id,
    raw.idTurboself,

    raw.currencySymbol,
    raw.configuration?.nbRepasMini ?? 0,
    raw.configuration?.creanceMini?? 0,
    raw.configuration?.montantCreditMini?? 0,

    raw.configuration?.msgAccueil ?? "",

    raw.desactive,
    raw.numEtab,
    raw.pcServeur,
    raw.configurationsReservation?.map((data) => {
      return {
        id: data.id,
        usage: data.usage,
        elecom: data.elecom,
        endReservation: data.finReserv
      };
    }),
    {
      address1: raw.adr1 ?? "",
      address2: raw.adr2 ?? "",
      zipCode: raw.cp ?? "",
      city: raw.ville ?? ""
    },
    {
      phoneNumber: raw.tel ?? "",
      website: raw.configuration?.url ?? "",
      email: raw.configuration?.email ?? ""
    },
    {
      canStudentUseQrCode: raw.configuration?.autoriseQrCodeEleve?? false,
      canCompanionUseQrCode: raw.configuration?.autoriseQrCodeCommensal?? false,
      canInternUseQrCode: raw.configuration?.autoriseQrCodeStagiaire?? false,
      canStudentSeeHistory: raw.configuration?.cacherHistorique?? false
    },
    {
      firstSync: raw.datePremSynchro ?? "",
      lastSync: raw.dateDernSynchro ?? "",
      lastSelfSync: raw.configurationSelf?.dateDernSynchro ?? ""
    }
  );
};
