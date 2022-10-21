import { Request, Response, NextFunction } from 'express';

export default class ApiController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send()
        next();
    };
}