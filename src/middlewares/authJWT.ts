import { NextFunction, Request, Response } from 'express';
import { AppError } from './handleError';
import { verifyAccessToken } from '../utils/jwt.util';
import { getUsers } from '../utils/database';
export async function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Authorization header missing or invalid');
    }
    const token = authHeader.replace('Bearer ', '');
    const payload = await verifyAccessToken(token);

    const users = await getUsers();
    const user = users.find((u) => u.userName === payload.username);
    if (!user) {
      throw new AppError(401, 'User not found');
    }
    next();
  } catch (err) {
    next(err);
  }
}
