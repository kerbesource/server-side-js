"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const Environment_1 = require("../system/Environment");
class DatabaseConnection {
    constructor() {
        this.mongoClient = new mongodb_1.MongoClient(Environment_1.Env.MONGODB_CONNECTION_STRING);
        this.mongoClient.connect().then((mongoClient) => {
            this.mongoDb = this.mongoClient.db(Environment_1.Env.MONGODB_DATABASE);
        }).catch((err) => {
            console.error(err);
            process.exit(1);
        });
    }
    getMongoClient() {
        return this.mongoClient;
    }
    getDb() {
        return this.mongoDb;
    }
}
const Database = new DatabaseConnection().getDb();
exports.Database = Database;
