import {Schema} from "mongoose";
import {IBus} from "./IBus";

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
    },
    alreadyBookedSeats: {
        type: ["string"],
        required: true,
        default: [],
    }
});

export default busSchema;
