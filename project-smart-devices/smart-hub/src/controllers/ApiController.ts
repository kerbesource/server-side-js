import { Request, Response, NextFunction } from 'express';
import { Database } from '../system/Database';
import { Service as WebSocketService } from '../services/WebSocketService';
import { Report } from '../models';

export default class ApiController {
    public report = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const document: Report = {
            deviceId: req.params.deviceId,
            value: req.body
        };
        const db = Database.getDb();
        const collection = db.collection('reports');
        await collection.insertOne(document);
        WebSocketService.refreshFrontend(document);
        res.send({ success: true });
        next();
    };
}