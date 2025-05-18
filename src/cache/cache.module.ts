import { Module } from '@nestjs/common';
import { REDIS_INSTANCE_PROVIDER } from './cache.provider';

@Module({
  providers: [REDIS_INSTANCE_PROVIDER],
  exports: [REDIS_INSTANCE_PROVIDER],
})
export class CacheModule {}
