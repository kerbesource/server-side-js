"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ViewController_1 = __importDefault(require("../controllers/ViewController"));
const ApiController_1 = __importDefault(require("../controllers/ApiController"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        const viewController = new ViewController_1.default();
        const apiController = new ApiController_1.default();
        this.router.get('/', viewController.index);
        this.router.post('/connect', viewController.connect);
        this.router.post('/disconnect/:deviceId', viewController.disconnect);
        this.router.post('/adjustThermostat/:deviceId', viewController.adjustThermostat);
        this.router.post('/adjustBulb/:deviceId', viewController.adjustBulb);
        this.router.post('/api/report/:deviceId', apiController.report);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = Routes;
