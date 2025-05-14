import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionRepository } from '../db/repo/conversion.repository';
import { HttpModule } from '@nestjs/axios';
import { AbstractConversionRepository } from './conversion.repository';
import { ConversionService } from './conversion.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ConversionController],
  providers: [
    ConversionService,
    {
      provide: AbstractConversionRepository,
      useClass: ConversionRepository,
    },
  ],
})
export class ConversionModule {}
