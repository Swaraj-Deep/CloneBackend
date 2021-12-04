import {ILocation} from "../ILocation";
import {ObjectId} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";

export class Location implements ILocation {
    _id!: ObjectId;
    country!: string;
    district!: string;
    landmark!: string;
    state!: string;
    streetName!: string;
    zipcode!: string;

    constructor(country: string, district: string, landmark: string, state: string, streetName: string, zipcode: string) {
        if (country) {
            this.country = country;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (district) {
            this.district = district;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (landmark) {
            this.landmark = landmark;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (state) {
            this.state = state;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (streetName) {
            this.streetName = streetName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (zipcode) {
            this.zipcode = zipcode;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
