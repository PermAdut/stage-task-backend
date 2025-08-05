import { NextFunction, Request, Response } from 'express';
import {
  authUser,
  generateNewAccessToken,
  registerNewUser,
} from './auth.service';
import { RegisterRequestDto, UserRequestDto } from './dto/auth.request.dto';

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userBody = await authUser(req.body as UserRequestDto);
    res.cookie('refreshToken', userBody.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(userBody);
  } catch (err) {
    next(err);
  }
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createdUser = await registerNewUser(req.body as RegisterRequestDto);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    const accessToken = await generateNewAccessToken(refreshToken);
    res.status(200).json(accessToken);
  } catch (err) {
    next(err);
  }
}
