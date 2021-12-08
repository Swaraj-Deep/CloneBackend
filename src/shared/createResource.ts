import {Connection, HydratedDocument, Model, Schema} from "mongoose";
import connectToDB from "../database/connectToDB";
import {NextFunction} from "express";

export default function createResource<Type>(next: NextFunction, documentName: string, schema: Schema, resource: Type): Promise<Type> {
    return new Promise(async (resolve, reject) => {
        let dbConnection: Connection = connectToDB(process.env.CONNECTION_STRING!, next);
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const createdResource: HydratedDocument<Type> = await model.create(resource);
            resolve(createdResource);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    })
}
