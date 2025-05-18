import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';

export const REDIS_CACHE_INSTANCE = 'REDIS_INSTANCE';

const REDIS_CACHE_FACTORY = () => {
  const redisStore = new KeyvRedis('redis://localhost:6379');
  return new Keyv({ store: redisStore, namespace: '' });
};

export const REDIS_INSTANCE_PROVIDER = {
  provide: REDIS_CACHE_INSTANCE,
  useFactory: REDIS_CACHE_FACTORY,
};
