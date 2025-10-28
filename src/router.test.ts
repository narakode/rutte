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
  const router = new Router<string>();

  router.insert('user', 'user');
  router.insert('test', 'test');

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
        path: 'test',
        handler: 'test',
        children: [],
      },
    ],
  });
});

test('insert 2', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('user/profile', 'user/profile');

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
            handler: 'user/profile',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 3', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('userprofile', 'userprofile');
  router.insert('userdashboard', 'userdashboard');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [
          {
            path: 'profile',
            handler: 'userprofile',
            children: [],
          },
          {
            path: 'dashboard',
            handler: 'userdashboard',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 4', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('userprofile', 'userprofile');
  router.insert('userdashboard', 'userdashboard');
  router.insert('userproject', 'userproject');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [
          {
            path: 'pro',
            handler: null,
            children: [
              {
                path: 'file',
                handler: 'userprofile',
                children: [],
              },
              {
                path: 'ject',
                handler: 'userproject',
                children: [],
              },
            ],
          },
          {
            path: 'dashboard',
            handler: 'userdashboard',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 5', () => {
  const router = new Router();

  router.insert('userprofile', 'userprofile');
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
            path: 'profile',
            handler: 'userprofile',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 6', () => {
  const router = new Router();

  router.insert('userprofile', 'userprofile');
  router.insert('user', 'user');
  router.insert('userhome', 'userhome');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'user',
        children: [
          {
            path: 'profile',
            handler: 'userprofile',
            children: [],
          },
          {
            path: 'home',
            handler: 'userhome',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 7', () => {
  const router = new Router();

  router.insert('userprofile', 'userprofile');
  router.insert('user', 'user');
  router.insert('usecase', 'usecase');
  router.insert('userhome', 'userhome');

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
            handler: 'user',
            children: [
              {
                path: 'profile',
                handler: 'userprofile',
                children: [],
              },
              {
                path: 'home',
                handler: 'userhome',
                children: [],
              },
            ],
          },
          {
            path: 'case',
            handler: 'usecase',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 8', () => {
  const router = new Router();

  router.insert('home', 'home');
  router.insert('dashboard', 'dashboard');
  router.insert('user', 'user');
  router.insert('userprofile', 'userprofile');
  router.insert('userproject', 'userproject');
  router.insert('userproduct', 'userproduct');
  router.insert('userhome', 'userhome');
  router.insert('usecase', 'usecase');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
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
      {
        path: 'use',
        handler: null,
        children: [
          {
            path: 'r',
            handler: 'user',
            children: [
              {
                path: 'pro',
                handler: null,
                children: [
                  {
                    path: 'file',
                    handler: 'userprofile',
                    children: [],
                  },
                  {
                    path: 'ject',
                    handler: 'userproject',
                    children: [],
                  },
                  {
                    path: 'duct',
                    handler: 'userproduct',
                    children: [],
                  },
                ],
              },
              {
                path: 'home',
                handler: 'userhome',
                children: [],
              },
            ],
          },
          {
            path: 'case',
            handler: 'usecase',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 9', () => {
  const router = new Router();

  router.insert('user', 'first');
  router.insert('user', 'second');
  router.insert('user', 'third');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'user',
        handler: 'third',
        children: [],
      },
    ],
  });
});

test('insert 10', () => {
  const router = new Router();

  router.insert('abc', 'abc');
  router.insert('abd', 'abd');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'ab',
        handler: null,
        children: [
          {
            path: 'c',
            handler: 'abc',
            children: [],
          },
          {
            path: 'd',
            handler: 'abd',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 11', () => {
  const router = new Router();

  router.insert('userprofile', 'userprofile');
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
            path: 'profile',
            handler: 'userprofile',
            children: [],
          },
        ],
      },
    ],
  });
});

test('insert 12', () => {
  const router = new Router();

  router.insert('user', 'user');
  router.insert('user/home', 'userhome');
  router.insert('use', 'use');

  expect(router.node).toEqual({
    path: '',
    handler: null,
    children: [
      {
        path: 'use',
        handler: 'use',
        children: [
          {
            path: 'r',
            handler: 'user',
            children: [
              {
                path: '/home',
                handler: 'userhome',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
