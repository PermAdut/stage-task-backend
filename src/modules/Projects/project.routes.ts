import { Router } from 'express';
import { getProjects } from './project.controller';
import { authenticateJwt } from '../../middlewares/authJWT';

const projectRoute = Router();
projectRoute.get('/', authenticateJwt, getProjects);
export default projectRoute;
