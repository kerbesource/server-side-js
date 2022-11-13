"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const Environment_1 = require("../system/Environment");
class DatabaseConnection {
    init() {
        this.mongoClient = new mongodb_1.MongoClient(Environment_1.Env.MONGODB_CONNECTION_STRING);
        this.mongoClient.connect().then((mongoClient) => {
            this.mongoDb = this.mongoClient.db(Environment_1.Env.MONGODB_DATABASE);
            try {
                const reportsCollection = this.mongoDb.collection('reports');
            }
            catch (_a) {
                this.mongoDb.createCollection('reports');
            }
        }).catch((err) => {
            console.error(err);
            process.exit(1);
        });
        return Promise.resolve();
    }
    getDb() {
        return this.mongoDb;
    }
}
const Database = new DatabaseConnection();
exports.Database = Database;
