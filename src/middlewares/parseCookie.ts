import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../utils/statusCodes';
import { ErrorMessages } from '../utils/errorMessages';

export function parseCookie(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cookieHeader: string | undefined = req.headers.cookie;
  if (!cookieHeader) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      error: ErrorMessages.NO_COOKIE,
    });
    return;
  }
  const cookies: { [key: string]: string } = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = value;
    }
  });
  req.cookies = cookies;
  next();
}
