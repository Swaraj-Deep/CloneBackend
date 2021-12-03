import express, { Application, Request, Response, NextFunction, Router } from "express";
import busController from './routes/bus/busController';
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000");

app.use('/bus', busController);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   const conn = connectToDB(process.env.CONNECTION_STRING!);
//   const model = conn.model("Bus", BusSchema);
//   await model.create({
//     from: "sf",
//     to: "sf",
//     companyId: "s",
//     busType: BusType.AC,
//     seatingArrangement: BusSeating.SITTING,
//     fare: "12",
//     timings: [new Date()],
//   });
  res.status(200).json({
    message: "Ok!",
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});