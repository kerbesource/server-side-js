import express from 'express';
import { Router } from 'express';
import DefaultController from '../controllers/DefaultController';
import VehiclesController from '../controllers/VehiclesController';
import ApiController from '../controllers/ApiController';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const defaultController = new DefaultController();
        const vehiclesController = new VehiclesController();
        const apiController = new ApiController();

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

    getRoutes(): Router {
        return this.router;
    }
}