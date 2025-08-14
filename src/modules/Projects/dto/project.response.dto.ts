import { IProject } from '../project';

export type ProjectResponse = ProjectResponseElement[];

export type ProjectResponseElement = Omit<IProject, 'id'>
