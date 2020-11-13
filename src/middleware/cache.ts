import memoryCache from 'memory-cache';
import { IProduct } from '../types/db';

export function cache(id: string, data: IProduct[], duration: number): void {
    memoryCache.put(id, data, duration);
}
