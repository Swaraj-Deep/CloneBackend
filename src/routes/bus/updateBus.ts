import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import updateResource from "../../shared/updateResource";
import BusSchema from "../../models/BusSchema";
import {IBus} from "../../models/IBus";
import sendResponse from "../../shared/sendResponse";
import ErrorHandler from "../../errorHandling/errorHandler";

export async function updateBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        const {busType, companyId, fare, from, timings, to, totalSeats, remainingSeats} = req.body;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const updatedBus: IBus | null = await updateResource(dbConnection, 'Bus', BusSchema, id, {
            busType, companyId, fare, from, timings, to, totalSeats, remainingSeats
        });
        if (!updatedBus) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedBus);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
