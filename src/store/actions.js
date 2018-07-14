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

const post = async (url, {token, body}) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

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
      await post('/api/events', {token, body: JSON.stringify(event)})
        .then(() => dispatch('getEvents'))
    }
  },
}
