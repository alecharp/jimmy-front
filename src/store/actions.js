import Vue from 'vue'

import {
  EVENTS,
  USER,
} from './mutations'

const getCookie = name => {
  for(let cookie of decodeURIComponent(document.cookie).split(';')) {
    if (cookie.trim().startsWith(name)) {
      return cookie.substring(name.length+1, cookie.length)
    }
  }
  return null;
}

const prepareHeaders = (token = Vue.$kcToken())  => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))

  return headers
}

const get = async (url) => {
  const headers = prepareHeaders()

  const response = await fetch(url, {headers, mode: 'cors'})
  if (!response.ok) {
    const {status} = response
    return Promise.reject(status)
  }
  return await response.json()
}

const post = async (url, {body}) => {
  const headers = prepareHeaders()
  headers.append('Content-Type', 'application/json')

  const response = await fetch(url, {headers, mode: 'cors', body, method: 'POST'})
  if(!response.ok) {
    const {status} = response
    return Promise.reject(status)
  }
  return Promise.resolve({});
}

export default {
  async getEvents({dispatch, commit}) {
    await get('/api/events')
      .then(events => commit(EVENTS, {events}))
  },
  async createEvent({dispatch}, {event}) {
    try {
      await post('/api/events', {body: JSON.stringify(event)})
        .then(() => dispatch('getEvents'))
    } catch(error) {
      return Promise.reject(error)
    }
  },
  async deleteEvent({dispatch}, eventId) {
    const headers = prepareHeaders()
    await fetch(`/api/events/${eventId}`, {headers, mode: 'cors', method: 'DELETE'})
      .then(() => dispatch('getEvents'))
  },
  async getProfile() {
    return Vue.$keycloak.loadUserProfile();
  }
}
