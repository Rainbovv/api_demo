import { Module } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';
const PG_POOL = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api_demo',
  password: '446571',
});

const pgDbProvider = {
  provide: PG_CONNECTION,
  useValue: PG_POOL,
};

@Module({
  providers: [pgDbProvider],
  exports: [pgDbProvider],
})
export class DbModule {}
