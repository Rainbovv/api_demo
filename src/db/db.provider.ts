import { Pool } from 'pg';

export const PG_CONNECTION = 'DB_CONNECTION';

const PG_POOL = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api_demo',
  password: '446571',
});

export const PG_DB_PROVIDER = {
  provide: PG_CONNECTION,
  useValue: PG_POOL,
};
