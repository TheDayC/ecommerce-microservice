import { Request } from 'express';
import {IProduct} from './db';

export interface CustomRequest extends Request {
    products?: IProduct[];
}