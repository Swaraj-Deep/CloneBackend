import ErrorHandler from "../../errorHandling/errorHandler";
import {NextFunction, Request, Response} from "express";
import {ICompany} from "../../models/ICompany";
import {Company} from "../../models/classes/Company";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";
import updateResource from "../../shared/updateResource";

export async function updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const {companyName, registrationNumber, gstIN, owner, joinedPlatformOn, rating} = req.body;
        const updatedCompany: ICompany | null = await updateResource<ICompany>(next, 'Company', CompanySchema, id, {
            companyName, registrationNumber, gstIN, owner, joinedPlatformOn, rating
        });
        if (!updatedCompany) {
            next(new ErrorHandler(404, `No Resource found with id = ${id}`));
            return;
        }
        sendResponse(res, 201, updatedCompany);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    }
}
