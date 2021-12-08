import {Connection, HydratedDocument, Model, Schema, UpdateQuery, QueryOptions} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function updateResource<Type>(next: NextFunction, documentName: string, schema: Schema, id: string, toBeUpdated: UpdateQuery<Type>, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const updatedResource: HydratedDocument<Type> | null = await model.findByIdAndUpdate(id, toBeUpdated, {
                returnOriginal: false,
                projection
            });
            resolve(updatedResource);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
