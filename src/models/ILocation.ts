import {ObjectId} from "mongoose";

export interface ILocation {
    _id: ObjectId;
    streetName: string;
    district: string;
    state: string;
    country: string;
    landmark: string;
    zipcode: string;
    locationCoordinate?: any;
}
