import { Module } from '@nestjs/common';
import { PG_DB_PROVIDER } from './db.provider';

@Module({
  providers: [PG_DB_PROVIDER],
  exports: [PG_DB_PROVIDER],
})
export class DbModule {}
