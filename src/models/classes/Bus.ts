import {IBus} from "../IBus";
import {ObjectId} from "mongoose";
import {BusType} from "../types/BusType";
import {BusSeating} from "../types/BusSeating";

export default class Bus implements IBus {
    _id!: ObjectId;
    busType!: BusType;
    companyId!: string;
    fare!: string;
    from!: string;
    seatingArrangement!: BusSeating;
    timings!: Date[];
    to!: string;

    constructor(busType: BusType, companyId: string, fare: string, from: string, seatingArrangement: BusSeating, timings: Date[], to: string) {
        if (busType) {
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
        if (seatingArrangement) {
            this.seatingArrangement = seatingArrangement;
        }
        if (timings) {
            this.timings = timings;
        }
        if (to) {
            this.to = to;
        }
    }
}
