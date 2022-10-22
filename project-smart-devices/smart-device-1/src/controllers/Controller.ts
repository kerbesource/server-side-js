import { Request, Response, NextFunction } from 'express';
import { Service as SensorService } from '../services/SensorService';
import { Service as SubscriptionService, Subscription } from '../services/SubscriptionService';

interface DeviceManifest {
    deviceId: string,
    deviceName: string,
    deviceType: string
}

export default class Controller {
    private manifest: DeviceManifest;

    constructor() {
        this.manifest = {
            deviceId: '97f36c4d-2ec6-4f48-8cb4-50cdd055a5f1',
            deviceName: 'Thermostat',
            deviceType: 'thermostat'
        };
    }

    public identify = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send(this.manifest);
        next();
    };

    public subscribe = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subscription = req.body as Subscription;
        SubscriptionService.subscribe(subscription);
        res.send({ success: true });
        next();
    };

    public unsubscribe = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subscription = req.body as Subscription;
        SubscriptionService.unsubscribe(subscription);
        res.send({ success: true });
        next();
    };

    public status = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send(SensorService.getStatus());
        next();
    };

    public adjust = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newThreshold = req.body.threshold as number;
        SensorService.adjustThreshold(newThreshold);
        res.send({ success: true });
        next();
    };
}