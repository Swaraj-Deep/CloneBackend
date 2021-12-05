import {ITicket} from "../ITicket";
import ErrorHandler from "../../errorHandling/errorHandler";

export class Ticket implements ITicket {
    _id!: string;
    busId!: string;
    dateOfJourney!: Date;
    seatNumbers!: number[];
    timeOfJourney!: Date;
    userId!: string;
    from!: string;
    to!: string;

    constructor(busId: string, dateOfJourney: Date, seatNumbers: number[], timeOfJourney: Date, userId: string, from: string, to: string) {
        if (busId !== undefined) {
            this.busId = busId;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (dateOfJourney !== undefined) {
            this.dateOfJourney = dateOfJourney;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (seatNumbers !== undefined) {
            this.seatNumbers = seatNumbers;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (timeOfJourney !== undefined) {
            this.timeOfJourney = timeOfJourney;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (userId !== undefined) {
            this.userId = userId;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (to !== undefined) {
            this.to = to;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
        if (from !== undefined) {
            this.from = from;
        } else {
            throw new ErrorHandler(400, 'Request Body does not match the internal interface');
        }
    }
}
