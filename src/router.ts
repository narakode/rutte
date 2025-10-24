export interface RouterPath<T> {
  path: string;
  handler: T | null;
  children?: RouterPath<T>[];
}

export class Router<T> {
  root: RouterPath<T> = {
    path: '',
    handler: null,
  };
}
