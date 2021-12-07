import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IBusLayout} from "../../models/IBusLayout";
import viewAll from "../../shared/viewAll";
import BusLayoutSchema from "../../models/BusLayoutSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllBusLayouts(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const busLayouts: IBusLayout[] = await viewAll(dbConnection, 'BusLayout', BusLayoutSchema);
        sendResponse(res, 200, busLayouts);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleBusLayout(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id: string = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const busLayout: IBusLayout | null = await viewSingle<IBusLayout>(dbConnection, 'BusLayout', BusLayoutSchema, id);
        if (!busLayout) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, busLayout);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
