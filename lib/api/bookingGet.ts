import { BookingWeekGetResult } from "../interfaces/Bookings";
import { BookingDay } from "../parser/BookingDay";
import { BookingPrice } from "../parser/BookingPrice";
import { BookingTerminal } from "../parser/BookingTerminal";
import { BookingWeek } from "../parser/BookingWeek";
import { getWeekNumber } from "../utils/weekNumber";
import { GET_BOOKING_WEEK } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const getBookingWeek = async (token: string, id: number, weekNumber?: number): Promise<BookingWeek> => {
  if (!weekNumber) {
    weekNumber = getWeekNumber(new Date());
  }

  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + GET_BOOKING_WEEK(id, weekNumber ?? 0), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const raw = await response.json() as BookingWeekGetResult;
  const weekDate = new Date(raw.dateSemaine);
  const terminals =  await Promise.all(raw.rsvWebDto.map(async (terminal) => {
    let prices = terminal.borne.prix.map((price) => {
      return new BookingPrice(
        price.id,
        price.borneId,
        price.prix
      );
    });

    let days = await Promise.all(terminal.jours.map(async (day) => {
      let month = weekDate.getMonth();
      let dayNumber = parseInt(day.dayLabel.split(" ")[1])+1;
      let firstDayOfWeek = parseInt(terminal.jours[0].dayLabel.split(" ")[1]);

      if (firstDayOfWeek > dayNumber) {
        month = month+1;
      }
      let date = new Date(weekDate.getFullYear(), month, dayNumber);

      return new BookingDay(
        token,
        id,
        terminal.id,
        day.dayReserv === 0 ? false : true,
        day.reservDernSynchro === 0 ? false : true,
        day.autorise,
        day.msg ?? null,
        date
      );
    }));
    return new BookingTerminal(
      terminal.borne.id,
      terminal.id,
      terminal.annee,
      terminal.semaine,

      terminal.borne.lib,
      terminal.joursAutorises,
      terminal.usage,
      prices,
      days
    );
  }));

  return new BookingWeek(
    terminals,
    raw.numSemaines,
    raw.isResaSoirActive,
    weekDate
  );
};
