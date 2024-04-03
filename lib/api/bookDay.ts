import { BookMealPut } from "../interfaces/Bookings";
import { BookedMeal } from "../parser/BookedMeal";
import { Establishment } from "../parser/Establishment";
import { Host } from "../parser/Host";
import { GET_BOOKING_WEEK, PUT_BOOK_MEAL } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";
import { getWeekNumber } from "../utils/weekNumber";

export const bookMeal = async (token: string, id: number, bookId: string, book: number, bookEvening: number, day: number): Promise<BookedMeal> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + PUT_BOOK_MEAL(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      dayOfWeek: day,
      dayReserv: book,
      web: {
        id: bookId
      },
      hasHoteResaSoirActive: bookEvening
    })
  });


  const raw = await response.json() as BookMealPut;
  const establishment = new Establishment(
    raw.web.hote.etab.code2p5,
    raw.web.hote.etab.nom,
    raw.web.hote.etab.versionTS,
    raw.web.hote.etab.id,
    raw.web.hote.etab.idTurboself,

    raw.web.hote.etab.currencySymbol,
    raw.web.hote.etab.configuration?.nbRepasMini ?? 0,
    raw.web.hote.etab.configuration?.creanceMini?? 0,
    raw.web.hote.etab.configuration?.montantCreditMini?? 0,

    raw.web.hote.etab.configuration?.msgAccueil ?? "",

    raw.web.hote.etab.desactive,
    raw.web.hote.etab.numEtab,
    raw.web.hote.etab.pcServeur,
    raw.web.hote.etab.configurationsReservation?.map((data) => {
      return {
        id: data.id,
        usage: data.usage,
        elecom: data.elecom,
        endReservation: data.finReserv
      };
    }),
    {
      address1: raw.web.hote.etab.adr1 ?? "",
      address2: raw.web.hote.etab.adr2 ?? "",
      zipCode: raw.web.hote.etab.cp ?? "",
      city: raw.web.hote.etab.ville ?? ""
    },
    {
      phoneNumber: raw.web.hote.etab.tel ?? "",
      website: raw.web.hote.etab.configuration?.url ?? "",
      email: raw.web.hote.etab.configuration?.email ?? ""
    },
    {
      canStudentUseQrCode: raw.web.hote.etab.configuration?.autoriseQrCodeEleve?? false,
      canCompanionUseQrCode: raw.web.hote.etab.configuration?.autoriseQrCodeCommensal?? false,
      canInternUseQrCode: raw.web.hote.etab.configuration?.autoriseQrCodeStagiaire?? false,
      canStudentSeeHistory: raw.web.hote.etab.configuration?.cacherHistorique?? false
    },
    {
      firstSync: raw.web.hote.etab.datePremSynchro ?? "",
      lastSync: raw.web.hote.etab.dateDernSynchro ?? "",
      lastSelfSync: raw.web.hote.etab.configurationSelf?.dateDernSynchro ?? ""
    }
  );
  const host = new Host(
    raw.web.hote.id,
    raw.web.hote.prenom,
    raw.web.hote.nom,
    raw.web.hote.qualite,
    raw.web.hote.division,
    raw.web.hote.prixDej,
    establishment,
    undefined,
    {
      lastSync: raw.web.hote.dateDernSynchro ?? ""
    },
    raw.web.hote.carteCodee ?? -1,
    token
  );

  return new BookedMeal(
    raw.id,
    raw.dayReserv === 0 ? false : true,
    raw.reservHorsKiosk === 0 ? false : true,
    raw.reservDernSynchro === 0? false : true,
    raw.rsvwebid,
    raw.msg,
    host
  );
};
