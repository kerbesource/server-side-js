import { MongoClient, Db } from 'mongodb';
import { Env } from '../system/Environment';

class DatabaseConnection {
    private mongoClient: MongoClient;
    private mongoDb: Db;

    constructor() {
        this.mongoClient = new MongoClient(Env.MONGODB_CONNECTION_STRING as string);

        this.mongoClient.connect().then((mongoClient: MongoClient) => {
            this.mongoDb = this.mongoClient.db(Env.MONGODB_DATABASE);
        }).catch((err) => {
            console.error(err);
            process.exit(1);
        });
    }

    getMongoClient(): MongoClient {
        return this.mongoClient;
    }

    getDb(): Db {
        return this.mongoDb;
    }
}

const Database = new DatabaseConnection().getDb();

export { Database };