import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Vehicle } from '../models/TVehicle';

export default class VehiclesController {
    public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.sendFile(path.join(__dirname, '../views/vehicles/list.html'), function (err: Error) {
            const status = err ? 500 : 200;
            res.status(status).end();
            next();
        });
    };

    public getAdd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.sendFile(path.join(__dirname, '../views/vehicles/add.html'), function (err: Error) {
            const status = err ? 500 : 200;
            res.status(status).end();
            next();
        });
    };

    public postAdd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Vehicle.create(req.body);
        res.redirect('/vehicles');
        next();
    };

    public getEdit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.sendFile(path.join(__dirname, '../views/vehicles/edit.html'), function (err: Error) {
            const status = err ? 500 : 200;
            res.status(status).end();
            next();
        });
    };

    public postEdit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Vehicle.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/vehicles');
        next();
    };

    public postDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Vehicle.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/vehicles');
        next();
    };
}