import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import authRouter from './modules/Auth/auth.routes';
import projectRoute from './modules/Projects/project.routes';
import cors from 'cors';
import config from './configs/config';

const corsOptions = {
  origin: config.origins,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization,Bearer',
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1.0/user', authRouter);
app.use('/api/v1.0/projects', projectRoute);
app.use(errorHandler);
export default app;
