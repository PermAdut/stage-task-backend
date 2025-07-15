export type Project = {
  image: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  altText: string;
  title: string;
  description: string;
  version: string;
  moreVersion: string;
};