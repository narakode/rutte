import { expect, test } from 'vitest';
import { Router } from './router.js';

test('insert 1', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('home', 'home');
  router.insert('dashboard', 'dashboard');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [],
      },
      {
        path: 'home',
        handler: 'home',
        children: [],
      },
      {
        path: 'dashboard',
        handler: 'dashboard',
        children: [],
      },
    ],
  });
});

test('insert 2', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('user', 'userb');
  router.insert('user', 'userc');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'userc',
        children: [],
      },
    ],
  });
});

test('insert 3', () => {
  const router = new Router();

  router.insert('', 'home');
  router.insert('user', 'user');

  expect(router.node).toEqual({
    path: '',
    handler: 'home',
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [],
      },
    ],
  });
});

test('insert 4', () => {
  const router = new Router();

  router.insert('product', 'product');
  router.insert('project', 'project');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'pro',
        handler: null,
        children: [
          {
            path: 'duct',
            handler: 'product',
            children: [],
          },
          {
            path: 'ject',
            handler: 'project',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 5', () => {
  const router = new Router();

  router.insert('project', 'project');
  router.insert('product', 'product');
  router.insert('projection', 'projection');
  router.insert('projects', 'projects');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'pro',
        handler: null,
        children: [
          {
            path: 'ject',
            handler: 'project',
            children: [
              {
                path: 'ion',
                handler: 'projection',
                children: [],
              },
              {
                path: 's',
                handler: 'projects',
                children: [],
              },
            ],
          },
          {
            path: 'duct',
            handler: 'product',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 6', () => {
  const router = new Router();

  router.insert('projects', 'projects');
  router.insert('projection', 'projection');
  router.insert('project', 'project');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'project',
        handler: 'project',
        children: [
          {
            path: 's',
            handler: 'projects',
            children: [],
          },
          {
            path: 'ion',
            handler: 'projection',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 7', () => {
  const router = new Router();

  router.insert('projection', 'projection');
  router.insert('project', 'project');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'project',
        handler: 'project',
        children: [
          {
            path: 'ion',
            handler: 'projection',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 8', () => {
  const router = new Router();

  router.insert('project', 'project');
  router.insert('projection', 'projection');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'project',
        handler: 'project',
        children: [
          {
            path: 'ion',
            handler: 'projection',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 9', () => {
  const router = new Router();

  router.insert('project', 'project');
  router.insert('pro', 'pro');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'pro',
        handler: 'pro',
        children: [
          {
            path: 'ject',
            handler: 'project',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 10', () => {
  const router = new Router();

  router.insert('user/profile/settings', 'settings');
  router.insert('user/profile', 'profile');
  router.insert('user', 'user');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [
          {
            path: '/profile',
            handler: 'profile',
            children: [
              {
                path: '/settings',
                handler: 'settings',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
