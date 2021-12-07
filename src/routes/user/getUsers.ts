import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IUser} from "../../models/IUser";
import viewAll from "../../shared/viewAll";
import UserSchema from "../../models/UserSchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const allUsers: IUser[] = await viewAll<IUser>(dbConnection, 'User', UserSchema);
        sendResponse(res, 200, allUsers);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const user: IUser | null = await viewSingle<IUser>(dbConnection, 'User', UserSchema, id);
        if (!user) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, user);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
