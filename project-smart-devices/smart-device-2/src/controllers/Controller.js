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
const StateService_1 = require("../services/StateService");
class Controller {
    constructor() {
        this.identify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.manifest);
            next();
        });
        this.state = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(StateService_1.Service.getState());
            next();
        });
        this.turnOn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const state = StateService_1.Service.getState();
            if (!state.on) {
                state.on = true;
                StateService_1.Service.setState(state);
            }
            res.send({ success: true });
            next();
        });
        this.turnOff = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const state = StateService_1.Service.getState();
            if (state.on) {
                state.on = false;
                StateService_1.Service.setState(state);
            }
            res.send({ success: true });
            next();
        });
        this.dim = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const state = StateService_1.Service.getState();
            const newDim = req.body.dim;
            if (state.dim != newDim) {
                state.dim = newDim;
                StateService_1.Service.setState(state);
            }
            res.send({ success: true });
            next();
        });
        this.color = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const state = StateService_1.Service.getState();
            const newColor = req.body;
            if (state.color != newColor) {
                state.color = newColor;
                StateService_1.Service.setState(state);
            }
            res.send({ success: true });
            next();
        });
        this.manifest = {
            deviceId: 'e16826ac-2372-4ed2-9aee-407491554f5b',
            deviceType: 'bulb',
            deviceName: 'Smart Bulb 1'
        };
    }
}
exports.default = Controller;
