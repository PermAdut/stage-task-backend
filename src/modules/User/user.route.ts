import { Router } from 'express';
import { loginUser } from './user.controller';
import { validateUserRequest } from '../../middlewares/validateUserRequestDto';
const userRouter = Router();
userRouter.post('/login', validateUserRequest, loginUser);
export default userRouter;
