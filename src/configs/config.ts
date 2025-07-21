import dotenv from 'dotenv';

dotenv.config();

interface PostgresCredentials {
  pgUser: string;
  pgPassword: string;
  pgHost: string;
  pgPort: number;
  pgDataBase: string;
}

interface Config {
  port: number;
  nodeEnv: string;
  jwtPrivateAccessKey: string;
  jwtPrivateRefreshKey: string;
  postgres: PostgresCredentials;
  salt:number,
}

const config: Config = {
  port: Number(process.env.PORT) || 4444,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtPrivateAccessKey: process.env.JWT_KEY || 'secret',
  jwtPrivateRefreshKey: process.env.JWT_REFRESH_KEY || 'secret',
  salt: Number(process.env.SECRET_SALT) || 10,
  postgres: {
    pgUser: process.env.PG_USER || 'postgres',
    pgPassword: process.env.PG_PASSWORD || 'postgres',
    pgHost: process.env.PG_HOST || 'localhost',
    pgPort: Number(process.env.PG_PORT) || 5432,
    pgDataBase: process.env.PG_DATABASE || 'Spring',
  },
};
export default config;
