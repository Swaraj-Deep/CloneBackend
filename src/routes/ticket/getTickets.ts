import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {ITicket} from "../../models/ITicket";
import viewAll from "../../shared/viewAll";
import TicketSchema from "../../models/TicketSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllTickets(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const tickets: ITicket[] = await viewAll<ITicket>(dbConnection, 'Ticket', TicketSchema);
        sendResponse(res, 200, tickets);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleTicket(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const id: string = req.params.id;
        const ticket: ITicket | null = await viewSingle<ITicket>(dbConnection, 'Ticket', TicketSchema, id);
        if (!ticket) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, ticket);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
