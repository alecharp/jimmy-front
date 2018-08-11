import {
  EVENTS,
  USER,
} from './mutations'

const get = async (url, {token}) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  const response = await fetch(url, {headers, mode: 'cors'})
  if (!response.ok) {
    const {status} = response
    throw new Error(status)
  }
  return await response.json()
}

const getCookie = name => {
  for(let cookie of decodeURIComponent(document.cookie).split(';')) {
    if (cookie.trim().startsWith(name)) {
      return cookie.substring(name.length+1, cookie.length)
    }
  }
  return null;
}

const post = async (url, {token, body}) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))

  const response = await fetch(url, {headers, mode: 'cors', body, method: 'POST'})
  if(!response.ok) {
    const {status} = response
    throw new Error(status)
  }
  return Promise.resolve({});
}

export default {
  async getUser({state, commit}) {
    const profile = await state.security.keycloak.loadUserProfile()
    const {email, firstName, lastName, username} = profile
    const user = {email, firstName, lastName, username}
    commit(USER, {user})
  },
  async getEvents({dispatch, commit, getters}) {
    await dispatch('security/renew')
    const token = getters['security/token']
    if (getters['security/authenticated']) {
      await get('/api/events', {token})
        .then(events => commit(EVENTS, {events}))
    }
  },
  async createEvent({dispatch, getters}, {event}) {
    await dispatch('security/renew')
    const token = getters['security/token']
    if(getters['security/authenticated']) {
      try {
        await post('/api/events', {token, body: JSON.stringify(event)})
          .then(() => dispatch('getEvents'))
      } catch(error) {
        return Promise.reject(error)
      }
    }
  },
  async deleteEvent({dispatch, getters}, eventId) {
    await dispatch('security/renew')
    const token = getters['security/token']
    if(getters['security/authenticated']) {
      const headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer ${token}`)
      await fetch(`/api/events/${eventId}`, {headers, mode: 'cors', method: 'DELETE'})
        .then(() => dispatch('getEvents'))
    }
  },
}
