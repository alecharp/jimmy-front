import Vue from 'vue';
import Router from 'vue-router';

import {
  auth,
} from './firebase';

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
      component: () => import(/* webpackChunkName: 'home' */'./views/Home'),
      children: [
        {
          path: '',
          redirect: '/me',
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
      ],
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = auth;
  const isSecured = to.matched.some(route => route.meta.secured);

  if (isSecured && !currentUser) {
    next('login');
  } else {
    next();
  }
});

export default router;
