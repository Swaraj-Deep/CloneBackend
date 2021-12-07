import {IBus} from "../IBus";
import ErrorHandler from "../../errorHandling/errorHandler";

export default class Bus implements IBus {
    _id!: string;
    companyId!: string;
    fare!: number;
    from!: string;
    timings!: Date[];
    to!: string;
    totalSeats!: number;
    remainingSeats!: number;

    constructor(companyId: string, fare: number, from: string, timings: Date[], to: string, totalSeats: number, remainingSeats: number) {
        if (companyId !== undefined) {
            this.companyId = companyId;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (fare !== undefined) {
            try {
                this.fare = parseFloat(String(fare));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (from !== undefined) {
            this.from = from;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (timings !== undefined) {
            this.timings = timings;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (to !== undefined) {
            this.to = to;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (totalSeats !== undefined) {
            try {
                this.totalSeats = parseInt(String(totalSeats));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (remainingSeats !== undefined) {
            try {
                this.remainingSeats = parseInt(String(remainingSeats));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
