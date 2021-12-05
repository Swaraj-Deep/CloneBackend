import {BusType} from "./types/BusType";
import {BusSeating} from "./types/BusSeating";

export interface IBus {
    _id: string;
    companyId: string;
    to: string;
    from: string;
    busType: BusType;
    seatingArrangement: BusSeating;
    timings: Date[];
    fare: number;
    totalSeats: number;
    remainingSeats: number;
}
