import express from 'express';
import { Router } from 'express';
import ViewController from '../controllers/ViewController';

export default class Routes {
    private router: Router;

    constructor() {
        this.router = express.Router();

        const viewController = new ViewController();

        this.router.get('', viewController.index);
    }

    getRoutes(): Router {
        return this.router;
    }
}