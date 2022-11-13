"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const WebSocket = __importStar(require("ws"));
const Environment_1 = require("../system/Environment");
class WebSocketService {
    init() {
        this.wss = new WebSocket.Server({ port: parseInt(Environment_1.Env.SMARTHUB_WSS_PORT) });
        this.clients = [];
        this.wss.on('connection', (ws) => {
            this.clients.push(ws);
            ws.on('close', () => {
                this.clients = this.clients.filter(client => client != ws);
            });
        });
        return Promise.resolve();
    }
    refreshFrontend(report) {
        this.clients.forEach((client) => {
            client.send(JSON.stringify(report));
        });
    }
}
const Service = new WebSocketService();
exports.Service = Service;
