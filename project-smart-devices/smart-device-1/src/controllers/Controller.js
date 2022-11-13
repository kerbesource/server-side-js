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
Object.defineProperty(exports, "__esModule", { value: true });
const SensorService_1 = require("../services/SensorService");
const SubscriptionService_1 = require("../services/SubscriptionService");
class Controller {
    constructor() {
        this.identify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.manifest);
            next();
        });
        this.subscribe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const subscription = req.body;
            SubscriptionService_1.Service.subscribe(subscription);
            res.send({ success: true });
            next();
        });
        this.unsubscribe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const subscription = req.body;
            SubscriptionService_1.Service.unsubscribe(subscription);
            res.send({ success: true });
            next();
        });
        this.status = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(SensorService_1.Service.getStatus());
            next();
        });
        this.adjust = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newThreshold = parseInt(req.body.threshold);
            SensorService_1.Service.adjustThreshold(newThreshold);
            res.send({ success: true });
            next();
        });
        this.manifest = {
            deviceId: '97f36c4d-2ec6-4f48-8cb4-50cdd055a5f1',
            deviceType: 'thermostat',
            deviceName: 'Thermostat 1'
        };
    }
}
exports.default = Controller;
