import * as WebSocket from 'ws';
import { Env } from '../system/Environment';
import { Report } from '../models';

class WebSocketService {
    private wss: WebSocket.Server;
    private clients: WebSocket.WebSocket[];

    public init(): Promise<void> {
        this.wss = new WebSocket.Server({ port: parseInt(Env.SMARTHUB_WSS_PORT as string) });
        this.clients = [];

        this.wss.on('connection', (ws: WebSocket.WebSocket) => {
            this.clients.push(ws);

            ws.on('close', () => {
                this.clients = this.clients.filter(client => client != ws);
            });
        });
        return Promise.resolve();
    }

    public refreshFrontend(report: Report) {
        this.clients.forEach((client) => {
            client.send(JSON.stringify(report));
        });
    }
}

const Service = new WebSocketService();

export { Service };