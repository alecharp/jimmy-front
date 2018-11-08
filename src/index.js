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
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

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

const keycloakConfig = {
  "realm": `${process.env.KEYCLOAK_REALM || 'jimmy'}`,
  "clientId": `${process.env.KEYCLOAK_CLIENT_ID || 'jimmy-front'}`,
  "url": `${process.env.KEYCLOAK_URL || 'http://localhost:8082/auth'}`,
  "sslRequired": "external",
}

Vue.use(KeycloakVue, {
  config: keycloakConfig,
  onReady: () => {
    new Vue({
      router,
      store,
      components: {
        App: () => import(/* webpackChunkName: 'App' */ 'containers/App')
      },
      el: '#jimmy',
    })
  },
})
