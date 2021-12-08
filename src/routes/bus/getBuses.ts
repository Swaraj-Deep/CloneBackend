import {Request, Response, NextFunction} from "express";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import viewAll from "../../shared/viewAll";
import viewSingle from "../../shared/viewSingle";
import ErrorHandler from "../../errorHandling/errorHandler";
import sendResponse from "../../shared/sendResponse";

export async function getAllBuses(req: Request, res: Response, next: NextFunction) {
    try {
        const buses: IBus[] = await viewAll<IBus>(next, 'Bus', BusSchema);
        sendResponse(res, 200, buses);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getSingleBus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const bus: IBus | null = await viewSingle<IBus>(next, 'Bus', BusSchema, id);
        if (!bus) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, bus);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
