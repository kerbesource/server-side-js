import express from 'express';
import { Database } from './src/system/Database';
import { Env } from './src/system/Environment';
import Routes from './src/routes/Routes';

const server = express();
const routes = new Routes();

server.use(express.json());
server.use(routes.getRoutes());

const db = Database;

server.listen(Env.EXPRESS_PORT, () => console.log(`Listening on port ${Env.EXPRESS_PORT}`));