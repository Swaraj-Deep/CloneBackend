import {NextFunction, Request, Response} from "express";
import {cancelTicket} from "../../services/cancelTicket";

export async function cancelBookedTicket(req: Request, res: Response, next: NextFunction) {
    await cancelTicket(req, res, next);
}
