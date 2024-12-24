import { RestManager } from "../rest/RESTManager";
import {
    HOST,
    HOST_BALANCE,
    HOST_BOOK_EVENING,
    HOST_BOOK_MEAL,
    HOST_HISTORY_GLOBAL,
    HOST_HISTORY_SPECIFIC,
    HOST_INIT_PAYMENT,
    HOST_PAYMENTS_LATEST,
    HOST_RESERVATIONS,
    HOST_SIBLINGS
} from "../rest/endpoints";
import { Host } from "../structures/Host";
import {
    rawBookingResult,
    rawBookResult,
    rawHistoryGet,
    rawHostBalanceResult,
    rawHostResult,
    rawPaymentInitResult
} from "../types/host";
import { Balance } from "../structures/Balance";
import { Payment } from "../structures/Payment";
import { HistoryEvent } from "../structures/HistoryEvent";
import { rawPaymentResult } from "../types/payment";
import { Booking } from "../structures/Booking";
import { Terminal } from "../structures/Terminal";
import { BookingDay } from "../structures/BookingDay";
import { getWeekRange } from "../utils/weekRange";
import { transformToHost } from "../utils/transformers";

const manager = new RestManager("https://api-rest-prod.incb.fr/api");

export const getHost = async (token: string, hostId: number): Promise<Host> => {
    const rawHostGet = await manager.get<rawHostResult>(HOST(hostId), { Authorization: `Bearer ${token}` });

    return transformToHost(rawHostGet);
};

export const getBalances = async (token: string, hostId: number): Promise<Array<Balance>> => {
    const rawBalanceGet = await manager.get<Array<rawHostBalanceResult>>(HOST_BALANCE(hostId), { Authorization: `Bearer ${token}` });
    const balances: Array<Balance> = [];
    for (const balance of rawBalanceGet) {
        const dateString = balance.montantEstimeMsg
            ? balance.montantEstimeMsg.match(/(\d{2})\/(\d{2})\/(\d{4})/)?.slice(1, 4)
            : undefined;
        let date = new Date();
        if (dateString) {
            date = new Date(parseInt(dateString[2], 10), parseInt(dateString[1], 10) - 1, parseInt(dateString[0], 10));
        }
        balances.push(new Balance(
            balance.id,
            balance.hote.id,
            balance.appli.lib,
            balance.montant,
            balance.montantEstime,
            date
        ));
    }

    return balances;
};


