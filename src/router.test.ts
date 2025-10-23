import { describe, expect, test } from 'vitest';
import { Router } from './router.js';

describe('Router', () => {
  describe('add item', () => {
    test('should create a node', () => {
      const router = new Router();

      router.addItem('/', null);

      expect(router.items).toHaveLength(1);
    });

    test('should have path property', () => {
      const router = new Router();

      const item = router.addItem('/', null);

      expect(item).toHaveProperty('path');
    });

    test('should have handler property', () => {
      const router = new Router();

      const item = router.addItem('/', null);

      expect(item).toHaveProperty('handler');
    });
  });
});
