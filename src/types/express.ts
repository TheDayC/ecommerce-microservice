import { NextFunction, Request, Response } from 'express';
import {IProduct} from './db';

export interface CustomRequest extends Request {
    products?: IProduct[];
}

export type ExpressFunc = (req: CustomRequest, res: Response, next: NextFunction) => void;