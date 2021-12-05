export interface ITicket {
    _id: string;
    userId: string;
    busId: string;
    seatNumbers: number[];
    to: string;
    from: string;
    dateOfJourney: Date;
    timeOfJourney: Date;
}
