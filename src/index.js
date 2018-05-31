import Vue from 'vue'
import Keycloak from 'keycloak-js'

import 'babel-polyfill'

import store from 'store'
import {
  TOKEN,
  USER,
} from 'store/mutation-types'

const keycloak = Keycloak(require('keycloak'))
keycloak.init({onLoad: 'login-required'})
  .success(authenticated => {
    if (authenticated) {
      store.commit(TOKEN, {token: keycloak.token})
      keycloak.loadUserProfile().success(user => store.commit(USER, {user}))
    }
  })

new Vue({
  el: '#jimmy',
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
})
