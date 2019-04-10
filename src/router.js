import Vue from 'vue';
import Router from 'vue-router';

import firebase from 'firebase/app';
import 'firebase/auth';

import Login from './components/Login';

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
          redirect: '/user',
        },
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: 'user' */ './components/User'),
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
  const { currentUser } = firebase.auth();
  const isSecured = to.matched.some(route => route.meta.secured);

  if (isSecured && !currentUser) {
    next('login');
  } else {
    next();
  }
});

export default router;
