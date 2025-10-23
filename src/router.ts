export interface RouterPath<T> {
  path: string;
  handler: T;
}

export class Router<T> {
  items: RouterPath<T>[] = [];

  addItem(path: string, handler: T): RouterPath<T> {
    const item: RouterPath<T> = {
      path,
      handler,
    };

    this.items.push(item);

    return item;
  }
}
