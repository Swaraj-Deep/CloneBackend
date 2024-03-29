import ErrorHandler from "../../errorHandling/errorHandler";
import {NextFunction, Request, Response} from "express";
import {Location} from "../../models/classes/Location";
import {ILocation} from "../../models/ILocation";
import createResource from "../../shared/createResource";
import LocationSchema from "../../models/LocationSchema";
import sendResponse from "../../shared/sendResponse";

export async function postLocation(req: Request, res: Response, next: NextFunction) {
    try {
        const {streetName, district, state, country, landmark, zipcode} = req.body;
        const locationFromUI: ILocation = new Location(country, district, landmark, state, streetName, zipcode);
        const newLocation: ILocation = await createResource<ILocation>(next, 'Location', LocationSchema, locationFromUI);
        sendResponse(res, 201, newLocation);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    }
}
