import {Connection, FilterQuery, Model, QueryOptions, Schema} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function deleteWithFilter<Type>(next: NextFunction, documentName: string, schema: Schema, filter: FilterQuery<Type>, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model(documentName, schema);
            const deletedResource: Type | null = await model.findOneAndDelete(filter, {
                projection
            });
            resolve(deletedResource);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
