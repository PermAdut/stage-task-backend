import express from 'express';
import { errorHandler } from './middlewares/handleError';
import userRouter from './modules/User/user.route';
import projectRoute from './modules/Projects/project.route';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3222',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1.0/user', userRouter);
app.use('/api/v1.0/projects', projectRoute);
app.use(errorHandler);
export default app;
