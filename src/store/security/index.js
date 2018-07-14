import actions from './actions'

import {KEYCLOAK} from './mutations'

const state = {
  keycloak: null,
}

const getters = {
  authenticated: state => state.keycloak && state.keycloak.authenticated,
  token: (state, getters) => {
    return getters.authenticated ? state.keycloak.token : null
  },
}

const mutations = {
  [KEYCLOAK](state, {keycloak}) {
    state.keycloak = keycloak
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
