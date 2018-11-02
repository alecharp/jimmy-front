import Keycloak from 'keycloak-js'

const defaultInitConfig = {
  onLoad: 'login-required',
  checkLoginIframe: false,
}
let loaded = false

export default {
  install: (Vue, options = {}) => {
    if (loaded) return
    loaded = true

    let update = null
    const keycloak = Keycloak(options.config)
    keycloak.init(options.init || defaultInitConfig)
    keycloak.onAuthSuccess = () => {
      update = setInterval(() => keycloak.updateToken(60), 10000)
    }
    keycloak.onReady = authenticated => {
      if(authenticated) {
        options.onReady && typeof options.onReady ===  'function' && options.onReady()
      }
    }
    keycloak.onAuthRefreshError = () => clearInterval(update)

    Object.defineProperty(Vue.prototype, '$keycloak', {
      get() {
        return keycloak
      }
    })
  },
}
