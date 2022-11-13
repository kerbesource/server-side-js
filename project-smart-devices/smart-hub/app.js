"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Environment_1 = require("./src/system/Environment");
const Database_1 = require("./src/system/Database");
const Routes_1 = __importDefault(require("./src/routes/Routes"));
const WebSocketService_1 = require("./src/services/WebSocketService");
const server = (0, express_1.default)();
const routes = new Routes_1.default();
server.use('/css', express_1.default.static(path_1.default.join(__dirname, 'node_modules/bootstrap/dist/css')));
server.use('/js', express_1.default.static(path_1.default.join(__dirname, 'node_modules/bootstrap/dist/js')));
server.use('/js', express_1.default.static(path_1.default.join(__dirname, 'node_modules/jquery/dist')));
server.use('/css', express_1.default.static(path_1.default.join(__dirname, 'src/views/static/css')));
server.use('/js', express_1.default.static(path_1.default.join(__dirname, 'src/views/static/js')));
server.use('/images', express_1.default.static(path_1.default.join(__dirname, 'src/views/static/images')));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(routes.getRoutes());
Database_1.Database.init().then(() => {
    const db = Database_1.Database.getDb();
    const webSocketService = WebSocketService_1.Service;
    webSocketService.init().then(() => server.listen(Environment_1.Env.SMARTHUB_EXPRESS_PORT, () => console.log(`Smart Hub is listening on port ${Environment_1.Env.SMARTHUB_EXPRESS_PORT}`)));
});
