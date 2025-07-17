import { Router } from 'express';
import { getProjects } from './project.controller';

const projectRoute = Router();
projectRoute.get('/', getProjects);
export default projectRoute;
