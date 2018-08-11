import Vue from 'vue'

import 'babel-polyfill'

import KeycloakVue from './KeycloakVue'

import store from 'store'
import router from 'router'

import 'ui/index.scss'

Vue.use(KeycloakVue, {
  "realm": "jimmy",
  "clientId": "jimmy-front",
  "url": "http://localhost:8082/auth/",
  "sslRequired": "external",
  "cors": true
})

new Vue({
  router,
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  },
  el: '#jimmy'
})
