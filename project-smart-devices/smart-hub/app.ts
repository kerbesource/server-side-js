import express from 'express';
import path from 'path';
import { Env } from './src/system/Environment';
import { Database } from './src/system/Database';
import Routes from './src/routes/Routes';
import { Service as WebSocketService } from './src/services/WebSocketService';

const server = express();
const routes = new Routes();

server.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
server.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
server.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
server.use('/css', express.static(path.join(__dirname, 'src/views/static/css')));
server.use('/js', express.static(path.join(__dirname, 'src/views/static/js')));
server.use('/images', express.static(path.join(__dirname, 'src/views/static/images')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes.getRoutes());

Database.init().then(() => {
    const db = Database.getDb();
    const webSocketService = WebSocketService;

    webSocketService.init().then(() => server.listen(Env.SMARTHUB_EXPRESS_PORT, () => console.log(`Smart Hub is listening on port ${Env.SMARTHUB_EXPRESS_PORT}`)));
});