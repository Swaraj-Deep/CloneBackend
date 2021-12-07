import express, {Application, Request, Response, NextFunction} from "express";
import busController from './routes/bus/busController';
import dotenv from "dotenv";
import ErrorHandler from "./errorHandling/errorHandler";
import sendResponse from "./shared/sendResponse";
import userController from "./routes/user/userController";
import locationController from "./routes/location/locationController";
import companyController from "./routes/company/companyController";
import ticketController from "./routes/ticket/ticketController";
import busLayoutController from "./routes/busLayout/busLayoutController";

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000");

app.use('/buses', busController);
app.use('/users', userController);
app.use('/locations', locationController);
app.use('/companies', companyController);
app.use('/tickets', ticketController);
app.use('/busLayouts', busLayoutController);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Ok!",
    });
});

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const errMessage: {
        statusCode: number,
        message: string
    } = JSON.parse(err.message);
    sendResponse<{
        message: string;
        path: string;
    }>(res, errMessage.statusCode, {
        message: errMessage.message,
        path: req.path
    }, "Error occurred. Check data for more information.");
});

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});
