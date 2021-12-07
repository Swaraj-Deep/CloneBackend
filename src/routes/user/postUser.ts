import {NextFunction, Request, Response} from "express";
import bcrypt from 'bcrypt';
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {IUser} from "../../models/IUser";
import createResource from "../../shared/createResource";
import UserSchema from "../../models/UserSchema";
import {User} from "../../models/classes/User";
import sendResponse from "../../shared/sendResponse";

export async function postUser(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const {userName, dob, email, address, phone, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userFromUI: IUser = new User(address, dob, email, hashedPassword, phone, userName);
        const createdUser: IUser = await createResource(dbConnection, 'User', UserSchema, userFromUI);
        sendResponse(res, 201, createdUser);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
