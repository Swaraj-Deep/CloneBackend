import {ILocation} from "../../models/ILocation";
import {Location} from "../../models/classes/Location";
import LocationSchema from "../../models/LocationSchema";
import sendResponse from "../../shared/sendResponse";
import ErrorHandler from "../../errorHandling/errorHandler";
import {NextFunction, Request, Response} from "express";
import updateResource from "../../shared/updateResource";

export async function updateLocation(req: Request, res: Response, next: NextFunction) {;
    try {
        const id = req.params.id;
        const {streetName, district, state, country, landmark, zipcode} = req.body;
        const updatedLocation: ILocation | null = await updateResource<ILocation>(next, 'Location', LocationSchema, id, {
            streetName, district, state, country, landmark, zipcode
        });
        if (!updatedLocation) {
            next(new ErrorHandler(404, `No Resource found with id =${id}`));
            return;
        }
        sendResponse(res, 201, updatedLocation);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
