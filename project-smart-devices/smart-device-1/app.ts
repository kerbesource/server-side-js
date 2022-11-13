import axios from 'axios';
import express from 'express';
import cron from 'node-cron';
import Routes from './src/routes/Routes';
import { Env } from './src/system/Environment';
import { Service as SensorService, SensorMeasurement } from './src/services/SensorService';
import { Service as SubscriptionService, Subscription } from './src/services/SubscriptionService';
import { Config as AxiosProxyConfig } from './src/system/Axios';

const server = express();
server.use(express.json());

const sensorService = SensorService;
const subscriptionService = SubscriptionService;

sensorService.init().then(() => {
    subscriptionService.init().then(() => {
        cron.schedule(Env.SENSOR_SERVICE_CRON as string, () => {
            sensorService.activate().then((measurement: SensorMeasurement) => {
                console.log(measurement);
                subscriptionService.forEach((subscription: Subscription) => {
                    axios.post(subscription.consumerEndpoint, measurement, AxiosProxyConfig.getConfig()).catch((err) => console.error(err));
                });
            });
        });
    });
});

const routes = new Routes();
server.use(routes.getRoutes());

server.listen(Env.SMARTDEV1_EXPRESS_PORT, () => console.log(`Smart Device 1 is listening on port ${Env.SMARTDEV1_EXPRESS_PORT}`));