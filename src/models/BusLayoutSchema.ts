import {Schema} from "mongoose";
import {IBusLayout} from "./IBusLayout";
import {BusSeating} from "./types/BusSeating";
import {BusColumn} from "./types/BusColumn";
import {BusSeatCounting} from "./types/BusSeatCounting";

const busLayoutSchema = new Schema<IBusLayout>({
    numberOfRows: {
        type: "number",
        required: true
    },
    seatingArrangement: {
        type: "number",
        required: true,
        enum: BusSeating
    },
    columnArrangement: {
        type: "number",
        required: true,
        enum: BusColumn
    },
    seatCountingStrategy: {
        type: "number",
        required: true,
        enum: BusSeatCounting
    },
    cabinSeats: {
        type: ["string"],
        required: true
    },
    differenceInFare: {
        type: "number",
        required: true
    }
});

export default busLayoutSchema;
