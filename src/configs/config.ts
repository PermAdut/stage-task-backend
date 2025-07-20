import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  jwtPrivateAccessKey:string;
  jwtPrivateRefreshKey:string;
}

const config: Config = {
  port: Number(process.env.PORT) || 4444,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtPrivateAccessKey: process.env.JWT_KEY || 'secret',
  jwtPrivateRefreshKey: process.env.JWT_REFRESH_KEY || 'secret'
};
export default config;
