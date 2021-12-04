import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {ICompany} from "../../models/ICompany";
import deleteResource from "../../shared/deleteResource";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteCompany(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const deletedCompany: ICompany | null = await deleteResource<ICompany>(dbConnection, 'Company', CompanySchema, id);
        if (!deletedCompany) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedCompany);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
