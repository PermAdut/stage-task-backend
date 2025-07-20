import { NextFunction, Request, Response } from 'express';
import { authUser, generateNewAccessToken } from './auth.service';
import { RefreshTokenRequestDto, UserRequestDto } from './dto/auth.request.dto';

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

export async function refreshToken(req:Request, res:Response, next:NextFunction){
  try{
    const accessToken = await generateNewAccessToken((req.body as RefreshTokenRequestDto).refreshToken);
    res.status(200).json(accessToken)
  } catch(err){
    next(err);
  }
}