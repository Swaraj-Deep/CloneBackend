import {IBusLayout} from "../IBusLayout";
import ErrorHandler from "../../errorHandling/errorHandler";

export class BusLayout implements IBusLayout {
    _id!: string;
    cabinSeats!: string[];
    columnArrangement!: number;
    differenceInFare!: number;
    numberOfRows!: number;
    seatCountingStrategy!: number;
    seatingArrangement!: number;

    constructor(cabinSeats: string[], columnArrangement: number, differenceInFare: number, numberOfRows: number, seatCountingStrategy: number, seatingArrangement: number) {
        if (cabinSeats !== undefined) {
            this.cabinSeats = cabinSeats;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (columnArrangement !== undefined) {
            try {
                this.columnArrangement = parseInt(String(columnArrangement));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (differenceInFare !== undefined) {
            try {
                this.differenceInFare = parseFloat(String(differenceInFare));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (numberOfRows !== undefined) {
            try {
                this.numberOfRows = parseInt(String(numberOfRows));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (seatingArrangement !== undefined) {
            try {
                this.seatingArrangement = parseInt(String(seatingArrangement));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (seatCountingStrategy !== undefined) {
            try {
                this.seatCountingStrategy = parseInt(String(seatCountingStrategy));
            } catch (err) {
                throw new ErrorHandler(400, 'Request Body does not match the internal interface');
            }
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
