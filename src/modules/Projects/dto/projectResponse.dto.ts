export type ProjectResponse = ProjectResponseElement[];

export type ProjectResponseElement = {
  image: string;
  svgContent: string;
  altText: string;
  title: string;
  description: string;
  version: string;
  moreVersion: string;
};
