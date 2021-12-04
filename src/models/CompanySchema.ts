import {Schema, Types} from "mongoose";
import {ICompany} from "./ICompany";

const companySchema = new Schema<ICompany>({
    _id: Types.ObjectId,
    companyName: {
        type: "string",
        required: true
    },
    registrationNumber: {
        type: "string",
        required: true
    },
    gstIN: {
        type: "string",
        required: true
    },
    owner: {
        type: "string",
        required: true
    },
    joinedPlatformOn: {
        type: "Date",
        required: true
    },
    rating: {
        type: "number",
        required: true
    }
});

export default companySchema;
