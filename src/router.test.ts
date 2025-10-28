import { expect, test } from 'vitest';
import { Router } from './router.js';

test('base', () => {
  const router = new Router();

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [],
  });
});

test('insert 1', () => {
  const router = new Router();

  router.insert('user');
  router.insert('test');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [],
      },
      {
        path: 'test',
        handler: null,
        children: [],
      },
    ],
  });
});

test('insert 2', () => {
  const router = new Router();

  router.insert('user');
  router.insert('user/profile');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [
          {
            path: '/profile',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 3', () => {
  const router = new Router();

  router.insert('user');
  router.insert('userprofile');
  router.insert('userdashboard');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [
          {
            path: 'profile',
            handler: null,
            children: [],
          },
          {
            path: 'dashboard',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 4', () => {
  const router = new Router();

  router.insert('user');
  router.insert('userprofile');
  router.insert('userdashboard');
  router.insert('userproject');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [
          {
            path: 'pro',
            handler: null,
            children: [
              {
                path: 'file',
                handler: null,
                children: [],
              },
              {
                path: 'ject',
                handler: null,
                children: [],
              },
            ],
          },
          {
            path: 'dashboard',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 5', () => {
  const router = new Router();

  router.insert('userprofile');
  router.insert('user');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [
          {
            path: 'profile',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 6', () => {
  const router = new Router();

  router.insert('userprofile');
  router.insert('user');
  router.insert('userhome');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: null,
        children: [
          {
            path: 'profile',
            handler: null,
            children: [],
          },
          {
            path: 'home',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 7', () => {
  const router = new Router();

  router.insert('userprofile');
  router.insert('user');
  router.insert('usecase');
  router.insert('userhome');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'use',
        handler: null,
        children: [
          {
            path: 'r',
            handler: null,
            children: [
              {
                path: 'profile',
                handler: null,
                children: [],
              },
              {
                path: 'home',
                handler: null,
                children: [],
              },
            ],
          },
          {
            path: 'case',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 8', () => {
  const router = new Router();

  router.insert('home');
  router.insert('dashboard');
  router.insert('user');
  router.insert('userprofile');
  router.insert('userproject');
  router.insert('userproduct');
  router.insert('userhome');
  router.insert('usecase');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'home',
        handler: null,
        children: [],
      },
      {
        path: 'dashboard',
        handler: null,
        children: [],
      },
      {
        path: 'use',
        handler: null,
        children: [
          {
            path: 'r',
            handler: null,
            children: [
              {
                path: 'pro',
                handler: null,
                children: [
                  {
                    path: 'file',
                    handler: null,
                    children: [],
                  },
                  {
                    path: 'ject',
                    handler: null,
                    children: [],
                  },
                  {
                    path: 'duct',
                    handler: null,
                    children: [],
                  },
                ],
              },
              {
                path: 'home',
                handler: null,
                children: [],
              },
            ],
          },
          {
            path: 'case',
            handler: null,
            children: [],
          },
        ],
      },
    ],
  });
});
