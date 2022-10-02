import { Request, Response, NextFunction } from 'express';

export default class DefaultController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.redirect('/vehicles');
        next();
    };
}