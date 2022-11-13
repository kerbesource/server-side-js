import express from 'express';
import Routes from './src/routes/Routes';
import { Env } from './src/system/Environment';
import { Service as StateService } from './src/services/StateService';

const server = express();
server.use(express.json());

const stateService = StateService;
stateService.init();

const routes = new Routes();
server.use(routes.getRoutes());

server.listen(Env.SMARTDEV2_PORT, () => console.log(`Smart Device 2 is listening on port ${Env.SMARTDEV2_PORT}`));