import { AxiosRequestConfig } from "axios";
import { Env } from './Environment';

class AxiosProxyConfig {
    private config: AxiosRequestConfig;

    constructor() {
        this.config = {
            proxy: {
                host: Env.AXIOS_PROXY_HOST as string,
                port: parseInt(Env.AXIOS_PROXY_PORT as string)
            }
        };
    }

    public getConfig(): AxiosRequestConfig {
        return this.config;
    }
}

const Config = new AxiosProxyConfig();

export { Config };