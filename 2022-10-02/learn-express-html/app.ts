import express from 'express';
import path from 'path';
import { Env } from './src/system/Environment';
import Routes from './src/routes/Routes';

const server = express();
const routes = new Routes();

server.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
server.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
server.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
server.use(routes.getRoutes());

server.listen(Env.EXPRESS_PORT, () => console.log(`Listening on port ${Env.EXPRESS_PORT}`));