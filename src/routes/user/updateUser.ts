import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IUser} from "../../models/IUser";
import updateResource from "../../shared/updateResource";
import UserSchema from "../../models/UserSchema";
import sendResponse from "../../shared/sendResponse";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const {email, address, phone} = req.body;
        const updatedUser: IUser | null = await updateResource(dbConnection, 'User', UserSchema, id, {
            email, address, phone
        });
        if (!updatedUser) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, updatedUser);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
