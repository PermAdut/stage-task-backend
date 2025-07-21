import { Router } from 'express';
import { getProjects } from './project.controller';
import { authenticateJwt } from '../../middlewares/authJWT';
import { validateQuery } from '../../middlewares/validateQueryParams';
import { ProjectQuery } from './dto/project.request.query';

const projectRoute = Router();
projectRoute.get(
  '/',
  authenticateJwt,
  validateQuery<ProjectQuery>([
    { name: 'search', type: 'string', required: true },
  ]),
  getProjects
);
export default projectRoute;
