import {ICompany} from "../ICompany";
import ErrorHandler from "../../errorHandling/errorHandler";

export class Company implements ICompany {
    _id!: string;
    companyName!: string;
    gstIN!: string;
    joinedPlatformOn!: Date;
    owner!: string;
    rating!: number;
    registrationNumber!: string;

    constructor(companyName: string, gstIn: string, joinedPlatformOn: Date, owner: string, rating: number, registrationNumber: string) {
        if (companyName !== undefined) {
            this.companyName = companyName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (gstIn !== undefined) {
            this.gstIN = gstIn;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (joinedPlatformOn !== undefined) {
            this.joinedPlatformOn = joinedPlatformOn;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (owner !== undefined) {
            this.owner = owner;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (rating !== undefined) {
            this.rating = rating;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (registrationNumber !== undefined) {
            this.registrationNumber = registrationNumber;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
