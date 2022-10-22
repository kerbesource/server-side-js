import express from 'express';
import { Router } from 'express';
import Controller from '../controllers/Controller';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const controller = new Controller();

        this.router.get('/identify', controller.identify);
        this.router.post('/subscribe', controller.subscribe);
        this.router.post('/unsubscribe', controller.unsubscribe);
        this.router.get('/status', controller.status);
        this.router.post('/adjust', controller.adjust);
    }

    getRoutes(): Router {
        return this.router;
    }
}