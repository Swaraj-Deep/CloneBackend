import {BusSeating} from "./types/BusSeating";
import {BusColumn} from "./types/BusColumn";
import {BusSeatCounting} from "./types/BusSeatCounting";

export interface IBusLayout {
    _id: string;
    numberOfRows: number;
    seatingArrangement: BusSeating;
    columnArrangement: BusColumn;
    seatCountingStrategy: BusSeatCounting;
    cabinSeats: string[];
    differenceInFare: number;
}
