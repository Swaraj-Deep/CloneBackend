import {Connection, Model, Schema, HydratedDocument} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function viewSingle<Type>(next: NextFunction, documentName: string, schema: Schema, id: string, projection: any = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: HydratedDocument<Type> | null = await model.findById(id, projection);
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
