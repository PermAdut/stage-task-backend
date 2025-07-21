import { Router } from 'express';
import { loginUser, refreshToken, registerUser } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequestDto';
import {
  RefreshTokenRequestDto,
  RegisterRequestDto,
  UserRequestDto,
} from './dto/auth.request.dto';
const authRouter = Router();


authRouter.post(
  '/login',
  validateRequest<UserRequestDto>([
    { name: 'username', type: 'string', required: true },
    { name: 'password', type: 'string', required: true },
  ]),
  loginUser
);
authRouter.post(
  '/refresh',
  validateRequest<RefreshTokenRequestDto>([
    { name: 'refreshToken', type: 'string', required: true },
  ]),
  refreshToken
);

authRouter.post(
  '/register',
  validateRequest<RegisterRequestDto>([
    { name: 'username', type: 'string', minLength: 3, required: true },
    {
      name: 'password',
      type: 'string',
      minLength: 4,
      required: true,
      customValidator: (value: unknown) => {
        if (typeof value !== 'string')
          return {
            result: false,
            error: 'password must be a string',
          };
        if (/^(?=.*[a-zA-Z])(?=.*\d)/.test(value)) return { result: true };
        return {
          result: false,
          error: 'password must contain at least 1 number and 1 letter.',
        };
      },
    },
    {
      name: 'repeatPassword',
      type: 'string',
      required: true,
      minLength: 4,
      customValidator: (value: unknown) => {
        if (typeof value !== 'string')
          return {
            result: false,
            error: 'password must be a string',
          };
        if (/^(?=.*[a-zA-Z])(?=.*\d)/.test(value)) return { result: true };
        return {
          result: false,
          error: 'password must contain at least 1 number and 1 letter.',
        };
      },
    },
    { name: 'firstName', type: 'string', minLength: 3, required: true },
    { name: 'lastName', type: 'string', minLength: 3, required: true },
    { name: 'age', type: 'number', min: 1, required: true },
  ]),
  registerUser
);
export default authRouter;
