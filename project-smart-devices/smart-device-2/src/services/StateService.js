"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class StateService {
    init() {
        this.state = {
            on: false,
            dim: 100,
            color: {
                red: 240,
                green: 240,
                blue: 240
            }
        };
        return Promise.resolve();
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = newState;
    }
}
const Service = new StateService();
exports.Service = Service;
