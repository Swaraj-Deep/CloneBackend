export interface IBus {
    _id: string;
    companyId: string;
    to: string;
    from: string;
    timings: Date[];
    fare: number;
    totalSeats: number;
    remainingSeats: number;
}
