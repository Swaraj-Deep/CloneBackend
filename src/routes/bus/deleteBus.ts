import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IBus} from "../../models/IBus";
import deleteResource from "../../shared/deleteResource";
import BusSchema from "../../models/BusSchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteBus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const deletedBus: IBus | null = await deleteResource(next, 'Bus', BusSchema, id);
        if (!deletedBus) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedBus, 'Resource deleted');
    } catch (err: any) {
        next(new ErrorHandler(500, err.message))
    }
}
