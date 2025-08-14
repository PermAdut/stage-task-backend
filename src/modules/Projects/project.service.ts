/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { QueryResult } from 'pg';
import { pool } from '../../utils/database';
import {
  ProjectResponse,
  ProjectResponseElement,
} from './dto/project.response.dto';
import { IUser } from '../Auth/user';
import { HttpStatusCode } from '../../utils/statusCodes';
import { ErrorMessages } from '../../utils/errorMessages';
import { AppError } from '../../middlewares/error.middleware';
export async function filterProjects(
  searchString: string,
  id: number
): Promise<ProjectResponse> {
  try {
    const userQuery: QueryResult<IUser[]> = await pool.query(
      'SELECT * FROM "Users" WHERE id = $1',
      [id]
    );
    const user: IUser[] = userQuery.rows[0];
    if (!user) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorMessages.USER_NOT_FOUND
      );
    }
    const pattern = `%${searchString}%`;
    const projectsQuery: QueryResult<ProjectResponseElement> = await pool.query(
      `SELECT image, "altText", title, description, version, "moreVersion" FROM "Projects" WHERE title LIKE $1 OR description LIKE $1 ORDER BY id ASC`,
      [pattern]
    );
    return projectsQuery.rows;
  } catch (err: any) {
    throw new AppError(
      err?.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
      err?.message || ErrorMessages.INTERNAL_SERVER_ERROR
    );
  }
}