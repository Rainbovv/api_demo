import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CACHE_INSTANCE } from '../cache.provider';
import Keyv from 'keyv';
import { CacheService } from '../cache.service';

@Injectable()
export class RedisCacheService implements CacheService {
  constructor(@Inject(REDIS_CACHE_INSTANCE) private readonly cache: Keyv) {}
  async get<T>(key: string): Promise<T | undefined> {
    console.log(`Getting from Redis: ${key}`);
    return await this.cache.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    console.log(`Storing in Redis: ${key} =>`, value);
    await this.cache.set<T>(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    console.log(`Deleting from Redis: ${key}`);
    await this.cache.delete(key);
  }
}
