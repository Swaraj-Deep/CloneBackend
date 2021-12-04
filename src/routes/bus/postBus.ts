import {NextFunction, Request, Response} from "express";
import {Connection} from "mongoose";
import {IBus} from "../../models/IBus";
import createResource from "../../shared/createResource";
import BusSchema from "../../models/BusSchema";
import Bus from "../../models/classes/Bus";
import connectToDB from "../../database/connectToDB";

export async function postBus(req: Request, res: Response, next: NextFunction) {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const {busType, companyId, fare, from, seatingArrangement, timings, to} = req.body;
        const busFromUI: IBus = new Bus(busType, companyId, fare, from, seatingArrangement, timings, to);
        const createdBus: IBus = await createResource(dbConnection, 'Bus', BusSchema, busFromUI);
        res.status(201).json(createdBus);
    } catch (err) {
        console.log(err);
    } finally {
        await dbConnection.close();
    }
}
