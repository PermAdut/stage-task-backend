import { NextFunction, Request, Response } from 'express';
import { AppError } from './handleError';
import { verifyAccessToken } from '../utils/jwt.util';
import { pool } from '../utils/database';
import { QueryResult } from 'pg';
import { User } from '../modules/Auth/user';
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
    const userQuery: QueryResult<User[]> = await pool.query(
      'SELECT * FROM "Users" WHERE username = $1',
      [payload.username]
    );
    const user: User[] = userQuery.rows[0];
    if (!user) {
      throw new AppError(400, 'User not found');
    }
    next();
  } catch (err) {
    next(err);
  }
}
