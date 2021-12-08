import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ILocation} from "../../models/ILocation";
import viewAll from "../../shared/viewAll";
import LocationSchema from "../../models/LocationSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllLocations(req: Request, res: Response, next: NextFunction) {
    try {
        const locations: ILocation[] = await viewAll<ILocation>(next,'Location', LocationSchema);
        sendResponse(res, 200, locations);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getSingleLocation(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const location: ILocation | null = await viewSingle<ILocation>(next, 'Location', LocationSchema, id);
        if (!location) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, location);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
