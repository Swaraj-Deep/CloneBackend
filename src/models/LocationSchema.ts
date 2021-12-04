import {Schema} from "mongoose";
import {ILocation} from "./ILocation";

const locationSchema = new Schema<ILocation>({
    streetName: {
        type: "string",
        required: true
    },
    district: {
        type: "string",
        required: true
    },
    state: {
        type: "string",
        required: true
    },
    country: {
        type: "string",
        required: true
    },
    landmark: {
        type: "string",
        required: true
    },
    zipcode: {
        type: "string",
        required: true
    }
});

export default locationSchema;
