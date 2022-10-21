import express from 'express';
import { Router } from 'express';
import Controller from '../controllers/Controller';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const controller = new Controller();

        this.router.get('/', controller.index);
    }

    getRoutes(): Router {
        return this.router;
    }
}