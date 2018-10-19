import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/events',
    component: () => import(/* webpackChunkName: 'Events' */ 'containers/Event'),
    children: [
      {
        name: 'eventsListing',
        path: '',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
      },
      {
        name: 'eventDetails',
        path: ':id',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventDetails'),
      },
      {
        name: 'eventCreation',
        path: 'create',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventCreation'),
      },
    ],
  },

  {
    name: 'userProfile',
    component: () => import(/* webpackChunkName: 'User' */ 'containers/UserProfile'),
    path: '/me',
  },
  {
    path: '*',
    redirect: '/events/',
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
});

export default router;
