import { Router } from 'express';
import { getProjects } from './project.controller';
import { authenticateJwt } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../helpers/validateRequestHelper.helper';

const projectRoute = Router();
projectRoute.get(
  '/',
  authenticateJwt,
  validateRequest<{search: string}>([
    { name: 'search', type: 'string', required: true },
  ], true),
  getProjects
);
export default projectRoute;
