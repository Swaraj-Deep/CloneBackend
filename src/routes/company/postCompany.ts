import ErrorHandler from "../../errorHandling/errorHandler";
import {NextFunction, Request, Response} from "express";
import {ICompany} from "../../models/ICompany";
import {Company} from "../../models/classes/Company";
import createResource from "../../shared/createResource";
import CompanySchema from "../../models/CompanySchema";
import sendResponse from "../../shared/sendResponse";

export async function postCompany(req: Request, res: Response, next: NextFunction) {
    try {
        const {companyName, registrationNumber, gstIN, owner, joinedPlatformOn, rating} = req.body;
        const companyFromUI: ICompany = new Company(companyName, gstIN, joinedPlatformOn, owner, rating, registrationNumber);
        const createdCompany: ICompany = await createResource<ICompany>(next, 'Company', CompanySchema, companyFromUI);
        sendResponse(res, 201, createdCompany);
    } catch (err: any) {
        if (err instanceof ErrorHandler) {
            next(err);
            return;
        }
        next(new ErrorHandler(500, err.message));
    }
}
