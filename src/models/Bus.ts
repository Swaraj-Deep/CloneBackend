import {BusType} from "./BusType";
import {BusSeating} from "./BusSeating";

export interface Bus {
    companyId: string;
    to: string;
    from: string;
    busType: BusType;
    seatingArrangement: BusSeating;
    timings: Date[];
    fare: string;
}
