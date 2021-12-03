import {model, Schema} from "mongoose";
import {Bus} from "./Bus";
import {BusType} from "./BusType";
import {BusSeating} from "./BusSeating";

const schema = new Schema<Bus>({
    busId: {
        type: "string", required: true
    },
    companyId: {
        type: "string", required: true
    },
    to: {
        type: "string", required: true
    },
    from: {
        type: "string", required: true
    },
    busType: {
        type: "number", required: true, enum: [BusType.AC, BusType.NON_AC]
    },
    seatingArrangement: {
        type: "number", required: true, enum: [BusSeating.SITTING, BusSeating.MIXED, BusSeating.SLEEPER]
    },
    timings: {
        type: [Date], required: true
    },
    fare: {
        type: "string", required: true
    },
});
const BusModel = model<Bus>('Bus', schema);
export default BusModel;
