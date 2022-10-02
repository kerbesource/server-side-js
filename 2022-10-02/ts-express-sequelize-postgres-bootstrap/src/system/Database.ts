import { Env } from './Environment';
import { Sequelize } from 'sequelize';

class DatabaseConnection {
    private connection: Sequelize;

    constructor() {
        this.connection = new Sequelize({
            dialect: 'postgres',
            host: Env.DB_HOST,
            port: Env.DB_PORT ? parseInt(Env.DB_PORT) : 5432,
            username: Env.DB_USER,
            password: Env.DB_PASS,
            database: Env.DB_NAME
        });

        this.connection.authenticate().catch((err) => {
            console.error(err);
            throw err;
        });
    }

    getConnection(): Sequelize {
        return this.connection;
    }
}

const Database = new DatabaseConnection().getConnection();

const sequelize = Database;

export { Database, sequelize };