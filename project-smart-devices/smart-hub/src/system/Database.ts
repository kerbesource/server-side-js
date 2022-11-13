import { MongoClient, Db } from 'mongodb';
import { Env } from '../system/Environment';

class DatabaseConnection {
    private mongoClient: MongoClient;
    private mongoDb: Db;

    public init(): Promise<void> {
        this.mongoClient = new MongoClient(Env.MONGODB_CONNECTION_STRING as string);
        this.mongoClient.connect().then((mongoClient: MongoClient) => {
            this.mongoDb = this.mongoClient.db(Env.MONGODB_DATABASE);

            try {
                const reportsCollection = this.mongoDb.collection('reports')
            }
            catch {
                this.mongoDb.createCollection('reports');
            }
        }).catch((err) => {
            console.error(err);
            process.exit(1);
        });
        return Promise.resolve();
    }

    public getDb(): Db {
        return this.mongoDb;
    }
}

const Database = new DatabaseConnection();

export { Database };