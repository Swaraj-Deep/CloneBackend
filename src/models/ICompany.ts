import {ObjectId} from "mongoose";

export interface ICompany {
    _id: ObjectId;
    companyName: string;
    registrationNumber: string;
    gstIN: string;
    owner: string;
    joinedPlatformOn: Date;
    rating: number;
}
