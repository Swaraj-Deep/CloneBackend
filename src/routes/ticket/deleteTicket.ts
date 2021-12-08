import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ITicket} from "../../models/ITicket";
import deleteResource from "../../shared/deleteResource";
import TicketSchema from "../../models/TicketSchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteTicket(req: Request, res: Response, next: NextFunction) {
    try {
        let id: string = req.params.id;
        const deletedTicket: ITicket | null = await deleteResource<ITicket>(next, 'Ticket', TicketSchema, id);
        if (!deletedTicket) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedTicket);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
