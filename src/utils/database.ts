import config from '../configs/config';
import { Pool } from 'pg';

export const pool = new Pool({
  user: config.postgres.pgUser,
  password: config.postgres.pgPassword,
  database: config.postgres.pgDataBase,
  host: config.postgres.pgHost,
  port: config.postgres.pgPort,
});