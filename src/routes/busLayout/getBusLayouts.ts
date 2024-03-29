import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IBusLayout} from "../../models/IBusLayout";
import viewAll from "../../shared/viewAll";
import BusLayoutSchema from "../../models/BusLayoutSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllBusLayouts(req: Request, res: Response, next: NextFunction) {
    try {
        const busLayouts: IBusLayout[] = await viewAll(next,'BusLayout', BusLayoutSchema);
        sendResponse(res, 200, busLayouts);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getSingleBusLayout(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const busLayout: IBusLayout | null = await viewSingle<IBusLayout>(next, 'BusLayout', BusLayoutSchema, id);
        if (!busLayout) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, busLayout);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
