import {Connection, Model, QueryOptions, Schema} from "mongoose";

export default function deleteResource<Type>(dbConnection: Connection, documentName: string, schema: Schema, id: string, projection: QueryOptions = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
        projection = {...projection, __v: false};
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
