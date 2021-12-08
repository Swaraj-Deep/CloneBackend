export interface ITicket {
    _id: string;
    userId: string;
    busId: string;
    seatNumbers: string[];
    to: string;
    from: string;
    dateOfJourney: Date;
    timeOfJourney: Date;
    isTicketCancelled: boolean;
}
