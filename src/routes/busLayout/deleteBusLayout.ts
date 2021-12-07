import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IBusLayout} from "../../models/IBusLayout";
import deleteResource from "../../shared/deleteResource";
import BusLayoutSchema from "../../models/BusLayoutSchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteBusLayout(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const id: string = req.params.id;
        const deletedLayout: IBusLayout | null = await deleteResource<IBusLayout>(dbConnection, 'BusLayout', BusLayoutSchema, id);
        if (!deletedLayout) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedLayout);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
