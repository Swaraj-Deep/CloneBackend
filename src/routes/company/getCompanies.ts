import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ICompany} from "../../models/ICompany";
import viewAll from "../../shared/viewAll";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";
import viewSingle from "../../shared/viewSingle";

export async function getAllCompanies(req: Request, res: Response, next: NextFunction) {
    try {
        const companies: ICompany[] = await viewAll<ICompany>(next, 'Company', CompanySchema);
        sendResponse(res, 200, companies);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}

export async function getSingleCompany(req: Request, res: Response, next: NextFunction) {;
    try {
        const id = req.params.id;
        const company: ICompany | null = await viewSingle<ICompany>(next, 'Company', CompanySchema, id);
        if (!company) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, company);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
