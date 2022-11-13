"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = __importDefault(require("../controllers/Controller"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        const controller = new Controller_1.default();
        this.router.get('/identify', controller.identify);
        this.router.get('/state', controller.state);
        this.router.post('/turnOn', controller.turnOn);
        this.router.post('/turnOff', controller.turnOff);
        this.router.post('/dim', controller.dim);
        this.router.post('/color', controller.color);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = Routes;
