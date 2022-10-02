"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiController_1 = __importDefault(require("../controllers/ApiController"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        const apiController = new ApiController_1.default();
        this.router.get('/api/vehicles', apiController.getVehicles);
        this.router.get('/api/vehicles/:id', apiController.getVehicle);
        this.router.post('/api/vehicles', apiController.createVehicle);
        this.router.put('/api/vehicles/:id', apiController.updateVehicle);
        this.router.delete('/api/vehicles/:id', apiController.deleteVehicle);
        this.router.post('/api/vehicles/restore/:id', apiController.restoreVehicle);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = Routes;
