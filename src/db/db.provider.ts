import { Pool } from 'pg';
import { CONFIGURATION } from '../config/configuration';

export const PG_CONNECTION = 'DB_CONNECTION';

const PG_POOL = new Pool({
  user: String(CONFIGURATION.pg.user),
  host: String(CONFIGURATION.pg.host),
  database: String(CONFIGURATION.pg.database),
  password: String(CONFIGURATION.pg.password),
});

export const PG_DB_PROVIDER = {
  provide: PG_CONNECTION,
  useValue: PG_POOL,
};
