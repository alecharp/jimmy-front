import Keycloak from 'keycloak-js'

export default {
  install: (Vue, options = {}) => {
    const authenticated = false
    Vue.$keycloak = Keycloak(options)
    Vue.$keycloak.init({onLoad: 'login-required'})

    Vue.$kcToken = () => {
      if (Vue.$keycloak.isTokenExpired()) {
        try {
          Vue.$keycloak.updateToken()
        } catch (_) {
          Vue.$keycloak.clearToken()
          Vue.$keycloak.init({onLoad: 'login-required'})
        }
      }
      return Vue.$keycloak.token
    }
  },
  logout: () => {
    Vue.$keycloak.logout()
  },
}
