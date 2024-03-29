import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ITicket} from "../../models/ITicket";
import updateResource from "../../shared/updateResource";
import TicketSchema from "../../models/TicketSchema";
import sendResponse from "../../shared/sendResponse";

export async function updateTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const {seatNumbers, to, from, isTicketCancelled} = req.body;
        const updatedTicket: ITicket | null = await updateResource<ITicket>(next, 'Ticket', TicketSchema, id, {
            seatNumbers, to, from, isTicketCancelled
        });
        if (!updatedTicket) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedTicket);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
