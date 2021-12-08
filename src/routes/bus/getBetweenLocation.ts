import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IBus} from "../../models/IBus";
import viewWithFilter from "../../shared/viewWithFilter";
import BusSchema from "../../models/BusSchema";
import sendResponse from "../../shared/sendResponse";

export async function getBetweenLocation(req: Request, res: Response, next: NextFunction) {
    try {
        const to: string = req.query.to as string;
        const from: string = req.query.from as string;
        const buses: IBus[] = await viewWithFilter<IBus>(next, 'Bus', BusSchema, {
            to,
            from
        });
        sendResponse(res, 200, buses);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
