import Vue from 'vue'

import 'babel-polyfill'

import store from 'store'
import router from 'router'

import 'ui/index.scss'

new Vue({
  router,
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  },
  el: '#jimmy'
})

store.dispatch('security/auth')
  .then(() => store.dispatch('getUser'))
