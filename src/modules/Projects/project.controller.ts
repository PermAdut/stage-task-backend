import { NextFunction, Request, Response } from 'express';
import { filterProjects } from './project.service';
import { ProjectResponse } from './dto/project.response.dto';
import { HttpStatusCode } from '../../utils/statusCodes';

export async function getProjects(
  req: Request<object, any, any, {search: string}>,
  res: Response,
  next: NextFunction
) {
  try {
    const searchString = req.query.search;
    const projects: ProjectResponse = await filterProjects(searchString);
    res.status(HttpStatusCode.OK).json(projects);
  } catch (err) {
    next(err);
  }
}
