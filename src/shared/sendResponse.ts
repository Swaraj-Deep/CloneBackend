import {Response} from "express";

export default function sendResponse<Type>(res: Response, statusCode: number, data: Type, message: string = "Ok!") {
    res.status(statusCode).json({
        message,
        data
    });
}
