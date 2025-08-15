import jwt from 'jsonwebtoken';
import config from '../configs/config';
import { AppError } from '../middlewares/error.middleware';
import { HttpStatusCode } from './statusCodes';
import { ErrorMessages } from './errorMessages';

interface JWTPayload {
  username: string;
  id:number;
}

export async function generateAccessToken(username: string, id:number): Promise<string> {
  const payload: JWTPayload = { username, id };
  const accessToken = jwt.sign(payload, config.jwtPrivateAccessKey, {
    expiresIn: '1d',
  });
  return accessToken;
}

export async function generateRefreshToken(username: string, id:number): Promise<string> {
  const payload: JWTPayload = { username, id };
  const refreshToken = jwt.sign(payload, config.jwtPrivateRefreshKey, {
    expiresIn: '7d',
  });
  return refreshToken;
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  try {
    const decoded = jwt.verify(token, config.jwtPrivateAccessKey) as JWTPayload;
    return decoded;
  } catch {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, ErrorMessages.INVALID_OR_EXPIRED_ACCESS_TOKEN);
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload> {
  try {
    const decoded = jwt.verify(token, config.jwtPrivateRefreshKey) as JWTPayload;
    return decoded;
  } catch {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, ErrorMessages.INVALID_OR_EXPIRED_REFRESH_TOKEN);
  }
}
