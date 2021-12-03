import express, {Application, Request, Response, NextFunction} from "express";
import dotenv from 'dotenv';
import connectToDB from "./database/connectToDB";
import {Connection, HydratedDocument} from "mongoose";
import BusModel from "./models/BusModel";
import {Bus} from "./models/Bus";
import {BusType} from "./models/BusType";
import {BusSeating} from "./models/BusSeating";

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    let dbConnection!: Connection;
    try {
        dbConnection = connectToDB(process.env.CONNECTION_STRING!);
        const model: HydratedDocument<Bus> = new BusModel({
            companyId: '000s',
            to: 'sdf',
            from: 'string',
            busType: BusType.AC,
            seatingArrangement: BusSeating.MIXED,
            timings: [new Date().getDate(), new Date().getDate()],
            fare: 'string',
        });
        await model.save();
        console.log(model);
    } catch (err) {
        console.log(err);
    } finally {
        await dbConnection.close();
    }
    res.status(200).json({
        message: "Ok!",
    });
});

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});
