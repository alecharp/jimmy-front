import Vue from 'vue'

import 'babel-polyfill'

import store from 'store'

new Vue({
  el: '#jimmy',
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
})
