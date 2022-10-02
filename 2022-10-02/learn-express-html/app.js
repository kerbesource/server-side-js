"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Environment_1 = require("./src/system/Environment");
const Routes_1 = __importDefault(require("./src/routes/Routes"));
const server = (0, express_1.default)();
const routes = new Routes_1.default();
server.use('/css', express_1.default.static(path_1.default.join(__dirname, 'node_modules/bootstrap/dist/css')));
server.use('/js', express_1.default.static(path_1.default.join(__dirname, 'node_modules/bootstrap/dist/js')));
server.use('/js', express_1.default.static(path_1.default.join(__dirname, 'node_modules/jquery/dist')));
server.use(routes.getRoutes());
server.listen(Environment_1.Env.EXPRESS_PORT, () => console.log(`Listening on port ${Environment_1.Env.EXPRESS_PORT}`));
