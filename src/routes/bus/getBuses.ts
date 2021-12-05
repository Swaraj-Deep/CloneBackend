import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import viewAll from "../../shared/viewAll";
import viewSingle from "../../shared/viewSingle";
import ErrorHandler from "../../errorHandling/errorHandler";
import sendResponse from "../../shared/sendResponse";

export async function getAllBuses(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const buses: IBus[] = await viewAll<IBus>(dbConnection, 'Bus', BusSchema);
        sendResponse(res, 200, buses);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const bus: IBus | null = await viewSingle<IBus>(dbConnection, 'Bus', BusSchema, id);
        if (!bus) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, bus);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
