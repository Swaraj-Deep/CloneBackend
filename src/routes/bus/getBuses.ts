import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import viewAll from "../../shared/viewAll";

export async function getAllBuses(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const buses: IBus[] = await viewAll<IBus>(dbConnection, 'Bus', BusSchema);
        res.status(200).json(buses);
    } catch (err) {
        console.log(err);
    } finally {
        await dbConnection.close();
    }
}
