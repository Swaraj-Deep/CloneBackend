import {ITicket} from "../models/ITicket";
import {Ticket} from "../models/classes/Ticket";
import {IBus} from "../models/IBus";
import viewWithFilter from "../shared/viewWithFilter";
import BusSchema from "../models/BusSchema";
import ErrorHandler from "../errorHandling/errorHandler";
import updateResource from "../shared/updateResource";
import createResource from "../shared/createResource";
import TicketSchema from "../models/TicketSchema";
import sendResponse from "../shared/sendResponse";
import {NextFunction, Request, Response} from "express";

export async function bookTickets(req: Request, res: Response, next: NextFunction) {
    try {
        const {userId, busId, seatNumbers, dateOfJourney, timeOfJourney, to, from, isTicketCancelled} = req.body;
        const ticketFromUI: ITicket = new Ticket(busId, dateOfJourney, seatNumbers, timeOfJourney, userId, from, to, isTicketCancelled);
        const buses: IBus[] = await viewWithFilter<IBus>(next, 'Bus', BusSchema, {
            _id: busId
        });
        if (buses.length == 0) {
            next(new ErrorHandler(404, `No Resource found with id = ${busId}`));
            return;
        }
        const expectedSeatsToBeBooked: string[] = ticketFromUI.seatNumbers;
        const alreadyBookedSeats: string[] = buses[0].alreadyBookedSeats;
        let seatFound: boolean = false;
        for (let expectedSeat of expectedSeatsToBeBooked) {
            for (let seat of alreadyBookedSeats) {
                if (expectedSeat === seat) {
                    seatFound = true;
                    break;
                }
            }
            if (seatFound) {
                break;
            }
        }
        if (!seatFound) {
            const updatedBookedSeats: string[] = [...expectedSeatsToBeBooked, ...alreadyBookedSeats];
            const remainingSeats: number = buses[0].remainingSeats;
            if (remainingSeats >= ticketFromUI.seatNumbers.length) {
                await updateResource<IBus>(next,'Bus', BusSchema, busId, {
                    remainingSeats: remainingSeats - ticketFromUI.seatNumbers.length,
                    alreadyBookedSeats: updatedBookedSeats
                });
                try {
                    const createdTicket: ITicket = await createResource<ITicket>(next, 'Ticket', TicketSchema, ticketFromUI);
                    sendResponse(res, 201, createdTicket);
                } catch (err: any) {
                    await updateResource<IBus>(next, 'Bus', BusSchema, busId, {
                        remainingSeats: remainingSeats,
                        alreadyBookedSeats
                    });
                    next(new ErrorHandler(500, `It seems that we are having some trouble booking the tickets.\n Do not worry we are on it`));
                    return;
                }
            } else {
                next(new ErrorHandler(406, `Seats are not available.`));
            }
        } else {
            next(new ErrorHandler(406, `One or more seats are already booked`));
        }
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    }
}
