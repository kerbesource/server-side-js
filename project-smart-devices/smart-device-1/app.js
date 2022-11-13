"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const Routes_1 = __importDefault(require("./src/routes/Routes"));
const Environment_1 = require("./src/system/Environment");
const SensorService_1 = require("./src/services/SensorService");
const SubscriptionService_1 = require("./src/services/SubscriptionService");
const Axios_1 = require("./src/system/Axios");
const server = (0, express_1.default)();
server.use(express_1.default.json());
const sensorService = SensorService_1.Service;
const subscriptionService = SubscriptionService_1.Service;
sensorService.init().then(() => {
    subscriptionService.init().then(() => {
        node_cron_1.default.schedule(Environment_1.Env.SENSOR_SERVICE_CRON, () => {
            sensorService.activate().then((measurement) => {
                console.log(measurement);
                subscriptionService.forEach((subscription) => {
                    axios_1.default.post(subscription.consumerEndpoint, measurement, Axios_1.Config.getConfig()).catch((err) => console.error(err));
                });
            });
        });
    });
});
const routes = new Routes_1.default();
server.use(routes.getRoutes());
server.listen(Environment_1.Env.SMARTDEV1_EXPRESS_PORT, () => console.log(`Smart Device 1 is listening on port ${Environment_1.Env.SMARTDEV1_EXPRESS_PORT}`));
