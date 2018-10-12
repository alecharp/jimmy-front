import Keycloak from 'keycloak-js'

export default {
  install: (Vue, options = {}) => {
    const authenticated = false
    Vue.$keycloak = Keycloak(options)
    Vue.$keycloak.init({onLoad: 'login-required'})

    const updateToken = () => {
      if (Vue.$keycloak.isTokenExpired()) {
        try {
          Vue.$keycloak.updateToken()
        } catch (_) {
          Vue.$keycloak.clearToken()
          Vue.$keycloak.init({onLoad: 'login-required'})
        }
      }
    }

    /**
     * Retrieve the token from KeyCloak to be authenticated on the back.
     * @returns {Promise<string>} will resolve the token value
     */
    Vue.prototype.$getKcToken = () => {
      updateToken()
      return Vue.$keycloak.token
    }

    /**
     * Build the URL to access the user profile management URL.
     * @returns {Promise<string>} will resolve to the URL
     */
    Vue.prototype.$getAccountUrl = () => {
      updateToken()
      return Vue.$keycloak.createAccountUrl()
    }
  },
}
