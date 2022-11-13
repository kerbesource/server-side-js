import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Env } from '../system/Environment';
import { Config as AxiosProxyConfig } from '../system/Axios';
import { DeviceDescriptor, DeviceManifest, ThermostatStatus, BulbState } from '../models';

export default class ViewController {
    private connectedDevices: DeviceDescriptor[];

    constructor() {
        this.connectedDevices = [];
    }

    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.sendFile(path.join(__dirname, '../views/index.html'), function (err: Error) {
            const status = err ? 500 : 200;
            res.status(status).end();
            next();
        });
    };

    public connect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const device: DeviceDescriptor | null = this.getDeviceDescriptorByUrl(req.body.deviceUrl);
        if (device != null) {
            res.send({ success: true, alreadyAdded: true });
            next();
            return;
        }

        try {
            const identifyResponse = await axios.get<DeviceManifest>(`${req.body.deviceUrl}/identify`, AxiosProxyConfig.getConfig());
            if (identifyResponse.status !== 200) {
                throw new Error();
            }
            const deviceDescriptor: DeviceDescriptor = { url: req.body.deviceUrl, manifest: identifyResponse.data, status: null };

            if (deviceDescriptor.manifest.deviceType == 'thermostat') {
                const statusResponse = await axios.get<ThermostatStatus>(`${req.body.deviceUrl}/status`, AxiosProxyConfig.getConfig());
                if (statusResponse.status !== 200) {
                    throw new Error();
                }
                deviceDescriptor.status = statusResponse.data;
                await axios.post(`${req.body.deviceUrl}/subscribe`, {
                    consumerEndpoint: `http://localhost:${Env.SMARTHUB_EXPRESS_PORT}/api/report/${deviceDescriptor.manifest.deviceId}`
                }, AxiosProxyConfig.getConfig());
            }
            else if (deviceDescriptor.manifest.deviceType == 'bulb') {
                const stateResponse = await axios.get<BulbState>(`${req.body.deviceUrl}/state`, AxiosProxyConfig.getConfig());
                if (stateResponse.status !== 200) {
                    throw new Error();
                }
                deviceDescriptor.status = stateResponse.data;
            }
            this.connectedDevices.push(deviceDescriptor);

            res.send({ success: true, device: deviceDescriptor });
            next();
        }
        catch (err) {
            console.error(err);
            res.send({ success: false });
            next();
        }
    };

    public disconnect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const device: DeviceDescriptor | null = this.getDeviceDescriptorById(req.params.deviceId);
        if (device != null) {
            if (device.manifest.deviceType === 'thermostat') {
                await axios.post(`${device.url}/unsubscribe`, {
                    consumerEndpoint: `http://localhost:${Env.SMARTHUB_EXPRESS_PORT}/api/report/${device.manifest.deviceId}`
                }, AxiosProxyConfig.getConfig());
            }
            this.connectedDevices = this.connectedDevices.filter(device => device.manifest.deviceId !== device.manifest.deviceId);
        }
        res.send({ success: true });
        next();
    }

    public adjustThermostat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const device: DeviceDescriptor | null = this.getDeviceDescriptorById(req.params.deviceId);
        if (device != null && device.manifest.deviceType == 'thermostat') {
            await axios.post(`${device.url}/adjust`, {
                threshold: req.body.newValue
            }, AxiosProxyConfig.getConfig());
        }
        res.send({ success: true });
        next();
    }

    public adjustBulb = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const device: DeviceDescriptor | null = this.getDeviceDescriptorById(req.params.deviceId);
        if (device != null && device.manifest.deviceType == 'bulb') {
            const newState = req.body as BulbState;
            
            if (newState.on as unknown as string == 'true') {
                await axios.post(`${device.url}/turnOn`, null, AxiosProxyConfig.getConfig());
            }
            else if (newState.on as unknown as string == 'false') {
                await axios.post(`${device.url}/turnOff`, null, AxiosProxyConfig.getConfig());
            }

            await axios.post(`${device.url}/dim`, {
                dim: newState.dim
            }, AxiosProxyConfig.getConfig());

            await axios.post(`${device.url}/color`, {
                red: newState.color.red,
                green: newState.color.green,
                blue: newState.color.blue
            }, AxiosProxyConfig.getConfig());
        }
        res.send({ success: true });
        next();
    }
    
    private getDeviceDescriptorById(id: string): DeviceDescriptor | null {
        const devices: DeviceDescriptor[] = this.connectedDevices.filter(device => device.manifest.deviceId === id);
        if (devices.length == 0) {
            return null;
        }
        return devices[0];
    }

    private getDeviceDescriptorByUrl(url: string): DeviceDescriptor | null {
        const devices: DeviceDescriptor[] = this.connectedDevices.filter(device => device.url === url);
        if (devices.length == 0) {
            return null;
        }
        return devices[0];
    }
}