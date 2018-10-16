import Keycloak from 'keycloak-js'

const initConfig = {
  onLoad: 'login-required',
  checkLoginIframe: false,
}
let loaded = false

export default {
  install: (Vue, options = {}) => {
    if (loaded) return
    loaded = true

    const keycloak = Object.assign({}, Keycloak(options))
    const init = () => keycloak.init(initConfig)

    Object.defineProperty(Vue.prototype, '$keycloak', {
      get() {
        return keycloak
      }
    })

    init()
  },
}
