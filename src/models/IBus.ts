import {ObjectId} from 'mongoose';
import {BusType} from "./types/BusType";
import {BusSeating} from "./types/BusSeating";

export interface IBus {
    _id: ObjectId;
    companyId: string;
    to: string;
    from: string;
    busType: BusType;
    seatingArrangement: BusSeating;
    timings: Date[];
    fare: number;
}
