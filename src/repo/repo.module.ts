import { Module } from '@nestjs/common';
import { PG_CONNECTION, PG_DB_PROVIDER } from './repo.provider';

@Module({
  providers: [PG_DB_PROVIDER],
  exports: [PG_CONNECTION],
})
export class RepoModule {}
