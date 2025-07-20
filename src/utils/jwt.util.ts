import jwt from 'jsonwebtoken';
import config from '../configs/config';
import { AppError } from '../middlewares/handleError';

interface JWTPayload {
  username: string;
}

export async function generateAccessToken(username: string): Promise<string> {
  const payload: JWTPayload = { username };
  const accessToken = jwt.sign(payload, config.jwtPrivateAccessKey, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return accessToken;
}

export async function generateRefreshToken(username: string): Promise<string> {
  const payload: JWTPayload = { username };
  const refreshToken = jwt.sign(payload, config.jwtPrivateRefreshKey, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return refreshToken;
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  try {
    const decoded = jwt.verify(token, config.jwtPrivateAccessKey) as JWTPayload;
    return decoded;
  } catch {
    throw new AppError(401, 'Invalid or expired access token');
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload> {
  try {
    const decoded = jwt.verify(token, config.jwtPrivateRefreshKey) as JWTPayload;
    return decoded;
  } catch {
    throw new AppError(401, 'Invalid or expired refresh token');
  }
}
