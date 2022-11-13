"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const Environment_1 = require("../system/Environment");
const Axios_1 = require("../system/Axios");
class ViewController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, '../views/index.html'), function (err) {
                const status = err ? 500 : 200;
                res.status(status).end();
                next();
            });
        });
        this.connect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const device = this.getDeviceDescriptorByUrl(req.body.deviceUrl);
            if (device != null) {
                res.send({ success: true, alreadyAdded: true });
                next();
                return;
            }
            try {
                const identifyResponse = yield axios_1.default.get(`${req.body.deviceUrl}/identify`, Axios_1.Config.getConfig());
                if (identifyResponse.status !== 200) {
                    throw new Error();
                }
                const deviceDescriptor = { url: req.body.deviceUrl, manifest: identifyResponse.data, status: null };
                if (deviceDescriptor.manifest.deviceType == 'thermostat') {
                    const statusResponse = yield axios_1.default.get(`${req.body.deviceUrl}/status`, Axios_1.Config.getConfig());
                    if (statusResponse.status !== 200) {
                        throw new Error();
                    }
                    deviceDescriptor.status = statusResponse.data;
                    yield axios_1.default.post(`${req.body.deviceUrl}/subscribe`, {
                        consumerEndpoint: `http://localhost:${Environment_1.Env.SMARTHUB_EXPRESS_PORT}/api/report/${deviceDescriptor.manifest.deviceId}`
                    }, Axios_1.Config.getConfig());
                }
                else if (deviceDescriptor.manifest.deviceType == 'bulb') {
                    const stateResponse = yield axios_1.default.get(`${req.body.deviceUrl}/state`, Axios_1.Config.getConfig());
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
        });
        this.disconnect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const device = this.getDeviceDescriptorById(req.params.deviceId);
            if (device != null) {
                if (device.manifest.deviceType === 'thermostat') {
                    yield axios_1.default.post(`${device.url}/unsubscribe`, {
                        consumerEndpoint: `http://localhost:${Environment_1.Env.SMARTHUB_EXPRESS_PORT}/api/report/${device.manifest.deviceId}`
                    }, Axios_1.Config.getConfig());
                }
                this.connectedDevices = this.connectedDevices.filter(device => device.manifest.deviceId !== device.manifest.deviceId);
            }
            res.send({ success: true });
            next();
        });
        this.adjustThermostat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const device = this.getDeviceDescriptorById(req.params.deviceId);
            if (device != null && device.manifest.deviceType == 'thermostat') {
                yield axios_1.default.post(`${device.url}/adjust`, {
                    threshold: req.body.newValue
                }, Axios_1.Config.getConfig());
            }
            res.send({ success: true });
            next();
        });
        this.adjustBulb = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const device = this.getDeviceDescriptorById(req.params.deviceId);
            if (device != null && device.manifest.deviceType == 'bulb') {
                const newState = req.body;
                if (newState.on == 'true') {
                    yield axios_1.default.post(`${device.url}/turnOn`, null, Axios_1.Config.getConfig());
                }
                else if (newState.on == 'false') {
                    yield axios_1.default.post(`${device.url}/turnOff`, null, Axios_1.Config.getConfig());
                }
                yield axios_1.default.post(`${device.url}/dim`, {
                    dim: newState.dim
                }, Axios_1.Config.getConfig());
                yield axios_1.default.post(`${device.url}/color`, {
                    red: newState.color.red,
                    green: newState.color.green,
                    blue: newState.color.blue
                }, Axios_1.Config.getConfig());
            }
            res.send({ success: true });
            next();
        });
        this.connectedDevices = [];
    }
    getDeviceDescriptorById(id) {
        const devices = this.connectedDevices.filter(device => device.manifest.deviceId === id);
        if (devices.length == 0) {
            return null;
        }
        return devices[0];
    }
    getDeviceDescriptorByUrl(url) {
        const devices = this.connectedDevices.filter(device => device.url === url);
        if (devices.length == 0) {
            return null;
        }
        return devices[0];
    }
}
exports.default = ViewController;
