import {Connection, Model, Schema} from "mongoose";

export default function viewAll<Type>(dbConnection: Connection, documentName: string, schema: Schema, projection: any = {}): Promise<Type[]> {
    return new Promise<Type[]>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: Type[] = await model.find({}, projection);
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
