import express from 'express';
import { errorHandler } from './middlewares/handleError';
import userRouter from './modules/User/user.route';

const app = express();
app.use(express.json())
app.use('/api/v1.0/user', userRouter);
app.use(errorHandler);
export default app;