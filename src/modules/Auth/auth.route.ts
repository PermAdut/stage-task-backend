import { Router } from 'express';
import { loginUser, refreshToken } from './auth.controller';
import { validateAuthRequest } from '../../middlewares/validateAuthRequestDto';
import { validateRefreshTokenRequest } from '../../middlewares/validateRefreshTokenRequestDto';
const authRouter = Router();
authRouter.post('/login', validateAuthRequest, loginUser);
authRouter.post('/refresh',validateRefreshTokenRequest, refreshToken)
export default authRouter;
