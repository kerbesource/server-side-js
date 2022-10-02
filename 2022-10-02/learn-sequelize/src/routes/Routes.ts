import express from 'express';
import { Router } from 'express';
import ApiController from '../controllers/ApiController';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const apiController = new ApiController();

        this.router.get('/api/vehicles', apiController.getVehicles);
        this.router.get('/api/vehicles/:id', apiController.getVehicle);
        this.router.post('/api/vehicles', apiController.createVehicle);
        this.router.put('/api/vehicles/:id', apiController.updateVehicle);
        this.router.delete('/api/vehicles/:id', apiController.deleteVehicle);
        this.router.post('/api/vehicles/restore/:id', apiController.restoreVehicle);
    }

    getRoutes(): Router {
        return this.router;
    }
}