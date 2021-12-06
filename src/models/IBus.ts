import {BusType} from "./types/BusType";

export interface IBus {
    _id: string;
    companyId: string;
    to: string;
    from: string;
    busType: BusType;
    timings: Date[];
    fare: number;
    totalSeats: number;
    remainingSeats: number;
}
