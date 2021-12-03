import {createConnection, ConnectOptions, Connection, set} from 'mongoose';

export default function connectToDB(dbURI: string): Connection {
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
        console.log(err.message);
    });
    return db;
}
