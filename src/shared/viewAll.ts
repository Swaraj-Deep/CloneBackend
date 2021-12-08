import {Connection, Model, Schema} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function viewAll<Type>(next: NextFunction, documentName: string, schema: Schema, projection: any = {}): Promise<Type[]> {
    return new Promise<Type[]>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: Type[] = await model.find({}, projection);
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
