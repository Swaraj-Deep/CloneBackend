import {BusType} from "./types/BusType";
import {BusSeating} from "./types/BusSeating";

export interface IBus {
    companyId: string;
    to: string;
    from: string;
    busType: BusType;
    seatingArrangement: BusSeating;
    timings: Date[];
    fare: string;
}
