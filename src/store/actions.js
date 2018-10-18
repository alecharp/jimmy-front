import Vue from 'vue'

import {
  EVENTS,
} from './mutations'

/**
 * This is needed until the events are created by the backend, when a proper id is generated.
 * TODO: remove this once not required.
 *
 * @returns {string} a random string which will potentially be unique.
 */
const uuid = () => {
  let text = ''
  for (let count = 0; count < 32; count++) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}

export default {
  addEvent: ({commit, state}, event) => {
    // TODO remove this once event creation is done in backend
    event = {...event, id: uuid(), date: new Date()}
    commit(EVENTS, [...state.events, event])
    return event
  },
  getProfile: () => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$keycloak.loadUserProfile()
        .success(resolve)
        .error(reject)
    })
  },
}
