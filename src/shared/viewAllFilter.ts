import {Connection, Model, Schema, FilterQuery} from "mongoose";

export default function viewAllFilter<Type>(dbConnection: Connection, documentName: string, schema: Schema, filter: FilterQuery<Type>, projection: any = {}): Promise<Type[]> {
    return new Promise<Type[]>(async (resolve, reject) => {
        projection = {...projection, __v: false};
        try {
            const model: Model<Type> = dbConnection.model<Type>(documentName, schema);
            const result: Type[] = await model.find(filter, projection);
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            await dbConnection.close();
        }
    });
}
