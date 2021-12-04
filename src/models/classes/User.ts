import {IUser} from "../IUser";
import {ObjectId} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";

export class User implements IUser {
    _id!: ObjectId;
    address!: string;
    dob!: Date;
    email!: string;
    password!: string;
    phone!: string;
    userName!: string;

    constructor(address: string, dob: Date, email: string, password: string, phone: string, userName: string) {
        if (address) {
            this.address = address;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (dob) {
            this.dob = dob;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (email) {
            this.email = email;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (password) {
            this.password = password;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (phone) {
            this.phone = phone;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (userName) {
            this.userName = userName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
