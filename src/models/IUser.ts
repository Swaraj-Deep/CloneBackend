import {ObjectId} from "mongoose";

export interface IUser {
    _id: ObjectId;
    userName: string;
    dob: Date;
    email: string;
    address: string;
    phone: string;
    password: string;
}
