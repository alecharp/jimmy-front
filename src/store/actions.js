import Vue from 'vue'

import {
  EVENTS,
} from './mutations'

const EVENTS_BASE_URI = '/api/events'

/**
 * Prepare the headers for any requests to the backend
 * @returns {Headers} the headers for the request
 */
const headers = () => {
  return new Headers({
    'Authorization': `Bearer ${Vue.prototype.$keycloak.token}`,
    'Content-Type': 'application/json',
  })
}

/**
 * Perform a 'GET' request to a specific URI and returns its JSON response.
 * @param uri the URI to reach.
 * @returns {Promise<*>} will resolve to response content and reject with the response error.
 */
const get = async (uri) => {
  const resp = await fetch(uri, {method: 'GET', headers: headers()})
  if (resp.ok) {
    return resp.json()
  }
  return Promise.reject(await resp.json())
}

/**
 * Perform a 'POST' request to a specific URI and returns its JSON response.
 * @param uri the URI to reach.
 * @param data the object to send to the URI. Data will be JSONify.
 * @returns {Promise<*>} will resolve to response content and reject with the response error.
 */
const post = async (uri, data) => {
  const resp = await fetch(uri, {method: 'POST', headers: headers(), body: JSON.stringify(data)})
  if(resp.ok) {
    return resp.json()
  }
  return Promise.reject(await resp.json())
}

export default {
  getEvents: async ({commit}) => {
    return commit(EVENTS, [...await get(`${EVENTS_BASE_URI}`)])
  },
  addEvent: async ({commit, state}, event) => {
    const newEvent = await post(`${EVENTS_BASE_URI}`, event)
    commit(EVENTS, [...state.events, newEvent])
    return newEvent
  },
  getEvent: ({state}, id) => {
    return state.events.find(ev => ev.id === id) || Promise.reject(`Cannot find event with id ${id}.`)
  },
  updateEvent: ({commit, state}, event) => {
    const events = [...state.events]
    const eventIndex = events.findIndex(ev => ev.id === event.id)
    if (eventIndex === -1) return Promise.reject('Cannot find event to modify')
    events.splice(eventIndex, 1, event)
    commit(EVENTS, [...events])
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
