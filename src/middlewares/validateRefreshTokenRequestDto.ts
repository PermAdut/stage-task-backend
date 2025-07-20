import { Request, Response, NextFunction } from 'express';
import { RefreshTokenRequestDto } from '../modules/Auth/dto/auth.request.dto';

export function validateRefreshTokenRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as unknown;
  if (!body || typeof body !== 'object') {
    return res
      .status(400)
      .json({ error: 'Invalid request body: body must be an object' });
  }
  const { refreshToken } = body as Record<string, unknown>;
    if (!refreshToken || typeof refreshToken !== 'string') {
    return res.status(400).json({
      error: 'Refresh token does not provided',
    });
  }
  req.body = { refreshToken } as RefreshTokenRequestDto;
  next();
}
