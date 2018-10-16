import Vue from 'vue'

export default {
  getProfile: () => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$keycloak.loadUserProfile()
        .success(resolve)
        .error(reject)
    })
  }
}
