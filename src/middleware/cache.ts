import { Cache, IProduct } from '../types/db';

export function cacheData(id: string, data: IProduct[], duration: number, cache: Cache): void {
    cache.put(id, data, duration);
}
