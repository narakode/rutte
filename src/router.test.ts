import { describe, expect, test } from 'vitest';
import { Router } from './router.js';

describe('Router', () => {
  describe('add item', () => {
    test('should have a root node', () => {
      const router = new Router();

      expect(router).toHaveProperty('root');

      const root = router.root;

      expect(root).toEqual({
        path: '',
        handler: null,
      });
    });
  });
});
