import {Request, Response, NextFunction} from "express";
import {Connection} from "mongoose";
import connectToDB from "../../database/connectToDB";
import {IBus} from "../../models/IBus";
import BusSchema from "../../models/BusSchema";
import viewAll from "../../shared/viewAll";
import viewSingle from "../../shared/viewSingle";
import ErrorHandler from "../../errorHandling/errorHandler";

export async function getAllBuses(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const buses: IBus[] = await viewAll<IBus>(dbConnection, 'Bus', BusSchema);
        res.status(200).json(buses);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}

export async function getSingleBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        const id = req.params.id;
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const bus: IBus | null = await viewSingle<IBus>(dbConnection, 'Bus', BusSchema, id, {
            __v: 0,
            _id: 0
        });
        if (!bus) {
            next(new ErrorHandler(404, `No resource found with id = ${id}`));
            return;
        }
        res.status(200).json(bus);
    } catch (err: any) {
        next(new ErrorHandler(500, err.message));
    } finally {
        await dbConnection.close();
    }
}
