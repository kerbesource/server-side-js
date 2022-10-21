import { Request, Response, NextFunction } from 'express';

export default class Controller {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send()
        next();
    };
}