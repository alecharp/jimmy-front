import actions from './actions'

export const KEYCLOAK = 'KEYCLOAK'

const state = {
  keycloak: null
}

const getters = {
  authenticated: state => state.keycloak && state.keycloak.authenticated,
  token: state => {
    return state.keycloak ? state.keycloak.token : null
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
