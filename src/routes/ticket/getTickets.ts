import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ITicket} from "../../models/ITicket";
import viewAll from "../../shared/viewAll";
import TicketSchema from "../../models/TicketSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllTickets(req: Request, res: Response, next: NextFunction) {
    try {
        const tickets: ITicket[] = await viewAll<ITicket>(next, 'Ticket', TicketSchema);
        sendResponse(res, 200, tickets);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getSingleTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const ticket: ITicket | null = await viewSingle<ITicket>(next, 'Ticket', TicketSchema, id);
        if (!ticket) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, ticket);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
