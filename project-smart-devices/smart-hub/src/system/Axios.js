"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Environment_1 = require("./Environment");
class AxiosProxyConfig {
    constructor() {
        this.config = {
            proxy: {
                host: Environment_1.Env.AXIOS_PROXY_HOST,
                port: parseInt(Environment_1.Env.AXIOS_PROXY_PORT)
            }
        };
    }
    getConfig() {
        return this.config;
    }
}
const Config = new AxiosProxyConfig();
exports.Config = Config;
