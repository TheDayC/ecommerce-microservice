import { NextFunction, Request, Response } from 'express';
import memCache from 'memory-cache';

export function addProduct(req: Request, res: Response, next: NextFunction): void {
    res.send('Welcome to the ecommerce microservice!');
}
