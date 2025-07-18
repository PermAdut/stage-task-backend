import { NextFunction, Request, Response } from 'express';
import { filterProjects } from './project.service';
import { ProjectResponse } from './dto/projectResponse.dto';

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchString = req.query.search as string;
    const projects: ProjectResponse = await filterProjects(searchString);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
}
