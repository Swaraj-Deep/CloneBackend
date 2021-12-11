import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../errorHandling/errorHandler";
import {ITicket} from "../models/ITicket";
import viewSingle from "../shared/viewSingle";
import TicketSchema from "../models/TicketSchema";
import {IBus} from "../models/IBus";
import BusSchema from "../models/BusSchema";
import updateWithFilter from "../shared/updateWithFilter";
import updateResource from "../shared/updateResource";
import sendResponse from "../shared/sendResponse";

export async function cancelTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const ticket: ITicket | null = await viewSingle<ITicket>(next, 'Ticket', TicketSchema, id);
        if (!ticket) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        if (ticket.isTicketCancelled) {
            next(new ErrorHandler(406, `This ticket is already cancelled.`));
            return;
        }
        const bookedSeats: string[] = ticket.seatNumbers;
        const bus: IBus | null = await viewSingle<IBus>(next, 'Bus', BusSchema, ticket.busId);
        if (!bus) {
            next(new ErrorHandler(404, `No Resource found with id = ${ticket.busId}`));
            return;
        }
        await updateResource<IBus>(next, 'Bus', BusSchema, ticket.busId, {
            remainingSeats: bus.remainingSeats + bookedSeats.length,
            alreadyBookedSeats: bus.alreadyBookedSeats.filter((seat) => {
                let seatFound: boolean = false;
                for (let bookedSeat of bookedSeats) {
                    if (bookedSeat === seat) {
                        seatFound = true;
                        break;
                    }
                }
                return !seatFound;
            })
        });
        await updateResource<ITicket>(next, 'Ticket', TicketSchema, id, {
            isTicketCancelled: true
        });
        sendResponse(res, 200, `Ticket cancelled successful!`);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
