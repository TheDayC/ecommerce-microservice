// import { Request } from 'express';
import { NextFunction, Response } from 'express';
import memoryCache, { CacheClass } from 'memory-cache';
import { IProduct } from '../types/db';
import { CustomRequest } from '../types/express';

export function cacheData(id: string, data: IProduct[], duration: number): void {
    memoryCache.put(id, data, duration);
}

export function loadProducts(id: string, cache: CacheClass<unknown, unknown>): any {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const products = cache.get(id) as IProduct[]; // Ideally this would be parsed properly from unknown to IProduct[]
        
        req.products = products ? products : undefined;

        next();
    }
}
