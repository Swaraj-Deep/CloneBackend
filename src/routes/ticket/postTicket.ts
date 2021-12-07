import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {ITicket} from "../../models/ITicket";
import createResource from "../../shared/createResource";
import {Ticket} from "../../models/classes/Ticket";
import TicketSchema from "../../models/TicketSchema";
import sendResponse from "../../shared/sendResponse";

export async function postTicket(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const {userId, busId, seatNumbers, dateOfJourney, timeOfJourney, to, from, isTicketCancelled} = req.body;
        const ticketFromUI: ITicket = new Ticket(busId, dateOfJourney, seatNumbers, timeOfJourney, userId, from, to, isTicketCancelled);
        const createdTicket: ITicket = await createResource<ITicket>(dbConnection, 'Ticket', TicketSchema, ticketFromUI);
        sendResponse(res, 201, createdTicket);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
