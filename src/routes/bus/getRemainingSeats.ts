import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import viewWithFilter from "../../shared/viewWithFilter";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import sendResponse from "../../shared/sendResponse";

export async function getRemainingSeats(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const remainingSeatsArr: IBus[] = await viewWithFilter<IBus>(dbConnection, 'Bus', BusSchema, {
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
    } finally {
        await dbConnection.close();
    }
}