import {Connection, FilterQuery, Model, QueryOptions, Schema, UpdateQuery} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function updateWithFilter<Type>(next: NextFunction, documentName: string, schema: Schema, filter: FilterQuery<Type>, toBeUpdated: UpdateQuery<Type>, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const updatedResource: Type | null = await model.findOneAndUpdate(filter, toBeUpdated, {
                projection,
                returnOriginal: false
            });
            resolve(updatedResource);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
