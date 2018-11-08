/*
 * Copyright 2018 Jimmy, Adrien Lecharpentier and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Vue from 'vue'
import store from 'store'

import {
  CSRF_TOKEN,
  EVENTS,
  USER_PROFILE,
} from './mutations'

const REST_BASE_URI = `/api`
const EVENTS_BASE_URI = `${REST_BASE_URI}/events`
const PING_BASE_URI = `${REST_BASE_URI}/ping`

/**
 * Prepare the headers for any requests to the backend
 * @returns {Headers} the headers for the request
 */
const headers = (csrfToken = store.state.csrfToken) => {
  return new Headers({
    'Authorization': `Bearer ${Vue.prototype.$keycloak.token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,
  })
}

/**
 * Perform a 'GET' request to a specific URI and returns its JSON response.
 * @param uri the URI to reach.
 * @returns {Promise<*>} will resolve to the response content and reject with the response error.
 */
const get = async (uri) => {
  const resp = await fetch(uri, {method: 'GET', headers: headers()})
  if (resp.ok) {
    return resp.json()
  }
  return Promise.reject(resp)
}

/**
 * Perform a 'POST' request to a specific URI and returns its JSON response.
 * @param uri the URI to reach.
 * @param data the object to send to the URI. Data will be JSONified.
 * @returns {Promise<*>} will resolve to the response content and reject with the response error.
 */
const post = async (uri, data) => {
  const resp = await fetch(uri, {method: 'POST', headers: headers(), body: JSON.stringify(data)})
  if(resp.ok) {
    return resp.json()
  }
  return Promise.reject(await resp.json())
}

/**
 * Perform a 'PUT' request to a specific URI and sending the provided data.
 * @param uri the URI to reach.
 * @param data the data to send.
 * @return {Promise<*>} will resolve to the response content or reject with the response error.
 */
const put = async (uri, data) => {
  const resp = await fetch(uri, {method: 'PUT', headers: headers(), body: JSON.stringify(data)})
  if(resp.ok) {
    return resp.json()
  }
  return Promise.reject(await resp.json())
}

/**
 * Perform a 'DELETE' request to a specific URI.
 * @param uri the URI to reach.
 * @return {Promise<*>} the request itself.
 */
const remove = async (uri) => {
  const resp = await fetch(uri, {method: 'DELETE', headers: headers()})
  return resp.json()
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
  getEvent: async ({state, dispatch}, id) => {
    if(state.events === null || state.events.length === 0) {
      await dispatch('getEvents')
    }
    return state.events.find(ev => ev.id === id) || Promise.reject(`Cannot find event with id ${id}.`)
  },
  updateEvent: async ({commit, state}, event) => {
    const events = [...state.events]
    const newEvent = await put(`${EVENTS_BASE_URI}/${event.id}`, event)

    const eventIndex = events.findIndex(ev => ev.id === newEvent.id)
    if (eventIndex === -1) return Promise.reject('Cannot find event to modify')
    events.splice(eventIndex, 1, newEvent)
    commit(EVENTS, [...events])
    return newEvent
  },
  getProfile: ({commit}) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$keycloak.loadUserInfo()
        .success(profile => {
          commit(USER_PROFILE, profile)
          resolve(profile)
        })
        .error(reject)
    })
  },
  getCsrfToken: async ({commit}) => {
    try {
      const respHeaders = await fetch(`${PING_BASE_URI}`, {method: 'GET', headers: headers()})
        .then(resp => resp.ok ? resp.headers : Promise.reject(resp.headers))
      if(respHeaders.has('X-CSRF-TOKEN')) {
        commit(CSRF_TOKEN, respHeaders.get('X-CSRF-TOKEN'))
      }
    } catch (ex) {
    }
  },
}
