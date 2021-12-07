import {BusSeating} from "./types/BusSeating";
import {BusColumn} from "./types/BusColumn";
import {BusSeatCounting} from "./types/BusSeatCounting";
import {BusType} from "./types/BusType";

export interface IBusLayout {
    _id: string;
    busType: BusType;
    numberOfRows: number;
    seatingArrangement: BusSeating;
    columnArrangement: BusColumn;
    seatCountingStrategy: BusSeatCounting;
    cabinSeats: string[];
    differenceInFare: number;
}
