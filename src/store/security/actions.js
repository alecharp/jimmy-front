import {KEYCLOAK} from './index'

export default {
  renew: ({state, commit}) => {
    if (state.keycloak.isTokenExpired()) {
      const keycloak = state.keycloak
      keycloak.updateToken()
        .success(refreshed => {
          if (refreshed) {
            commit(KEYCLOAK, {keycloak})
          }
        })
        .error(() => {
          commit(KEYCLOAK, {keycloak: null})
        })
    }
  }
}
