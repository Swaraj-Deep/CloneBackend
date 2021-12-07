import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import {ILocation} from "../../models/ILocation";
import {Location} from "../../models/classes/Location";
import LocationSchema from "../../models/LocationSchema";
import sendResponse from "../../shared/sendResponse";
import ErrorHandler from "../../errorHandling/errorHandler";
import {NextFunction, Request, Response} from "express";
import deleteResource from "../../shared/deleteResource";

export async function deleteLocation(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const deletedLocation: ILocation | null = await deleteResource<ILocation>(dbConnection, 'Location', LocationSchema, id);
        if (!deletedLocation) {
            next(new ErrorHandler(404, `No Resource found with id =${id}`));
            return;
        }
        sendResponse(res, 201, deletedLocation);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
