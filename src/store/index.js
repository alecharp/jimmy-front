import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import security from './security'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  events: [],
  user: null,
}

const getters = {
  getDisplayName: state => () =>
    state.user ? `${state.user.firstName} ${state.user.lastName}` : null,
  getEvent: state => id =>
    state.events ? state.events.find(e => e.id === id) : null,
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    security: security,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export default store
