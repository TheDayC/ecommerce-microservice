import { CacheClass } from 'memory-cache';

export interface IProduct {
    id: number;
    name: string;
    weight: number;
    delivery_days: number; 
}

export interface ICartItem extends IProduct{
    amount: number;
}

export type Cache = CacheClass<unknown, unknown>;