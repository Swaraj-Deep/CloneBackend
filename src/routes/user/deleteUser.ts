import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IUser} from "../../models/IUser";
import deleteResource from "../../shared/deleteResource";
import UserSchema from "../../models/UserSchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;
        const deletedUser: IUser | null = await deleteResource(next,'User', UserSchema, id);
        if (!deletedUser) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedUser);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
