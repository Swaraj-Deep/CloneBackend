import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {ILocation} from "../../models/ILocation";
import viewAll from "../../shared/viewAll";
import LocationSchema from "../../models/LocationSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllLocations(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const locations: ILocation[] = await viewAll<ILocation>(dbConnection, 'Location', LocationSchema);
        sendResponse(res, 200, locations);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleLocation(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const location: ILocation | null = await viewSingle<ILocation>(dbConnection, 'Location', LocationSchema, id);
        if (!location) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, location);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
