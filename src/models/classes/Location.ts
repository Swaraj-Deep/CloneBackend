import {ILocation} from "../ILocation";
import ErrorHandler from "../../errorHandling/errorHandler";

export class Location implements ILocation {
    _id!: string;
    country!: string;
    district!: string;
    landmark!: string;
    state!: string;
    streetName!: string;
    zipcode!: string;

    constructor(country: string, district: string, landmark: string, state: string, streetName: string, zipcode: string) {
        if (country !== undefined) {
            this.country = country;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (district !== undefined) {
            this.district = district;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (landmark !== undefined) {
            this.landmark = landmark;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (state !== undefined) {
            this.state = state;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (streetName !== undefined) {
            this.streetName = streetName;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (zipcode !== undefined) {
            this.zipcode = zipcode;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
