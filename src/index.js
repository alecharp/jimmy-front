import Vue from 'vue'
import Keycloak from 'keycloak-js'

import store from 'store'
import {TOKEN} from 'store/mutation-types'

const keycloak = Keycloak(require('keycloak'));
keycloak.init({onLoad: 'login-required'})
    .success(authenticated => {
      if (authenticated) {
        store.commit(TOKEN, {token: keycloak.token})
      }
    });

new Vue({
  el: '#jimmy',
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
});
