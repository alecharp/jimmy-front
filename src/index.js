import Vue from 'vue'

import 'babel-polyfill'

import store from 'store'

import 'ui/index.scss'

new Vue({
  el: '#jimmy',
  store,
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
})
