import {NextFunction, Request, Response} from "express";
import updateResource from "../../shared/updateResource";
import BusSchema from "../../models/BusSchema";
import {IBus} from "../../models/IBus";
import sendResponse from "../../shared/sendResponse";
import ErrorHandler from "../../errorHandling/errorHandler";

export async function updateBus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const {companyId, fare, from, timings, to, totalSeats, remainingSeats, alreadyBookedSeats} = req.body;
        const updatedBus: IBus | null = await updateResource(next, 'Bus', BusSchema, id, {
            companyId, fare, from, timings, to, totalSeats, remainingSeats, alreadyBookedSeats
        });
        if (!updatedBus) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedBus);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
