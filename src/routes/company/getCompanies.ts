import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";
import connectToDB from "../../database/connectToDB";
import {ICompany} from "../../models/ICompany";
import viewAll from "../../shared/viewAll";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllCompanies(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const companies: ICompany[] = await viewAll<ICompany>(dbConnection, 'Company', CompanySchema);
        sendResponse(res, 200, companies);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleCompany(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!, next);
        const company: ICompany | null = await viewSingle<ICompany>(dbConnection, 'Company', CompanySchema, id);
        if (!company) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, company);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
