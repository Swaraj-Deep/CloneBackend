import {NextFunction, Request, Response} from "express";
import {IBus} from "../../models/IBus";
import createResource from "../../shared/createResource";
import BusSchema from "../../models/BusSchema";
import Bus from "../../models/classes/Bus";
import ErrorHandler from "../../errorHandling/errorHandler";
import sendResponse from "../../shared/sendResponse";

export async function postBus(req: Request, res: Response, next: NextFunction) {
    try {
        const {companyId, fare, from, timings, to, totalSeats, remainingSeats, alreadyBookedSeats} = req.body;
        const busFromUI: IBus = new Bus(companyId, fare, from, timings, to, totalSeats, remainingSeats, alreadyBookedSeats);
        console.log(busFromUI);
        const createdBus: IBus = await createResource(next, 'Bus', BusSchema, busFromUI);
        sendResponse(res, 201, createdBus);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    }
}
