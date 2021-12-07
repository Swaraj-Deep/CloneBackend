import {Schema} from "mongoose";
import {ITicket} from "./ITicket";

const ticketSchema = new Schema<ITicket>({
    busId: {
        type: "string",
        required: true
    },
    dateOfJourney: {
        type: "date",
        required: true
    },
    seatNumbers: {
        type: ["number"],
        required: true
    },
    timeOfJourney: {
        type: "date",
        required: true
    },
    userId: {
        type: "string",
        required: true
    },
    to: {
        type: "string",
        required: true
    },
    from: {
        type: "string",
        required: true
    },
    isTicketCancelled: {
        type: "boolean",
        required: true,
        default: false
    }
});

export default ticketSchema;
