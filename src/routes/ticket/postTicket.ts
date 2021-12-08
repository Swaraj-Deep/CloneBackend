import {Request, Response, NextFunction} from "express";
import {bookTickets} from "../../services/bookTickets";

export async function postTicket(req: Request, res: Response, next: NextFunction) {
    await bookTickets(req, res, next);
}
