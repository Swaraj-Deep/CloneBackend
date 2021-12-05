import {IBus} from "../IBus";
import ErrorHandler from "../../errorHandling/errorHandler";

export default class Bus implements IBus {
    _id!: string;
    busType!: number;
    companyId!: string;
    fare!: number;
    from!: string;
    seatingArrangement!: number;
    timings!: Date[];
    to!: string;
    totalSeats!: number;
    remainingSeats!: number;

    constructor(busType: number, companyId: string, fare: number, from: string, seatingArrangement: number, timings: Date[], to: string, totalSeats: number, remainingSeats: number) {
        if (busType !== undefined) {
            this.busType = busType;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (companyId !== undefined) {
            this.companyId = companyId;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (fare !== undefined) {
            this.fare = fare;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (from !== undefined) {
            this.from = from;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (seatingArrangement !== undefined) {
            this.seatingArrangement = seatingArrangement;
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
            this.totalSeats = totalSeats;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (remainingSeats !== undefined) {
            this.remainingSeats = remainingSeats;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
