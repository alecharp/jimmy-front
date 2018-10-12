import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'eventsListing',
    component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
    path: '/events'
  },
  {
    name: 'userProfile',
    component: () => import(/* webpackChunkName: 'User' */ 'containers/UserProfile'),
    path: '/me'
  },
  {
    path: '*',
    redirect: '/events'
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
});

export default router;
