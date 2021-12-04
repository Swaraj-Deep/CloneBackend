import {Connection, HydratedDocument, Model, Schema, UpdateQuery, QueryOptions} from "mongoose";

export default function updateResource<Type>(dbConnection: Connection, documentName: string, schema: Schema, id: string, toBeUpdated: UpdateQuery<Type>, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
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
