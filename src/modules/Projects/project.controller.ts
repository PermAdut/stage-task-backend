import { NextFunction, Response } from 'express';
import { filterProjects } from './project.service';
import { ProjectResponse } from './dto/project.response.dto';
import { HttpStatusCode } from '../../utils/statusCodes';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ErrorMessages } from '../../utils/errorMessages';

interface ProjectRequest extends AuthRequest {
  query: { search: string };
}

export async function getProjects(
  req: ProjectRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const searchString = req.query.search;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(ErrorMessages.USER_NOT_FOUND);
    }
    const projects: ProjectResponse = await filterProjects(searchString, userId);
    res.status(HttpStatusCode.OK).json(projects);
  } catch (err) {
    next(err);
  }
}
