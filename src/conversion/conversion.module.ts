import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { HttpModule } from '@nestjs/axios';
import { ConversionService } from './conversion.service';
import { CacheModule } from '../cache/cache.module';
import { CacheService } from '../cache/cache.service';
import { RedisCacheService } from '../cache/impl/redis.service';

export const CACHE_PROVIDER = {
  provide: CacheService,
  useClass: RedisCacheService,
};

@Module({
  imports: [HttpModule, CacheModule],
  controllers: [ConversionController],
  providers: [ConversionService, CACHE_PROVIDER],
})
export class ConversionModule {}
