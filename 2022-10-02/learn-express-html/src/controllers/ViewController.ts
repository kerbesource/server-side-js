import { Request, Response, NextFunction } from 'express';
import path from 'path';

export default class ViewController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.sendFile(path.join(__dirname, '../views/index.html'), function (err: Error) {
            const status = err ? 500 : 200;
            res.status(status).end();
            next();
        });
    };
}