import {IUser} from "../IUser";
import ErrorHandler from "../../errorHandling/errorHandler";

export class User implements IUser {
    _id!: string;
    address!: string;
    dob!: Date;
    email!: string;
    password!: string;
    phone!: string;
    userName!: string;

    constructor(address: string, dob: Date, email: string, password: string, phone: string, userName: string) {
        if (address !== undefined) {
            this.address = address;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (dob !== undefined) {
            this.dob = dob;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (email !== undefined) {
            this.email = email;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (password !== undefined) {
            this.password = password;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (phone !== undefined) {
            this.phone = phone;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (userName !== undefined) {
            this.userName = userName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
