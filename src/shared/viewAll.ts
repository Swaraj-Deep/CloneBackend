import {Connection, Model, Schema} from "mongoose";

export default function viewAll<Type>(dbConnection: Connection, documentName: string, schema: Schema): Promise<Type[]> {
    return new Promise<Type[]>(async (resolve, reject) => {
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: Type[] = await model.find();
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
