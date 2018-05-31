import {EVENTS} from './mutation-types'

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
  getEvents: ({state, commit}) => {
    if (state.token !== '') {
      get('/api/events', state.token)
        .then(events => commit(EVENTS, {events}))
    }
  },
}
