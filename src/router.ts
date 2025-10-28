interface RoutePath<T> {
  path: string;
  handler: T | null;
  children: RoutePath<T>[];
}

export class Router<T> {
  node: RoutePath<T> = {
    path: '',
    handler: null,
    children: [],
  };

  insert(path: string, handler: T) {
    if (!this.node.children.length) {
      this.node.children.push({
        path,
        handler,
        children: [],
      });

      return;
    }

    let root = this.node;
    let inserted = false;
    let search = path;

    insertedLoop: while (!inserted) {
      let longestCommonPrefixStart: number | null = null;
      let longestCommonPrefixChildIndex: number | null = null;

      let index = 0;

      while (
        index < root.children.length &&
        longestCommonPrefixChildIndex === null
      ) {
        const child = root.children[index];

        if (child?.path === path) {
          (root.children[index] as RoutePath<T>).handler = handler;

          break insertedLoop;
        }

        longestCommonPrefixStart = this.countLongestCommonPrefix(
          child as RoutePath<T>,
          search,
        );

        if (longestCommonPrefixStart > 0) {
          longestCommonPrefixChildIndex = index;

          break;
        }

        index++;
      }

      if (longestCommonPrefixChildIndex === null) {
        root.children.push({
          path: search,
          handler,
          children: [],
        });

        inserted = true;

        break;
      }

      const parent = root.children[
        longestCommonPrefixChildIndex
      ] as RoutePath<T>;

      if (parent.path.length === (longestCommonPrefixStart as number)) {
        root = parent;
        search = search.slice(longestCommonPrefixStart as number);

        continue;
      }

      if (search.length >= (longestCommonPrefixStart as number)) {
        root = parent;

        const copyChildren = parent.children;
        const copyHandler = parent.handler;

        parent.children = [];
        parent.handler = null;

        parent.children.push({
          path: parent.path.slice(longestCommonPrefixStart as number),
          handler: copyHandler,
          children: copyChildren,
        });
        parent.path = parent.path.slice(0, longestCommonPrefixStart as number);

        if (parent.path === search) {
          parent.handler = handler;
          inserted = true;
          break;
        }

        search = search.slice(longestCommonPrefixStart as number);

        continue;
      }
    }
  }

  private countLongestCommonPrefix(child: RoutePath<T>, path: string): number {
    let commonIndex = 0;

    const maxLength = Math.min(child.path.length, path.length);

    while (
      commonIndex < maxLength &&
      child.path[commonIndex] === path[commonIndex]
    ) {
      commonIndex++;
    }

    return commonIndex;
  }
}
