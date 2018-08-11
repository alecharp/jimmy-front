import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'eventsListing',
    component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
    path: '/'
  },
  {
    name: 'eventForm',
    component: () => import(/* webpackChunkName: 'Events' */ 'components/EventForm'),
    path: '/new'
  },
  {
    name: 'eventDetail',
    component: () => import(/* webpackChunkName: 'Events' */ 'components/EventDetails'),
    path: '/event/:id'
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
});

export default router;
