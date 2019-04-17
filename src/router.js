import Vue from 'vue';
import Router from 'vue-router';

import {
  auth,
} from './firebase';

import Empty from './views/Empty';
import Home from './views/Home';
import Login from './views/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { secured: false },
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/events',
        },
        {
          path: 'me',
          name: 'user',
          component: () => import(/* webpackChunkName: 'user' */ './views/User'),
          meta: { secured: true },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: 'about' */ './views/About'),
          meta: { secured: false },
        },
        {
          path: 'events',
          component: Empty,
          meta: { secured: true },
          children: [
            {
              path: '',
              name: 'events',
              component: () => import(/* webpackChunkName: 'events' */ './views/EventsListing'),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});

router.beforeEach((to, _, next) => {
  const { currentUser } = auth;
  const isSecured = to.matched.some(route => route.meta.secured);

  if (isSecured && !currentUser) {
    next('login');
  } else {
    next();
  }
});

export default router;
