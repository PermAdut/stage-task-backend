import { NextFunction, Request, Response } from 'express';
import { authUser } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userBody = await authUser(req.body as UserRequestDto);
    res.status(200).json(userBody);
  } catch (err) {
    next(err);
  }
}
