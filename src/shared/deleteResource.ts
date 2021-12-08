import {Connection, Model, QueryOptions, Schema} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function deleteResource<Type>(next: NextFunction, documentName: string, schema: Schema, id: string, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: Type | null = await model.findByIdAndDelete(id, {
                projection
            });
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
