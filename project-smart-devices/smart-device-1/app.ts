import express from 'express';
import { Cron } from './src/services/CronService';
import { Env } from './src/system/Environment';
import Routes from './src/routes/Routes';
import SensorService from './src/services/SensorService';

const server = express();
const routes = new Routes();

server.use(express.json());
server.use(routes.getRoutes());

const service = new SensorService();

service.init().then(() => {
    Cron.add(Env.SENSOR_SERVICE_CRON as string, () => service.activate());
});

server.listen(Env.SMARTDEV1_PORT, () => console.log(`Smart Device 1 is listening on port ${Env.SMARTDEV1_PORT}`));