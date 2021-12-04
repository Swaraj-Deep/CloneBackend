import {IBus} from "../IBus";
import {ObjectId} from "mongoose";
import {BusType} from "../types/BusType";
import {BusSeating} from "../types/BusSeating";
import ErrorHandler from "../../errorHandling/errorHandler";

export default class Bus implements IBus {
    _id!: ObjectId;
    busType!: BusType;
    companyId!: string;
    fare!: number;
    from!: string;
    seatingArrangement!: BusSeating;
    timings!: Date[];
    to!: string;
    totalSeats!: number;
    remainingSeats!: number;

    constructor(busType: BusType, companyId: string, fare: number, from: string, seatingArrangement: BusSeating, timings: Date[], to: string, totalSeats: number, remainingSeats: number) {
        if (busType) {
            this.busType = busType;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (companyId) {
            this.companyId = companyId;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (fare) {
            this.fare = fare;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (from) {
            this.from = from;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (seatingArrangement) {
            this.seatingArrangement = seatingArrangement;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (timings) {
            this.timings = timings;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (to) {
            this.to = to;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (totalSeats) {
            this.totalSeats = totalSeats;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (remainingSeats) {
            this.remainingSeats = remainingSeats;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
