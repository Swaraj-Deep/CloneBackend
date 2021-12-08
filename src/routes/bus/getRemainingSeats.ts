import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import viewWithFilter from "../../shared/viewWithFilter";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import sendResponse from "../../shared/sendResponse";

export async function getRemainingSeats(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const remainingSeatsArr: IBus[] = await viewWithFilter<IBus>(next, 'Bus', BusSchema, {
            _id: id,
        }, {
            _id: false,
            companyId: false,
            to: false,
            from: false,
            busType: false,
            timings: false,
            fare: false,
            totalSeats: false
        });
        if (remainingSeatsArr.length === 0) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, remainingSeatsArr[0].remainingSeats);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
