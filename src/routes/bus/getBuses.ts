import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import viewAll from "../../shared/viewAll";
import viewSingle from "../../shared/viewSingle";

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

export async function getSingleBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const bus: IBus | null = await viewSingle<IBus>(dbConnection, 'Bus', BusSchema, req.params.id, {
            __v: 0,
            _id: 0
        });
        res.status(200).json(bus);
    } catch (err) {
        console.log(err);
    } finally {
        await dbConnection.close();
    }
}
