"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Database = void 0;
const Environment_1 = require("./Environment");
const sequelize_1 = require("sequelize");
class DatabaseConnection {
    constructor() {
        // this.sequelize = new Sequelize('postgres://serversidejs:ServerSideJs2022!@localhost:5432/learn-sequelize');
        this.connection = new sequelize_1.Sequelize({
            dialect: 'postgres',
            host: Environment_1.Env.DB_HOST,
            port: Environment_1.Env.DB_PORT ? parseInt(Environment_1.Env.DB_PORT) : 5432,
            username: Environment_1.Env.DB_USER,
            password: Environment_1.Env.DB_PASS,
            database: Environment_1.Env.DB_NAME
        });
        this.connection.authenticate().catch((err) => {
            console.error(err);
            throw err;
        });
    }
    getConnection() {
        return this.connection;
    }
}
const Database = new DatabaseConnection().getConnection();
exports.Database = Database;
const sequelize = Database;
exports.sequelize = sequelize;
