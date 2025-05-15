import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionRepository } from '../repo/impl/conversion.repository';
import { HttpModule } from '@nestjs/axios';
import { AbstractConversionRepository } from './conversion.repository';
import { ConversionService } from './conversion.service';
import { CacheModule } from '@nestjs/cache-manager';

const CONVERSION_REPO_PROVIDER = {
  provide: AbstractConversionRepository,
  useClass: ConversionRepository,
};

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ConversionController],
  providers: [ConversionService, CONVERSION_REPO_PROVIDER],
})
export class ConversionModule {}
