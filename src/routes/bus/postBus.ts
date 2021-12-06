import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import {IBus} from "../../models/IBus";
import createResource from "../../shared/createResource";
import BusSchema from "../../models/BusSchema";
import Bus from "../../models/classes/Bus";
import connectToDB from "../../database/connectToDB";
import ErrorHandler from "../../errorHandling/errorHandler";
import sendResponse from "../../shared/sendResponse";

export async function postBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const {busType, companyId, fare, from, timings, to, totalSeats, remainingSeats} = req.body;
        const busFromUI: IBus = new Bus(busType, companyId, fare, from, timings, to, totalSeats, remainingSeats);
        console.log(busFromUI);
        const createdBus: IBus = await createResource(dbConnection, 'Bus', BusSchema, busFromUI);
        sendResponse(res, 201, createdBus);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
