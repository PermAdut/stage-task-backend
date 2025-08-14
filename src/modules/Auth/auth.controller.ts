import { NextFunction, Request, Response } from 'express';
import {
  authUser,
  generateNewAccessToken,
  registerNewUser,
} from './auth.service';
import { RegisterRequestDto, UserRequestDto } from './dto/auth.request.dto';
import { HttpStatusCode } from '../../utils/statusCodes';

export async function loginUser(
  req: Request<object, any, UserRequestDto, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const userBody = await authUser(req.body);
    res.cookie('refreshToken', userBody.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(HttpStatusCode.OK).json(userBody);
  } catch (err) {
    next(err);
  }
}

export async function registerUser(
  req: Request<object, any, RegisterRequestDto, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const createdUser = await registerNewUser(req.body);
    res.status(HttpStatusCode.CREATED).json(createdUser);
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(
  req: Request<object, any, any, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    const accessToken = await generateNewAccessToken(refreshToken);
    res.status(HttpStatusCode.OK).json(accessToken);
  } catch (err) {
    next(err);
  }
}
