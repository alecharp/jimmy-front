import Keycloak from 'keycloak-js'

import {KEYCLOAK} from './index'

export default {
  async auth({commit}) {
    const keycloak = Keycloak(require('keycloak'))
    return await keycloak.init({onLoad: 'login-required'})
      .success(authenticated => {
        if (authenticated) {
          commit(KEYCLOAK, {keycloak})
        }
      })
  },
  logout: ({state}) => {
    state.keycloak.logout()
      .success(foo => console.log(foo))
  },
  async renew({state, commit}) {
    const keycloak = state.keycloak
    if (!!keycloak && keycloak.isTokenExpired()) {
      try {
        const refreshed = await keycloak.updateToken()
        if (refreshed) {
          commit(KEYCLOAK, {keycloak})
        }
      } catch (_){
        commit(KEYCLOAK, {keycloak: null})
      }
    }
  }
}
