import { NextFunction, Request, Response } from 'express';
import { authUser } from './user.service';

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userBody = await authUser(req.body);
    res.status(200).json(userBody);
  } catch (err) {
    next(err);
  }
}
