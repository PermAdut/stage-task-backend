import { QueryResult } from 'pg';
import { pool } from '../../utils/database';
import { ProjectResponse, ProjectResponseElement } from './dto/project.response.dto';

export async function filterProjects(
  searchString: string
): Promise<ProjectResponse> {
  const pattern = `%${searchString}%`;
  const projectsQuery: QueryResult<ProjectResponseElement> = await pool.query(
    `SELECT image, "altText", title, description, version, "moreVersion" FROM "Projects" WHERE title LIKE $1 OR description LIKE $1 ORDER BY id ASC`,
    [pattern]
  );
  return projectsQuery.rows;
}