export const initPayment = async (token: string, hostId: number, amount: number): Promise<Payment> => {
    const rawPaymentInit = await manager.post<rawPaymentInitResult>(HOST_INIT_PAYMENT(hostId), [{
        paiementPayline: {
            hote: {
                id: hostId
            }
        },
        montant: amount
    }], {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return new Payment(
        null,
        hostId,
        amount,
        "INIT",
        rawPaymentInit.token,
        rawPaymentInit.redirectURL,
        "https://espacenumerique.turbo-self.com/PagePaiementRefuse.aspx?token=" + rawPaymentInit.token,
        "https://espacenumerique.turbo-self.com/PagePaiementValide.aspx?token=" + rawPaymentInit.token,
        new Date()
    );
};

export const getHistory = async (token: string, hostId: number): Promise<Array<HistoryEvent>> => {
    const rawHistory = await manager.get<Array<rawHistoryGet>>(HOST_HISTORY_GLOBAL(hostId), { Authorization: `Bearer ${token}` });
    const history: Array<HistoryEvent> = [];
    for (const event of rawHistory) {
        history.push(new HistoryEvent(
            event.id,
            new Date(event.date),
            event.detail,
            (event.credit ?? 0) - (event.debit ?? 0)
        ));
    }

    return history;
};

export const getHistoryEvent = async (token: string, hostId: number, eventId: number): Promise<HistoryEvent> => {
    const rawHistory = await manager.get<rawHistoryGet>(HOST_HISTORY_SPECIFIC(hostId, eventId), { Authorization: `Bearer ${token}` });
    return new HistoryEvent(
        rawHistory.id,
        new Date(rawHistory.date),
        rawHistory.detail,
        (rawHistory.credit ?? 0) - (rawHistory.debit ?? 0)
    );
};

export const getLastPayment = async (token: string, hostId: number): Promise<Payment> => {
    const rawPayment = await manager.get<rawPaymentResult>(HOST_PAYMENTS_LATEST(hostId), { Authorization: `Bearer ${token}` });
    return new Payment(
        rawPayment.id,
        hostId,
        rawPayment.montant,
        rawPayment.statut,
        rawPayment.token,
        null,
        "https://espacenumerique.turbo-self.com/PagePaiementRefuse.aspx?token=" + rawPayment.token,
        "https://espacenumerique.turbo-self.com/PagePaiementValide.aspx?token=" + rawPayment.token,
        new Date(rawPayment.date)
    );
};

export const canBookEvening = async (token: string, hostId: number): Promise<boolean> => manager.get<boolean>(HOST_BOOK_EVENING(hostId), { Authorization: `Bearer ${token}` });

export const getBookings = async (token: string, hostId: number, week?: number): Promise<Array<Booking>> => {
    const rawBooking = await manager.get<rawBookingResult>(HOST_RESERVATIONS(hostId, week), { Authorization: `Bearer ${token}` });
    if (!rawBooking.rsvWebDto[0]) {
        throw new Error("No booking found for this week.");
    }
    const weekRange = getWeekRange(rawBooking.rsvWebDto[0].semaine, rawBooking.rsvWebDto[0].annee);
    const bookings = [];
    for (const rawBookingDto of rawBooking.rsvWebDto) {
        const days = [];

        for (const rawDay of rawBookingDto.jours) {
            days.push(new BookingDay(
                token,
                hostId,
                rawBookingDto.id,
                rawDay.dayReserv > 0,
                rawDay.autorise,
                rawDay.dayOfWeek,
                rawDay.msg || "",
                rawDay.dayReserv,
                new Date(weekRange.from.getTime() + (rawDay.dayOfWeek - 1) * 86400000)
            ));
        }

        bookings.push(new Booking(
            rawBookingDto.id,
            rawBookingDto.semaine,
            rawBookingDto.hote.id,
            weekRange.from,
            weekRange.to,
            new Terminal(
                rawBookingDto.borne.id,
                rawBookingDto.borne.idOrig,
                rawBookingDto.borne.code2p5,
                rawBookingDto.borne.lib,
                rawBookingDto.borne.prix.map(price => ({
                    id:      price.id,
                    localId: price.idOrig,
                    name:    price.lib,
                    price:   price.prix
                }))
            ),
            days
        ));
    }

    return bookings;
};

export const bookMeal = async (token: string, hostId: number, bookId: string, day: number, reservations = 1, bookEvening = false): Promise<BookingDay> => {
    const rawBook = await manager.post<rawBookResult>(HOST_BOOK_MEAL(hostId), {
        dayOfWeek: day,
        dayReserv: reservations,
        web:       {
            id: bookId
        },
        hasHoteResaSoirActive: bookEvening
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return new BookingDay(
        token,
        hostId,
        rawBook.id,
        rawBook.dayReserv > 0,
        true,
        rawBook.dayOfWeek,
        rawBook.msg || "",
        rawBook.dayReserv,
        new Date()
    );
};

export const getHostSiblings = async (token: string, hostId: number): Promise<Array<Host>> => {
    const rawSiblings = await manager.get<Array<rawHostResult>>(HOST_SIBLINGS(hostId), { Authorization: `Bearer ${token}` });
    const siblings: Array<Host> = [];
    for (const rawSibling of rawSiblings) {
        siblings.push(transformToHost(rawSibling));
    }

    return siblings;
};
