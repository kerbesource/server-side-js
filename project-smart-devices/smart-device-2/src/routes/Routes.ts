import express from 'express';
import { Router } from 'express';
import Controller from '../controllers/Controller';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const controller = new Controller();

        this.router.get('/identify', controller.identify);
        this.router.get('/state', controller.state);
        this.router.post('/turnOn', controller.turnOn);
        this.router.post('/turnOff', controller.turnOff);
        this.router.post('/dim', controller.dim);
        this.router.post('/color', controller.color);
    }

    getRoutes(): Router {
        return this.router;
    }
}