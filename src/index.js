import Vue from 'vue'
import Keycloak from 'keycloak-js'

const keycloak = Keycloak(require('keycloak'));
keycloak.init({onLoad: 'login-required'})
    .success(authenticated => {
      if (authenticated) {
        window.localStorage.setItem('keycloak-token', keycloak.token)
      }
    });

new Vue({
  el: '#jimmy',
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
});
