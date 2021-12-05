export interface ITicket {
    _id: string;
    userId: string;
    busId: string;
    seatNumbers: number[];
    dateOfJourney: Date;
    timeOfJourney: Date;
}
