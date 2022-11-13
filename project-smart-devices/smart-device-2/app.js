"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./src/routes/Routes"));
const Environment_1 = require("./src/system/Environment");
const StateService_1 = require("./src/services/StateService");
const server = (0, express_1.default)();
server.use(express_1.default.json());
const stateService = StateService_1.Service;
stateService.init();
const routes = new Routes_1.default();
server.use(routes.getRoutes());
server.listen(Environment_1.Env.SMARTDEV2_PORT, () => console.log(`Smart Device 2 is listening on port ${Environment_1.Env.SMARTDEV2_PORT}`));
