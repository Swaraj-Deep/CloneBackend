import {ICompany} from "../ICompany";
import {ObjectId} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";

export class Company implements ICompany {
    _id!: ObjectId;
    companyName!: string;
    gstIN!: string;
    joinedPlatformOn!: Date;
    owner!: string;
    rating!: number;
    registrationNumber!: string;

    constructor(companyName: string, gstIn: string, joinedPlatformOn: Date, owner: string, rating: number, registrationNumber: string) {
        if (companyName) {
            this.companyName = companyName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (gstIn) {
            this.gstIN = gstIn;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (joinedPlatformOn) {
            this.joinedPlatformOn = joinedPlatformOn;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (owner) {
            this.owner = owner;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (rating) {
            this.rating = rating;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (registrationNumber) {
            this.registrationNumber = registrationNumber;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
