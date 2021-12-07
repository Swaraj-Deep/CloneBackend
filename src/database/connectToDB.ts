import {createConnection, ConnectOptions, Connection, set} from 'mongoose';
import {NextFunction} from "express";
import ErrorHandler from "../errorHandling/errorHandler";

export default function connectToDB(dbURI: string, next?: NextFunction, errMessage?: string): Connection {
    // @ts-ignore
    const options: ConnectOptions = {useNewUrlParser: true, useUnifiedTopology: true}
    const db: Connection = createConnection(dbURI, options);
    db.on('connected', function () {
        set('debug', function (col, method, query, doc) {
            // @ts-ignore
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`)
        });
        // @ts-ignore
        console.log(`MongoDB :: connected ${this.name}`);
    });
    db.on('disconnected', function () {
        // @ts-ignore
        console.log(`MongoDB :: disconnected ${this.name}`);
    });
    db.on('error', function (err) {
        if (next) {
            if (errMessage) {
                next(new ErrorHandler(500, errMessage));
            } else {
                next(new ErrorHandler(500, `Seems like we are having trouble connecting to internal services.\n Do not worry, we are on it.`));
            }
        }
        console.log(err.message);
    });
    return db;
}
