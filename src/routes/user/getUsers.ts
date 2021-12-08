import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {IUser} from "../../models/IUser";
import viewAll from "../../shared/viewAll";
import UserSchema from "../../models/UserSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const allUsers: IUser[] = await viewAll<IUser>(next, 'User', UserSchema);
        sendResponse(res, 200, allUsers);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const user: IUser | null = await viewSingle<IUser>(next, 'User', UserSchema, id);
        if (!user) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, user);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
