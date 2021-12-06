import {Schema} from "mongoose";
import {IBus} from "./IBus";
import {BusType} from "./types/BusType";

const busSchema = new Schema<IBus>({
    companyId: {
        type: "string",
        required: true,
    },
    to: {
        type: "string",
        required: true,
    },
    from: {
        type: "string",
        required: true,
    },
    busType: {
        type: "number",
        required: true,
        enum: [BusType.AC, BusType.NON_AC],
    },
    timings: {
        type: [Date],
        required: true,
    },
    fare: {
        type: "number",
        required: true,
    },
    totalSeats: {
        type: "number",
        required: true,
    },
    remainingSeats: {
        type: "number",
        required: true,
    }
});

export default busSchema;
