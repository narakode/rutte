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
    if (this.node.path === path) {
      this.node.handler = handler;

      return;
    }

    if (!this.node.children.length) {
      this.node.children.push({
        path,
        handler,
        children: [],
      });

      return;
    }

    let root = this.node;
    let search = path;

    while (true) {
      const { childIndex, commonPrefixLen, replace } = this.findCommonRootChild(
        root,
        search,
      );

      if (childIndex === -1) {
        root.children.push({
          path: search,
          handler,
          children: [],
        });

        return;
      }

      const parent = root.children[childIndex] as RoutePath<T>;

      if (replace) {
        parent.handler = handler;

        return;
      }

      root = parent;

      if (parent.path.length === commonPrefixLen) {
        search = search.slice(commonPrefixLen);

        continue;
      }

      this.splitChild(parent, commonPrefixLen);

      if (parent.path !== search) {
        search = search.slice(commonPrefixLen);

        continue;
      }

      parent.handler = handler;

      return;
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

  private findCommonRootChild(
    root: RoutePath<T>,
    search: string,
  ): { childIndex: number; commonPrefixLen: number; replace: boolean } {
    for (let childIndex = 0; childIndex < root.children.length; childIndex++) {
      const child = root.children[childIndex] as RoutePath<T>;

      if (child.path === search) {
        return {
          childIndex,
          commonPrefixLen: 0,
          replace: true,
        };
      }

      const commonPrefixLen = this.countLongestCommonPrefix(child, search);

      if (commonPrefixLen > 0) {
        return {
          childIndex,
          commonPrefixLen,
          replace: false,
        };
      }
    }

    return {
      childIndex: -1,
      commonPrefixLen: 0,
      replace: false,
    };
  }

  private splitChild(child: RoutePath<T>, commonPrefixLen: number) {
    const copyChildren = child.children;
    const copyHandler = child.handler;

    child.children = [];
    child.handler = null;

    child.children.push({
      path: child.path.slice(commonPrefixLen),
      handler: copyHandler,
      children: copyChildren,
    });
    child.path = child.path.slice(0, commonPrefixLen);
  }
}
