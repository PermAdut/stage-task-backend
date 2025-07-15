import { Request, Response, NextFunction } from 'express';
import { UserRequestDto } from '../../src/modules/User/dto/userRequest.dto';

export function validateUserRequest(req: Request, res: Response, next: NextFunction) {
  const body = req.body as unknown;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body: body must be an object' });
  }
  const { userName, password } = body as Record<string, unknown>;
  if (typeof userName !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid request body: userName and password must be strings' });
  }
  req.body = { userName, password } as UserRequestDto;
  next();
}