import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IBusLayout} from "../../models/IBusLayout";
import updateResource from "../../shared/updateResource";
import BusLayoutSchema from "../../models/BusLayoutSchema";
import sendResponse from "../../shared/sendResponse";

export async function updateBusLayout(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        let id: string = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const {
            cabinSeats,
            columnArrangement,
            differenceInFare,
            numberOfRows,
            seatCountingStrategy,
            seatingArrangement,
            busType
        } = req.body;
        const updatedBusLayout: IBusLayout | null = await updateResource(dbConnection, 'BusLayout', BusLayoutSchema, id, {
            cabinSeats,
            columnArrangement,
            differenceInFare,
            numberOfRows,
            seatCountingStrategy,
            seatingArrangement,
            busType
        });
        if (!updatedBusLayout) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedBusLayout);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
