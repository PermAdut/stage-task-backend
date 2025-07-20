import { Project } from '../modules/Projects/project';
import { User } from '../modules/Auth/user';

const users: User[] = [
  {
    userName: 'admin',
    password: '1234',
  },
];

export async function getUsers() {
  return users;
}

const projects: Project[] = [
  {
    image: 'spring-boot.svg',
    altText: 'spring boot',
    title: 'spring boot',
    description:
      'Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.',
    version: '3.5.3',
    moreVersion: '+ 9 versions',
  },
  {
    image: 'spring-framework.svg',
    altText: 'spring framework',
    title: 'spring framework',
    description:
      'Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.',
    version: '6.2.8',
    moreVersion: '+ 8 versions',
  },
  {
    image: 'spring-data.svg',
    altText: 'spring data',
    title: 'spring data',
    description:
      'Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.',
    version: '2025.0.1',
    moreVersion: '+ 6 versions',
  },
  {
    image: 'spring-cloud.svg',
    altText: 'spring cloud',
    title: 'spring cloud',
    description:
      'Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.',
    version: '2025.0.0',
    moreVersion: '+ 9 versions',
  },
  {
    image: 'spring-data-flow.svg',
    altText: 'spring cloud data flow',
    title: 'spring cloud data flow',
    description:
      'Provides an orchestration service for composable data microservice applications on modern runtimes.',
    version: '2.11.15',
    moreVersion: '+ 7 versions',
  },
  {
    image: 'spring-security.svg',
    altText: 'spring security',
    title: 'spring security',
    description:
      'Protects your application with comprehensive and extensible authentication and authorization support.',
    version: '6.5.1',
    moreVersion: '+ 10 versions',
  },
];

export const getProjects = async () => {
  return projects;
};
