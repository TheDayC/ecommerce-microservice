import { NextFunction, Request, Response } from 'express';

export function index(req: Request, res: Response, next: NextFunction): void {
    res.send('Welcome to the ecommerce microservice!');
}
