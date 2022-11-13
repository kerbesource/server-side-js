import express from 'express';
import { Router } from 'express';
import ViewController from '../controllers/ViewController';
import ApiController from '../controllers/ApiController';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const viewController = new ViewController();
        const apiController = new ApiController();

        this.router.get('/', viewController.index);
        this.router.post('/connect', viewController.connect);
        this.router.post('/disconnect/:deviceId', viewController.disconnect);
        this.router.post('/adjustThermostat/:deviceId', viewController.adjustThermostat);
        this.router.post('/adjustBulb/:deviceId', viewController.adjustBulb);
        this.router.post('/api/report/:deviceId', apiController.report);
    }

    getRoutes(): Router {
        return this.router;
    }
}