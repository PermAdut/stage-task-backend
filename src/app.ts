import express from 'express';
import { errorHandler } from './middlewares/handleError';
import authRouter from './modules/Auth/auth.routes';
import projectRoute from './modules/Projects/project.routes';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './configs/swaggerOptions';
import swaggerUi from 'swagger-ui-express';

const corsOptions = {
  origin: 'http://localhost:3222',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization,Bearer',
};

const app = express();
app.use(express.json());
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1.0/user', authRouter);
app.use('/api/v1.0/projects', projectRoute);
app.use(errorHandler);
export default app;
