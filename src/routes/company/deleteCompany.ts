import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../../errorHandling/errorHandler";
import {ICompany} from "../../models/ICompany";
import deleteResource from "../../shared/deleteResource";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";

export async function deleteCompany(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const deletedCompany: ICompany | null = await deleteResource<ICompany>(next, 'Company', CompanySchema, id);
        if (!deletedCompany) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 200, deletedCompany);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
