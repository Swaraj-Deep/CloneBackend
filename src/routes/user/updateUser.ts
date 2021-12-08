import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IUser} from "../../models/IUser";
import updateResource from "../../shared/updateResource";
import UserSchema from "../../models/UserSchema";
import sendResponse from "../../shared/sendResponse";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const {email, address, phone} = req.body;
        const updatedUser: IUser | null = await updateResource(next,'User', UserSchema, id, {
            email, address, phone
        });
        if (!updatedUser) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedUser);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
