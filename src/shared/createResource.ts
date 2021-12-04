import {Connection, HydratedDocument, Model, Schema} from "mongoose";

export default function createResource<Type>(dbConnection: Connection, documentName: string, schema: Schema, resource: Type): Promise<Type> {
    return new Promise(async (resolve, reject) => {
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
