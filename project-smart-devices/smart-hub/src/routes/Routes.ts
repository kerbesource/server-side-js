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
        this.router.get('/api', apiController.index);
    }

    getRoutes(): Router {
        return this.router;
    }
}