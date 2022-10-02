"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Database_1 = require("./src/system/Database");
const Environment_1 = require("./src/system/Environment");
const Routes_1 = __importDefault(require("./src/routes/Routes"));
const server = (0, express_1.default)();
const routes = new Routes_1.default();
server.use(express_1.default.json());
server.use(routes.getRoutes());
const db = Database_1.Database;
server.listen(Environment_1.Env.EXPRESS_PORT, () => console.log(`Listening on port ${Environment_1.Env.EXPRESS_PORT}`));
