import Vue from 'vue'

new Vue({
  el: '#jimmy',
  components: {
    App: () => import(/* webpackChunkName: 'App' */ 'components/App')
  }
});
