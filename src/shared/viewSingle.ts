import {Connection, Model, Schema, QueryOptions, HydratedDocument} from "mongoose";

export default function viewSingle<Type>(dbConnection: Connection, documentName: string, schema: Schema, id: string, projection: any = {}): Promise<Type | null> {
    return new Promise<Type | null>(async (resolve, reject) => {
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
