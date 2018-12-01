/*
 * Copyright 2018 Jimmy, Adrien Lecharpentier and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/events',
    component: {
      template: '<router-view></router-view>',
    },
    children: [
      {
        name: 'eventsListing',
        path: '',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventsListing'),
      },
      {
        name: 'eventCreation',
        path: 'create',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventCreation'),
      },
      {
        name: 'eventDetails',
        path: ':id',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventDetails'),
      },
      {
        name: 'eventConfig',
        path: ':id/configure',
        component: () => import(/* webpackChunkName: 'Events' */ 'containers/EventConfiguration'),
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
    redirect: '/events',
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
});

export default router;
