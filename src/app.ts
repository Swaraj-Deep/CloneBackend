import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectToDB from "./database/connectToDB";
import { connect, Connection, HydratedDocument, model } from "mongoose";
import BusSchema from "./models/BusSchema";
import { IBus } from "./models/IBus";
import { BusType } from "./models/types/BusType";
import { BusSeating } from "./models/types/BusSeating";

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000");

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const conn = connectToDB(process.env.CONNECTION_STRING!);
  const model = conn.model("Bus", BusSchema);
  await model.create({
    from: "sf",
    to: "sf",
    companyId: "s",
    busType: BusType.AC,
    seatingArrangement: BusSeating.SITTING,
    fare: "12",
    timings: [new Date()],
  });
  res.status(200).json({
    message: "Ok!",
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
