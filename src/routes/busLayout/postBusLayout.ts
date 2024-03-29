import {Request, Response, NextFunction} from "express";
import {BusLayout} from "../../models/classes/BusLayout";
import {IBusLayout} from "../../models/IBusLayout";
import createResource from "../../shared/createResource";
import BusLayoutSchema from "../../models/BusLayoutSchema";
import sendResponse from "../../shared/sendResponse";
import ErrorHandler from "../../errorHandling/errorHandler";

export async function postBusLayout(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            cabinSeats,
            columnArrangement,
            differenceInFare,
            numberOfRows,
            seatCountingStrategy,
            seatingArrangement,
            busType
        } = req.body;
        const busLayoutFromUI = new BusLayout(cabinSeats, columnArrangement, differenceInFare, numberOfRows, seatCountingStrategy, seatingArrangement, busType);
        const createdBusLayout: IBusLayout = await createResource<IBusLayout>(next, 'BusLayout', BusLayoutSchema, busLayoutFromUI);
        sendResponse(res, 201, createdBusLayout);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    }
}
