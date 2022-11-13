import { Request, Response, NextFunction } from 'express';
import { Service as StateService, BulbColor } from '../services/StateService';

interface DeviceManifest {
    deviceId: string,
    deviceType: string,
    deviceName: string
}

export default class Controller {
    private manifest: DeviceManifest;

    constructor() {
        this.manifest = {
            deviceId: 'e16826ac-2372-4ed2-9aee-407491554f5b',
            deviceType: 'bulb',
            deviceName: 'Smart Bulb 1'
        };
    }

    public identify = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send(this.manifest);
        next();
    };

    public state = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send(StateService.getState());
        next();
    };

    public turnOn = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const state = StateService.getState();
        if (!state.on) {
            state.on = true;
            StateService.setState(state);
        }
        res.send({ success: true });
        next();
    }

    public turnOff = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const state = StateService.getState();
        if (state.on) {
            state.on = false;
            StateService.setState(state);
        }
        res.send({ success: true });
        next();
    }

    public dim = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const state = StateService.getState();
        const newDim = req.body.dim as number;
        if (state.dim != newDim) {
            state.dim = newDim;
            StateService.setState(state);
        }
        res.send({ success: true });
        next();
    }

    public color = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const state = StateService.getState();
        const newColor = req.body as BulbColor;
        if (state.color != newColor) {
            state.color = newColor;
            StateService.setState(state);
        }
        res.send({ success: true });
        next();
    }
}