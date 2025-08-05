import { NextFunction, Request, Response } from 'express';

export function parseCookie(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cookieHeader: string | undefined = req.headers.cookie;
  if (!cookieHeader) {
    res.status(401).json({
      error: `No cookie provided`,
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
