import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import 'babel-polyfill'

import KeycloakVue from './KeycloakVue'

import store from 'store'
import router from 'router'

import 'ui'

const requireComponent = require.context(
  './components',
  false,
  /Jimmy[A-Z]\w+\.vue$/
)
requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename)
  const componentName = componentConfig.default.name || upperFirst(camelCase(filename.replace(/^\.\/(.*)\.\w+$/, '$1')))

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.use(KeycloakVue, {
  config: {
    "realm": "jimmy",
    "clientId": "jimmy-front",
    "url": "http://localhost:8082/auth/",
    "sslRequired": "external",
    "cors": true,
  },
  onReady: () => {
    new Vue({
      router,
      store,
      components: {
        App: () => import(/* webpackChunkName: 'App' */ 'components/App')
      },
      el: '#jimmy',
    })
  },
})
