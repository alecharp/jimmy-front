import Vue from 'vue'
import Keycloak from 'keycloak-js'

import 'babel-polyfill'

import store from 'store'
import {
  USER,
} from 'store/mutations'
import {
  KEYCLOAK
} from 'store/security'

const keycloak = Keycloak(require('keycloak'))
keycloak.init({onLoad: 'login-required'})
  .success(authenticated => {
    if (authenticated) {
      store.commit(`security/${KEYCLOAK}`, {keycloak})
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
