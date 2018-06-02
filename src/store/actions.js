import {EVENTS} from './mutations'

const get = async (url, token) => {
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

export default {
  getEvents: ({commit, getters}) => {
    const token = getters['security/token']
    if (getters['security/authenticated']) {
      get('/api/events', token)
        .then(events => commit(EVENTS, {events}))
        .catch(console.error)
    }
  },
}
