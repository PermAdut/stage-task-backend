import { NextFunction, Request, Response } from 'express';
import { AppError } from './handleError';
import { verifyAccessToken } from '../utils/jwt.util';
import { pool } from '../utils/database';
import { QueryResult } from 'pg';
import { User } from '../modules/Auth/user';
import { HttpStatusCode } from '../utils/statusCodes';
import { ErrorMessages } from '../utils/errorMessages';
export async function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(HttpStatusCode.UNAUTHORIZED, ErrorMessages.MISSING_OR_INVALID_AUTH_HEADER);
    }
    const token = authHeader.replace('Bearer ', '');
    const payload = await verifyAccessToken(token);
    const userQuery: QueryResult<User[]> = await pool.query(
      'SELECT * FROM "Users" WHERE username = $1',
      [payload.username]
    );
    const user: User[] = userQuery.rows[0];
    if (!user) {
      throw new AppError(HttpStatusCode.BAD_REQUEST, ErrorMessages.USER_NOT_FOUND);
    }
    next();
  } catch (err) {
    next(err);
  }
}
