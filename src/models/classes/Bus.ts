import {IBus} from "../IBus";
import {ObjectId} from "mongoose";
import ErrorHandler from "../../errorHandling/errorHandler";

export default class Bus implements IBus {
    _id!: ObjectId;
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
        }
        if (companyId) {
            this.companyId = companyId;
        }
        if (fare) {
            this.fare = fare;
        }
        if (from) {
            this.from = from;
        }
        if (seatingArrangement !== undefined) {
            this.seatingArrangement = seatingArrangement;
        }
        if (timings) {
            this.timings = timings;
        }
        if (to) {
            this.to = to;
        }
        if (totalSeats) {
            this.totalSeats = totalSeats;
        }
        if (remainingSeats) {
            this.remainingSeats = remainingSeats;
        }
    }
}
