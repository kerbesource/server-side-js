"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DefaultController_1 = __importDefault(require("../controllers/DefaultController"));
const VehiclesController_1 = __importDefault(require("../controllers/VehiclesController"));
const ApiController_1 = __importDefault(require("../controllers/ApiController"));
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        const defaultController = new DefaultController_1.default();
        const vehiclesController = new VehiclesController_1.default();
        const apiController = new ApiController_1.default();
        this.router.get('/', defaultController.index);
        this.router.get('/vehicles', vehiclesController.list);
        this.router.get('/vehicles/add', vehiclesController.getAdd);
        this.router.post('/vehicles/add', vehiclesController.postAdd);
        this.router.get('/vehicles/edit/:id', vehiclesController.getEdit);
        this.router.post('/vehicles/edit/:id', vehiclesController.postEdit);
        this.router.post('/vehicles/delete/:id', vehiclesController.postDelete);
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
