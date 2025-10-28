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

  insert(path: string) {
    if (!this.node.children.length) {
      this.node.children.push({
        path,
        handler: null,
        children: [],
      });

      return;
    }

    let root = this.node;
    let inserted = false;
    let search = path;

    while (!inserted) {
      let longestCommonPrefixStart: number | null = null;
      let longestCommonPrefixChildIndex: number | null = null;

      let index = 0;

      while (
        index < root.children.length &&
        longestCommonPrefixChildIndex === null
      ) {
        const child = root.children[index];

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
          handler: null,
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

        const children = parent.children;

        parent.children = [];

        parent.children.push({
          path: parent.path.slice(longestCommonPrefixStart as number),
          handler: null,
          children: children,
        });
        parent.path = parent.path.slice(0, longestCommonPrefixStart as number);

        if (parent.path === search) {
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
