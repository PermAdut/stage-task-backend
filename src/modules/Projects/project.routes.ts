import { Router } from 'express';
import { getProjects } from './project.controller';
import { authenticateJwt } from '../../middlewares/auth.middleware';
import { validateQuery } from '../../middlewares/validateQueryParams';

const projectRoute = Router();
projectRoute.get(
  '/',
  authenticateJwt,
  validateQuery<{search: string}>([
    { name: 'search', type: 'string', required: true },
  ]),
  getProjects
);
export default projectRoute;
