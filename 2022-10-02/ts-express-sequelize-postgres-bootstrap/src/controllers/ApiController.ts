import { Request, Response, NextFunction } from 'express';
import { Vehicle } from '../models/TVehicle';

export default class ApiController {
    public getVehicles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const vehicles = await Vehicle.findAll();
        res.send(vehicles);
        next();
    };

    public getVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (vehicle == null) {
            res.status(404);
            res.send();
        }
        else {
            res.send(vehicle);
        }
        next();
    }

    public createVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        var vehicle;
        try {
            vehicle = await Vehicle.create(req.body);
            res.status(201);
            res.send(vehicle);
        }
        catch (err) {
            res.status(422);
            res.send(err);
        }
        finally {
            next();
        }
    };

    public updateVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const rowsAffected = await Vehicle.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (rowsAffected[0] == 0) {
            res.status(404);
            res.send();
        }
        else {
            res.status(204);
            res.send();
        }
        next();
    };

    public deleteVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Vehicle.destroy({
            where: {
                id: req.params.id
            }
        });

        res.send();
        next();
    };

    public restoreVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Vehicle.restore({
            where: {
                id: req.params.id
            }
        });

        res.send();
        next();
    };
}